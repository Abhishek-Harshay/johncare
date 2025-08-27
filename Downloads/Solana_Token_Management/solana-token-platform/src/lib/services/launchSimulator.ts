import { Connection } from '@solana/web3.js'

export interface TokenomicsConfig {
  tokenName: string
  tokenSymbol: string
  totalSupply: number
  decimals: number
  distribution: {
    publicSale: number
    privateSale: number
    team: number
    marketing: number
    development: number
    liquidity: number
    treasury: number
    ecosystem: number
  }
  vestingSchedule: {
    [key: string]: {
      cliff: number // months
      duration: number // months
      tge: number // percentage released at TGE
    }
  }
  pricing: {
    privateSalePrice: number
    publicSalePrice: number
    listingPrice: number
  }
}

export interface MarketConditions {
  marketSentiment: 'bearish' | 'neutral' | 'bullish'
  solanaPrice: number
  marketVolatility: number // 0-100
  competitorActivity: 'low' | 'medium' | 'high'
  regulatoryEnvironment: 'restrictive' | 'neutral' | 'favorable'
}

export interface LaunchStrategy {
  launchDate: number
  marketingBudget: number
  marketingChannels: string[]
  initialLiquidity: number
  liquidityLockPeriod: number // days
  dexPlatforms: string[]
  influencerPartnerships: boolean
  airdrops: {
    enabled: boolean
    percentage: number
    criteria: string[]
  }
  stakingRewards: {
    enabled: boolean
    apr: number
    duration: number // days
  }
}

export interface SimulationScenario {
  id: string
  name: string
  description: string
  probability: number // 0-100
  priceMultiplier: number
  volumeMultiplier: number
  duration: number // days
  triggers: string[]
}

export interface SimulationResult {
  scenario: string
  timeline: {
    day: number
    price: number
    volume: number
    marketCap: number
    holders: number
    liquidityUSD: number
    events: string[]
  }[]
  metrics: {
    maxPrice: number
    minPrice: number
    avgPrice: number
    totalVolume: number
    priceVolatility: number
    liquidityDepth: number
    holderGrowth: number
    successProbability: number
  }
  risks: {
    type: string
    severity: 'low' | 'medium' | 'high'
    description: string
    mitigation: string
  }[]
  recommendations: string[]
}

export interface LaunchMetrics {
  roi: {
    privateSale: number
    publicSale: number
    listing: number
  }
  tokenDistribution: {
    circulating: number
    locked: number
    burned: number
  }
  liquidityMetrics: {
    totalLiquidity: number
    priceStability: number
    slippage: number
  }
  communityMetrics: {
    holders: number
    activeWallets: number
    socialSentiment: number
    engagement: number
  }
}

class LaunchSimulator {
  private static instance: LaunchSimulator
  private connection: Connection
  private scenarios: SimulationScenario[]

  constructor() {
    this.connection = new Connection(process.env.NEXT_PUBLIC_HELIUS_RPC_URL || 'https://api.mainnet-beta.solana.com')
    this.scenarios = this.initializeScenarios()
  }

  public static getInstance(): LaunchSimulator {
    if (!LaunchSimulator.instance) {
      LaunchSimulator.instance = new LaunchSimulator()
    }
    return LaunchSimulator.instance
  }

  // Run complete launch simulation
  async simulateLaunch(
    tokenomics: TokenomicsConfig,
    marketConditions: MarketConditions,
    launchStrategy: LaunchStrategy,
    simulationDays: number = 180
  ): Promise<{
    baseCase: SimulationResult
    bullCase: SimulationResult
    bearCase: SimulationResult
    sensitivity: { parameter: string, impact: number }[]
    summary: LaunchMetrics
  }> {
    // Run three scenarios
    const baseCase = await this.runScenario('base', tokenomics, marketConditions, launchStrategy, simulationDays)
    const bullCase = await this.runScenario('bull', tokenomics, marketConditions, launchStrategy, simulationDays)
    const bearCase = await this.runScenario('bear', tokenomics, marketConditions, launchStrategy, simulationDays)
    
    // Perform sensitivity analysis
    const sensitivity = this.performSensitivityAnalysis(tokenomics, marketConditions, launchStrategy)
    
    // Calculate summary metrics
    const summary = this.calculateLaunchMetrics(baseCase, tokenomics)

    return {
      baseCase,
      bullCase,
      bearCase,
      sensitivity,
      summary
    }
  }

