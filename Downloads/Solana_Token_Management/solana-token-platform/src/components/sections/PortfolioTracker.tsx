'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, PieChart, BarChart3, DollarSign, Wallet, Target, Zap, Clock, Eye, Plus, Trash2 } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'

interface Portfolio {
  totalValue: number
  change24h: number
  changePercent: number
  tokens: TokenHolding[]
}

interface TokenHolding {
  symbol: string
  name: string
  amount: number
  value: number
  price: number
  change24h: number
  changePercent: number
  allocation: number
}

interface WatchlistItem {
  symbol: string
  name: string
  price: number
  change24h: number
  changePercent: number
  marketCap: number
  volume24h: number
}

export default function PortfolioTracker() {
  const { publicKey } = useWallet()
  const [activeTab, setActiveTab] = useState<'overview' | 'holdings' | 'watchlist' | 'analytics'>('overview')
  const [isRefreshing, setIsRefreshing] = useState(false)
  
  const [portfolio, setPortfolio] = useState<Portfolio>({
    totalValue: 127845.67,
    change24h: 3247.89,
    changePercent: 2.61,
    tokens: [
      {
        symbol: 'SOL',
        name: 'Solana',
        amount: 245.67,
        value: 45678.90,
        price: 185.95,
        change24h: 5.67,
        changePercent: 3.15,
        allocation: 35.7
      },
      {
        symbol: 'USDC',
        name: 'USD Coin',
        amount: 25000,
        value: 25000.00,
        price: 1.00,
        change24h: 0.00,
        changePercent: 0.00,
        allocation: 19.6
      },
      {
        symbol: 'RAY',
        name: 'Raydium',
        amount: 12500.50,
        value: 23456.78,
        price: 1.87,
        change24h: -0.12,
        changePercent: -6.02,
        allocation: 18.3
      },
      {
        symbol: 'ORCA',
        name: 'Orca',
        amount: 8750.25,
        value: 18234.56,
        price: 2.08,
        change24h: 0.08,
        changePercent: 4.01,
        allocation: 14.3
      },
      {
        symbol: 'SRM',
        name: 'Serum',
        amount: 15678.90,
        value: 15475.43,
        price: 0.987,
        change24h: -0.045,
        changePercent: -4.36,
        allocation: 12.1
      }
    ]
  })

  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 63245.67,
      change24h: 1234.56,
      changePercent: 1.99,
      marketCap: 1245000000000,
      volume24h: 45600000000
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: 3456.78,
      change24h: -89.45,
      changePercent: -2.52,
      marketCap: 415600000000,
      volume24h: 18900000000
    },
    {
      symbol: 'JUP',
      name: 'Jupiter',
      price: 1.23,
      change24h: 0.08,
      changePercent: 6.98,
      marketCap: 1890000000,
      volume24h: 125000000
    }
  ])

  const refreshPortfolio = async () => {
    setIsRefreshing(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate price updates
      const updatedTokens = portfolio.tokens.map(token => ({
        ...token,
        price: token.price + (Math.random() - 0.5) * token.price * 0.05,
        change24h: (Math.random() - 0.5) * token.price * 0.1,
        changePercent: (Math.random() - 0.5) * 10
      }))

      setPortfolio(prev => ({
        ...prev,
        tokens: updatedTokens,
        totalValue: updatedTokens.reduce((sum, token) => sum + token.amount * token.price, 0)
      }))

      alert('📊 Portfolio Refreshed!\n\nAll token prices and portfolio values have been updated with the latest market data.')
    } catch (error) {
      console.error('Portfolio refresh failed:', error)
      alert('Portfolio refresh failed')
    }
    setIsRefreshing(false)
  }

  const addToWatchlist = () => {
    alert('📋 Add to Watchlist\n\nEnter token symbol or contract address to add to your watchlist:\n\n• Real-time price tracking\n• Price alerts and notifications\n• Market data and analytics\n• Easy portfolio addition')
  }

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(prev => prev.filter(item => item.symbol !== symbol))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B'
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M'
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K'
    return num.toFixed(2)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Portfolio Tracker
            </h1>
            <p className="text-zinc-400">
              Track your crypto portfolio with real-time prices and advanced analytics
            </p>
          </div>
          <button
            onClick={refreshPortfolio}
            disabled={isRefreshing}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2"
          >
            <Zap className="w-4 h-4" />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-zinc-400 text-sm">Total Portfolio Value</span>
            <Wallet className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">{formatCurrency(portfolio.totalValue)}</div>
          <div className={`flex items-center space-x-1 text-sm ${portfolio.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {portfolio.changePercent >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{formatCurrency(Math.abs(portfolio.change24h))} ({Math.abs(portfolio.changePercent).toFixed(2)}%)</span>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-zinc-400 text-sm">Best Performer</span>
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-xl font-bold text-white">
            {portfolio.tokens.reduce((best, token) => 
              token.changePercent > best.changePercent ? token : best
            ).symbol}
          </div>
          <div className="text-green-400 text-sm">
            +{portfolio.tokens.reduce((best, token) => 
              token.changePercent > best.changePercent ? token : best
            ).changePercent.toFixed(2)}%
          </div>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-zinc-400 text-sm">Total Tokens</span>
            <Target className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">{portfolio.tokens.length}</div>
          <div className="text-zinc-400 text-sm">Across Solana ecosystem</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-zinc-900 rounded-xl p-1">
        {[
          { id: 'overview', label: 'Overview', icon: PieChart },
          { id: 'holdings', label: 'Holdings', icon: Wallet },
          { id: 'watchlist', label: 'Watchlist', icon: Eye },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
                : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Asset Allocation */}
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Asset Allocation</h3>
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <div className="relative w-64 h-64 mx-auto">
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-green-500 to-purple-500 flex items-center justify-center">
                    <div className="w-32 h-32 bg-zinc-900 rounded-full flex items-center justify-center">
                      <PieChart className="w-8 h-8 text-zinc-400" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {portfolio.tokens.map((token, idx) => (
                  <div key={token.symbol} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${
                        idx === 0 ? 'from-green-500 to-green-600' :
                        idx === 1 ? 'from-blue-500 to-blue-600' :
                        idx === 2 ? 'from-purple-500 to-purple-600' :
                        idx === 3 ? 'from-yellow-500 to-yellow-600' :
                        'from-red-500 to-red-600'
                      }`} />
                      <span className="text-white font-medium">{token.symbol}</span>
                    </div>
                    <span className="text-zinc-300">{token.allocation}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Performance */}
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Performance</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { period: '24h', value: portfolio.changePercent, color: portfolio.changePercent >= 0 ? 'text-green-400' : 'text-red-400' },
                { period: '7d', value: 5.67, color: 'text-green-400' },
                { period: '30d', value: -2.34, color: 'text-red-400' },
                { period: '90d', value: 12.45, color: 'text-green-400' },
                { period: '1y', value: 67.89, color: 'text-green-400' },
                { period: 'All Time', value: 156.78, color: 'text-green-400' }
              ].map((perf, idx) => (
                <div key={idx} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <div className="text-zinc-400 text-sm mb-1">{perf.period}</div>
                  <div className={`text-lg font-bold ${perf.color}`}>
                    {perf.value >= 0 ? '+' : ''}{perf.value.toFixed(2)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Holdings Tab */}
      {activeTab === 'holdings' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Token Holdings</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="text-left text-zinc-400 text-sm font-medium py-3 px-2">Token</th>
                    <th className="text-right text-zinc-400 text-sm font-medium py-3 px-2">Amount</th>
                    <th className="text-right text-zinc-400 text-sm font-medium py-3 px-2">Price</th>
                    <th className="text-right text-zinc-400 text-sm font-medium py-3 px-2">Value</th>
                    <th className="text-right text-zinc-400 text-sm font-medium py-3 px-2">24h Change</th>
                    <th className="text-right text-zinc-400 text-sm font-medium py-3 px-2">Allocation</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.tokens.map((token) => (
                    <tr key={token.symbol} className="border-b border-zinc-800 hover:bg-zinc-800">
                      <td className="py-4 px-2">
                        <div>
                          <div className="text-white font-medium">{token.symbol}</div>
                          <div className="text-zinc-400 text-sm">{token.name}</div>
                        </div>
                      </td>
                      <td className="text-right py-4 px-2">
                        <div className="text-white">{token.amount.toLocaleString()}</div>
                      </td>
                      <td className="text-right py-4 px-2">
                        <div className="text-white">{formatCurrency(token.price)}</div>
                      </td>
                      <td className="text-right py-4 px-2">
                        <div className="text-white font-medium">{formatCurrency(token.value)}</div>
                      </td>
                      <td className="text-right py-4 px-2">
                        <div className={`flex items-center justify-end space-x-1 ${token.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {token.changePercent >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          <span>{Math.abs(token.changePercent).toFixed(2)}%</span>
                        </div>
                      </td>
                      <td className="text-right py-4 px-2">
                        <div className="text-zinc-300">{token.allocation}%</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Watchlist Tab */}
      {activeTab === 'watchlist' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Watchlist</h3>
              <button
                onClick={addToWatchlist}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Token</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="text-left text-zinc-400 text-sm font-medium py-3 px-2">Token</th>
                    <th className="text-right text-zinc-400 text-sm font-medium py-3 px-2">Price</th>
                    <th className="text-right text-zinc-400 text-sm font-medium py-3 px-2">24h Change</th>
                    <th className="text-right text-zinc-400 text-sm font-medium py-3 px-2">Market Cap</th>
                    <th className="text-right text-zinc-400 text-sm font-medium py-3 px-2">Volume</th>
                    <th className="text-right text-zinc-400 text-sm font-medium py-3 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {watchlist.map((item) => (
                    <tr key={item.symbol} className="border-b border-zinc-800 hover:bg-zinc-800">
                      <td className="py-4 px-2">
                        <div>
                          <div className="text-white font-medium">{item.symbol}</div>
                          <div className="text-zinc-400 text-sm">{item.name}</div>
                        </div>
                      </td>
                      <td className="text-right py-4 px-2">
                        <div className="text-white">{formatCurrency(item.price)}</div>
                      </td>
                      <td className="text-right py-4 px-2">
                        <div className={`flex items-center justify-end space-x-1 ${item.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {item.changePercent >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          <span>{Math.abs(item.changePercent).toFixed(2)}%</span>
                        </div>
                      </td>
                      <td className="text-right py-4 px-2">
                        <div className="text-zinc-300">{formatNumber(item.marketCap)}</div>
                      </td>
                      <td className="text-right py-4 px-2">
                        <div className="text-zinc-300">{formatNumber(item.volume24h)}</div>
                      </td>
                      <td className="text-right py-4 px-2">
                        <button
                          onClick={() => removeFromWatchlist(item.symbol)}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Portfolio Analytics</h3>
            
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 text-lg">Advanced Analytics</p>
              <p className="text-zinc-500 text-sm mt-2 max-w-md mx-auto">
                Detailed performance metrics, risk analysis, correlation data, and portfolio optimization suggestions.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Development Status */}
      <div className="mt-8 bg-green-900 bg-opacity-30 border border-green-700 rounded-lg p-4">
        <h4 className="text-green-300 font-medium mb-2">🚧 Development Status</h4>
        <p className="text-green-200 text-sm mb-2">
          Portfolio Tracker is in active development. Real-time price feeds and advanced analytics coming soon.
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">✅ Portfolio Overview</span>
          <span className="bg-yellow-900 bg-opacity-50 text-yellow-300 px-2 py-1 rounded">🚧 Live Price Feeds</span>
          <span className="bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded">🔜 Risk Analytics</span>
          <span className="bg-purple-900 bg-opacity-50 text-purple-300 px-2 py-1 rounded">🔜 Portfolio Optimization</span>
        </div>
      </div>
    </div>
  )
}
