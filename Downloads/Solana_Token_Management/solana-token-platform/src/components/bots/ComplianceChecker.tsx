'use client'

import { useState, useEffect } from 'react'
import { Shield, Play, Download, AlertTriangle, CheckCircle, XCircle, Scale, TrendingUp, FileText, Users } from 'lucide-react'
import { testnetService } from '@/lib/services/testnet'

interface ComplianceCheckConfig {
  projectName: string
  tokenSymbol: string
  tokenType: 'utility' | 'security' | 'governance' | 'stablecoin' | 'meme' | 'defi'
  targetMarkets: string[]
  fundingMethod: 'ico' | 'ido' | 'private' | 'airdrop' | 'fair-launch' | 'stealth-launch'
  hasUtility: boolean
  isInvestmentContract: boolean
  hasGovernanceRights: boolean
  promisesReturns: boolean
  hasKYC: boolean
  hasAML: boolean
  hasWhitelist: boolean
  hasVesting: boolean
  hasLockup: boolean
  hasWhitepaper: boolean
  hasTerms: boolean
  hasPrivacyPolicy: boolean
  hasRiskDisclosure: boolean
  teamDoxxed: boolean
  hasLegalEntity: boolean
  auditCompleted: boolean
  insuranceCoverage: boolean
}

interface ComplianceSession {
  id: string
  config: ComplianceCheckConfig
  result?: any
  status: 'pending' | 'analyzing' | 'completed' | 'error'
  startTime: string
  endTime?: string
  errors: string[]
}

