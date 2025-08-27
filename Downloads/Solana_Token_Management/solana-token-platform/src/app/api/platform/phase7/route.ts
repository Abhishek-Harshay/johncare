import { NextRequest, NextResponse } from 'next/server'
import { phase7Manager } from '@/lib/services/phase7Manager'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const action = url.searchParams.get('action') || 'status'
    const walletAddress = url.searchParams.get('wallet')

    switch (action) {
      case 'status':
        const status = await phase7Manager.initializeServices()
        return NextResponse.json({
          success: true,
          phase: 'Phase 7 - Advanced Expansion',
          status,
          timestamp: new Date().toISOString()
        })

      case 'metrics':
        const metrics = await phase7Manager.getPlatformMetrics()
        return NextResponse.json({
          success: true,
          metrics,
          timestamp: new Date().toISOString()
        })

      case 'user-tier':
        if (!walletAddress) {
          return NextResponse.json({
            success: false,
            error: 'Wallet address required for user tier check'
          }, { status: 400 })
        }
        
        const userTier = await phase7Manager.getUserTier(walletAddress)
        return NextResponse.json({
          success: true,
          walletAddress,
          tier: userTier,
          timestamp: new Date().toISOString()
        })

      case 'ai-signals':
        if (!walletAddress) {
          return NextResponse.json({
            success: false,
            error: 'Wallet address required for AI signals'
          }, { status: 400 })
        }

        const signals = await phase7Manager.getAISignals(walletAddress)
        return NextResponse.json({
          success: true,
          walletAddress,
          signals,
          count: signals.length,
          timestamp: new Date().toISOString()
        })

      case 'health':
        const health = await phase7Manager.getPlatformHealth()
        return NextResponse.json({
          success: true,
          health,
          timestamp: new Date().toISOString()
        })

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action',
          availableActions: ['status', 'metrics', 'user-tier', 'ai-signals', 'health']
        }, { status: 400 })
    }

  } catch (error) {
    console.error('Phase 7 API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, walletAddress, ...data } = body

    switch (action) {
      case 'validate-transaction':
        if (!data.transaction) {
          return NextResponse.json({
            success: false,
            error: 'Transaction data required'
          }, { status: 400 })
        }

        const validation = await phase7Manager.validateTransaction(data.transaction)
        return NextResponse.json({
          success: true,
          validation,
          timestamp: new Date().toISOString()
        })

      case 'execute-bridge':
        if (!walletAddress || !data.bridgeData) {
          return NextResponse.json({
            success: false,
            error: 'Wallet address and bridge data required'
          }, { status: 400 })
        }

        const bridgeResult = await phase7Manager.executeBridge(walletAddress, data.bridgeData)
        return NextResponse.json({
          success: true,
          result: bridgeResult,
          timestamp: new Date().toISOString()
        })

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action',
          availableActions: ['validate-transaction', 'execute-bridge']
        }, { status: 400 })
    }

  } catch (error) {
    console.error('Phase 7 POST API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
