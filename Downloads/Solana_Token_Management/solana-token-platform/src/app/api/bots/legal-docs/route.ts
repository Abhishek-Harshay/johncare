import { NextRequest, NextResponse } from 'next/server'
import { legalDocGeneratorService } from '@/lib/services/bots/legalDocGenerator'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')
    const action = searchParams.get('action')

    if (sessionId && action === 'export') {
      // Export documents
      const result = legalDocGeneratorService.exportDocuments(sessionId)
      
      if (result.success && result.data) {
        return new NextResponse(result.data, {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Content-Disposition': `attachment; filename="legal_docs_${sessionId}.json"`
          }
        })
      } else {
        return NextResponse.json({ success: false, message: result.message }, { status: 400 })
      }
    }

    if (sessionId && action === 'validate') {
      // Get validation results
      const session = legalDocGeneratorService.getSession(sessionId)
      if (!session) {
        return NextResponse.json({ success: false, message: 'Session not found' }, { status: 404 })
      }

      const validation = legalDocGeneratorService.validateCompliance(session.config)
      return NextResponse.json({
        success: true,
        validation
      })
    }

    if (sessionId) {
      // Get specific session
      const session = legalDocGeneratorService.getSession(sessionId)
      if (!session) {
        return NextResponse.json({ success: false, message: 'Session not found' }, { status: 404 })
      }

      return NextResponse.json({
        success: true,
        session
      })
    }

    // Get all sessions
    const sessions = legalDocGeneratorService.getAllSessions()
    return NextResponse.json({
      success: true,
      sessions
    })

  } catch (error) {
    console.error('Legal doc generator GET error:', error)
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

        // Validate configuration
        const validation = legalDocGeneratorService.validateCompliance(config)
        if (!validation.isValid) {
          return NextResponse.json({
            success: false,
            message: 'Configuration validation failed',
            errors: validation.errors,
            warnings: validation.warnings
          }, { status: 400 })
        }

        const result = await legalDocGeneratorService.startGeneration(config)
        
        if (result.success) {
          return NextResponse.json({
            success: true,
            sessionId: result.sessionId,
            message: result.message,
            warnings: validation.warnings
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

        const deleted = legalDocGeneratorService.deleteSession(sessionId)
        
        return NextResponse.json({
          success: deleted,
          message: deleted ? 'Session deleted successfully' : 'Session not found'
        })
      }

      case 'validate': {
        const { config } = body
        
        if (!config) {
          return NextResponse.json({
            success: false,
            message: 'Configuration is required for validation'
          }, { status: 400 })
        }

        const validation = legalDocGeneratorService.validateCompliance(config)
        
        return NextResponse.json({
          success: true,
          validation
        })
      }

      case 'cleanup': {
        const result = legalDocGeneratorService.cleanup()
        
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
    console.error('Legal doc generator POST error:', error)
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

    const deleted = legalDocGeneratorService.deleteSession(sessionId)

    return NextResponse.json({
      success: deleted,
      message: deleted ? 'Session deleted successfully' : 'Session not found'
    })

  } catch (error) {
    console.error('Legal doc generator DELETE error:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to delete session'
    }, { status: 500 })
  }
}
