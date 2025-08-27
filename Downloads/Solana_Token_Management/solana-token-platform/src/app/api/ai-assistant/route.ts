import { NextRequest, NextResponse } from 'next/server'
import { aiAssistantService } from '@/lib/services/aiAssistant'

export async function POST(req: NextRequest) {
  try {
    const { action, sessionId, message } = await req.json()

    switch (action) {
      case 'createSession':
        const newSessionId = aiAssistantService.createSession()
        return NextResponse.json({ 
          success: true, 
          sessionId: newSessionId,
          session: aiAssistantService.getSession(newSessionId)
        })

      case 'sendMessage':
        if (!sessionId || !message) {
          return NextResponse.json(
            { success: false, error: 'Session ID and message are required' },
            { status: 400 }
          )
        }

        const response = await aiAssistantService.processMessage(sessionId, message)
        const updatedSession = aiAssistantService.getSession(sessionId)

        return NextResponse.json({
          success: true,
          response,
          session: updatedSession
        })

      case 'getSession':
        if (!sessionId) {
          return NextResponse.json(
            { success: false, error: 'Session ID is required' },
            { status: 400 }
          )
        }

        const session = aiAssistantService.getSession(sessionId)
        if (!session) {
          return NextResponse.json(
            { success: false, error: 'Session not found' },
            { status: 404 }
          )
        }

        return NextResponse.json({
          success: true,
          session
        })

      case 'deleteSession':
        if (!sessionId) {
          return NextResponse.json(
            { success: false, error: 'Session ID is required' },
            { status: 400 }
          )
        }

        const deleted = aiAssistantService.deleteSession(sessionId)
        return NextResponse.json({
          success: true,
          deleted
        })

      case 'getAllSessions':
        const allSessions = aiAssistantService.getAllSessions()
        return NextResponse.json({
          success: true,
          sessions: allSessions
        })

      case 'cleanup':
        const cleanupResult = aiAssistantService.cleanup()
        return NextResponse.json({
          success: true,
          ...cleanupResult
        })

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error: any) {
    console.error('AI Assistant API error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
