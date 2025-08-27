// Testnet Configuration Service
// Provides free testing environment for users to build trust

export interface TestnetConfig {
  network: 'mainnet' | 'testnet' | 'devnet'
  rpcEndpoint: string
  explorerUrl: string
  faucetUrl?: string
  isFree: boolean
}

export class TestnetService {
  private static instance: TestnetService
  private currentNetwork: TestnetConfig['network'] = 'testnet'

  // Network configurations
  private networks: Record<TestnetConfig['network'], TestnetConfig> = {
    mainnet: {
      network: 'mainnet',
      rpcEndpoint: 'https://api.mainnet-beta.solana.com',
      explorerUrl: 'https://explorer.solana.com',
      isFree: false
    },
    testnet: {
      network: 'testnet',
      rpcEndpoint: 'https://api.testnet.solana.com',
      explorerUrl: 'https://explorer.solana.com?cluster=testnet',
      faucetUrl: 'https://faucet.solana.com',
      isFree: true
    },
    devnet: {
      network: 'devnet',
      rpcEndpoint: 'https://api.devnet.solana.com',
      explorerUrl: 'https://explorer.solana.com?cluster=devnet',
      faucetUrl: 'https://faucet.solana.com',
      isFree: true
    }
  }

  public static getInstance(): TestnetService {
    if (!TestnetService.instance) {
      TestnetService.instance = new TestnetService()
    }
    return TestnetService.instance
  }

  getCurrentNetwork(): TestnetConfig {
    return this.networks[this.currentNetwork]
  }

  setNetwork(network: TestnetConfig['network']): void {
    this.currentNetwork = network
    console.log(`🔄 Network switched to: ${network.toUpperCase()}`)
  }

  isTestMode(): boolean {
    return this.currentNetwork !== 'mainnet'
  }

  getNetworkInfo(): TestnetConfig {
    return this.getCurrentNetwork()
  }

  // Get appropriate RPC endpoint based on current network
  getRPCEndpoint(): string {
    const network = this.getCurrentNetwork()
    
    // Use Helius for better performance if available
    if (this.currentNetwork === 'testnet') {
      const heliusKey = process.env.HELIUS_API_KEY_1
      if (heliusKey) {
        return `https://devnet.helius-rpc.com/?api-key=${heliusKey}`
      }
    }
    
    return network.rpcEndpoint
  }

  // Get testnet SOL from faucet
  async requestTestnetSOL(publicKey: string): Promise<{ success: boolean; message: string; txHash?: string }> {
    if (this.currentNetwork === 'mainnet') {
      return { success: false, message: 'Faucet not available on mainnet' }
    }

    try {
      const network = this.getCurrentNetwork()
      if (!network.faucetUrl) {
        return { success: false, message: 'Faucet not available for this network' }
      }

      // Simulate faucet request (in real implementation, call actual faucet API)
      console.log(`💧 Requesting testnet SOL for: ${publicKey}`)
      
      // Mock successful faucet response
      const mockTxHash = `faucet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      return {
        success: true,
        message: `Successfully airdropped 2 SOL to ${publicKey.slice(0, 8)}...`,
        txHash: mockTxHash
      }
    } catch (error) {
      console.error('Faucet request failed:', error)
      return { success: false, message: 'Faucet request failed' }
    }
  }

  // Generate warning message for testnet usage
  getTestnetWarning(): string {
    if (this.currentNetwork === 'mainnet') {
      return '⚠️ You are on MAINNET - Real tokens and SOL will be used!'
    }
    
    return `ℹ️ You are on ${this.currentNetwork.toUpperCase()} - This is a free testing environment. No real value involved.`
  }

  // Get network-specific explorer URL
  getExplorerUrl(signature?: string): string {
    const network = this.getCurrentNetwork()
    const baseUrl = network.explorerUrl
    
    if (signature) {
      return `${baseUrl}/tx/${signature}`
    }
    
    return baseUrl
  }

  // Testnet-specific token creation parameters
  getTokenCreationConfig() {
    return {
      network: this.currentNetwork,
      isFree: this.isTestMode(),
      rpcEndpoint: this.getRPCEndpoint(),
      explorerUrl: this.getCurrentNetwork().explorerUrl,
      warning: this.getTestnetWarning(),
      features: {
        freeCreation: this.isTestMode(),
        freeLiquidity: this.isTestMode(),
        freeTransactions: this.isTestMode(),
        testnetFaucet: this.isTestMode()
      }
    }
  }
}

// Export singleton instance
export const testnetService = TestnetService.getInstance()
