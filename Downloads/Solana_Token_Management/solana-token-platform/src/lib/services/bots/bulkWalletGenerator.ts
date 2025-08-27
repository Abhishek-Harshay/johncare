import { testnetService } from '../testnet'
import { Keypair } from '@solana/web3.js'
import bs58 from 'bs58'

interface WalletGeneratorConfig {
  count: number
  format: 'json' | 'csv' | 'txt'
  includePrivateKeys: boolean
  walletPrefix?: string
  generateMnemonics: boolean
}

interface GeneratedWallet {
  id: number
  publicKey: string
  privateKey: string
  mnemonic?: string
  createdAt: string
  balance: number
  isActive: boolean
}

interface WalletSession {
  id: string
  config: WalletGeneratorConfig
  status: 'idle' | 'generating' | 'completed' | 'error'
  startTime?: string
  endTime?: string
  walletsGenerated: number
  targetCount: number
  errors: string[]
  filePath?: string
}

class BulkWalletGeneratorService {
  private sessions: Map<string, WalletSession> = new Map()
  private wallets: Map<string, GeneratedWallet[]> = new Map()

  // Generate unique session ID
  private generateSessionId(): string {
    return `wallet_gen_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Generate a single Solana wallet
  private generateSolanaWallet(id: number, prefix?: string): GeneratedWallet {
    try {
      const keypair = Keypair.generate()
      const publicKey = keypair.publicKey.toBase58()
      const privateKey = bs58.encode(keypair.secretKey)

      return {
        id,
        publicKey: prefix ? `${prefix}_${publicKey}` : publicKey,
        privateKey,
        createdAt: new Date().toISOString(),
        balance: 0,
        isActive: true
      }
    } catch (error) {
      throw new Error(`Failed to generate wallet ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  // Generate mnemonic phrase (simulation for demo)
  private generateMnemonic(): string {
    const words = [
      'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract',
      'absurd', 'abuse', 'access', 'accident', 'account', 'accuse', 'achieve', 'acid',
      'acoustic', 'acquire', 'across', 'act', 'action', 'actor', 'actress', 'actual',
      'adapt', 'add', 'addict', 'address', 'adjust', 'admit', 'adult', 'advance',
      'advice', 'aerobic', 'affair', 'afford', 'afraid', 'again', 'against', 'agent',
      'agree', 'ahead', 'aim', 'air', 'airport', 'aisle', 'alarm', 'album',
      'alcohol', 'alert', 'alien', 'all', 'alley', 'allow', 'almost', 'alone'
    ]
    
    return Array.from({ length: 12 }, () => words[Math.floor(Math.random() * words.length)]).join(' ')
  }

  // Start bulk wallet generation
  async startGeneration(config: WalletGeneratorConfig): Promise<{ success: boolean; sessionId?: string; message: string }> {
    try {
      // Validate configuration
      if (config.count < 1 || config.count > 100000) {
        return { success: false, message: 'Wallet count must be between 1 and 100,000' }
      }

      const sessionId = this.generateSessionId()
      const session: WalletSession = {
        id: sessionId,
        config,
        status: 'generating',
        startTime: new Date().toISOString(),
        walletsGenerated: 0,
        targetCount: config.count,
        errors: []
      }

      this.sessions.set(sessionId, session)
      this.wallets.set(sessionId, [])

      // Start generation process
      this.generateWalletsBatch(sessionId)

      return {
        success: true,
        sessionId,
        message: 'Bulk wallet generation started'
      }

    } catch (error) {
      console.error('Failed to start wallet generation:', error)
      return {
        success: false,
        message: 'Failed to start wallet generation'
      }
    }
  }

  // Generate wallets in batches
  private async generateWalletsBatch(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId)
    if (!session) return

    const batchSize = 100 // Generate 100 wallets at a time
    const { config } = session

    try {
      while (session.walletsGenerated < config.count && session.status === 'generating') {
        const remainingWallets = config.count - session.walletsGenerated
        const currentBatchSize = Math.min(batchSize, remainingWallets)

        // Generate batch of wallets
        const batch: GeneratedWallet[] = []
        
        for (let i = 0; i < currentBatchSize; i++) {
          const walletId = session.walletsGenerated + i + 1
          const wallet = this.generateSolanaWallet(walletId, config.walletPrefix)
          
          // Add mnemonic if requested
          if (config.generateMnemonics) {
            wallet.mnemonic = this.generateMnemonic()
          }

          batch.push(wallet)
        }

        // Add batch to session wallets
        const existingWallets = this.wallets.get(sessionId) || []
        this.wallets.set(sessionId, [...existingWallets, ...batch])

        // Update session progress
        session.walletsGenerated += currentBatchSize
        this.sessions.set(sessionId, session)

        const isTestMode = testnetService.isTestMode()
        console.log(`${isTestMode ? '🧪 [TESTNET]' : '💼 [MAINNET]'} Generated batch: ${session.walletsGenerated}/${config.count} wallets`)

        // Small delay to prevent overwhelming the system
        await new Promise(resolve => setTimeout(resolve, 10))
      }

      // Complete generation
      if (session.walletsGenerated >= config.count) {
        session.status = 'completed'
        session.endTime = new Date().toISOString()
        this.sessions.set(sessionId, session)

        console.log(`✅ Wallet generation completed: ${session.walletsGenerated} wallets generated`)
      }

    } catch (error) {
      console.error('Error in wallet generation batch:', error)
      session.status = 'error'
      session.errors.push(`Generation error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      this.sessions.set(sessionId, session)
    }
  }

  // Get session status
  getSession(sessionId: string): WalletSession | null {
    return this.sessions.get(sessionId) || null
  }

  // Get all sessions
  getAllSessions(): WalletSession[] {
    return Array.from(this.sessions.values())
  }

  // Get wallets for session
  getSessionWallets(sessionId: string): GeneratedWallet[] {
    return this.wallets.get(sessionId) || []
  }

  // Export wallets in different formats
  exportWallets(sessionId: string, format: 'json' | 'csv' | 'txt'): string | null {
    const wallets = this.wallets.get(sessionId)
    const session = this.sessions.get(sessionId)
    
    if (!wallets || !session) return null

    const includePrivateKeys = session.config.includePrivateKeys

    switch (format) {
      case 'json':
        return JSON.stringify(
          wallets.map(wallet => ({
            id: wallet.id,
            publicKey: wallet.publicKey,
            ...(includePrivateKeys && { privateKey: wallet.privateKey }),
            ...(wallet.mnemonic && { mnemonic: wallet.mnemonic }),
            createdAt: wallet.createdAt,
            balance: wallet.balance
          })),
          null,
          2
        )

      case 'csv':
        const headers = [
          'ID',
          'PublicKey',
          ...(includePrivateKeys ? ['PrivateKey'] : []),
          ...(session.config.generateMnemonics ? ['Mnemonic'] : []),
          'CreatedAt',
          'Balance'
        ]
        
        const rows = wallets.map(wallet => [
          wallet.id.toString(),
          wallet.publicKey,
          ...(includePrivateKeys ? [wallet.privateKey] : []),
          ...(wallet.mnemonic ? [wallet.mnemonic] : []),
          wallet.createdAt,
          wallet.balance.toString()
        ])

        return [headers.join(','), ...rows.map(row => row.join(','))].join('\n')

      case 'txt':
        return wallets.map(wallet => {
          let line = `${wallet.id}. ${wallet.publicKey}`
          if (includePrivateKeys) {
            line += ` | ${wallet.privateKey}`
          }
          if (wallet.mnemonic) {
            line += ` | ${wallet.mnemonic}`
          }
          return line
        }).join('\n')

      default:
        return null
    }
  }

  // Get wallet statistics
  getWalletStats(sessionId: string): {
    totalWallets: number
    activeWallets: number
    totalBalance: number
    averageBalance: number
    walletsWith0Balance: number
    generationTime: number
  } | null {
    const wallets = this.wallets.get(sessionId)
    const session = this.sessions.get(sessionId)
    
    if (!wallets || !session) return null

    const activeWallets = wallets.filter(w => w.isActive)
    const totalBalance = wallets.reduce((sum, w) => sum + w.balance, 0)
    const walletsWith0Balance = wallets.filter(w => w.balance === 0).length

    let generationTime = 0
    if (session.startTime && session.endTime) {
      generationTime = new Date(session.endTime).getTime() - new Date(session.startTime).getTime()
    }

    return {
      totalWallets: wallets.length,
      activeWallets: activeWallets.length,
      totalBalance,
      averageBalance: wallets.length > 0 ? totalBalance / wallets.length : 0,
      walletsWith0Balance,
      generationTime
    }
  }

  // Delete session and associated data
  deleteSession(sessionId: string): { success: boolean; message: string } {
    const session = this.sessions.get(sessionId)
    if (!session) {
      return { success: false, message: 'Session not found' }
    }

    this.sessions.delete(sessionId)
    this.wallets.delete(sessionId)

    return { success: true, message: 'Session deleted successfully' }
  }

  // Get wallet by public key
  findWallet(sessionId: string, publicKey: string): GeneratedWallet | null {
    const wallets = this.wallets.get(sessionId)
    if (!wallets) return null

    return wallets.find(w => w.publicKey === publicKey) || null
  }

  // Update wallet balance (for tracking purposes)
  updateWalletBalance(sessionId: string, publicKey: string, balance: number): boolean {
    const wallets = this.wallets.get(sessionId)
    if (!wallets) return false

    const wallet = wallets.find(w => w.publicKey === publicKey)
    if (!wallet) return false

    wallet.balance = balance
    this.wallets.set(sessionId, wallets)
    return true
  }

  // Cleanup old sessions
  cleanup(): number {
    let cleaned = 0
    const cutoffTime = Date.now() - (7 * 24 * 60 * 60 * 1000) // 7 days ago

    for (const [sessionId, session] of this.sessions.entries()) {
      if (session.status === 'completed' && session.endTime) {
        const endTime = new Date(session.endTime).getTime()
        if (endTime < cutoffTime) {
          this.sessions.delete(sessionId)
          this.wallets.delete(sessionId)
          cleaned++
        }
      }
    }

    if (cleaned > 0) {
      console.log(`🧹 Cleaned up ${cleaned} old wallet generation sessions`)
    }

    return cleaned
  }
}

export const bulkWalletGeneratorService = new BulkWalletGeneratorService()
