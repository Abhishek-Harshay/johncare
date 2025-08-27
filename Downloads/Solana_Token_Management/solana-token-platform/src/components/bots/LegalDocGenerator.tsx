'use client'

import { useState, useEffect } from 'react'
import { FileText, Play, Download, AlertTriangle, CheckCircle, XCircle, Building, Scale, Shield, Globe } from 'lucide-react'
import { testnetService } from '@/lib/services/testnet'

interface LegalDocConfig {
  companyName: string
  companyAddress: string
  companyEmail: string
  companyWebsite: string
  jurisdiction: string
  incorporationDate: string
  tokenName: string
  tokenSymbol: string
  tokenPurpose: string
  tokenUtility: string[]
  maxSupply: number
  initialSupply: number
  docType: 'terms' | 'privacy' | 'whitepaper' | 'disclaimer' | 'compliance' | 'full-package'
  includeKYC: boolean
  includeAML: boolean
  targetJurisdictions: string[]
  riskLevel: 'low' | 'medium' | 'high'
  includeGDPR: boolean
  includeCCPA: boolean
  customClauses: string[]
  contactInfo: {
    legalContact: string
    complianceOfficer: string
    supportEmail: string
  }
}

interface LegalDocSession {
  id: string
  config: LegalDocConfig
  status: 'idle' | 'generating' | 'completed' | 'error'
  startTime?: string
  endTime?: string
  documents: any[]
  progress: number
  errors: string[]
}

