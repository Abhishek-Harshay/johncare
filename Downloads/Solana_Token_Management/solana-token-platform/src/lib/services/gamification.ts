export interface UserProfile {
  walletAddress: string
  username: string
  avatar: string
  level: number
  experience: number
  totalProfit: number
  winRate: number
  streak: number
  badges: Badge[]
  achievements: Achievement[]
  stats: UserStats
  joinDate: number
  lastActive: number
  socialLinks?: {
    twitter?: string
    discord?: string
    telegram?: string
  }
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlockedAt: number
  progress?: number
  maxProgress?: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  category: 'trading' | 'social' | 'platform' | 'special'
  points: number
  icon: string
  unlocked: boolean
  unlockedAt?: number
  progress: number
  maxProgress: number
}

export interface UserStats {
  totalTrades: number
  successfulTrades: number
  totalVolume: number
  largestWin: number
  largestLoss: number
  avgHoldTime: number
  favoriteTokens: string[]
  tradingStreak: {
    current: number
    longest: number
  }
  monthlyStats: {
    month: string
    trades: number
    profit: number
    winRate: number
  }[]
}

export interface LeaderboardEntry {
  rank: number
  user: UserProfile
  value: number
  change: number // rank change from previous period
  trend: 'up' | 'down' | 'stable'
}

export interface LeaderboardType {
  id: string
  name: string
  description: string
  metric: 'profit' | 'winRate' | 'volume' | 'streak' | 'level'
  period: 'daily' | 'weekly' | 'monthly' | 'allTime'
  icon: string
}

export interface ChallengeEvent {
  id: string
  title: string
  description: string
  type: 'trading' | 'social' | 'learning'
  startDate: number
  endDate: number
  requirements: {
    minLevel?: number
    stakingTier?: string
    tokenRequired?: string
  }
  rewards: {
    first: { solx: number, badge?: string }
    second: { solx: number, badge?: string }
    third: { solx: number, badge?: string }
    participation: { solx: number }
  }
  participants: string[]
  leaderboard: LeaderboardEntry[]
}

class GamificationService {
  private static instance: GamificationService
  private users: Map<string, UserProfile> = new Map()
  private challenges: Map<string, ChallengeEvent> = new Map()
  
  private leaderboardTypes: LeaderboardType[] = [
    {
      id: 'profit-weekly',
      name: 'Weekly Profit Leaders',
      description: 'Top traders by weekly profit',
      metric: 'profit',
      period: 'weekly',
      icon: '💰'
    },
    {
      id: 'winrate-monthly',
      name: 'Win Rate Champions',
      description: 'Highest win rate this month',
      metric: 'winRate',
      period: 'monthly',
      icon: '🎯'
    },
    {
      id: 'volume-alltime',
      name: 'Volume Kings',
      description: 'All-time trading volume leaders',
      metric: 'volume',
      period: 'allTime',
      icon: '📊'
    },
    {
      id: 'streak-daily',
      name: 'Streak Masters',
      description: 'Current winning streaks',
      metric: 'streak',
      period: 'daily',
      icon: '🔥'
    },
    {
      id: 'level-alltime',
      name: 'Platform Legends',
      description: 'Highest level users',
      metric: 'level',
      period: 'allTime',
      icon: '👑'
    }
  ]

