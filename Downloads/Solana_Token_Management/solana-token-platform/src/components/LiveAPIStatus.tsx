// Live API Status Dashboard Component
// ===================================

'use client'

import { useState, useEffect } from 'react'
import { Activity, CheckCircle, XCircle, AlertTriangle, Zap, Database, Bot, TrendingUp } from 'lucide-react'

interface ServiceStatus {
  name: string
  status: 'connected' | 'disconnected' | 'limited'
  description: string
  icon: any
  details?: string
}

export default function LiveAPIStatus() {
  const [services, setServices] = useState<ServiceStatus[]>([
    {
      name: 'DeepSeek AI',
      status: 'disconnected',
      description: 'AI Content Generation (10x cheaper than OpenAI)',
      icon: Bot,
      details: 'Token descriptions, meme content, analysis'
    },
    {
      name: 'Helius RPC',
      status: 'disconnected', 
      description: 'Premium Solana Blockchain Data',
      icon: Database,
      details: 'Token info, balances, transactions'
    },
    {
      name: 'CoinMarketCap',
      status: 'disconnected',
      description: 'Live Market Data & Pricing',
      icon: TrendingUp,
      details: 'Price quotes, market caps, trends'
    },
    {
      name: 'Jupiter DEX',
      status: 'disconnected',
      description: 'DEX Aggregation & Best Prices',
      icon: Zap,
      details: 'Token swaps, price quotes, routing'
    }
  ])

  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const checkAPIStatus = async () => {
    setIsLoading(true)
    try {
      console.log('🔍 Checking live API status...')
      
      const response = await fetch('/api/platform/status')
      const data = await response.json()
      
      if (data.success) {
        const updatedServices = services.map(service => {
          const serviceName = service.name.toLowerCase().replace(/\s+/g, '').replace('deepsekai', 'deepseek')
          let status: 'connected' | 'disconnected' | 'limited' = 'disconnected'
          
          if (serviceName.includes('deepseek') && data.status.deepseek) {
            status = 'connected'
          } else if (serviceName.includes('helius') && data.status.helius) {
            status = 'connected'
          } else if (serviceName.includes('coinmarketcap') && data.status.coinmarketcap) {
            status = 'connected'
          } else if (serviceName.includes('jupiter') && data.status.jupiter) {
            status = 'connected'
          }
          
          return {
            ...service,
            status
          }
        })
        
        setServices(updatedServices)
        setLastUpdate(new Date())
        
        console.log('✅ API status updated:', data.status)
      }
    } catch (error) {
      console.error('❌ Failed to check API status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkAPIStatus()
    // Check status every 30 seconds
    const interval = setInterval(checkAPIStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-500'
      case 'limited': return 'text-yellow-500'
      default: return 'text-red-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return CheckCircle
      case 'limited': return AlertTriangle
      default: return XCircle
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-500/10 border-green-500/20'
      case 'limited': return 'bg-yellow-500/10 border-yellow-500/20'
      default: return 'bg-red-500/10 border-red-500/20'
    }
  }

  const connectedCount = services.filter(s => s.status === 'connected').length
  const overallStatus = connectedCount >= 3 ? 'Optimal' : connectedCount >= 1 ? 'Limited' : 'Offline'

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-blue-400" />
          <div>
            <h2 className="text-xl font-bold text-white">Live API Status</h2>
            <p className="text-gray-400 text-sm">Real-time service monitoring</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            overallStatus === 'Optimal' ? 'bg-green-500/20 text-green-400' :
            overallStatus === 'Limited' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {overallStatus}
          </div>
          
          <button
            onClick={checkAPIStatus}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white text-sm rounded-lg transition-colors"
          >
            {isLoading ? 'Checking...' : 'Refresh'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {services.map((service, index) => {
          const StatusIcon = getStatusIcon(service.status)
          const ServiceIcon = service.icon
          
          return (
            <div
              key={index}
              className={`p-4 rounded-lg border ${getStatusBg(service.status)} transition-all hover:scale-105`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <ServiceIcon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{service.name}</h3>
                    <p className="text-gray-400 text-xs">{service.description}</p>
                  </div>
                </div>
                
                <StatusIcon className={`w-5 h-5 ${getStatusColor(service.status)}`} />
              </div>
              
              <p className="text-gray-300 text-sm mb-2">{service.details}</p>
              
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium ${getStatusColor(service.status)}`}>
                  {service.status === 'connected' ? 'Connected' : 
                   service.status === 'limited' ? 'Limited' : 'Offline'}
                </span>
                
                {service.status === 'connected' && (
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-medium">Platform Statistics</h3>
          <span className="text-gray-400 text-xs">
            Last updated: {lastUpdate ? lastUpdate.toLocaleTimeString() : 'Never'}
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-400">{connectedCount}</div>
            <div className="text-xs text-gray-400">Connected</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">{services.filter(s => s.status === 'limited').length}</div>
            <div className="text-xs text-gray-400">Limited</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-400">{services.filter(s => s.status === 'disconnected').length}</div>
            <div className="text-xs text-gray-400">Offline</div>
          </div>
        </div>
      </div>

      {connectedCount > 0 && (
        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
          <p className="text-green-400 text-sm">
            🎉 <strong>{connectedCount}</strong> service{connectedCount > 1 ? 's' : ''} operational! 
            Platform is ready for live trading and token management.
          </p>
        </div>
      )}
    </div>
  )
}
