'use client'

import { useState, useEffect } from 'react'
import { Coins, Play, Pause, Square, Upload, Download, Target, Clock, CheckCircle, XCircle } from 'lucide-react'
import { testnetService } from '@/lib/services/testnet'

interface TokenDistributionConfig {
  sourcePrivateKey: string
  tokenMintAddress: string
  targetWallets: string[]
  amountPerWallet: number
  distributionPattern: 'equal' | 'random' | 'weighted' | 'custom'
  minAmount: number
  maxAmount: number
  batchSize: number
  delayBetweenBatches: number
  decimals: number
}

interface TokenDistributionSession {
  id: string
  config: TokenDistributionConfig
  status: 'idle' | 'running' | 'paused' | 'completed' | 'error'
  startTime?: string
  endTime?: string
  walletsProcessed: number
  totalWallets: number
  totalTokensDistributed: number
  successfulTransactions: number
  failedTransactions: number
  errors: string[]
}

export default function TokenDistribution() {
  const [config, setConfig] = useState<TokenDistributionConfig>({
    sourcePrivateKey: '',
    tokenMintAddress: '',
    targetWallets: [],
    amountPerWallet: 1000,
    distributionPattern: 'equal',
    minAmount: 500,
    maxAmount: 2000,
    batchSize: 10,
    delayBetweenBatches: 2,
    decimals: 9
  })

  const [walletInput, setWalletInput] = useState('')
  const [activeSessions, setActiveSessions] = useState<TokenDistributionSession[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch active sessions
  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/bots/token-distribution')
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

  // Start token distribution
  const startDistribution = async () => {
    if (!config.sourcePrivateKey) {
      setError('Source private key is required')
      return
    }

    if (!config.tokenMintAddress) {
      setError('Token mint address is required')
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

    if (config.decimals < 0 || config.decimals > 18) {
      setError('Decimals must be between 0 and 18')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/bots/token-distribution', {
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
        setConfig(prev => ({ 
          ...prev, 
          sourcePrivateKey: '', 
          tokenMintAddress: '',
          targetWallets: [] 
        }))
      } else {
        setError(data.message || 'Failed to start token distribution')
      }
    } catch (error) {
      setError('Failed to start token distribution')
    } finally {
      setIsLoading(false)
    }
  }

  // Control session
  const controlSession = async (sessionId: string, action: 'pause' | 'resume' | 'stop') => {
    try {
      const response = await fetch('/api/bots/token-distribution', {
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
      const response = await fetch(`/api/bots/token-distribution?sessionId=${sessionId}&action=export`)
      
      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `token_distribution_${sessionId}.csv`
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

  const calculateProgress = (session: TokenDistributionSession) => {
    return Math.min((session.walletsProcessed / session.totalWallets) * 100, 100)
  }

  const getPatternIcon = (pattern: string) => {
    switch (pattern) {
      case 'equal': return '⚖️'
      case 'random': return '🎲'
      case 'weighted': return '📊'
      case 'custom': return '🎯'
      default: return '🪙'
    }
  }

  const isTestMode = testnetService.isTestMode()
  const networkInfo = testnetService.getNetworkInfo()

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/20 rounded-lg">
            <Coins className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Token Distribution</h2>
            <p className="text-sm text-gray-400">Distribute SPL tokens to multiple wallets simultaneously</p>
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
        <h3 className="text-lg font-semibold text-white mb-4">Token Distribution Configuration</h3>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Source Private Key */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Source Wallet Private Key *</label>
            <input
              type="password"
              value={config.sourcePrivateKey}
              onChange={(e) => setConfig(prev => ({ ...prev, sourcePrivateKey: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
              placeholder="Enter private key (base64 format)..."
            />
            <p className="text-xs text-gray-500 mt-1">⚠️ This wallet must have the tokens to distribute</p>
          </div>

          {/* Token Mint Address */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Token Mint Address *</label>
            <input
              type="text"
              value={config.tokenMintAddress}
              onChange={(e) => setConfig(prev => ({ ...prev, tokenMintAddress: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
              placeholder="Enter token mint address..."
            />
            <p className="text-xs text-gray-500 mt-1">The contract address of the token to distribute</p>
          </div>

          {/* Target Wallets */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Target Wallets *</label>
            <div className="space-y-2">
              <textarea
                value={walletInput}
                onChange={(e) => setWalletInput(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
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

          {/* Token Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Amount Per Wallet */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Amount Per Wallet</label>
              <input
                type="number"
                value={config.amountPerWallet}
                onChange={(e) => setConfig(prev => ({ ...prev, amountPerWallet: parseFloat(e.target.value) || 0 }))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
                min="0.001"
                step="0.001"
              />
            </div>

            {/* Decimals */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Token Decimals</label>
              <input
                type="number"
                value={config.decimals}
                onChange={(e) => setConfig(prev => ({ ...prev, decimals: parseInt(e.target.value) || 9 }))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
                min="0"
                max="18"
              />
              <p className="text-xs text-gray-500 mt-1">Usually 9 for most tokens</p>
            </div>

            {/* Distribution Pattern */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Distribution Pattern</label>
              <select
                value={config.distributionPattern}
                onChange={(e) => setConfig(prev => ({ ...prev, distributionPattern: e.target.value as any }))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
              >
                <option value="equal">⚖️ Equal (Same amount to all)</option>
                <option value="random">🎲 Random (Random amounts)</option>
                <option value="weighted">📊 Weighted (Pareto distribution)</option>
              </select>
            </div>
          </div>

          {/* Random Range (show only for random pattern) */}
          {config.distributionPattern === 'random' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Min Amount</label>
                <input
                  type="number"
                  value={config.minAmount}
                  onChange={(e) => setConfig(prev => ({ ...prev, minAmount: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  min="0.001"
                  step="0.001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Max Amount</label>
                <input
                  type="number"
                  value={config.maxAmount}
                  onChange={(e) => setConfig(prev => ({ ...prev, maxAmount: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  min="0.001"
                  step="0.001"
                />
              </div>
            </div>
          )}

          {/* Batch Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Batch Size</label>
              <input
                type="number"
                value={config.batchSize}
                onChange={(e) => setConfig(prev => ({ ...prev, batchSize: parseInt(e.target.value) || 10 }))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
                min="1"
                max="50"
              />
              <p className="text-xs text-gray-500 mt-1">Number of transfers per batch</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Delay Between Batches (seconds)</label>
              <input
                type="number"
                value={config.delayBetweenBatches}
                onChange={(e) => setConfig(prev => ({ ...prev, delayBetweenBatches: parseInt(e.target.value) || 2 }))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-500"
                min="1"
                max="60"
              />
            </div>
          </div>

          {/* Total Estimation */}
          {config.targetWallets.length > 0 && (
            <div className="p-3 bg-orange-500/5 border border-orange-500/10 rounded-lg">
              <p className="text-sm text-orange-300">
                <strong>Total Estimation:</strong> {(config.targetWallets.length * config.amountPerWallet).toLocaleString()} tokens 
                to {config.targetWallets.length} wallets
                {config.distributionPattern === 'random' && (
                  <span className="opacity-75"> (±{((config.maxAmount - config.minAmount) * config.targetWallets.length / 4).toLocaleString()} token variance)</span>
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
            disabled={isLoading || !config.sourcePrivateKey || !config.tokenMintAddress || config.targetWallets.length === 0}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Starting...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start Token Distribution
                {isTestMode && <span className="text-xs opacity-75">(FREE)</span>}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Active Sessions */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Coins className="w-5 h-5" />
          Distribution Sessions ({activeSessions.length})
        </h3>

        {activeSessions.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Coins className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No active distribution sessions</p>
            <p className="text-sm">Start a token distribution to see progress here</p>
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
                      {session.config.tokenMintAddress.slice(0, 8)}... • {session.totalWallets} wallets
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
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
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
                    <Coins className="w-4 h-4 text-orange-400" />
                    <div>
                      <p className="text-gray-400">Distributed</p>
                      <p className="text-white font-medium">{session.totalTokensDistributed.toLocaleString()}</p>
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

                {/* Token Info */}
                <div className="mt-3 p-2 bg-orange-500/5 border border-orange-500/10 rounded text-xs text-orange-300">
                  <p className="font-medium">Token: {session.config.tokenMintAddress.slice(0, 12)}... • {session.config.amountPerWallet.toLocaleString()} per wallet • {session.config.decimals} decimals</p>
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