  private achievements: Achievement[] = [
    {
      id: 'first-trade',
      title: 'First Steps',
      description: 'Complete your first trade',
      category: 'trading',
      points: 100,
      icon: '🚀',
      unlocked: false,
      progress: 0,
      maxProgress: 1
    },
    {
      id: 'profit-100',
      title: 'Century Club',
      description: 'Earn 100 SOL in total profit',
      category: 'trading',
      points: 500,
      icon: '💎',
      unlocked: false,
      progress: 0,
      maxProgress: 100
    },
    {
      id: 'win-streak-10',
      title: 'Hot Streak',
      description: 'Win 10 trades in a row',
      category: 'trading',
      points: 300,
      icon: '🔥',
      unlocked: false,
      progress: 0,
      maxProgress: 10
    },
    {
      id: 'social-butterfly',
      title: 'Social Butterfly',
      description: 'Connect all social media accounts',
      category: 'social',
      points: 200,
      icon: '🦋',
      unlocked: false,
      progress: 0,
      maxProgress: 3
    },
    {
      id: 'whale-trader',
      title: 'Whale Trader',
      description: 'Execute a trade worth 1000+ SOL',
      category: 'trading',
      points: 1000,
      icon: '🐋',
      unlocked: false,
      progress: 0,
      maxProgress: 1000
    },
    {
      id: 'diamond-hands',
      title: 'Diamond Hands',
      description: 'Hold a position for 30+ days',
      category: 'trading',
      points: 400,
      icon: '💎',
      unlocked: false,
      progress: 0,
      maxProgress: 30
    },
    {
      id: 'early-adopter',
      title: 'Early Adopter',
      description: 'Join during beta period',
      category: 'special',
      points: 1500,
      icon: '🌟',
      unlocked: false,
      progress: 0,
      maxProgress: 1
    }
  ]

  constructor() {
    this.initializeMockData()
    this.startChallengeEvents()
  }

  public static getInstance(): GamificationService {
    if (!GamificationService.instance) {
      GamificationService.instance = new GamificationService()
    }
    return GamificationService.instance
  }

  // Initialize user profile
  async createUserProfile(walletAddress: string, username: string): Promise<UserProfile> {
    const profile: UserProfile = {
      walletAddress,
      username: username || `Trader_${walletAddress.slice(0, 6)}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${walletAddress}`,
      level: 1,
      experience: 0,
      totalProfit: 0,
      winRate: 0,
      streak: 0,
      badges: [],
      achievements: this.achievements.map(a => ({ ...a })),
      joinDate: Date.now(),
      lastActive: Date.now(),
      stats: {
        totalTrades: 0,
        successfulTrades: 0,
        totalVolume: 0,
        largestWin: 0,
        largestLoss: 0,
        avgHoldTime: 0,
        favoriteTokens: [],
        tradingStreak: {
          current: 0,
          longest: 0
        },
        monthlyStats: []
      }
    }

    this.users.set(walletAddress, profile)
    return profile
  }

  // Update user stats after trade
  async updateUserStats(
    walletAddress: string, 
    tradeData: {
      profit: number
      volume: number
      isWin: boolean
      token: string
      holdTime: number
    }
  ): Promise<void> {
    let profile = this.users.get(walletAddress)
    if (!profile) {
      profile = await this.createUserProfile(walletAddress, '')
    }

    // Update basic stats
    profile.stats.totalTrades++
    profile.stats.totalVolume += tradeData.volume
    profile.totalProfit += tradeData.profit
    
    if (tradeData.isWin) {
      profile.stats.successfulTrades++
      profile.streak++
      profile.stats.tradingStreak.current++
      
      if (profile.stats.tradingStreak.current > profile.stats.tradingStreak.longest) {
        profile.stats.tradingStreak.longest = profile.stats.tradingStreak.current
      }
      
      if (tradeData.profit > profile.stats.largestWin) {
        profile.stats.largestWin = tradeData.profit
      }
    } else {
      profile.stats.tradingStreak.current = 0
      profile.streak = 0
      
      if (Math.abs(tradeData.profit) > Math.abs(profile.stats.largestLoss)) {
        profile.stats.largestLoss = tradeData.profit
      }
    }

    // Update win rate
    profile.winRate = (profile.stats.successfulTrades / profile.stats.totalTrades) * 100

    // Add experience and level up
    const expGained = Math.floor(tradeData.volume * 0.1) + (tradeData.isWin ? 50 : 10)
    profile.experience += expGained
    
    const newLevel = Math.floor(profile.experience / 1000) + 1
    if (newLevel > profile.level) {
      profile.level = newLevel
      // Award level up bonus
      this.awardBadge(walletAddress, `level-${newLevel}`)
    }

    // Update favorite tokens
    if (!profile.stats.favoriteTokens.includes(tradeData.token)) {
      profile.stats.favoriteTokens.push(tradeData.token)
    }

    // Check achievements
    await this.checkAchievements(walletAddress)
    
    profile.lastActive = Date.now()
    this.users.set(walletAddress, profile)
  }