  // Run individual scenario
  private async runScenario(
    scenarioType: 'base' | 'bull' | 'bear',
    tokenomics: TokenomicsConfig,
    marketConditions: MarketConditions,
    launchStrategy: LaunchStrategy,
    days: number
  ): Promise<SimulationResult> {
    const scenario = this.getScenarioByType(scenarioType)
    const timeline = []
    
    // Initial conditions
    let currentPrice = tokenomics.pricing.listingPrice
    let currentVolume = launchStrategy.initialLiquidity * 0.1
    let marketCap = currentPrice * this.getCirculatingSupply(tokenomics, 0)
    let holders = this.estimateInitialHolders(launchStrategy)
    let liquidityUSD = launchStrategy.initialLiquidity

    // Simulate each day
    for (let day = 0; day <= days; day++) {
      const events = this.generateDailyEvents(day, launchStrategy, tokenomics)
      
      // Apply scenario effects
      const priceChange = this.calculatePriceChange(day, scenario, marketConditions, events)
      const volumeChange = this.calculateVolumeChange(day, scenario, marketConditions, events)
      
      currentPrice *= (1 + priceChange)
      currentVolume *= (1 + volumeChange)
      
      // Update other metrics
      marketCap = currentPrice * this.getCirculatingSupply(tokenomics, day)
      holders += this.calculateHolderGrowth(day, currentPrice, priceChange, events)
      liquidityUSD = this.calculateLiquidity(day, liquidityUSD, currentVolume, launchStrategy)
      
      timeline.push({
        day,
        price: currentPrice,
        volume: currentVolume,
        marketCap,
        holders,
        liquidityUSD,
        events
      })
    }

    // Calculate metrics
    const prices = timeline.map(t => t.price)
    const volumes = timeline.map(t => t.volume)
    
    const metrics = {
      maxPrice: Math.max(...prices),
      minPrice: Math.min(...prices),
      avgPrice: prices.reduce((sum, p) => sum + p, 0) / prices.length,
      totalVolume: volumes.reduce((sum, v) => sum + v, 0),
      priceVolatility: this.calculateVolatility(prices),
      liquidityDepth: timeline[timeline.length - 1].liquidityUSD,
      holderGrowth: ((timeline[timeline.length - 1].holders - holders) / holders) * 100,
      successProbability: this.calculateSuccessProbability(timeline, tokenomics)
    }

    // Generate risks and recommendations
    const risks = this.identifyRisks(timeline, tokenomics, launchStrategy)
    const recommendations = this.generateRecommendations(timeline, metrics, risks)

    return {
      scenario: scenario.name,
      timeline,
      metrics,
      risks,
      recommendations
    }
  }

  // Get circulating supply at given day
  private getCirculatingSupply(tokenomics: TokenomicsConfig, day: number): number {
    let circulating = 0
    
    // TGE releases
    Object.keys(tokenomics.distribution).forEach(allocation => {
      const percentage = (tokenomics.distribution as any)[allocation]
      const vestingInfo = tokenomics.vestingSchedule[allocation]
      
      if (vestingInfo) {
        const tgeRelease = (percentage / 100) * (vestingInfo.tge / 100) * tokenomics.totalSupply
        circulating += tgeRelease
        
        // Vesting releases
        if (day > vestingInfo.cliff * 30) {
          const vestingDays = Math.min(day - vestingInfo.cliff * 30, vestingInfo.duration * 30)
          const vestingPercentage = vestingDays / (vestingInfo.duration * 30)
          const remainingAmount = (percentage / 100) * ((100 - vestingInfo.tge) / 100) * tokenomics.totalSupply
          circulating += remainingAmount * vestingPercentage
        }
      } else {
        // No vesting, fully released at TGE
        circulating += (percentage / 100) * tokenomics.totalSupply
      }
    })
    
    return circulating
  }

