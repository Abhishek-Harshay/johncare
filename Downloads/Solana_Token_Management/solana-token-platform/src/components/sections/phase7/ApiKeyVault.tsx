'use client'

import { useState } from 'react'
import { Shield, Plus, Eye, EyeOff, Copy, Trash2, Key, Lock, CheckCircle, AlertTriangle, Search } from 'lucide-react'

interface ApiKey {
  id: string
  name: string
  service: string
  key: string
  createdAt: Date
  lastUsed: Date
  status: 'active' | 'inactive' | 'expired'
  permissions: string[]
}

export default function ApiKeyVault() {
  const [showKey, setShowKey] = useState<{[key: string]: boolean}>({})
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedService, setSelectedService] = useState('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newKey, setNewKey] = useState({
    name: '',
    service: '',
    key: '',
    permissions: [] as string[]
  })

  // Mock API keys data
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Helius RPC',
      service: 'Helius',
      key: 'hel_1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P',
      createdAt: new Date('2024-01-15'),
      lastUsed: new Date('2024-01-20'),
      status: 'active',
      permissions: ['read', 'write']
    },
    {
      id: '2',
      name: 'CoinMarketCap Pro',
      service: 'CoinMarketCap',
      key: 'cmc_a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
      createdAt: new Date('2024-01-10'),
      lastUsed: new Date('2024-01-19'),
      status: 'active',
      permissions: ['read']
    },
    {
      id: '3',
      name: 'Jupiter Aggregator',
      service: 'Jupiter',
      key: 'jup_9F8E7D6C5B4A3G2H1I0J9K8L7M6N5O4P',
      createdAt: new Date('2024-01-05'),
      lastUsed: new Date('2024-01-18'),
      status: 'active',
      permissions: ['read', 'swap']
    },
    {
      id: '4',
      name: 'Raydium API',
      service: 'Raydium',
      key: 'ray_5A4B3C2D1E0F9G8H7I6J5K4L3M2N1O0P',
      createdAt: new Date('2023-12-20'),
      lastUsed: new Date('2023-12-25'),
      status: 'expired',
      permissions: ['read']
    }
  ])

  const supportedServices = [
    'Helius', 'CoinMarketCap', 'Jupiter', 'Raydium', 'Orca', 'Pump.fun', 'Solana RPC'
  ]

  const toggleKeyVisibility = (keyId: string) => {
    setShowKey(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }))
  }

  const maskKey = (key: string) => {
    if (key.length <= 8) return '*'.repeat(key.length)
    return key.substring(0, 6) + '*'.repeat(Math.max(0, key.length - 12)) + key.substring(key.length - 6)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Could add toast notification here
  }

  const deleteApiKey = (keyId: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== keyId))
  }

  const addApiKey = () => {
    if (!newKey.name || !newKey.service || !newKey.key) return

    const newApiKey: ApiKey = {
      id: Date.now().toString(),
      name: newKey.name,
      service: newKey.service,
      key: newKey.key,
      createdAt: new Date(),
      lastUsed: new Date(),
      status: 'active',
      permissions: newKey.permissions
    }

    setApiKeys(prev => [...prev, newApiKey])
    setNewKey({ name: '', service: '', key: '', permissions: [] })
    setShowAddForm(false)
  }

  const filteredKeys = apiKeys.filter(key => {
    const matchesSearch = key.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         key.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesService = selectedService === 'all' || key.service === selectedService
    return matchesSearch && matchesService
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-900/20'
      case 'inactive': return 'text-yellow-400 bg-yellow-900/20'
      case 'expired': return 'text-red-400 bg-red-900/20'
      default: return 'text-zinc-400 bg-zinc-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />
      case 'expired': return <AlertTriangle className="w-4 h-4" />
      default: return <Lock className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">API Key Vault</h1>
              <p className="text-zinc-400">Securely store and manage your API keys</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add API Key</span>
          </button>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search API keys..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Services</option>
            {supportedServices.map(service => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Add API Key Form */}
      {showAddForm && (
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Add New API Key</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Name</label>
              <input
                type="text"
                value={newKey.name}
                onChange={(e) => setNewKey(prev => ({ ...prev, name: e.target.value }))}
                placeholder="My API Key"
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Service</label>
              <select
                value={newKey.service}
                onChange={(e) => setNewKey(prev => ({ ...prev, service: e.target.value }))}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Service</option>
                {supportedServices.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-zinc-300 mb-2">API Key</label>
              <input
                type="password"
                value={newKey.key}
                onChange={(e) => setNewKey(prev => ({ ...prev, key: e.target.value }))}
                placeholder="Enter your API key"
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={addApiKey}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Add Key
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* API Keys List */}
      <div className="space-y-4">
        {filteredKeys.map((apiKey) => (
          <div key={apiKey.id} className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Key className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{apiKey.name}</h3>
                  <span className="text-sm text-zinc-400">{apiKey.service}</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium ${getStatusColor(apiKey.status)}`}>
                      {getStatusIcon(apiKey.status)}
                      <span className="capitalize">{apiKey.status}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleKeyVisibility(apiKey.id)}
                  className="bg-zinc-700 hover:bg-zinc-600 text-white p-2 rounded-lg transition-colors"
                  title={showKey[apiKey.id] ? 'Hide key' : 'Show key'}
                >
                  {showKey[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => copyToClipboard(apiKey.key)}
                  className="bg-zinc-700 hover:bg-zinc-600 text-white p-2 rounded-lg transition-colors"
                  title="Copy key"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteApiKey(apiKey.id)}
                  className="bg-red-600/20 hover:bg-red-600/30 text-red-400 p-2 rounded-lg transition-colors"
                  title="Delete key"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-zinc-800 rounded-lg p-4 mb-4">
              <div className="font-mono text-sm text-white break-all">
                {showKey[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-zinc-400">Created:</span>
                <span className="text-white ml-2">{apiKey.createdAt.toLocaleDateString()}</span>
              </div>
              <div>
                <span className="text-zinc-400">Last Used:</span>
                <span className="text-white ml-2">{apiKey.lastUsed.toLocaleDateString()}</span>
              </div>
              <div>
                <span className="text-zinc-400">Permissions:</span>
                <span className="text-white ml-2">{apiKey.permissions.join(', ') || 'None'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredKeys.length === 0 && (
        <div className="text-center py-12">
          <Key className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No API keys found</h3>
          <p className="text-zinc-400 mb-4">
            {searchTerm || selectedService !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Add your first API key to get started'
            }
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Add API Key
          </button>
        </div>
      )}
    </div>
  )
}
