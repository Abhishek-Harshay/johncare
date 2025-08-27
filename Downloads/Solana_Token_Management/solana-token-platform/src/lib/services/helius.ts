// Helius API Service - Premium Solana RPC & Data
// ===============================================

export interface HeliusTokenData {
  mint: string
  name: string
  symbol: string
  decimals: number
  supply: string
  holders: number
  marketCap?: number
  price?: number
}

export interface HeliusWalletData {
  address: string
  lamports: number
  tokens: Array<{
    mint: string
    amount: string
    decimals: number
  }>
}

export interface HeliusTransactionData {
  signature: string
  slot: number
  blockTime: number
  status: 'success' | 'failed'
  fee: number
  instructions: any[]
}

class HeliusService {
  private apiKeys: string[]
  private currentKeyIndex: number
  private baseUrl: string

  constructor() {
    this.apiKeys = [
      process.env.HELIUS_API_KEY_1 || '',
      process.env.HELIUS_API_KEY_2 || '',
      process.env.HELIUS_API_KEY_3 || '',
      process.env.HELIUS_API_KEY_4 || '',
      process.env.HELIUS_API_KEY_5 || '',
      process.env.HELIUS_API_KEY_6 || ''
    ].filter(key => key && key.length > 10) // Filter out empty or placeholder keys
    
    this.currentKeyIndex = 0
    this.baseUrl = 'https://api.helius.xyz/v0'
    
    console.log(`🔑 Helius Service initialized with ${this.apiKeys.length} API keys`)
  }

  private getCurrentApiKey(): string {
    if (this.apiKeys.length === 0) {
      throw new Error('No valid Helius API keys configured')
    }
    return this.apiKeys[this.currentKeyIndex]
  }

  private rotateApiKey() {
    this.currentKeyIndex = (this.currentKeyIndex + 1) % this.apiKeys.length
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const maxRetries = this.apiKeys.length
    let lastError: Error | null = null

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const apiKey = this.getCurrentApiKey()
        const url = `${this.baseUrl}${endpoint}?api-key=${apiKey}`
        
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
          ...options,
        })

        if (!response.ok) {
          if (response.status === 429 || response.status === 403) {
            // Rate limited or forbidden, try next key
            this.rotateApiKey()
            continue
          }
          throw new Error(`Helius API error: ${response.status} ${response.statusText}`)
        }

        return await response.json()
      } catch (error) {
        lastError = error as Error
        this.rotateApiKey()
      }
    }

    throw new Error(`All Helius API keys failed: ${lastError?.message || 'Unknown error'}`)
  }

  // Get token information
  async getTokenInfo(mintAddress: string): Promise<HeliusTokenData> {
    try {
      const data = await this.makeRequest<any>(`/tokens/${mintAddress}`)
      
      return {
        mint: data.mint || mintAddress,
        name: data.name || 'Unknown Token',
        symbol: data.symbol || 'UNKNOWN',
        decimals: data.decimals || 9,
        supply: data.supply || '0',
        holders: data.holders || 0,
        marketCap: data.marketCap,
        price: data.price
      }
    } catch (error) {
      console.error('Failed to fetch token info:', error)
      throw new Error('Failed to fetch token information')
    }
  }

  // Get wallet balance and tokens
  async getWalletData(address: string): Promise<HeliusWalletData> {
    try {
      const [balanceData, tokensData] = await Promise.all([
        this.makeRequest<any>(`/addresses/${address}/balances`),
        this.makeRequest<any>(`/addresses/${address}/tokens`)
      ])

      return {
        address,
        lamports: balanceData.lamports || 0,
        tokens: tokensData.tokens || []
      }
    } catch (error) {
      console.error('Failed to fetch wallet data:', error)
      throw new Error('Failed to fetch wallet information')
    }
  }

  // Get recent transactions
  async getTransactionHistory(address: string, limit: number = 10): Promise<HeliusTransactionData[]> {
    try {
      const data = await this.makeRequest<any>(`/addresses/${address}/transactions?limit=${limit}`)
      
      return (data.transactions || []).map((tx: any) => ({
        signature: tx.signature,
        slot: tx.slot,
        blockTime: tx.blockTime,
        status: tx.meta?.err ? 'failed' : 'success',
        fee: tx.meta?.fee || 0,
        instructions: tx.transaction?.message?.instructions || []
      }))
    } catch (error) {
      console.error('Failed to fetch transaction history:', error)
      return []
    }
  }

  // Get token holders
  async getTokenHolders(mintAddress: string, limit: number = 100): Promise<Array<{address: string, amount: string, percentage: number}>> {
    try {
      const data = await this.makeRequest<any>(`/tokens/${mintAddress}/holders?limit=${limit}`)
      
      return (data.holders || []).map((holder: any) => ({
        address: holder.address,
        amount: holder.amount,
        percentage: holder.percentage || 0
      }))
    } catch (error) {
      console.error('Failed to fetch token holders:', error)
      return []
    }
  }

  // Create token (using Helius RPC)
  async createToken(params: {
    name: string
    symbol: string
    description: string
    image?: string
    decimals?: number
    initialSupply?: number
  }): Promise<{ mint: string, signature: string }> {
    try {
      const response = await this.makeRequest<any>('/tokens/create', {
        method: 'POST',
        body: JSON.stringify({
          name: params.name,
          symbol: params.symbol,
          description: params.description,
          image: params.image,
          decimals: params.decimals || 9,
          initialSupply: params.initialSupply || 1000000
        })
      })

      return {
        mint: response.mint,
        signature: response.signature
      }
    } catch (error) {
      console.error('Failed to create token:', error)
      throw new Error('Failed to create token')
    }
  }

  // Get real-time price data
  async getTokenPrice(mintAddress: string): Promise<{ price: number, change24h: number, volume24h: number }> {
    try {
      const data = await this.makeRequest<any>(`/tokens/${mintAddress}/price`)
      
      return {
        price: data.price || 0,
        change24h: data.change24h || 0,
        volume24h: data.volume24h || 0
      }
    } catch (error) {
      console.error('Failed to fetch token price:', error)
      return { price: 0, change24h: 0, volume24h: 0 }
    }
  }

  // Get DEX trades
  async getTokenTrades(mintAddress: string, limit: number = 50): Promise<Array<{
    signature: string
    side: 'buy' | 'sell'
    amount: number
    price: number
    timestamp: number
    dex: string
  }>> {
    try {
      const data = await this.makeRequest<any>(`/tokens/${mintAddress}/trades?limit=${limit}`)
      
      return (data.trades || []).map((trade: any) => ({
        signature: trade.signature,
        side: trade.side,
        amount: trade.amount,
        price: trade.price,
        timestamp: trade.timestamp,
        dex: trade.dex || 'unknown'
      }))
    } catch (error) {
      console.error('Failed to fetch token trades:', error)
      return []
    }
  }

  // Test connection
  async testConnection(): Promise<boolean> {
    try {
      // Use a simple RPC call to test connection
      const apiKey = this.getCurrentApiKey()
      const response = await fetch(`https://mainnet.helius-rpc.com/?api-key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getHealth'
        })
      })
      return response.ok
    } catch (error) {
      console.log('⚠️ Helius connection failed:', error)
      return false
    }
  }

  // Get RPC URL for direct Solana connection
  getRpcUrl(): string {
    const apiKey = this.getCurrentApiKey()
    return `https://mainnet.helius-rpc.com/?api-key=${apiKey}`
  }
}

// Singleton instance
export const heliusService = new HeliusService()

export default HeliusService
