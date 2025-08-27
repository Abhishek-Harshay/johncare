// Comprehensive API Integration Service - Live Trading Platform
// =============================================================

import { deepSeekService, generateWithFallback } from './deepseek'
import { heliusService } from './helius'
import { coinMarketCapService } from './coinmarketcap'
import { jupiterService } from './jupiter'

export interface PlatformStatus {
  deepseek: boolean
  helius: boolean
  coinmarketcap: boolean
  jupiter: boolean
  overall: boolean
  errors: string[]
}

export interface TokenAnalysis {
  basic: {
    name: string
    symbol: string
    price: number
    change24h: number
    volume24h: number
    marketCap: number
  }
  technical: {
    holders: number
    liquidity: number
    trades24h: number
    priceImpact: number
  }
  ai: {
    analysis: string
    risk: 'low' | 'medium' | 'high'
    recommendation: 'buy' | 'hold' | 'sell' | 'avoid'
  }
}

class ComprehensiveAPIService {
  private status: PlatformStatus = {
    deepseek: false,
    helius: false,
    coinmarketcap: false,
    jupiter: false,
    overall: false,
    errors: []
  }

  // Initialize all services and check their status
  async initialize(): Promise<PlatformStatus> {
    console.log('🚀 Initializing SolX Engine API Services...')
    
    const statusChecks = await Promise.allSettled([
      this.checkDeepSeek(),
      this.checkHelius(),
      this.checkCoinMarketCap(),
      this.checkJupiter()
    ])

    // Reset status
    this.status = {
      deepseek: false,
      helius: false,
      coinmarketcap: false,
      jupiter: false,
      overall: false,
      errors: []
    }

    // Process results
    statusChecks.forEach((result, index) => {
      const services = ['deepseek', 'helius', 'coinmarketcap', 'jupiter'] as const
      const serviceName = services[index]
      
      if (result.status === 'fulfilled' && result.value) {
        (this.status as any)[serviceName] = true
        console.log(`✅ ${serviceName.toUpperCase()} - Connected`)
      } else {
        (this.status as any)[serviceName] = false
        const error = result.status === 'rejected' ? result.reason : 'Connection failed'
        this.status.errors.push(`${serviceName}: ${error}`)
        console.log(`❌ ${serviceName.toUpperCase()} - Failed: ${error}`)
      }
    })

    // Calculate overall status
    this.status.overall = this.status.deepseek || this.status.helius || this.status.coinmarketcap || this.status.jupiter

    console.log(`🎯 Platform Status: ${this.status.overall ? 'OPERATIONAL' : 'LIMITED'}`)
    return this.status
  }

  private async checkDeepSeek(): Promise<boolean> {
    try {
      return await deepSeekService.testConnection()
    } catch (error) {
      console.log('⚠️ DeepSeek check failed, OpenAI fallback available:', error)
      return false
    }
  }

  private async checkHelius(): Promise<boolean> {
    try {
      return await heliusService.testConnection()
    } catch (error) {
      console.log('⚠️ Helius check failed, using fallback RPC:', error)
      return false
    }
  }

  private async checkCoinMarketCap(): Promise<boolean> {
    try {
      return await coinMarketCapService.testConnection()
    } catch (error) {
      console.log('⚠️ CoinMarketCap check failed:', error)
      return false
    }
  }

  private async checkJupiter(): Promise<boolean> {
    try {
      return await jupiterService.testConnection()
    } catch (error) {
      console.log('⚠️ Jupiter check failed:', error)
      return false
    }
  }

