'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, Square, Activity, TrendingUp, Clock, DollarSign } from 'lucide-react'
import { testnetService } from '@/lib/services/testnet'

interface VolumeConfig {
  tokenAddress: string
  baseTokenAddress: string
  targetVolume: number
  duration: number
  pattern: 'organic' | 'burst' | 'steady' | 'pump'
  minTradeSize: number
  maxTradeSize: number
  frequency: number
  slippage: number
}

interface VolumeSession {
  id: string
  config: VolumeConfig
  status: 'idle' | 'running' | 'paused' | 'completed' | 'error'
  startTime?: string
  endTime?: string
  currentVolume: number
  targetVolume: number
  tradesExecuted: number
  averageTradeSize: number
  errors: string[]
}

export default function VolumeBot() {
  const [config, setConfig] = useState<VolumeConfig>({
    tokenAddress: '',
    baseTokenAddress: 'SOL',
    targetVolume: 10,
    duration: 60,
    pattern: 'organic',
    minTradeSize: 0.1,
    maxTradeSize: 2.0,
    frequency: 2,
    slippage: 1
  })

  const [activeSessions, setActiveSessions] = useState<VolumeSession[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch active sessions
  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/bots/volume')
      const data = await response.json()
      if (data.success) {
        setActiveSessions(data.sessions || [])
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error)
    }
  }

  // Start volume bot
  const startVolumeBot = async () => {
    if (!config.tokenAddress) {
      setError('Token address is required')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/bots/volume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'start',
          config
        })
      })

      const data = await response.json()
      
      if (data.success) {
        await fetchSessions()
        // Reset form
        setConfig(prev => ({ ...prev, tokenAddress: '' }))
      } else {
        setError(data.message || 'Failed to start volume bot')
      }
    } catch (error) {
      setError('Failed to start volume bot')
    } finally {
      setIsLoading(false)
    }
  }

  // Control session (pause/resume/stop)
  const controlSession = async (sessionId: string, action: 'pause' | 'resume' | 'stop') => {
    try {
      const response = await fetch('/api/bots/volume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          sessionId
        })
      })

      const data = await response.json()
      if (data.success) {
        await fetchSessions()
      }
    } catch (error) {
      console.error(`Failed to ${action} session:`, error)
    }
  }

  // Auto-refresh sessions
  useEffect(() => {
    fetchSessions()
    const interval = setInterval(fetchSessions, 3000) // Refresh every 3 seconds
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-green-400 bg-green-500/10'
      case 'paused': return 'text-yellow-400 bg-yellow-500/10'
      case 'completed': return 'text-blue-400 bg-blue-500/10'
      case 'error': return 'text-red-400 bg-red-500/10'
      default: return 'text-gray-400 bg-gray-500/10'
    }
  }

  const getPatternIcon = (pattern: string) => {
    switch (pattern) {
      case 'organic': return '🌱'
      case 'burst': return '💥'
      case 'steady': return '📊'
      case 'pump': return '🚀'
      default: return '📈'
    }
  }

  const formatTime = (dateString?: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleTimeString()
  }

  const calculateProgress = (session: VolumeSession) => {
    return Math.min((session.currentVolume / session.targetVolume) * 100, 100)
  }

  const isTestMode = testnetService.isTestMode()
  const networkInfo = testnetService.getNetworkInfo()

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Activity className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Volume Bot</h2>
            <p className="text-sm text-gray-400">Simulate trading activity and generate volume</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          isTestMode ? 'bg-blue-500/10 text-blue-400' : 'bg-green-500/10 text-green-400'
        }`}>
          {networkInfo.network.toUpperCase()} {isTestMode && '(FREE)'}
        </div>
      </div>

      {/* Configuration Form */}
      <div className="mb-8 p-6 bg-gray-800/30 rounded-lg border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Configure Volume Bot</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Token Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Token Address *</label>
            <input
              type="text"
              value={config.tokenAddress}
              onChange={(e) => setConfig(prev => ({ ...prev, tokenAddress: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              placeholder="Enter token contract address..."
            />
          </div>

          {/* Target Volume */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Target Volume ({config.baseTokenAddress})
            </label>
            <input
              type="number"
              value={config.targetVolume}
              onChange={(e) => setConfig(prev => ({ ...prev, targetVolume: parseFloat(e.target.value) || 0 }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
              min="0.1"
              step="0.1"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Duration (minutes)</label>
            <input
              type="number"
              value={config.duration}
              onChange={(e) => setConfig(prev => ({ ...prev, duration: parseInt(e.target.value) || 60 }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
              min="1"
            />
          </div>

          {/* Pattern */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Trading Pattern</label>
            <select
              value={config.pattern}
              onChange={(e) => setConfig(prev => ({ ...prev, pattern: e.target.value as any }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
            >
              <option value="organic">🌱 Organic (Natural trading)</option>
              <option value="burst">💥 Burst (Sudden volume spikes)</option>
              <option value="steady">📊 Steady (Consistent volume)</option>
              <option value="pump">🚀 Pump (Increasing activity)</option>
            </select>
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Frequency (trades/min)</label>
            <input
              type="number"
              value={config.frequency}
              onChange={(e) => setConfig(prev => ({ ...prev, frequency: parseInt(e.target.value) || 2 }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
              min="1"
              max="60"
            />
          </div>

          {/* Trade Size Range */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Min Trade Size</label>
            <input
              type="number"
              value={config.minTradeSize}
              onChange={(e) => setConfig(prev => ({ ...prev, minTradeSize: parseFloat(e.target.value) || 0.1 }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
              min="0.01"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Max Trade Size</label>
            <input
              type="number"
              value={config.maxTradeSize}
              onChange={(e) => setConfig(prev => ({ ...prev, maxTradeSize: parseFloat(e.target.value) || 2 }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
              min="0.01"
              step="0.01"
            />
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Start Button */}
        <div className="mt-6">
          <button
            onClick={startVolumeBot}
            disabled={isLoading || !config.tokenAddress}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Starting...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start Volume Bot
                {isTestMode && <span className="text-xs opacity-75">(FREE)</span>}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Active Sessions */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Active Sessions ({activeSessions.length})
        </h3>

        {activeSessions.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No active volume sessions</p>
            <p className="text-sm">Start a volume bot to generate trading activity</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeSessions.map((session) => (
              <div key={session.id} className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                      {session.status.toUpperCase()}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      {getPatternIcon(session.config.pattern)}
                      <span>{session.config.pattern}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {session.config.tokenAddress.slice(0, 8)}...
                    </div>
                  </div>
                  
                  {/* Controls */}
                  <div className="flex gap-2">
                    {session.status === 'running' && (
                      <button
                        onClick={() => controlSession(session.id, 'pause')}
                        className="p-2 text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-colors"
                        title="Pause"
                      >
                        <Pause className="w-4 h-4" />
                      </button>
                    )}
                    {session.status === 'paused' && (
                      <button
                        onClick={() => controlSession(session.id, 'resume')}
                        className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"
                        title="Resume"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                    )}
                    {(session.status === 'running' || session.status === 'paused') && (
                      <button
                        onClick={() => controlSession(session.id, 'stop')}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Stop"
                      >
                        <Square className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-300 mb-1">
                    <span>Volume Progress</span>
                    <span>{session.currentVolume.toFixed(2)} / {session.targetVolume} {session.config.baseTokenAddress}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${calculateProgress(session)}%` }}
                    />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <div>
                      <p className="text-gray-400">Trades</p>
                      <p className="text-white font-medium">{session.tradesExecuted}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <div>
                      <p className="text-gray-400">Avg Size</p>
                      <p className="text-white font-medium">{session.averageTradeSize.toFixed(3)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <div>
                      <p className="text-gray-400">Started</p>
                      <p className="text-white font-medium">{formatTime(session.startTime)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-yellow-400" />
                    <div>
                      <p className="text-gray-400">Progress</p>
                      <p className="text-white font-medium">{calculateProgress(session).toFixed(1)}%</p>
                    </div>
                  </div>
                </div>

                {/* Errors */}
                {session.errors.length > 0 && (
                  <div className="mt-3 p-2 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-300">
                    <p className="font-medium">Recent Errors:</p>
                    {session.errors.slice(-2).map((error, index) => (
                      <p key={index} className="opacity-75">{error}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
