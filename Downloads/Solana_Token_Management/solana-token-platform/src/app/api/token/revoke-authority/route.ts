import { NextRequest, NextResponse } from 'next/server';
import SolanaTokenService from '@/lib/solana-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mintAddress, payerPrivateKey, authorityType } = body;

    if (!mintAddress || !payerPrivateKey || !authorityType) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let result;
    
    if (authorityType === 'mint') {
      result = await SolanaTokenService.revokeMintAuthority(mintAddress, payerPrivateKey);
    } else if (authorityType === 'freeze') {
      result = await SolanaTokenService.revokeFreezeAuthority(mintAddress, payerPrivateKey);
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid authority type. Must be "mint" or "freeze"' },
        { status: 400 }
      );
    }

    if (result.success) {
      return NextResponse.json({
        success: true,
        data: {
          signature: result.signature,
          transactionUrl: `https://solscan.io/tx/${result.signature}`,
          authorityType,
          status: 'revoked'
        }
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('Authority revocation API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