  // Check and unlock achievements
  private async checkAchievements(walletAddress: string): Promise<void> {
    const profile = this.users.get(walletAddress)
    if (!profile) return

    for (const achievement of profile.achievements) {
      if (achievement.unlocked) continue

      let progress = 0
      
      switch (achievement.id) {
        case 'first-trade':
          progress = profile.stats.totalTrades > 0 ? 1 : 0
          break
        case 'profit-100':
          progress = Math.max(0, profile.totalProfit)
          break
        case 'win-streak-10':
          progress = profile.stats.tradingStreak.longest
          break
        case 'whale-trader':
          progress = profile.stats.largestWin
          break
        case 'social-butterfly':
          progress = Object.values(profile.socialLinks || {}).filter(Boolean).length
          break
      }

      achievement.progress = Math.min(progress, achievement.maxProgress)
      
      if (achievement.progress >= achievement.maxProgress) {
        achievement.unlocked = true
        achievement.unlockedAt = Date.now()
        
        // Award experience points
        profile.experience += achievement.points
        
        // Create badge
        this.awardBadge(walletAddress, achievement.id)
      }
    }
  }

  // Award badge to user
  private awardBadge(walletAddress: string, badgeId: string): void {
    const profile = this.users.get(walletAddress)
    if (!profile) return

    const badge: Badge = {
      id: badgeId,
      name: this.getBadgeName(badgeId),
      description: this.getBadgeDescription(badgeId),
      icon: this.getBadgeIcon(badgeId),
      rarity: this.getBadgeRarity(badgeId),
      unlockedAt: Date.now()
    }

    profile.badges.push(badge)
  }

  // Get badge details
  private getBadgeName(badgeId: string): string {
    const names: { [key: string]: string } = {
      'first-trade': 'First Trader',
      'profit-100': 'Century Master',
      'win-streak-10': 'Streak Legend',
      'level-5': 'Rising Star',
      'level-10': 'Veteran Trader',
      'level-25': 'Trading Master'
    }
    return names[badgeId] || 'Special Badge'
  }

  private getBadgeDescription(badgeId: string): string {
    const descriptions: { [key: string]: string } = {
      'first-trade': 'Completed your first trade',
      'profit-100': 'Earned 100+ SOL in profit',
      'win-streak-10': 'Won 10 trades in a row',
      'level-5': 'Reached level 5',
      'level-10': 'Reached level 10',
      'level-25': 'Reached level 25'
    }
    return descriptions[badgeId] || 'Achievement unlocked'
  }

  private getBadgeIcon(badgeId: string): string {
    const icons: { [key: string]: string } = {
      'first-trade': '🚀',
      'profit-100': '💰',
      'win-streak-10': '🔥',
      'level-5': '⭐',
      'level-10': '🏆',
      'level-25': '👑'
    }
    return icons[badgeId] || '🏅'
  }

  private getBadgeRarity(badgeId: string): 'common' | 'rare' | 'epic' | 'legendary' {
    const rarities: { [key: string]: 'common' | 'rare' | 'epic' | 'legendary' } = {
      'first-trade': 'common',
      'profit-100': 'rare',
      'win-streak-10': 'epic',
      'level-25': 'legendary'
    }
    return rarities[badgeId] || 'common'
  }

  // Get leaderboard
  async getLeaderboard(type: string, limit: number = 50): Promise<LeaderboardEntry[]> {
    const users = Array.from(this.users.values())
    const leaderboardType = this.leaderboardTypes.find(lt => lt.id === type)
    
    if (!leaderboardType) return []

    let sortedUsers: UserProfile[]
    
    switch (leaderboardType.metric) {
      case 'profit':
        sortedUsers = users.sort((a, b) => b.totalProfit - a.totalProfit)
        break
      case 'winRate':
        sortedUsers = users.sort((a, b) => b.winRate - a.winRate)
        break
      case 'volume':
        sortedUsers = users.sort((a, b) => b.stats.totalVolume - a.stats.totalVolume)
        break
      case 'streak':
        sortedUsers = users.sort((a, b) => b.stats.tradingStreak.current - a.stats.tradingStreak.current)
        break
      case 'level':
        sortedUsers = users.sort((a, b) => b.level - a.level)
        break
      default:
        sortedUsers = users
    }

    return sortedUsers.slice(0, limit).map((user, index) => ({
      rank: index + 1,
      user,
      value: this.getMetricValue(user, leaderboardType.metric),
      change: Math.floor(Math.random() * 10) - 5, // Mock change
      trend: Math.random() > 0.5 ? 'up' : 'down'
    }))
  }