export default function LegalDocGenerator() {
  const [config, setConfig] = useState<LegalDocConfig>({
    companyName: '',
    companyAddress: '',
    companyEmail: '',
    companyWebsite: '',
    jurisdiction: '',
    incorporationDate: '',
    tokenName: '',
    tokenSymbol: '',
    tokenPurpose: '',
    tokenUtility: [],
    maxSupply: 1000000,
    initialSupply: 500000,
    docType: 'full-package',
    includeKYC: false,
    includeAML: false,
    targetJurisdictions: [],
    riskLevel: 'medium',
    includeGDPR: false,
    includeCCPA: false,
    customClauses: [],
    contactInfo: {
      legalContact: '',
      complianceOfficer: '',
      supportEmail: ''
    }
  })

  const [newUtility, setNewUtility] = useState('')
  const [newJurisdiction, setNewJurisdiction] = useState('')
  const [newClause, setNewClause] = useState('')
  const [activeSessions, setActiveSessions] = useState<LegalDocSession[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validation, setValidation] = useState<any>(null)

  // Fetch active sessions
  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/bots/legal-docs')
      const data = await response.json()
      if (data.success) {
        setActiveSessions(data.sessions || [])
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error)
    }
  }

  // Add utility
  const addUtility = () => {
    if (newUtility.trim() && !config.tokenUtility.includes(newUtility.trim())) {
      setConfig(prev => ({
        ...prev,
        tokenUtility: [...prev.tokenUtility, newUtility.trim()]
      }))
      setNewUtility('')
    }
  }

  // Remove utility
  const removeUtility = (index: number) => {
    setConfig(prev => ({
      ...prev,
      tokenUtility: prev.tokenUtility.filter((_, i) => i !== index)
    }))
  }

  // Add jurisdiction
  const addJurisdiction = () => {
    if (newJurisdiction.trim() && !config.targetJurisdictions.includes(newJurisdiction.trim())) {
      setConfig(prev => ({
        ...prev,
        targetJurisdictions: [...prev.targetJurisdictions, newJurisdiction.trim()]
      }))
      setNewJurisdiction('')
    }
  }

  // Remove jurisdiction
  const removeJurisdiction = (index: number) => {
    setConfig(prev => ({
      ...prev,
      targetJurisdictions: prev.targetJurisdictions.filter((_, i) => i !== index)
    }))
  }

  // Add custom clause
  const addClause = () => {
    if (newClause.trim() && !config.customClauses.includes(newClause.trim())) {
      setConfig(prev => ({
        ...prev,
        customClauses: [...prev.customClauses, newClause.trim()]
      }))
      setNewClause('')
    }
  }

  // Remove custom clause
  const removeClause = (index: number) => {
    setConfig(prev => ({
      ...prev,
      customClauses: prev.customClauses.filter((_, i) => i !== index)
    }))
  }

  // Validate configuration
  const validateConfig = async () => {
    try {
      const response = await fetch('/api/bots/legal-docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'validate',
          config
        })
      })

      const data = await response.json()
      if (data.success) {
        setValidation(data.validation)
      }
    } catch (error) {
      console.error('Validation failed:', error)
    }
  }

  // Start document generation
  const startGeneration = async () => {
    if (!config.companyName || !config.tokenName || !config.jurisdiction) {
      setError('Please fill in all required fields')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/bots/legal-docs', {
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
          companyName: '',
          tokenName: '',
          tokenSymbol: ''
        }))
        setValidation(null)
      } else {
        setError(data.message || 'Failed to start document generation')
      }
    } catch (error) {
      setError('Failed to start document generation')
    } finally {
      setIsLoading(false)
    }
  }

  // Export documents
  const exportDocuments = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/bots/legal-docs?sessionId=${sessionId}&action=export`)
      
      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `legal_documents_${sessionId}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Failed to export documents:', error)
    }
  }

  // Auto-refresh sessions
  useEffect(() => {
    fetchSessions()
    const interval = setInterval(fetchSessions, 5000)
    return () => clearInterval(interval)
  }, [])

  // Auto-validate when config changes
  useEffect(() => {
    if (config.companyName && config.tokenName && config.jurisdiction) {
      const timer = setTimeout(validateConfig, 1000)
      return () => clearTimeout(timer)
    }
  }, [config])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'generating': return 'text-blue-400 bg-blue-500/10'
      case 'completed': return 'text-green-400 bg-green-500/10'
      case 'error': return 'text-red-400 bg-red-500/10'
      default: return 'text-gray-400 bg-gray-500/10'
    }
  }

  const getDocTypeIcon = (docType: string) => {
    switch (docType) {
      case 'terms': return '📋'
      case 'privacy': return '🔒'
      case 'disclaimer': return '⚠️'
      case 'compliance': return '⚖️'
      case 'whitepaper': return '📄'
      case 'full-package': return '📦'
      default: return '📄'
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-400'
      case 'medium': return 'text-yellow-400'
      case 'high': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const isTestMode = testnetService.isTestMode()
  const networkInfo = testnetService.getNetworkInfo()

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <FileText className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Legal Document Generator</h2>
            <p className="text-sm text-gray-400">Generate professional legal documentation for token launches</p>
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
        <h3 className="text-lg font-semibold text-white mb-4">Document Configuration</h3>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Company Information */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-300 flex items-center gap-2">
              <Building className="w-4 h-4" />
              Company Information
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Company Name *</label>
                <input
                  type="text"
                  value={config.companyName}
                  onChange={(e) => setConfig(prev => ({ ...prev, companyName: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Your Company Ltd."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Jurisdiction *</label>
                <select
                  value={config.jurisdiction}
                  onChange={(e) => setConfig(prev => ({ ...prev, jurisdiction: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Jurisdiction</option>
                  <option value="Delaware, USA">Delaware, USA</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Singapore">Singapore</option>
                  <option value="British Virgin Islands">British Virgin Islands</option>
                  <option value="Cayman Islands">Cayman Islands</option>
                  <option value="Estonia">Estonia</option>
                  <option value="Malta">Malta</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Company Address</label>
                <input
                  type="text"
                  value={config.companyAddress}
                  onChange={(e) => setConfig(prev => ({ ...prev, companyAddress: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="123 Blockchain Street, Crypto City"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Company Email</label>
                <input
                  type="email"
                  value={config.companyEmail}
                  onChange={(e) => setConfig(prev => ({ ...prev, companyEmail: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="legal@yourcompany.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Company Website</label>
                <input
                  type="url"
                  value={config.companyWebsite}
                  onChange={(e) => setConfig(prev => ({ ...prev, companyWebsite: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="https://yourcompany.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Incorporation Date</label>
                <input
                  type="date"
                  value={config.incorporationDate}
                  onChange={(e) => setConfig(prev => ({ ...prev, incorporationDate: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Token Information */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-300 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Token Information
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Token Name *</label>
                <input
                  type="text"
                  value={config.tokenName}
                  onChange={(e) => setConfig(prev => ({ ...prev, tokenName: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Your Token"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Token Symbol *</label>
                <input
                  type="text"
                  value={config.tokenSymbol}
                  onChange={(e) => setConfig(prev => ({ ...prev, tokenSymbol: e.target.value.toUpperCase() }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="YTKN"
                  maxLength={6}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Token Purpose</label>
                <textarea
                  value={config.tokenPurpose}
                  onChange={(e) => setConfig(prev => ({ ...prev, tokenPurpose: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  rows={3}
                  placeholder="Describe the main purpose and goals of your token..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Max Supply</label>
                <input
                  type="number"
                  value={config.maxSupply}
                  onChange={(e) => setConfig(prev => ({ ...prev, maxSupply: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Initial Supply</label>
                <input
                  type="number"
                  value={config.initialSupply}
                  onChange={(e) => setConfig(prev => ({ ...prev, initialSupply: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  min="1"
                  max={config.maxSupply}
                />
              </div>
            </div>

            {/* Token Utilities */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Token Utilities</label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newUtility}
                    onChange={(e) => setNewUtility(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., Governance voting, Staking rewards, Platform access"
                    onKeyPress={(e) => e.key === 'Enter' && addUtility()}
                  />
                  <button
                    onClick={addUtility}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {config.tokenUtility.map((utility, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm flex items-center gap-2"
                    >
                      {utility}
                      <button
                        onClick={() => removeUtility(index)}
                        className="text-blue-300 hover:text-red-300 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Document Configuration */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-300 flex items-center gap-2">
              <Scale className="w-4 h-4" />
              Document Configuration
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Document Type</label>
                <select
                  value={config.docType}
                  onChange={(e) => setConfig(prev => ({ ...prev, docType: e.target.value as any }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="full-package">📦 Full Package (All Documents)</option>
                  <option value="terms">📋 Terms of Service Only</option>
                  <option value="privacy">🔒 Privacy Policy Only</option>
                  <option value="disclaimer">⚠️ Legal Disclaimer Only</option>
                  <option value="compliance">⚖️ Compliance Documentation Only</option>
                  <option value="whitepaper">📄 Whitepaper Only</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Risk Level</label>
                <select
                  value={config.riskLevel}
                  onChange={(e) => setConfig(prev => ({ ...prev, riskLevel: e.target.value as any }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="low">🟢 Low Risk</option>
                  <option value="medium">🟡 Medium Risk</option>
                  <option value="high">🔴 High Risk</option>
                </select>
              </div>
            </div>

            {/* Compliance Options */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={config.includeKYC}
                  onChange={(e) => setConfig(prev => ({ ...prev, includeKYC: e.target.checked }))}
                  className="rounded bg-gray-800 border-gray-700"
                />
                Include KYC
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={config.includeAML}
                  onChange={(e) => setConfig(prev => ({ ...prev, includeAML: e.target.checked }))}
                  className="rounded bg-gray-800 border-gray-700"
                />
                Include AML
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={config.includeGDPR}
                  onChange={(e) => setConfig(prev => ({ ...prev, includeGDPR: e.target.checked }))}
                  className="rounded bg-gray-800 border-gray-700"
                />
                GDPR Compliance
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={config.includeCCPA}
                  onChange={(e) => setConfig(prev => ({ ...prev, includeCCPA: e.target.checked }))}
                  className="rounded bg-gray-800 border-gray-700"
                />
                CCPA Compliance
              </label>
            </div>

            {/* Target Jurisdictions */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Target Jurisdictions</label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <select
                    value={newJurisdiction}
                    onChange={(e) => setNewJurisdiction(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select jurisdiction to add</option>
                    <option value="US">United States</option>
                    <option value="EU">European Union</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Japan">Japan</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Switzerland">Switzerland</option>
                  </select>
                  <button
                    onClick={addJurisdiction}
                    disabled={!newJurisdiction}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {config.targetJurisdictions.map((jurisdiction, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm flex items-center gap-2"
                    >
                      <Globe className="w-3 h-3" />
                      {jurisdiction}
                      <button
                        onClick={() => removeJurisdiction(index)}
                        className="text-purple-300 hover:text-red-300 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-300">Contact Information</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Legal Contact</label>
                <input
                  type="email"
                  value={config.contactInfo.legalContact}
                  onChange={(e) => setConfig(prev => ({ 
                    ...prev, 
                    contactInfo: { ...prev.contactInfo, legalContact: e.target.value }
                  }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="legal@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Compliance Officer</label>
                <input
                  type="email"
                  value={config.contactInfo.complianceOfficer}
                  onChange={(e) => setConfig(prev => ({ 
                    ...prev, 
                    contactInfo: { ...prev.contactInfo, complianceOfficer: e.target.value }
                  }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="compliance@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Support Email</label>
                <input
                  type="email"
                  value={config.contactInfo.supportEmail}
                  onChange={(e) => setConfig(prev => ({ 
                    ...prev, 
                    contactInfo: { ...prev.contactInfo, supportEmail: e.target.value }
                  }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="support@company.com"
                />
              </div>
            </div>
          </div>

          {/* Validation Results */}
          {validation && (
            <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
              <h4 className="text-md font-medium text-gray-300 mb-3">Configuration Validation</h4>
              
              <div className="space-y-2">
                <div className={`flex items-center gap-2 ${validation.isValid ? 'text-green-400' : 'text-red-400'}`}>
                  {validation.isValid ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  <span className="text-sm font-medium">
                    {validation.isValid ? 'Configuration Valid' : 'Configuration Issues Found'}
                  </span>
                </div>

                {validation.errors?.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-sm text-red-300 font-medium">Errors:</p>
                    {validation.errors.map((error: string, index: number) => (
                      <p key={index} className="text-sm text-red-300 ml-4">• {error}</p>
                    ))}
                  </div>
                )}

                {validation.warnings?.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-sm text-yellow-300 font-medium">Warnings:</p>
                    {validation.warnings.map((warning: string, index: number) => (
                      <p key={index} className="text-sm text-yellow-300 ml-4">• {warning}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Start Button */}
          <div className="flex justify-center">
            <button
              onClick={startGeneration}
              disabled={isLoading || !config.companyName || !config.tokenName || !config.jurisdiction || (validation && !validation.isValid)}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Generating Documents...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Generate Legal Documents
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
          <FileText className="w-5 h-5" />
          Document Generation Sessions ({activeSessions.length})
        </h3>

        {activeSessions.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No document generation sessions</p>
            <p className="text-sm">Start generating legal documents to see progress here</p>
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
                      {getDocTypeIcon(session.config.docType)}
                      <span>{session.config.docType}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {session.config.tokenName} ({session.config.tokenSymbol})
                    </div>
                    <span className={`text-xs ${getRiskColor(session.config.riskLevel)}`}>
                      {session.config.riskLevel} risk
                    </span>
                  </div>
                  
                  {/* Controls */}
                  <div className="flex gap-2">
                    {session.status === 'completed' && (
                      <button
                        onClick={() => exportDocuments(session.id)}
                        className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                        title="Download Documents"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                {session.status === 'generating' && (
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-300 mb-1">
                      <span>Generation Progress</span>
                      <span>{session.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${session.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Documents Generated */}
                {session.documents.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                    {session.documents.map((doc, index) => (
                      <div key={index} className="p-2 bg-blue-500/10 rounded border border-blue-500/20">
                        <div className="flex items-center gap-2 text-sm text-blue-300">
                          <FileText className="w-3 h-3" />
                          <span className="font-medium">{doc.type}</span>
                        </div>
                        <p className="text-xs text-gray-400">{doc.wordCount} words</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Company & Token Info */}
                <div className="p-2 bg-blue-500/5 border border-blue-500/10 rounded text-xs text-blue-300">
                  <p className="font-medium">
                    {session.config.companyName} • {session.config.jurisdiction} • 
                    {session.config.includeKYC && ' KYC'}{session.config.includeAML && ' AML'}
                    {session.config.includeGDPR && ' GDPR'}{session.config.includeCCPA && ' CCPA'}
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
