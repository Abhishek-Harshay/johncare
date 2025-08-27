import { testnetService } from '../testnet'
import { Connection, PublicKey, Transaction, Keypair, sendAndConfirmTransaction } from '@solana/web3.js'
import { 
  createTransferInstruction, 
  getOrCreateAssociatedTokenAccount,
  getAccount,
  TOKEN_PROGRAM_ID
} from '@solana/spl-token'

interface TokenDistributionConfig {
  sourcePrivateKey: string
  tokenMintAddress: string
  targetWallets: string[]
  amountPerWallet: number
  distributionPattern: 'equal' | 'random' | 'weighted' | 'custom'
  customAmounts?: number[]
  minAmount?: number
  maxAmount?: number
  batchSize: number
  delayBetweenBatches: number
  decimals: number
}

interface TokenDistributionSession {
  id: string
  config: TokenDistributionConfig
  status: 'idle' | 'running' | 'paused' | 'completed' | 'error'
  startTime?: string
  endTime?: string
  walletsProcessed: number
  totalWallets: number
  totalTokensDistributed: number
  successfulTransactions: number
  failedTransactions: number
  errors: string[]
  transactions: TokenTransactionRecord[]
}

interface TokenTransactionRecord {
  signature: string
  toAddress: string
  amount: number
  status: 'success' | 'failed' | 'pending'
  timestamp: string
  error?: string
}

class TokenDistributionService {
  private sessions: Map<string, TokenDistributionSession> = new Map()
  private intervals: Map<string, NodeJS.Timeout> = new Map()

