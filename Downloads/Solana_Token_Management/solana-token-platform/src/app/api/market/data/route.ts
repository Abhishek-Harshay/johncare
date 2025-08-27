// API Route: Live Market Data
// ============================

import { NextRequest, NextResponse } from 'next/server'
import { apiService } from '@/lib/services/api-integration'
import { coinMarketCapService } from '@/lib/services/coinmarketcap'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const symbol = searchParams.get('symbol')

    if (symbol) {
      // Get specific token data
      console.log(`📊 Fetching market data for: ${symbol}`)
      
      const tokenData = await apiService.analyzeToken(symbol)
      
      return NextResponse.json({
        success: true,
        token: symbol,
        data: tokenData,
        timestamp: new Date().toISOString()
      })
    } else {
      // Get general market overview
      console.log('📊 Fetching market overview...')
      
      const marketData = await apiService.getMarketData()
      
      return NextResponse.json({
        success: true,
        market: marketData,
        timestamp: new Date().toISOString()
      })
    }

  } catch (error) {
    console.error('❌ Market data fetch failed:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch market data'
    }, { status: 500 })
  }
}
