'use client'

import { useEffect } from 'react'

export default function ErrorSuppression() {
  useEffect(() => {
    // Suppress common wallet-related errors that don't affect functionality
    const originalError = console.error
    console.error = (...args) => {
      const message = args[0]?.toString() || ''
      
      // Suppress Phantom wallet-related errors that are expected when wallet is not installed
      if (
        message.includes('window.solana') ||
        message.includes('Phantom') ||
        message.includes('Unable to set window.solana')
      ) {
        // Log as warning instead of error
        console.warn('ℹ️ Wallet not detected (this is normal):', ...args)
        return
      }
      
      // Log all other errors normally
      originalError.apply(console, args)
    }

    return () => {
      console.error = originalError
    }
  }, [])

  return null
}
