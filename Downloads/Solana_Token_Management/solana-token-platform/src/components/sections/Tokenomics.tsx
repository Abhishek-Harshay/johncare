'use client'

import { useState } from 'react'
import { PieChart, Calculator, TrendingUp, Users, Lock, Zap, Download, BarChart3, Target } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'

interface TokenomicsModel {
  tokenName: string
  totalSupply: number
  initialPrice: number
  allocation: {
    publicSale: number
    privateSale: number
    team: number
    advisors: number
    treasury: number
    liquidity: number
    ecosystem: number
    marketing: number
  }
  vesting: {
    team: { cliff: number, duration: number }
    advisors: { cliff: number, duration: number }
    privateSale: { cliff: number, duration: number }
  }
  burnMechanism: boolean
  stakingRewards: number
  inflationRate: number
}

interface TokenMetrics {
  marketCap: string
  fdv: string
  liquidityRatio: string
  teamOwnership: string
  burnRate: string
  stakingApy: string
}

export default function Tokenomics() {
  const { publicKey } = useWallet()
  const [activeTab, setActiveTab] = useState<'calculator' | 'analysis' | 'scenarios'>('calculator')
  const [isCalculating, setIsCalculating] = useState(false)
  
  const [tokenomics, setTokenomics] = useState<TokenomicsModel>({
    tokenName: '',
    totalSupply: 1000000000,
    initialPrice: 0.01,
    allocation: {
      publicSale: 30,
      privateSale: 15,
      team: 20,
      advisors: 5,
      treasury: 15,
      liquidity: 10,
      ecosystem: 3,
      marketing: 2
    },
    vesting: {
      team: { cliff: 12, duration: 36 },
      advisors: { cliff: 6, duration: 24 },
      privateSale: { cliff: 3, duration: 12 }
    },
    burnMechanism: true,
    stakingRewards: 8,
    inflationRate: 2
  })

  const calculateMetrics = (): TokenMetrics => {
    const marketCap = (tokenomics.totalSupply * tokenomics.allocation.publicSale / 100 * tokenomics.initialPrice).toFixed(0)
    const fdv = (tokenomics.totalSupply * tokenomics.initialPrice).toFixed(0)
    const liquidityRatio = tokenomics.allocation.liquidity.toFixed(1)
    const teamOwnership = tokenomics.allocation.team.toFixed(1)
    const burnRate = tokenomics.burnMechanism ? '2.0' : '0.0'
    const stakingApy = tokenomics.stakingRewards.toFixed(1)

    return {
      marketCap: `$${Number(marketCap).toLocaleString()}`,
      fdv: `$${Number(fdv).toLocaleString()}`,
      liquidityRatio: `${liquidityRatio}%`,
      teamOwnership: `${teamOwnership}%`,
      burnRate: `${burnRate}%`,
      stakingApy: `${stakingApy}%`
    }
  }

  const metrics = calculateMetrics()

  const updateAllocation = (key: keyof typeof tokenomics.allocation, value: number) => {
    const newAllocation = { ...tokenomics.allocation, [key]: value }
    
    // Ensure total doesn't exceed 100%
    const total = Object.values(newAllocation).reduce((sum, val) => sum + val, 0)
    if (total <= 100) {
      setTokenomics({ ...tokenomics, allocation: newAllocation })
    }
  }

  const getTotalAllocation = () => {
    return Object.values(tokenomics.allocation).reduce((sum, val) => sum + val, 0)
  }

  const generateTokenomicsReport = async () => {
    setIsCalculating(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert(`🚧 AI Tokenomics Analysis\n\nGenerating comprehensive tokenomics report for "${tokenomics.tokenName || 'Your Token'}":\n\n• Economic model validation\n• Inflation/deflation analysis\n• Vesting schedule optimization\n• Risk assessment\n• Comparisons with similar projects\n• Recommendations for improvement`)
    } catch (error) {
      console.error('Tokenomics calculation failed:', error)
      alert('Tokenomics analysis failed')
    }
    setIsCalculating(false)
  }

  const allocationColors = {
    publicSale: '#10b981',
    privateSale: '#3b82f6',
    team: '#8b5cf6',
    advisors: '#f59e0b',
    treasury: '#ef4444',
    liquidity: '#06b6d4',
    ecosystem: '#84cc16',
    marketing: '#f97316'
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          AI Tokenomics Calculator
        </h1>
        <p className="text-zinc-400">
          Design optimal token economics with AI-powered analysis and market insights
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-zinc-900 rounded-xl p-1">
        {[
          { id: 'calculator', label: 'Token Calculator', icon: Calculator },
          { id: 'analysis', label: 'AI Analysis', icon: BarChart3 },
          { id: 'scenarios', label: 'Scenarios', icon: Target }
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

      {/* Token Calculator Tab */}
      {activeTab === 'calculator' && (
        <div className="space-y-6">
          {/* Basic Parameters */}
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Token Parameters</h3>
            <div className="grid lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Token Name</label>
                <input
                  type="text"
                  value={tokenomics.tokenName}
                  onChange={(e) => setTokenomics({...tokenomics, tokenName: e.target.value})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-green-500"
                  placeholder="Enter token name..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Total Supply</label>
                <input
                  type="number"
                  value={tokenomics.totalSupply}
                  onChange={(e) => setTokenomics({...tokenomics, totalSupply: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-green-500"
                  placeholder="1000000000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Initial Price ($)</label>
                <input
                  type="number"
                  step="0.001"
                  value={tokenomics.initialPrice}
                  onChange={(e) => setTokenomics({...tokenomics, initialPrice: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-green-500"
                  placeholder="0.01"
                />
              </div>
            </div>
          </div>

          {/* Token Allocation */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Token Allocation</h3>
              <div className="space-y-4">
                {Object.entries(tokenomics.allocation).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: allocationColors[key as keyof typeof allocationColors] }}
                      />
                      <span className="text-zinc-300 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={value}
                        onChange={(e) => updateAllocation(key as keyof typeof tokenomics.allocation, parseFloat(e.target.value))}
                        className="w-16 px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-white text-sm focus:outline-none focus:border-green-500"
                      />
                      <span className="text-zinc-400 text-sm">%</span>
                    </div>
                  </div>
                ))}
                <div className="border-t border-zinc-700 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">Total</span>
                    <span className={`font-medium ${getTotalAllocation() === 100 ? 'text-green-400' : getTotalAllocation() > 100 ? 'text-red-400' : 'text-yellow-400'}`}>
                      {getTotalAllocation()}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vesting Schedule */}
            <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Vesting Schedule</h3>
              <div className="space-y-4">
                {Object.entries(tokenomics.vesting).map(([key, value]) => (
                  <div key={key} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                    <h4 className="text-white font-medium mb-2 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">Cliff (months)</label>
                        <input
                          type="number"
                          min="0"
                          value={value.cliff}
                          onChange={(e) => setTokenomics({
                            ...tokenomics,
                            vesting: {
                              ...tokenomics.vesting,
                              [key]: { ...value, cliff: parseInt(e.target.value) }
                            }
                          })}
                          className="w-full px-2 py-1 bg-zinc-700 border border-zinc-600 rounded text-white text-sm focus:outline-none focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">Duration (months)</label>
                        <input
                          type="number"
                          min="0"
                          value={value.duration}
                          onChange={(e) => setTokenomics({
                            ...tokenomics,
                            vesting: {
                              ...tokenomics.vesting,
                              [key]: { ...value, duration: parseInt(e.target.value) }
                            }
                          })}
                          className="w-full px-2 py-1 bg-zinc-700 border border-zinc-600 rounded text-white text-sm focus:outline-none focus:border-green-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Economic Parameters */}
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Economic Mechanisms</h3>
            <div className="grid lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={tokenomics.burnMechanism}
                  onChange={(e) => setTokenomics({...tokenomics, burnMechanism: e.target.checked})}
                  className="accent-green-500"
                />
                <label className="text-zinc-300">Token Burn Mechanism</label>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Staking Rewards (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={tokenomics.stakingRewards}
                  onChange={(e) => setTokenomics({...tokenomics, stakingRewards: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Inflation Rate (%)</label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  value={tokenomics.inflationRate}
                  onChange={(e) => setTokenomics({...tokenomics, inflationRate: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                />
              </div>
              <button
                onClick={generateTokenomicsReport}
                disabled={isCalculating}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-all"
              >
                {isCalculating ? 'Analyzing...' : 'AI Analysis'}
              </button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Key Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: 'Market Cap', value: metrics.marketCap, icon: TrendingUp, color: 'text-green-400' },
                { label: 'FDV', value: metrics.fdv, icon: BarChart3, color: 'text-blue-400' },
                { label: 'Liquidity', value: metrics.liquidityRatio, icon: Zap, color: 'text-cyan-400' },
                { label: 'Team Share', value: metrics.teamOwnership, icon: Users, color: 'text-purple-400' },
                { label: 'Burn Rate', value: metrics.burnRate, icon: Lock, color: 'text-red-400' },
                { label: 'Staking APY', value: metrics.stakingApy, icon: Target, color: 'text-yellow-400' }
              ].map((metric, index) => (
                <div key={index} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <div className="flex items-center justify-between mb-2">
                    <metric.icon className={`w-4 h-4 ${metric.color}`} />
                  </div>
                  <div className="text-lg font-bold text-white">{metric.value}</div>
                  <div className="text-zinc-400 text-xs">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AI Analysis Tab */}
      {activeTab === 'analysis' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">AI-Powered Tokenomics Analysis</h3>
            
            <div className="text-center py-12">
              <Calculator className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 text-lg">Advanced Analysis</p>
              <p className="text-zinc-500 text-sm mt-2 max-w-md mx-auto">
                AI analysis will provide insights on token distribution, vesting schedules, economic sustainability, and comparisons with successful projects.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Scenarios Tab */}
      {activeTab === 'scenarios' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Market Scenarios</h3>
            
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 text-lg">Scenario Modeling</p>
              <p className="text-zinc-500 text-sm mt-2 max-w-md mx-auto">
                Test your tokenomics under different market conditions: bull market, bear market, high adoption, and various competition scenarios.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Development Status */}
      <div className="mt-8 bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded-lg p-4">
        <h4 className="text-yellow-300 font-medium mb-2">🚧 Development Status</h4>
        <p className="text-yellow-200 text-sm mb-2">
          AI Tokenomics Calculator is in active development. Advanced economic modeling and AI analysis integration coming soon.
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">✅ Calculator Complete</span>
          <span className="bg-yellow-900 bg-opacity-50 text-yellow-300 px-2 py-1 rounded">🚧 AI Analysis Engine</span>
          <span className="bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded">🔜 Scenario Modeling</span>
          <span className="bg-purple-900 bg-opacity-50 text-purple-300 px-2 py-1 rounded">🔜 Market Comparisons</span>
        </div>
      </div>
    </div>
  )
}
