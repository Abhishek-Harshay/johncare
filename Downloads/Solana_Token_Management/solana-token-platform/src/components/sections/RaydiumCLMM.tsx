'use client'

import { useState } from 'react'
import { BarChart3, Target, TrendingUp, Settings, Loader2, Plus, Minus, Zap } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'

interface CLMMPosition {
  poolAddress: string
  lowerTick: number
  upperTick: number
  baseAmount: number
  quoteAmount: number
}

export default function RaydiumCLMM() {
  const { publicKey } = useWallet()
  const [activeTab, setActiveTab] = useState<'positions' | 'create' | 'manage'>('positions')
  const [isLoading, setIsLoading] = useState(false)
  const [position, setPosition] = useState<CLMMPosition>({
    poolAddress: '',
    lowerTick: -50000,
    upperTick: 50000,
    baseAmount: 1000,
    quoteAmount: 10
  })

  const handleCreatePosition = async () => {
    if (!publicKey) {
      alert('Please connect your wallet first')
      return
    }

    setIsLoading(true)
    try {
      alert(`🚧 Raydium CLMM Position\n\nCreating concentrated liquidity position:\nPool: ${position.poolAddress}\nPrice Range: ${position.lowerTick} to ${position.upperTick}\nBase: ${position.baseAmount}\nQuote: ${position.quoteAmount}`)
    } catch (error) {
      console.error('CLMM position creation failed:', error)
      alert('Position creation failed')
    }
    setIsLoading(false)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Raydium CLMM - Concentrated Liquidity
        </h1>
        <p className="text-zinc-400">
          Create and manage concentrated liquidity positions for maximum capital efficiency
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-zinc-900 rounded-xl p-1">
        {[
          { id: 'positions', label: 'Your Positions', icon: BarChart3 },
          { id: 'create', label: 'Create Position', icon: Plus },
          { id: 'manage', label: 'Manage Positions', icon: Settings }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Your Positions Tab */}
      {activeTab === 'positions' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Active CLMM Positions</h3>
            <div className="text-center py-8">
              <Target className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-400">No concentrated liquidity positions found</p>
              <p className="text-zinc-500 text-sm mt-1">Create your first position to start earning concentrated fees</p>
              <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Create Position
              </button>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Popular CLMM Pools</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { 
                  pair: 'SOL/USDC', 
                  currentPrice: '$96.42',
                  fee: '0.25%',
                  tvl: '$23.8M',
                  volume24h: '$4.2M',
                  apy: '45.2%'
                },
                {
                  pair: 'USDT/USDC',
                  currentPrice: '$1.0001',
                  fee: '0.01%', 
                  tvl: '$45.1M',
                  volume24h: '$12.8M',
                  apy: '8.7%'
                },
                {
                  pair: 'RAY/SOL',
                  currentPrice: '0.0234',
                  fee: '0.25%',
                  tvl: '$8.9M', 
                  volume24h: '$1.6M',
                  apy: '28.9%'
                },
                {
                  pair: 'mSOL/SOL',
                  currentPrice: '1.067',
                  fee: '0.05%',
                  tvl: '$12.3M',
                  volume24h: '$2.1M', 
                  apy: '12.4%'
                }
              ].map((pool, index) => (
                <div key={index} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-white">{pool.pair}</h4>
                    <div className="text-xs bg-purple-900 bg-opacity-50 text-purple-300 px-2 py-1 rounded">
                      {pool.fee} Fee
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Price:</span>
                      <span className="text-white font-medium">{pool.currentPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">TVL:</span>
                      <span className="text-white font-medium">{pool.tvl}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">24h Volume:</span>
                      <span className="text-white font-medium">{pool.volume24h}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">APY:</span>
                      <span className="text-green-400 font-medium">{pool.apy}</span>
                    </div>
                  </div>
                  
                  <button className="w-full mt-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-all">
                    Create Position
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create Position Tab */}
      {activeTab === 'create' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Create CLMM Position</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">CLMM Pool Address</label>
                <input
                  type="text"
                  value={position.poolAddress}
                  onChange={(e) => setPosition({...position, poolAddress: e.target.value})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                  placeholder="Enter CLMM pool address..."
                />
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Price Range Selection
                </h4>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1">Lower Tick</label>
                    <input
                      type="number"
                      value={position.lowerTick}
                      onChange={(e) => setPosition({...position, lowerTick: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                      placeholder="-50000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1">Upper Tick</label>
                    <input
                      type="number"
                      value={position.upperTick}
                      onChange={(e) => setPosition({...position, upperTick: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                      placeholder="50000"
                    />
                  </div>
                </div>

                <div className="flex space-x-2 text-xs">
                  {[
                    { label: 'Full Range', lower: -443636, upper: 443636 },
                    { label: 'Wide (±50%)', lower: -25000, upper: 25000 },
                    { label: 'Normal (±20%)', lower: -10000, upper: 10000 },
                    { label: 'Tight (±5%)', lower: -2500, upper: 2500 }
                  ].map((range, index) => (
                    <button
                      key={index}
                      onClick={() => setPosition({...position, lowerTick: range.lower, upperTick: range.upper})}
                      className="px-3 py-1 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 rounded transition-colors"
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Base Token Amount</label>
                  <input
                    type="number"
                    value={position.baseAmount}
                    onChange={(e) => setPosition({...position, baseAmount: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                    placeholder="1000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Quote Token Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    value={position.quoteAmount}
                    onChange={(e) => setPosition({...position, quoteAmount: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                    placeholder="10.0"
                  />
                </div>
              </div>

              <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-4">
                <h4 className="text-blue-300 font-medium mb-2 flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  Concentrated Liquidity Benefits
                </h4>
                <ul className="text-blue-200 text-sm space-y-1">
                  <li>• Up to 4000x capital efficiency vs traditional AMMs</li>
                  <li>• Earn higher fees when price is in your range</li>
                  <li>• Customize your exposure to different price ranges</li>
                  <li>• Active management can significantly boost returns</li>
                </ul>
              </div>

              <button
                onClick={handleCreatePosition}
                disabled={isLoading || !position.poolAddress}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Creating Position...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>Create CLMM Position</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Positions Tab */}
      {activeTab === 'manage' && (
        <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Manage Existing Positions</h3>
          
          <div className="text-center py-12">
            <Settings className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-400 text-lg">Position Management</p>
            <p className="text-zinc-500 text-sm mt-2 max-w-md mx-auto">
              Create a position first to access management tools including collect fees, add/remove liquidity, and adjust ranges.
            </p>
          </div>
        </div>
      )}

      {/* Development Status */}
      <div className="mt-8 bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded-lg p-4">
        <h4 className="text-yellow-300 font-medium mb-2">🚧 Development Status</h4>
        <p className="text-yellow-200 text-sm mb-2">
          Raydium CLMM integration is in active development. Concentrated liquidity provides advanced DeFi functionality.
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">✅ UI Complete</span>
          <span className="bg-yellow-900 bg-opacity-50 text-yellow-300 px-2 py-1 rounded">🚧 CLMM SDK Integration</span>
          <span className="bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded">🔜 Price Range Analytics</span>
          <span className="bg-purple-900 bg-opacity-50 text-purple-300 px-2 py-1 rounded">🔜 Auto-rebalancing</span>
        </div>
      </div>
    </div>
  )
}
