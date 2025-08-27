import { NextRequest, NextResponse } from 'next/server';
import AIService from '@/lib/ai-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, prompt, tokenName, description } = body;

    if (!type || !prompt) {
      return NextResponse.json(
        { success: false, error: 'Type and prompt are required' },
        { status: 400 }
      );
    }

    let result;

    switch (type) {
      case 'design':
        result = await AIService.generateDesignContent(prompt);
        break;
      
      case 'writing':
        result = await AIService.generateWritingContent(prompt);
        break;
      
      case 'token-metadata':
        if (!tokenName) {
          return NextResponse.json(
            { success: false, error: 'Token name is required for metadata generation' },
            { status: 400 }
          );
        }
        result = await AIService.generateTokenMetadata(tokenName, description || '');
        break;
      
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid type. Must be "design", "writing", or "token-metadata"' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: {
        result,
        type,
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.error('AI generation API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'AI service unavailable' },
      { status: 500 }
    );
  }
}
