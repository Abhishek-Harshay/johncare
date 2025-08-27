import crypto from 'crypto'

export interface APIKey {
  id: string
  name: string
  service: string
  keyType: 'public' | 'private' | 'secret'
  encrypted: string
  permissions: string[]
  rateLimits: {
    daily: number
    hourly: number
    minute: number
  }
  usage: {
    today: number
    thisHour: number
    thisMinute: number
    lastReset: number
  }
  status: 'active' | 'inactive' | 'expired' | 'suspended'
  createdAt: number
  expiresAt?: number
  lastUsed?: number
  tags: string[]
  environment: 'production' | 'staging' | 'development'
  owner: string
  metadata: { [key: string]: any }
}

export interface VaultConfig {
  encryptionKey: string
  rotationInterval: number // days
  backupEnabled: boolean
  auditLogEnabled: boolean
  maxKeyAge: number // days
  autoRevoke: boolean
}

export interface AuditLog {
  id: string
  timestamp: number
  action: 'create' | 'read' | 'update' | 'delete' | 'rotate' | 'revoke'
  keyId: string
  userId: string
  ipAddress: string
  userAgent: string
  success: boolean
  details: string
}

export interface KeyRotationSchedule {
  keyId: string
  nextRotation: number
  frequency: 'weekly' | 'monthly' | 'quarterly' | 'annually'
  autoRotate: boolean
  notifyBefore: number // days
}

class APIKeyVault {
  private static instance: APIKeyVault
  private keys: Map<string, APIKey> = new Map()
  private rotationSchedules: Map<string, KeyRotationSchedule> = new Map()
  private auditLogs: AuditLog[] = []
  private config: VaultConfig

  constructor() {
    this.config = {
      encryptionKey: process.env.VAULT_ENCRYPTION_KEY || this.generateEncryptionKey(),
      rotationInterval: 90, // 3 months
      backupEnabled: true,
      auditLogEnabled: true,
      maxKeyAge: 365, // 1 year
      autoRevoke: true
    }
    
    this.initializeMockData()
    this.startRotationScheduler()
  }

  public static getInstance(): APIKeyVault {
    if (!APIKeyVault.instance) {
      APIKeyVault.instance = new APIKeyVault()
    }
    return APIKeyVault.instance
  }

