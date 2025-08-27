'use client'

import { useState } from 'react'
import { Users, MessageCircle, Trophy, Gift, Crown, Shield, Zap, Target, Award, Star, Heart, TrendingUp, Calendar } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'

interface CommunityMember {
  id: string
  username: string
  avatar: string
  role: string
  level: number
  xp: number
  contributions: number
  joinDate: Date
  badges: string[]
}

interface CommunityEvent {
  id: string
  title: string
  description: string
  type: 'contest' | 'ama' | 'giveaway' | 'education'
  startDate: Date
  endDate: Date
  participants: number
  rewards: string
  status: 'upcoming' | 'active' | 'ended'
}

interface Leaderboard {
  period: 'daily' | 'weekly' | 'monthly' | 'all-time'
  members: {
    rank: number
    username: string
    score: number
    change: number
  }[]
}

export default function CommunityTools() {
  const { publicKey } = useWallet()
  const [activeTab, setActiveTab] = useState<'dashboard' | 'engagement' | 'rewards' | 'events'>('dashboard')
  const [isCreating, setIsCreating] = useState(false)
  
  const [communityStats, setCommunityStats] = useState({
    totalMembers: 15742,
    activeMembers: 3890,
    dailyMessages: 1247,
    engagementRate: 24.7
  })

  const [topMembers, setTopMembers] = useState<CommunityMember[]>([
    {
      id: '1',
      username: 'CryptoMaster',
      avatar: '/avatars/1.jpg',
      role: 'Ambassador',
      level: 25,
      xp: 12450,
      contributions: 89,
      joinDate: new Date('2024-01-15'),
      badges: ['Early Adopter', 'Top Contributor', 'Community Leader']
    },
    {
      id: '2',
      username: 'SolanaWiz',
      avatar: '/avatars/2.jpg',
      role: 'Moderator',
      level: 22,
      xp: 9870,
      contributions: 67,
      joinDate: new Date('2024-02-03'),
      badges: ['Moderator', 'Helper', 'Content Creator']
    },
    {
      id: '3',
      username: 'DeFiExplorer',
      avatar: '/avatars/3.jpg',
      role: 'Member',
      level: 18,
      xp: 7234,
      contributions: 45,
      joinDate: new Date('2024-03-10'),
      badges: ['Active Member', 'Question Asker']
    }
  ])

  const [activeEvents, setActiveEvents] = useState<CommunityEvent[]>([
    {
      id: '1',
      title: 'Weekly Trading Contest',
      description: 'Show off your trading skills and win exclusive NFTs!',
      type: 'contest',
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      participants: 234,
      rewards: '1000 USDC + Exclusive NFTs',
      status: 'active'
    },
    {
      id: '2',
      title: 'Community AMA with CEO',
      description: 'Ask anything about our roadmap and future plans',
      type: 'ama',
      startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 24 * 60 * 60 * 1000 + 3600000),
      participants: 89,
      rewards: 'Exclusive Alpha Access',
      status: 'upcoming'
    },
    {
      id: '3',
      title: 'Holiday Token Giveaway',
      description: '10,000 tokens distributed to active community members',
      type: 'giveaway',
      startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      participants: 567,
      rewards: '10,000 Project Tokens',
      status: 'upcoming'
    }
  ])

  const createEvent = async () => {
    setIsCreating(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert(`🎉 Community Event Creator\n\nCreate engaging community events:\n\n• Contests & Competitions\n• AMAs & Live Sessions\n• Token Giveaways\n• Educational Workshops\n• NFT Drops\n• Trading Competitions\n\nFeatures:\n- Automatic participant tracking\n- Reward distribution\n- Engagement analytics\n- Multi-platform integration`)
    } catch (error) {
      console.error('Event creation failed:', error)
      alert('Event creation failed')
    }
    setIsCreating(false)
  }

  const manageLoyalty = async () => {
    alert(`🏆 Loyalty Program Manager\n\nReward your most active community members:\n\n• XP & Level System\n• Achievement Badges\n• Exclusive Roles\n• VIP Access\n• Token Rewards\n• NFT Airdrops\n\nFeatures:\n- Automatic XP tracking\n- Custom achievement creation\n- Tiered rewards system\n- Integration with Discord roles`)
  }

  const launchReferral = async () => {
    alert(`🔗 Referral System\n\nGrow your community with viral referrals:\n\n• Unique referral codes\n• Multi-tier rewards\n• Social sharing tools\n• Progress tracking\n• Leaderboards\n• Bonus multipliers\n\nRewards:\n- Tokens for referrers\n- Bonuses for referred users\n- Special badges & roles\n- Exclusive access perks`)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Ambassador': return 'text-yellow-400 bg-yellow-600'
      case 'Moderator': return 'text-purple-400 bg-purple-600'
      case 'Member': return 'text-blue-400 bg-blue-600'
      default: return 'text-zinc-400 bg-zinc-600'
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'contest': return Trophy
      case 'ama': return MessageCircle
      case 'giveaway': return Gift
      case 'education': return Target
      default: return Star
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600 bg-opacity-20 text-green-300'
      case 'upcoming': return 'bg-blue-600 bg-opacity-20 text-blue-300'
      case 'ended': return 'bg-zinc-600 bg-opacity-20 text-zinc-300'
      default: return 'bg-zinc-600 bg-opacity-20 text-zinc-300'
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Community Management Tools
        </h1>
        <p className="text-zinc-400">
          Build, engage, and reward your community with powerful management and automation tools
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-zinc-900 rounded-xl p-1">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: Users },
          { id: 'engagement', label: 'Engagement', icon: Heart },
          { id: 'rewards', label: 'Rewards', icon: Trophy },
          { id: 'events', label: 'Events', icon: Star }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
                : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Members', value: communityStats.totalMembers.toLocaleString(), icon: Users, color: 'text-blue-400' },
              { label: 'Active Members', value: communityStats.activeMembers.toLocaleString(), icon: TrendingUp, color: 'text-green-400' },
              { label: 'Daily Messages', value: communityStats.dailyMessages.toLocaleString(), icon: MessageCircle, color: 'text-purple-400' },
              { label: 'Engagement Rate', value: `${communityStats.engagementRate}%`, icon: Heart, color: 'text-pink-400' }
            ].map((stat, index) => (
              <div key={index} className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-zinc-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Top Community Members */}
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Crown className="w-5 h-5 mr-2 text-yellow-400" />
              Top Community Members
            </h3>
            <div className="space-y-4">
              {topMembers.map((member, index) => (
                <div key={member.id} className="flex items-center justify-between bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${
                      index === 0 ? 'from-yellow-500 to-orange-500' :
                      index === 1 ? 'from-gray-400 to-gray-600' :
                      'from-orange-600 to-red-600'
                    } flex items-center justify-center text-white font-bold`}>
                      #{index + 1}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{member.username}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded bg-opacity-20 ${getRoleColor(member.role)}`}>
                          {member.role}
                        </span>
                        <span className="text-zinc-400 text-sm">Level {member.level}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">{member.xp.toLocaleString()} XP</div>
                    <div className="text-zinc-400 text-sm">{member.contributions} contributions</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <button
                onClick={createEvent}
                disabled={isCreating}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white p-4 rounded-lg font-medium transition-all flex items-center space-x-3"
              >
                <Star className="w-5 h-5" />
                <span>Create Event</span>
              </button>
              <button
                onClick={manageLoyalty}
                className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white p-4 rounded-lg font-medium transition-all flex items-center space-x-3"
              >
                <Trophy className="w-5 h-5" />
                <span>Manage Loyalty</span>
              </button>
              <button
                onClick={launchReferral}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white p-4 rounded-lg font-medium transition-all flex items-center space-x-3"
              >
                <Users className="w-5 h-5" />
                <span>Launch Referrals</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Engagement Tab */}
      {activeTab === 'engagement' && (
        <div className="space-y-6">
          {/* Engagement Tools */}
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-pink-400" />
              Engagement Tools
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: 'Daily Check-in',
                  description: 'Reward members for daily activity',
                  icon: Calendar,
                  color: 'from-blue-600 to-purple-600'
                },
                {
                  title: 'Reaction Rewards',
                  description: 'Earn XP for reactions and interactions',
                  icon: Heart,
                  color: 'from-pink-600 to-red-600'
                },
                {
                  title: 'Message Streaks',
                  description: 'Bonus rewards for consistent participation',
                  icon: Zap,
                  color: 'from-yellow-600 to-orange-600'
                },
                {
                  title: 'Voice Activity',
                  description: 'XP for participating in voice channels',
                  icon: MessageCircle,
                  color: 'from-green-600 to-blue-600'
                },
                {
                  title: 'Content Creation',
                  description: 'Extra rewards for sharing content',
                  icon: Star,
                  color: 'from-purple-600 to-pink-600'
                },
                {
                  title: 'Community Helper',
                  description: 'Recognition for helping other members',
                  icon: Shield,
                  color: 'from-cyan-600 to-blue-600'
                }
              ].map((tool, idx) => (
                <div key={idx} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 hover:border-pink-500 transition-all cursor-pointer">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${tool.color} flex items-center justify-center mb-3`}>
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-medium mb-1">{tool.title}</h4>
                  <p className="text-zinc-400 text-sm">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Heatmap */}
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Community Activity</h3>
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 text-lg">Activity Analytics</p>
              <p className="text-zinc-500 text-sm mt-2 max-w-md mx-auto">
                Visual heatmaps showing community activity patterns, peak engagement times, and member participation trends.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Rewards Tab */}
      {activeTab === 'rewards' && (
        <div className="space-y-6">
          {/* Reward Programs */}
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
              Active Reward Programs
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  name: 'Ambassador Program',
                  description: 'Top-tier rewards for community leaders',
                  participants: 25,
                  rewards: 'Monthly token allocation + exclusive perks',
                  color: 'border-yellow-600 bg-yellow-600'
                },
                {
                  name: 'Content Creator Rewards',
                  description: 'Incentivize quality content creation',
                  participants: 156,
                  rewards: 'Per-post rewards + bonus for viral content',
                  color: 'border-purple-600 bg-purple-600'
                },
                {
                  name: 'Bug Hunter Bounty',
                  description: 'Find bugs and earn rewards',
                  participants: 89,
                  rewards: 'Tiered bounties based on severity',
                  color: 'border-red-600 bg-red-600'
                },
                {
                  name: 'Referral Champions',
                  description: 'Grow the community and earn',
                  participants: 342,
                  rewards: '5% of referee trading fees',
                  color: 'border-green-600 bg-green-600'
                }
              ].map((program, idx) => (
                <div key={idx} className={`bg-zinc-800 rounded-lg p-4 border-l-4 ${program.color}`}>
                  <h4 className="text-white font-medium mb-2">{program.name}</h4>
                  <p className="text-zinc-400 text-sm mb-3">{program.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-300">{program.participants} participants</span>
                    <span className="text-green-400">{program.rewards}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboards */}
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Leaderboards</h3>
            <div className="grid lg:grid-cols-2 gap-6">
              {/* XP Leaderboard */}
              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                <h4 className="text-white font-medium mb-3">Top XP Earners (This Week)</h4>
                <div className="space-y-2">
                  {[
                    { rank: 1, username: 'CryptoMaster', xp: 2450, change: +156 },
                    { rank: 2, username: 'SolanaWiz', xp: 2380, change: +89 },
                    { rank: 3, username: 'DeFiExplorer', xp: 2156, change: +234 },
                    { rank: 4, username: 'BlockchainBro', xp: 1890, change: -45 },
                    { rank: 5, username: 'TokenTrader', xp: 1678, change: +67 }
                  ].map((member) => (
                    <div key={member.rank} className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          member.rank <= 3 ? 'bg-yellow-600 text-white' : 'bg-zinc-600 text-zinc-300'
                        }`}>
                          {member.rank}
                        </span>
                        <span className="text-white">{member.username}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-zinc-300">{member.xp} XP</span>
                        <span className={`text-xs ${member.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {member.change > 0 ? '+' : ''}{member.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Referral Leaderboard */}
              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                <h4 className="text-white font-medium mb-3">Top Referrers (All Time)</h4>
                <div className="space-y-2">
                  {[
                    { rank: 1, username: 'ReferralKing', referrals: 89, earnings: '4.5 SOL' },
                    { rank: 2, username: 'CommunityGrowth', referrals: 67, earnings: '3.2 SOL' },
                    { rank: 3, username: 'NetworkEffect', referrals: 54, earnings: '2.8 SOL' },
                    { rank: 4, username: 'ViralMarketer', referrals: 43, earnings: '2.1 SOL' },
                    { rank: 5, username: 'SpreadTheWord', referrals: 38, earnings: '1.9 SOL' }
                  ].map((member) => (
                    <div key={member.rank} className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          member.rank <= 3 ? 'bg-green-600 text-white' : 'bg-zinc-600 text-zinc-300'
                        }`}>
                          {member.rank}
                        </span>
                        <span className="text-white">{member.username}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-zinc-300 text-sm">{member.referrals} refs</div>
                        <div className="text-green-400 text-xs">{member.earnings}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Events Tab */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Star className="w-5 h-5 mr-2 text-orange-400" />
                Community Events
              </h3>
              <button
                onClick={createEvent}
                disabled={isCreating}
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-all"
              >
                {isCreating ? 'Creating...' : 'Create Event'}
              </button>
            </div>

            <div className="space-y-4">
              {activeEvents.map((event) => {
                const EventIcon = getEventIcon(event.type)
                return (
                  <div key={event.id} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <EventIcon className="w-6 h-6 text-orange-400" />
                        <div>
                          <h4 className="text-white font-medium">{event.title}</h4>
                          <p className="text-zinc-400 text-sm">{event.description}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-zinc-400">Participants:</span>
                        <span className="text-white ml-2">{event.participants}</span>
                      </div>
                      <div>
                        <span className="text-zinc-400">Rewards:</span>
                        <span className="text-green-400 ml-2">{event.rewards}</span>
                      </div>
                      <div>
                        <span className="text-zinc-400">Duration:</span>
                        <span className="text-white ml-2">
                          {event.startDate.toLocaleDateString()} - {event.endDate.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Event Templates */}
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Event Templates</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  type: 'contest',
                  name: 'Trading Competition',
                  description: 'Multi-day trading contest with leaderboards',
                  icon: Trophy,
                  color: 'from-yellow-600 to-orange-600'
                },
                {
                  type: 'giveaway',
                  name: 'Token Airdrop',
                  description: 'Distribute tokens to active members',
                  icon: Gift,
                  color: 'from-green-600 to-blue-600'
                },
                {
                  type: 'ama',
                  name: 'Ask Me Anything',
                  description: 'Live Q&A session with team members',
                  icon: MessageCircle,
                  color: 'from-blue-600 to-purple-600'
                },
                {
                  type: 'education',
                  name: 'Learning Workshop',
                  description: 'Educational content and tutorials',
                  icon: Target,
                  color: 'from-purple-600 to-pink-600'
                }
              ].map((template, idx) => (
                <button
                  key={idx}
                  className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-orange-500 rounded-lg p-4 text-left transition-all"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${template.color} flex items-center justify-center mb-3`}>
                    <template.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-medium mb-1">{template.name}</h4>
                  <p className="text-zinc-400 text-sm">{template.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Development Status */}
      <div className="mt-8 bg-green-900 bg-opacity-30 border border-green-700 rounded-lg p-4">
        <h4 className="text-green-300 font-medium mb-2">🚧 Development Status</h4>
        <p className="text-green-200 text-sm mb-2">
          Community Management Tools are in active development. Advanced automation and analytics features coming soon.
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">✅ Community Dashboard</span>
          <span className="bg-yellow-900 bg-opacity-50 text-yellow-300 px-2 py-1 rounded">🚧 Engagement Tools</span>
          <span className="bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded">🔜 Event Automation</span>
          <span className="bg-purple-900 bg-opacity-50 text-purple-300 px-2 py-1 rounded">🔜 Advanced Analytics</span>
        </div>
      </div>
    </div>
  )
}