  // Calculate daily price change
  private calculatePriceChange(
    day: number,
    scenario: SimulationScenario,
    marketConditions: MarketConditions,
    events: string[]
  ): number {
    let baseChange = (Math.random() - 0.5) * 0.1 // ±5% base volatility
    
    // Apply scenario multiplier
    baseChange *= scenario.priceMultiplier
    
    // Apply market conditions
    if (marketConditions.marketSentiment === 'bullish') {
      baseChange += 0.02
    } else if (marketConditions.marketSentiment === 'bearish') {
      baseChange -= 0.02
    }
    
    // Apply volatility
    baseChange *= (1 + marketConditions.marketVolatility / 100)
    
    // Apply event impacts
    events.forEach(event => {
      if (event.includes('listing')) baseChange += 0.15
      if (event.includes('partnership')) baseChange += 0.08
      if (event.includes('airdrop')) baseChange += 0.05
      if (event.includes('unlock')) baseChange -= 0.1
      if (event.includes('FUD')) baseChange -= 0.15
    })
    
    return Math.max(-0.5, Math.min(1.0, baseChange)) // Cap at ±50% and +100%
  }

  // Calculate daily volume change
  private calculateVolumeChange(
    day: number,
    scenario: SimulationScenario,
    marketConditions: MarketConditions,
    events: string[]
  ): number {
    let baseChange = (Math.random() - 0.5) * 0.2 // ±10% base change
    
    // Apply scenario multiplier
    baseChange *= scenario.volumeMultiplier
    
    // Higher volume in volatile markets
    baseChange *= (1 + marketConditions.marketVolatility / 200)
    
    // Event impacts
    events.forEach(event => {
      if (event.includes('listing')) baseChange += 0.5
      if (event.includes('partnership')) baseChange += 0.2
      if (event.includes('airdrop')) baseChange += 0.3
    })
    
    return Math.max(-0.8, Math.min(2.0, baseChange)) // Volume can increase dramatically
  }

  // Generate daily events
  private generateDailyEvents(day: number, launchStrategy: LaunchStrategy, tokenomics: TokenomicsConfig): string[] {
    const events = []
    
    // Scheduled events
    if (day === 0) events.push('Token Launch')
    if (day === 1) events.push('DEX Listing')
    if (day === 7 && launchStrategy.influencerPartnerships) events.push('Influencer Campaign Launch')
    if (day === 14 && launchStrategy.airdrops.enabled) events.push('Airdrop Distribution')
    if (day === 30 && launchStrategy.stakingRewards.enabled) events.push('Staking Program Launch')
    
    // Vesting unlocks
    Object.keys(tokenomics.vestingSchedule).forEach(allocation => {
      const vesting = tokenomics.vestingSchedule[allocation]
      if (day === vesting.cliff * 30) {
        events.push(`${allocation} Cliff Unlock`)
      }
    })
    
    // Random market events (low probability)
    if (Math.random() < 0.05) events.push('Major Partnership Announced')
    if (Math.random() < 0.03) events.push('Exchange Listing Rumors')
    if (Math.random() < 0.02) events.push('FUD Campaign')
    if (Math.random() < 0.04) events.push('Community Milestone Reached')
    
    return events
  }

  // Estimate initial holders
  private estimateInitialHolders(launchStrategy: LaunchStrategy): number {
    let holders = 100 // Base holders
    
    if (launchStrategy.airdrops.enabled) holders += 1000
    if (launchStrategy.influencerPartnerships) holders += 500
    if (launchStrategy.marketingBudget > 50000) holders += 300
    
    return holders
  }

  // Calculate holder growth
  private calculateHolderGrowth(day: number, price: number, priceChange: number, events: string[]): number {
    let growth = Math.max(1, Math.floor(Math.random() * 20)) // Base growth 1-20
    
    // Price impact (higher prices attract more holders initially)
    if (priceChange > 0.1) growth += 50
    else if (priceChange > 0.05) growth += 20
    else if (priceChange < -0.1) growth -= 10
    
    // Event impacts
    events.forEach(event => {
      if (event.includes('listing')) growth += 200
      if (event.includes('airdrop')) growth += 500
      if (event.includes('partnership')) growth += 100
    })
    
    // Natural decay over time
    growth *= Math.max(0.1, 1 - day / 1000)
    
    return Math.max(0, growth)
  }

