'use client'

import { useState } from 'react'
import { Droplets, ExternalLink, TrendingUp, Settings, Loader2, Plus, Minus } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'

interface PoolCreationForm {
  baseToken: string
  quoteToken: string
  baseAmount: number
  quoteAmount: number
  openTime: string
}

interface LiquidityForm {
  poolAddress: string
  baseAmount: number
  quoteAmount: number
  operation: 'add' | 'remove'
}

export default function RaydiumAMM() {
  const { publicKey } = useWallet()
  const [activeTab, setActiveTab] = useState<'pools' | 'create' | 'manage'>('pools')
  const [isLoading, setIsLoading] = useState(false)
  const [poolForm, setPoolForm] = useState<PoolCreationForm>({
    baseToken: '',
    quoteToken: 'So11111111111111111111111111111111111111112', // WSOL
    baseAmount: 1000000,
    quoteAmount: 10,
    openTime: ''
  })
  const [liquidityForm, setLiquidityForm] = useState<LiquidityForm>({
    poolAddress: '',
    baseAmount: 0,
    quoteAmount: 0,
    operation: 'add'
  })

  const handleCreatePool = async () => {
    if (!publicKey) {
      alert('Please connect your wallet first')
      return
    }

    setIsLoading(true)
    try {
      // TODO: Integrate with Raydium SDK for pool creation
      alert(`🚧 Raydium AMM Pool Creation\n\nCreating pool for:\n${poolForm.baseToken}\n↔️\n${poolForm.quoteToken}\n\nBase: ${poolForm.baseAmount}\nQuote: ${poolForm.quoteAmount}`)
    } catch (error) {
      console.error('Pool creation failed:', error)
      alert('Pool creation failed')
    }
    setIsLoading(false)
  }

  const handleManageLiquidity = async () => {
    if (!publicKey) {
      alert('Please connect your wallet first')
      return
    }

    setIsLoading(true)
    try {
      alert(`🚧 Raydium AMM Liquidity ${liquidityForm.operation}\n\nPool: ${liquidityForm.poolAddress}\nBase Amount: ${liquidityForm.baseAmount}\nQuote Amount: ${liquidityForm.quoteAmount}`)
    } catch (error) {
      console.error('Liquidity operation failed:', error)
      alert('Liquidity operation failed')
    }
    setIsLoading(false)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Raydium AMM - Automated Market Maker
        </h1>
        <p className="text-zinc-400">
          Create liquidity pools and manage positions on Raydium's AMM protocol
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-zinc-900 rounded-xl p-1">
        {[
          { id: 'pools', label: 'Active Pools', icon: Droplets },
          { id: 'create', label: 'Create Pool', icon: Plus },
          { id: 'manage', label: 'Manage Liquidity', icon: Settings }
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

      {/* Active Pools Tab */}
      {activeTab === 'pools' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Popular AMM Pools</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { pair: 'SOL/USDC', tvl: '$45.2M', apr: '12.5%', volume24h: '$8.7M' },
                { pair: 'RAY/SOL', tvl: '$12.8M', apr: '18.3%', volume24h: '$2.1M' },
                { pair: 'USDT/USDC', tvl: '$78.1M', apr: '5.2%', volume24h: '$15.3M' },
                { pair: 'mSOL/SOL', tvl: '$23.4M', apr: '8.9%', volume24h: '$3.2M' },
                { pair: 'SRM/SOL', tvl: '$5.6M', apr: '22.1%', volume24h: '$890K' },
                { pair: 'ORCA/SOL', tvl: '$8.9M', apr: '15.7%', volume24h: '$1.4M' }
              ].map((pool, index) => (
                <div key={index} className="bg-zinc-800 rounded-lg p-4 hover:bg-zinc-750 transition-colors cursor-pointer border border-zinc-700">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">{pool.pair}</h4>
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">TVL:</span>
                      <span className="text-white font-medium">{pool.tvl}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">APR:</span>
                      <span className="text-green-400 font-medium">{pool.apr}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">24h Volume:</span>
                      <span className="text-white font-medium">{pool.volume24h}</span>
                    </div>
                  </div>
                  <button className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                    Add Liquidity
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Your Positions</h3>
            <div className="text-center py-8">
              <Droplets className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-400">No liquidity positions found</p>
              <p className="text-zinc-500 text-sm mt-1">Connect your wallet to view your positions</p>
            </div>
          </div>
        </div>
      )}

      {/* Create Pool Tab */}
      {activeTab === 'create' && (
        <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Create New AMM Pool</h3>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Base Token Address</label>
                <input
                  type="text"
                  value={poolForm.baseToken}
                  onChange={(e) => setPoolForm({...poolForm, baseToken: e.target.value})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                  placeholder="Enter token mint address..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Quote Token (SOL)</label>
                <input
                  type="text"
                  value={poolForm.quoteToken}
                  onChange={(e) => setPoolForm({...poolForm, quoteToken: e.target.value})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                  placeholder="Quote token address (WSOL default)"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Base Token Amount</label>
                <input
                  type="number"
                  value={poolForm.baseAmount}
                  onChange={(e) => setPoolForm({...poolForm, baseAmount: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                  placeholder="1000000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Quote Token Amount (SOL)</label>
                <input
                  type="number"
                  step="0.01"
                  value={poolForm.quoteAmount}
                  onChange={(e) => setPoolForm({...poolForm, quoteAmount: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                  placeholder="10.0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Pool Open Time (Optional)</label>
              <input
                type="datetime-local"
                value={poolForm.openTime}
                onChange={(e) => setPoolForm({...poolForm, openTime: e.target.value})}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
              />
              <p className="text-xs text-zinc-500 mt-1">Leave empty for immediate opening</p>
            </div>

            <div className="bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded-lg p-4">
              <h4 className="text-yellow-300 font-medium mb-2">⚠️ Important Notes</h4>
              <ul className="text-yellow-200 text-sm space-y-1">
                <li>• Pool creation requires both tokens in your wallet</li>
                <li>• Initial liquidity ratio determines the starting price</li>
                <li>• Pool creation fee: ~0.4 SOL</li>
                <li>• You'll receive LP tokens representing your position</li>
              </ul>
            </div>

            <button
              onClick={handleCreatePool}
              disabled={isLoading || !poolForm.baseToken || !poolForm.quoteToken}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating Pool...</span>
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  <span>Create AMM Pool</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Manage Liquidity Tab */}
      {activeTab === 'manage' && (
        <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Manage Liquidity Position</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Pool Address</label>
              <input
                type="text"
                value={liquidityForm.poolAddress}
                onChange={(e) => setLiquidityForm({...liquidityForm, poolAddress: e.target.value})}
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                placeholder="Enter AMM pool address..."
              />
            </div>

            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => setLiquidityForm({...liquidityForm, operation: 'add'})}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  liquidityForm.operation === 'add'
                    ? 'bg-green-600 text-white'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>Add Liquidity</span>
              </button>
              <button
                onClick={() => setLiquidityForm({...liquidityForm, operation: 'remove'})}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  liquidityForm.operation === 'remove'
                    ? 'bg-red-600 text-white'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                <Minus className="w-4 h-4" />
                <span>Remove Liquidity</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Base Token Amount</label>
                <input
                  type="number"
                  value={liquidityForm.baseAmount}
                  onChange={(e) => setLiquidityForm({...liquidityForm, baseAmount: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                  placeholder="0.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Quote Token Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={liquidityForm.quoteAmount}
                  onChange={(e) => setLiquidityForm({...liquidityForm, quoteAmount: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                  placeholder="0.0"
                />
              </div>
            </div>

            <button
              onClick={handleManageLiquidity}
              disabled={isLoading || !liquidityForm.poolAddress}
              className={`w-full ${
                liquidityForm.operation === 'add'
                  ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
                  : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
              } disabled:opacity-50 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  {liquidityForm.operation === 'add' ? <Plus className="w-5 h-5" /> : <Minus className="w-5 h-5" />}
                  <span>{liquidityForm.operation === 'add' ? 'Add' : 'Remove'} Liquidity</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Development Status */}
      <div className="mt-8 bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded-lg p-4">
        <h4 className="text-yellow-300 font-medium mb-2">🚧 Development Status</h4>
        <p className="text-yellow-200 text-sm mb-2">
          Raydium AMM integration is in development. This interface shows the planned functionality.
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">✅ UI Complete</span>
          <span className="bg-yellow-900 bg-opacity-50 text-yellow-300 px-2 py-1 rounded">🚧 SDK Integration</span>
          <span className="bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded">🔜 Pool Analytics</span>
        </div>
      </div>
    </div>
  )
}
