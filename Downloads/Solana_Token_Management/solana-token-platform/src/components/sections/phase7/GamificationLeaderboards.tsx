'use client'

import { useState } from 'react'
import { Target, Trophy, Medal, Star, Zap, Users, TrendingUp, Gift, Crown, Award } from 'lucide-react'

interface Achievement {
  id: string
  title: string
  description: string
  icon: any
  progress: number
  total: number
  reward: string
  unlocked: boolean
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

interface LeaderboardEntry {
  rank: number
  user: string
  score: number
  level: number
  badge: string
  trend: 'up' | 'down' | 'same'
}

export default function GamificationLeaderboards() {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'achievements' | 'rewards' | 'quests'>('leaderboard')
  const [leaderboardType, setLeaderboardType] = useState('trading')

  const userStats = {
    level: 12,
    xp: 2850,
    xpToNext: 1150,
    rank: 47,
    badges: 8,
    achievements: 23
  }

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Trade',
      description: 'Complete your first successful trade',
      icon: TrendingUp,
      progress: 1,
      total: 1,
      reward: '100 XP',
      unlocked: true,
      rarity: 'common'
    },
    {
      id: '2',
      title: 'Token Creator',
      description: 'Create your first token',
      icon: Star,
      progress: 1,
      total: 1,
      reward: '500 XP + Token Creator Badge',
      unlocked: true,
      rarity: 'rare'
    },
    {
      id: '3',
      title: 'Volume Master',
      description: 'Generate $100K in trading volume',
      icon: Trophy,
      progress: 67500,
      total: 100000,
      reward: '1000 XP + Volume Master Badge',
      unlocked: false,
      rarity: 'epic'
    },
    {
      id: '4',
      title: 'Profit Pioneer',
      description: 'Achieve 50% portfolio return',
      icon: Crown,
      progress: 32,
      total: 50,
      reward: '2000 XP + Exclusive NFT',
      unlocked: false,
      rarity: 'legendary'
    }
  ]

  const leaderboards = {
    trading: [
      { rank: 1, user: 'CryptoKing47', score: 145230, level: 28, badge: 'Diamond Trader', trend: 'up' as const },
      { rank: 2, user: 'SolanaWhale', score: 132100, level: 25, badge: 'Master Trader', trend: 'same' as const },
      { rank: 3, user: 'DeFiNinja', score: 128750, level: 24, badge: 'Elite Trader', trend: 'up' as const },
      { rank: 47, user: 'You', score: 8450, level: 12, badge: 'Novice', trend: 'up' as const }
    ],
    creation: [
      { rank: 1, user: 'TokenMaster', score: 89400, level: 22, badge: 'Creator God', trend: 'up' as const },
      { rank: 2, user: 'MintGenius', score: 76200, level: 19, badge: 'Token Wizard', trend: 'down' as const },
      { rank: 3, user: 'CoinCrafter', score: 71850, level: 18, badge: 'Mint Master', trend: 'up' as const }
    ]
  }

  const currentQuests = [
    { id: '1', title: 'Daily Trader', description: 'Make 5 trades today', progress: 2, total: 5, reward: '50 XP', expires: '12h' },
    { id: '2', title: 'Liquidity Provider', description: 'Add liquidity to 3 pools', progress: 1, total: 3, reward: '200 XP', expires: '2d' },
    { id: '3', title: 'Social Butterfly', description: 'Share 5 successful trades', progress: 0, total: 5, reward: '100 XP', expires: '7d' }
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-zinc-600 bg-zinc-800/20'
      case 'rare': return 'border-blue-500 bg-blue-900/20'
      case 'epic': return 'border-purple-500 bg-purple-900/20'
      case 'legendary': return 'border-yellow-500 bg-yellow-900/20'
      default: return 'border-zinc-600 bg-zinc-800/20'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-400" />
      case 'down': return <TrendingUp className="w-3 h-3 text-red-400 rotate-180" />
      default: return <div className="w-3 h-3 bg-zinc-600 rounded-full" />
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Gamification Hub</h1>
            <p className="text-zinc-400">Level up your trading game and compete with others</p>
          </div>
        </div>

        {/* User Stats */}
        <div className="grid md:grid-cols-6 gap-4 mb-6">
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
            <div className="flex items-center space-x-2 mb-1">
              <Star className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-zinc-400">Level</span>
            </div>
            <div className="text-xl font-bold text-white">{userStats.level}</div>
          </div>
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
            <div className="flex items-center space-x-2 mb-1">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-zinc-400">XP</span>
            </div>
            <div className="text-xl font-bold text-white">{userStats.xp.toLocaleString()}</div>
          </div>
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
            <div className="flex items-center space-x-2 mb-1">
              <Trophy className="w-4 h-4 text-gold text-orange-400" />
              <span className="text-sm text-zinc-400">Rank</span>
            </div>
            <div className="text-xl font-bold text-white">#{userStats.rank}</div>
          </div>
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
            <div className="flex items-center space-x-2 mb-1">
              <Medal className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-zinc-400">Badges</span>
            </div>
            <div className="text-xl font-bold text-white">{userStats.badges}</div>
          </div>
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
            <div className="flex items-center space-x-2 mb-1">
              <Award className="w-4 h-4 text-green-400" />
              <span className="text-sm text-zinc-400">Achievements</span>
            </div>
            <div className="text-xl font-bold text-white">{userStats.achievements}</div>
          </div>
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
            <div className="flex items-center space-x-2 mb-1">
              <Target className="w-4 h-4 text-pink-400" />
              <span className="text-sm text-zinc-400">To Next Level</span>
            </div>
            <div className="text-xl font-bold text-white">{userStats.xpToNext}</div>
            <div className="w-full bg-zinc-800 rounded-full h-2 mt-2">
              <div 
                className="bg-purple-500 h-2 rounded-full" 
                style={{ width: `${(userStats.xp / (userStats.xp + userStats.xpToNext)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 bg-zinc-900 p-1 rounded-lg w-fit">
        {[
          { id: 'leaderboard', label: 'Leaderboards', icon: Trophy },
          { id: 'achievements', label: 'Achievements', icon: Medal },
          { id: 'rewards', label: 'Rewards Shop', icon: Gift },
          { id: 'quests', label: 'Daily Quests', icon: Target }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white'
                : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Leaderboards Tab */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          <div className="flex space-x-4 mb-6">
            {[
              { id: 'trading', label: 'Trading Volume' },
              { id: 'creation', label: 'Token Creation' },
              { id: 'liquidity', label: 'Liquidity Provision' },
              { id: 'community', label: 'Community Points' }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setLeaderboardType(type.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  leaderboardType === type.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:text-zinc-300'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              {leaderboardType === 'trading' ? 'Trading Volume Leaders' : 'Token Creation Leaders'}
            </h3>
            
            <div className="space-y-3">
              {(leaderboards[leaderboardType as keyof typeof leaderboards] || leaderboards.trading).map((entry) => (
                <div 
                  key={entry.rank} 
                  className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                    entry.user === 'You' 
                      ? 'bg-purple-900/20 border border-purple-700' 
                      : 'bg-zinc-800 hover:bg-zinc-750'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                      entry.rank === 1 ? 'bg-yellow-500 text-black' :
                      entry.rank === 2 ? 'bg-gray-400 text-black' :
                      entry.rank === 3 ? 'bg-amber-600 text-black' :
                      'bg-zinc-700 text-white'
                    }`}>
                      {entry.rank <= 3 ? (
                        entry.rank === 1 ? <Crown className="w-4 h-4" /> : `${entry.rank}`
                      ) : (
                        entry.rank
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${entry.user === 'You' ? 'text-purple-400' : 'text-white'}`}>
                          {entry.user}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          entry.badge === 'Diamond Trader' ? 'bg-cyan-900/30 text-cyan-400' :
                          entry.badge === 'Master Trader' ? 'bg-purple-900/30 text-purple-400' :
                          entry.badge === 'Elite Trader' ? 'bg-orange-900/30 text-orange-400' :
                          'bg-zinc-700 text-zinc-300'
                        }`}>
                          {entry.badge}
                        </span>
                      </div>
                      <div className="text-sm text-zinc-400">Level {entry.level}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold text-white">{entry.score.toLocaleString()}</span>
                      {getTrendIcon(entry.trend)}
                    </div>
                    <div className="text-sm text-zinc-400">points</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`rounded-xl border p-6 ${getRarityColor(achievement.rarity)} ${
                achievement.unlocked ? 'opacity-100' : 'opacity-60'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    achievement.unlocked ? 'bg-green-600' : 'bg-zinc-700'
                  }`}>
                    <achievement.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{achievement.title}</h3>
                    <p className="text-sm text-zinc-400">{achievement.description}</p>
                  </div>
                </div>
                {achievement.unlocked && (
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <Medal className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-zinc-400">Progress</span>
                  <span className="text-white">
                    {achievement.progress.toLocaleString()} / {achievement.total.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      achievement.unlocked ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min((achievement.progress / achievement.total) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-zinc-400">Reward: </span>
                  <span className="text-yellow-400 font-medium">{achievement.reward}</span>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                  achievement.rarity === 'legendary' ? 'text-yellow-400' :
                  achievement.rarity === 'epic' ? 'text-purple-400' :
                  achievement.rarity === 'rare' ? 'text-blue-400' :
                  'text-zinc-400'
                }`}>
                  {achievement.rarity}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rewards Tab */}
      {activeTab === 'rewards' && (
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Premium Badge', cost: 500, description: 'Exclusive profile badge', icon: Medal },
            { name: 'XP Booster', cost: 200, description: '2x XP for 24 hours', icon: Zap },
            { name: 'Custom Theme', cost: 1000, description: 'Personalized UI theme', icon: Star },
            { name: 'Trade Signals Access', cost: 1500, description: '7 days premium signals', icon: Target },
            { name: 'NFT Avatar', cost: 2000, description: 'Unique profile avatar', icon: Crown },
            { name: 'VIP Support', cost: 3000, description: 'Priority customer support', icon: Users }
          ].map((reward, index) => (
            <div key={index} className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                  <reward.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{reward.name}</h3>
                  <p className="text-sm text-zinc-400">{reward.description}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-white font-medium">{reward.cost} XP</span>
                </div>
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    userStats.xp >= reward.cost
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                  }`}
                  disabled={userStats.xp < reward.cost}
                >
                  {userStats.xp >= reward.cost ? 'Purchase' : 'Insufficient XP'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quests Tab */}
      {activeTab === 'quests' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-2">Daily Quests</h3>
            <p className="text-purple-300">Complete daily challenges to earn XP and unlock special rewards!</p>
          </div>

          <div className="space-y-4">
            {currentQuests.map((quest) => (
              <div key={quest.id} className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-white font-semibold text-lg">{quest.title}</h4>
                    <p className="text-zinc-400">{quest.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 font-medium">{quest.reward}</div>
                    <div className="text-sm text-zinc-400">Expires in {quest.expires}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-zinc-400">Progress</span>
                      <span className="text-white">{quest.progress} / {quest.total}</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <button 
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      quest.progress === quest.total
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                    }`}
                    disabled={quest.progress < quest.total}
                  >
                    {quest.progress === quest.total ? 'Claim Reward' : 'In Progress'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
