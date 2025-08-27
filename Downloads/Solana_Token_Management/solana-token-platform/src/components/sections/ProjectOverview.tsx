'use client'

import { useState } from 'react'
import { CheckCircle, Circle, Star, Zap, Users, TrendingUp, Shield, Settings, Rocket } from 'lucide-react'
import LiveAPIStatus from '../LiveAPIStatus'

interface ProjectSection {
  id: string
  title: string
  description: string
  components: string[]
  status: 'completed' | 'in-progress' | 'planned'
  progress: number
}

export default function ProjectOverview() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null)

  const projectSections: ProjectSection[] = [
    {
      id: 'core-token',
      title: 'Core Token Management',
      description: 'Fundamental token operations and blockchain interactions',
      components: [
        'Token Manager - SPL token creation and management',
        'Balance Checker - Real-time wallet balance monitoring',
        'Multisender - Bulk token distribution system',
        'Liquidity Manager - Pool management and liquidity operations',
        'Token Burner - Secure token burning mechanisms'
      ],
      status: 'completed',
      progress: 100
    },
    {
      id: 'dex-integrations',
      title: 'DEX Integrations',
      description: 'Comprehensive decentralized exchange connectivity',
      components: [
        'Raydium AMM - Automated Market Maker integration',
        'Raydium CLMM - Concentrated Liquidity Market Maker',
        'Raydium CPMM - Constant Product Market Maker',
        'Pump.fun - Meme token launch platform',
        'Pump.swap - Token swapping interface',
        'Orca DEX - Advanced AMM with concentrated liquidity',
        'Jupiter Swap - Route optimization and best price execution'
      ],
      status: 'completed',
      progress: 100
    },
    {
      id: 'analytics',
      title: 'Analytics & Insights',
      description: 'Comprehensive market data and performance analytics',
      components: [
        'Real-time market data visualization',
        'Portfolio performance tracking',
        'Token analytics and metrics',
        'Trading volume analysis',
        'Price action insights'
      ],
      status: 'completed',
      progress: 100
    },
    {
      id: 'ai-tools',
      title: 'AI-Powered Tools',
      description: 'Artificial intelligence enhanced development suite',
      components: [
        'Project Ideas - AI-generated token concepts',
        'Branding & Design - Automated visual identity creation',
        'Tokenomics Calculator - Economic model optimization',
        'Whitepaper Generator - Technical documentation automation',
        'Website Builder - AI-assisted landing page creation'
      ],
      status: 'completed',
      progress: 100
    },
    {
      id: 'marketing',
      title: 'Marketing Suite',
      description: 'Complete marketing automation and community management',
      components: [
        'Content Generator - AI-powered marketing content',
        'Social Automation - Multi-platform posting and engagement',
        'Community Tools - Discord/Telegram integration and management'
      ],
      status: 'completed',
      progress: 100
    },
    {
      id: 'advanced',
      title: 'Advanced Features',
      description: 'Professional trading and portfolio management tools',
      components: [
        'Portfolio Tracker - Advanced portfolio analytics',
        'Arbitrage Scanner - Cross-DEX opportunity detection',
        'Risk Management - Position sizing and risk assessment'
      ],
      status: 'completed',
      progress: 100
    },
    {
      id: 'settings',
      title: 'Settings & Configuration',
      description: 'User preferences and system configuration',
      components: [
        'User Profile Management - Account settings and preferences',
        'Security Settings - 2FA, login alerts, and access control',
        'Notification System - Customizable alerts and updates',
        'API Key Management - External service integrations',
        'Backup & Restore - Configuration export/import'
      ],
      status: 'completed',
      progress: 100
    }
  ]

  const totalComponents = projectSections.reduce((sum, section) => sum + section.components.length, 0)
  const completedSections = projectSections.filter(s => s.status === 'completed').length
  const overallProgress = (completedSections / projectSections.length) * 100

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-2">
              SolX Engine - Complete Platform Overview
            </h1>
            <p className="text-zinc-400 text-lg">
              Comprehensive Solana token management and launch ecosystem
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-400">{Math.round(overallProgress)}%</div>
            <div className="text-zinc-400 text-sm">Platform Complete</div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <Rocket className="w-6 h-6 text-purple-400" />
            <span className="text-2xl font-bold text-white">{projectSections.length}</span>
          </div>
          <div className="text-zinc-400 text-sm">Total Sections</div>
        </div>
        
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <Zap className="w-6 h-6 text-green-400" />
            <span className="text-2xl font-bold text-white">{totalComponents}</span>
          </div>
          <div className="text-zinc-400 text-sm">Total Components</div>
        </div>
        
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-6 h-6 text-blue-400" />
            <span className="text-2xl font-bold text-white">{completedSections}</span>
          </div>
          <div className="text-zinc-400 text-sm">Completed Sections</div>
        </div>
        
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-6 h-6 text-yellow-400" />
            <span className="text-2xl font-bold text-white">100%</span>
          </div>
          <div className="text-zinc-400 text-sm">Development Progress</div>
        </div>
      </div>

      {/* Section Cards */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {projectSections.map((section) => (
          <div 
            key={section.id}
            className={`bg-zinc-900 rounded-xl p-6 border cursor-pointer transition-all hover:border-purple-500 ${
              selectedSection === section.id ? 'border-purple-500 ring-2 ring-purple-500 ring-opacity-20' : 'border-zinc-800'
            }`}
            onClick={() => setSelectedSection(selectedSection === section.id ? null : section.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
                  {section.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  ) : section.status === 'in-progress' ? (
                    <Circle className="w-5 h-5 text-yellow-400 mr-2" />
                  ) : (
                    <Circle className="w-5 h-5 text-zinc-600 mr-2" />
                  )}
                  {section.title}
                </h3>
                <p className="text-zinc-400 text-sm mb-3">{section.description}</p>
              </div>
              <div className="text-right ml-4">
                <div className={`text-sm px-2 py-1 rounded ${
                  section.status === 'completed' ? 'bg-green-900 bg-opacity-30 text-green-300' :
                  section.status === 'in-progress' ? 'bg-yellow-900 bg-opacity-30 text-yellow-300' :
                  'bg-zinc-700 bg-opacity-30 text-zinc-400'
                }`}>
                  {section.progress}%
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-zinc-800 rounded-full h-2 mb-4">
              <div 
                className={`h-2 rounded-full transition-all ${
                  section.status === 'completed' ? 'bg-gradient-to-r from-green-600 to-emerald-600' :
                  section.status === 'in-progress' ? 'bg-gradient-to-r from-yellow-600 to-orange-600' :
                  'bg-zinc-600'
                }`}
                style={{ width: `${section.progress}%` }}
              />
            </div>

            {/* Component List */}
            {selectedSection === section.id && (
              <div className="space-y-2 border-t border-zinc-800 pt-4">
                <h4 className="text-sm font-medium text-zinc-300 mb-2">Components:</h4>
                {section.components.map((component, idx) => (
                  <div key={idx} className="flex items-center text-sm text-zinc-400">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    <span>{component}</span>
                  </div>
                ))}
              </div>
            )}
            
            {/* Component Count */}
            <div className="flex items-center justify-between text-xs text-zinc-500 mt-3">
              <span>{section.components.length} components</span>
              <span className="capitalize">{section.status.replace('-', ' ')}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Technology Stack */}
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 mb-8">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2 text-cyan-400" />
          Technology Stack
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-white font-medium mb-3">Frontend</h4>
            <div className="space-y-2 text-sm text-zinc-400">
              <div>• Next.js 14 with TypeScript</div>
              <div>• Tailwind CSS for styling</div>
              <div>• React with hooks and context</div>
              <div>• Responsive design system</div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Blockchain</h4>
            <div className="space-y-2 text-sm text-zinc-400">
              <div>• Solana Web3.js integration</div>
              <div>• Wallet adapter support</div>
              <div>• SPL token standards</div>
              <div>• Multi-DEX connectivity</div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Features</h4>
            <div className="space-y-2 text-sm text-zinc-400">
              <div>• Real-time data updates</div>
              <div>• AI-powered tools</div>
              <div>• Advanced analytics</div>
              <div>• Security best practices</div>
            </div>
          </div>
        </div>
      </div>

      {/* Live API Status */}
      <LiveAPIStatus />

      {/* Success Banner */}
      <div className="bg-gradient-to-r from-green-900 to-emerald-900 border border-green-700 rounded-xl p-6 text-center mt-8">
        <div className="flex items-center justify-center mb-4">
          <Star className="w-8 h-8 text-yellow-400 mr-2" />
          <h3 className="text-2xl font-bold text-white">🎉 Project Complete!</h3>
          <Star className="w-8 h-8 text-yellow-400 ml-2" />
        </div>
        <p className="text-green-200 text-lg mb-4">
          SolX Engine is now a fully functional Solana token management platform with {totalComponents} components across {projectSections.length} major sections.
        </p>
        <div className="flex flex-wrap justify-center gap-2 text-sm">
          <span className="bg-green-800 bg-opacity-50 text-green-300 px-3 py-1 rounded-full">✅ Token Management</span>
          <span className="bg-blue-800 bg-opacity-50 text-blue-300 px-3 py-1 rounded-full">✅ DEX Integration</span>
          <span className="bg-purple-800 bg-opacity-50 text-purple-300 px-3 py-1 rounded-full">✅ AI Tools</span>
          <span className="bg-pink-800 bg-opacity-50 text-pink-300 px-3 py-1 rounded-full">✅ Marketing Suite</span>
          <span className="bg-yellow-800 bg-opacity-50 text-yellow-300 px-3 py-1 rounded-full">✅ Advanced Features</span>
          <span className="bg-cyan-800 bg-opacity-50 text-cyan-300 px-3 py-1 rounded-full">✅ Settings & Config</span>
        </div>
      </div>
    </div>
  )
}
