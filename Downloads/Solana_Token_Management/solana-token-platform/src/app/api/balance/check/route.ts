import { NextRequest, NextResponse } from 'next/server';
import SolanaTokenService from '@/lib/solana-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { wallets } = body;

    if (!wallets || !Array.isArray(wallets)) {
      return NextResponse.json(
        { success: false, error: 'Wallets array is required' },
        { status: 400 }
      );
    }

    // Extract public keys from the wallets array
    const publicKeys = wallets.map(wallet => 
      typeof wallet === 'string' ? wallet : wallet.publicKey
    ).filter(key => key);

    if (publicKeys.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid public keys found' },
        { status: 400 }
      );
    }

    console.log(`Checking balances for ${publicKeys.length} wallets...`);
    
    const results = await SolanaTokenService.getBulkBalances(publicKeys);
    
    return NextResponse.json({
      success: true,
      data: {
        results,
        totalWallets: results.length,
        totalBalance: results.reduce((sum, wallet) => sum + wallet.balance, 0),
        walletsWithBalance: results.filter(wallet => wallet.balance > 0).length
      }
    });

  } catch (error: any) {
    console.error('Balance check API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