  // Generate unique session ID
  private generateSessionId(): string {
    return `token_dist_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Get Solana connection
  private getConnection(): Connection {
    const networkInfo = testnetService.getNetworkInfo()
    return new Connection(networkInfo.rpcEndpoint, 'confirmed')
  }

  // Calculate distribution amounts
  private calculateDistributionAmounts(config: TokenDistributionConfig): number[] {
    const { targetWallets, distributionPattern, amountPerWallet, customAmounts, minAmount, maxAmount } = config

    switch (distributionPattern) {
      case 'equal':
        return new Array(targetWallets.length).fill(amountPerWallet)

      case 'random':
        const min = minAmount || amountPerWallet * 0.5
        const max = maxAmount || amountPerWallet * 1.5
        return targetWallets.map(() => min + Math.random() * (max - min))

      case 'weighted':
        // Pareto distribution (80/20 rule)
        return targetWallets.map((_, index) => {
          const position = index / targetWallets.length
          if (position < 0.2) {
            // Top 20% get larger amounts
            return amountPerWallet * (1.5 + Math.random() * 1.0)
          } else {
            // Bottom 80% get smaller amounts
            return amountPerWallet * (0.3 + Math.random() * 0.7)
          }
        })

      case 'custom':
        if (customAmounts && customAmounts.length === targetWallets.length) {
          return customAmounts
        }
        // Fallback to equal if custom amounts are invalid
        return new Array(targetWallets.length).fill(amountPerWallet)

      default:
        return new Array(targetWallets.length).fill(amountPerWallet)
    }
  }

  // Validate wallet addresses
  private validateWallets(wallets: string[]): { valid: string[]; invalid: string[] } {
    const valid: string[] = []
    const invalid: string[] = []

    wallets.forEach(wallet => {
      try {
        new PublicKey(wallet)
        valid.push(wallet)
      } catch {
        invalid.push(wallet)
      }
    })

    return { valid, invalid }
  }

  // Start token distribution session
  async startDistribution(config: TokenDistributionConfig): Promise<{ success: boolean; sessionId?: string; message: string }> {
    try {
      // Validate configuration
      if (!config.sourcePrivateKey) {
        return { success: false, message: 'Source private key is required' }
      }

      if (!config.tokenMintAddress) {
        return { success: false, message: 'Token mint address is required' }
      }

      if (!config.targetWallets || config.targetWallets.length === 0) {
        return { success: false, message: 'Target wallets are required' }
      }

      if (config.amountPerWallet <= 0) {
        return { success: false, message: 'Amount per wallet must be greater than 0' }
      }

      // Validate wallet addresses
      const { valid: validWallets, invalid: invalidWallets } = this.validateWallets(config.targetWallets)
      if (invalidWallets.length > 0) {
        return { 
          success: false, 
          message: `Invalid wallet addresses found: ${invalidWallets.slice(0, 3).join(', ')}${invalidWallets.length > 3 ? '...' : ''}` 
        }
      }

      // Validate source wallet and token mint
      let sourceKeypair: Keypair
      let tokenMint: PublicKey
      try {
        const privateKeyBytes = Buffer.from(config.sourcePrivateKey, 'base64')
        sourceKeypair = Keypair.fromSecretKey(privateKeyBytes)
        tokenMint = new PublicKey(config.tokenMintAddress)
      } catch {
        return { success: false, message: 'Invalid source private key or token mint address format' }
      }

      // Check source token account balance
      const connection = this.getConnection()
      try {
        const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          sourceKeypair,
          tokenMint,
          sourceKeypair.publicKey
        )

        const accountInfo = await getAccount(connection, sourceTokenAccount.address)
        const sourceBalance = Number(accountInfo.amount)
        
        const amounts = this.calculateDistributionAmounts(config)
        const totalNeeded = amounts.reduce((sum, amount) => sum + amount, 0) * Math.pow(10, config.decimals)

        if (sourceBalance < totalNeeded) {
          return { 
            success: false, 
            message: `Insufficient token balance. Need ${totalNeeded / Math.pow(10, config.decimals)} tokens, have ${sourceBalance / Math.pow(10, config.decimals)} tokens` 
          }
        }
      } catch (error) {
        return { success: false, message: 'Failed to check source token account balance' }
      }

      const sessionId = this.generateSessionId()
      const session: TokenDistributionSession = {
        id: sessionId,
        config: { ...config, targetWallets: validWallets },
        status: 'running',
        startTime: new Date().toISOString(),
        walletsProcessed: 0,
        totalWallets: validWallets.length,
        totalTokensDistributed: 0,
        successfulTransactions: 0,
        failedTransactions: 0,
        errors: [],
        transactions: []
      }

      this.sessions.set(sessionId, session)

      // Calculate distribution amounts
      const amounts = this.calculateDistributionAmounts(config)

      // Start distribution process
      this.startDistributionProcess(sessionId, sourceKeypair, tokenMint, amounts)

      return {
        success: true,
        sessionId,
        message: 'Token distribution started successfully'
      }

    } catch (error) {
      console.error('Failed to start token distribution:', error)
      return {
        success: false,
        message: 'Failed to start token distribution'
      }
    }
  }

  // Start the distribution process
  private async startDistributionProcess(
    sessionId: string, 
    sourceKeypair: Keypair, 
    tokenMint: PublicKey,
    amounts: number[]
  ): Promise<void> {
    const session = this.sessions.get(sessionId)
    if (!session) return

    const connection = this.getConnection()
    const { config } = session
    let currentIndex = 0

    const processBatch = async () => {
      try {
        const currentSession = this.sessions.get(sessionId)
        if (!currentSession || currentSession.status !== 'running') {
          const interval = this.intervals.get(sessionId)
          if (interval) {
            clearInterval(interval)
            this.intervals.delete(sessionId)
          }
          return
        }

        const batchEnd = Math.min(currentIndex + config.batchSize, config.targetWallets.length)
        const batch = config.targetWallets.slice(currentIndex, batchEnd)
        const batchAmounts = amounts.slice(currentIndex, batchEnd)

        console.log(`🪙 Processing token batch ${Math.floor(currentIndex / config.batchSize) + 1}: ${batch.length} transfers`)

        // Process batch in parallel
        const promises = batch.map(async (targetWallet, batchIndex) => {
          const amount = batchAmounts[batchIndex]
          return this.sendTokens(connection, sourceKeypair, tokenMint, targetWallet, amount, config.decimals, sessionId)
        })

        const results = await Promise.allSettled(promises)

        // Update session with results
        results.forEach((result, batchIndex) => {
          currentSession.walletsProcessed++
          
          if (result.status === 'fulfilled' && result.value.success) {
            currentSession.successfulTransactions++
            currentSession.totalTokensDistributed += batchAmounts[batchIndex]
            currentSession.transactions.push({
              signature: result.value.signature!,
              toAddress: batch[batchIndex],
              amount: batchAmounts[batchIndex],
              status: 'success',
              timestamp: new Date().toISOString()
            })
          } else {
            currentSession.failedTransactions++
            const error = result.status === 'rejected' ? result.reason : result.value.error
            currentSession.errors.push(`Failed to send tokens to ${batch[batchIndex]}: ${error}`)
            currentSession.transactions.push({
              signature: '',
              toAddress: batch[batchIndex],
              amount: batchAmounts[batchIndex],
              status: 'failed',
              timestamp: new Date().toISOString(),
              error: error
            })
          }
        })

        this.sessions.set(sessionId, currentSession)

        currentIndex = batchEnd

        // Check if distribution is complete
        if (currentIndex >= config.targetWallets.length) {
          currentSession.status = 'completed'
          currentSession.endTime = new Date().toISOString()
          this.sessions.set(sessionId, currentSession)

          const interval = this.intervals.get(sessionId)
          if (interval) {
            clearInterval(interval)
            this.intervals.delete(sessionId)
          }

          console.log(`✅ Token distribution completed: ${currentSession.successfulTransactions}/${currentSession.totalWallets} successful`)
        }

      } catch (error) {
        console.error('Error in token distribution batch:', error)
        const currentSession = this.sessions.get(sessionId)
        if (currentSession) {
          currentSession.errors.push(`Batch error: ${error instanceof Error ? error.message : 'Unknown error'}`)
          this.sessions.set(sessionId, currentSession)
        }
      }
    }

    // Start processing batches
    await processBatch() // Process first batch immediately
    
    if (currentIndex < config.targetWallets.length) {
      const interval = setInterval(processBatch, config.delayBetweenBatches * 1000)
      this.intervals.set(sessionId, interval)
    }
  }

  // Send tokens to a single wallet
  private async sendTokens(
    connection: Connection,
    sourceKeypair: Keypair,
    tokenMint: PublicKey,
    targetAddress: string,
    amount: number,
    decimals: number,
    sessionId: string
  ): Promise<{ success: boolean; signature?: string; error?: string }> {
    try {
      const targetPublicKey = new PublicKey(targetAddress)
      const tokenAmount = amount * Math.pow(10, decimals)

      // Get or create source token account
      const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        sourceKeypair,
        tokenMint,
        sourceKeypair.publicKey
      )

      // Get or create destination token account
      const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        sourceKeypair,
        tokenMint,
        targetPublicKey
      )

      const isTestMode = testnetService.isTestMode()
      
      if (isTestMode) {
        // Simulate transaction in testnet
        console.log(`🧪 [TESTNET] Simulating ${amount} token transfer to ${targetAddress.slice(0, 8)}...`)
        await new Promise(resolve => setTimeout(resolve, 150)) // Simulate network delay
        
        const mockSignature = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        return { success: true, signature: mockSignature }
      } else {
        // Actual transaction on mainnet
        const transaction = new Transaction().add(
          createTransferInstruction(
            sourceTokenAccount.address,
            destinationTokenAccount.address,
            sourceKeypair.publicKey,
            tokenAmount,
            [],
            TOKEN_PROGRAM_ID
          )
        )

        const signature = await sendAndConfirmTransaction(connection, transaction, [sourceKeypair])
        console.log(`🪙 [MAINNET] Sent ${amount} tokens to ${targetAddress.slice(0, 8)}... | Signature: ${signature}`)
        return { success: true, signature }
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.error(`❌ Failed to send tokens to ${targetAddress}:`, errorMessage)
      return { success: false, error: errorMessage }
    }
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

    try {
      // Recreate keypair and continue distribution
      const privateKeyBytes = Buffer.from(session.config.sourcePrivateKey, 'base64')
      const sourceKeypair = Keypair.fromSecretKey(privateKeyBytes)
      const tokenMint = new PublicKey(session.config.tokenMintAddress)
      
      const amounts = this.calculateDistributionAmounts(session.config)
      const remainingAmounts = amounts.slice(session.walletsProcessed)
      
      session.status = 'running'
      this.sessions.set(sessionId, session)

      // Continue distribution from where it left off
      this.startDistributionProcess(sessionId, sourceKeypair, tokenMint, remainingAmounts)

      return { success: true, message: 'Session resumed successfully' }
    } catch (error) {
      return { success: false, message: 'Failed to resume session' }
    }
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
  getSession(sessionId: string): TokenDistributionSession | null {
    return this.sessions.get(sessionId) || null
  }

  // Get all sessions
  getAllSessions(): TokenDistributionSession[] {
    return Array.from(this.sessions.values())
  }

  // Export transaction history
  exportTransactions(sessionId: string): string | null {
    const session = this.sessions.get(sessionId)
    if (!session) return null

    const csvHeader = 'Signature,ToAddress,Amount,Status,Timestamp,Error'
    const csvRows = session.transactions.map(tx => 
      `${tx.signature},${tx.toAddress},${tx.amount},${tx.status},${tx.timestamp},${tx.error || ''}`
    )
    
    return [csvHeader, ...csvRows].join('\n')
  }

  // Cleanup old sessions
  cleanup(): number {
    let cleaned = 0
    const cutoffTime = Date.now() - (24 * 60 * 60 * 1000) // 24 hours ago

    for (const [sessionId, session] of this.sessions.entries()) {
      if (session.status === 'completed' && session.endTime) {
        const endTime = new Date(session.endTime).getTime()
        if (endTime < cutoffTime) {
          this.sessions.delete(sessionId)
          
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
      console.log(`🧹 Cleaned up ${cleaned} old token distribution sessions`)
    }

    return cleaned
  }
}

export const tokenDistributionService = new TokenDistributionService()
