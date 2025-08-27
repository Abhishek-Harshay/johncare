// API Route: Generate AI Content
// ===============================

import { NextRequest, NextResponse } from 'next/server'
import { apiService } from '@/lib/services/api-integration'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, name, symbol, description, theme } = body

    if (!name || !symbol) {
      return NextResponse.json({
        success: false,
        error: 'Token name and symbol are required'
      }, { status: 400 })
    }

    console.log(`🤖 Generating ${type} content for: ${name} (${symbol})`)

    const content = await apiService.generateTokenContent({
      name,
      symbol,
      description,
      type: type || 'utility'
    })

    return NextResponse.json({
      success: true,
      content,
      generated_at: new Date().toISOString(),
      service: 'DeepSeek AI'
    })

  } catch (error) {
    console.error('❌ Content generation failed:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Content generation failed'
    }, { status: 500 })
  }
}
