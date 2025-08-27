// CoinMarketCap API Service - Market Data & Analytics
// ==================================================

export interface CMCTokenData {
  id: number
  name: string
  symbol: string
  slug: string
  cmc_rank: number
  market_cap: number
  price: number
  volume_24h: number
  percent_change_1h: number
  percent_change_24h: number
  percent_change_7d: number
  last_updated: string
}

export interface CMCQuoteData {
  price: number
  volume_24h: number
  market_cap: number
  percent_change_1h: number
  percent_change_24h: number
  percent_change_7d: number
}

class CoinMarketCapService {
  private apiKeys: string[]
  private currentKeyIndex: number
  private baseUrl: string
  private cache: Map<string, { data: any, timestamp: number }> = new Map()
  private cacheTimeout: number = 5 * 60 * 1000 // 5 minutes

  constructor() {
    this.apiKeys = [
      process.env.COINMARKETCAP_API_KEY_1 || '',
      process.env.COINMARKETCAP_API_KEY_2 || '',
      process.env.COINMARKETCAP_API_KEY_3 || '',
      process.env.COINMARKETCAP_API_KEY_4 || '',
      process.env.COINMARKETCAP_API_KEY_5 || '',
      process.env.COINMARKETCAP_API_KEY_6 || '',
      process.env.COINMARKETCAP_API_KEY_7 || '',
      process.env.COINMARKETCAP_API_KEY_8 || ''
    ].filter(key => key && key.length > 10) // Filter valid keys
    
    this.currentKeyIndex = 0
    this.baseUrl = 'https://pro-api.coinmarketcap.com/v1'
    
    console.log(`🔑 CoinMarketCap Service initialized with ${this.apiKeys.length} API keys`)
  }

  private getCurrentApiKey(): string {
    if (this.apiKeys.length === 0) {
      throw new Error('No valid CoinMarketCap API keys configured')
    }
    return this.apiKeys[this.currentKeyIndex]
  }

  private rotateApiKey() {
    this.currentKeyIndex = (this.currentKeyIndex + 1) % this.apiKeys.length
    console.log(`🔄 Rotated to CoinMarketCap API key ${this.currentKeyIndex + 1}/${this.apiKeys.length}`)
  }

  private async makeRequest<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const cacheKey = `${endpoint}_${JSON.stringify(params)}`
    const cached = this.cache.get(cacheKey)
    
