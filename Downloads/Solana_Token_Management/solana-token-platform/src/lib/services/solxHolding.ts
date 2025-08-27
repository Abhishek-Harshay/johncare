import { PublicKey, Connection } from '@solana/web3.js'

export interface SolXHolding {
  walletAddress: string
  amount: number
  stakingTier: 'bronze' | 'silver' | 'gold' | 'diamond' | 'whale'
  stakingRewards: number
  lastStakeTime: number
  unlockTime: number
  premiumAccess: PremiumFeatures
}

export interface PremiumFeatures {
  // Discounts
  transactionFeeDiscount: number // percentage
  premiumToolsAccess: boolean
  prioritySupport: boolean
  
  // Advanced Features
  advancedAnalytics: boolean
  aiSignalAccess: boolean
  copyTradingBot: boolean
  
  // Limits
  dailyTransactionLimit: number
  advancedBotAccess: boolean
  whitelistAccess: boolean
}

export interface StakingTier {
  name: string
  minAmount: number
  benefits: PremiumFeatures
  apr: number
  lockPeriod: number // days
  color: string
}

class SolXHoldingService {
  private static instance: SolXHoldingService
  private connection: Connection
  private holdings: Map<string, SolXHolding> = new Map()
  
  // Staking tiers configuration
  private stakingTiers: StakingTier[] = [
    {
      name: 'Bronze',
      minAmount: 1000, // 1,000 SOLX
      apr: 5,
      lockPeriod: 30,
      color: 'from-amber-600 to-amber-700',
      benefits: {
        transactionFeeDiscount: 10,
        premiumToolsAccess: false,
        prioritySupport: false,
        advancedAnalytics: false,
        aiSignalAccess: false,
        copyTradingBot: false,
        dailyTransactionLimit: 100,
        advancedBotAccess: false,
        whitelistAccess: false
      }
    },
    {
      name: 'Silver', 
      minAmount: 10000, // 10,000 SOLX
      apr: 8,
      lockPeriod: 60,
      color: 'from-gray-400 to-gray-500',
      benefits: {
        transactionFeeDiscount: 25,
        premiumToolsAccess: true,
        prioritySupport: false,
        advancedAnalytics: true,
        aiSignalAccess: false,
        copyTradingBot: false,
        dailyTransactionLimit: 500,
        advancedBotAccess: false,
        whitelistAccess: true
      }
    },
    {
      name: 'Gold',
      minAmount: 50000, // 50,000 SOLX
      apr: 12,
      lockPeriod: 90,
      color: 'from-yellow-400 to-yellow-600',
      benefits: {
        transactionFeeDiscount: 40,
        premiumToolsAccess: true,
        prioritySupport: true,
        advancedAnalytics: true,
        aiSignalAccess: true,
        copyTradingBot: false,
        dailyTransactionLimit: 2000,
        advancedBotAccess: true,
        whitelistAccess: true
      }
    },
    {
      name: 'Diamond',
      minAmount: 200000, // 200,000 SOLX
      apr: 15,
      lockPeriod: 180,
      color: 'from-cyan-400 to-blue-500',
      benefits: {
        transactionFeeDiscount: 60,
        premiumToolsAccess: true,
        prioritySupport: true,
        advancedAnalytics: true,
        aiSignalAccess: true,
        copyTradingBot: true,
        dailyTransactionLimit: 10000,
        advancedBotAccess: true,
        whitelistAccess: true
      }
    },
    {
      name: 'Whale',
      minAmount: 1000000, // 1,000,000 SOLX
      apr: 20,
      lockPeriod: 365,
      color: 'from-purple-500 to-pink-600',
      benefits: {
        transactionFeeDiscount: 80,
        premiumToolsAccess: true,
        prioritySupport: true,
        advancedAnalytics: true,
        aiSignalAccess: true,
        copyTradingBot: true,
        dailyTransactionLimit: 100000,
        advancedBotAccess: true,
        whitelistAccess: true
      }
    }
  ]

  constructor() {
    this.connection = new Connection(process.env.NEXT_PUBLIC_HELIUS_RPC_URL || 'https://api.mainnet-beta.solana.com')
  }

  public static getInstance(): SolXHoldingService {
    if (!SolXHoldingService.instance) {
      SolXHoldingService.instance = new SolXHoldingService()
    }
    return SolXHoldingService.instance
  }

  // Get user's staking tier based on holding amount
  getStakingTier(amount: number): StakingTier {
    for (let i = this.stakingTiers.length - 1; i >= 0; i--) {
      if (amount >= this.stakingTiers[i].minAmount) {
        return this.stakingTiers[i]
      }
    }
    return this.stakingTiers[0] // Bronze tier as default
  }

