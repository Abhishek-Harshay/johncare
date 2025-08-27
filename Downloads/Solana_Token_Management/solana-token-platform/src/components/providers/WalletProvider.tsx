'use client'

import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import { clusterApiUrl } from '@solana/web3.js'
import { ReactNode, useMemo } from 'react'
import { testnetService } from '@/lib/services/testnet'

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css'

interface WalletProviderProps {
  children: ReactNode
}

export function WalletProvider({ children }: WalletProviderProps) {
  // Get network from testnet service (defaults to testnet for trust building)
  const networkConfig = testnetService.getNetworkInfo()
  const endpoint = useMemo(() => {
    // Use testnet service RPC endpoint for better performance
    return testnetService.getRPCEndpoint()
  }, [networkConfig.network])
  
  const wallets = useMemo(
    () => {
      try {
        return [
          new PhantomWalletAdapter(),
        ]
      } catch (error) {
        console.warn('Wallet adapter initialization warning:', error)
        // Return empty array if wallet adapters fail to initialize
        return []
      }
    },
    []
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider 
        wallets={wallets} 
        autoConnect={false}
        onError={(error) => {
          console.warn('Wallet error (this is normal if Phantom is not installed):', error.message)
          // Don't throw error, just log it
        }}
      >
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  )
}
