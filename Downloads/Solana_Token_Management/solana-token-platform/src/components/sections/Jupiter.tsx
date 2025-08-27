'use client'

import { useState } from 'react'
import { Zap, ArrowUpDown, BarChart3, Route, Loader2, TrendingUp, Target, Settings } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'

interface JupiterSwap {
  fromToken: string
  toToken: string
  fromAmount: number
  toAmount: number
  slippage: number
  routeOptimization: boolean
}

export default function Jupiter() {
  const { publicKey } = useWallet()
  const [activeTab, setActiveTab] = useState<'swap' | 'routes' | 'analytics' | 'limit-orders'>('swap')
  const [isLoading, setIsLoading] = useState(false)
  const [swapData, setSwapData] = useState<JupiterSwap>({
    fromToken: 'So11111111111111111111111111111111111111112',
    toToken: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    fromAmount: 1,
    toAmount: 96.42,
    slippage: 0.5,
    routeOptimization: true
  })

  const handleSwap = async () => {
    if (!publicKey) {
      alert('Please connect your wallet first')
      return
    }

    setIsLoading(true)
    try {
      alert(`🚧 Jupiter Swap\n\nExecuting optimized swap:\nFrom: ${swapData.fromAmount} ${swapData.fromToken.slice(-8)}\nTo: ${swapData.toAmount} ${swapData.toToken.slice(-8)}\nSlippage: ${swapData.slippage}%\nRoute Optimization: ${swapData.routeOptimization ? 'Enabled' : 'Disabled'}`)
    } catch (error) {
      console.error('Jupiter swap failed:', error)
      alert('Swap failed')
    }
    setIsLoading(false)
  }

  const swapTokens = () => {
    setSwapData({
      ...swapData,
      fromToken: swapData.toToken,
      toToken: swapData.fromToken,
      fromAmount: swapData.toAmount,
      toAmount: swapData.fromAmount
    })
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent mb-2">
          Jupiter - Universal Token Swap Aggregator
        </h1>
        <p className="text-zinc-400">
          The best prices across all Solana DEXs with smart routing and limit orders
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-zinc-900 rounded-xl p-1">
        {[
          { id: 'swap', label: 'Instant Swap', icon: Zap },
          { id: 'routes', label: 'Route Analysis', icon: Route },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'limit-orders', label: 'Limit Orders', icon: Target }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-orange-600 to-yellow-600 text-white shadow-lg'
                : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Instant Swap Tab */}
      {activeTab === 'swap' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Jupiter Swap Interface</h3>
            
            <div className="max-w-md mx-auto space-y-4">
              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                <label className="block text-sm font-medium text-zinc-300 mb-2">From</label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="number"
                    value={swapData.fromAmount}
                    onChange={(e) => setSwapData({...swapData, fromAmount: parseFloat(e.target.value)})}
                    className="flex-1 px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-orange-500"
                    placeholder="0.0"
                  />
                  <select className="px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:outline-none focus:border-orange-500">
                    <option value="SOL">SOL</option>
                    <option value="USDC">USDC</option>
                    <option value="USDT">USDT</option>
                    <option value="RAY">RAY</option>
                    <option value="ORCA">ORCA</option>
                  </select>
                </div>
                <input
                  type="text"
                  value={swapData.fromToken}
                  onChange={(e) => setSwapData({...swapData, fromToken: e.target.value})}
                  className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-orange-500 text-xs"
                  placeholder="Token mint address..."
                />
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={swapTokens}
                  className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded-full border border-zinc-700 transition-colors"
                >
                  <ArrowUpDown className="w-5 h-5 text-orange-400" />
                </button>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                <label className="block text-sm font-medium text-zinc-300 mb-2">To</label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="number"
                    value={swapData.toAmount}
                    onChange={(e) => setSwapData({...swapData, toAmount: parseFloat(e.target.value)})}
                    className="flex-1 px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-orange-500"
                    placeholder="0.0"
                  />
                  <select className="px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:outline-none focus:border-orange-500">
                    <option value="USDC">USDC</option>
                    <option value="SOL">SOL</option>
                    <option value="USDT">USDT</option>
                    <option value="RAY">RAY</option>
                    <option value="ORCA">ORCA</option>
                  </select>
                </div>
                <input
                  type="text"
                  value={swapData.toToken}
                  onChange={(e) => setSwapData({...swapData, toToken: e.target.value})}
                  className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-orange-500 text-xs"
                  placeholder="Token mint address..."
                />
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-zinc-300 text-sm">Slippage Tolerance</span>
                  <span className="text-orange-400 text-sm font-medium">{swapData.slippage}%</span>
                </div>
                <div className="flex space-x-2 mb-3">
                  {[0.1, 0.5, 1.0, 3.0].map((slippage) => (
                    <button
                      key={slippage}
                      onClick={() => setSwapData({...swapData, slippage})}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        swapData.slippage === slippage
                          ? 'bg-orange-600 text-white'
                          : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                      }`}
                    >
                      {slippage}%
                    </button>
                  ))}
                </div>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={swapData.routeOptimization}
                    onChange={(e) => setSwapData({...swapData, routeOptimization: e.target.checked})}
                    className="accent-orange-500"
                  />
                  <span className="text-zinc-300 text-sm">Enable smart routing</span>
                </label>
              </div>

              <div className="bg-orange-900 bg-opacity-30 border border-orange-700 rounded-lg p-4">
                <h4 className="text-orange-300 font-medium mb-2 flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  Jupiter Features
                </h4>
                <ul className="text-orange-200 text-sm space-y-1">
                  <li>• Best prices across 20+ DEXs</li>
                  <li>• Smart routing with split trades</li>
                  <li>• Limit orders with advanced conditions</li>
                  <li>• MEV protection and private routing</li>
                  <li>• DCA (Dollar Cost Averaging) strategies</li>
                </ul>
              </div>

              <button
                onClick={handleSwap}
                disabled={isLoading || !swapData.fromToken || !swapData.toToken}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 disabled:opacity-50 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Executing Swap...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>Swap with Jupiter</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Route Preview</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                <h4 className="text-white font-medium mb-2">Best Route</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">DEXs Used:</span>
                    <span className="text-white">Orca + Raydium</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Hops:</span>
                    <span className="text-white">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Price Impact:</span>
                    <span className="text-green-400">0.08%</span>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                <h4 className="text-white font-medium mb-2">Fee Breakdown</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Network Fee:</span>
                    <span className="text-white">0.00025 SOL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">DEX Fees:</span>
                    <span className="text-white">0.15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Jupiter Fee:</span>
                    <span className="text-green-400">0.00%</span>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                <h4 className="text-white font-medium mb-2">Execution</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Est. Time:</span>
                    <span className="text-white">~15 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Success Rate:</span>
                    <span className="text-green-400">99.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">MEV Protection:</span>
                    <span className="text-green-400">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Route Analysis Tab */}
      {activeTab === 'routes' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Smart Route Analysis</h3>
            
            <div className="space-y-4">
              {[
                {
                  route: 'SOL → USDC (Direct)',
                  dexs: ['Orca Whirlpool'],
                  output: '96.45 USDC',
                  priceImpact: '0.05%',
                  confidence: 'High',
                  rank: 1
                },
                {
                  route: 'SOL → RAY → USDC',
                  dexs: ['Raydium', 'Orca'],
                  output: '96.32 USDC',
                  priceImpact: '0.12%',
                  confidence: 'Medium',
                  rank: 2
                },
                {
                  route: 'SOL → USDT → USDC',
                  dexs: ['Serum', 'Aldrin'],
                  output: '95.98 USDC',
                  priceImpact: '0.28%',
                  confidence: 'Low',
                  rank: 3
                }
              ].map((route, index) => (
                <div key={index} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-white font-medium">{route.route}</h4>
                      <p className="text-zinc-400 text-sm">
                        Via: {route.dexs.join(' → ')}
                      </p>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded ${
                      route.rank === 1 ? 'bg-green-900 bg-opacity-50 text-green-300' :
                      route.rank === 2 ? 'bg-yellow-900 bg-opacity-50 text-yellow-300' :
                      'bg-red-900 bg-opacity-50 text-red-300'
                    }`}>
                      #{route.rank}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-zinc-400 block">Output</span>
                      <span className="text-white font-medium">{route.output}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block">Price Impact</span>
                      <span className="text-orange-400 font-medium">{route.priceImpact}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block">Confidence</span>
                      <span className={`font-medium ${
                        route.confidence === 'High' ? 'text-green-400' :
                        route.confidence === 'Medium' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {route.confidence}
                      </span>
                    </div>
                  </div>
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
            <h3 className="text-lg font-semibold text-white mb-4">Jupiter Analytics</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Volume', value: '$2.8B', change: '+45.2%', icon: BarChart3 },
                { label: 'Daily Swaps', value: '156K', change: '+23.8%', icon: ArrowUpDown },
                { label: 'Unique Users', value: '45.2K', change: '+18.7%', icon: Target },
                { label: 'DEXs Integrated', value: '23', change: '+15.0%', icon: Route }
              ].map((stat, index) => (
                <div key={index} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="w-5 h-5 text-orange-400" />
                    <span className="text-green-400 text-xs font-medium">{stat.change}</span>
                  </div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-zinc-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                <h4 className="text-white font-medium mb-3">Top Trading Pairs</h4>
                <div className="space-y-2">
                  {[
                    { pair: 'SOL/USDC', volume: '$845M', share: '35.2%' },
                    { pair: 'USDC/USDT', volume: '$456M', share: '18.9%' },
                    { pair: 'SOL/USDT', volume: '$234M', share: '9.7%' },
                    { pair: 'RAY/SOL', volume: '$189M', share: '7.8%' }
                  ].map((pair, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div>
                        <span className="text-white font-medium text-sm">{pair.pair}</span>
                        <span className="text-zinc-400 text-xs ml-2">{pair.share}</span>
                      </div>
                      <span className="text-zinc-300 text-sm">{pair.volume}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                <h4 className="text-white font-medium mb-3">DEX Usage Distribution</h4>
                <div className="space-y-2">
                  {[
                    { dex: 'Orca', share: '42.3%', volume: '$1.18B' },
                    { dex: 'Raydium', share: '28.7%', volume: '$803M' },
                    { dex: 'Serum', share: '15.2%', volume: '$426M' },
                    { dex: 'Others', share: '13.8%', volume: '$386M' }
                  ].map((dex, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div>
                        <span className="text-white font-medium text-sm">{dex.dex}</span>
                        <span className="text-zinc-400 text-xs ml-2">{dex.share}</span>
                      </div>
                      <span className="text-zinc-300 text-sm">{dex.volume}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Limit Orders Tab */}
      {activeTab === 'limit-orders' && (
        <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Limit Orders</h3>
          
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-400 text-lg">Advanced Order Types</p>
            <p className="text-zinc-500 text-sm mt-2 max-w-md mx-auto">
              Set limit orders, stop-loss, and DCA strategies with Jupiter's advanced trading features.
            </p>
            <button className="mt-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-2 rounded-lg font-medium transition-all">
              Create Limit Order
            </button>
          </div>
        </div>
      )}

      {/* Development Status */}
      <div className="mt-8 bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded-lg p-4">
        <h4 className="text-yellow-300 font-medium mb-2">🚧 Development Status</h4>
        <p className="text-yellow-200 text-sm mb-2">
          Jupiter integration is in active development. Universal swap aggregator with smart routing.
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">✅ UI Complete</span>
          <span className="bg-yellow-900 bg-opacity-50 text-yellow-300 px-2 py-1 rounded">🚧 Jupiter API Integration</span>
          <span className="bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded">🔜 Smart Routing</span>
          <span className="bg-purple-900 bg-opacity-50 text-purple-300 px-2 py-1 rounded">🔜 Limit Orders</span>
        </div>
      </div>
    </div>
  )
}
