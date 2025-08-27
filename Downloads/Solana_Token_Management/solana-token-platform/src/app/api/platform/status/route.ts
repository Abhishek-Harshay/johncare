// API Route: Initialize Platform Services
// =====================================

import { NextRequest, NextResponse } from 'next/server'
import { apiService } from '@/lib/services/api-integration'

export async function GET(request: NextRequest) {
  try {
    console.log('🚀 Initializing SolX Engine Platform Services...')
    
    const status = await apiService.initialize()
    
    return NextResponse.json({
      success: true,
      message: 'Platform services initialized successfully',
      status,
      services: {
        deepseek: {
          enabled: status.deepseek,
          description: 'DeepSeek AI - Content generation and analysis (10x cheaper than OpenAI)'
        },
        helius: {
          enabled: status.helius,
          description: 'Helius - Premium Solana RPC and blockchain data'
        },
        coinmarketcap: {
          enabled: status.coinmarketcap,
          description: 'CoinMarketCap - Live market data and pricing'
        },
        jupiter: {
          enabled: status.jupiter,
          description: 'Jupiter - DEX aggregation and best price routing'
        }
      },
      overallStatus: status.overall ? 'OPERATIONAL' : 'LIMITED',
      errors: status.errors,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Platform initialization failed:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Platform initialization failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
