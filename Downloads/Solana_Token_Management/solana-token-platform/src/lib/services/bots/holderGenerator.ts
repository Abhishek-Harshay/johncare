import { testnetService } from '../testnet'

interface HolderConfig {
  tokenAddress: string
  targetHolders: number
  duration: number
  minBalance: number
  maxBalance: number
  holderPattern: 'natural' | 'whale-heavy' | 'retail-focused' | 'balanced'
  retentionRate: number
  distributionSpeed: number
}

interface HolderSession {
  id: string
  config: HolderConfig
  status: 'idle' | 'running' | 'paused' | 'completed' | 'error'
  startTime?: string
  endTime?: string
  currentHolders: number
  targetHolders: number
  walletsCreated: number
  totalDistributed: number
  averageBalance: number
  errors: string[]
}

interface GeneratedWallet {
  address: string
  privateKey: string
  balance: number
  createdAt: string
  active: boolean
}

class HolderGeneratorService {
  private sessions: Map<string, HolderSession> = new Map()
  private wallets: Map<string, GeneratedWallet[]> = new Map()
  private intervals: Map<string, NodeJS.Timeout> = new Map()

  // Generate unique session ID
  private generateSessionId(): string {
    return `holder_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Generate wallet address (simulation)
  private generateWallet(): GeneratedWallet {
    const address = Array.from({ length: 44 }, () => 
      'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz123456789'[Math.floor(Math.random() * 58)]
    ).join('')
    
    const privateKey = Array.from({ length: 88 }, () => 
      'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz123456789'[Math.floor(Math.random() * 58)]
    ).join('')

    return {
      address,
      privateKey,
      balance: 0,
      createdAt: new Date().toISOString(),
      active: true
    }
  }

  // Calculate balance based on holder pattern
  private calculateBalance(config: HolderConfig, holderIndex: number): number {
    const { minBalance, maxBalance, holderPattern, targetHolders } = config
    const position = holderIndex / targetHolders

    switch (holderPattern) {
      case 'whale-heavy':
        // 20% whales, 80% smaller holders
        if (position < 0.2) {
          return maxBalance * (0.5 + Math.random() * 0.5) // 50-100% of max
        }
        return minBalance + Math.random() * (maxBalance * 0.1)

      case 'retail-focused':
        // Mostly small holders with few medium holders
        const variance = Math.random()
        if (variance > 0.9) {
          return maxBalance * (0.1 + Math.random() * 0.3) // 10-40% of max
        }
        return minBalance + Math.random() * (minBalance * 5)

      case 'balanced':
        // Even distribution with some randomness
        const tier = Math.random()
        if (tier < 0.1) return maxBalance * (0.7 + Math.random() * 0.3) // Top 10%
        if (tier < 0.3) return maxBalance * (0.3 + Math.random() * 0.4) // Next 20%
        return minBalance + Math.random() * (maxBalance * 0.3)

      case 'natural':
      default:
        // Power law distribution (more realistic)
        const power = Math.pow(Math.random(), 2.5) // Pareto-like distribution
        return minBalance + power * (maxBalance - minBalance)
    }
  }

  // Start holder generation session
  async startSession(config: HolderConfig): Promise<{ success: boolean; sessionId?: string; message: string }> {
    try {
      // Validate configuration
      if (!config.tokenAddress) {
        return { success: false, message: 'Token address is required' }
      }

      if (config.targetHolders < 10 || config.targetHolders > 10000) {
        return { success: false, message: 'Target holders must be between 10 and 10,000' }
      }

      if (config.minBalance >= config.maxBalance) {
        return { success: false, message: 'Minimum balance must be less than maximum balance' }
      }

      // Check if using testnet for validation
      const isTestMode = testnetService.isTestMode()
      if (!isTestMode) {
        console.log('🚨 Mainnet holder generation - Use with caution!')
      }

      const sessionId = this.generateSessionId()
      const session: HolderSession = {
        id: sessionId,
        config,
        status: 'running',
        startTime: new Date().toISOString(),
        currentHolders: 0,
        targetHolders: config.targetHolders,
        walletsCreated: 0,
        totalDistributed: 0,
        averageBalance: 0,
        errors: []
      }

      this.sessions.set(sessionId, session)
      this.wallets.set(sessionId, [])

      // Start holder generation process
      await this.startHolderGeneration(sessionId)

      return {
        success: true,
        sessionId,
        message: 'Holder generation started successfully'
      }

    } catch (error) {
      console.error('Failed to start holder generation session:', error)
      return {
        success: false,
        message: 'Failed to start holder generation session'
      }
    }
  }

  // Start the holder generation process
  private async startHolderGeneration(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId)
    if (!session) return

    const { config } = session
    const intervalMs = (60 * 1000) / config.distributionSpeed // Convert holders/min to ms interval

    const interval = setInterval(async () => {
      try {
        const currentSession = this.sessions.get(sessionId)
        if (!currentSession || currentSession.status !== 'running') {
          clearInterval(interval)
          this.intervals.delete(sessionId)
          return
        }

        // Generate new holders
        const holdersToCreate = Math.min(1, currentSession.targetHolders - currentSession.currentHolders)
        if (holdersToCreate <= 0) {
          await this.completeSession(sessionId)
          clearInterval(interval)
          this.intervals.delete(sessionId)
          return
        }

        for (let i = 0; i < holdersToCreate; i++) {
          await this.createHolder(sessionId, currentSession.currentHolders + i)
        }

        // Update session progress
        currentSession.currentHolders += holdersToCreate
        currentSession.walletsCreated += holdersToCreate
        
        // Recalculate average balance
        const wallets = this.wallets.get(sessionId) || []
        const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0)
        currentSession.averageBalance = wallets.length > 0 ? totalBalance / wallets.length : 0
        currentSession.totalDistributed = totalBalance

        this.sessions.set(sessionId, currentSession)

        console.log(`📊 Holder generation progress: ${currentSession.currentHolders}/${currentSession.targetHolders} holders created`)

      } catch (error) {
        console.error('Error in holder generation:', error)
        const currentSession = this.sessions.get(sessionId)
        if (currentSession) {
          currentSession.errors.push(`Generation error: ${error instanceof Error ? error.message : 'Unknown error'}`)
          this.sessions.set(sessionId, currentSession)
        }
      }
    }, intervalMs)

    this.intervals.set(sessionId, interval)
  }

  // Create individual holder
  private async createHolder(sessionId: string, holderIndex: number): Promise<void> {
    const session = this.sessions.get(sessionId)
    const wallets = this.wallets.get(sessionId)
    if (!session || !wallets) return

    try {
      // Generate new wallet
      const wallet = this.generateWallet()
      
      // Calculate balance based on holder pattern
      wallet.balance = this.calculateBalance(session.config, holderIndex)

      // Simulate token distribution (in testnet, this is just simulation)
      const isTestMode = testnetService.isTestMode()
      if (isTestMode) {
        console.log(`🧪 [TESTNET] Simulating token distribution to ${wallet.address.slice(0, 8)}... - Balance: ${wallet.balance.toLocaleString()}`)
      } else {
        console.log(`💰 [MAINNET] Would distribute ${wallet.balance.toLocaleString()} tokens to ${wallet.address.slice(0, 8)}...`)
        // In mainnet, actual token distribution logic would go here
      }

      wallets.push(wallet)
      this.wallets.set(sessionId, wallets)

    } catch (error) {
      console.error('Failed to create holder:', error)
      throw error
    }
  }

  // Complete session
  private async completeSession(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId)
    if (!session) return

    session.status = 'completed'
    session.endTime = new Date().toISOString()
    
    // Apply retention rate (some holders might sell/become inactive)
    const wallets = this.wallets.get(sessionId) || []
    const retainedCount = Math.floor(wallets.length * (session.config.retentionRate / 100))
    
    // Mark some wallets as inactive based on retention rate
    const walletsToDeactivate = wallets.length - retainedCount
    for (let i = 0; i < walletsToDeactivate; i++) {
      const randomIndex = Math.floor(Math.random() * wallets.length)
      if (wallets[randomIndex] && wallets[randomIndex].active) {
        wallets[randomIndex].active = false
      }
    }

    session.currentHolders = retainedCount
    this.sessions.set(sessionId, session)
    this.wallets.set(sessionId, wallets)

    console.log(`✅ Holder generation completed for session ${sessionId}`)
    console.log(`📊 Final stats: ${retainedCount} active holders, ${session.totalDistributed.toLocaleString()} tokens distributed`)
  }

  // Pause session
  async pauseSession(sessionId: string): Promise<{ success: boolean; message: string }> {
    const session = this.sessions.get(sessionId)
    if (!session) {
      return { success: false, message: 'Session not found' }
    }

    if (session.status !== 'running') {
      return { success: false, message: 'Session is not running' }
    }

    session.status = 'paused'
    this.sessions.set(sessionId, session)

    // Clear interval
    const interval = this.intervals.get(sessionId)
    if (interval) {
      clearInterval(interval)
      this.intervals.delete(sessionId)
    }

    return { success: true, message: 'Session paused successfully' }
  }

  // Resume session
  async resumeSession(sessionId: string): Promise<{ success: boolean; message: string }> {
    const session = this.sessions.get(sessionId)
    if (!session) {
      return { success: false, message: 'Session not found' }
    }

    if (session.status !== 'paused') {
      return { success: false, message: 'Session is not paused' }
    }

    session.status = 'running'
    this.sessions.set(sessionId, session)

    // Restart holder generation
    await this.startHolderGeneration(sessionId)

    return { success: true, message: 'Session resumed successfully' }
  }

  // Stop session
  async stopSession(sessionId: string): Promise<{ success: boolean; message: string }> {
    const session = this.sessions.get(sessionId)
    if (!session) {
      return { success: false, message: 'Session not found' }
    }

    session.status = 'completed'
    session.endTime = new Date().toISOString()
    this.sessions.set(sessionId, session)

    // Clear interval
    const interval = this.intervals.get(sessionId)
    if (interval) {
      clearInterval(interval)
      this.intervals.delete(sessionId)
    }

    return { success: true, message: 'Session stopped successfully' }
  }

  // Get session status
  getSession(sessionId: string): HolderSession | null {
    return this.sessions.get(sessionId) || null
  }

  // Get all sessions
  getAllSessions(): HolderSession[] {
    return Array.from(this.sessions.values())
  }

  // Get wallets for a session
  getSessionWallets(sessionId: string): GeneratedWallet[] {
    return this.wallets.get(sessionId) || []
  }

  // Export wallets to CSV format
  exportWallets(sessionId: string): string {
    const wallets = this.wallets.get(sessionId) || []
    const csvHeader = 'Address,PrivateKey,Balance,CreatedAt,Active'
    const csvRows = wallets.map(wallet => 
      `${wallet.address},${wallet.privateKey},${wallet.balance},${wallet.createdAt},${wallet.active}`
    )
    
    return [csvHeader, ...csvRows].join('\n')
  }

  // Get holder distribution stats
  getHolderStats(sessionId: string): {
    totalHolders: number
    activeHolders: number
    totalDistributed: number
    averageBalance: number
    medianBalance: number
    whaleHolders: number // >1M tokens
    retailHolders: number // <10k tokens
  } | null {
    const wallets = this.wallets.get(sessionId) || []
    if (wallets.length === 0) return null

    const activeWallets = wallets.filter(w => w.active)
    const balances = activeWallets.map(w => w.balance).sort((a, b) => a - b)
    const totalDistributed = balances.reduce((sum, balance) => sum + balance, 0)

    return {
      totalHolders: wallets.length,
      activeHolders: activeWallets.length,
      totalDistributed,
      averageBalance: totalDistributed / activeWallets.length,
      medianBalance: balances[Math.floor(balances.length / 2)],
      whaleHolders: balances.filter(b => b > 1000000).length,
      retailHolders: balances.filter(b => b < 10000).length
    }
  }

  // Cleanup completed sessions (optional)
  cleanup(): number {
    let cleaned = 0
    const cutoffTime = Date.now() - (24 * 60 * 60 * 1000) // 24 hours ago

    for (const [sessionId, session] of this.sessions.entries()) {
      if (session.status === 'completed' && session.endTime) {
        const endTime = new Date(session.endTime).getTime()
        if (endTime < cutoffTime) {
          this.sessions.delete(sessionId)
          this.wallets.delete(sessionId)
          
          const interval = this.intervals.get(sessionId)
          if (interval) {
            clearInterval(interval)
            this.intervals.delete(sessionId)
          }
          
          cleaned++
        }
      }
    }

    if (cleaned > 0) {
      console.log(`🧹 Cleaned up ${cleaned} old holder generation sessions`)
    }

    return cleaned
  }
}

export const holderGeneratorService = new HolderGeneratorService()