export default function ComplianceChecker() {
  const [config, setConfig] = useState<ComplianceCheckConfig>({
    projectName: '',
    tokenSymbol: '',
    tokenType: 'utility',
    targetMarkets: [],
    fundingMethod: 'fair-launch',
    hasUtility: false,
    isInvestmentContract: false,
    hasGovernanceRights: false,
    promisesReturns: false,
    hasKYC: false,
    hasAML: false,
    hasWhitelist: false,
    hasVesting: false,
    hasLockup: false,
    hasWhitepaper: false,
    hasTerms: false,
    hasPrivacyPolicy: false,
    hasRiskDisclosure: false,
    teamDoxxed: false,
    hasLegalEntity: false,
    auditCompleted: false,
    insuranceCoverage: false
  })

  const [newMarket, setNewMarket] = useState('')
  const [activeSessions, setActiveSessions] = useState<ComplianceSession[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch active sessions
  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/bots/compliance')
      const data = await response.json()
      if (data.success) {
        setActiveSessions(data.sessions || [])
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error)
    }
  }

  // Add target market
  const addMarket = () => {
    if (newMarket.trim() && !config.targetMarkets.includes(newMarket.trim())) {
      setConfig(prev => ({
        ...prev,
        targetMarkets: [...prev.targetMarkets, newMarket.trim()]
      }))
      setNewMarket('')
    }
  }

  // Remove target market
  const removeMarket = (index: number) => {
    setConfig(prev => ({
      ...prev,
      targetMarkets: prev.targetMarkets.filter((_, i) => i !== index)
    }))
  }

  // Start compliance analysis
  const startAnalysis = async () => {
    if (!config.projectName || !config.tokenSymbol) {
      setError('Project name and token symbol are required')
      return
    }

    if (config.targetMarkets.length === 0) {
      setError('At least one target market is required')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/bots/compliance', {
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
        setConfig(prev => ({ 
          ...prev, 
          projectName: '',
          tokenSymbol: ''
        }))
      } else {
        setError(data.message || 'Failed to start compliance analysis')
      }
    } catch (error) {
      setError('Failed to start compliance analysis')
    } finally {
      setIsLoading(false)
    }
  }

  // Export compliance report
  const exportReport = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/bots/compliance?sessionId=${sessionId}&action=export`)
      
      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `compliance_report_${sessionId}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Failed to export report:', error)
    }
  }

  // Auto-refresh sessions
  useEffect(() => {
    fetchSessions()
    const interval = setInterval(fetchSessions, 5000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'analyzing': return 'text-blue-400 bg-blue-500/10'
      case 'completed': return 'text-green-400 bg-green-500/10'
      case 'error': return 'text-red-400 bg-red-500/10'
      default: return 'text-gray-400 bg-gray-500/10'
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-400 bg-green-500/10'
      case 'medium': return 'text-yellow-400 bg-yellow-500/10'
      case 'high': return 'text-red-400 bg-red-500/10'
      case 'critical': return 'text-red-500 bg-red-500/20'
      default: return 'text-gray-400 bg-gray-500/10'
    }
  }

  const getGradeColor = (grade: string) => {
    const gradeValue = grade.replace('+', '').replace('-', '')
    switch (gradeValue) {
      case 'A': return 'text-green-400'
      case 'B': return 'text-blue-400'
      case 'C': return 'text-yellow-400'
      case 'D': return 'text-orange-400'
      case 'F': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getTokenTypeIcon = (type: string) => {
    switch (type) {
      case 'utility': return '🔧'
      case 'security': return '🏛️'
      case 'governance': return '🗳️'
      case 'stablecoin': return '💰'
      case 'meme': return '🐕'
      case 'defi': return '🏦'
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
          <div className="p-2 bg-green-500/20 rounded-lg">
            <Shield className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Compliance Checker</h2>
            <p className="text-sm text-gray-400">Analyze regulatory compliance and risk assessment for your token project</p>
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
        <h3 className="text-lg font-semibold text-white mb-4">Compliance Assessment Configuration</h3>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Basic Project Info */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-300 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Project Information
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Project Name *</label>
                <input
                  type="text"
                  value={config.projectName}
                  onChange={(e) => setConfig(prev => ({ ...prev, projectName: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                  placeholder="Your Project Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Token Symbol *</label>
                <input
                  type="text"
                  value={config.tokenSymbol}
                  onChange={(e) => setConfig(prev => ({ ...prev, tokenSymbol: e.target.value.toUpperCase() }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                  placeholder="TOKEN"
                  maxLength={6}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Token Type</label>
                <select
                  value={config.tokenType}
                  onChange={(e) => setConfig(prev => ({ ...prev, tokenType: e.target.value as any }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                >
                  <option value="utility">🔧 Utility Token</option>
                  <option value="security">🏛️ Security Token</option>
                  <option value="governance">🗳️ Governance Token</option>
                  <option value="stablecoin">💰 Stablecoin</option>
                  <option value="defi">🏦 DeFi Token</option>
                  <option value="meme">🐕 Meme Token</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Funding Method</label>
              <select
                value={config.fundingMethod}
                onChange={(e) => setConfig(prev => ({ ...prev, fundingMethod: e.target.value as any }))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
              >
                <option value="fair-launch">Fair Launch</option>
                <option value="stealth-launch">Stealth Launch</option>
                <option value="airdrop">Airdrop</option>
                <option value="ido">IDO (Initial DEX Offering)</option>
                <option value="ico">ICO (Initial Coin Offering)</option>
                <option value="private">Private Sale</option>
              </select>
            </div>

            {/* Target Markets */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Target Markets *</label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <select
                    value={newMarket}
                    onChange={(e) => setNewMarket(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                  >
                    <option value="">Select target market</option>
                    <option value="US">United States</option>
                    <option value="EU">European Union</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Japan">Japan</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Global">Global</option>
                  </select>
                  <button
                    onClick={addMarket}
                    disabled={!newMarket}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {config.targetMarkets.map((market, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm flex items-center gap-2"
                    >
                      🌍 {market}
                      <button
                        onClick={() => removeMarket(index)}
                        className="text-green-300 hover:text-red-300 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Token Characteristics */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-300 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Token Characteristics (Howey Test)
            </h4>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={config.hasUtility}
                  onChange={(e) => setConfig(prev => ({ ...prev, hasUtility: e.target.checked }))}
                  className="rounded bg-gray-800 border-gray-700"
                />
                Has Utility Function
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={config.isInvestmentContract}
                  onChange={(e) => setConfig(prev => ({ ...prev, isInvestmentContract: e.target.checked }))}
                  className="rounded bg-gray-800 border-gray-700"
                />
                Investment Contract
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={config.hasGovernanceRights}
                  onChange={(e) => setConfig(prev => ({ ...prev, hasGovernanceRights: e.target.checked }))}
                  className="rounded bg-gray-800 border-gray-700"
                />
                Governance Rights
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={config.promisesReturns}
                  onChange={(e) => setConfig(prev => ({ ...prev, promisesReturns: e.target.checked }))}
                  className="rounded bg-gray-800 border-gray-700"
                />
                Promises Returns
              </label>
            </div>
          </div>

          {/* Compliance Features */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-300 flex items-center gap-2">
              <Scale className="w-4 h-4" />
              Compliance Features
            </h4>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={config.hasKYC}
                  onChange={(e) => setConfig(prev => ({ ...prev, hasKYC: e.target.checked }))}
                  className="rounded bg-gray-800 border-gray-700"
                />
                KYC Required
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={config.hasAML}
                  onChange={(e) => setConfig(prev => ({ ...prev, hasAML: e.target.checked }))}
                  className="rounded bg-gray-800 border-gray-700"
                />
                AML Procedures
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={config.hasWhitelist}
                  onChange={(e) => setConfig(prev => ({ ...prev, hasWhitelist: e.target.checked }))}
                  className="rounded bg-gray-800 border-gray-700"
                />
                Whitelisting
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={config.hasVesting}
                  onChange={(e) => setConfig(prev => ({ ...prev, hasVesting: e.target.checked }))}
                  className="rounded bg-gray-800 border-gray-700"
                />
                Token Vesting
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={config.hasLockup}
                  onChange={(e) => setConfig(prev => ({ ...prev, hasLockup: e.target.checked }))}
                  className="rounded bg-gray-800 border-gray-700"
                />
                Token Lockup
              </label>
            </div>
          </div>

          {/* Documentation */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-300 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Documentation & Legal
            </h4>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={config.hasWhitepaper}
                  onChange={(e) => setConfig(prev => ({ ...prev, hasWhitepaper: e.target.checked }))}
                  className="rounded bg-gray-800 border-gray-700"
                />
                Whitepaper
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={config.hasTerms}
                  onChange={(e) => setConfig(prev => ({ ...prev, hasTerms: e.target.checked }))}
                  className="rounded bg-gray-800 border-gray-700"
                />
                Terms of Service
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={config.hasPrivacyPolicy}
                  onChange={(e) => setConfig(prev => ({ ...prev, hasPrivacyPolicy: e.target.checked }))}
                  className="rounded bg-gray-800 border-gray-700"
                />
                Privacy Policy
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={config.hasRiskDisclosure}
                  onChange={(e) => setConfig(prev => ({ ...prev, hasRiskDisclosure: e.target.checked }))}
                  className="rounded bg-gray-800 border-gray-700"
                />
                Risk Disclosure
              </label>
            </div>
          </div>

          {/* Team & Corporate */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-300 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Team & Corporate Structure
            </h4>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={config.teamDoxxed}
                  onChange={(e) => setConfig(prev => ({ ...prev, teamDoxxed: e.target.checked }))}
                  className="rounded bg-gray-800 border-gray-700"
                />
                Team Doxxed
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={config.hasLegalEntity}
                  onChange={(e) => setConfig(prev => ({ ...prev, hasLegalEntity: e.target.checked }))}
                  className="rounded bg-gray-800 border-gray-700"
                />
                Legal Entity
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={config.auditCompleted}
                  onChange={(e) => setConfig(prev => ({ ...prev, auditCompleted: e.target.checked }))}
                  className="rounded bg-gray-800 border-gray-700"
                />
                Audit Completed
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={config.insuranceCoverage}
                  onChange={(e) => setConfig(prev => ({ ...prev, insuranceCoverage: e.target.checked }))}
                  className="rounded bg-gray-800 border-gray-700"
                />
                Insurance Coverage
              </label>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Start Button */}
          <div className="flex justify-center">
            <button
              onClick={startAnalysis}
              disabled={isLoading || !config.projectName || !config.tokenSymbol || config.targetMarkets.length === 0}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Analyzing Compliance...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Start Compliance Analysis
                  {isTestMode && <span className="text-xs opacity-75">(FREE)</span>}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Compliance Analysis Sessions ({activeSessions.length})
        </h3>

        {activeSessions.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No compliance analysis sessions</p>
            <p className="text-sm">Start a compliance check to see results here</p>
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
                      {getTokenTypeIcon(session.config.tokenType)}
                      <span>{session.config.projectName} ({session.config.tokenSymbol})</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {session.config.fundingMethod} • {session.config.targetMarkets.length} markets
                    </div>
                  </div>
                  
                  {/* Controls */}
                  <div className="flex gap-2">
                    {session.status === 'completed' && session.result && (
                      <button
                        onClick={() => exportReport(session.id)}
                        className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                        title="Download Report"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Analysis Results */}
                {session.result && (
                  <div className="space-y-3">
                    {/* Overall Score */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="p-3 bg-blue-500/10 rounded border border-blue-500/20">
                        <div className="flex items-center gap-2 text-sm text-blue-300">
                          <TrendingUp className="w-3 h-3" />
                          <span className="font-medium">Compliance Score</span>
                        </div>
                        <p className="text-lg font-bold text-blue-400">{session.result.overallScore}/100</p>
                      </div>

                      <div className="p-3 bg-gray-500/10 rounded border border-gray-500/20">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Scale className="w-3 h-3" />
                          <span className="font-medium">Grade</span>
                        </div>
                        <p className={`text-lg font-bold ${getGradeColor(session.result.complianceGrade)}`}>
                          {session.result.complianceGrade}
                        </p>
                      </div>

                      <div className={`p-3 rounded border ${getRiskColor(session.result.riskLevel).replace('text-', 'border-').replace('bg-', '').replace('/10', '/20')}`}>
                        <div className="flex items-center gap-2 text-sm">
                          <AlertTriangle className="w-3 h-3" />
                          <span className="font-medium">Risk Level</span>
                        </div>
                        <p className={`text-lg font-bold ${getRiskColor(session.result.riskLevel).split(' ')[0]}`}>
                          {session.result.riskLevel.toUpperCase()}
                        </p>
                      </div>

                      <div className="p-3 bg-purple-500/10 rounded border border-purple-500/20">
                        <div className="flex items-center gap-2 text-sm text-purple-300">
                          <FileText className="w-3 h-3" />
                          <span className="font-medium">Recommendations</span>
                        </div>
                        <p className="text-lg font-bold text-purple-400">{session.result.recommendations?.length || 0}</p>
                      </div>
                    </div>

                    {/* Key Warnings */}
                    {session.result.warnings?.length > 0 && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                        <p className="text-sm font-medium text-red-300 mb-2">Key Warnings:</p>
                        {session.result.warnings.slice(0, 2).map((warning: any, index: number) => (
                          <p key={index} className="text-xs text-red-300 opacity-75">
                            • {warning.message}
                          </p>
                        ))}
                        {session.result.warnings.length > 2 && (
                          <p className="text-xs text-red-300 opacity-50 mt-1">
                            +{session.result.warnings.length - 2} more warnings...
                          </p>
                        )}
                      </div>
                    )}

                    {/* Jurisdiction Analysis */}
                    {session.result.jurisdictionAnalysis?.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {session.result.jurisdictionAnalysis.slice(0, 4).map((analysis: any, index: number) => (
                          <div key={index} className="p-2 bg-blue-500/5 border border-blue-500/10 rounded text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-blue-300">🌍 {analysis.jurisdiction}</span>
                              <span className={`text-xs ${getRiskColor(analysis.riskLevel).split(' ')[0]}`}>
                                {analysis.riskLevel}
                              </span>
                            </div>
                            <p className="text-gray-400 mt-1">{analysis.tokenClassification}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Target Markets */}
                <div className="mt-3 p-2 bg-green-500/5 border border-green-500/10 rounded text-xs text-green-300">
                  <p className="font-medium">
                    Target Markets: {session.config.targetMarkets.join(', ')} • 
                    Type: {session.config.tokenType} • 
                    Funding: {session.config.fundingMethod}
                  </p>
                </div>

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
