'use client'

import { useState } from 'react'
import { Lightbulb, Sparkles, Loader2, RefreshCw, Copy, Heart, TrendingUp, Users, Zap } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'

interface ProjectIdea {
  title: string
  description: string
  category: string
  marketSize: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedTime: string
  potentialRevenue: string
  tags: string[]
}

export default function IdeaGeneration() {
  const { publicKey } = useWallet()
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'DeFi' | 'Gaming' | 'Social' | 'Utility' | 'NFT'>('All')
  const [difficulty, setDifficulty] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All')
  const [savedIdeas, setSavedIdeas] = useState<number[]>([])

  const mockIdeas: ProjectIdea[] = [
    {
      title: 'Solana Fitness Rewards',
      description: 'A fitness tracking app that rewards users with custom tokens for achieving daily exercise goals. Users can stake their tokens to join fitness challenges and earn from a community reward pool.',
      category: 'Utility',
      marketSize: '$2.8B (Fitness Apps)',
      difficulty: 'Intermediate',
      estimatedTime: '3-4 months',
      potentialRevenue: '$50K-200K/year',
      tags: ['Health', 'Gamification', 'Community', 'Mobile']
    },
    {
      title: 'Micro-Investment DAO',
      description: 'A decentralized platform where users pool small amounts of SOL to make collective investments in Solana projects. Token holders vote on investment decisions and share profits proportionally.',
      category: 'DeFi',
      marketSize: '$120B (Investment Mgmt)',
      difficulty: 'Advanced',
      estimatedTime: '6-8 months',
      potentialRevenue: '$200K-1M/year',
      tags: ['DAO', 'Investing', 'Governance', 'Community']
    },
    {
      title: 'Solana Skill Marketplace',
      description: 'A freelancing platform where service providers stake tokens to verify their skills. Clients can filter by staked amount, ensuring quality matches. Successful completion increases reputation and token rewards.',
      category: 'Social',
      marketSize: '$400B (Gig Economy)',
      difficulty: 'Intermediate',
      estimatedTime: '4-5 months',
      potentialRevenue: '$100K-500K/year',
      tags: ['Freelancing', 'Reputation', 'Skills', 'Matching']
    },
    {
      title: 'Weather Prediction Game',
      description: 'Users stake tokens on weather predictions for their city. Accurate predictions win from the prize pool. Meteorologists can earn premium tokens for providing expert insights.',
      category: 'Gaming',
      marketSize: '$180B (Gaming)',
      difficulty: 'Beginner',
      estimatedTime: '2-3 months',
      potentialRevenue: '$25K-100K/year',
      tags: ['Prediction', 'Weather', 'Gamification', 'Oracle']
    },
    {
      title: 'Carbon Credit NFT Exchange',
      description: 'Tokenize real-world carbon credits as NFTs on Solana. Companies can purchase to offset emissions, while environmental projects can fund themselves by selling future credits.',
      category: 'NFT',
      marketSize: '$1B (Carbon Markets)',
      difficulty: 'Advanced',
      estimatedTime: '5-6 months',
      potentialRevenue: '$100K-1M/year',
      tags: ['Environment', 'Sustainability', 'Compliance', 'B2B']
    },
    {
      title: 'Community Recipe Token',
      description: 'Food enthusiasts share recipes and get rewarded with community tokens. Token holders can access premium recipes, cooking classes, and vote on featured dishes.',
      category: 'Social',
      marketSize: '$5B (Food Apps)',
      difficulty: 'Beginner',
      estimatedTime: '2-3 months',
      potentialRevenue: '$30K-150K/year',
      tags: ['Food', 'Community', 'Content', 'Social']
    }
  ]

  const filteredIdeas = mockIdeas.filter(idea => {
    if (selectedCategory !== 'All' && idea.category !== selectedCategory) return false
    if (difficulty !== 'All' && idea.difficulty !== difficulty) return false
    return true
  })

  const generateNewIdea = async () => {
    setIsGenerating(true)
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsGenerating(false)
    // In real implementation, this would call the AI API
    alert('🚧 AI Idea Generation\n\nGenerating fresh project ideas based on current market trends, your interests, and Solana ecosystem opportunities...')
  }

  const toggleSaveIdea = (index: number) => {
    if (savedIdeas.includes(index)) {
      setSavedIdeas(savedIdeas.filter(i => i !== index))
    } else {
      setSavedIdeas([...savedIdeas, index])
    }
  }

  const copyIdea = (idea: ProjectIdea) => {
    const ideaText = `${idea.title}\n\n${idea.description}\n\nCategory: ${idea.category}\nDifficulty: ${idea.difficulty}\nEstimated Time: ${idea.estimatedTime}\nMarket Size: ${idea.marketSize}\nPotential Revenue: ${idea.potentialRevenue}\n\nTags: ${idea.tags.join(', ')}`
    navigator.clipboard.writeText(ideaText)
    alert('Idea copied to clipboard!')
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent mb-2">
          AI Project Ideas Generator
        </h1>
        <p className="text-zinc-400">
          Get AI-powered project ideas tailored for the Solana ecosystem with market insights and feasibility analysis
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center mb-6 p-4 bg-zinc-900 rounded-xl border border-zinc-800">
        <div className="flex items-center space-x-2">
          <span className="text-zinc-300 text-sm">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500"
          >
            <option value="All">All Categories</option>
            <option value="DeFi">DeFi</option>
            <option value="Gaming">Gaming</option>
            <option value="Social">Social</option>
            <option value="Utility">Utility</option>
            <option value="NFT">NFT</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-zinc-300 text-sm">Difficulty:</span>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as any)}
            className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500"
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <button
          onClick={generateNewIdea}
          disabled={isGenerating}
          className="ml-auto bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate New Ideas</span>
            </>
          )}
        </button>
      </div>

      {/* Ideas Grid */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {filteredIdeas.map((idea, index) => (
          <div key={index} className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6 hover:border-orange-500 transition-colors">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">{idea.title}</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    idea.category === 'DeFi' ? 'bg-blue-900 bg-opacity-50 text-blue-300' :
                    idea.category === 'Gaming' ? 'bg-purple-900 bg-opacity-50 text-purple-300' :
                    idea.category === 'Social' ? 'bg-green-900 bg-opacity-50 text-green-300' :
                    idea.category === 'Utility' ? 'bg-orange-900 bg-opacity-50 text-orange-300' :
                    'bg-pink-900 bg-opacity-50 text-pink-300'
                  }`}>
                    {idea.category}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    idea.difficulty === 'Beginner' ? 'bg-green-900 bg-opacity-50 text-green-300' :
                    idea.difficulty === 'Intermediate' ? 'bg-yellow-900 bg-opacity-50 text-yellow-300' :
                    'bg-red-900 bg-opacity-50 text-red-300'
                  }`}>
                    {idea.difficulty}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleSaveIdea(index)}
                  className={`p-2 rounded-lg transition-colors ${
                    savedIdeas.includes(index)
                      ? 'bg-pink-600 text-white'
                      : 'bg-zinc-800 text-zinc-400 hover:text-pink-400'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                </button>
                <button
                  onClick={() => copyIdea(idea)}
                  className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-zinc-300 mb-4 leading-relaxed">{idea.description}</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-zinc-800 rounded-lg p-3 border border-zinc-700">
                <div className="flex items-center space-x-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-zinc-400 text-xs">Market Size</span>
                </div>
                <div className="text-white font-medium text-sm">{idea.marketSize}</div>
              </div>
              <div className="bg-zinc-800 rounded-lg p-3 border border-zinc-700">
                <div className="flex items-center space-x-2 mb-1">
                  <Zap className="w-4 h-4 text-orange-400" />
                  <span className="text-zinc-400 text-xs">Time to Build</span>
                </div>
                <div className="text-white font-medium text-sm">{idea.estimatedTime}</div>
              </div>
              <div className="bg-zinc-800 rounded-lg p-3 border border-zinc-700 col-span-2">
                <div className="flex items-center space-x-2 mb-1">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span className="text-zinc-400 text-xs">Revenue Potential</span>
                </div>
                <div className="text-white font-medium text-sm">{idea.potentialRevenue}</div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {idea.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="text-xs px-2 py-1 bg-zinc-800 text-zinc-300 rounded border border-zinc-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Saved Ideas Count */}
      {savedIdeas.length > 0 && (
        <div className="bg-pink-900 bg-opacity-30 border border-pink-700 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-pink-400" />
            <span className="text-pink-300 font-medium">
              You have saved {savedIdeas.length} idea{savedIdeas.length !== 1 ? 's' : ''}
            </span>
          </div>
          <p className="text-pink-200 text-sm mt-1">
            Access your saved ideas anytime in your dashboard to start planning your next Solana project!
          </p>
        </div>
      )}

      {/* AI Enhancement Notice */}
      <div className="bg-gradient-to-r from-orange-900 to-pink-900 bg-opacity-30 border border-orange-700 rounded-lg p-4">
        <h4 className="text-orange-300 font-medium mb-2 flex items-center">
          <Lightbulb className="w-4 h-4 mr-2" />
          AI-Powered Insights
        </h4>
        <p className="text-orange-200 text-sm mb-3">
          Our AI analyzes current market trends, Solana ecosystem opportunities, and your profile to generate personalized project ideas.
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-orange-900 bg-opacity-50 text-orange-300 px-2 py-1 rounded">Market Analysis</span>
          <span className="bg-pink-900 bg-opacity-50 text-pink-300 px-2 py-1 rounded">Trend Prediction</span>
          <span className="bg-purple-900 bg-opacity-50 text-purple-300 px-2 py-1 rounded">Feasibility Scoring</span>
          <span className="bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded">Revenue Modeling</span>
        </div>
      </div>

      {/* Development Status */}
      <div className="mt-8 bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded-lg p-4">
        <h4 className="text-yellow-300 font-medium mb-2">🚧 Development Status</h4>
        <p className="text-yellow-200 text-sm mb-2">
          AI Project Ideas Generator is in active development. Advanced AI integration with market data and personalization coming soon.
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">✅ UI Complete</span>
          <span className="bg-yellow-900 bg-opacity-50 text-yellow-300 px-2 py-1 rounded">🚧 AI API Integration</span>
          <span className="bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded">🔜 Market Data Feeds</span>
          <span className="bg-purple-900 bg-opacity-50 text-purple-300 px-2 py-1 rounded">🔜 User Personalization</span>
        </div>
      </div>
    </div>
  )
}