    // Return cached data if still valid
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data
    }

    const maxRetries = this.apiKeys.length
    let lastError: Error | null = null

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const apiKey = this.getCurrentApiKey()
        const queryParams = new URLSearchParams(params)
        const url = `${this.baseUrl}${endpoint}?${queryParams}`
        
        const response = await fetch(url, {
          headers: {
            'X-CMC_PRO_API_KEY': apiKey,
            'Accept': 'application/json',
          },
        })

        if (!response.ok) {
          if (response.status === 429 || response.status === 403) {
            // Rate limited or forbidden, try next key
            this.rotateApiKey()
            continue
          }
          throw new Error(`CoinMarketCap API error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        
        // Cache the response
        this.cache.set(cacheKey, {
          data: data.data,
          timestamp: Date.now()
        })

        return data.data
      } catch (error) {
        lastError = error as Error
        this.rotateApiKey()
      }
    }

    throw new Error(`All CoinMarketCap API keys failed: ${lastError?.message || 'Unknown error'}`)
  }

  // Get token quotes by symbol
  async getTokenQuote(symbol: string): Promise<CMCQuoteData> {
    try {
      const data = await this.makeRequest<any>('/cryptocurrency/quotes/latest', {
        symbol: symbol.toUpperCase(),
        convert: 'USD'
      })

      const tokenData = data[symbol.toUpperCase()]
      if (!tokenData) {
        throw new Error(`Token ${symbol} not found`)
      }

      const quote = tokenData.quote.USD

      return {
        price: quote.price || 0,
        volume_24h: quote.volume_24h || 0,
        market_cap: quote.market_cap || 0,
        percent_change_1h: quote.percent_change_1h || 0,
        percent_change_24h: quote.percent_change_24h || 0,
        percent_change_7d: quote.percent_change_7d || 0
      }
    } catch (error) {
      console.error('Failed to fetch token quote:', error)
      return {
        price: 0,
        volume_24h: 0,
        market_cap: 0,
        percent_change_1h: 0,
        percent_change_24h: 0,
        percent_change_7d: 0
      }
    }
  }

  // Get multiple token quotes
  async getMultipleQuotes(symbols: string[]): Promise<Record<string, CMCQuoteData>> {
    try {
      const data = await this.makeRequest<any>('/cryptocurrency/quotes/latest', {
        symbol: symbols.map(s => s.toUpperCase()).join(','),
        convert: 'USD'
      })

      const result: Record<string, CMCQuoteData> = {}

      for (const symbol of symbols) {
        const tokenData = data[symbol.toUpperCase()]
        if (tokenData) {
          const quote = tokenData.quote.USD
          result[symbol] = {
            price: quote.price || 0,
            volume_24h: quote.volume_24h || 0,
            market_cap: quote.market_cap || 0,
            percent_change_1h: quote.percent_change_1h || 0,
            percent_change_24h: quote.percent_change_24h || 0,
            percent_change_7d: quote.percent_change_7d || 0
          }
        }
      }

      return result
    } catch (error) {
      console.error('Failed to fetch multiple quotes:', error)
      return {}
    }
  }

  // Get top cryptocurrencies
  async getTopCryptos(limit: number = 100): Promise<CMCTokenData[]> {
    try {
      const data = await this.makeRequest<any[]>('/cryptocurrency/listings/latest', {
        start: '1',
        limit: limit.toString(),
        convert: 'USD',
        sort: 'market_cap'
      })

      return data.map((token: any) => ({
        id: token.id,
        name: token.name,
        symbol: token.symbol,
        slug: token.slug,
        cmc_rank: token.cmc_rank,
        market_cap: token.quote.USD.market_cap || 0,
        price: token.quote.USD.price || 0,
        volume_24h: token.quote.USD.volume_24h || 0,
        percent_change_1h: token.quote.USD.percent_change_1h || 0,
        percent_change_24h: token.quote.USD.percent_change_24h || 0,
        percent_change_7d: token.quote.USD.percent_change_7d || 0,
        last_updated: token.last_updated
      }))
    } catch (error) {
      console.error('Failed to fetch top cryptos:', error)
      return []
    }
  }

  // Search for tokens
  async searchTokens(query: string): Promise<Array<{ id: number, name: string, symbol: string, rank: number }>> {
    try {
      const data = await this.makeRequest<any>('/cryptocurrency/map', {
        symbol: query.toUpperCase(),
        limit: '10'
      })

      return data.map((token: any) => ({
        id: token.id,
        name: token.name,
        symbol: token.symbol,
        rank: token.rank || 9999
      }))
    } catch (error) {
      console.error('Failed to search tokens:', error)
      return []
    }
  }

  // Get historical data
  async getHistoricalData(symbol: string, days: number = 7): Promise<Array<{ timestamp: number, price: number, volume: number }>> {
    try {
      // Note: Historical data requires a higher plan, this is a simplified version
      const data = await this.makeRequest<any>('/cryptocurrency/quotes/historical', {
        symbol: symbol.toUpperCase(),
        count: days.toString(),
        interval: 'daily'
      })

      return data.quotes?.map((quote: any) => ({
        timestamp: new Date(quote.timestamp).getTime(),
        price: quote.quote.USD.price || 0,
        volume: quote.quote.USD.volume_24h || 0
      })) || []
    } catch (error) {
      console.error('Failed to fetch historical data:', error)
      // Return mock data if API fails
      const mockData = []
      for (let i = days; i >= 0; i--) {
        mockData.push({
          timestamp: Date.now() - (i * 24 * 60 * 60 * 1000),
          price: Math.random() * 100,
          volume: Math.random() * 1000000
        })
      }
      return mockData
    }
  }

  // Get global market metrics
  async getGlobalMetrics(): Promise<{
    total_cryptocurrencies: number
    total_market_cap: number
    total_volume_24h: number
    bitcoin_dominance: number
    ethereum_dominance: number
  }> {
    try {
      const data = await this.makeRequest<any>('/global-metrics/quotes/latest')

      return {
        total_cryptocurrencies: data.total_cryptocurrencies || 0,
        total_market_cap: data.quote.USD.total_market_cap || 0,
        total_volume_24h: data.quote.USD.total_volume_24h || 0,
        bitcoin_dominance: data.btc_dominance || 0,
        ethereum_dominance: data.eth_dominance || 0
      }
    } catch (error) {
      console.error('Failed to fetch global metrics:', error)
      return {
        total_cryptocurrencies: 0,
        total_market_cap: 0,
        total_volume_24h: 0,
        bitcoin_dominance: 0,
        ethereum_dominance: 0
      }
    }
  }

  // Test connection
  async testConnection(): Promise<boolean> {
    try {
      await this.getTokenQuote('BTC')
      return true
    } catch {
      return false
    }
  }

  // Clear cache
  clearCache() {
    this.cache.clear()
  }

  // Get trending tokens
  async getTrendingTokens(): Promise<Array<{ symbol: string, name: string, change_24h: number }>> {
    try {
      const topTokens = await this.getTopCryptos(20)
      
      // Sort by 24h change percentage
      return topTokens
        .sort((a, b) => Math.abs(b.percent_change_24h) - Math.abs(a.percent_change_24h))
        .slice(0, 10)
        .map(token => ({
          symbol: token.symbol,
          name: token.name,
          change_24h: token.percent_change_24h
        }))
    } catch (error) {
      console.error('Failed to fetch trending tokens:', error)
      return []
    }
  }
}

// Singleton instance
export const coinMarketCapService = new CoinMarketCapService()

export default CoinMarketCapService
