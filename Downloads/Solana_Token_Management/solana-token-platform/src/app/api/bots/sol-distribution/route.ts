import { NextRequest, NextResponse } from 'next/server'
import { solDistributionService } from '@/lib/services/bots/solDistribution'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')
    const action = searchParams.get('action')

    if (sessionId && action === 'export') {
      // Export transaction history
      const csvData = solDistributionService.exportTransactions(sessionId)
      if (!csvData) {
        return NextResponse.json({
          success: false,
          message: 'No transaction data found for this session'
        }, { status: 404 })
      }

      return new NextResponse(csvData, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="sol_distribution_${sessionId}.csv"`
        }
      })
    }

    if (sessionId) {
      // Get specific session
      const session = solDistributionService.getSession(sessionId)
      if (!session) {
        return NextResponse.json({
          success: false,
          message: 'Session not found'
        }, { status: 404 })
      }

      return NextResponse.json({
        success: true,
        session
      })
    }

    // Get all sessions
    const sessions = solDistributionService.getAllSessions()
    
    return NextResponse.json({
      success: true,
      sessions,
      count: sessions.length
    })

  } catch (error) {
    console.error('SOL Distribution API Error (GET):', error)
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, config, sessionId } = body

    switch (action) {
      case 'start': {
        if (!config) {
          return NextResponse.json({
            success: false,
            message: 'Configuration is required'
          }, { status: 400 })
        }

        // Validate required fields
        if (!config.sourcePrivateKey) {
          return NextResponse.json({
            success: false,
            message: 'Source private key is required'
          }, { status: 400 })
        }

        if (!config.targetWallets || !Array.isArray(config.targetWallets) || config.targetWallets.length === 0) {
          return NextResponse.json({
            success: false,
            message: 'Target wallets array is required'
          }, { status: 400 })
        }

        if (!config.amountPerWallet || config.amountPerWallet <= 0) {
          return NextResponse.json({
            success: false,
            message: 'Amount per wallet must be greater than 0'
          }, { status: 400 })
        }

        // Start new distribution session
        const result = await solDistributionService.startDistribution({
          sourcePrivateKey: config.sourcePrivateKey,
          targetWallets: config.targetWallets,
          amountPerWallet: parseFloat(config.amountPerWallet),
          distributionPattern: config.distributionPattern || 'equal',
          customAmounts: config.customAmounts,
          minAmount: config.minAmount ? parseFloat(config.minAmount) : undefined,
          maxAmount: config.maxAmount ? parseFloat(config.maxAmount) : undefined,
          batchSize: parseInt(config.batchSize) || 10,
          delayBetweenBatches: parseInt(config.delayBetweenBatches) || 2,
          priorityFee: config.priorityFee ? parseFloat(config.priorityFee) : undefined
        })

        return NextResponse.json(result, { 
          status: result.success ? 200 : 400 
        })
      }

      case 'pause': {
        if (!sessionId) {
          return NextResponse.json({
            success: false,
            message: 'Session ID is required'
          }, { status: 400 })
        }

        const result = await solDistributionService.pauseSession(sessionId)
        return NextResponse.json(result, {
          status: result.success ? 200 : 400
        })
      }

      case 'resume': {
        if (!sessionId) {
          return NextResponse.json({
            success: false,
            message: 'Session ID is required'
          }, { status: 400 })
        }

        const result = await solDistributionService.resumeSession(sessionId)
        return NextResponse.json(result, {
          status: result.success ? 200 : 400
        })
      }

      case 'stop': {
        if (!sessionId) {
          return NextResponse.json({
            success: false,
            message: 'Session ID is required'
          }, { status: 400 })
        }

        const result = await solDistributionService.stopSession(sessionId)
        return NextResponse.json(result, {
          status: result.success ? 200 : 400
        })
      }

      case 'status': {
        if (!sessionId) {
          return NextResponse.json({
            success: false,
            message: 'Session ID is required'
          }, { status: 400 })
        }

        const session = solDistributionService.getSession(sessionId)
        if (!session) {
          return NextResponse.json({
            success: false,
            message: 'Session not found'
          }, { status: 404 })
        }

        return NextResponse.json({
          success: true,
          session
        })
      }

      case 'cleanup': {
        const cleaned = solDistributionService.cleanup()
        return NextResponse.json({
          success: true,
          message: `Cleaned up ${cleaned} old sessions`,
          cleanedSessions: cleaned
        })
      }

      default:
        return NextResponse.json({
          success: false,
          message: 'Invalid action. Supported actions: start, pause, resume, stop, status, cleanup'
        }, { status: 400 })
    }

  } catch (error) {
    console.error('SOL Distribution API Error (POST):', error)
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    }, { status: 500 })
  }
}
