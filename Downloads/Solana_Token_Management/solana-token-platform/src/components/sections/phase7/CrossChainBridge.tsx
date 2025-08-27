'use client'

import { useState } from 'react'
import { Share2, ArrowRight, RefreshCw, Clock, CheckCircle, AlertTriangle, Loader } from 'lucide-react'

interface SupportedChain {
  id: string
  name: string
  symbol: string
  icon: string
  balance: number
  fee: number
}

export default function CrossChainBridge() {
  const [fromChain, setFromChain] = useState('solana')
  const [toChain, setToChain] = useState('ethereum')
  const [amount, setAmount] = useState('')
  const [selectedToken, setSelectedToken] = useState('USDC')
  const [loading, setLoading] = useState(false)

  const supportedChains: SupportedChain[] = [
    { id: 'solana', name: 'Solana', symbol: 'SOL', icon: '◎', balance: 125.5, fee: 0.01 },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', balance: 2.34, fee: 15.50 },
    { id: 'polygon', name: 'Polygon', symbol: 'MATIC', icon: '⬟', balance: 850.0, fee: 0.05 },
    { id: 'bsc', name: 'BSC', symbol: 'BNB', icon: '🔸', balance: 12.8, fee: 0.25 },
    { id: 'avalanche', name: 'Avalanche', symbol: 'AVAX', icon: '🔺', balance: 45.2, fee: 0.15 }
  ]

  const bridgeTokens = ['USDC', 'USDT', 'WETH', 'WBTC', 'SOL']
  
  const handleBridge = async () => {
    setLoading(true)
    try {
      console.log(`Bridging ${amount} ${selectedToken} from ${fromChain} to ${toChain}`)
      await new Promise(resolve => setTimeout(resolve, 3000))
    } catch (error) {
      console.error('Bridge failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const swapChains = () => {
    const temp = fromChain
    setFromChain(toChain)
    setToChain(temp)
  }

  const getFromChain = () => supportedChains.find(c => c.id === fromChain)
  const getToChain = () => supportedChains.find(c => c.id === toChain)

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
            <Share2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Cross-Chain Bridge</h1>
            <p className="text-zinc-400">Transfer tokens seamlessly across blockchains</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Bridge Interface */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Bridge Tokens</h3>
          
          <div className="space-y-6">
            {/* From Chain */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">From</label>
              <div className="bg-zinc-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <select
                    value={fromChain}
                    onChange={(e) => setFromChain(e.target.value)}
                    className="bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none"
                  >
                    {supportedChains.map((chain) => (
                      <option key={chain.id} value={chain.id}>
                        {chain.icon} {chain.name}
                      </option>
                    ))}
                  </select>
                  <div className="text-sm text-zinc-400">
                    Balance: {getFromChain()?.balance} {getFromChain()?.symbol}
                  </div>
                </div>
                <div className="flex space-x-3">
                  <select
                    value={selectedToken}
                    onChange={(e) => setSelectedToken(e.target.value)}
                    className="bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-white text-sm focus:border-green-500 focus:outline-none"
                  >
                    {bridgeTokens.map((token) => (
                      <option key={token} value={token}>{token}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="0.0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-white focus:border-green-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={swapChains}
                className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-full p-2 transition-colors"
              >
                <RefreshCw className="w-4 h-4 text-zinc-400" />
              </button>
            </div>

            {/* To Chain */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">To</label>
              <div className="bg-zinc-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <select
                    value={toChain}
                    onChange={(e) => setToChain(e.target.value)}
                    className="bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  >
                    {supportedChains.filter(c => c.id !== fromChain).map((chain) => (
                      <option key={chain.id} value={chain.id}>
                        {chain.icon} {chain.name}
                      </option>
                    ))}
                  </select>
                  <div className="text-sm text-zinc-400">
                    Balance: {getToChain()?.balance} {getToChain()?.symbol}
                  </div>
                </div>
                <div className="bg-zinc-700 rounded px-3 py-2 text-zinc-300">
                  You will receive: {amount || '0'} {selectedToken}
                </div>
              </div>
            </div>

            {/* Bridge Details */}
            {amount && (
              <div className="bg-zinc-800 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Bridge Fee</span>
                  <span className="text-white">${((parseFloat(amount) || 0) * 0.003).toFixed(3)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Network Fee</span>
                  <span className="text-white">${getFromChain()?.fee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Estimated Time</span>
                  <span className="text-white">5-15 minutes</span>
                </div>
                <hr className="border-zinc-700" />
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-white">Total Cost</span>
                  <span className="text-white">${((getFromChain()?.fee || 0) + ((parseFloat(amount) || 0) * 0.003)).toFixed(3)}</span>
                </div>
              </div>
            )}

            <button
              onClick={handleBridge}
              disabled={!amount || loading}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-zinc-700 disabled:to-zinc-700 disabled:text-zinc-500 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Share2 className="w-5 h-5" />
              )}
              <span>{loading ? 'Bridging...' : 'Bridge Tokens'}</span>
            </button>
          </div>
        </div>

        {/* Bridge Status & History */}
        <div className="space-y-6">
          {/* Recent Bridges */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Bridges</h3>
            
            <div className="space-y-3">
              {[
                { from: 'Solana', to: 'Ethereum', token: 'USDC', amount: 500, status: 'completed', time: '2 hours ago' },
                { from: 'Ethereum', to: 'Polygon', token: 'WETH', amount: 0.5, status: 'pending', time: '5 minutes ago' },
                { from: 'BSC', to: 'Solana', token: 'USDT', amount: 1000, status: 'failed', time: '1 day ago' }
              ].map((bridge, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      bridge.status === 'completed' ? 'bg-green-400' :
                      bridge.status === 'pending' ? 'bg-yellow-400' : 'bg-red-400'
                    }`}></div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        {bridge.amount} {bridge.token}
                      </div>
                      <div className="text-xs text-zinc-400">
                        {bridge.from} → {bridge.to} • {bridge.time}
                      </div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    bridge.status === 'completed' ? 'bg-green-900/20 text-green-400' :
                    bridge.status === 'pending' ? 'bg-yellow-900/20 text-yellow-400' :
                    'bg-red-900/20 text-red-400'
                  }`}>
                    {bridge.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Supported Networks */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Supported Networks</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {supportedChains.map((chain) => (
                <div key={chain.id} className="bg-zinc-800 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">{chain.icon}</span>
                    <span className="text-sm font-medium text-white">{chain.name}</span>
                  </div>
                  <div className="text-xs text-zinc-400">
                    Fee: ${chain.fee} {chain.symbol}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
