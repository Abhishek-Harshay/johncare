import { NextRequest, NextResponse } from 'next/server'
import { bulkWalletGeneratorService } from '@/lib/services/bots/bulkWalletGenerator'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')
    const action = searchParams.get('action')

    if (sessionId && action === 'export') {
      // Export wallets
      const format = (searchParams.get('format') || 'json') as 'json' | 'csv' | 'txt'
      const session = bulkWalletGeneratorService.getSession(sessionId)
      
      if (!session) {
        return NextResponse.json({
          success: false,
          message: 'Session not found'
        }, { status: 404 })
      }

      const exportData = bulkWalletGeneratorService.exportWallets(sessionId, format)
      if (!exportData) {
        return NextResponse.json({
          success: false,
          message: 'No wallet data found for export'
        }, { status: 404 })
      }

      const mimeTypes = {
        json: 'application/json',
        csv: 'text/csv',
        txt: 'text/plain'
      }

      const filenames = {
        json: `wallets_${sessionId}.json`,
        csv: `wallets_${sessionId}.csv`,
        txt: `wallets_${sessionId}.txt`
      }

      return new NextResponse(exportData, {
        status: 200,
        headers: {
          'Content-Type': mimeTypes[format],
          'Content-Disposition': `attachment; filename="${filenames[format]}"`
        }
      })
    }

    if (sessionId && action === 'stats') {
      // Get wallet statistics
      const stats = bulkWalletGeneratorService.getWalletStats(sessionId)
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

    if (sessionId) {
      // Get specific session
      const session = bulkWalletGeneratorService.getSession(sessionId)
      if (!session) {
        return NextResponse.json({
          success: false,
          message: 'Session not found'
        }, { status: 404 })
      }

      const includeWallets = searchParams.get('includeWallets') === 'true'
      const wallets = includeWallets ? bulkWalletGeneratorService.getSessionWallets(sessionId) : undefined
      const stats = bulkWalletGeneratorService.getWalletStats(sessionId)
      
      return NextResponse.json({
        success: true,
        session: {
          ...session,
          ...(wallets && { wallets }),
          stats
        }
      })
    }

    // Get all sessions
    const sessions = bulkWalletGeneratorService.getAllSessions()
    
    return NextResponse.json({
      success: true,
      sessions,
      count: sessions.length
    })

  } catch (error) {
    console.error('Bulk Wallet Generator API Error (GET):', error)
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
      case 'generate': {
        if (!config) {
          return NextResponse.json({
            success: false,
            message: 'Configuration is required'
          }, { status: 400 })
        }

        // Validate required fields
        if (!config.count || config.count < 1 || config.count > 100000) {
          return NextResponse.json({
            success: false,
            message: 'Count must be between 1 and 100,000'
          }, { status: 400 })
        }

        // Start new wallet generation session
        const result = await bulkWalletGeneratorService.startGeneration({
          count: parseInt(config.count),
          format: config.format || 'json',
          includePrivateKeys: Boolean(config.includePrivateKeys),
          walletPrefix: config.walletPrefix || undefined,
          generateMnemonics: Boolean(config.generateMnemonics)
        })

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

        const session = bulkWalletGeneratorService.getSession(sessionId)
        if (!session) {
          return NextResponse.json({
            success: false,
            message: 'Session not found'
          }, { status: 404 })
        }

        const stats = bulkWalletGeneratorService.getWalletStats(sessionId)

        return NextResponse.json({
          success: true,
          session: {
            ...session,
            stats
          }
        })
      }

      case 'delete': {
        if (!sessionId) {
          return NextResponse.json({
            success: false,
            message: 'Session ID is required'
          }, { status: 400 })
        }

        const result = bulkWalletGeneratorService.deleteSession(sessionId)
        return NextResponse.json(result, {
          status: result.success ? 200 : 404
        })
      }

      case 'find-wallet': {
        if (!sessionId || !body.publicKey) {
          return NextResponse.json({
            success: false,
            message: 'Session ID and public key are required'
          }, { status: 400 })
        }

        const wallet = bulkWalletGeneratorService.findWallet(sessionId, body.publicKey)
        if (!wallet) {
          return NextResponse.json({
            success: false,
            message: 'Wallet not found'
          }, { status: 404 })
        }

        return NextResponse.json({
          success: true,
          wallet
        })
      }

      case 'update-balance': {
        if (!sessionId || !body.publicKey || typeof body.balance !== 'number') {
          return NextResponse.json({
            success: false,
            message: 'Session ID, public key, and balance are required'
          }, { status: 400 })
        }

        const updated = bulkWalletGeneratorService.updateWalletBalance(
          sessionId, 
          body.publicKey, 
          body.balance
        )

        if (!updated) {
          return NextResponse.json({
            success: false,
            message: 'Failed to update wallet balance'
          }, { status: 404 })
        }

        return NextResponse.json({
          success: true,
          message: 'Wallet balance updated'
        })
      }

      case 'cleanup': {
        const cleaned = bulkWalletGeneratorService.cleanup()
        return NextResponse.json({
          success: true,
          message: `Cleaned up ${cleaned} old sessions`,
          cleanedSessions: cleaned
        })
      }

      default:
        return NextResponse.json({
          success: false,
          message: 'Invalid action. Supported actions: generate, status, delete, find-wallet, update-balance, cleanup'
        }, { status: 400 })
    }

  } catch (error) {
    console.error('Bulk Wallet Generator API Error (POST):', error)
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    }, { status: 500 })
  }
}
