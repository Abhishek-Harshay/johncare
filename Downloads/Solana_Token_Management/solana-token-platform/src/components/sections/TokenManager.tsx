'use client'

import { useState } from 'react'
import { Plus, Shield, Slash, Loader2, ExternalLink, Sparkles } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'
import { testnetService } from '@/lib/services/testnet'
import NetworkSelector from '@/components/NetworkSelector'
import TrustBuildingBanner from '@/components/TrustBuildingBanner'
import TestnetGuide from '@/components/TestnetGuide'

interface TokenForm {
  name: string;
  symbol: string;
  description: string;
  decimals: number;
  supply: number;
  image: string;
  website: string;
  twitter: string;
  telegram: string;
}

interface AuthorityForm {
  mintAddress: string;
  authorityType: 'mint' | 'freeze';
}

const tokenManagerFeatures = [
  {
    id: 'create-token',
    title: 'Create Token',
    description: 'Token Creation',
    steps: [
      'Connect your Solana wallet.',
      'Choose network (Testnet for free testing).',
      'Click on "Create Token" - New window will pop-up.',
      'Provide details and create token in 30 seconds.',
    ],
    pricing: {
      testnet: 'FREE (Perfect for testing)',
      solxHolders: '.2 SOL (Minimum SOLX holding - 200,000)',
      nonSolxHolders: '.35 SOL'
    },
    icon: Plus,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    id: 'revoke-mint',
    title: 'Revoke Mint Authority',
    description: 'Remove Mint Authority',
    steps: [
      'Connect your Solana wallet.',
      'Select your preferred network.',
      'Click on "Revoke Mint Authority" - New window will pop-up',
      'Provide "Token Address" and click remove.',
    ],
    pricing: {
      solxHolders: 'Free',
      nonSolxHolders: '.05 SOL'
    },
    icon: Shield,
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    id: 'revoke-freeze',
    title: 'Revoke Freeze Authority',
    description: 'Remove Freeze Authority',
    steps: [
      'Connect your Solana wallet.',
      'Click on "Revoke Freeze Authority" - New window will pop-up',
    ],
    pricing: {
      solxHolders: 'Free',
      nonSolxHolders: '.05 SOL'
    },
    icon: Slash,
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600'
  }
]

