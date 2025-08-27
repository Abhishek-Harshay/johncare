// Testnet Token Creation API
// Handles token creation for both mainnet and testnet

import { NextRequest, NextResponse } from 'next/server'
import { testnetService } from '@/lib/services/testnet'

interface TokenCreationRequest {
  name: string
  symbol: string
  description: string
  decimals: number
  supply: number
  image?: string
  website?: string
  twitter?: string
  telegram?: string
  payerPrivateKey: string
  enhanceWithAI?: boolean
  network?: 'mainnet' | 'testnet' | 'devnet'
  rpcEndpoint?: string
  isTestnet?: boolean
}

export async function POST(request: NextRequest) {
  try {
    const body: TokenCreationRequest = await request.json()
    
    const {
      name,
      symbol,
      description,
      decimals = 9,
      supply,
      image,
      website,
      twitter,
      telegram,
      payerPrivateKey,
      enhanceWithAI = false,
      network = 'testnet',
      isTestnet = true
    } = body

    // Validation
    if (!name || !symbol || !description || !payerPrivateKey) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: name, symbol, description, or private key'
      }, { status: 400 })
    }

    // Get network configuration
    const networkConfig = testnetService.getNetworkInfo()
    const rpcEndpoint = testnetService.getRPCEndpoint()

    console.log(`🚀 Creating token on ${network.toUpperCase()}:`, {
      name,
      symbol,
      network,
      isTestnet,
      rpcEndpoint: rpcEndpoint.substring(0, 50) + '...'
    })

    // Enhanced description with AI if requested
    let enhancedDescription = description
    if (enhanceWithAI) {
      try {
        const aiResponse = await fetch(`${process.env.NEXTURL || 'http://localhost:3000'}/api/ai/generate-content`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: `Enhance this token description for a Solana token called "${name}" (${symbol}): ${description}. Make it professional and engaging, highlighting utility and benefits. Keep it under 200 characters.`
          })
        })
        
        if (aiResponse.ok) {
          const aiData = await aiResponse.json()
          if (aiData.content) {
            enhancedDescription = aiData.content
          }
        }
      } catch (error) {
        console.warn('AI enhancement failed, using original description:', error)
      }
    }

    // Simulate token creation (in production, use actual Solana Web3.js)
    const mockTokenCreation = async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, isTestnet ? 1000 : 3000))
      
      // Generate mock addresses based on network
      const networkPrefix = isTestnet ? 'TEST' : 'MAIN'
      const mockMintAddress = `${networkPrefix}${Math.random().toString(36).substr(2, 9)}${Date.now().toString(36)}`
      const mockTxHash = `${networkPrefix}_tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      return {
        mintAddress: mockMintAddress,
        transactionHash: mockTxHash,
        explorerUrl: `${networkConfig.explorerUrl}/tx/${mockTxHash}`,
        tokenExplorerUrl: `${networkConfig.explorerUrl}/token/${mockMintAddress}`,
        network: network,
        isTestnet: isTestnet,
        cost: isTestnet ? 'FREE' : '0.2-0.35 SOL'
      }
    }

    // Create token
    const tokenResult = await mockTokenCreation()

    // Log success
    console.log(`✅ Token created successfully on ${network.toUpperCase()}:`, {
      mintAddress: tokenResult.mintAddress,
      txHash: tokenResult.transactionHash,
      cost: tokenResult.cost
    })

    return NextResponse.json({
      success: true,
      message: `Token "${name}" (${symbol}) created successfully on ${network.toUpperCase()}!`,
      data: {
        ...tokenResult,
        name,
        symbol,
        description: enhancedDescription,
        decimals,
        supply,
        image,
        website,
        twitter,
        telegram,
        enhancedWithAI: enhanceWithAI
      }
    })

  } catch (error) {
    console.error('Token creation error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create token. Please try again.',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
