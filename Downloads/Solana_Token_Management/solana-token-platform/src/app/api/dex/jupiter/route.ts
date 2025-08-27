// API Route: Jupiter DEX Trading
// ===============================

import { NextRequest, NextResponse } from 'next/server'
import { jupiterService } from '@/lib/services/jupiter'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, inputMint, outputMint, amount, slippage } = body

    if (action === 'quote') {
      if (!inputMint || !outputMint || !amount) {
        return NextResponse.json({
          success: false,
          error: 'Missing required parameters: inputMint, outputMint, amount'
        }, { status: 400 })
      }

      console.log(`💱 Getting Jupiter quote: ${amount} ${inputMint} → ${outputMint}`)

      const quote = await jupiterService.getQuote(
        inputMint,
        outputMint,
        amount,
        slippage || 50
      )

      return NextResponse.json({
        success: true,
        quote,
        service: 'Jupiter DEX',
        timestamp: new Date().toISOString()
      })
    }

    if (action === 'price') {
      const priceData = await jupiterService.getPrice(inputMint, outputMint, amount)
      
      return NextResponse.json({
        success: true,
        price: priceData,
        service: 'Jupiter DEX',
        timestamp: new Date().toISOString()
      })
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid action. Use "quote" or "price"'
    }, { status: 400 })

  } catch (error) {
    console.error('❌ Jupiter API failed:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Jupiter API request failed'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    if (action === 'tokens') {
      console.log('📋 Fetching Jupiter token list...')
      
      const tokens = await jupiterService.getTokenList()
      
      return NextResponse.json({
        success: true,
        tokens: tokens.slice(0, 100), // Limit to first 100 for performance
        total: tokens.length,
        service: 'Jupiter DEX',
        timestamp: new Date().toISOString()
      })
    }

    if (action === 'popular') {
      const popularPairs = await jupiterService.getPopularPairs()
      
      return NextResponse.json({
        success: true,
        pairs: popularPairs,
        service: 'Jupiter DEX',
        timestamp: new Date().toISOString()
      })
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid action. Use "tokens" or "popular"'
    }, { status: 400 })

  } catch (error) {
    console.error('❌ Jupiter GET failed:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch Jupiter data'
    }, { status: 500 })
  }
}
