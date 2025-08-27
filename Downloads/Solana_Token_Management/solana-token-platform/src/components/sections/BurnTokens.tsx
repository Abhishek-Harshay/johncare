'use client'

import { useState, useEffect } from 'react'
import { Flame, AlertTriangle, CheckCircle, TrendingDown, Activity, Loader, Info } from 'lucide-react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'

interface TokenInfo {
  mint: string
  symbol: string
  name: string
  balance: number
  decimals: number
  totalSupply: number
  isBurnable: boolean
}

export default function BurnTokens() {
  const { connection } = useConnection()
  const { publicKey, connected } = useWallet()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'burn' | 'history' | 'analytics'>('burn')
  
  // Burn State
  const [selectedToken, setSelectedToken] = useState('')
  const [burnAmount, setBurnAmount] = useState('')
  const [burnType, setBurnType] = useState<'amount' | 'percentage'>('amount')
  const [burnPercentage, setBurnPercentage] = useState('')
  const [confirmBurn, setConfirmBurn] = useState(false)

  // Mock token data
  const [userTokens] = useState<TokenInfo[]>([
    {
      mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      symbol: 'USDC',
      name: 'USD Coin',
      balance: 1500.50,
      decimals: 6,
      totalSupply: 1000000,
      isBurnable: true
    },
    {
      mint: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
      symbol: 'RAY',
      name: 'Raydium',
      balance: 250.75,
      decimals: 6,
      totalSupply: 500000,
      isBurnable: true
    },
    {
      mint: 'So11111111111111111111111111111111111111112',
      symbol: 'SOL',
      name: 'Solana',
      balance: 5.25,
      decimals: 9,
      totalSupply: 548000000,
      isBurnable: false
    }
  ])

  // Mock burn history
  const burnHistory = [
    {
      id: '1',
      tokenSymbol: 'CUSTOM',
      amount: 100000,
      percentage: 10,
      txHash: '2ZE4RcMQMRoXV8wWyeRD8EhWcfnYfcmWzwkSLkYpE9sC',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      status: 'success'
    },
    {
      id: '2',
      tokenSymbol: 'TEST',
      amount: 500000,
      percentage: 50,
      txHash: '3QF5RdNQNSoYW9wXzfSD9FiXdgopYgdnZxlTMkZqF0tD',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      status: 'success'
    }
  ]

  const selectedTokenInfo = userTokens.find(token => token.mint === selectedToken)

  const calculateBurnAmount = () => {
    if (!selectedTokenInfo) return 0
    if (burnType === 'percentage' && burnPercentage) {
      return (selectedTokenInfo.balance * parseFloat(burnPercentage)) / 100
    }
    return parseFloat(burnAmount) || 0
  }

  const handleBurnTokens = async () => {
    if (!connected || !selectedTokenInfo) return
    
    setLoading(true)
    try {
      const amount = calculateBurnAmount()
      console.log(`Burning ${amount} ${selectedTokenInfo.symbol} tokens`)
      
      // Simulate burn transaction
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Reset form
      setBurnAmount('')
      setBurnPercentage('')
      setConfirmBurn(false)
      
    } catch (error) {
      console.error('Burn failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const burnAmountCalculated = calculateBurnAmount()
  const burnValueUSD = burnAmountCalculated * 1.5 // Mock price

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Token Burner</h1>
            <p className="text-zinc-400">Permanently remove tokens from circulation</p>
          </div>
        </div>

        {!connected && (
          <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-medium">Wallet not connected</span>
            </div>
            <p className="text-yellow-300 text-sm mt-1">Connect your wallet to burn tokens</p>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 bg-zinc-900 p-1 rounded-lg w-fit">
        {[
          { id: 'burn', label: 'Burn Tokens', icon: Flame },
          { id: 'history', label: 'Burn History', icon: Activity },
          { id: 'analytics', label: 'Analytics', icon: TrendingDown }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-red-600 text-white'
                : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Burn Tab */}
      {activeTab === 'burn' && (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Burn Tokens</h3>
            
            <div className="space-y-6">
              {/* Token Selection */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Select Token</label>
                <select
                  value={selectedToken}
                  onChange={(e) => setSelectedToken(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:border-red-500 focus:outline-none"
                >
                  <option value="">Choose a token to burn</option>
                  {userTokens.filter(token => token.isBurnable).map((token) => (
                    <option key={token.mint} value={token.mint}>
                      {token.symbol} - {token.balance.toLocaleString()} available
                    </option>
                  ))}
                </select>
              </div>

              {selectedTokenInfo && (
                <>
                  {/* Token Info */}
                  <div className="bg-zinc-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-zinc-400">Token Balance</span>
                      <span className="text-white font-medium">{selectedTokenInfo.balance.toLocaleString()} {selectedTokenInfo.symbol}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400">Total Supply</span>
                      <span className="text-white font-medium">{selectedTokenInfo.totalSupply.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Burn Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Burn Method</label>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setBurnType('amount')}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                          burnType === 'amount'
                            ? 'bg-red-600 text-white'
                            : 'bg-zinc-800 text-zinc-400 hover:text-zinc-300'
                        }`}
                      >
                        Fixed Amount
                      </button>
                      <button
                        onClick={() => setBurnType('percentage')}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                          burnType === 'percentage'
                            ? 'bg-red-600 text-white'
                            : 'bg-zinc-800 text-zinc-400 hover:text-zinc-300'
                        }`}
                      >
                        Percentage
                      </button>
                    </div>
                  </div>

                  {/* Burn Amount Input */}
                  {burnType === 'amount' ? (
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">Amount to Burn</label>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="0.0"
                          value={burnAmount}
                          onChange={(e) => setBurnAmount(e.target.value)}
                          max={selectedTokenInfo.balance}
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 pr-16 text-white focus:border-red-500 focus:outline-none"
                        />
                        <div className="absolute right-3 top-2 text-zinc-400 text-sm">
                          {selectedTokenInfo.symbol}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">Percentage to Burn</label>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="0"
                          value={burnPercentage}
                          onChange={(e) => setBurnPercentage(e.target.value)}
                          max="100"
                          min="0"
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 pr-10 text-white focus:border-red-500 focus:outline-none"
                        />
                        <div className="absolute right-3 top-2 text-zinc-400 text-sm">%</div>
                      </div>
                    </div>
                  )}

                  {/* Quick Percentage Buttons */}
                  <div className="grid grid-cols-4 gap-2">
                    {['25', '50', '75', '100'].map((percent) => (
                      <button
                        key={percent}
                        onClick={() => {
                          setBurnType('percentage')
                          setBurnPercentage(percent)
                        }}
                        className="py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-sm transition-colors"
                      >
                        {percent}%
                      </button>
                    ))}
                  </div>

                  {/* Confirmation Checkbox */}
                  {burnAmountCalculated > 0 && (
                    <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id="confirmBurn"
                          checked={confirmBurn}
                          onChange={(e) => setConfirmBurn(e.target.checked)}
                          className="mt-1"
                        />
                        <label htmlFor="confirmBurn" className="text-sm text-red-300 cursor-pointer">
                          I understand that burning tokens is <strong>permanent and irreversible</strong>. 
                          I will burn {burnAmountCalculated.toLocaleString()} {selectedTokenInfo.symbol} tokens.
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Burn Button */}
                  <button
                    onClick={handleBurnTokens}
                    disabled={!connected || loading || !confirmBurn || burnAmountCalculated === 0 || burnAmountCalculated > selectedTokenInfo.balance}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                      <Flame className="w-5 h-5" />
                    )}
                    <span>{loading ? 'Burning Tokens...' : 'Burn Tokens'}</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Burn Preview */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Burn Preview</h3>
            
            {selectedTokenInfo && burnAmountCalculated > 0 ? (
              <div className="space-y-4">
                <div className="bg-zinc-800 rounded-lg p-4">
                  <div className="text-sm text-zinc-400 mb-1">Tokens to Burn</div>
                  <div className="text-2xl font-bold text-red-400">
                    {burnAmountCalculated.toLocaleString()} {selectedTokenInfo.symbol}
                  </div>
                  <div className="text-sm text-zinc-400">≈ ${burnValueUSD.toFixed(2)} USD</div>
                </div>

                <div className="bg-zinc-800 rounded-lg p-4">
                  <div className="text-sm text-zinc-400 mb-1">Remaining Balance</div>
                  <div className="text-lg font-semibold text-white">
                    {(selectedTokenInfo.balance - burnAmountCalculated).toLocaleString()} {selectedTokenInfo.symbol}
                  </div>
                </div>

                <div className="bg-zinc-800 rounded-lg p-4">
                  <div className="text-sm text-zinc-400 mb-1">New Total Supply</div>
                  <div className="text-lg font-semibold text-white">
                    {(selectedTokenInfo.totalSupply - burnAmountCalculated).toLocaleString()}
                  </div>
                  <div className="text-sm text-red-400">
                    -{((burnAmountCalculated / selectedTokenInfo.totalSupply) * 100).toFixed(2)}% supply reduction
                  </div>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <Info className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div className="text-sm text-yellow-300">
                      <div className="font-medium mb-1">Important Notice</div>
                      <ul className="space-y-1 text-xs">
                        <li>• Burned tokens are sent to a null address</li>
                        <li>• This action cannot be undone</li>
                        <li>• Network fees will apply</li>
                        <li>• May affect token price due to supply reduction</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-zinc-400 py-12">
                <Flame className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a token and enter an amount to see the burn preview</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Burn History</h3>
          
          <div className="space-y-4">
            {burnHistory.map((burn) => (
              <div key={burn.id} className="bg-zinc-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <Flame className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Burned {burn.amount.toLocaleString()} {burn.tokenSymbol}</div>
                      <div className="text-sm text-zinc-400">{burn.percentage}% of supply • {burn.timestamp.toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs font-medium">
                      Success
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-zinc-500 font-mono">
                  TX: {burn.txHash}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Burn Statistics</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Total Tokens Burned</span>
                <span className="text-red-400 font-semibold">600,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Total USD Value Burned</span>
                <span className="text-red-400 font-semibold">$900</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Burn Transactions</span>
                <span className="text-white font-semibold">2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Average Burn Size</span>
                <span className="text-white font-semibold">300,000</span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Supply Impact</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Supply Reduction</span>
                <span className="text-red-400 font-semibold">-30%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Deflationary Pressure</span>
                <span className="text-green-400 font-semibold">High</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Price Impact</span>
                <span className="text-blue-400 font-semibold">+15%</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-900/20 border border-green-700 rounded-lg">
              <div className="text-green-400 font-medium text-sm">Burn Effect</div>
              <div className="text-green-300 text-xs mt-1">
                Token burns have reduced circulating supply, potentially increasing scarcity and value
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