export default function TokenManager() {
  const { publicKey, signTransaction } = useWallet()
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [enhanceWithAI, setEnhanceWithAI] = useState(false)
  
  // Token creation form
  const [tokenForm, setTokenForm] = useState<TokenForm>({
    name: '',
    symbol: '',
    description: '',
    decimals: 9,
    supply: 1000000,
    image: '',
    website: '',
    twitter: '',
    telegram: ''
  })

  // Authority revocation form
  const [authorityForm, setAuthorityForm] = useState<AuthorityForm>({
    mintAddress: '',
    authorityType: 'mint'
  })

  const resetForms = () => {
    setTokenForm({
      name: '', symbol: '', description: '', decimals: 9, supply: 1000000,
      image: '', website: '', twitter: '', telegram: ''
    })
    setAuthorityForm({ mintAddress: '', authorityType: 'mint' })
    setResult(null)
  }

  const handleCreateToken = async () => {
    if (!publicKey) {
      alert('Please connect your wallet first')
      return
    }

    if (!tokenForm.name || !tokenForm.symbol || !tokenForm.description) {
      alert('Please fill in all required fields')
      return
    }

    // Get current network configuration
    const networkConfig = testnetService.getTokenCreationConfig()
    const isTestMode = testnetService.isTestMode()

    setIsLoading(true)
    try {
      // Show network warning for mainnet
      if (!isTestMode) {
        const confirmed = confirm('⚠️ You are creating a token on MAINNET. Real SOL will be used. Continue?')
        if (!confirmed) {
          setIsLoading(false)
          return
        }
      } else {
        alert(`🧪 Creating token on ${networkConfig.network.toUpperCase()} - This is FREE for testing!`)
      }

      // Get private key from user (in production, use proper wallet integration)
      const privateKey = prompt(`Enter your private key for ${networkConfig.network.toUpperCase()} (this is for demo - in production this would be handled securely):`)
      if (!privateKey) {
        setIsLoading(false)
        return
      }

      const response = await fetch('/api/token/create-testnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...tokenForm,
          payerPrivateKey: privateKey,
          enhanceWithAI,
          network: networkConfig.network,
          rpcEndpoint: networkConfig.rpcEndpoint,
          isTestnet: isTestMode
        })
      })

      const data = await response.json()
      setResult({
        ...data,
        network: networkConfig.network,
        isTestnet: isTestMode,
        explorerUrl: networkConfig.explorerUrl
      })
      
      if (data.success) {
        alert(`Token created successfully! Mint: ${data.data.mintAddress}`)
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      console.error('Error creating token:', error)
      alert('Failed to create token')
    }
    setIsLoading(false)
  }

  const handleRevokeAuthority = async () => {
    if (!publicKey) {
      alert('Please connect your wallet first')
      return
    }

    if (!authorityForm.mintAddress) {
      alert('Please enter the token mint address')
      return
    }

    setIsLoading(true)
    try {
      const privateKey = prompt('Enter your private key (this is for demo - in production this would be handled securely):')
      if (!privateKey) {
        setIsLoading(false)
        return
      }

      const response = await fetch('/api/token/revoke-authority', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...authorityForm,
          payerPrivateKey: privateKey
        })
      })

      const data = await response.json()
      setResult(data)
      
      if (data.success) {
        alert(`${authorityForm.authorityType} authority revoked successfully!`)
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      console.error('Error revoking authority:', error)
      alert('Failed to revoke authority')
    }
    setIsLoading(false)
  }
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
          SolX Engine Token Lab - AI-Powered Token Genesis
        </h1>
        <p className="text-zinc-400">
          Create and manage your Solana SPL tokens with AI-enhanced automation
        </p>
      </div>

      {/* Trust Building Banner */}
      <TrustBuildingBanner />

      {/* Network Selector */}
      <div className="mb-8">
        <NetworkSelector 
          onNetworkChange={(network) => {
            console.log('Network changed to:', network)
            // Reset any ongoing processes when network changes
            resetForms()
          }}
        />
      </div>

      {/* Feature Cards Grid - Now with working buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {tokenManagerFeatures.map((feature) => (
          <div 
            key={feature.id} 
            className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6 hover:shadow-xl hover:border-zinc-700 transition-all"
          >
            <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-4 bg-opacity-20`}>
              <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-zinc-400 text-sm mb-4">
              {feature.description}
            </p>
            <button
              onClick={() => {
                resetForms()
                setActiveModal(feature.id)
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all"
            >
              {feature.title}
            </button>
          </div>
        ))}
      </div>

      {/* Results Display */}
      {result && (
        <div className={`mb-8 p-6 rounded-xl border ${result.success ? 'bg-green-900 bg-opacity-30 border-green-700' : 'bg-red-900 bg-opacity-30 border-red-700'}`}>
          <h3 className={`text-lg font-semibold mb-2 ${result.success ? 'text-green-300' : 'text-red-300'}`}>
            {result.success ? 'Success!' : 'Error'}
          </h3>
          {result.success ? (
            <div className="space-y-2">
              {result.data.mintAddress && (
                <p className="text-green-200">
                  <strong>Mint Address:</strong> {result.data.mintAddress}
                </p>
              )}
              {result.data.signature && (
                <p className="text-green-200">
                  <strong>Transaction:</strong> 
                  <a 
                    href={result.data.transactionUrl || `https://solscan.io/tx/${result.data.signature}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-blue-400 hover:text-blue-300 inline-flex items-center"
                  >
                    View on Solscan <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </p>
              )}
              {result.data.explorerUrl && (
                <p className="text-green-200">
                  <strong>Token:</strong>
                  <a 
                    href={result.data.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-blue-400 hover:text-blue-300 inline-flex items-center"
                  >
                    View Token <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </p>
              )}
            </div>
          ) : (
            <p className="text-red-200">{result.error}</p>
          )}
        </div>
      )}

      {/* Create Token Modal */}
      {activeModal === 'create-token' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4">Create New Token</h2>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Token Name *</label>
                  <input
                    type="text"
                    value={tokenForm.name}
                    onChange={(e) => setTokenForm({...tokenForm, name: e.target.value})}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                    placeholder="My Awesome Token"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Symbol *</label>
                  <input
                    type="text"
                    value={tokenForm.symbol}
                    onChange={(e) => setTokenForm({...tokenForm, symbol: e.target.value.toUpperCase()})}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                    placeholder="MAT"
                    maxLength={10}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Description *</label>
                <textarea
                  value={tokenForm.description}
                  onChange={(e) => setTokenForm({...tokenForm, description: e.target.value})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                  placeholder="Describe your token's purpose and utility..."
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Decimals</label>
                  <input
                    type="number"
                    value={tokenForm.decimals}
                    onChange={(e) => setTokenForm({...tokenForm, decimals: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                    min={0}
                    max={9}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Total Supply</label>
                  <input
                    type="number"
                    value={tokenForm.supply}
                    onChange={(e) => setTokenForm({...tokenForm, supply: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                    min={1}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Image URL (Optional)</label>
                <input
                  type="url"
                  value={tokenForm.image}
                  onChange={(e) => setTokenForm({...tokenForm, image: e.target.value})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                  placeholder="https://your-image-url.com/token-logo.png"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Website</label>
                  <input
                    type="url"
                    value={tokenForm.website}
                    onChange={(e) => setTokenForm({...tokenForm, website: e.target.value})}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                    placeholder="https://mytoken.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Twitter</label>
                  <input
                    type="text"
                    value={tokenForm.twitter}
                    onChange={(e) => setTokenForm({...tokenForm, twitter: e.target.value})}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                    placeholder="@mytoken"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Telegram</label>
                  <input
                    type="text"
                    value={tokenForm.telegram}
                    onChange={(e) => setTokenForm({...tokenForm, telegram: e.target.value})}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                    placeholder="@mytoken_chat"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="enhanceWithAI"
                  checked={enhanceWithAI}
                  onChange={(e) => setEnhanceWithAI(e.target.checked)}
                  className="rounded bg-zinc-800 border-zinc-700 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="enhanceWithAI" className="text-sm text-zinc-300 flex items-center">
                  <Sparkles className="w-4 h-4 mr-1 text-purple-400" />
                  Enhance with AI (improve description and metadata)
                </label>
              </div>
            </div>

            {/* Pricing Information */}
            <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
              <h3 className="text-sm font-semibold text-gray-300 mb-3">💰 Network Pricing</h3>
              <div className="space-y-2 text-sm">
                {testnetService.isTestMode() ? (
                  <div className="flex items-center justify-between">
                    <span className="text-green-400 flex items-center">
                      🧪 {testnetService.getCurrentNetwork().network.toUpperCase()} Network
                    </span>
                    <span className="text-green-400 font-semibold">FREE</span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-400">🎯 SOLX Holders (200,000+ SOLX)</span>
                      <span className="text-yellow-400">0.2 SOL</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">👥 Non-SOLX Holders</span>
                      <span className="text-gray-300">0.35 SOL</span>
                    </div>
                  </>
                )}
                <div className="pt-2 border-t border-gray-700/50 text-xs text-gray-400">
                  {testnetService.isTestMode() 
                    ? `Perfect for testing! No real value involved.` 
                    : `Real SOL will be used on ${testnetService.getCurrentNetwork().network.toUpperCase()}`
                  }
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setActiveModal(null)}
                className="flex-1 px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateToken}
                disabled={isLoading || !tokenForm.name || !tokenForm.symbol || !tokenForm.description}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Token'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Revoke Authority Modals */}
      {(activeModal === 'revoke-mint' || activeModal === 'revoke-freeze') && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">
              Revoke {activeModal === 'revoke-mint' ? 'Mint' : 'Freeze'} Authority
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Token Mint Address *</label>
                <input
                  type="text"
                  value={authorityForm.mintAddress}
                  onChange={(e) => setAuthorityForm({
                    ...authorityForm, 
                    mintAddress: e.target.value,
                    authorityType: activeModal === 'revoke-mint' ? 'mint' : 'freeze'
                  })}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                  placeholder="Enter token mint address..."
                />
              </div>
              
              <div className="bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded-lg p-3">
                <p className="text-yellow-300 text-sm">
                  ⚠️ Warning: This action is irreversible. Once revoked, you cannot {activeModal === 'revoke-mint' ? 'mint new tokens' : 'freeze token accounts'}.
                </p>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setActiveModal(null)}
                className="flex-1 px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleRevokeAuthority}
                disabled={isLoading || !authorityForm.mintAddress}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Revoking...
                  </>
                ) : (
                  'Revoke Authority'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feature Information - Collapsible */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Feature Details & Pricing</h2>
        {tokenManagerFeatures.map((feature) => (
          <details key={`${feature.id}-detail`} className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800">
            <summary className="p-6 cursor-pointer hover:bg-zinc-800 transition-colors">
              <h3 className="text-lg font-semibold text-white inline">
                {feature.title} - Pricing & Steps
              </h3>
            </summary>
            <div className="px-6 pb-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Steps */}
                <div>
                  <h4 className="font-medium text-white mb-3">Steps:</h4>
                  <ol className="space-y-2">
                    {feature.steps.map((step, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-purple-900 text-purple-300 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="text-zinc-400 text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Pricing */}
                <div>
                  <h4 className="font-medium text-white mb-3">Pricing:</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 px-3 bg-green-900 bg-opacity-30 rounded-lg border border-green-700">
                      <span className="text-sm font-medium text-green-300">For SOLX Holders</span>
                      <span className="text-sm font-semibold text-green-300">{feature.pricing.solxHolders}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 px-3 bg-zinc-800 rounded-lg border border-zinc-700">
                      <span className="text-sm font-medium text-zinc-300">Non-SOLX Holders</span>
                      <span className="text-sm font-semibold text-zinc-300">{feature.pricing.nonSolxHolders}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </details>
        ))}
      </div>

      {/* Testnet Guide Helper */}
      <TestnetGuide />
    </div>
  )
}
