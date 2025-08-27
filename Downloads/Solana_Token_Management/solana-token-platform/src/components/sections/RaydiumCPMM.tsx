'use client'

import { useState } from 'react'
import { DollarSign, Droplets, TrendingUp, Activity, Loader2, Shuffle, ArrowUpDown } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'

interface CPMMPool {
  poolAddress: string
  token0: string
  token1: string
  token0Amount: number
  token1Amount: number
  feeRate: number
}

export default function RaydiumCPMM() {
  const { publicKey } = useWallet()
  const [activeTab, setActiveTab] = useState<'pools' | 'create' | 'swap'>('pools')
  const [isLoading, setIsLoading] = useState(false)
  const [newPool, setNewPool] = useState<CPMMPool>({
    poolAddress: '',
    token0: 'So11111111111111111111111111111111111111112',
    token1: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    token0Amount: 100,
    token1Amount: 9600,
    feeRate: 0.25
  })

  const handleCreatePool = async () => {
    if (!publicKey) {
      alert('Please connect your wallet first')
      return
    }

    setIsLoading(true)
    try {
      alert(`🚧 Raydium CPMM Pool\n\nCreating constant product pool:\nToken 0: ${newPool.token0}\nToken 1: ${newPool.token1}\nLiquidity: ${newPool.token0Amount} / ${newPool.token1Amount}\nFee: ${newPool.feeRate}%`)
    } catch (error) {
      console.error('CPMM pool creation failed:', error)
      alert('Pool creation failed')
    }
    setIsLoading(false)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Raydium CPMM - Constant Product Pools
        </h1>
        <p className="text-zinc-400">
          Create and manage traditional AMM pools with constant product formula (x * y = k)
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-zinc-900 rounded-xl p-1">
        {[
          { id: 'pools', label: 'Active Pools', icon: Droplets },
          { id: 'create', label: 'Create Pool', icon: DollarSign },
          { id: 'swap', label: 'Swap Tokens', icon: ArrowUpDown }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-green-600 text-white shadow-lg'
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
            <h3 className="text-lg font-semibold text-white mb-4">CPMM Pool Statistics</h3>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Pools', value: '342', change: '+12.3%', icon: Droplets },
                { label: 'Total TVL', value: '$156.8M', change: '+8.7%', icon: DollarSign },
                { label: '24h Volume', value: '$42.1M', change: '+15.2%', icon: TrendingUp },
                { label: 'Active LPs', value: '8,924', change: '+5.8%', icon: Activity }
              ].map((stat, index) => (
                <div key={index} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="w-5 h-5 text-green-400" />
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
                    <th className="text-left py-3 px-4">TVL</th>
                    <th className="text-left py-3 px-4">Volume (24h)</th>
                    <th className="text-left py-3 px-4">Fee Tier</th>
                    <th className="text-left py-3 px-4">APY</th>
                    <th className="text-left py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { 
                      pair: 'SOL/USDC', 
                      tvl: '$23.8M', 
                      volume: '$4.2M', 
                      fee: '0.25%',
                      apy: '24.8%'
                    },
                    {
                      pair: 'RAY/USDC',
                      tvl: '$8.9M',
                      volume: '$1.6M', 
                      fee: '0.25%',
                      apy: '32.1%'
                    },
                    {
                      pair: 'SAMO/SOL',
                      tvl: '$2.1M',
                      volume: '$450K',
                      fee: '1.00%',
                      apy: '67.5%'
                    }
                  ].map((pool, index) => (
                    <tr key={index} className="border-b border-zinc-800 hover:bg-zinc-800">
                      <td className="py-3 px-4 text-white font-medium">{pool.pair}</td>
                      <td className="py-3 px-4 text-zinc-300">{pool.tvl}</td>
                      <td className="py-3 px-4 text-zinc-300">{pool.volume}</td>
                      <td className="py-3 px-4 text-green-400">{pool.fee}</td>
                      <td className="py-3 px-4 text-green-400 font-medium">{pool.apy}</td>
                      <td className="py-3 px-4">
                        <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs transition-colors">
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

      {/* Create Pool Tab */}
      {activeTab === 'create' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Create New CPMM Pool</h3>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Token 0 Address</label>
                  <input
                    type="text"
                    value={newPool.token0}
                    onChange={(e) => setNewPool({...newPool, token0: e.target.value})}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-green-500"
                    placeholder="Token 0 mint address..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Token 1 Address</label>
                  <input
                    type="text"
                    value={newPool.token1}
                    onChange={(e) => setNewPool({...newPool, token1: e.target.value})}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-green-500"
                    placeholder="Token 1 mint address..."
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Token 0 Amount</label>
                  <input
                    type="number"
                    value={newPool.token0Amount}
                    onChange={(e) => setNewPool({...newPool, token0Amount: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-green-500"
                    placeholder="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Token 1 Amount</label>
                  <input
                    type="number"
                    value={newPool.token1Amount}
                    onChange={(e) => setNewPool({...newPool, token1Amount: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-green-500"
                    placeholder="9600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Fee Rate (%)</label>
                <select
                  value={newPool.feeRate}
                  onChange={(e) => setNewPool({...newPool, feeRate: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                >
                  <option value={0.01}>0.01% - Stable pairs</option>
                  <option value={0.05}>0.05% - Correlated assets</option>
                  <option value={0.25}>0.25% - Standard pairs</option>
                  <option value={1.00}>1.00% - Exotic pairs</option>
                </select>
              </div>

              <div className="bg-green-900 bg-opacity-30 border border-green-700 rounded-lg p-4">
                <h4 className="text-green-300 font-medium mb-2">Pool Creation Requirements</h4>
                <ul className="text-green-200 text-sm space-y-1">
                  <li>• Both tokens must have valid mint addresses</li>
                  <li>• Initial liquidity determines the starting price ratio</li>
                  <li>• Pool creator receives LP tokens representing ownership</li>
                  <li>• Fee tier affects trading activity and LP rewards</li>
                </ul>
              </div>

              <button
                onClick={handleCreatePool}
                disabled={isLoading || !newPool.token0 || !newPool.token1}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:opacity-50 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Creating Pool...</span>
                  </>
                ) : (
                  <>
                    <Droplets className="w-5 h-5" />
                    <span>Create CPMM Pool</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Swap Tab */}
      {activeTab === 'swap' && (
        <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Token Swap</h3>
          
          <div className="max-w-md mx-auto space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">From Token</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-green-500"
                placeholder="Token address or symbol..."
              />
            </div>

            <div className="flex justify-center">
              <button className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-full border border-zinc-700 transition-colors">
                <Shuffle className="w-4 h-4 text-zinc-400" />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">To Token</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-green-500"
                placeholder="Token address or symbol..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Amount</label>
              <input
                type="number"
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-green-500"
                placeholder="0.0"
              />
            </div>

            <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all">
              <ArrowUpDown className="w-5 h-5" />
              <span>Swap Tokens</span>
            </button>
          </div>
        </div>
      )}

      {/* Development Status */}
      <div className="mt-8 bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded-lg p-4">
        <h4 className="text-yellow-300 font-medium mb-2">🚧 Development Status</h4>
        <p className="text-yellow-200 text-sm mb-2">
          Raydium CPMM integration is in active development. Traditional AMM pools with constant product formula.
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">✅ UI Complete</span>
          <span className="bg-yellow-900 bg-opacity-50 text-yellow-300 px-2 py-1 rounded">🚧 CPMM SDK Integration</span>
          <span className="bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded">🔜 Liquidity Analytics</span>
          <span className="bg-purple-900 bg-opacity-50 text-purple-300 px-2 py-1 rounded">🔜 Pool Management</span>
        </div>
      </div>
    </div>
  )
}
