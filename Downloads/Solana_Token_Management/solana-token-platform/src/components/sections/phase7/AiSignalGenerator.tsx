'use client'

import { useState } from 'react'
import { Activity, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Bell, Brain, Target, Zap, Eye, Settings, Filter } from 'lucide-react'

interface TradingSignal {
  id: string
  token: string
  action: 'buy' | 'sell' | 'hold'
  confidence: number
  price: number
  targetPrice: number
  stopLoss: number
  timeframe: string
  analysis: string
  timestamp: Date
  status: 'active' | 'triggered' | 'expired'
}

interface MarketIndicator {
  name: string
  value: string
  status: 'bullish' | 'bearish' | 'neutral'
  change: number
}

export default function AiSignalGenerator() {
  const [activeTab, setActiveTab] = useState<'signals' | 'analysis' | 'settings' | 'history'>('signals')
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h')
  const [confidenceFilter, setConfidenceFilter] = useState(70)
  const [loading, setLoading] = useState(false)

  // Mock trading signals
  const tradingSignals: TradingSignal[] = [
    {
      id: '1',
      token: 'SOL/USDC',
      action: 'buy',
      confidence: 92,
      price: 98.45,
      targetPrice: 105.20,
      stopLoss: 95.10,
      timeframe: '4H',
      analysis: 'Strong bullish momentum with RSI oversold bounce. Volume surge indicates institutional accumulation.',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      status: 'active'
    },
    {
      id: '2',
      token: 'RAY/SOL',
      action: 'sell',
      confidence: 87,
      price: 2.34,
      targetPrice: 2.15,
      stopLoss: 2.42,
      timeframe: '1H',
      analysis: 'Bearish divergence on MACD. Breaking below key support level with high volume.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: 'active'
    },
    {
      id: '3',
      token: 'ORCA/USDC',
      action: 'buy',
      confidence: 78,
      price: 3.67,
      targetPrice: 4.10,
      stopLoss: 3.45,
      timeframe: '1D',
      analysis: 'Cup and handle pattern completion. Strong fundamentals with upcoming protocol upgrade.',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      status: 'triggered'
    }
  ]

  // Mock market indicators
  const marketIndicators: MarketIndicator[] = [
    { name: 'Fear & Greed Index', value: '67/100', status: 'bullish', change: 5 },
    { name: 'Market Momentum', value: 'Strong', status: 'bullish', change: 12 },
    { name: 'Volatility Index', value: 'Medium', status: 'neutral', change: -3 },
    { name: 'Volume Trend', value: 'Increasing', status: 'bullish', change: 8 },
    { name: 'Sentiment Score', value: '72%', status: 'bullish', change: 4 },
    { name: 'Liquidity Flow', value: 'Positive', status: 'bullish', change: 15 }
  ]

  const generateNewSignals = async () => {
    setLoading(true)
    try {
      console.log('Generating new AI signals...')
      await new Promise(resolve => setTimeout(resolve, 2000))
    } catch (error) {
      console.error('Signal generation failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'buy': return <TrendingUp className="w-4 h-4 text-green-400" />
      case 'sell': return <TrendingDown className="w-4 h-4 text-red-400" />
      default: return <Target className="w-4 h-4 text-yellow-400" />
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'buy': return 'bg-green-900/20 border-green-700 text-green-400'
      case 'sell': return 'bg-red-900/20 border-red-700 text-red-400'
      default: return 'bg-yellow-900/20 border-yellow-700 text-yellow-400'
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400'
    if (confidence >= 80) return 'text-blue-400'
    if (confidence >= 70) return 'text-yellow-400'
    return 'text-orange-400'
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">AI Signal Generator</h1>
            <p className="text-zinc-400">Advanced trading signals powered by machine learning</p>
          </div>
        </div>

        {/* Market Overview */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
            <div className="flex items-center space-x-2 mb-1">
              <Activity className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-zinc-400">Active Signals</span>
            </div>
            <div className="text-xl font-bold text-white">{tradingSignals.filter(s => s.status === 'active').length}</div>
            <div className="text-xs text-blue-400">+2 new today</div>
          </div>
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
            <div className="flex items-center space-x-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm text-zinc-400">Success Rate</span>
            </div>
            <div className="text-xl font-bold text-white">87.3%</div>
            <div className="text-xs text-green-400">Last 30 days</div>
          </div>
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
            <div className="flex items-center space-x-2 mb-1">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-zinc-400">Avg Return</span>
            </div>
            <div className="text-xl font-bold text-white">+12.4%</div>
            <div className="text-xs text-purple-400">Per signal</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 bg-zinc-900 p-1 rounded-lg w-fit">
        {[
          { id: 'signals', label: 'Live Signals', icon: Activity },
          { id: 'analysis', label: 'Market Analysis', icon: TrendingUp },
          { id: 'settings', label: 'Signal Settings', icon: Settings },
          { id: 'history', label: 'Signal History', icon: Eye }
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

      {/* Signals Tab */}
      {activeTab === 'signals' && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex items-center justify-between bg-zinc-900 rounded-xl border border-zinc-800 p-4">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Timeframe</label>
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="bg-zinc-800 border border-zinc-700 rounded px-3 py-1 text-white text-sm focus:border-blue-500 focus:outline-none"
                >
                  <option value="5m">5 minutes</option>
                  <option value="15m">15 minutes</option>
                  <option value="1h">1 hour</option>
                  <option value="4h">4 hours</option>
                  <option value="1d">1 day</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Min Confidence</label>
                <input
                  type="range"
                  min="50"
                  max="95"
                  value={confidenceFilter}
                  onChange={(e) => setConfidenceFilter(Number(e.target.value))}
                  className="w-24"
                />
                <div className="text-xs text-white text-center">{confidenceFilter}%</div>
              </div>
            </div>
            <button
              onClick={generateNewSignals}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
            >
              <Zap className="w-4 h-4" />
              <span>{loading ? 'Generating...' : 'Generate Signals'}</span>
            </button>
          </div>

          {/* Signal Cards */}
          <div className="space-y-4">
            {tradingSignals.filter(signal => signal.confidence >= confidenceFilter).map((signal) => (
              <div key={signal.id} className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getActionColor(signal.action)}`}>
                      {getActionIcon(signal.action)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-white">{signal.token}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${getActionColor(signal.action)}`}>
                          {signal.action}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium bg-zinc-800 ${getConfidenceColor(signal.confidence)}`}>
                          {signal.confidence}% confidence
                        </span>
                      </div>
                      <div className="text-sm text-zinc-400 mt-1">
                        {signal.timeframe} • {signal.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">${signal.price}</div>
                    <div className="text-sm text-zinc-400">Current Price</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-zinc-800 rounded-lg p-3">
                    <div className="text-xs text-zinc-400 mb-1">Target Price</div>
                    <div className="text-lg font-semibold text-green-400">${signal.targetPrice}</div>
                    <div className="text-xs text-green-400">
                      +{(((signal.targetPrice - signal.price) / signal.price) * 100).toFixed(2)}%
                    </div>
                  </div>
                  <div className="bg-zinc-800 rounded-lg p-3">
                    <div className="text-xs text-zinc-400 mb-1">Stop Loss</div>
                    <div className="text-lg font-semibold text-red-400">${signal.stopLoss}</div>
                    <div className="text-xs text-red-400">
                      {(((signal.stopLoss - signal.price) / signal.price) * 100).toFixed(2)}%
                    </div>
                  </div>
                  <div className="bg-zinc-800 rounded-lg p-3">
                    <div className="text-xs text-zinc-400 mb-1">Risk/Reward</div>
                    <div className="text-lg font-semibold text-blue-400">
                      1:{(Math.abs(signal.targetPrice - signal.price) / Math.abs(signal.stopLoss - signal.price)).toFixed(1)}
                    </div>
                    <div className="text-xs text-blue-400">Ratio</div>
                  </div>
                </div>

                <div className="bg-zinc-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-white mb-2">AI Analysis</div>
                  <p className="text-sm text-zinc-300">{signal.analysis}</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    signal.status === 'active' ? 'bg-green-900/20 text-green-400' :
                    signal.status === 'triggered' ? 'bg-blue-900/20 text-blue-400' :
                    'bg-zinc-800 text-zinc-400'
                  }`}>
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      signal.status === 'active' ? 'bg-green-400' :
                      signal.status === 'triggered' ? 'bg-blue-400' :
                      'bg-zinc-400'
                    }`}></div>
                    {signal.status}
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1 rounded text-sm transition-colors">
                      Copy Trade
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                      Set Alert
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analysis Tab */}
      {activeTab === 'analysis' && (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Market Indicators</h3>
              
              <div className="space-y-3">
                {marketIndicators.map((indicator, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-white">{indicator.name}</div>
                      <div className="text-xs text-zinc-400">{indicator.value}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`text-sm font-medium ${
                        indicator.status === 'bullish' ? 'text-green-400' :
                        indicator.status === 'bearish' ? 'text-red-400' :
                        'text-yellow-400'
                      }`}>
                        {indicator.change > 0 ? '+' : ''}{indicator.change}%
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        indicator.status === 'bullish' ? 'bg-green-400' :
                        indicator.status === 'bearish' ? 'bg-red-400' :
                        'bg-yellow-400'
                      }`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">AI Confidence Levels</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-zinc-400">Very High (90-100%)</span>
                    <span className="text-sm text-green-400">23%</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '23%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-zinc-400">High (80-89%)</span>
                    <span className="text-sm text-blue-400">35%</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-zinc-400">Medium (70-79%)</span>
                    <span className="text-sm text-yellow-400">28%</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '28%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-zinc-400">Low (60-69%)</span>
                    <span className="text-sm text-orange-400">14%</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2">
                    <div className="bg-orange-400 h-2 rounded-full" style={{ width: '14%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Performance Analytics</h3>
            
            <div className="space-y-6">
              <div>
                <div className="text-2xl font-bold text-green-400 mb-1">87.3%</div>
                <div className="text-sm text-zinc-400">Signal Success Rate (30 days)</div>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-purple-400 mb-1">+12.4%</div>
                <div className="text-sm text-zinc-400">Average Return per Signal</div>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-blue-400 mb-1">156</div>
                <div className="text-sm text-zinc-400">Total Signals Generated</div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Best Performing Pairs</h4>
                <div className="space-y-2">
                  {[
                    { pair: 'SOL/USDC', success: '94%', profit: '+18.2%' },
                    { pair: 'RAY/SOL', success: '89%', profit: '+15.7%' },
                    { pair: 'ORCA/USDC', success: '85%', profit: '+12.1%' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-white">{item.pair}</span>
                      <div className="flex space-x-2">
                        <span className="text-xs text-green-400">{item.success}</span>
                        <span className="text-xs text-purple-400">{item.profit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl">
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Signal Configuration</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Default Confidence Threshold</label>
                <input
                  type="range"
                  min="60"
                  max="95"
                  defaultValue="75"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-zinc-400 mt-1">
                  <span>60%</span>
                  <span>75%</span>
                  <span>95%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Preferred Timeframes</label>
                <div className="grid grid-cols-3 gap-2">
                  {['5m', '15m', '1h', '4h', '1d', '1w'].map((tf) => (
                    <label key={tf} className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked={tf === '1h' || tf === '4h'} />
                      <span className="text-sm text-white">{tf}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Risk Management</label>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-zinc-400">Max Risk per Signal</span>
                    <select className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-white text-sm">
                      <option>2%</option>
                      <option>5%</option>
                      <option>10%</option>
                    </select>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-zinc-400">Min Risk/Reward Ratio</span>
                    <select className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-white text-sm">
                      <option>1:2</option>
                      <option>1:3</option>
                      <option>1:4</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Notifications</label>
                <div className="space-y-2">
                  {['New high-confidence signals', 'Target price reached', 'Stop loss triggered'].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm text-white">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Signal History</h3>
              <div className="flex space-x-2">
                <select className="bg-zinc-800 border border-zinc-700 rounded px-3 py-1 text-white text-sm">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
                <select className="bg-zinc-800 border border-zinc-700 rounded px-3 py-1 text-white text-sm">
                  <option>All signals</option>
                  <option>Successful only</option>
                  <option>Failed only</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left py-2 text-sm font-medium text-zinc-400">Token</th>
                    <th className="text-left py-2 text-sm font-medium text-zinc-400">Action</th>
                    <th className="text-left py-2 text-sm font-medium text-zinc-400">Entry</th>
                    <th className="text-left py-2 text-sm font-medium text-zinc-400">Target</th>
                    <th className="text-left py-2 text-sm font-medium text-zinc-400">Result</th>
                    <th className="text-left py-2 text-sm font-medium text-zinc-400">P&L</th>
                    <th className="text-left py-2 text-sm font-medium text-zinc-400">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {[
                    { token: 'SOL/USDC', action: 'BUY', entry: 95.20, target: 102.50, result: 'HIT', pnl: '+7.67%', date: '2024-01-15' },
                    { token: 'RAY/SOL', action: 'SELL', entry: 2.45, target: 2.25, result: 'HIT', pnl: '+8.16%', date: '2024-01-14' },
                    { token: 'ORCA/USDC', action: 'BUY', entry: 3.80, target: 4.20, result: 'STOP', pnl: '-3.95%', date: '2024-01-13' }
                  ].map((trade, index) => (
                    <tr key={index}>
                      <td className="py-3 text-sm text-white">{trade.token}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          trade.action === 'BUY' ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'
                        }`}>
                          {trade.action}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-white">${trade.entry}</td>
                      <td className="py-3 text-sm text-white">${trade.target}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          trade.result === 'HIT' ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'
                        }`}>
                          {trade.result}
                        </span>
                      </td>
                      <td className={`py-3 text-sm font-medium ${trade.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                        {trade.pnl}
                      </td>
                      <td className="py-3 text-sm text-zinc-400">{trade.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
