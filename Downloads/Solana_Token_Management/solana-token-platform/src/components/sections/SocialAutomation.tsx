'use client'

import { useState } from 'react'
import { Bot, Twitter, MessageCircle, Send, Calendar, BarChart3, Settings, Zap, Clock, Users, TrendingUp } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'

interface SocialAccount {
  platform: string
  username: string
  connected: boolean
  followers: number
  engagement: number
  icon: any
}

interface AutomationRule {
  id: string
  name: string
  trigger: string
  action: string
  platforms: string[]
  active: boolean
  frequency: string
}

interface ScheduledPost {
  id: string
  content: string
  platforms: string[]
  scheduledTime: Date
  status: 'pending' | 'posted' | 'failed'
}

export default function SocialAutomation() {
  const { publicKey } = useWallet()
  const [activeTab, setActiveTab] = useState<'dashboard' | 'automation' | 'scheduler' | 'analytics'>('dashboard')
  const [isConnecting, setIsConnecting] = useState(false)
  
  const [connectedAccounts, setConnectedAccounts] = useState<SocialAccount[]>([
    {
      platform: 'Twitter',
      username: '@yourproject',
      connected: true,
      followers: 12500,
      engagement: 4.2,
      icon: Twitter
    },
    {
      platform: 'Discord',
      username: 'Your Project Server',
      connected: true,
      followers: 8300,
      engagement: 12.8,
      icon: MessageCircle
    },
    {
      platform: 'Telegram',
      username: '@yourprojectchat',
      connected: false,
      followers: 0,
      engagement: 0,
      icon: Send
    }
  ])

  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'Welcome New Followers',
      trigger: 'New follower',
      action: 'Send welcome DM',
      platforms: ['Twitter'],
      active: true,
      frequency: 'Immediate'
    },
    {
      id: '2',
      name: 'Daily Market Update',
      trigger: 'Schedule',
      action: 'Post market summary',
      platforms: ['Twitter', 'Discord'],
      active: true,
      frequency: 'Daily at 9 AM'
    },
    {
      id: '3',
      name: 'Community Engagement',
      trigger: 'Mention keyword',
      action: 'Auto-reply with info',
      platforms: ['Twitter', 'Discord'],
      active: false,
      frequency: 'Real-time'
    }
  ])

  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([
    {
      id: '1',
      content: '🚀 Big announcement coming this week! Stay tuned for exciting news about our latest partnership. #BigNews #Partnership',
      platforms: ['Twitter', 'Discord'],
      scheduledTime: new Date(Date.now() + 86400000),
      status: 'pending'
    },
    {
      id: '2',
      content: 'Weekly AMA session starting in 1 hour! Join us on Discord to ask questions about our roadmap and upcoming features.',
      platforms: ['Twitter', 'Discord', 'Telegram'],
      scheduledTime: new Date(Date.now() + 3600000),
      status: 'pending'
    }
  ])

  const connectPlatform = async (platform: string) => {
    setIsConnecting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setConnectedAccounts(prev => prev.map(account => 
        account.platform === platform 
          ? { ...account, connected: true, followers: Math.floor(Math.random() * 10000) + 1000 }
          : account
      ))
      
      alert(`🔗 ${platform} Connected!\n\nYour ${platform} account has been successfully connected. You can now use automation features for this platform.`)
    } catch (error) {
      console.error('Connection failed:', error)
      alert('Platform connection failed')
    }
    setIsConnecting(false)
  }

  const toggleAutomation = (ruleId: string) => {
    setAutomationRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, active: !rule.active } : rule
    ))
  }

  const createAutomation = async () => {
    alert(`🤖 Automation Builder\n\nCreate custom automation rules:\n\n• Trigger: When something happens\n• Condition: If criteria are met\n• Action: Then do something\n• Platforms: Where to execute\n\nExamples:\n- Auto-welcome new community members\n- Schedule regular updates\n- Respond to common questions\n- Cross-post content automatically`)
  }

  const schedulePost = async () => {
    alert(`📅 Post Scheduler\n\nSchedule posts across multiple platforms:\n\n• Write once, post everywhere\n• Optimal timing suggestions\n• Content calendar integration\n• Automatic hashtag optimization\n• Engagement tracking`)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Social Media Automation
        </h1>
        <p className="text-zinc-400">
          Automate your social media presence with intelligent bots and scheduling tools
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-zinc-900 rounded-xl p-1">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
          { id: 'automation', label: 'Automation', icon: Bot },
          { id: 'scheduler', label: 'Scheduler', icon: Calendar },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
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
          {/* Connected Accounts */}
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-blue-400" />
              Connected Accounts
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {connectedAccounts.map((account) => (
                <div key={account.platform} className={`bg-zinc-800 rounded-lg p-4 border ${account.connected ? 'border-green-600' : 'border-zinc-700'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <account.icon className="w-6 h-6 text-blue-400" />
                      <div>
                        <h4 className="text-white font-medium">{account.platform}</h4>
                        {account.connected && (
                          <p className="text-zinc-400 text-sm">{account.username}</p>
                        )}
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${account.connected ? 'bg-green-500' : 'bg-red-500'}`} />
                  </div>
                  
                  {account.connected ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-400">Followers</span>
                        <span className="text-white">{account.followers.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-400">Engagement</span>
                        <span className="text-green-400">{account.engagement}%</span>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => connectPlatform(account.platform)}
                      disabled={isConnecting}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-3 py-2 rounded-lg text-sm transition-all"
                    >
                      {isConnecting ? 'Connecting...' : 'Connect'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Followers', value: '20.8K', change: '+12%', icon: Users },
              { label: 'Avg Engagement', value: '8.5%', change: '+3.2%', icon: TrendingUp },
              { label: 'Posts Scheduled', value: '24', change: '+6', icon: Calendar },
              { label: 'Active Automations', value: '2', change: '67%', icon: Bot }
            ].map((stat, index) => (
              <div key={index} className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="w-5 h-5 text-blue-400" />
                  <span className="text-green-400 text-sm">{stat.change}</span>
                </div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-zinc-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { action: 'Auto-replied to 5 community questions', time: '2 hours ago', platform: 'Discord' },
                { action: 'Posted scheduled market update', time: '6 hours ago', platform: 'Twitter' },
                { action: 'Welcomed 12 new followers', time: '1 day ago', platform: 'Twitter' },
                { action: 'Cross-posted announcement', time: '2 days ago', platform: 'All Platforms' }
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-b-0">
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.action}</p>
                    <p className="text-zinc-400 text-xs">{activity.time}</p>
                  </div>
                  <span className="text-blue-400 text-xs bg-blue-600 bg-opacity-20 px-2 py-1 rounded">
                    {activity.platform}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Automation Tab */}
      {activeTab === 'automation' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Bot className="w-5 h-5 mr-2 text-purple-400" />
                Automation Rules
              </h3>
              <button
                onClick={createAutomation}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-all"
              >
                Create Rule
              </button>
            </div>

            <div className="space-y-4">
              {automationRules.map((rule) => (
                <div key={rule.id} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-1">{rule.name}</h4>
                      <p className="text-zinc-400 text-sm">
                        When <span className="text-blue-400">{rule.trigger}</span> → <span className="text-green-400">{rule.action}</span>
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-zinc-400 text-sm">{rule.frequency}</span>
                      <button
                        onClick={() => toggleAutomation(rule.id)}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                          rule.active ? 'bg-green-600' : 'bg-zinc-600'
                        }`}
                      >
                        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                          rule.active ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {rule.platforms.map((platform, idx) => (
                        <span key={idx} className="text-xs bg-blue-600 bg-opacity-20 text-blue-300 px-2 py-1 rounded">
                          {platform}
                        </span>
                      ))}
                    </div>
                    <div className={`text-xs px-2 py-1 rounded ${
                      rule.active 
                        ? 'bg-green-600 bg-opacity-20 text-green-300' 
                        : 'bg-red-600 bg-opacity-20 text-red-300'
                    }`}>
                      {rule.active ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Automation Templates */}
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Automation Templates</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  name: 'Community Engagement',
                  description: 'Auto-respond to common questions and welcome new members',
                  triggers: ['New member', 'Keyword mention', 'FAQ'],
                  category: 'Community'
                },
                {
                  name: 'Content Distribution',
                  description: 'Automatically cross-post content across all platforms',
                  triggers: ['New post', 'Schedule', 'RSS feed'],
                  category: 'Content'
                },
                {
                  name: 'Market Updates',
                  description: 'Share daily market summaries and project statistics',
                  triggers: ['Schedule', 'Price change', 'Volume spike'],
                  category: 'Analytics'
                },
                {
                  name: 'Event Promotion',
                  description: 'Promote upcoming events, AMAs, and announcements',
                  triggers: ['Calendar event', 'Countdown timer', 'RSVP reminder'],
                  category: 'Events'
                }
              ].map((template, idx) => (
                <div key={idx} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 hover:border-purple-500 transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{template.name}</h4>
                    <span className="text-xs bg-purple-600 bg-opacity-20 text-purple-300 px-2 py-1 rounded">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm mb-3">{template.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {template.triggers.map((trigger, triggerIdx) => (
                      <span key={triggerIdx} className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">
                        {trigger}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Scheduler Tab */}
      {activeTab === 'scheduler' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-green-400" />
                Scheduled Posts
              </h3>
              <button
                onClick={schedulePost}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all"
              >
                Schedule Post
              </button>
            </div>

            <div className="space-y-4">
              {scheduledPosts.map((post) => (
                <div key={post.id} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <p className="text-white mb-2 line-clamp-2">{post.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-zinc-400">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.scheduledTime.toLocaleDateString()} at {post.scheduledTime.toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs ${
                      post.status === 'pending' ? 'bg-yellow-600 bg-opacity-20 text-yellow-300' :
                      post.status === 'posted' ? 'bg-green-600 bg-opacity-20 text-green-300' :
                      'bg-red-600 bg-opacity-20 text-red-300'
                    }`}>
                      {post.status}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.platforms.map((platform, idx) => (
                        <span key={idx} className="text-xs bg-blue-600 bg-opacity-20 text-blue-300 px-2 py-1 rounded">
                          {platform}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-zinc-400 hover:text-white text-sm">Edit</button>
                      <button className="text-red-400 hover:text-red-300 text-sm">Cancel</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Optimal Posting Times */}
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Optimal Posting Times</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { platform: 'Twitter', bestTime: '9:00 AM - 3:00 PM', engagement: '23% higher' },
                { platform: 'Discord', bestTime: '6:00 PM - 11:00 PM', engagement: '45% higher' },
                { platform: 'Telegram', bestTime: '12:00 PM - 6:00 PM', engagement: '18% higher' }
              ].map((time, idx) => (
                <div key={idx} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <h4 className="text-white font-medium mb-2">{time.platform}</h4>
                  <p className="text-zinc-300 text-sm mb-1">{time.bestTime}</p>
                  <p className="text-green-400 text-xs">{time.engagement} engagement</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Social Media Analytics</h3>
            
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 text-lg">Advanced Analytics</p>
              <p className="text-zinc-500 text-sm mt-2 max-w-md mx-auto">
                Track engagement metrics, follower growth, and automation performance across all connected platforms.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Development Status */}
      <div className="mt-8 bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-4">
        <h4 className="text-blue-300 font-medium mb-2">🚧 Development Status</h4>
        <p className="text-blue-200 text-sm mb-2">
          Social Media Automation is in active development. Advanced bot capabilities and platform integrations coming soon.
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">✅ Platform Connections</span>
          <span className="bg-yellow-900 bg-opacity-50 text-yellow-300 px-2 py-1 rounded">🚧 Automation Engine</span>
          <span className="bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded">🔜 Advanced Analytics</span>
          <span className="bg-purple-900 bg-opacity-50 text-purple-300 px-2 py-1 rounded">🔜 AI Responses</span>
        </div>
      </div>
    </div>
  )
}
