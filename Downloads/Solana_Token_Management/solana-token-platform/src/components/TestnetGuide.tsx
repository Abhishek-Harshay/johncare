'use client'

import { useState } from 'react'
import { HelpCircle, X, ArrowRight, TestTube } from 'lucide-react'

export default function TestnetGuide() {
  const [isVisible, setIsVisible] = useState(false)

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors z-50"
        title="Need help finding testnet features?"
      >
        <HelpCircle className="w-5 h-5" />
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <TestTube className="w-5 h-5 text-blue-400" />
            Where is the Testnet?
          </h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-sm text-gray-300">
          <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-2">🎯 Step 1: Find the Network Selector</h4>
            <p>Look for the blue "Network Selection" card at the top of the Token Manager page.</p>
          </div>

          <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
            <h4 className="font-semibold text-green-400 mb-2">🔄 Step 2: Switch to Testnet</h4>
            <p>Click on the "TESTNET" or "DEVNET" button - you'll see "FREE" displayed underneath.</p>
          </div>

          <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
            <h4 className="font-semibold text-purple-400 mb-2">✨ Step 3: Create Free Tokens</h4>
            <p>Now when you create tokens, you'll see "FREE" pricing instead of SOL costs!</p>
          </div>

          <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-400 mb-2">🛡️ Look for Trust Indicators</h4>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Trust Building Banner (blue section at top)</li>
              <li>Network warnings (testnet vs mainnet)</li>
              <li>"FREE" labels on testnet features</li>
              <li>🧪 Test tube icons for testnet mode</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-400 mb-3">
              <strong>Don't see these features?</strong> Try refreshing the page or check the console for any loading errors.
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsVisible(false)}
                className="flex-1 px-3 py-2 bg-gray-800 text-gray-300 rounded-lg text-xs hover:bg-gray-700 transition-colors"
              >
                Got it!
              </button>
              <button
                onClick={() => {
                  setIsVisible(false)
                  window.location.reload()
                }}
                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
              >
                Refresh Page <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
