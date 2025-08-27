import { NextRequest, NextResponse } from 'next/server'
import { complianceCheckerService } from '@/lib/services/bots/complianceChecker'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')
    const action = searchParams.get('action')

    if (sessionId && action === 'export') {
      // Export compliance report
      const result = complianceCheckerService.exportReport(sessionId)
      
      if (result.success && result.data) {
        return new NextResponse(result.data, {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Content-Disposition': `attachment; filename="compliance_report_${sessionId}.json"`
          }
        })
      } else {
        return NextResponse.json({ success: false, message: result.message }, { status: 400 })
      }
    }

    if (sessionId) {
      // Get specific session
      const session = complianceCheckerService.getSession(sessionId)
      if (!session) {
        return NextResponse.json({ success: false, message: 'Session not found' }, { status: 404 })
      }

      return NextResponse.json({
        success: true,
        session
      })
    }

    // Get all sessions
    const sessions = complianceCheckerService.getAllSessions()
    return NextResponse.json({
      success: true,
      sessions
    })

  } catch (error) {
    console.error('Compliance checker GET error:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to process request'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    switch (action) {
      case 'start': {
        const { config } = body
        
        if (!config) {
          return NextResponse.json({
            success: false,
            message: 'Configuration is required'
          }, { status: 400 })
        }

        // Validate required fields
        if (!config.projectName || !config.tokenSymbol) {
          return NextResponse.json({
            success: false,
            message: 'Project name and token symbol are required'
          }, { status: 400 })
        }

        const result = await complianceCheckerService.startAnalysis(config)
        
        if (result.success) {
          return NextResponse.json({
            success: true,
            sessionId: result.sessionId,
            message: result.message
          })
        } else {
          return NextResponse.json({
            success: false,
            message: result.message
          }, { status: 400 })
        }
      }

      case 'delete': {
        const { sessionId } = body
        
        if (!sessionId) {
          return NextResponse.json({
            success: false,
            message: 'Session ID is required'
          }, { status: 400 })
        }

        const deleted = complianceCheckerService.deleteSession(sessionId)
        
        return NextResponse.json({
          success: deleted,
          message: deleted ? 'Session deleted successfully' : 'Session not found'
        })
      }

      case 'cleanup': {
        const result = complianceCheckerService.cleanup()
        
        return NextResponse.json({
          success: true,
          message: `Cleaned up ${result.cleaned} of ${result.total} sessions`
        })
      }

      default:
        return NextResponse.json({
          success: false,
          message: 'Invalid action'
        }, { status: 400 })
    }

  } catch (error) {
    console.error('Compliance checker POST error:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to process request'
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')

    if (!sessionId) {
      return NextResponse.json({
        success: false,
        message: 'Session ID is required'
      }, { status: 400 })
    }

    const deleted = complianceCheckerService.deleteSession(sessionId)

    return NextResponse.json({
      success: deleted,
      message: deleted ? 'Session deleted successfully' : 'Session not found'
    })

  } catch (error) {
    console.error('Compliance checker DELETE error:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to delete session'
    }, { status: 500 })
  }
}
