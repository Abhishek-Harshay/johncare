// Jupiter API Service - DEX Aggregation & Best Prices
// ===================================================

export interface JupiterQuoteResponse {
  inputMint: string
  inAmount: string
  outputMint: string
  outAmount: string
  otherAmountThreshold: string
  swapMode: string
  slippageBps: number
  platformFee: {
    amount: string
    feeBps: number
  }
  priceImpactPct: string
  routePlan: Array<{
    swapInfo: {
      ammKey: string
      label: string
      inputMint: string
      outputMint: string
      inAmount: string
      outAmount: string
      feeAmount: string
      feeMint: string
    }
    percent: number
  }>
  contextSlot: number
  timeTaken: number
}

export interface JupiterSwapResponse {
  swapTransaction: string
  lastValidBlockHeight: number
}

export interface JupiterTokenInfo {
  address: string
  chainId: number
  decimals: number
  name: string
  symbol: string
  logoURI?: string
  tags: string[]
  daily_volume?: number
}

class JupiterService {
  private baseUrl: string
  private cache: Map<string, { data: any, timestamp: number }> = new Map()
  private cacheTimeout: number = 30 * 1000 // 30 seconds for quotes

  constructor() {
    this.baseUrl = process.env.JUPITER_API_URL || 'https://quote-api.jup.ag/v6'
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`Jupiter API error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Jupiter API error:', error)
      throw new Error('Failed to connect to Jupiter API')
    }
  }

  // Get quote for token swap
  async getQuote(
    inputMint: string,
    outputMint: string,
    amount: string,
    slippageBps: number = 50
  ): Promise<JupiterQuoteResponse> {
    try {
      const params = new URLSearchParams({
        inputMint,
        outputMint,
        amount,
        slippageBps: slippageBps.toString(),
        swapMode: 'ExactIn',
        onlyDirectRoutes: 'false',
        asLegacyTransaction: 'false'
      })

      return await this.makeRequest<JupiterQuoteResponse>(`/quote?${params}`)
    } catch (error) {
      console.error('Failed to get Jupiter quote:', error)
      throw new Error('Failed to get swap quote')
    }
  }

  // Get swap transaction
  async getSwapTransaction(quoteResponse: JupiterQuoteResponse, userPublicKey: string): Promise<JupiterSwapResponse> {
    try {
      return await this.makeRequest<JupiterSwapResponse>('/swap', {
        method: 'POST',
        body: JSON.stringify({
          quoteResponse,
          userPublicKey,
          wrapAndUnwrapSol: true,
          useSharedAccounts: true,
          feeAccount: undefined,
          trackingAccount: undefined,
          computeUnitPriceMicroLamports: 'auto',
          prioritizationFeeLamports: 'auto',
          asLegacyTransaction: false,
          useTokenLedger: false,
          destinationTokenAccount: undefined,
        })
      })
    } catch (error) {
      console.error('Failed to get swap transaction:', error)
      throw new Error('Failed to create swap transaction')
    }
  }

  // Get all supported tokens
  async getTokenList(): Promise<JupiterTokenInfo[]> {
    const cacheKey = 'token_list'
    const cached = this.cache.get(cacheKey)
    
    // Use longer cache for token list (1 hour)
    if (cached && Date.now() - cached.timestamp < 60 * 60 * 1000) {
      return cached.data
    }

    try {
      const tokens = await this.makeRequest<JupiterTokenInfo[]>('/tokens')
      
      this.cache.set(cacheKey, {
        data: tokens,
        timestamp: Date.now()
      })

      return tokens
    } catch (error) {
      console.error('Failed to fetch token list:', error)
      return []
    }
  }

  // Search tokens by symbol or name
  async searchTokens(query: string): Promise<JupiterTokenInfo[]> {
    try {
      const allTokens = await this.getTokenList()
      const searchQuery = query.toLowerCase()
      
      return allTokens.filter(token => 
        token.name.toLowerCase().includes(searchQuery) ||
        token.symbol.toLowerCase().includes(searchQuery)
      ).slice(0, 20) // Limit results
    } catch (error) {
      console.error('Failed to search tokens:', error)
      return []
    }
  }

  // Get price for a token pair
  async getPrice(inputMint: string, outputMint: string, amount: string = '1000000000'): Promise<{
    price: number
    priceImpact: number
    route: string[]
  }> {
    try {
      const quote = await this.getQuote(inputMint, outputMint, amount)
      
      const inputAmount = parseFloat(quote.inAmount)
      const outputAmount = parseFloat(quote.outAmount)
      const price = outputAmount / inputAmount
      
      const route = quote.routePlan.map(plan => plan.swapInfo.label)
      
      return {
        price,
        priceImpact: parseFloat(quote.priceImpactPct),
        route: [...new Set(route)] // Remove duplicates
      }
    } catch (error) {
      console.error('Failed to get price:', error)
      return {
        price: 0,
        priceImpact: 0,
        route: []
      }
    }
  }

  // Get multiple prices at once
  async getMultiplePrices(pairs: Array<{inputMint: string, outputMint: string}>): Promise<Array<{
    inputMint: string
    outputMint: string
    price: number
    priceImpact: number
  }>> {
    try {
      const promises = pairs.map(async (pair) => {
        try {
          const priceData = await this.getPrice(pair.inputMint, pair.outputMint)
          return {
            inputMint: pair.inputMint,
            outputMint: pair.outputMint,
            price: priceData.price,
            priceImpact: priceData.priceImpact
          }
        } catch {
          return {
            inputMint: pair.inputMint,
            outputMint: pair.outputMint,
            price: 0,
            priceImpact: 0
          }
        }
      })

      return await Promise.all(promises)
    } catch (error) {
      console.error('Failed to get multiple prices:', error)
      return []
    }
  }

  // Get token info by mint address
  async getTokenInfo(mintAddress: string): Promise<JupiterTokenInfo | null> {
    try {
      const tokens = await this.getTokenList()
      return tokens.find(token => token.address === mintAddress) || null
    } catch (error) {
      console.error('Failed to get token info:', error)
      return null
    }
  }

  // Get popular trading pairs
  async getPopularPairs(): Promise<Array<{
    inputToken: JupiterTokenInfo
    outputToken: JupiterTokenInfo
    volume24h: number
  }>> {
    try {
      // This is a simplified version - in reality you'd need more sophisticated volume tracking
      const tokens = await this.getTokenList()
      const popularTokens = tokens
        .filter(token => token.daily_volume && token.daily_volume > 100000)
        .sort((a, b) => (b.daily_volume || 0) - (a.daily_volume || 0))
        .slice(0, 20)

      const pairs = []
      const usdcToken = tokens.find(t => t.symbol === 'USDC')
      const solToken = tokens.find(t => t.symbol === 'SOL')

      if (usdcToken && solToken) {
        for (const token of popularTokens.slice(0, 10)) {
          if (token.symbol !== 'USDC' && token.symbol !== 'SOL') {
            pairs.push({
              inputToken: token,
              outputToken: usdcToken,
              volume24h: token.daily_volume || 0
            })
          }
        }
      }

      return pairs
    } catch (error) {
      console.error('Failed to get popular pairs:', error)
      return []
    }
  }

  // Test connection
  async testConnection(): Promise<boolean> {
    try {
      // Use a simpler endpoint for testing
      const response = await fetch(`${this.baseUrl}/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=1000000&slippageBps=50`)
      return response.ok
    } catch {
      return false
    }
  }

  // Clear cache
  clearCache() {
    this.cache.clear()
  }

  // Get swap history (mock implementation)
  async getSwapHistory(userAddress: string): Promise<Array<{
    signature: string
    inputMint: string
    outputMint: string
    inputAmount: string
    outputAmount: string
    timestamp: number
    status: 'success' | 'failed'
  }>> {
    // This would typically require integration with transaction history
    // For now, return empty array
    return []
  }
}

// Singleton instance
export const jupiterService = new JupiterService()

export default JupiterService