  // Calculate liquidity
  private calculateLiquidity(
    day: number,
    currentLiquidity: number,
    volume: number,
    launchStrategy: LaunchStrategy
  ): number {
    // Liquidity grows with volume but decreases with high volatility
    let liquidityChange = volume * 0.001 // Small percentage of volume becomes liquidity
    
    // Decay if no trading fees to incentivize LPs
    liquidityChange -= currentLiquidity * 0.001
    
    // Locked liquidity doesn't decay for lock period
    if (day < launchStrategy.liquidityLockPeriod) {
      liquidityChange = Math.max(0, liquidityChange)
    }
    
    return Math.max(launchStrategy.initialLiquidity * 0.1, currentLiquidity + liquidityChange)
  }

  // Calculate price volatility
  private calculateVolatility(prices: number[]): number {
    const returns = []
    for (let i = 1; i < prices.length; i++) {
      returns.push((prices[i] - prices[i-1]) / prices[i-1])
    }
    
    const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length
    
    return Math.sqrt(variance) * Math.sqrt(365) * 100 // Annualized volatility %
  }

  // Calculate success probability
  private calculateSuccessProbability(timeline: any[], tokenomics: TokenomicsConfig): number {
    const finalPrice = timeline[timeline.length - 1].price
    const initialPrice = tokenomics.pricing.listingPrice
    const pricePerformance = (finalPrice / initialPrice - 1) * 100
    
    let probability = 50 // Base 50%
    
    // Price performance impact
    if (pricePerformance > 100) probability += 30
    else if (pricePerformance > 50) probability += 20
    else if (pricePerformance > 0) probability += 10
    else if (pricePerformance < -50) probability -= 30
    else if (pricePerformance < -25) probability -= 20
    else if (pricePerformance < 0) probability -= 10
    
    // Holder growth impact
    const holderGrowth = timeline[timeline.length - 1].holders / timeline[0].holders
    if (holderGrowth > 10) probability += 20
    else if (holderGrowth > 5) probability += 15
    else if (holderGrowth > 2) probability += 10
    
    // Liquidity stability
    const liquidityStability = timeline[timeline.length - 1].liquidityUSD / timeline[0].liquidityUSD
    if (liquidityStability > 1.5) probability += 15
    else if (liquidityStability > 1) probability += 10
    else if (liquidityStability < 0.5) probability -= 15
    
    return Math.max(0, Math.min(100, probability))
  }

  // Identify risks
  private identifyRisks(timeline: any[], tokenomics: TokenomicsConfig, launchStrategy: LaunchStrategy): any[] {
    const risks = []
    
    // Price volatility risk
    const prices = timeline.map(t => t.price)
    const volatility = this.calculateVolatility(prices)
    if (volatility > 200) {
      risks.push({
        type: 'High Volatility',
        severity: 'high' as const,
        description: `Price volatility of ${volatility.toFixed(1)}% may deter institutional investors`,
        mitigation: 'Implement price stabilization mechanisms or reduce token velocity'
      })
    }
    
    // Liquidity risk
    const finalLiquidity = timeline[timeline.length - 1].liquidityUSD
    const initialLiquidity = launchStrategy.initialLiquidity
    if (finalLiquidity < initialLiquidity * 0.5) {
      risks.push({
        type: 'Liquidity Drain',
        severity: 'high' as const,
        description: 'Liquidity has decreased significantly, increasing price slippage',
        mitigation: 'Implement liquidity mining rewards or extend lock periods'
      })
    }
    
    // Concentration risk
    const teamAllocation = tokenomics.distribution.team
    if (teamAllocation > 20) {
      risks.push({
        type: 'Team Concentration',
        severity: 'medium' as const,
        description: 'High team allocation may create selling pressure',
        mitigation: 'Implement longer vesting periods for team tokens'
      })
    }
    
    // Market timing risk
    if (timeline.slice(0, 30).some(t => t.price < tokenomics.pricing.listingPrice * 0.5)) {
      risks.push({
        type: 'Early Dump',
        severity: 'high' as const,
        description: 'Significant price drop in first 30 days may indicate poor market reception',
        mitigation: 'Review tokenomics and marketing strategy'
      })
    }
    
    return risks
  }