  // Get comprehensive token analysis
  async analyzeToken(tokenSymbol: string, mintAddress?: string): Promise<TokenAnalysis> {
    try {
      console.log(`🔍 Analyzing token: ${tokenSymbol}`)

      // Gather data from all available sources
      const [cmcData, heliusData, jupiterPrice] = await Promise.allSettled([
        this.status.coinmarketcap ? coinMarketCapService.getTokenQuote(tokenSymbol) : null,
        this.status.helius && mintAddress ? heliusService.getTokenInfo(mintAddress) : null,
        this.status.jupiter && mintAddress ? jupiterService.getPrice(mintAddress, 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v') : null // USDC
      ])

      // Extract basic data
      const cmc = cmcData.status === 'fulfilled' && cmcData.value ? cmcData.value : null
      const helius = heliusData.status === 'fulfilled' && heliusData.value ? heliusData.value : null
      const jupiter = jupiterPrice.status === 'fulfilled' && jupiterPrice.value ? jupiterPrice.value : null

      const basic = {
        name: helius?.name || tokenSymbol,
        symbol: tokenSymbol,
        price: cmc?.price || jupiter?.price || 0,
        change24h: cmc?.percent_change_24h || 0,
        volume24h: cmc?.volume_24h || 0,
        marketCap: cmc?.market_cap || 0
      }

      const technical = {
        holders: helius?.holders || 0,
        liquidity: 0, // Would need DEX pool data
        trades24h: 0, // Would need DEX trade data
        priceImpact: jupiter?.priceImpact || 0
      }

      // Generate AI analysis
      let aiAnalysis = 'Analysis unavailable'
      let risk: 'low' | 'medium' | 'high' = 'medium'
      let recommendation: 'buy' | 'hold' | 'sell' | 'avoid' = 'hold'

      if (this.status.deepseek) {
        try {
          const analysis = await deepSeekService.analyzeTradingStrategy({
            symbol: tokenSymbol,
            price: basic.price,
            change24h: basic.change24h,
            volume: basic.volume24h,
            marketCap: basic.marketCap,
            holders: technical.holders
          })

          aiAnalysis = analysis
          
          // Simple risk assessment based on metrics
          if (basic.marketCap > 10000000 && technical.holders > 1000) {
            risk = 'low'
          } else if (basic.marketCap > 1000000 && technical.holders > 100) {
            risk = 'medium'
          } else {
            risk = 'high'
          }

          // Simple recommendation based on change
          if (basic.change24h > 10) {
            recommendation = 'sell' // Take profits
          } else if (basic.change24h > 5) {
            recommendation = 'hold'
          } else if (basic.change24h > -5) {
            recommendation = 'buy'
          } else {
            recommendation = 'avoid'
          }
        } catch (error) {
          console.error('AI analysis failed:', error)
        }
      }

      return {
        basic,
        technical,
        ai: {
          analysis: aiAnalysis,
          risk,
          recommendation
        }
      }
    } catch (error) {
      console.error('Token analysis failed:', error)
      throw new Error('Failed to analyze token')
    }
  }

  // Generate token content using AI with proper fallback
  async generateTokenContent(params: {
    name: string
    symbol: string
    description?: string
    type?: 'utility' | 'meme' | 'defi'
  }): Promise<{
    description: string
    tagline: string
    features: string[]
    whitepaper?: string
  }> {
    // Try DeepSeek first, then OpenAI, then provide mock content
    try {
      if (this.status.deepseek) {
        console.log('🤖 Using DeepSeek AI...')
        if (params.type === 'meme') {
          const memeContent = await deepSeekService.generateMemeTokenContent(
            params.name,
            params.description || 'fun community token'
          )
          return {
            description: memeContent.description,
            tagline: memeContent.tagline,
            features: memeContent.features
          }
        } else {
          const description = await deepSeekService.generateTokenDescription(params.name, params.symbol)
          const websiteContent = await deepSeekService.generateWebsiteContent(params.name, params.type || 'utility')
          
          return {
            description,
            tagline: websiteContent.heroSubtitle,
            features: websiteContent.features,
            whitepaper: `# ${params.name} Whitepaper\n\n${description}\n\n## Features\n${websiteContent.features.map(f => `- ${f}`).join('\n')}`
          }
        }
      }
    } catch (error) {
      console.log('⚠️ DeepSeek failed, trying OpenAI fallback...')
    }

    // OpenAI fallback
    try {
      const response = await generateWithFallback(
        `Generate professional content for token "${params.name}" (${params.symbol}). Include description, tagline, and 4 features.`,
        'You are a professional crypto marketing specialist.'
      )
      
      return {
        description: response.slice(0, 200) + '...',
        tagline: `The future of ${params.name}`,
        features: ['Advanced Technology', 'Community Driven', 'Secure & Transparent', 'Innovation Focus']
      }
    } catch (error) {
      console.log('⚠️ AI services unavailable, using mock content...')
    }

    // Mock content fallback
    return {
      description: `${params.name} is a revolutionary ${params.type || 'utility'} token built on Solana blockchain. ${params.description || 'Designed to provide value to the community with innovative features and strong tokenomics.'}`,
      tagline: `The Future of ${params.type === 'meme' ? 'Meme Coins' : 'DeFi'}`,
      features: [
        params.type === 'meme' ? 'Community Driven' : 'Advanced Technology',
        params.type === 'meme' ? 'Meme Power' : 'Low Transaction Fees',
        params.type === 'meme' ? 'Diamond Hands' : 'High Security',
        params.type === 'meme' ? 'To The Moon' : 'Decentralized Governance'
      ]
    }
  }

  // Get live market data
  async getMarketData(): Promise<{
    trending: Array<{ symbol: string, name: string, change24h: number }>
    globalMetrics: {
      totalMarketCap: number
      totalVolume: number
      btcDominance: number
    }
    topGainers: Array<{ symbol: string, name: string, change24h: number }>
  }> {
    try {
      const [trending, global] = await Promise.allSettled([
        this.status.coinmarketcap ? coinMarketCapService.getTrendingTokens() : [],
        this.status.coinmarketcap ? coinMarketCapService.getGlobalMetrics() : null
      ])

      const trendingData = trending.status === 'fulfilled' ? trending.value : []
      const globalData = global.status === 'fulfilled' && global.value ? global.value : null

      return {
        trending: trendingData.map(token => ({
          symbol: token.symbol,
          name: token.name,
          change24h: token.change_24h
        })),
        globalMetrics: {
          totalMarketCap: globalData?.total_market_cap || 0,
          totalVolume: globalData?.total_volume_24h || 0,
          btcDominance: globalData?.bitcoin_dominance || 0
        },
        topGainers: trendingData
          .filter(token => token.change_24h > 0)
          .slice(0, 5)
          .map(token => ({
            symbol: token.symbol,
            name: token.name,
            change24h: token.change_24h
          }))
      }
    } catch (error) {
      console.error('Market data fetch failed:', error)
      return {
        trending: [],
        globalMetrics: { totalMarketCap: 0, totalVolume: 0, btcDominance: 0 },
        topGainers: []
      }
    }
  }

  // Get swap quote
  async getSwapQuote(inputMint: string, outputMint: string, amount: string): Promise<{
    price: number
    priceImpact: number
    route: string[]
    fee: number
  }> {
    if (!this.status.jupiter) {
      throw new Error('Jupiter service not available')
    }

    try {
      const quote = await jupiterService.getQuote(inputMint, outputMint, amount)
      
      return {
        price: parseFloat(quote.outAmount) / parseFloat(quote.inAmount),
        priceImpact: parseFloat(quote.priceImpactPct),
        route: quote.routePlan.map(plan => plan.swapInfo.label),
        fee: parseFloat(quote.platformFee?.amount || '0')
      }
    } catch (error) {
      console.error('Swap quote failed:', error)
      throw new Error('Failed to get swap quote')
    }
  }

  // Get platform status
  getStatus(): PlatformStatus {
    return this.status
  }

  // Health check
  async healthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'down'
    services: Record<string, boolean>
    uptime: number
    errors: string[]
  }> {
    const currentStatus = await this.initialize()
    const activeServices = Object.values(currentStatus).filter(Boolean).length - 2 // Exclude 'overall' and 'errors'
    
    let status: 'healthy' | 'degraded' | 'down'
    if (activeServices >= 3) {
      status = 'healthy'
    } else if (activeServices >= 1) {
      status = 'degraded'
    } else {
      status = 'down'
    }

    return {
      status,
      services: {
        deepseek: currentStatus.deepseek,
        helius: currentStatus.helius,
        coinmarketcap: currentStatus.coinmarketcap,
        jupiter: currentStatus.jupiter
      },
      uptime: Date.now(),
      errors: currentStatus.errors
    }
  }
}

// Singleton instance
export const apiService = new ComprehensiveAPIService()

// Auto-initialize on import
apiService.initialize().then(status => {
  console.log('🎯 SolX Engine API Services initialized:', status)
}).catch(error => {
  console.error('❌ API Services initialization failed:', error)
})

export default ComprehensiveAPIService