  // Get metric value for leaderboard
  private getMetricValue(user: UserProfile, metric: string): number {
    switch (metric) {
      case 'profit': return user.totalProfit
      case 'winRate': return user.winRate
      case 'volume': return user.stats.totalVolume
      case 'streak': return user.stats.tradingStreak.current
      case 'level': return user.level
      default: return 0
    }
  }

  // Get user profile
  getUserProfile(walletAddress: string): UserProfile | null {
    return this.users.get(walletAddress) || null
  }

  // Get all leaderboard types
  getLeaderboardTypes(): LeaderboardType[] {
    return this.leaderboardTypes
  }

  // Get active challenges
  getActiveChallenges(): ChallengeEvent[] {
    const now = Date.now()
    return Array.from(this.challenges.values())
      .filter(c => c.startDate <= now && c.endDate >= now)
  }

  // Start challenge events
  private startChallengeEvents(): void {
    const now = Date.now()
    const oneWeek = 7 * 24 * 60 * 60 * 1000

    const weeklyChallenge: ChallengeEvent = {
      id: 'weekly-profit-race',
      title: 'Weekly Profit Race',
      description: 'Compete for the highest profits this week!',
      type: 'trading',
      startDate: now,
      endDate: now + oneWeek,
      requirements: {
        minLevel: 1
      },
      rewards: {
        first: { solx: 1000, badge: 'weekly-champion' },
        second: { solx: 500, badge: 'silver-trader' },
        third: { solx: 250, badge: 'bronze-trader' },
        participation: { solx: 50 }
      },
      participants: [],
      leaderboard: []
    }

    this.challenges.set(weeklyChallenge.id, weeklyChallenge)
  }

  // Initialize mock data
  private initializeMockData(): void {
    // Create some mock users for leaderboards
    const mockUsers = [
      { address: '1234567890abcdef', name: 'CryptoMaster', profit: 250.5, winRate: 85 },
      { address: '2345678901bcdefg', name: 'SolanaKing', profit: 180.2, winRate: 72 },
      { address: '3456789012cdefgh', name: 'DiamondTrader', profit: 145.8, winRate: 90 },
      { address: '4567890123defghi', name: 'MoonShot', profit: 120.3, winRate: 68 },
      { address: '5678901234efghij', name: 'DegenApe', profit: 95.7, winRate: 75 }
    ]

    mockUsers.forEach(user => {
      const profile: UserProfile = {
        walletAddress: user.address,
        username: user.name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.address}`,
        level: Math.floor(Math.random() * 20) + 5,
        experience: Math.floor(Math.random() * 10000),
        totalProfit: user.profit,
        winRate: user.winRate,
        streak: Math.floor(Math.random() * 15),
        badges: [],
        achievements: this.achievements.map(a => ({ ...a })),
        joinDate: Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000,
        lastActive: Date.now() - Math.random() * 24 * 60 * 60 * 1000,
        stats: {
          totalTrades: Math.floor(Math.random() * 500) + 50,
          successfulTrades: Math.floor(Math.random() * 300) + 30,
          totalVolume: Math.floor(Math.random() * 10000) + 1000,
          largestWin: Math.floor(Math.random() * 100) + 10,
          largestLoss: -Math.floor(Math.random() * 50) - 5,
          avgHoldTime: Math.floor(Math.random() * 48) + 1,
          favoriteTokens: ['USDC', 'RAY', 'BONK'],
          tradingStreak: {
            current: Math.floor(Math.random() * 10),
            longest: Math.floor(Math.random() * 25) + 5
          },
          monthlyStats: []
        }
      }
      this.users.set(user.address, profile)
    })
  }
}

export const gamificationService = GamificationService.getInstance()