  // Generate recommendations
  private generateRecommendations(timeline: any[], metrics: any, risks: any[]): string[] {
    const recommendations = []
    
    if (metrics.priceVolatility > 150) {
      recommendations.push('Consider implementing a token buyback program to reduce volatility')
    }
    
    if (metrics.holderGrowth < 100) {
      recommendations.push('Increase marketing budget and implement referral programs')
    }
    
    if (metrics.liquidityDepth < timeline[0].liquidityUSD) {
      recommendations.push('Add liquidity mining incentives to maintain healthy liquidity levels')
    }
    
    if (risks.some(r => r.severity === 'high')) {
      recommendations.push('Address high-severity risks before launch to improve success probability')
    }
    
    if (metrics.successProbability < 60) {
      recommendations.push('Review and optimize tokenomics parameters before proceeding with launch')
    }
    
    return recommendations
  }

  // Perform sensitivity analysis
  private performSensitivityAnalysis(
    tokenomics: TokenomicsConfig,
    marketConditions: MarketConditions,
    launchStrategy: LaunchStrategy
  ): { parameter: string, impact: number }[] {
    // Mock sensitivity analysis - in production this would run multiple simulations
    return [
      { parameter: 'Initial Liquidity', impact: 23.5 },
      { parameter: 'Marketing Budget', impact: 18.2 },
      { parameter: 'Team Vesting Period', impact: 15.7 },
      { parameter: 'Public Sale Price', impact: 12.3 },
      { parameter: 'Airdrop Percentage', impact: 8.9 },
      { parameter: 'Staking APR', impact: 6.4 }
    ]
  }

  // Calculate launch metrics
  private calculateLaunchMetrics(result: SimulationResult, tokenomics: TokenomicsConfig): LaunchMetrics {
    const finalDay = result.timeline[result.timeline.length - 1]
    
    return {
      roi: {
        privateSale: ((finalDay.price / tokenomics.pricing.privateSalePrice) - 1) * 100,
        publicSale: ((finalDay.price / tokenomics.pricing.publicSalePrice) - 1) * 100,
        listing: ((finalDay.price / tokenomics.pricing.listingPrice) - 1) * 100
      },
      tokenDistribution: {
        circulating: this.getCirculatingSupply(tokenomics, result.timeline.length - 1),
        locked: tokenomics.totalSupply - this.getCirculatingSupply(tokenomics, result.timeline.length - 1),
        burned: 0 // Not implemented in this simulation
      },
      liquidityMetrics: {
        totalLiquidity: finalDay.liquidityUSD,
        priceStability: 100 - result.metrics.priceVolatility,
        slippage: Math.max(1, 100 / Math.sqrt(finalDay.liquidityUSD / 1000)) // Mock slippage calculation
      },
      communityMetrics: {
        holders: finalDay.holders,
        activeWallets: Math.floor(finalDay.holders * 0.3), // Assume 30% active
        socialSentiment: Math.floor(Math.random() * 40) + 60, // Mock sentiment 60-100
        engagement: Math.floor(Math.random() * 30) + 70 // Mock engagement 70-100
      }
    }
  }

  // Get scenario by type
  private getScenarioByType(type: 'base' | 'bull' | 'bear'): SimulationScenario {
    switch (type) {
      case 'bull':
        return this.scenarios.find(s => s.name === 'Bull Market') || this.scenarios[1]
      case 'bear':
        return this.scenarios.find(s => s.name === 'Bear Market') || this.scenarios[2]
      default:
        return this.scenarios.find(s => s.name === 'Base Case') || this.scenarios[0]
    }
  }

  // Initialize simulation scenarios
  private initializeScenarios(): SimulationScenario[] {
    return [
      {
        id: 'base',
        name: 'Base Case',
        description: 'Normal market conditions with moderate growth',
        probability: 60,
        priceMultiplier: 1.0,
        volumeMultiplier: 1.0,
        duration: 180,
        triggers: ['normal_market', 'moderate_adoption']
      },
      {
        id: 'bull',
        name: 'Bull Market',
        description: 'Strong market conditions with high growth potential',
        probability: 25,
        priceMultiplier: 2.0,
        volumeMultiplier: 1.5,
        duration: 180,
        triggers: ['bull_market', 'viral_adoption', 'major_partnerships']
      },
      {
        id: 'bear',
        name: 'Bear Market',
        description: 'Challenging market conditions with limited growth',
        probability: 15,
        priceMultiplier: 0.5,
        volumeMultiplier: 0.7,
        duration: 180,
        triggers: ['bear_market', 'regulatory_concerns', 'low_adoption']
      }
    ]
  }
}

export const launchSimulator = LaunchSimulator.getInstance()
