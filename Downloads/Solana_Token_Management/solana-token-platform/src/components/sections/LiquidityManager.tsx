'use client'

import { useState } from 'react'
import { Droplets, Plus, TrendingUp, DollarSign, AlertCircle, CheckCircle, Loader } from 'lucide-react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'

export default function LiquidityManager() {
  const { connection } = useConnection()
  const { publicKey, connected } = useWallet()
  const [activeTab, setActiveTab] = useState<'create' | 'manage' | 'history'>('create')
  const [loading, setLoading] = useState(false)
  
  // Create Pool State
  const [createPoolData, setCreatePoolData] = useState({
    tokenA: '',
    tokenB: 'So11111111111111111111111111111111111111112', // SOL
    amountA: '',
    amountB: '',
    feeRate: '0.25' // 0.25%
  })

  // Mock liquidity pools data
  const mockPools = [
    {
      id: '1',
      tokenA: 'USDC',
      tokenB: 'SOL',
      tvl: 2500000,
      apr: 12.5,
      volume24h: 450000,
      fees24h: 1125,
      userLiquidity: 5000,
      poolShare: 0.2
    },
    {
      id: '2',
      tokenA: 'RAY',
      tokenB: 'SOL',
      tvl: 1200000,
      apr: 18.3,
      volume24h: 280000,
      fees24h: 700,
      userLiquidity: 2500,
      poolShare: 0.21
    }
  ]

  const handleCreatePool = async () => {
    if (!connected) return
    
    setLoading(true)
    try {
      // Simulate pool creation
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Creating pool with data:', createPoolData)
    } catch (error) {
      console.error('Pool creation failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddLiquidity = async (poolId: string, amount: string) => {
    if (!connected) return
    
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log(`Adding ${amount} liquidity to pool ${poolId}`)
    } catch (error) {
      console.error('Add liquidity failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Liquidity Manager</h1>
            <p className="text-zinc-400">Create and manage liquidity pools across DEXs</p>
          </div>
        </div>

        {!connected && (
          <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-medium">Wallet not connected</span>
            </div>
            <p className="text-yellow-300 text-sm mt-1">Connect your wallet to manage liquidity pools</p>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 bg-zinc-900 p-1 rounded-lg w-fit">
        {[
          { id: 'create', label: 'Create Pool', icon: Plus },
          { id: 'manage', label: 'Manage Pools', icon: TrendingUp },
          { id: 'history', label: 'Transaction History', icon: DollarSign }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Create Pool Tab */}
      {activeTab === 'create' && (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Create New Pool</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Token A</label>
                <input
                  type="text"
                  placeholder="Token mint address"
                  value={createPoolData.tokenA}
                  onChange={(e) => setCreatePoolData({...createPoolData, tokenA: e.target.value})}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Token B (SOL)</label>
                <input
                  type="text"
                  value="So11111111111111111111111111111111111111112"
                  disabled
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Amount A</label>
                  <input
                    type="number"
                    placeholder="0.0"
                    value={createPoolData.amountA}
                    onChange={(e) => setCreatePoolData({...createPoolData, amountA: e.target.value})}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Amount SOL</label>
                  <input
                    type="number"
                    placeholder="0.0"
                    value={createPoolData.amountB}
                    onChange={(e) => setCreatePoolData({...createPoolData, amountB: e.target.value})}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Fee Rate (%)</label>
                <select
                  value={createPoolData.feeRate}
                  onChange={(e) => setCreatePoolData({...createPoolData, feeRate: e.target.value})}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="0.01">0.01% (Stable pairs)</option>
                  <option value="0.05">0.05% (Correlated pairs)</option>
                  <option value="0.25">0.25% (Standard pairs)</option>
                  <option value="1.00">1.00% (Exotic pairs)</option>
                </select>
              </div>

              <button
                onClick={handleCreatePool}
                disabled={!connected || loading || !createPoolData.tokenA || !createPoolData.amountA || !createPoolData.amountB}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
                <span>{loading ? 'Creating Pool...' : 'Create Pool'}</span>
              </button>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Pool Preview</h3>
            
            <div className="space-y-4">
              <div className="bg-zinc-800 rounded-lg p-4">
                <div className="text-sm text-zinc-400 mb-1">Initial Price</div>
                <div className="text-xl font-semibold text-white">
                  {createPoolData.amountA && createPoolData.amountB 
                    ? (parseFloat(createPoolData.amountB) / parseFloat(createPoolData.amountA)).toFixed(6)
                    : '0.000000'
                  } SOL
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4">
                <div className="text-sm text-zinc-400 mb-1">Your Pool Share</div>
                <div className="text-lg font-semibold text-white">100%</div>
                <div className="text-sm text-zinc-400">You will be the first liquidity provider</div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4">
                <div className="text-sm text-zinc-400 mb-1">Platform</div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                  <span className="text-white font-medium">Raydium V4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Pools Tab */}
      {activeTab === 'manage' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
              <div className="flex items-center space-x-3 mb-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                <span className="text-sm text-zinc-400">Total Value Locked</span>
              </div>
              <div className="text-2xl font-bold text-white">$7,500</div>
              <div className="text-sm text-green-400 mt-1">+12.5% this week</div>
            </div>

            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
              <div className="flex items-center space-x-3 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-zinc-400">24h Fees Earned</span>
              </div>
              <div className="text-2xl font-bold text-white">$18.25</div>
              <div className="text-sm text-blue-400 mt-1">From 2 pools</div>
            </div>

            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
              <div className="flex items-center space-x-3 mb-2">
                <Droplets className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-zinc-400">Active Pools</span>
              </div>
              <div className="text-2xl font-bold text-white">2</div>
              <div className="text-sm text-purple-400 mt-1">Both profitable</div>
            </div>
          </div>

          <div className="space-y-4">
            {mockPools.map((pool) => (
              <div key={pool.id} className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {pool.tokenA[0]}
                      </div>
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {pool.tokenB[0]}
                      </div>
                    </div>
                    <div>
                      <div className="text-white font-semibold">{pool.tokenA}/{pool.tokenB}</div>
                      <div className="text-sm text-zinc-400">{pool.feeRate || '0.25'}% Fee Pool</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm text-zinc-400">Your Liquidity</div>
                      <div className="text-white font-medium">${pool.userLiquidity.toLocaleString()}</div>
                    </div>
                    <button
                      onClick={() => handleAddLiquidity(pool.id, '1000')}
                      disabled={loading || !connected}
                      className="bg-green-600 hover:bg-green-700 disabled:bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Add Liquidity
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Remove
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <div className="text-sm text-zinc-400">TVL</div>
                    <div className="text-white font-medium">${pool.tvl.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-400">APR</div>
                    <div className="text-green-400 font-medium">{pool.apr}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-400">24h Volume</div>
                    <div className="text-white font-medium">${pool.volume24h.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-400">24h Fees</div>
                    <div className="text-blue-400 font-medium">${pool.fees24h}</div>
                  </div>
                  <div>
                    <div className="text-sm text-zinc-400">Pool Share</div>
                    <div className="text-white font-medium">{pool.poolShare}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transaction History Tab */}
      {activeTab === 'history' && (
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
          
          <div className="space-y-4">
            {[
              { type: 'Add Liquidity', pool: 'USDC/SOL', amount: '$2,500', fee: '$0.50', time: '2 hours ago', status: 'success' },
              { type: 'Remove Liquidity', pool: 'RAY/SOL', amount: '$1,200', fee: '$0.30', time: '1 day ago', status: 'success' },
              { type: 'Create Pool', pool: 'CUSTOM/SOL', amount: '$5,000', fee: '$2.50', time: '3 days ago', status: 'success' }
            ].map((tx, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    tx.status === 'success' ? 'bg-green-600' : 'bg-red-600'
                  }`}>
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{tx.type}</div>
                    <div className="text-sm text-zinc-400">{tx.pool} • {tx.time}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">{tx.amount}</div>
                  <div className="text-sm text-zinc-400">Fee: {tx.fee}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
