'use client'

import { useState, useEffect } from 'react'
import { Wallet, Play, Download, Clock, Target, Key, FileText, Copy } from 'lucide-react'
import { testnetService } from '@/lib/services/testnet'

interface WalletConfig {
  count: number
  format: 'json' | 'csv' | 'txt'
  includePrivateKeys: boolean
  walletPrefix: string
  generateMnemonics: boolean
}

interface WalletSession {
  id: string
  config: WalletConfig
  status: 'idle' | 'generating' | 'completed' | 'error'
  startTime?: string
  endTime?: string
  walletsGenerated: number
  targetCount: number
  errors: string[]
}

export default function BulkWalletGenerator() {
  const [config, setConfig] = useState<WalletConfig>({
    count: 100,
    format: 'json',
    includePrivateKeys: true,
    walletPrefix: '',
    generateMnemonics: false
  })

  const [activeSessions, setActiveSessions] = useState<WalletSession[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch active sessions
  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/bots/wallet-generator')
      const data = await response.json()
      if (data.success) {
        setActiveSessions(data.sessions || [])
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error)
    }
  }

  // Start wallet generation
  const startGeneration = async () => {
    if (config.count < 1 || config.count > 100000) {
      setError('Wallet count must be between 1 and 100,000')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/bots/wallet-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate',
          config
        })
      })

      const data = await response.json()
      
      if (data.success) {
        await fetchSessions()
        // Reset count to default
        setConfig(prev => ({ ...prev, count: 100 }))
      } else {
        setError(data.message || 'Failed to start wallet generation')
      }
    } catch (error) {
      setError('Failed to start wallet generation')
    } finally {
      setIsLoading(false)
    }
  }

  // Export wallets
  const exportWallets = async (sessionId: string, format: 'json' | 'csv' | 'txt') => {
    try {
      const response = await fetch(`/api/bots/wallet-generator?sessionId=${sessionId}&action=export&format=${format}`)
      
      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `wallets_${sessionId}.${format}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Failed to export wallets:', error)
    }
  }

  // Delete session
  const deleteSession = async (sessionId: string) => {
    try {
      const response = await fetch('/api/bots/wallet-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          sessionId
        })
      })

      if (response.ok) {
        await fetchSessions()
      }
    } catch (error) {
      console.error('Failed to delete session:', error)
    }
  }

  // Copy session ID to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  // Auto-refresh sessions
  useEffect(() => {
    fetchSessions()
    const interval = setInterval(fetchSessions, 2000) // Refresh every 2 seconds
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'generating': return 'text-yellow-400 bg-yellow-500/10'
      case 'completed': return 'text-green-400 bg-green-500/10'
      case 'error': return 'text-red-400 bg-red-500/10'
      default: return 'text-gray-400 bg-gray-500/10'
    }
  }

  const formatTime = (dateString?: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleTimeString()
  }

  const calculateProgress = (session: WalletSession) => {
    return Math.min((session.walletsGenerated / session.targetCount) * 100, 100)
  }

  const formatDuration = (startTime?: string, endTime?: string) => {
    if (!startTime) return 'N/A'
    const start = new Date(startTime).getTime()
    const end = endTime ? new Date(endTime).getTime() : Date.now()
    const duration = Math.floor((end - start) / 1000)
    
    if (duration < 60) return `${duration}s`
    if (duration < 3600) return `${Math.floor(duration / 60)}m ${duration % 60}s`
    return `${Math.floor(duration / 3600)}h ${Math.floor((duration % 3600) / 60)}m`
  }

  const isTestMode = testnetService.isTestMode()
  const networkInfo = testnetService.getNetworkInfo()

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <Wallet className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Bulk Wallet Generator</h2>
            <p className="text-sm text-gray-400">Generate thousands of wallets with private keys</p>
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
        <h3 className="text-lg font-semibold text-white mb-4">Generation Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Wallet Count */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Wallet Count *</label>
            <input
              type="number"
              value={config.count}
              onChange={(e) => setConfig(prev => ({ ...prev, count: parseInt(e.target.value) || 1 }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              min="1"
              max="100000"
              placeholder="100"
            />
            <p className="text-xs text-gray-500 mt-1">Maximum: 100,000 wallets</p>
          </div>

          {/* Export Format */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Export Format</label>
            <select
              value={config.format}
              onChange={(e) => setConfig(prev => ({ ...prev, format: e.target.value as any }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="json">📄 JSON (Structured data)</option>
              <option value="csv">📊 CSV (Spreadsheet format)</option>
              <option value="txt">📝 TXT (Plain text list)</option>
            </select>
          </div>

          {/* Wallet Prefix */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Wallet Prefix (Optional)</label>
            <input
              type="text"
              value={config.walletPrefix}
              onChange={(e) => setConfig(prev => ({ ...prev, walletPrefix: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
              placeholder="e.g., PROJECT_2024"
              maxLength={20}
            />
          </div>

          {/* Options */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">Additional Options</label>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="includePrivateKeys"
                checked={config.includePrivateKeys}
                onChange={(e) => setConfig(prev => ({ ...prev, includePrivateKeys: e.target.checked }))}
                className="w-4 h-4 text-indigo-600 bg-gray-800 border-gray-600 rounded focus:ring-indigo-500 focus:ring-2"
              />
              <label htmlFor="includePrivateKeys" className="text-sm text-gray-300 flex items-center gap-1">
                <Key className="w-3 h-3" />
                Include Private Keys
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="generateMnemonics"
                checked={config.generateMnemonics}
                onChange={(e) => setConfig(prev => ({ ...prev, generateMnemonics: e.target.checked }))}
                className="w-4 h-4 text-indigo-600 bg-gray-800 border-gray-600 rounded focus:ring-indigo-500 focus:ring-2"
              />
              <label htmlFor="generateMnemonics" className="text-sm text-gray-300 flex items-center gap-1">
                <FileText className="w-3 h-3" />
                Generate Seed Phrases
              </label>
            </div>
          </div>
        </div>

        {/* Security Warning */}
        {config.includePrivateKeys && (
          <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-300 text-sm">
            <p className="font-medium">⚠️ Security Warning</p>
            <p>Private keys will be included in the export file. Store securely and never share publicly.</p>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Generate Button */}
        <div className="mt-6">
          <button
            onClick={startGeneration}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Generating...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Generate {config.count.toLocaleString()} Wallets
                {isTestMode && <span className="text-xs opacity-75">(FREE)</span>}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Active Sessions */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Generation Sessions ({activeSessions.length})
        </h3>

        {activeSessions.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Wallet className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No wallet generation sessions</p>
            <p className="text-sm">Start generating wallets to see them here</p>
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
                    <div className="text-sm text-gray-300">
                      {session.config.count.toLocaleString()} wallets
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <button
                        onClick={() => copyToClipboard(session.id)}
                        className="hover:text-white transition-colors"
                        title="Copy Session ID"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      {session.id.slice(0, 12)}...
                    </div>
                  </div>
                  
                  {/* Controls */}
                  <div className="flex gap-2">
                    {session.status === 'completed' && (
                      <>
                        <button
                          onClick={() => exportWallets(session.id, 'json')}
                          className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"
                          title="Export JSON"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => exportWallets(session.id, 'csv')}
                          className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                          title="Export CSV"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => deleteSession(session.id)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete Session"
                    >
                      <span className="text-xs">🗑️</span>
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-300 mb-1">
                    <span>Generation Progress</span>
                    <span>{session.walletsGenerated.toLocaleString()} / {session.targetCount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${calculateProgress(session)}%` }}
                    />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-indigo-400" />
                    <div>
                      <p className="text-gray-400">Progress</p>
                      <p className="text-white font-medium">{calculateProgress(session).toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <div>
                      <p className="text-gray-400">Duration</p>
                      <p className="text-white font-medium">{formatDuration(session.startTime, session.endTime)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-green-400" />
                    <div>
                      <p className="text-gray-400">Format</p>
                      <p className="text-white font-medium">{session.config.format.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-yellow-400" />
                    <div>
                      <p className="text-gray-400">Private Keys</p>
                      <p className="text-white font-medium">{session.config.includePrivateKeys ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                {session.config.walletPrefix && (
                  <div className="mt-3 p-2 bg-indigo-500/5 border border-indigo-500/10 rounded text-xs text-indigo-300">
                    <p className="font-medium">Prefix: {session.config.walletPrefix}</p>
                  </div>
                )}

                {/* Errors */}
                {session.errors.length > 0 && (
                  <div className="mt-3 p-2 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-300">
                    <p className="font-medium">Errors:</p>
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
