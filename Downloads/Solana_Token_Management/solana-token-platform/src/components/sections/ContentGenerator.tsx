'use client'

import { useState } from 'react'
import { PenTool, Hash, MessageCircle, Image, Copy, Download, Sparkles, Target, Calendar, Zap } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'

interface ContentTemplate {
  id: string
  name: string
  description: string
  category: 'social' | 'blog' | 'email' | 'press'
  platforms: string[]
  tone: string
  length: string
}

interface GeneratedContent {
  id: string
  title: string
  content: string
  platform: string
  hashtags: string[]
  tone: string
  wordCount: number
  timestamp: Date
}

export default function ContentGenerator() {
  const { publicKey } = useWallet()
  const [activeTab, setActiveTab] = useState<'generator' | 'templates' | 'library' | 'calendar'>('generator')
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<ContentTemplate | null>(null)
  
  const [contentConfig, setContentConfig] = useState({
    projectName: '',
    topic: '',
    platform: 'twitter',
    tone: 'professional',
    length: 'short',
    targetAudience: '',
    keywords: [] as string[]
  })

  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([
    {
      id: '1',
      title: 'Token Launch Announcement',
      content: '🚀 Excited to announce the launch of our revolutionary DeFi token! Built on Solana for lightning-fast transactions and minimal fees. Join our community and be part of the future of finance! #DeFi #Solana #TokenLaunch',
      platform: 'Twitter',
      hashtags: ['#DeFi', '#Solana', '#TokenLaunch'],
      tone: 'Exciting',
      wordCount: 45,
      timestamp: new Date()
    },
    {
      id: '2',
      title: 'Weekly Update Blog Post',
      content: 'This week has been incredible for our project! We\'ve reached 10K holders, completed our security audit, and launched staking rewards. Our community continues to grow stronger every day. Here\'s what\'s coming next...',
      platform: 'Medium',
      hashtags: ['#WeeklyUpdate', '#Community', '#Staking'],
      tone: 'Professional',
      wordCount: 156,
      timestamp: new Date(Date.now() - 86400000)
    }
  ])

  const templates: ContentTemplate[] = [
    {
      id: 'token-launch',
      name: 'Token Launch Announcement',
      description: 'Professional announcement for token launches',
      category: 'social',
      platforms: ['Twitter', 'Discord', 'Telegram'],
      tone: 'Exciting',
      length: 'Short'
    },
    {
      id: 'weekly-update',
      name: 'Weekly Progress Update',
      description: 'Regular community updates on project progress',
      category: 'blog',
      platforms: ['Medium', 'Blog', 'Newsletter'],
      tone: 'Professional',
      length: 'Medium'
    },
    {
      id: 'feature-announcement',
      name: 'New Feature Release',
      description: 'Announce new product features and updates',
      category: 'social',
      platforms: ['Twitter', 'LinkedIn', 'Discord'],
      tone: 'Professional',
      length: 'Medium'
    },
    {
      id: 'community-highlight',
      name: 'Community Spotlight',
      description: 'Highlight community members and achievements',
      category: 'social',
      platforms: ['Twitter', 'Instagram', 'Discord'],
      tone: 'Friendly',
      length: 'Short'
    },
    {
      id: 'partnership',
      name: 'Partnership Announcement',
      description: 'Professional partnership and collaboration announcements',
      category: 'press',
      platforms: ['LinkedIn', 'Medium', 'Press Release'],
      tone: 'Professional',
      length: 'Long'
    },
    {
      id: 'educational',
      name: 'Educational Content',
      description: 'Explain complex topics in simple terms',
      category: 'blog',
      platforms: ['Medium', 'YouTube', 'Blog'],
      tone: 'Educational',
      length: 'Long'
    }
  ]

  const platforms = ['Twitter', 'Discord', 'Telegram', 'LinkedIn', 'Medium', 'Instagram', 'YouTube', 'TikTok']
  const tones = ['Professional', 'Friendly', 'Exciting', 'Educational', 'Humorous', 'Authoritative']
  const lengths = ['Short (50-100 words)', 'Medium (100-300 words)', 'Long (300+ words)']

  const generateContent = async () => {
    if (!contentConfig.topic) {
      alert('Please enter a topic to generate content about')
      return
    }

    setIsGenerating(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockContent = {
        twitter: `🚀 ${contentConfig.topic} is revolutionizing the crypto space! Built on Solana for ultra-fast transactions. Join our growing community and discover the future of DeFi! #Solana #DeFi #Crypto`,
        discord: `Hey @everyone! 👋\n\nExciting news about ${contentConfig.topic}! We're building something incredible on Solana, and we want you to be part of it. Check out our latest updates and let us know what you think!\n\nWhat features would you like to see next? Drop your ideas below! 💡`,
        medium: `# The Future of ${contentConfig.topic}: A New Era in DeFi\n\nThe decentralized finance landscape is evolving rapidly, and ${contentConfig.topic} is at the forefront of this revolution. Built on the high-performance Solana blockchain, our platform addresses key challenges in the current ecosystem while providing unprecedented user experience.\n\n## What Makes Us Different\n\nOur approach to ${contentConfig.topic.toLowerCase()} combines cutting-edge technology with user-centric design...`
      }

      const newContent: GeneratedContent = {
        id: Date.now().toString(),
        title: `${contentConfig.topic} - ${contentConfig.platform}`,
        content: mockContent[contentConfig.platform as keyof typeof mockContent] || `Generated content about ${contentConfig.topic} for ${contentConfig.platform}...`,
        platform: contentConfig.platform,
        hashtags: ['#Solana', '#DeFi', `#${contentConfig.topic.replace(/\s+/g, '')}`],
        tone: contentConfig.tone,
        wordCount: Math.floor(Math.random() * 200) + 50,
        timestamp: new Date()
      }

      setGeneratedContent(prev => [newContent, ...prev])
      alert(`✨ Content Generated!\n\nYour ${contentConfig.platform} content about "${contentConfig.topic}" is ready! Check the library tab to view and manage all your generated content.`)
    } catch (error) {
      console.error('Content generation failed:', error)
      alert('Content generation failed')
    }
    setIsGenerating(false)
  }

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    alert('Content copied to clipboard!')
  }

  const generateHashtags = async () => {
    const hashtags = ['#Solana', '#DeFi', '#Crypto', '#Web3', '#Blockchain', '#TokenLaunch', '#Innovation', '#Community']
    setContentConfig({
      ...contentConfig,
      keywords: hashtags.slice(0, 5)
    })
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-2">
          AI Content Generator
        </h1>
        <p className="text-zinc-400">
          Create engaging content for all your marketing channels with AI-powered writing assistance
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-zinc-900 rounded-xl p-1">
        {[
          { id: 'generator', label: 'Generator', icon: PenTool },
          { id: 'templates', label: 'Templates', icon: Sparkles },
          { id: 'library', label: 'Content Library', icon: Copy },
          { id: 'calendar', label: 'Calendar', icon: Calendar }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Generator Tab */}
      {activeTab === 'generator' && (
        <div className="space-y-6">
          {/* Content Configuration */}
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-purple-400" />
              Content Configuration
            </h3>
            <div className="grid lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Project Name</label>
                <input
                  type="text"
                  value={contentConfig.projectName}
                  onChange={(e) => setContentConfig({...contentConfig, projectName: e.target.value})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                  placeholder="Enter your project name..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Content Topic</label>
                <input
                  type="text"
                  value={contentConfig.topic}
                  onChange={(e) => setContentConfig({...contentConfig, topic: e.target.value})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                  placeholder="What do you want to write about?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Platform</label>
                <select
                  value={contentConfig.platform}
                  onChange={(e) => setContentConfig({...contentConfig, platform: e.target.value})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  {platforms.map(platform => (
                    <option key={platform} value={platform.toLowerCase()}>{platform}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Tone</label>
                <select
                  value={contentConfig.tone}
                  onChange={(e) => setContentConfig({...contentConfig, tone: e.target.value})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  {tones.map(tone => (
                    <option key={tone} value={tone.toLowerCase()}>{tone}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Length</label>
                <select
                  value={contentConfig.length}
                  onChange={(e) => setContentConfig({...contentConfig, length: e.target.value})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                >
                  {lengths.map(length => (
                    <option key={length} value={length.split(' ')[0].toLowerCase()}>{length}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Target Audience</label>
                <input
                  type="text"
                  value={contentConfig.targetAudience}
                  onChange={(e) => setContentConfig({...contentConfig, targetAudience: e.target.value})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                  placeholder="Crypto enthusiasts, developers..."
                />
              </div>
            </div>

            {/* Keywords */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-zinc-300">Keywords & Hashtags</label>
                <button
                  onClick={generateHashtags}
                  className="text-purple-400 hover:text-purple-300 text-sm flex items-center space-x-1"
                >
                  <Hash className="w-4 h-4" />
                  <span>Generate</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {contentConfig.keywords.map((keyword, idx) => (
                  <span key={idx} className="bg-purple-600 bg-opacity-20 text-purple-300 px-3 py-1 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={generateContent}
                disabled={isGenerating}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-medium transition-all text-lg flex items-center space-x-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>{isGenerating ? 'Generating...' : 'Generate Content'}</span>
              </button>
            </div>
          </div>

          {/* Quick Templates */}
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Templates</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {templates.slice(0, 6).map((template) => (
                <button
                  key={template.id}
                  onClick={() => {
                    setSelectedTemplate(template)
                    setContentConfig({
                      ...contentConfig,
                      topic: template.name,
                      platform: template.platforms[0].toLowerCase(),
                      tone: template.tone.toLowerCase()
                    })
                  }}
                  className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-purple-500 rounded-lg p-4 text-left transition-all"
                >
                  <h4 className="text-white font-medium mb-1">{template.name}</h4>
                  <p className="text-zinc-400 text-sm mb-2">{template.description}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-purple-600 bg-opacity-20 text-purple-300 px-2 py-1 rounded">
                      {template.tone}
                    </span>
                    <span className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">
                      {template.length}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Content Templates</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <div key={template.id} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{template.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${
                      template.category === 'social' ? 'bg-blue-600 bg-opacity-20 text-blue-300' :
                      template.category === 'blog' ? 'bg-green-600 bg-opacity-20 text-green-300' :
                      template.category === 'email' ? 'bg-yellow-600 bg-opacity-20 text-yellow-300' :
                      'bg-purple-600 bg-opacity-20 text-purple-300'
                    }`}>
                      {template.category}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm mb-3">{template.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {template.platforms.slice(0, 2).map((platform, idx) => (
                        <span key={idx} className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded">
                          {platform}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        setSelectedTemplate(template)
                        setActiveTab('generator')
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-all"
                    >
                      Use Template
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Library Tab */}
      {activeTab === 'library' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Generated Content</h3>
              <div className="text-sm text-zinc-400">
                {generatedContent.length} items
              </div>
            </div>
            <div className="space-y-4">
              {generatedContent.map((content) => (
                <div key={content.id} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{content.title}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-blue-600 bg-opacity-20 text-blue-300 px-2 py-1 rounded">
                        {content.platform}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {content.wordCount} words
                      </span>
                    </div>
                  </div>
                  <p className="text-zinc-300 mb-3 line-clamp-3">{content.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {content.hashtags.map((tag, idx) => (
                        <span key={idx} className="text-xs bg-purple-600 bg-opacity-20 text-purple-300 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => copyToClipboard(content.content)}
                        className="bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1 rounded text-sm transition-all flex items-center space-x-1"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </button>
                      <button className="bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1 rounded text-sm transition-all flex items-center space-x-1">
                        <Download className="w-3 h-3" />
                        <span>Export</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Calendar Tab */}
      {activeTab === 'calendar' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Content Calendar</h3>
            
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 text-lg">Content Scheduling</p>
              <p className="text-zinc-500 text-sm mt-2 max-w-md mx-auto">
                Plan, schedule, and manage your content across all platforms with an integrated calendar view and automated posting.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Development Status */}
      <div className="mt-8 bg-purple-900 bg-opacity-30 border border-purple-700 rounded-lg p-4">
        <h4 className="text-purple-300 font-medium mb-2">🚧 Development Status</h4>
        <p className="text-purple-200 text-sm mb-2">
          AI Content Generator is in active development. Advanced AI models and multi-platform publishing coming soon.
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">✅ Content Generation</span>
          <span className="bg-yellow-900 bg-opacity-50 text-yellow-300 px-2 py-1 rounded">🚧 Template Library</span>
          <span className="bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded">🔜 Auto Scheduling</span>
          <span className="bg-purple-900 bg-opacity-50 text-purple-300 px-2 py-1 rounded">🔜 Multi-Platform Publishing</span>
        </div>
      </div>
    </div>
  )
}
