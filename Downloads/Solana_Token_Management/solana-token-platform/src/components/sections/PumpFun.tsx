'use client'

import { useState } from 'react'
import { Rocket, TrendingUp, Zap, Users, Loader2, Star, Flame, Target } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'

interface PumpToken {
  name: string
  symbol: string
  description: string
  image: string
  initialLiquidity: number
  bondingCurve: number
}

export default function PumpFun() {
  const { publicKey } = useWallet()
  const [activeTab, setActiveTab] = useState<'trending' | 'create' | 'portfolio'>('trending')
  const [isLoading, setIsLoading] = useState(false)
  const [newToken, setNewToken] = useState<PumpToken>({
    name: '',
    symbol: '',
    description: '',
    image: '',
    initialLiquidity: 1,
    bondingCurve: 85
  })

  const handleCreateToken = async () => {
    if (!publicKey) {
      alert('Please connect your wallet first')
      return
    }

    setIsLoading(true)
    try {
      alert(`🚧 Pump.fun Token Launch\n\nLaunching meme token:\nName: ${newToken.name}\nSymbol: ${newToken.symbol}\nInitial SOL: ${newToken.initialLiquidity}\nBonding Curve: ${newToken.bondingCurve}%`)
    } catch (error) {
      console.error('Pump.fun token creation failed:', error)
      alert('Token launch failed')
    }
    setIsLoading(false)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-red-400 to-orange-400 bg-clip-text text-transparent mb-2">
          Pump.fun - Meme Token Launchpad
        </h1>
        <p className="text-zinc-400">
          Launch meme tokens instantly with bonding curves and automatic liquidity
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-zinc-900 rounded-xl p-1">
        {[
          { id: 'trending', label: 'Trending', icon: Flame },
          { id: 'create', label: 'Launch Token', icon: Rocket },
          { id: 'portfolio', label: 'My Tokens', icon: Star }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-pink-600 to-orange-600 text-white shadow-lg'
                : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Trending Tab */}
      {activeTab === 'trending' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Flame className="w-5 h-5 mr-2 text-orange-400" />
              Trending Tokens
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: 'Doge on Solana',
                  symbol: 'DOGSOL',
                  marketCap: '$2.4M',
                  change: '+145.7%',
                  volume: '$890K',
                  holders: '12.4K',
                  progress: 78,
                  image: '🐕'
                },
                {
                  name: 'Solana Pepe',
                  symbol: 'SOLPEPE',
                  marketCap: '$1.8M',
                  change: '+89.3%',
                  volume: '$654K',
                  holders: '8.9K',
                  progress: 65,
                  image: '🐸'
                },
                {
                  name: 'Rocket Moon',
                  symbol: 'RMOON',
                  marketCap: '$980K',
                  change: '+67.2%',
                  volume: '$312K',
                  holders: '5.6K',
                  progress: 42,
                  image: '🚀'
                },
                {
                  name: 'Based Cat',
                  symbol: 'BCAT',
                  marketCap: '$756K',
                  change: '+234.8%',
                  volume: '$445K',
                  holders: '7.2K',
                  progress: 38,
                  image: '😺'
                },
                {
                  name: 'Sol Wizard',
                  symbol: 'SOLWIZ',
                  marketCap: '$425K',
                  change: '+156.4%',
                  volume: '$198K',
                  holders: '3.8K',
                  progress: 28,
                  image: '🧙‍♂️'
                },
                {
                  name: 'Diamond Hands',
                  symbol: 'DIAMOND',
                  marketCap: '$312K',
                  change: '+78.9%',
                  volume: '$125K',
                  holders: '2.1K',
                  progress: 18,
                  image: '💎'
                }
              ].map((token, index) => (
                <div key={index} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 hover:border-pink-500 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{token.image}</div>
                      <div>
                        <h4 className="font-semibold text-white">{token.name}</h4>
                        <p className="text-zinc-400 text-sm">${token.symbol}</p>
                      </div>
                    </div>
                    <div className={`text-xs font-medium px-2 py-1 rounded ${
                      token.change.startsWith('+') 
                        ? 'text-green-400 bg-green-900 bg-opacity-50' 
                        : 'text-red-400 bg-red-900 bg-opacity-50'
                    }`}>
                      {token.change}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm mb-3">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Market Cap:</span>
                      <span className="text-white font-medium">{token.marketCap}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">24h Volume:</span>
                      <span className="text-white font-medium">{token.volume}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Holders:</span>
                      <span className="text-white font-medium">{token.holders}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-zinc-400 mb-1">
                      <span>Bonding Progress</span>
                      <span>{token.progress}%</span>
                    </div>
                    <div className="w-full bg-zinc-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-pink-500 to-orange-500 h-2 rounded-full transition-all"
                        style={{ width: `${token.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 text-white py-2 rounded-lg text-sm font-medium transition-all">
                    Buy Token
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Launch Token Tab */}
      {activeTab === 'create' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Launch Your Meme Token</h3>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Token Name</label>
                  <input
                    type="text"
                    value={newToken.name}
                    onChange={(e) => setNewToken({...newToken, name: e.target.value})}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-pink-500"
                    placeholder="Doge Killer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Token Symbol</label>
                  <input
                    type="text"
                    value={newToken.symbol}
                    onChange={(e) => setNewToken({...newToken, symbol: e.target.value.toUpperCase()})}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-pink-500"
                    placeholder="DOGKILL"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Description</label>
                <textarea
                  value={newToken.description}
                  onChange={(e) => setNewToken({...newToken, description: e.target.value})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-pink-500 h-24 resize-none"
                  placeholder="The next big meme token on Solana..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Token Image URL</label>
                <input
                  type="url"
                  value={newToken.image}
                  onChange={(e) => setNewToken({...newToken, image: e.target.value})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-pink-500"
                  placeholder="https://example.com/token-image.png"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Initial SOL Liquidity</label>
                <input
                  type="number"
                  step="0.1"
                  value={newToken.initialLiquidity}
                  onChange={(e) => setNewToken({...newToken, initialLiquidity: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-pink-500"
                  placeholder="1.0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Bonding Curve Target (%)</label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={newToken.bondingCurve}
                  onChange={(e) => setNewToken({...newToken, bondingCurve: parseInt(e.target.value)})}
                  className="w-full accent-pink-500"
                />
                <div className="flex justify-between text-xs text-zinc-400 mt-1">
                  <span>50%</span>
                  <span className="text-pink-400 font-medium">{newToken.bondingCurve}%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-900 to-orange-900 bg-opacity-30 border border-pink-700 rounded-lg p-4">
                <h4 className="text-pink-300 font-medium mb-2 flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  Pump.fun Features
                </h4>
                <ul className="text-pink-200 text-sm space-y-1">
                  <li>• Fair launch with bonding curve mechanism</li>
                  <li>• No pre-sales or team allocations</li>
                  <li>• Automatic Raydium listing at curve completion</li>
                  <li>• Built-in anti-rug protection</li>
                  <li>• Community-driven price discovery</li>
                </ul>
              </div>

              <button
                onClick={handleCreateToken}
                disabled={isLoading || !newToken.name || !newToken.symbol}
                className="w-full bg-gradient-to-r from-pink-600 via-red-600 to-orange-600 hover:from-pink-700 hover:via-red-700 hover:to-orange-700 disabled:opacity-50 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Launching Token...</span>
                  </>
                ) : (
                  <>
                    <Rocket className="w-5 h-5" />
                    <span>Launch Token on Pump.fun</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trending Tab */}
      {activeTab === 'trending' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Trending Meme Tokens</h3>
            
            <div className="grid gap-4">
              {[
                {
                  name: 'Bonk Inu',
                  symbol: 'BONK',
                  price: '$0.000023',
                  change: '+156.7%',
                  marketCap: '$1.2B',
                  holders: '145K',
                  progress: 100,
                  status: 'Graduated',
                  image: '🐕'
                },
                {
                  name: 'Myro',
                  symbol: 'MYRO', 
                  price: '$0.087',
                  change: '+89.4%',
                  marketCap: '$87M',
                  holders: '23K',
                  progress: 100,
                  status: 'Graduated',
                  image: '🐶'
                },
                {
                  name: 'Solana Shiba',
                  symbol: 'SOLSHIB',
                  price: '$0.0045',
                  change: '+234.8%',
                  marketCap: '$450K',
                  holders: '8.2K',
                  progress: 67,
                  status: 'Bonding',
                  image: '🐕‍🦺'
                },
                {
                  name: 'Moon Cat',
                  symbol: 'MOONCAT',
                  price: '$0.0012',
                  change: '+445.2%',
                  marketCap: '$125K',
                  holders: '3.4K',
                  progress: 34,
                  status: 'Rising',
                  image: '🐱'
                }
              ].map((token, index) => (
                <div key={index} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700 hover:border-pink-500 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{token.image}</div>
                      <div>
                        <h4 className="font-semibold text-white">{token.name}</h4>
                        <p className="text-zinc-400 text-sm">${token.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">{token.price}</div>
                      <div className="text-green-400 text-xs font-medium">{token.change}</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm mb-3">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Market Cap:</span>
                      <span className="text-white font-medium">{token.marketCap}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Holders:</span>
                      <span className="text-white font-medium">{token.holders}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-zinc-400 mb-1">
                      <span>Bonding Progress</span>
                      <span>{token.progress}%</span>
                    </div>
                    <div className="w-full bg-zinc-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${
                          token.progress === 100
                            ? 'bg-gradient-to-r from-green-500 to-blue-500'
                            : 'bg-gradient-to-r from-pink-500 to-orange-500'
                        }`}
                        style={{ width: `${token.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-all">
                      Buy
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-2 rounded-lg text-sm font-medium transition-all">
                      Sell
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* My Tokens Tab */}
      {activeTab === 'portfolio' && (
        <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Your Token Portfolio</h3>
          
          <div className="text-center py-12">
            <Star className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-400 text-lg">No tokens found</p>
            <p className="text-zinc-500 text-sm mt-2">
              Your launched tokens and holdings will appear here
            </p>
            <button 
              onClick={() => setActiveTab('create')}
              className="mt-4 bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-all"
            >
              Launch Your First Token
            </button>
          </div>
        </div>
      )}

      {/* Development Status */}
      <div className="mt-8 bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded-lg p-4">
        <h4 className="text-yellow-300 font-medium mb-2">🚧 Development Status</h4>
        <p className="text-yellow-200 text-sm mb-2">
          Pump.fun integration is in active development. Meme token launchpad with fair launch mechanics.
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">✅ UI Complete</span>
          <span className="bg-yellow-900 bg-opacity-50 text-yellow-300 px-2 py-1 rounded">🚧 Pump.fun API Integration</span>
          <span className="bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded">🔜 Bonding Curve SDK</span>
          <span className="bg-purple-900 bg-opacity-50 text-purple-300 px-2 py-1 rounded">🔜 Trading Interface</span>
        </div>
      </div>
    </div>
  )
}