  // Create new API key
  createAPIKey(data: {
    name: string
    service: string
    keyType: 'public' | 'private' | 'secret'
    value: string
    permissions: string[]
    rateLimits: { daily: number, hourly: number, minute: number }
    environment: 'production' | 'staging' | 'development'
    owner: string
    tags?: string[]
    expiresAt?: number
    metadata?: { [key: string]: any }
  }): APIKey {
    const keyId = `key_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const encrypted = this.encrypt(data.value)
    
    const apiKey: APIKey = {
      id: keyId,
      name: data.name,
      service: data.service,
      keyType: data.keyType,
      encrypted,
      permissions: data.permissions,
      rateLimits: data.rateLimits,
      usage: {
        today: 0,
        thisHour: 0,
        thisMinute: 0,
        lastReset: Date.now()
      },
      status: 'active',
      createdAt: Date.now(),
      expiresAt: data.expiresAt,
      tags: data.tags || [],
      environment: data.environment,
      owner: data.owner,
      metadata: data.metadata || {}
    }

    this.keys.set(keyId, apiKey)
    
    // Schedule rotation if auto-rotate is enabled
    if (this.config.autoRevoke) {
      this.scheduleRotation(keyId)
    }

    this.logAction('create', keyId, data.owner, 'API key created')
    return apiKey
  }

  // Get API key by ID (returns decrypted value for authorized access)
  getAPIKey(keyId: string, userId: string, decrypt: boolean = false): APIKey | null {
    const key = this.keys.get(keyId)
    if (!key) {
      this.logAction('read', keyId, userId, 'Key not found', false)
      return null
    }

    // Check if user has access
    if (key.owner !== userId && !this.hasAdminAccess(userId)) {
      this.logAction('read', keyId, userId, 'Unauthorized access', false)
      return null
    }

    // Update last used
    key.lastUsed = Date.now()
    this.keys.set(keyId, key)

    this.logAction('read', keyId, userId, 'API key accessed')

    if (decrypt) {
      return {
        ...key,
        encrypted: this.decrypt(key.encrypted)
      }
    }

    return key
  }

  // Update API key
  updateAPIKey(
    keyId: string,
    userId: string,
    updates: Partial<Pick<APIKey, 'name' | 'permissions' | 'rateLimits' | 'status' | 'tags' | 'metadata'>>
  ): boolean {
    const key = this.keys.get(keyId)
    if (!key) return false

    if (key.owner !== userId && !this.hasAdminAccess(userId)) {
      this.logAction('update', keyId, userId, 'Unauthorized update', false)
      return false
    }

    const updatedKey = { ...key, ...updates }
    this.keys.set(keyId, updatedKey)

    this.logAction('update', keyId, userId, 'API key updated')
    return true
  }

  // Delete API key
  deleteAPIKey(keyId: string, userId: string): boolean {
    const key = this.keys.get(keyId)
    if (!key) return false

    if (key.owner !== userId && !this.hasAdminAccess(userId)) {
      this.logAction('delete', keyId, userId, 'Unauthorized deletion', false)
      return false
    }

    this.keys.delete(keyId)
    this.rotationSchedules.delete(keyId)

    this.logAction('delete', keyId, userId, 'API key deleted')
    return true
  }

  // Rotate API key
  rotateAPIKey(keyId: string, newValue: string, userId: string): boolean {
    const key = this.keys.get(keyId)
    if (!key) return false

    if (key.owner !== userId && !this.hasAdminAccess(userId)) {
      this.logAction('rotate', keyId, userId, 'Unauthorized rotation', false)
      return false
    }

    key.encrypted = this.encrypt(newValue)
    key.lastUsed = undefined // Reset usage stats
    key.usage = {
      today: 0,
      thisHour: 0,
      thisMinute: 0,
      lastReset: Date.now()
    }

    this.keys.set(keyId, key)
    this.updateRotationSchedule(keyId)

    this.logAction('rotate', keyId, userId, 'API key rotated')
    return true
  }

  // Check rate limits
  checkRateLimit(keyId: string): {
    allowed: boolean
    remaining: {
      daily: number
      hourly: number
      minute: number
    }
    resetTime: {
      daily: number
      hourly: number
      minute: number
    }
  } {
    const key = this.keys.get(keyId)
    if (!key) {
      return {
        allowed: false,
        remaining: { daily: 0, hourly: 0, minute: 0 },
        resetTime: { daily: 0, hourly: 0, minute: 0 }
      }
    }

    const now = Date.now()
    const dayStart = new Date().setHours(0, 0, 0, 0)
    const hourStart = new Date().setMinutes(0, 0, 0)
    const minuteStart = new Date().setSeconds(0, 0)

    // Reset counters if necessary
    if (key.usage.lastReset < dayStart) {
      key.usage.today = 0
      key.usage.thisHour = 0
      key.usage.thisMinute = 0
      key.usage.lastReset = now
    } else if (key.usage.lastReset < hourStart) {
      key.usage.thisHour = 0
      key.usage.thisMinute = 0
      key.usage.lastReset = now
    } else if (key.usage.lastReset < minuteStart) {
      key.usage.thisMinute = 0
      key.usage.lastReset = now
    }

    const allowed = 
      key.usage.today < key.rateLimits.daily &&
      key.usage.thisHour < key.rateLimits.hourly &&
      key.usage.thisMinute < key.rateLimits.minute

    if (allowed) {
      key.usage.today++
      key.usage.thisHour++
      key.usage.thisMinute++
      this.keys.set(keyId, key)
    }

    return {
      allowed,
      remaining: {
        daily: key.rateLimits.daily - key.usage.today,
        hourly: key.rateLimits.hourly - key.usage.thisHour,
        minute: key.rateLimits.minute - key.usage.thisMinute
      },
      resetTime: {
        daily: dayStart + 24 * 60 * 60 * 1000,
        hourly: hourStart + 60 * 60 * 1000,
        minute: minuteStart + 60 * 1000
      }
    }
  }

  // Get user's API keys
  getUserKeys(userId: string, filters?: {
    service?: string
    environment?: string
    status?: string
    tags?: string[]
  }): APIKey[] {
    let keys = Array.from(this.keys.values()).filter(key => key.owner === userId)

    if (filters) {
      if (filters.service) keys = keys.filter(k => k.service === filters.service)
      if (filters.environment) keys = keys.filter(k => k.environment === filters.environment)
      if (filters.status) keys = keys.filter(k => k.status === filters.status)
      if (filters.tags) keys = keys.filter(k => 
        filters.tags!.every(tag => k.tags.includes(tag))
      )
    }

    return keys.sort((a, b) => b.createdAt - a.createdAt)
  }

  // Get usage statistics
  getUsageStats(keyId: string): {
    daily: number
    weekly: number
    monthly: number
    trends: { date: string, usage: number }[]
  } | null {
    const key = this.keys.get(keyId)
    if (!key) return null

    // Mock usage data for demo
    const trends = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      usage: Math.floor(Math.random() * key.rateLimits.daily * 0.8)
    })).reverse()

    return {
      daily: key.usage.today,
      weekly: trends.slice(-7).reduce((sum, t) => sum + t.usage, 0),
      monthly: trends.reduce((sum, t) => sum + t.usage, 0),
      trends
    }
  }

  // Get audit logs
  getAuditLogs(filters?: {
    keyId?: string
    userId?: string
    action?: string
    startDate?: number
    endDate?: number
  }): AuditLog[] {
    let logs = [...this.auditLogs]

    if (filters) {
      if (filters.keyId) logs = logs.filter(l => l.keyId === filters.keyId)
      if (filters.userId) logs = logs.filter(l => l.userId === filters.userId)
      if (filters.action) logs = logs.filter(l => l.action === filters.action)
      if (filters.startDate) logs = logs.filter(l => l.timestamp >= filters.startDate!)
      if (filters.endDate) logs = logs.filter(l => l.timestamp <= filters.endDate!)
    }

    return logs.sort((a, b) => b.timestamp - a.timestamp)
  }

  // Get vault statistics
  getVaultStats(): {
    totalKeys: number
    activeKeys: number
    expiredKeys: number
    rotationsDue: number
    usageToday: number
    topServices: { service: string, count: number }[]
    environmentDistribution: { environment: string, count: number }[]
  } {
    const keys = Array.from(this.keys.values())
    const now = Date.now()
    
    const activeKeys = keys.filter(k => k.status === 'active').length
    const expiredKeys = keys.filter(k => k.expiresAt && k.expiresAt < now).length
    const rotationsDue = Array.from(this.rotationSchedules.values())
      .filter(s => s.nextRotation < now).length

    const usageToday = keys.reduce((sum, k) => sum + k.usage.today, 0)

    // Service distribution
    const serviceCounts = new Map<string, number>()
    keys.forEach(k => {
      serviceCounts.set(k.service, (serviceCounts.get(k.service) || 0) + 1)
    })
    const topServices = Array.from(serviceCounts.entries())
      .map(([service, count]) => ({ service, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Environment distribution
    const envCounts = new Map<string, number>()
    keys.forEach(k => {
      envCounts.set(k.environment, (envCounts.get(k.environment) || 0) + 1)
    })
    const environmentDistribution = Array.from(envCounts.entries())
      .map(([environment, count]) => ({ environment, count }))

    return {
      totalKeys: keys.length,
      activeKeys,
      expiredKeys,
      rotationsDue,
      usageToday,
      topServices,
      environmentDistribution
    }
  }

  // Encryption/Decryption methods
  private encrypt(text: string): string {
    const algorithm = 'aes-256-gcm'
    const key = crypto.scryptSync(this.config.encryptionKey, 'salt', 32)
    const iv = crypto.randomBytes(16)
    
    const cipher = crypto.createCipher(algorithm, key)
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    
    return `${iv.toString('hex')}:${encrypted}`
  }

  private decrypt(encryptedText: string): string {
    const algorithm = 'aes-256-gcm'
    const key = crypto.scryptSync(this.config.encryptionKey, 'salt', 32)
    const [ivHex, encrypted] = encryptedText.split(':')
    const iv = Buffer.from(ivHex, 'hex')
    
    const decipher = crypto.createDecipher(algorithm, key)
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    
    return decrypted
  }

  private generateEncryptionKey(): string {
    return crypto.randomBytes(32).toString('hex')
  }

  // Schedule rotation
  private scheduleRotation(keyId: string): void {
    const schedule: KeyRotationSchedule = {
      keyId,
      nextRotation: Date.now() + (this.config.rotationInterval * 24 * 60 * 60 * 1000),
      frequency: 'quarterly',
      autoRotate: false, // Manual approval required
      notifyBefore: 7 // 7 days notice
    }
    
    this.rotationSchedules.set(keyId, schedule)
  }

  private updateRotationSchedule(keyId: string): void {
    const schedule = this.rotationSchedules.get(keyId)
    if (schedule) {
      schedule.nextRotation = Date.now() + (this.config.rotationInterval * 24 * 60 * 60 * 1000)
      this.rotationSchedules.set(keyId, schedule)
    }
  }

  private startRotationScheduler(): void {
    // Check for due rotations every hour
    setInterval(() => {
      this.checkDueRotations()
    }, 60 * 60 * 1000)
  }

  private checkDueRotations(): void {
    const now = Date.now()
    const dueRotations = Array.from(this.rotationSchedules.values())
      .filter(s => s.nextRotation < now)
    
    dueRotations.forEach(schedule => {
      console.log(`Rotation due for key: ${schedule.keyId}`)
      // In production, this would trigger notifications
    })
  }

  private hasAdminAccess(userId: string): boolean {
    // Mock admin check - in production, check user roles
    return userId.includes('admin')
  }

  private logAction(
    action: AuditLog['action'],
    keyId: string,
    userId: string,
    details: string,
    success: boolean = true
  ): void {
    if (!this.config.auditLogEnabled) return

    const log: AuditLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      action,
      keyId,
      userId,
      ipAddress: '127.0.0.1', // Mock IP
      userAgent: 'SolX-Platform/1.0',
      success,
      details
    }

    this.auditLogs.push(log)
    
    // Keep only last 10000 logs
    if (this.auditLogs.length > 10000) {
      this.auditLogs = this.auditLogs.slice(-10000)
    }
  }

  private initializeMockData(): void {
    // Create some mock API keys
    const mockKeys = [
      {
        name: 'Helius RPC Key',
        service: 'helius',
        keyType: 'private' as const,
        value: 'helius_key_123456789abcdef',
        permissions: ['read', 'write'],
        rateLimits: { daily: 10000, hourly: 1000, minute: 100 },
        environment: 'production' as const,
        owner: 'user_123',
        tags: ['rpc', 'solana'],
        metadata: { region: 'us-east-1' }
      },
      {
        name: 'Jupiter API Key',
        service: 'jupiter',
        keyType: 'public' as const,
        value: 'jupiter_public_key_987654321',
        permissions: ['read'],
        rateLimits: { daily: 5000, hourly: 500, minute: 50 },
        environment: 'production' as const,
        owner: 'user_123',
        tags: ['dex', 'swap']
      },
      {
        name: 'Development Test Key',
        service: 'custom',
        keyType: 'secret' as const,
        value: 'dev_secret_key_abcdef123456',
        permissions: ['read', 'write', 'admin'],
        rateLimits: { daily: 1000, hourly: 100, minute: 10 },
        environment: 'development' as const,
        owner: 'user_123',
        tags: ['development', 'testing']
      }
    ]

    mockKeys.forEach(keyData => {
      this.createAPIKey(keyData)
    })
  }
}

export const apiKeyVault = APIKeyVault.getInstance()
