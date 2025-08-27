'use client'

import { useState } from 'react'
import { Waves, ArrowUpDown, Target, BarChart3, Loader2, Settings, Droplets, TrendingUp } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'

interface OrcaPool {
  poolType: 'whirlpool' | 'stable' | 'concentrated'
  token0: string
  token1: string
  liquidity: number
  fee: number
}

export default function Orca() {
  const { publicKey } = useWallet()
  const [activeTab, setActiveTab] = useState<'pools' | 'swap' | 'liquidity' | 'whirlpools'>('pools')
  const [isLoading, setIsLoading] = useState(false)
  const [newPosition, setNewPosition] = useState<OrcaPool>({
    poolType: 'whirlpool',
    token0: 'So11111111111111111111111111111111111111112',
    token1: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    liquidity: 1000,
    fee: 0.3
  })

  const handleCreatePosition = async () => {
    if (!publicKey) {
      alert('Please connect your wallet first')
      return
    }

    setIsLoading(true)
    try {
      alert(`🚧 Orca ${newPosition.poolType}\n\nCreating liquidity position:\nPool Type: ${newPosition.poolType}\nTokens: ${newPosition.token0.slice(-8)} / ${newPosition.token1.slice(-8)}\nLiquidity: ${newPosition.liquidity}\nFee: ${newPosition.fee}%`)
    } catch (error) {
      console.error('Orca position creation failed:', error)
      alert('Position creation failed')
    }
    setIsLoading(false)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent mb-2">
          Orca DEX - Whirlpools & Concentrated Liquidity
        </h1>
        <p className="text-zinc-400">
          Trade and provide liquidity on Solana's most user-friendly DEX with Whirlpools technology
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-zinc-900 rounded-xl p-1">
        {[
          { id: 'pools', label: 'Active Pools', icon: Waves },
          { id: 'swap', label: 'Swap', icon: ArrowUpDown },
          { id: 'liquidity', label: 'Add Liquidity', icon: Droplets },
          { id: 'whirlpools', label: 'Whirlpools', icon: Target }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg'
                : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Active Pools Tab */}
      {activeTab === 'pools' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Orca Pool Overview</h3>
            
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total TVL', value: '$284.6M', change: '+12.8%', icon: BarChart3 },
                { label: 'Active Pools', value: '156', change: '+8.3%', icon: Waves },
                { label: '24h Volume', value: '$45.2M', change: '+15.7%', icon: TrendingUp },
                { label: 'Total LPs', value: '28.4K', change: '+6.9%', icon: Target }
              ].map((stat, index) => (
                <div key={index} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="w-5 h-5 text-blue-400" />
                    <span className="text-green-400 text-xs font-medium">{stat.change}</span>
                  </div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-zinc-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-zinc-400 border-b border-zinc-700">
                    <th className="text-left py-3 px-4">Pool</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-left py-3 px-4">TVL</th>
                    <th className="text-left py-3 px-4">Volume (24h)</th>
                    <th className="text-left py-3 px-4">Fee</th>
                    <th className="text-left py-3 px-4">APY</th>
                    <th className="text-left py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { 
                      pair: 'SOL/USDC', 
                      type: 'Whirlpool',
                      tvl: '$45.2M', 
                      volume: '$8.9M', 
                      fee: '0.30%',
                      apy: '28.4%'
                    },
                    {
                      pair: 'USDC/USDT',
                      type: 'Stable',
                      tvl: '$78.1M',
                      volume: '$15.6M',
                      fee: '0.01%',
                      apy: '5.2%'
                    },
                    {
                      pair: 'ORCA/SOL',
                      type: 'Whirlpool',
                      tvl: '$12.8M',
                      volume: '$2.3M',
                      fee: '0.30%',
                      apy: '45.7%'
                    },
                    {
                      pair: 'mSOL/SOL',
                      type: 'Concentrated',
                      tvl: '$23.5M',
                      volume: '$4.1M',
                      fee: '0.05%',
                      apy: '18.9%'
                    }
                  ].map((pool, index) => (
                    <tr key={index} className="border-b border-zinc-800 hover:bg-zinc-800">
                      <td className="py-3 px-4 text-white font-medium">{pool.pair}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded ${
                          pool.type === 'Whirlpool' ? 'bg-blue-900 bg-opacity-50 text-blue-300' :
                          pool.type === 'Stable' ? 'bg-green-900 bg-opacity-50 text-green-300' :
                          'bg-purple-900 bg-opacity-50 text-purple-300'
                        }`}>
                          {pool.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-zinc-300">{pool.tvl}</td>
                      <td className="py-3 px-4 text-zinc-300">{pool.volume}</td>
                      <td className="py-3 px-4 text-blue-400">{pool.fee}</td>
                      <td className="py-3 px-4 text-green-400 font-medium">{pool.apy}</td>
                      <td className="py-3 px-4">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors">
                          Add Liquidity
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Swap Tab */}
      {activeTab === 'swap' && (
        <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Orca Token Swap</h3>
          
          <div className="max-w-md mx-auto">
            <div className="text-center py-8">
              <ArrowUpDown className="w-12 h-12 text-blue-400 mx-auto mb-3" />
              <p className="text-zinc-400">Swap interface coming soon</p>
              <p className="text-zinc-500 text-sm mt-1">Integrated Orca swap with best routing</p>
            </div>
          </div>
        </div>
      )}

      {/* Add Liquidity Tab */}
      {activeTab === 'liquidity' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Add Liquidity to Orca Pools</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Pool Type</label>
                <select
                  value={newPosition.poolType}
                  onChange={(e) => setNewPosition({...newPosition, poolType: e.target.value as any})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="whirlpool">Whirlpool (Concentrated Liquidity)</option>
                  <option value="stable">Stable Pool (Low Fee)</option>
                  <option value="concentrated">Concentrated (Custom Range)</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Token A</label>
                  <input
                    type="text"
                    value={newPosition.token0}
                    onChange={(e) => setNewPosition({...newPosition, token0: e.target.value})}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500"
                    placeholder="Token A mint address..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Token B</label>
                  <input
                    type="text"
                    value={newPosition.token1}
                    onChange={(e) => setNewPosition({...newPosition, token1: e.target.value})}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500"
                    placeholder="Token B mint address..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Liquidity Amount</label>
                <input
                  type="number"
                  value={newPosition.liquidity}
                  onChange={(e) => setNewPosition({...newPosition, liquidity: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500"
                  placeholder="1000"
                />
              </div>

              <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-4">
                <h4 className="text-blue-300 font-medium mb-2 flex items-center">
                  <Waves className="w-4 h-4 mr-2" />
                  Orca Advantages
                </h4>
                <ul className="text-blue-200 text-sm space-y-1">
                  <li>• Whirlpools: Advanced concentrated liquidity</li>
                  <li>• Best-in-class user experience and UI</li>
                  <li>• Stable pools for low-risk yield farming</li>
                  <li>• Integrated with Climate Vault for carbon credits</li>
                  <li>• Fair price oracle and MEV protection</li>
                </ul>
              </div>

              <button
                onClick={handleCreatePosition}
                disabled={isLoading || !newPosition.token0 || !newPosition.token1}
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 disabled:opacity-50 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Creating Position...</span>
                  </>
                ) : (
                  <>
                    <Droplets className="w-5 h-5" />
                    <span>Add Liquidity to Orca</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Whirlpools Tab */}
      {activeTab === 'whirlpools' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-400" />
              Whirlpools - Concentrated Liquidity
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  pair: 'SOL/USDC',
                  fee: '0.30%',
                  tvl: '$45.2M',
                  volume: '$8.9M',
                  apy: '42.8%',
                  priceRange: '$85.00 - $110.00',
                  status: 'In Range'
                },
                {
                  pair: 'ORCA/SOL', 
                  fee: '0.30%',
                  tvl: '$12.8M',
                  volume: '$2.3M',
                  apy: '65.4%',
                  priceRange: '0.003 - 0.008',
                  status: 'In Range'
                },
                {
                  pair: 'USDC/USDT',
                  fee: '0.01%',
                  tvl: '$78.1M', 
                  volume: '$15.6M',
                  apy: '8.7%',
                  priceRange: '$0.998 - $1.002',
                  status: 'In Range'
                },
                {
                  pair: 'RAY/SOL',
                  fee: '0.30%',
                  tvl: '$8.9M',
                  volume: '$1.6M', 
                  apy: '38.2%',
                  priceRange: '0.02 - 0.035',
                  status: 'Out of Range'
                },
                {
                  pair: 'mSOL/SOL',
                  fee: '0.05%',
                  tvl: '$23.5M',
                  volume: '$4.1M',
                  apy: '22.1%',
                  priceRange: '1.05 - 1.08',
                  status: 'In Range'
                },
                {
                  pair: 'SAMO/SOL',
                  fee: '1.00%',
                  tvl: '$2.4M',
                  volume: '$890K',
                  apy: '89.5%',
                  priceRange: '0.0008 - 0.0025',
                  status: 'In Range'
                }
              ].map((pool, index) => (
                <div key={index} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-white">{pool.pair}</h4>
                      <p className="text-zinc-400 text-sm">{pool.fee} fee</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      pool.status === 'In Range' 
                        ? 'bg-green-900 bg-opacity-50 text-green-300'
                        : 'bg-red-900 bg-opacity-50 text-red-300'
                    }`}>
                      {pool.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm mb-3">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">TVL:</span>
                      <span className="text-white font-medium">{pool.tvl}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">24h Volume:</span>
                      <span className="text-white font-medium">{pool.volume}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">APY:</span>
                      <span className="text-green-400 font-medium">{pool.apy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Range:</span>
                      <span className="text-cyan-400 text-xs">{pool.priceRange}</span>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white py-2 rounded-lg text-sm font-medium transition-all">
                    Create Position
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Swap Tab */}
      {activeTab === 'swap' && (
        <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Orca Token Swap</h3>
          
          <div className="text-center py-12">
            <ArrowUpDown className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-400 text-lg">Swap Interface</p>
            <p className="text-zinc-500 text-sm mt-2 max-w-md mx-auto">
              Integrated Orca swap with Whirlpools routing for optimal pricing and minimal slippage.
            </p>
          </div>
        </div>
      )}

      {/* Add Liquidity Tab */}
      {activeTab === 'liquidity' && (
        <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Add Liquidity</h3>
          
          <div className="text-center py-12">
            <Droplets className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-400 text-lg">Liquidity Management</p>
            <p className="text-zinc-500 text-sm mt-2 max-w-md mx-auto">
              Add or remove liquidity from Orca pools with automatic position optimization.
            </p>
          </div>
        </div>
      )}

      {/* Development Status */}
      <div className="mt-8 bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded-lg p-4">
        <h4 className="text-yellow-300 font-medium mb-2">🚧 Development Status</h4>
        <p className="text-yellow-200 text-sm mb-2">
          Orca DEX integration is in active development. Whirlpools concentrated liquidity platform.
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">✅ UI Complete</span>
          <span className="bg-yellow-900 bg-opacity-50 text-yellow-300 px-2 py-1 rounded">🚧 Orca SDK Integration</span>
          <span className="bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded">🔜 Whirlpools SDK</span>
          <span className="bg-purple-900 bg-opacity-50 text-purple-300 px-2 py-1 rounded">🔜 Position Management</span>
        </div>
      </div>
    </div>
  )
}
