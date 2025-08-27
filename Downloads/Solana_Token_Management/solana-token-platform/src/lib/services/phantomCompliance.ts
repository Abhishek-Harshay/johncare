import { PublicKey, Connection } from '@solana/web3.js'

export interface PhantomComplianceConfig {
  // Domain verification for dApp browser
  domainVerification: boolean
  // Secure connection requirements
  httpsOnly: boolean
  // Transaction signing safety
  transactionLimits: {
    maxSolPerTransaction: number
    maxTokensPerTransaction: number
    requireConfirmation: boolean
  }
  // Suspicious activity detection
  riskDetection: {
    enabled: boolean
    maxFailedAttempts: number
    cooldownPeriod: number
  }
  // Content Security Policy
  csp: {
    enabled: boolean
    allowedDomains: string[]
  }
}

class PhantomComplianceService {
  private static instance: PhantomComplianceService
  private config: PhantomComplianceConfig
  private connection: Connection
  private suspiciousAddresses: Set<string> = new Set()
  
  constructor() {
    this.config = {
      domainVerification: true,
      httpsOnly: true,
      transactionLimits: {
        maxSolPerTransaction: 100, // 100 SOL max per transaction
        maxTokensPerTransaction: 1000000, // 1M tokens max
        requireConfirmation: true
      },
      riskDetection: {
        enabled: true,
        maxFailedAttempts: 5,
        cooldownPeriod: 300000 // 5 minutes
      },
      csp: {
        enabled: true,
        allowedDomains: [
          'https://solxengine.com',
          'https://api.mainnet-beta.solana.com',
          'https://api.devnet.solana.com',
          'https://api.testnet.solana.com'
        ]
      }
    }
    
    this.connection = new Connection(process.env.NEXT_PUBLIC_HELIUS_RPC_URL || 'https://api.mainnet-beta.solana.com')
  }

  public static getInstance(): PhantomComplianceService {
    if (!PhantomComplianceService.instance) {
      PhantomComplianceService.instance = new PhantomComplianceService()
    }
    return PhantomComplianceService.instance
  }

  // Validate transaction before signing
  async validateTransaction(
    transaction: any,
    userWallet: PublicKey,
    estimatedFee?: number
  ): Promise<{
    isValid: boolean
    warnings: string[]
    errors: string[]
    riskLevel: 'low' | 'medium' | 'high' | 'critical'
  }> {
    const warnings: string[] = []
    const errors: string[] = []
    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low'

    try {
      // Check if HTTPS only
      if (!window.location.protocol.startsWith('https') && window.location.hostname !== 'localhost') {
        errors.push('Insecure connection detected. Please use HTTPS.')
        riskLevel = 'critical'
      }

      // Validate transaction size and complexity
      if (transaction.instructions && transaction.instructions.length > 10) {
        warnings.push('Complex transaction detected. Please review carefully.')
        riskLevel = 'medium'
      }

      // Check for suspicious program interactions
      const suspiciousPrograms = [
        // Add known malicious program IDs here
        'SuspiciousProgram1111111111111111111111111'
      ]

      for (const instruction of transaction.instructions || []) {
        if (instruction.programId && suspiciousPrograms.includes(instruction.programId.toString())) {
          errors.push('Transaction interacts with flagged program')
          riskLevel = 'critical'
        }
      }

      // Validate SOL amount limits
      if (estimatedFee && estimatedFee > this.config.transactionLimits.maxSolPerTransaction) {
        errors.push(`Transaction amount exceeds limit of ${this.config.transactionLimits.maxSolPerTransaction} SOL`)
        riskLevel = 'high'
      }

      // Check wallet reputation
      if (this.suspiciousAddresses.has(userWallet.toString())) {
        warnings.push('Wallet has been flagged for suspicious activity')
        riskLevel = 'high'
      }

      // Validate account balances
      const balance = await this.connection.getBalance(userWallet)
      if (balance < 0.01 * 1e9) { // Less than 0.01 SOL
        warnings.push('Low SOL balance detected. Ensure sufficient funds for transaction fees.')
      }

      return {
        isValid: errors.length === 0,
        warnings,
        errors,
        riskLevel
      }
    } catch (error) {
      return {
        isValid: false,
        warnings: [],
        errors: ['Failed to validate transaction'],
        riskLevel: 'critical'
      }
    }
  }