  // Stake SOLX tokens
  async stakeTokens(
    walletAddress: string,
    amount: number,
    lockPeriod: number
  ): Promise<{
    success: boolean
    tier: StakingTier
    unlockTime: number
    estimatedRewards: number
  }> {
    const tier = this.getStakingTier(amount)
    const now = Date.now()
    const unlockTime = now + (lockPeriod * 24 * 60 * 60 * 1000)
    const estimatedRewards = this.calculateRewards(amount, tier.apr, lockPeriod)

    const holding: SolXHolding = {
      walletAddress,
      amount,
      stakingTier: tier.name.toLowerCase() as any,
      stakingRewards: 0,
      lastStakeTime: now,
      unlockTime,
      premiumAccess: tier.benefits
    }

    this.holdings.set(walletAddress, holding)

    return {
      success: true,
      tier,
      unlockTime,
      estimatedRewards
    }
  }

  // Calculate staking rewards
  calculateRewards(amount: number, apr: number, days: number): number {
    return (amount * apr / 100 / 365) * days
  }

  // Get user's current holding and benefits
  getUserHolding(walletAddress: string): SolXHolding | null {
    return this.holdings.get(walletAddress) || null
  }

  // Check if user has premium access to specific feature
  hasFeatureAccess(walletAddress: string, feature: keyof PremiumFeatures): boolean {
    const holding = this.getUserHolding(walletAddress)
    if (!holding) return false

    return holding.premiumAccess[feature] as boolean
  }

  // Get discount percentage for user
  getTransactionDiscount(walletAddress: string): number {
    const holding = this.getUserHolding(walletAddress)
    return holding?.premiumAccess.transactionFeeDiscount || 0
  }

  // Unstake tokens (if unlock period has passed)
  async unstakeTokens(walletAddress: string): Promise<{
    success: boolean
    amount: number
    rewards: number
    message: string
  }> {
    const holding = this.getUserHolding(walletAddress)
    if (!holding) {
      return {
        success: false,
        amount: 0,
        rewards: 0,
        message: 'No staking position found'
      }
    }

    const now = Date.now()
    if (now < holding.unlockTime) {
      const timeRemaining = Math.ceil((holding.unlockTime - now) / (24 * 60 * 60 * 1000))
      return {
        success: false,
        amount: 0,
        rewards: 0,
        message: `Tokens locked for ${timeRemaining} more days`
      }
    }

    // Calculate final rewards
    const daysPassed = Math.floor((now - holding.lastStakeTime) / (24 * 60 * 60 * 1000))
    const tier = this.getStakingTier(holding.amount)
    const rewards = this.calculateRewards(holding.amount, tier.apr, daysPassed)

    // Remove holding
    this.holdings.delete(walletAddress)

    return {
      success: true,
      amount: holding.amount,
      rewards,
      message: 'Tokens unstaked successfully'
    }
  }

  // Get all available tiers for display
  getAllTiers(): StakingTier[] {
    return this.stakingTiers
  }

  // Revenue sharing calculation
  calculateRevenueShare(walletAddress: string, totalPlatformRevenue: number): number {
    const holding = this.getUserHolding(walletAddress)
    if (!holding) return 0

    // Total staked tokens across all users (mock calculation)
    const totalStaked = Array.from(this.holdings.values())
      .reduce((sum, h) => sum + h.amount, 0)

    if (totalStaked === 0) return 0

    // User's share of revenue based on their stake
    const userShare = holding.amount / totalStaked
    const revenueShare = totalPlatformRevenue * 0.3 // 30% of revenue shared

    return userShare * revenueShare
  }

  // Get staking statistics
  getStakingStats(walletAddress: string): {
    totalStaked: number
    totalRewards: number
    tierName: string
    daysRemaining: number
    nextTierRequirement: number
    revenueEarned: number
  } {
    const holding = this.getUserHolding(walletAddress)
    if (!holding) {
      return {
        totalStaked: 0,
        totalRewards: 0,
        tierName: 'None',
        daysRemaining: 0,
        nextTierRequirement: this.stakingTiers[0].minAmount,
        revenueEarned: 0
      }
    }

    const now = Date.now()
    const daysRemaining = Math.max(0, Math.ceil((holding.unlockTime - now) / (24 * 60 * 60 * 1000)))
    const daysPassed = Math.floor((now - holding.lastStakeTime) / (24 * 60 * 60 * 1000))
    const tier = this.getStakingTier(holding.amount)
    const totalRewards = this.calculateRewards(holding.amount, tier.apr, daysPassed)

    // Find next tier requirement
    const currentTierIndex = this.stakingTiers.findIndex(t => t.name === tier.name)
    const nextTier = this.stakingTiers[currentTierIndex + 1]
    const nextTierRequirement = nextTier ? nextTier.minAmount - holding.amount : 0

    return {
      totalStaked: holding.amount,
      totalRewards,
      tierName: tier.name,
      daysRemaining,
      nextTierRequirement: Math.max(0, nextTierRequirement),
      revenueEarned: this.calculateRevenueShare(walletAddress, 10000) // Mock revenue
    }
  }
}

export const solxHoldingService = SolXHoldingService.getInstance()
