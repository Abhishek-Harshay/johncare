'use client'

import { useState, useEffect } from 'react'
import { DollarSign, Play, Pause, Square, Upload, Download, Target, Clock, CheckCircle, XCircle } from 'lucide-react'
import { testnetService } from '@/lib/services/testnet'

interface DistributionConfig {
  sourcePrivateKey: string
  targetWallets: string[]
  amountPerWallet: number
  distributionPattern: 'equal' | 'random' | 'weighted' | 'custom'
  minAmount: number
  maxAmount: number
  batchSize: number
  delayBetweenBatches: number
}

interface DistributionSession {
  id: string
  config: DistributionConfig
  status: 'idle' | 'running' | 'paused' | 'completed' | 'error'
  startTime?: string
  endTime?: string
  walletsProcessed: number
  totalWallets: number
  totalSolDistributed: number
  successfulTransactions: number
  failedTransactions: number
  errors: string[]
}

export default function SolDistribution() {
  const [config, setConfig] = useState<DistributionConfig>({
    sourcePrivateKey: '',
    targetWallets: [],
    amountPerWallet: 0.1,
    distributionPattern: 'equal',
    minAmount: 0.05,
    maxAmount: 0.2,
    batchSize: 10,
    delayBetweenBatches: 2
  })

  const [walletInput, setWalletInput] = useState('')
  const [activeSessions, setActiveSessions] = useState<DistributionSession[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch active sessions
  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/bots/sol-distribution')
      const data = await response.json()
      if (data.success) {
        setActiveSessions(data.sessions || [])
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error)
    }
  }

  // Parse wallet input
  const parseWalletInput = (input: string): string[] => {
    return input
      .split(/[\n,;]/)
      .map(wallet => wallet.trim())
      .filter(wallet => wallet.length > 0)
  }

  // Load wallets from file
  const loadWalletsFromFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      const wallets = parseWalletInput(content)
      setConfig(prev => ({ ...prev, targetWallets: wallets }))
      setWalletInput(wallets.join('\n'))
    }
    reader.readAsText(file)
  }

  // Start SOL distribution
  const startDistribution = async () => {
    if (!config.sourcePrivateKey) {
      setError('Source private key is required')
      return
    }

    const wallets = parseWalletInput(walletInput)
    if (wallets.length === 0) {
      setError('At least one target wallet is required')
      return
    }

    if (config.amountPerWallet <= 0) {
      setError('Amount per wallet must be greater than 0')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/bots/sol-distribution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'start',
          config: {
            ...config,
            targetWallets: wallets
          }
        })
      })

      const data = await response.json()
      
      if (data.success) {
        await fetchSessions()
        // Reset form
        setWalletInput('')
        setConfig(prev => ({ ...prev, sourcePrivateKey: '', targetWallets: [] }))
      } else {
        setError(data.message || 'Failed to start SOL distribution')
      }
    } catch (error) {
      setError('Failed to start SOL distribution')
    } finally {
      setIsLoading(false)
    }
  }

  // Control session
  const controlSession = async (sessionId: string, action: 'pause' | 'resume' | 'stop') => {
    try {
      const response = await fetch('/api/bots/sol-distribution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          sessionId
        })
      })

      if (response.ok) {
        await fetchSessions()
      }
    } catch (error) {
      console.error(`Failed to ${action} session:`, error)
    }
  }

  // Export transaction history
  const exportTransactions = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/bots/sol-distribution?sessionId=${sessionId}&action=export`)
      
      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `sol_distribution_${sessionId}.csv`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Failed to export transactions:', error)
    }
  }

  // Auto-refresh sessions
  useEffect(() => {
    fetchSessions()
    const interval = setInterval(fetchSessions, 3000)
    return () => clearInterval(interval)
  }, [])

  // Update target wallets when input changes
  useEffect(() => {
    const wallets = parseWalletInput(walletInput)
    setConfig(prev => ({ ...prev, targetWallets: wallets }))
  }, [walletInput])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-green-400 bg-green-500/10'
      case 'paused': return 'text-yellow-400 bg-yellow-500/10'
      case 'completed': return 'text-blue-400 bg-blue-500/10'
      case 'error': return 'text-red-400 bg-red-500/10'
      default: return 'text-gray-400 bg-gray-500/10'
    }
  }

  const formatTime = (dateString?: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleTimeString()
  }

  const calculateProgress = (session: DistributionSession) => {
    return Math.min((session.walletsProcessed / session.totalWallets) * 100, 100)
  }

  const getPatternIcon = (pattern: string) => {
    switch (pattern) {
      case 'equal': return '⚖️'
      case 'random': return '🎲'
      case 'weighted': return '📊'
      case 'custom': return '🎯'
      default: return '💰'
    }
  }

  const isTestMode = testnetService.isTestMode()
  const networkInfo = testnetService.getNetworkInfo()

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <DollarSign className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">SOL Distribution</h2>
            <p className="text-sm text-gray-400">Distribute SOL to multiple wallets simultaneously</p>
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
        <h3 className="text-lg font-semibold text-white mb-4">Distribution Configuration</h3>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Source Private Key */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Source Wallet Private Key *</label>
            <input
              type="password"
              value={config.sourcePrivateKey}
              onChange={(e) => setConfig(prev => ({ ...prev, sourcePrivateKey: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
              placeholder="Enter private key (base64 format)..."
            />
            <p className="text-xs text-gray-500 mt-1">⚠️ This wallet will be used to send SOL. Ensure it has sufficient balance.</p>
          </div>

          {/* Target Wallets */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Target Wallets *</label>
            <div className="space-y-2">
              <textarea
                value={walletInput}
                onChange={(e) => setWalletInput(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                rows={6}
                placeholder="Enter wallet addresses (one per line, or comma/semicolon separated)..."
              />
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept=".txt,.csv"
                  onChange={loadWalletsFromFile}
                  className="hidden"
                  id="wallet-file"
                />
                <label
                  htmlFor="wallet-file"
                  className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg cursor-pointer text-sm transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Load from File
                </label>
                <span className="text-sm text-gray-400">
                  {config.targetWallets.length} wallets loaded
                </span>
              </div>
            </div>
          </div>

          {/* Distribution Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Amount Per Wallet */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Amount Per Wallet (SOL)</label>
              <input
                type="number"
                value={config.amountPerWallet}
                onChange={(e) => setConfig(prev => ({ ...prev, amountPerWallet: parseFloat(e.target.value) || 0 }))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                min="0.001"
                step="0.001"
              />
            </div>

            {/* Distribution Pattern */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Distribution Pattern</label>
              <select
                value={config.distributionPattern}
                onChange={(e) => setConfig(prev => ({ ...prev, distributionPattern: e.target.value as any }))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
              >
                <option value="equal">⚖️ Equal (Same amount to all)</option>
                <option value="random">🎲 Random (Random amounts)</option>
                <option value="weighted">📊 Weighted (Pareto distribution)</option>
              </select>
            </div>

            {/* Random Range (show only for random pattern) */}
            {config.distributionPattern === 'random' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Min Amount (SOL)</label>
                  <input
                    type="number"
                    value={config.minAmount}
                    onChange={(e) => setConfig(prev => ({ ...prev, minAmount: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                    min="0.001"
                    step="0.001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Max Amount (SOL)</label>
                  <input
                    type="number"
                    value={config.maxAmount}
                    onChange={(e) => setConfig(prev => ({ ...prev, maxAmount: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                    min="0.001"
                    step="0.001"
                  />
                </div>
              </>
            )}

            {/* Batch Settings */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Batch Size</label>
              <input
                type="number"
                value={config.batchSize}
                onChange={(e) => setConfig(prev => ({ ...prev, batchSize: parseInt(e.target.value) || 10 }))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                min="1"
                max="50"
              />
              <p className="text-xs text-gray-500 mt-1">Number of transactions per batch</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Delay Between Batches (seconds)</label>
              <input
                type="number"
                value={config.delayBetweenBatches}
                onChange={(e) => setConfig(prev => ({ ...prev, delayBetweenBatches: parseInt(e.target.value) || 2 }))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                min="1"
                max="60"
              />
            </div>
          </div>

          {/* Total Estimation */}
          {config.targetWallets.length > 0 && (
            <div className="p-3 bg-green-500/5 border border-green-500/10 rounded-lg">
              <p className="text-sm text-green-300">
                <strong>Total Estimation:</strong> {(config.targetWallets.length * config.amountPerWallet).toFixed(3)} SOL 
                to {config.targetWallets.length} wallets
                {config.distributionPattern === 'random' && (
                  <span className="opacity-75"> (±{((config.maxAmount - config.minAmount) * config.targetWallets.length / 4).toFixed(3)} SOL variance)</span>
                )}
              </p>
            </div>
          )}
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
            onClick={startDistribution}
            disabled={isLoading || !config.sourcePrivateKey || config.targetWallets.length === 0}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Starting...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start SOL Distribution
                {isTestMode && <span className="text-xs opacity-75">(FREE)</span>}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Active Sessions */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Distribution Sessions ({activeSessions.length})
        </h3>

        {activeSessions.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No active distribution sessions</p>
            <p className="text-sm">Start a SOL distribution to see progress here</p>
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
                      {getPatternIcon(session.config.distributionPattern)}
                      <span>{session.config.distributionPattern}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {session.totalWallets} wallets • {session.config.amountPerWallet} SOL each
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
                    {session.status === 'completed' && (
                      <button
                        onClick={() => exportTransactions(session.id)}
                        className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                        title="Export Transactions"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-300 mb-1">
                    <span>Distribution Progress</span>
                    <span>{session.walletsProcessed} / {session.totalWallets}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${calculateProgress(session)}%` }}
                    />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <div>
                      <p className="text-gray-400">Success</p>
                      <p className="text-white font-medium">{session.successfulTransactions}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400" />
                    <div>
                      <p className="text-gray-400">Failed</p>
                      <p className="text-white font-medium">{session.failedTransactions}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <div>
                      <p className="text-gray-400">Distributed</p>
                      <p className="text-white font-medium">{session.totalSolDistributed.toFixed(3)} SOL</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <div>
                      <p className="text-gray-400">Started</p>
                      <p className="text-white font-medium">{formatTime(session.startTime)}</p>
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
