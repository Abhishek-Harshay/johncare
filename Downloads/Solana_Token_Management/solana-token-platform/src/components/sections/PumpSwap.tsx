'use client'

import { useState } from 'react'
import { ArrowUpDown, Zap, TrendingUp, BarChart3, Loader2, RefreshCw, Settings } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'

interface SwapTokens {
  fromToken: string
  toToken: string
  fromAmount: number
  toAmount: number
  slippage: number
}

export default function PumpSwap() {
  const { publicKey } = useWallet()
  const [activeTab, setActiveTab] = useState<'swap' | 'analytics' | 'settings'>('swap')
  const [isLoading, setIsLoading] = useState(false)
  const [swap, setSwap] = useState<SwapTokens>({
    fromToken: 'So11111111111111111111111111111111111111112',
    toToken: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    fromAmount: 1,
    toAmount: 96.42,
    slippage: 0.5
  })

  const handleSwap = async () => {
    if (!publicKey) {
      alert('Please connect your wallet first')
      return
    }

    setIsLoading(true)
    try {
      alert(`🚧 Pump.swap Transaction\n\nSwapping tokens:\nFrom: ${swap.fromAmount} ${swap.fromToken.slice(-8)}\nTo: ${swap.toAmount} ${swap.toToken.slice(-8)}\nSlippage: ${swap.slippage}%`)
    } catch (error) {
      console.error('Pump.swap transaction failed:', error)
      alert('Swap failed')
    }
    setIsLoading(false)
  }

  const swapTokens = () => {
    setSwap({
      ...swap,
      fromToken: swap.toToken,
      toToken: swap.fromToken,
      fromAmount: swap.toAmount,
      toAmount: swap.fromAmount
    })
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Pump.swap - Advanced Token Exchange
        </h1>
        <p className="text-zinc-400">
          Optimized swapping for Pump.fun tokens with MEV protection and best routes
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-zinc-900 rounded-xl p-1">
        {[
          { id: 'swap', label: 'Token Swap', icon: ArrowUpDown },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'settings', label: 'Settings', icon: Settings }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg'
                : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Token Swap Tab */}
      {activeTab === 'swap' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Advanced Token Swap</h3>
            
            <div className="max-w-md mx-auto space-y-4">
              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                <label className="block text-sm font-medium text-zinc-300 mb-2">From</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={swap.fromAmount}
                    onChange={(e) => setSwap({...swap, fromAmount: parseFloat(e.target.value)})}
                    className="flex-1 px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-cyan-500"
                    placeholder="0.0"
                  />
                  <select className="px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:outline-none focus:border-cyan-500">
                    <option value="SOL">SOL</option>
                    <option value="USDC">USDC</option>
                    <option value="USDT">USDT</option>
                  </select>
                </div>
                <input
                  type="text"
                  value={swap.fromToken}
                  onChange={(e) => setSwap({...swap, fromToken: e.target.value})}
                  className="w-full mt-2 px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-cyan-500 text-xs"
                  placeholder="Token mint address..."
                />
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={swapTokens}
                  className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded-full border border-zinc-700 transition-colors"
                >
                  <ArrowUpDown className="w-5 h-5 text-cyan-400" />
                </button>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                <label className="block text-sm font-medium text-zinc-300 mb-2">To</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={swap.toAmount}
                    onChange={(e) => setSwap({...swap, toAmount: parseFloat(e.target.value)})}
                    className="flex-1 px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-cyan-500"
                    placeholder="0.0"
                  />
                  <select className="px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:outline-none focus:border-cyan-500">
                    <option value="USDC">USDC</option>
                    <option value="SOL">SOL</option>
                    <option value="USDT">USDT</option>
                  </select>
                </div>
                <input
                  type="text"
                  value={swap.toToken}
                  onChange={(e) => setSwap({...swap, toToken: e.target.value})}
                  className="w-full mt-2 px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-cyan-500 text-xs"
                  placeholder="Token mint address..."
                />
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-zinc-300 text-sm">Slippage Tolerance</span>
                  <span className="text-cyan-400 text-sm font-medium">{swap.slippage}%</span>
                </div>
                <div className="flex space-x-2 mb-2">
                  {[0.1, 0.5, 1.0, 3.0].map((slippage) => (
                    <button
                      key={slippage}
                      onClick={() => setSwap({...swap, slippage})}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        swap.slippage === slippage
                          ? 'bg-cyan-600 text-white'
                          : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                      }`}
                    >
                      {slippage}%
                    </button>
                  ))}
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={swap.slippage}
                  onChange={(e) => setSwap({...swap, slippage: parseFloat(e.target.value)})}
                  className="w-full accent-cyan-500"
                />
              </div>

              <div className="bg-cyan-900 bg-opacity-30 border border-cyan-700 rounded-lg p-4">
                <h4 className="text-cyan-300 font-medium mb-2 flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  Pump.swap Features
                </h4>
                <ul className="text-cyan-200 text-sm space-y-1">
                  <li>• MEV protection and frontrunning resistance</li>
                  <li>• Optimized routing for best prices</li>
                  <li>• Support for all Pump.fun tokens</li>
                  <li>• Minimal slippage and fees</li>
                  <li>• Real-time price updates</li>
                </ul>
              </div>

              <button
                onClick={handleSwap}
                disabled={isLoading || !swap.fromToken || !swap.toToken}
                className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 disabled:opacity-50 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Swapping...</span>
                  </>
                ) : (
                  <>
                    <ArrowUpDown className="w-5 h-5" />
                    <span>Execute Swap</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Swap Analytics</h3>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Total Swaps', value: '45.2K', change: '+23.5%', icon: ArrowUpDown },
                { label: '24h Volume', value: '$12.8M', change: '+18.7%', icon: TrendingUp },
                { label: 'Avg. Slippage', value: '0.34%', change: '-12.3%', icon: BarChart3 }
              ].map((stat, index) => (
                <div key={index} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="w-5 h-5 text-cyan-400" />
                    <span className={`text-xs font-medium ${
                      stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-zinc-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
              <h4 className="text-white font-medium mb-3">Recent Swaps</h4>
              <div className="space-y-2">
                {[
                  { from: 'SOL', to: 'BONK', amount: '0.5 SOL', time: '2m ago', status: 'Success' },
                  { from: 'USDC', to: 'MYRO', amount: '$150', time: '5m ago', status: 'Success' },
                  { from: 'BONK', to: 'SOL', amount: '1M BONK', time: '8m ago', status: 'Success' }
                ].map((txn, index) => (
                  <div key={index} className="flex items-center justify-between py-2 px-3 bg-zinc-700 rounded">
                    <div className="flex items-center space-x-3">
                      <div className="text-sm text-white">
                        {txn.from} → {txn.to}
                      </div>
                      <div className="text-xs text-zinc-400">{txn.amount}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-zinc-400">{txn.time}</span>
                      <span className="text-xs bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">
                        {txn.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Swap Settings</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-white font-medium mb-3">Default Slippage</h4>
              <div className="flex space-x-2 mb-2">
                {[0.1, 0.5, 1.0, 3.0].map((slippage) => (
                  <button
                    key={slippage}
                    onClick={() => setSwap({...swap, slippage})}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      swap.slippage === slippage
                        ? 'bg-cyan-600 text-white'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {slippage}%
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-3">MEV Protection</h4>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input type="checkbox" defaultChecked className="accent-cyan-500" />
                  <span className="text-zinc-300">Enable frontrunning protection</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" defaultChecked className="accent-cyan-500" />
                  <span className="text-zinc-300">Use private mempool</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="accent-cyan-500" />
                  <span className="text-zinc-300">Priority fee boost</span>
                </label>
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-3">Route Optimization</h4>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input type="checkbox" defaultChecked className="accent-cyan-500" />
                  <span className="text-zinc-300">Auto-select best route</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" defaultChecked className="accent-cyan-500" />
                  <span className="text-zinc-300">Include all DEXs in routing</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="accent-cyan-500" />
                  <span className="text-zinc-300">Prefer Pump.fun native pools</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Swap Interface */}
      {activeTab === 'swap' && (
        <div className="mt-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-medium mb-3">Popular Pump.fun Pairs</h4>
                <div className="space-y-2">
                  {[
                    { pair: 'SOL/BONK', volume: '$2.4M', change: '+45.7%' },
                    { pair: 'SOL/MYRO', volume: '$1.8M', change: '+32.1%' },
                    { pair: 'USDC/BONK', volume: '$980K', change: '+67.3%' },
                    { pair: 'SOL/SAMO', volume: '$756K', change: '+23.8%' }
                  ].map((pair, index) => (
                    <div key={index} className="flex items-center justify-between py-2 px-3 bg-zinc-800 rounded-lg border border-zinc-700">
                      <div>
                        <div className="text-white font-medium text-sm">{pair.pair}</div>
                        <div className="text-zinc-400 text-xs">{pair.volume} 24h</div>
                      </div>
                      <div className="text-green-400 text-xs font-medium">{pair.change}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-3">Route Information</h4>
                <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Best Route:</span>
                      <span className="text-white">Direct Pump.fun Pool</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Price Impact:</span>
                      <span className="text-green-400">0.12%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Network Fee:</span>
                      <span className="text-white">~0.00025 SOL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">MEV Protection:</span>
                      <span className="text-green-400">Enabled</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Development Status */}
      <div className="mt-8 bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded-lg p-4">
        <h4 className="text-yellow-300 font-medium mb-2">🚧 Development Status</h4>
        <p className="text-yellow-200 text-sm mb-2">
          Pump.swap integration is in active development. Advanced swapping with MEV protection for Pump.fun ecosystem.
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">✅ UI Complete</span>
          <span className="bg-yellow-900 bg-opacity-50 text-yellow-300 px-2 py-1 rounded">🚧 Pump.swap API</span>
          <span className="bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded">🔜 MEV Protection</span>
          <span className="bg-purple-900 bg-opacity-50 text-purple-300 px-2 py-1 rounded">🔜 Route Optimization</span>
        </div>
      </div>
    </div>
  )
}
