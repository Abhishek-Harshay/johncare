// Volume Bot API Endpoint
// Handles volume bot operations

import { NextRequest, NextResponse } from 'next/server'
import { volumeBot, VolumeConfig } from '@/lib/services/bots/volumeBot'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, config, sessionId } = body

    switch (action) {
      case 'start':
        if (!config) {
          return NextResponse.json({
            success: false,
            error: 'Volume configuration is required'
          }, { status: 400 })
        }

        const result = await volumeBot.startVolumeSession(config as VolumeConfig)
        return NextResponse.json(result)

      case 'stop':
        if (!sessionId) {
          return NextResponse.json({
            success: false,
            error: 'Session ID is required'
          }, { status: 400 })
        }

        const stopped = await volumeBot.stopVolumeSession(sessionId, 'user')
        return NextResponse.json({
          success: stopped,
          message: stopped ? 'Volume bot stopped successfully' : 'Failed to stop volume bot'
        })

      case 'pause':
        if (!sessionId) {
          return NextResponse.json({
            success: false,
            error: 'Session ID is required'
          }, { status: 400 })
        }

        const paused = await volumeBot.pauseVolumeSession(sessionId)
        return NextResponse.json({
          success: paused,
          message: paused ? 'Volume bot paused' : 'Failed to pause volume bot'
        })

      case 'resume':
        if (!sessionId) {
          return NextResponse.json({
            success: false,
            error: 'Session ID is required'
          }, { status: 400 })
        }

        const resumed = await volumeBot.resumeVolumeSession(sessionId)
        return NextResponse.json({
          success: resumed,
          message: resumed ? 'Volume bot resumed' : 'Failed to resume volume bot'
        })

      case 'status':
        if (sessionId) {
          const session = volumeBot.getSession(sessionId)
          return NextResponse.json({
            success: true,
            session
          })
        } else {
          const sessions = volumeBot.getAllSessions()
          return NextResponse.json({
            success: true,
            sessions
          })
        }

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action. Supported actions: start, stop, pause, resume, status'
        }, { status: 400 })
    }

  } catch (error) {
    console.error('Volume Bot API error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')

    if (sessionId) {
      const session = volumeBot.getSession(sessionId)
      return NextResponse.json({
        success: true,
        session
      })
    } else {
      const sessions = volumeBot.getAllSessions()
      return NextResponse.json({
        success: true,
        sessions,
        count: sessions.length
      })
    }

  } catch (error) {
    console.error('Volume Bot GET API error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}
