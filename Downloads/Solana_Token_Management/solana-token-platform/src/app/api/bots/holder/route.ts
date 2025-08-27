import { NextRequest, NextResponse } from 'next/server'
import { holderGeneratorService } from '@/lib/services/bots/holderGenerator'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')

    if (sessionId) {
      // Get specific session
      const session = holderGeneratorService.getSession(sessionId)
      if (!session) {
        return NextResponse.json({
          success: false,
          message: 'Session not found'
        }, { status: 404 })
      }

      // Get additional stats
      const stats = holderGeneratorService.getHolderStats(sessionId)
      
      return NextResponse.json({
        success: true,
        session: {
          ...session,
          stats
        }
      })
    }

    // Get all sessions
    const sessions = holderGeneratorService.getAllSessions()
    
    return NextResponse.json({
      success: true,
      sessions,
      count: sessions.length
    })

  } catch (error) {
    console.error('Holder Generator API Error (GET):', error)
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
        if (!config.tokenAddress) {
          return NextResponse.json({
            success: false,
            message: 'Token address is required'
          }, { status: 400 })
        }

        if (!config.targetHolders || config.targetHolders < 10 || config.targetHolders > 10000) {
          return NextResponse.json({
            success: false,
            message: 'Target holders must be between 10 and 10,000'
          }, { status: 400 })
        }

        // Start new holder generation session
        const result = await holderGeneratorService.startSession({
          tokenAddress: config.tokenAddress,
          targetHolders: parseInt(config.targetHolders),
          duration: parseInt(config.duration) || 120,
          minBalance: parseFloat(config.minBalance) || 1000,
          maxBalance: parseFloat(config.maxBalance) || 100000,
          holderPattern: config.holderPattern || 'natural',
          retentionRate: parseInt(config.retentionRate) || 85,
          distributionSpeed: parseInt(config.distributionSpeed) || 2
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

        const result = await holderGeneratorService.pauseSession(sessionId)
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

        const result = await holderGeneratorService.resumeSession(sessionId)
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

        const result = await holderGeneratorService.stopSession(sessionId)
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

        const session = holderGeneratorService.getSession(sessionId)
        if (!session) {
          return NextResponse.json({
            success: false,
            message: 'Session not found'
          }, { status: 404 })
        }

        const stats = holderGeneratorService.getHolderStats(sessionId)

        return NextResponse.json({
          success: true,
          session: {
            ...session,
            stats
          }
        })
      }

      case 'export': {
        if (!sessionId) {
          return NextResponse.json({
            success: false,
            message: 'Session ID is required'
          }, { status: 400 })
        }

        const csvData = holderGeneratorService.exportWallets(sessionId)
        if (!csvData) {
          return NextResponse.json({
            success: false,
            message: 'No wallet data found for this session'
          }, { status: 404 })
        }

        return new NextResponse(csvData, {
          status: 200,
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': `attachment; filename="holders_${sessionId}.csv"`
          }
        })
      }

      case 'stats': {
        if (!sessionId) {
          return NextResponse.json({
            success: false,
            message: 'Session ID is required'
          }, { status: 400 })
        }

        const stats = holderGeneratorService.getHolderStats(sessionId)
        if (!stats) {
          return NextResponse.json({
            success: false,
            message: 'No stats available for this session'
          }, { status: 404 })
        }

        return NextResponse.json({
          success: true,
          stats
        })
      }

      case 'cleanup': {
        const cleaned = holderGeneratorService.cleanup()
        return NextResponse.json({
          success: true,
          message: `Cleaned up ${cleaned} old sessions`,
          cleanedSessions: cleaned
        })
      }

      default:
        return NextResponse.json({
          success: false,
          message: 'Invalid action. Supported actions: start, pause, resume, stop, status, export, stats, cleanup'
        }, { status: 400 })
    }

  } catch (error) {
    console.error('Holder Generator API Error (POST):', error)
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    }, { status: 500 })
  }
}
