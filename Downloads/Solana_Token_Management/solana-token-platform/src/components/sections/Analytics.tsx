'use client'

import { useState } from 'react'
import { BarChart3, TrendingUp, DollarSign, Users, Eye, Activity, Calendar, Target, Zap, PieChart } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'

interface AnalyticsData {
  tokenPerformance: {
    price: string
    change24h: string
    volume24h: string
    marketCap: string
    holders: string
    transactions: string
  }
  portfolioMetrics: {
    totalValue: string
    pnl: string
    winRate: string
    bestPerformer: string
    worstPerformer: string
    diversification: string
  }
}

export default function Analytics() {
  const { publicKey } = useWallet()
  const [activeTab, setActiveTab] = useState<'overview' | 'tokens' | 'portfolio' | 'trading' | 'defi'>('overview')
  const [timeframe, setTimeframe] = useState<'1H' | '24H' | '7D' | '30D' | '1Y'>('24H')

  const mockAnalytics: AnalyticsData = {
    tokenPerformance: {
      price: '$0.0234',
      change24h: '+145.7%',
      volume24h: '$2.4M',
      marketCap: '$234M',
      holders: '12,453',
      transactions: '45,782'
    },
    portfolioMetrics: {
      totalValue: '$156,789',
      pnl: '+$45,234',
      winRate: '67.8%',
      bestPerformer: 'BONK (+234%)',
      worstPerformer: 'SAMO (-12%)',
      diversification: 'Good (15 tokens)'
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Analytics & Insights
        </h1>
        <p className="text-zinc-400">
          Comprehensive analytics for your tokens, portfolio, and DeFi activities
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-zinc-900 rounded-xl p-1">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'tokens', label: 'Token Analytics', icon: Target },
          { id: 'portfolio', label: 'Portfolio', icon: PieChart },
          { id: 'trading', label: 'Trading History', icon: Activity },
          { id: 'defi', label: 'DeFi Positions', icon: Zap }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Timeframe Selector */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-zinc-400" />
          <span className="text-zinc-300 text-sm">Timeframe:</span>
          <div className="flex space-x-1 bg-zinc-900 rounded-lg p-1">
            {['1H', '24H', '7D', '30D', '1Y'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period as any)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  timeframe === period
                    ? 'bg-blue-600 text-white'
                    : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
          Export Data
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Portfolio Value', value: mockAnalytics.portfolioMetrics.totalValue, change: '+12.4%', icon: DollarSign, color: 'text-green-400' },
              { label: 'Total P&L', value: mockAnalytics.portfolioMetrics.pnl, change: '+8.7%', icon: TrendingUp, color: 'text-green-400' },
              { label: 'Active Tokens', value: '23', change: '+3', icon: Target, color: 'text-blue-400' },
              { label: 'Win Rate', value: mockAnalytics.portfolioMetrics.winRate, change: '+5.2%', icon: Activity, color: 'text-purple-400' },
              { label: 'Total Trades', value: '1,247', change: '+23', icon: BarChart3, color: 'text-orange-400' },
              { label: 'Unique Wallets', value: '4', change: 'No change', icon: Users, color: 'text-cyan-400' }
            ].map((metric, index) => (
              <div key={index} className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-4">
                <div className="flex items-center justify-between mb-2">
                  <metric.icon className={`w-5 h-5 ${metric.color}`} />
                  <span className={`text-xs font-medium ${metric.change.startsWith('+') ? 'text-green-400' : metric.change.startsWith('-') ? 'text-red-400' : 'text-zinc-400'}`}>
                    {metric.change}
                  </span>
                </div>
                <div className="text-lg font-bold text-white">{metric.value}</div>
                <div className="text-zinc-400 text-xs">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Portfolio Performance</h3>
              <div className="h-64 bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-zinc-600 mx-auto mb-2" />
                  <p className="text-zinc-400">Portfolio chart visualization</p>
                  <p className="text-zinc-500 text-sm">Real-time data integration coming soon</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Asset Allocation</h3>
              <div className="h-64 bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700">
                <div className="text-center">
                  <PieChart className="w-12 h-12 text-zinc-600 mx-auto mb-2" />
                  <p className="text-zinc-400">Asset allocation chart</p>
                  <p className="text-zinc-500 text-sm">Interactive pie chart coming soon</p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Performers */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Top Performers</h3>
              <div className="space-y-3">
                {[
                  { token: 'BONK', change: '+234.7%', value: '$12,345', color: 'text-green-400' },
                  { token: 'MYRO', change: '+189.3%', value: '$8,967', color: 'text-green-400' },
                  { token: 'SOL', change: '+45.2%', value: '$23,456', color: 'text-green-400' },
                  { token: 'RAY', change: '+34.8%', value: '$5,678', color: 'text-green-400' }
                ].map((token, index) => (
                  <div key={index} className="flex items-center justify-between py-2 px-3 bg-zinc-800 rounded-lg border border-zinc-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{token.token.slice(0, 2)}</span>
                      </div>
                      <span className="text-white font-medium">{token.token}</span>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${token.color}`}>{token.change}</div>
                      <div className="text-zinc-400 text-sm">{token.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activities</h3>
              <div className="space-y-3">
                {[
                  { action: 'Token Swap', details: 'SOL → BONK', time: '2 mins ago', status: 'Success' },
                  { action: 'Add Liquidity', details: 'RAY/SOL Pool', time: '15 mins ago', status: 'Success' },
                  { action: 'Token Created', details: 'MYTOKEN Launch', time: '1 hour ago', status: 'Success' },
                  { action: 'Withdraw', details: 'Remove USDC LP', time: '3 hours ago', status: 'Success' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2 px-3 bg-zinc-800 rounded-lg border border-zinc-700">
                    <div>
                      <div className="text-white font-medium text-sm">{activity.action}</div>
                      <div className="text-zinc-400 text-xs">{activity.details}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 text-xs font-medium">{activity.status}</div>
                      <div className="text-zinc-400 text-xs">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Token Analytics Tab */}
      {activeTab === 'tokens' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Token Performance Analysis</h3>
            
            <div className="grid lg:grid-cols-3 gap-6 mb-6">
              {[
                { label: 'Price', value: mockAnalytics.tokenPerformance.price, change: mockAnalytics.tokenPerformance.change24h, icon: DollarSign },
                { label: '24h Volume', value: mockAnalytics.tokenPerformance.volume24h, change: '+23.4%', icon: Activity },
                { label: 'Market Cap', value: mockAnalytics.tokenPerformance.marketCap, change: '+145.7%', icon: TrendingUp }
              ].map((metric, index) => (
                <div key={index} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <div className="flex items-center justify-between mb-2">
                    <metric.icon className="w-5 h-5 text-blue-400" />
                    <span className={`text-xs font-medium ${metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {metric.change}
                    </span>
                  </div>
                  <div className="text-xl font-bold text-white">{metric.value}</div>
                  <div className="text-zinc-400 text-sm">{metric.label}</div>
                </div>
              ))}
            </div>

            <div className="h-80 bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-400 text-lg">Token Price Chart</p>
                <p className="text-zinc-500 text-sm mt-2">Advanced charting with technical indicators coming soon</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Tab */}
      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Portfolio Overview</h3>
            
            <div className="text-center py-12">
              <PieChart className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 text-lg">Portfolio Analysis</p>
              <p className="text-zinc-500 text-sm mt-2 max-w-md mx-auto">
                Detailed portfolio breakdown, allocation analysis, and performance metrics coming soon.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Trading History Tab */}
      {activeTab === 'trading' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Trading History & Performance</h3>
            
            <div className="text-center py-12">
              <Activity className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 text-lg">Trading Analytics</p>
              <p className="text-zinc-500 text-sm mt-2 max-w-md mx-auto">
                Comprehensive trading history, P&L analysis, and strategy performance metrics coming soon.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* DeFi Positions Tab */}
      {activeTab === 'defi' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">DeFi Positions & Yields</h3>
            
            <div className="text-center py-12">
              <Zap className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 text-lg">DeFi Analytics</p>
              <p className="text-zinc-500 text-sm mt-2 max-w-md mx-auto">
                Track liquidity positions, staking rewards, lending protocols, and yield farming performance.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Development Status */}
      <div className="mt-8 bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded-lg p-4">
        <h4 className="text-yellow-300 font-medium mb-2">🚧 Development Status</h4>
        <p className="text-yellow-200 text-sm mb-2">
          Analytics & Insights is in active development. Comprehensive data visualization and reporting platform.
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">✅ UI Framework Complete</span>
          <span className="bg-yellow-900 bg-opacity-50 text-yellow-300 px-2 py-1 rounded">🚧 Data Integration</span>
          <span className="bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded">🔜 Chart Libraries</span>
          <span className="bg-purple-900 bg-opacity-50 text-purple-300 px-2 py-1 rounded">🔜 Real-time Updates</span>
        </div>
      </div>
    </div>
  )
}
