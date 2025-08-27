'use client'

import { useState } from 'react'
import { Shield, TestTube, Users, Zap } from 'lucide-react'

export default function TrustBuildingBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-green-600/10 border border-blue-500/20 rounded-xl p-6 mb-8">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">🧪 Build Trust with Free Testing!</h3>
          </div>
          
          <p className="text-gray-300 mb-4">
            New to SolX Platform? Start with our <span className="text-blue-400 font-semibold">FREE TESTNET</span> to explore all features risk-free before using real funds.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <TestTube className="w-4 h-4 text-green-400" />
              <span className="text-green-400">Free Token Creation</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400">Test All Features</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400">Build Confidence</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400">
              💡 Pro Tip: Test everything on Testnet first, then deploy on Mainnet with confidence!
            </span>
          </div>
        </div>
        
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-300 ml-4"
        >
          ✕
        </button>
      </div>
      
      <div className="mt-4 p-3 bg-gray-800/30 rounded-lg border-l-4 border-blue-500">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-blue-400">🎯 Quick Start:</span>
          <span className="text-gray-300">
            1. Connect Wallet → 2. Select "Testnet" → 3. Create Token (FREE) → 4. Test Features → 5. Deploy on Mainnet when ready
          </span>
        </div>
      </div>
    </div>
  )
}