  // Domain verification for Phantom dApp browser
  verifyDomain(): boolean {
    if (!this.config.domainVerification) return true
    
    const allowedDomains = [
      'localhost:3001',
      'localhost:3000', 
      'solxengine.com',
      'www.solxengine.com',
      'app.solxengine.com'
    ]
    
    return allowedDomains.includes(window.location.host)
  }

  // Content Security Policy validation
  validateCSP(): boolean {
    if (!this.config.csp.enabled) return true
    
    const currentOrigin = window.location.origin
    return this.config.csp.allowedDomains.includes(currentOrigin)
  }

  // Rate limiting for failed attempts
  private failedAttempts: Map<string, { count: number, lastAttempt: number }> = new Map()

  checkRateLimit(walletAddress: string): {
    allowed: boolean
    timeRemaining?: number
  } {
    const now = Date.now()
    const attempts = this.failedAttempts.get(walletAddress)
    
    if (!attempts) {
      return { allowed: true }
    }
    
    // Reset if cooldown period has passed
    if (now - attempts.lastAttempt > this.config.riskDetection.cooldownPeriod) {
      this.failedAttempts.delete(walletAddress)
      return { allowed: true }
    }
    
    if (attempts.count >= this.config.riskDetection.maxFailedAttempts) {
      const timeRemaining = this.config.riskDetection.cooldownPeriod - (now - attempts.lastAttempt)
      return { allowed: false, timeRemaining }
    }
    
    return { allowed: true }
  }

  recordFailedAttempt(walletAddress: string): void {
    const now = Date.now()
    const attempts = this.failedAttempts.get(walletAddress) || { count: 0, lastAttempt: now }
    
    this.failedAttempts.set(walletAddress, {
      count: attempts.count + 1,
      lastAttempt: now
    })
  }

  // Generate security report for user
  generateSecurityReport(walletAddress: string): {
    securityScore: number
    recommendations: string[]
    risks: string[]
  } {
    const recommendations: string[] = []
    const risks: string[] = []
    let securityScore = 100

    // Check if wallet is in suspicious list
    if (this.suspiciousAddresses.has(walletAddress)) {
      securityScore -= 30
      risks.push('Wallet flagged for suspicious activity')
    }

    // Check failed attempts
    const attempts = this.failedAttempts.get(walletAddress)
    if (attempts && attempts.count > 2) {
      securityScore -= 20
      risks.push('Multiple failed transaction attempts detected')
      recommendations.push('Consider reviewing transaction parameters')
    }

    // Add general recommendations
    if (securityScore > 80) {
      recommendations.push('Enable hardware wallet for enhanced security')
      recommendations.push('Regularly review token approvals')
    }

    return {
      securityScore: Math.max(0, securityScore),
      recommendations,
      risks
    }
  }

  // Honeypot detection
  async checkTokenSafety(mintAddress: string): Promise<{
    isSafe: boolean
    riskFactors: string[]
    recommendations: string[]
  }> {
    const riskFactors: string[] = []
    const recommendations: string[] = []

    try {
      // Check if mint exists and is valid
      const mintInfo = await this.connection.getAccountInfo(new PublicKey(mintAddress))
      if (!mintInfo) {
        riskFactors.push('Token mint not found')
        return { isSafe: false, riskFactors, recommendations }
      }

      // Additional safety checks would go here
      // - Check for freeze authority
      // - Verify mint authority
      // - Analyze holder distribution
      // - Check liquidity locks

      recommendations.push('Always verify token legitimacy before trading')
      recommendations.push('Start with small amounts for unknown tokens')

      return {
        isSafe: riskFactors.length === 0,
        riskFactors,
        recommendations
      }
    } catch (error) {
      return {
        isSafe: false,
        riskFactors: ['Failed to analyze token'],
        recommendations: ['Avoid trading this token until verified']
      }
    }
  }
}

export const phantomComplianceService = PhantomComplianceService.getInstance()
