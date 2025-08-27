'use client'

import { useState } from 'react'
import { ArrowRightLeft, TrendingUp, Zap, Search, Clock, DollarSign, Target, AlertCircle, RefreshCw, Play } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'

interface ArbitrageOpportunity {
  id: string
  tokenSymbol: string
  tokenName: string
  buyExchange: string
  sellExchange: string
  buyPrice: number
  sellPrice: number
  profitPercent: number
  profitUSD: number
  volume24h: number
  liquidity: number
  timeRemaining: number
  confidence: 'High' | 'Medium' | 'Low'
}

interface ExchangeData {
  name: string
  connected: boolean
  tokens: number
  avgSpread: number
  status: 'Active' | 'Maintenance' | 'Error'
}

export default function ArbitrageScanner() {
  const { publicKey } = useWallet()
  const [activeTab, setActiveTab] = useState<'scanner' | 'opportunities' | 'history' | 'settings'>('scanner')
  const [isScanning, setIsScanning] = useState(false)
  const [scanInterval, setScanInterval] = useState(30)
  
  const [opportunities, setOpportunities] = useState<ArbitrageOpportunity[]>([
    {
      id: '1',
      tokenSymbol: 'RAY',
      tokenName: 'Raydium',
      buyExchange: 'Raydium',
      sellExchange: 'Orca',
      buyPrice: 1.85,
      sellPrice: 1.91,
      profitPercent: 3.24,
      profitUSD: 324.50,
      volume24h: 1250000,
      liquidity: 89000,
      timeRemaining: 45,
      confidence: 'High'
    },
    {
      id: '2',
      tokenSymbol: 'ORCA',
      tokenName: 'Orca',
      buyExchange: 'Jupiter',
      sellExchange: 'Raydium',
      buyPrice: 2.08,
      sellPrice: 2.13,
      profitPercent: 2.40,
      profitUSD: 180.75,
      volume24h: 890000,
      liquidity: 67000,
      timeRemaining: 28,
      confidence: 'Medium'
    },
    {
      id: '3',
      tokenSymbol: 'SOL',
      tokenName: 'Solana',
      buyExchange: 'Orca',
      sellExchange: 'Pump.fun',
      buyPrice: 185.20,
      sellPrice: 187.45,
      profitPercent: 1.21,
      profitUSD: 450.25,
      volume24h: 45000000,
      liquidity: 890000,
      timeRemaining: 67,
      confidence: 'High'
    }
  ])

  const [exchanges, setExchanges] = useState<ExchangeData[]>([
    { name: 'Raydium', connected: true, tokens: 1250, avgSpread: 0.3, status: 'Active' },
    { name: 'Orca', connected: true, tokens: 890, avgSpread: 0.4, status: 'Active' },
    { name: 'Jupiter', connected: true, tokens: 2100, avgSpread: 0.2, status: 'Active' },
    { name: 'Pump.fun', connected: false, tokens: 0, avgSpread: 0.0, status: 'Error' },
    { name: 'Pump.swap', connected: true, tokens: 567, avgSpread: 0.8, status: 'Active' }
  ])

  const startScanning = async () => {
    setIsScanning(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Simulate finding new opportunities
      const newOpportunities = [
        {
          id: Date.now().toString(),
          tokenSymbol: 'USDC',
          tokenName: 'USD Coin',
          buyExchange: 'Raydium',
          sellExchange: 'Orca',
          buyPrice: 0.998,
          sellPrice: 1.002,
          profitPercent: 0.40,
          profitUSD: 40.15,
          volume24h: 12500000,
          liquidity: 2890000,
          timeRemaining: 15,
          confidence: 'Low' as const
        }
      ]
      
      setOpportunities(prev => [...newOpportunities, ...prev.slice(0, 4)])
      alert(`🔍 Arbitrage Scan Complete!\n\nFound ${newOpportunities.length} new opportunity!\n\n• USDC spread between Raydium/Orca\n• 0.40% profit potential\n• $40.15 estimated profit\n• Low confidence due to tight spreads`)
    } catch (error) {
      console.error('Scanning failed:', error)
      alert('Arbitrage scanning failed')
    }
    setIsScanning(false)
  }

  const executeArbitrage = async (opportunity: ArbitrageOpportunity) => {
    alert(`⚡ Execute Arbitrage\n\n${opportunity.tokenSymbol} Arbitrage Opportunity:\n\n• Buy on ${opportunity.buyExchange}: $${opportunity.buyPrice}\n• Sell on ${opportunity.sellExchange}: $${opportunity.sellPrice}\n• Profit: ${opportunity.profitPercent.toFixed(2)}% ($${opportunity.profitUSD})\n\n⚠️ Always verify:\n- Gas fees and slippage\n- Available liquidity\n- Market conditions\n- Transaction timing`)
  }

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'High': return 'bg-green-600 bg-opacity-20 text-green-300'
      case 'Medium': return 'bg-yellow-600 bg-opacity-20 text-yellow-300'
      case 'Low': return 'bg-red-600 bg-opacity-20 text-red-300'
      default: return 'bg-zinc-600 bg-opacity-20 text-zinc-300'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-600 bg-opacity-20 text-green-300'
      case 'Maintenance': return 'bg-yellow-600 bg-opacity-20 text-yellow-300'
      case 'Error': return 'bg-red-600 bg-opacity-20 text-red-300'
      default: return 'bg-zinc-600 bg-opacity-20 text-zinc-300'
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
              Arbitrage Scanner
            </h1>
            <p className="text-zinc-400">
              Discover profit opportunities across DEXs with real-time price monitoring
            </p>
          </div>
          <button
            onClick={startScanning}
            disabled={isScanning}
            className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>{isScanning ? 'Scanning...' : 'Start Scan'}</span>
          </button>
        </div>
      </div>

      {/* Scanner Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Active Opportunities', value: opportunities.length.toString(), icon: Target, color: 'text-yellow-400' },
          { label: 'Connected Exchanges', value: exchanges.filter(e => e.connected).length.toString(), icon: ArrowRightLeft, color: 'text-green-400' },
          { label: 'Avg Profit Potential', value: `${(opportunities.reduce((sum, op) => sum + op.profitPercent, 0) / opportunities.length).toFixed(2)}%`, icon: TrendingUp, color: 'text-blue-400' },
          { label: 'Scan Interval', value: `${scanInterval}s`, icon: Clock, color: 'text-purple-400' }
        ].map((stat, index) => (
          <div key={index} className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-xl font-bold text-white">{stat.value}</div>
            <div className="text-zinc-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-zinc-900 rounded-xl p-1">
        {[
          { id: 'scanner', label: 'Scanner', icon: Search },
          { id: 'opportunities', label: 'Opportunities', icon: Target },
          { id: 'history', label: 'History', icon: Clock },
          { id: 'settings', label: 'Settings', icon: AlertCircle }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg'
                : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Scanner Tab */}
      {activeTab === 'scanner' && (
        <div className="space-y-6">
          {/* Exchange Status */}
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <ArrowRightLeft className="w-5 h-5 mr-2 text-blue-400" />
              Exchange Status
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exchanges.map((exchange) => (
                <div key={exchange.name} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{exchange.name}</h4>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(exchange.status)}`}>
                      {exchange.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Tokens:</span>
                      <span className="text-white">{exchange.tokens.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Avg Spread:</span>
                      <span className="text-white">{exchange.avgSpread}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Connected:</span>
                      <span className={exchange.connected ? 'text-green-400' : 'text-red-400'}>
                        {exchange.connected ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Opportunities */}
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Live Opportunities</h3>
              <div className="flex items-center space-x-2">
                <RefreshCw className={`w-4 h-4 text-zinc-400 ${isScanning ? 'animate-spin' : ''}`} />
                <span className="text-zinc-400 text-sm">Last scan: 2 minutes ago</span>
              </div>
            </div>
            
            {opportunities.length > 0 ? (
              <div className="space-y-4">
                {opportunities.map((opportunity) => (
                  <div key={opportunity.id} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 hover:border-yellow-500 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {opportunity.tokenSymbol.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{opportunity.tokenSymbol}</h4>
                          <p className="text-zinc-400 text-sm">{opportunity.tokenName}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs ${getConfidenceColor(opportunity.confidence)}`}>
                          {opportunity.confidence}
                        </span>
                        <div className="text-right">
                          <div className="text-green-400 font-bold">+{opportunity.profitPercent.toFixed(2)}%</div>
                          <div className="text-green-400 text-sm">${opportunity.profitUSD.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-3">
                      <div className="space-y-1">
                        <div className="text-zinc-400 text-xs">Buy on {opportunity.buyExchange}</div>
                        <div className="text-white font-medium">${opportunity.buyPrice.toFixed(3)}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-zinc-400 text-xs">Sell on {opportunity.sellExchange}</div>
                        <div className="text-white font-medium">${opportunity.sellPrice.toFixed(3)}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-zinc-400">
                        <span>Liquidity: ${opportunity.liquidity.toLocaleString()}</span>
                        <span>Expires: {opportunity.timeRemaining}s</span>
                      </div>
                      <button
                        onClick={() => executeArbitrage(opportunity)}
                        className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1"
                      >
                        <Play className="w-3 h-3" />
                        <span>Execute</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-zinc-400">
                <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No arbitrage opportunities found</p>
                <p className="text-sm">Try adjusting your scan settings or wait for market movements</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Opportunities Tab */}
      {activeTab === 'opportunities' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">All Opportunities</h3>
            
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 text-lg">Opportunity History</p>
              <p className="text-zinc-500 text-sm mt-2 max-w-md mx-auto">
                View detailed history of all discovered arbitrage opportunities with performance tracking and success rates.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Execution History</h3>
            
            <div className="text-center py-12">
              <Clock className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 text-lg">Trading History</p>
              <p className="text-zinc-500 text-sm mt-2 max-w-md mx-auto">
                Track your arbitrage execution history, profit/loss analysis, and performance metrics over time.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Scanner Settings</h3>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Scan Interval (seconds)</label>
                  <input
                    type="number"
                    min="10"
                    max="300"
                    value={scanInterval}
                    onChange={(e) => setScanInterval(parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Minimum Profit (%)</label>
                  <input
                    type="number"
                    min="0.1"
                    max="10"
                    step="0.1"
                    defaultValue="0.5"
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Minimum Liquidity ($)</label>
                  <input
                    type="number"
                    min="1000"
                    step="1000"
                    defaultValue="50000"
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Alert Settings</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="accent-yellow-500" />
                      <span className="text-zinc-300 text-sm">High confidence opportunities</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="accent-yellow-500" />
                      <span className="text-zinc-300 text-sm">Profit threshold alerts</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="accent-yellow-500" />
                      <span className="text-zinc-300 text-sm">Exchange disconnection alerts</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Auto-Execute</label>
                  <div className="bg-yellow-900 bg-opacity-20 border border-yellow-700 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-300 text-sm font-medium">High Risk Feature</span>
                    </div>
                    <p className="text-yellow-200 text-xs">
                      Auto-execution is extremely risky and can result in significant losses. Only enable if you fully understand the risks.
                    </p>
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
          Arbitrage Scanner is in active development. Real-time DEX integration and automated execution coming soon.
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">✅ Opportunity Detection</span>
          <span className="bg-yellow-900 bg-opacity-50 text-yellow-300 px-2 py-1 rounded">🚧 Live Price Feeds</span>
          <span className="bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded">🔜 Auto Execution</span>
          <span className="bg-purple-900 bg-opacity-50 text-purple-300 px-2 py-1 rounded">🔜 Risk Management</span>
        </div>
      </div>
    </div>
  )
}
