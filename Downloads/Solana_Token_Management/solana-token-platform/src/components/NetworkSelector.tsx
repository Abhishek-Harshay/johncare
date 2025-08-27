'use client'

import { useState, useEffect } from 'react'
import { testnetService } from '@/lib/services/testnet'

interface NetworkSelectorProps {
  onNetworkChange?: (network: 'mainnet' | 'testnet' | 'devnet') => void
}

export default function NetworkSelector({ onNetworkChange }: NetworkSelectorProps) {
  const [currentNetwork, setCurrentNetwork] = useState<'mainnet' | 'testnet' | 'devnet'>('testnet')
  const [networkInfo, setNetworkInfo] = useState(testnetService.getNetworkInfo())

  useEffect(() => {
    // Default to testnet for new users to build trust
    testnetService.setNetwork('testnet')
    setNetworkInfo(testnetService.getNetworkInfo())
  }, [])

  const handleNetworkChange = (network: 'mainnet' | 'testnet' | 'devnet') => {
    setCurrentNetwork(network)
    testnetService.setNetwork(network)
    setNetworkInfo(testnetService.getNetworkInfo())
    onNetworkChange?.(network)
  }

  const getNetworkColor = (network: string) => {
    switch (network) {
      case 'mainnet': return 'text-green-400 bg-green-500/10 border-green-500/20'
      case 'testnet': return 'text-blue-400 bg-blue-500/10 border-blue-500/20'
      case 'devnet': return 'text-purple-400 bg-purple-500/10 border-purple-500/20'
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20'
    }
  }

  const getNetworkIcon = (network: string) => {
    switch (network) {
      case 'mainnet': return '🟢'
      case 'testnet': return '🔵'
      case 'devnet': return '🟣'
      default: return '⚫'
    }
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Network Selection</h3>
        <div className={`px-3 py-1 rounded-full border ${getNetworkColor(currentNetwork)} text-sm font-medium`}>
          {getNetworkIcon(currentNetwork)} {currentNetwork.toUpperCase()}
        </div>
      </div>

      {/* Network Warning/Info */}
      <div className={`p-4 rounded-lg mb-4 ${
        currentNetwork === 'mainnet' 
          ? 'bg-red-500/10 border border-red-500/20 text-red-300' 
          : 'bg-blue-500/10 border border-blue-500/20 text-blue-300'
      }`}>
        <p className="text-sm">{networkInfo.isFree ? '🧪' : '⚠️'} {testnetService.getTestnetWarning()}</p>
        {networkInfo.isFree && (
          <p className="text-xs mt-2 opacity-75">
            Perfect for testing! Create tokens, test liquidity, and explore features risk-free.
          </p>
        )}
      </div>

      {/* Network Options */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {(['testnet', 'devnet', 'mainnet'] as const).map((network) => (
          <button
            key={network}
            onClick={() => handleNetworkChange(network)}
            className={`p-3 rounded-lg border transition-all ${
              currentNetwork === network
                ? getNetworkColor(network) + ' scale-105'
                : 'bg-gray-800/30 border-gray-700/50 text-gray-400 hover:bg-gray-700/30 hover:border-gray-600/50'
            }`}
          >
            <div className="text-center">
              <div className="text-lg mb-1">{getNetworkIcon(network)}</div>
              <div className="text-xs font-medium capitalize">{network}</div>
              {network !== 'mainnet' && (
                <div className="text-xs opacity-75 mt-1">FREE</div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Network Features */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-300">Current Network Features:</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className={`flex items-center gap-2 ${networkInfo.isFree ? 'text-green-400' : 'text-red-400'}`}>
            {networkInfo.isFree ? '✅' : '❌'} Free Token Creation
          </div>
          <div className={`flex items-center gap-2 ${networkInfo.isFree ? 'text-green-400' : 'text-red-400'}`}>
            {networkInfo.isFree ? '✅' : '❌'} Free Transactions
          </div>
          <div className={`flex items-center gap-2 ${networkInfo.isFree ? 'text-green-400' : 'text-red-400'}`}>
            {networkInfo.isFree ? '✅' : '❌'} Test Liquidity
          </div>
          <div className={`flex items-center gap-2 ${networkInfo.faucetUrl ? 'text-green-400' : 'text-gray-500'}`}>
            {networkInfo.faucetUrl ? '✅' : '➖'} SOL Faucet
          </div>
        </div>
      </div>

      {/* Testnet Faucet */}
      {networkInfo.isFree && networkInfo.faucetUrl && (
        <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-300 font-medium">Need test SOL?</p>
              <p className="text-xs text-blue-400/75">Get free SOL for testing</p>
            </div>
            <button
              onClick={() => {
                // This would trigger faucet request
                alert('Faucet feature coming soon! For now, testnet SOL will be provided automatically.')
              }}
              className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg text-xs font-medium transition-colors"
            >
              💧 Get Test SOL
            </button>
          </div>
        </div>
      )}

      {/* Explorer Link */}
      <div className="mt-4 pt-4 border-t border-gray-800/50">
        <a
          href={networkInfo.explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between text-xs text-gray-400 hover:text-gray-300 transition-colors"
        >
          <span>View on Solana Explorer</span>
          <span>↗</span>
        </a>
      </div>
    </div>
  )
}
