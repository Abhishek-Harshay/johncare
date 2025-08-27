'use client'

import { useState } from 'react'
import { Palette, Sparkles, Loader2, Download, Eye, Shuffle, Image, Type, Wand2 } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'

interface BrandingAsset {
  type: 'logo' | 'banner' | 'icon' | 'background'
  title: string
  description: string
  variations: string[]
  style: string
  colors: string[]
}

interface BrandingProfile {
  projectName: string
  category: string
  targetAudience: string
  brandPersonality: string[]
  preferredColors: string[]
  style: string
}

export default function BrandingDesign() {
  const { publicKey } = useWallet()
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState<'generator' | 'assets' | 'guidelines'>('generator')
  const [brandProfile, setBrandProfile] = useState<BrandingProfile>({
    projectName: '',
    category: 'DeFi',
    targetAudience: 'Crypto Enthusiasts',
    brandPersonality: ['Professional'],
    preferredColors: ['#6366f1', '#8b5cf6'],
    style: 'Modern'
  })

  const mockAssets: BrandingAsset[] = [
    {
      type: 'logo',
      title: 'Primary Logo',
      description: 'Main logo with text and symbol combination',
      variations: ['Light', 'Dark', 'Monochrome', 'Icon Only'],
      style: 'Modern Gradient',
      colors: ['#6366f1', '#8b5cf6', '#ec4899']
    },
    {
      type: 'banner',
      title: 'Social Media Banner',
      description: 'Twitter/Discord header with brand elements',
      variations: ['Twitter Header', 'Discord Banner', 'LinkedIn Cover'],
      style: 'Professional',
      colors: ['#1f2937', '#6366f1', '#ffffff']
    },
    {
      type: 'icon',
      title: 'App Icon Set',
      description: 'Square icons for various platforms and sizes',
      variations: ['16x16', '32x32', '64x64', '128x128', '512x512'],
      style: 'Minimalist',
      colors: ['#6366f1', '#ffffff']
    },
    {
      type: 'background',
      title: 'Background Patterns',
      description: 'Subtle patterns and textures for websites',
      variations: ['Geometric', 'Organic', 'Tech Grid', 'Gradient Mesh'],
      style: 'Abstract',
      colors: ['#0f172a', '#1e293b', '#6366f1']
    }
  ]

  const generateBrandingAssets = async () => {
    if (!brandProfile.projectName) {
      alert('Please enter a project name to generate branding assets')
      return
    }

    setIsGenerating(true)
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 3000))
      alert(`🚧 AI Branding Generation\n\nGenerating complete brand identity for "${brandProfile.projectName}":\n\n• Logo variations\n• Color palette\n• Typography guidelines\n• Social media assets\n• Brand guidelines document\n\nStyle: ${brandProfile.style}\nTarget: ${brandProfile.targetAudience}`)
    } catch (error) {
      console.error('Branding generation failed:', error)
      alert('Brand generation failed')
    }
    setIsGenerating(false)
  }

  const personalityOptions = ['Professional', 'Playful', 'Bold', 'Minimal', 'Elegant', 'Tech-Savvy', 'Community-Focused', 'Innovative']
  const styleOptions = ['Modern', 'Minimalist', 'Futuristic', 'Retro', 'Corporate', 'Artistic', 'Gaming', 'Web3']
  const audienceOptions = ['Crypto Enthusiasts', 'DeFi Users', 'Gamers', 'Developers', 'Traders', 'General Public', 'Enterprises']

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-2">
          AI Branding & Design Studio
        </h1>
        <p className="text-zinc-400">
          Generate professional brand identities, logos, and visual assets powered by AI
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-zinc-900 rounded-xl p-1">
        {[
          { id: 'generator', label: 'Brand Generator', icon: Wand2 },
          { id: 'assets', label: 'Generated Assets', icon: Image },
          { id: 'guidelines', label: 'Brand Guidelines', icon: Type }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Brand Generator Tab */}
      {activeTab === 'generator' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Create Your Brand Identity</h3>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Project Name *</label>
                  <input
                    type="text"
                    value={brandProfile.projectName}
                    onChange={(e) => setBrandProfile({...brandProfile, projectName: e.target.value})}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
                    placeholder="Enter your project name..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Category</label>
                  <select
                    value={brandProfile.category}
                    onChange={(e) => setBrandProfile({...brandProfile, category: e.target.value})}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="DeFi">DeFi Protocol</option>
                    <option value="Gaming">Gaming Project</option>
                    <option value="NFT">NFT Collection</option>
                    <option value="Social">Social Platform</option>
                    <option value="Utility">Utility Token</option>
                    <option value="DAO">DAO</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Target Audience</label>
                  <select
                    value={brandProfile.targetAudience}
                    onChange={(e) => setBrandProfile({...brandProfile, targetAudience: e.target.value})}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    {audienceOptions.map(audience => (
                      <option key={audience} value={audience}>{audience}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Design Style</label>
                  <select
                    value={brandProfile.style}
                    onChange={(e) => setBrandProfile({...brandProfile, style: e.target.value})}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    {styleOptions.map(style => (
                      <option key={style} value={style}>{style}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Brand Personality</label>
                  <div className="flex flex-wrap gap-2">
                    {personalityOptions.map(trait => (
                      <button
                        key={trait}
                        onClick={() => {
                          if (brandProfile.brandPersonality.includes(trait)) {
                            setBrandProfile({
                              ...brandProfile,
                              brandPersonality: brandProfile.brandPersonality.filter(p => p !== trait)
                            })
                          } else {
                            setBrandProfile({
                              ...brandProfile,
                              brandPersonality: [...brandProfile.brandPersonality, trait]
                            })
                          }
                        }}
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                          brandProfile.brandPersonality.includes(trait)
                            ? 'bg-purple-600 text-white'
                            : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                        }`}
                      >
                        {trait}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Preferred Colors</label>
                  <div className="flex space-x-2 mb-2">
                    {['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444', '#3b82f6', '#8b5cf6'].map(color => (
                      <button
                        key={color}
                        onClick={() => {
                          if (brandProfile.preferredColors.includes(color)) {
                            setBrandProfile({
                              ...brandProfile,
                              preferredColors: brandProfile.preferredColors.filter(c => c !== color)
                            })
                          } else {
                            setBrandProfile({
                              ...brandProfile,
                              preferredColors: [...brandProfile.preferredColors, color]
                            })
                          }
                        }}
                        className={`w-8 h-8 rounded-lg border-2 transition-all ${
                          brandProfile.preferredColors.includes(color)
                            ? 'border-white scale-110'
                            : 'border-zinc-600 hover:border-zinc-400'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <p className="text-zinc-500 text-xs">Selected: {brandProfile.preferredColors.length} colors</p>
                </div>

                <div className="bg-purple-900 bg-opacity-30 border border-purple-700 rounded-lg p-4">
                  <h4 className="text-purple-300 font-medium mb-2 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI Generation Features
                  </h4>
                  <ul className="text-purple-200 text-sm space-y-1">
                    <li>• Logo variations (light, dark, icon-only)</li>
                    <li>• Complete color palette with hex codes</li>
                    <li>• Typography recommendations</li>
                    <li>• Social media asset templates</li>
                    <li>• Brand guidelines document</li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={generateBrandingAssets}
              disabled={isGenerating || !brandProfile.projectName}
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Generating Brand Identity...</span>
                </>
              ) : (
                <>
                  <Palette className="w-5 h-5" />
                  <span>Generate Brand Assets</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Generated Assets Tab */}
      {activeTab === 'assets' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Generated Brand Assets</h3>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {mockAssets.map((asset, index) => (
                <div key={index} className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-white font-medium mb-1">{asset.title}</h4>
                      <p className="text-zinc-400 text-sm">{asset.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 hover:text-white rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 hover:text-white rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Preview Area */}
                  <div className="h-32 bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-lg flex items-center justify-center mb-4 border border-zinc-600">
                    <div className="text-center">
                      <Image className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
                      <p className="text-zinc-400 text-xs">{asset.type.toUpperCase()} Preview</p>
                    </div>
                  </div>

                  {/* Asset Details */}
                  <div className="space-y-3">
                    <div>
                      <span className="text-zinc-400 text-xs">Style:</span>
                      <span className="text-white text-sm ml-2">{asset.style}</span>
                    </div>
                    
                    <div>
                      <span className="text-zinc-400 text-xs">Colors:</span>
                      <div className="flex space-x-1 mt-1">
                        {asset.colors.map((color, colorIndex) => (
                          <div
                            key={colorIndex}
                            className="w-4 h-4 rounded border border-zinc-600"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-zinc-400 text-xs">Variations:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {asset.variations.map((variation, varIndex) => (
                          <span
                            key={varIndex}
                            className="text-xs px-2 py-1 bg-zinc-700 text-zinc-300 rounded"
                          >
                            {variation}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Brand Guidelines Tab */}
      {activeTab === 'guidelines' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Brand Guidelines</h3>
            
            <div className="text-center py-12">
              <Type className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 text-lg">Brand Guidelines Document</p>
              <p className="text-zinc-500 text-sm mt-2 max-w-md mx-auto">
                Comprehensive brand guidelines including logo usage, color specifications, typography, and brand voice will be generated with your assets.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Development Status */}
      <div className="mt-8 bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded-lg p-4">
        <h4 className="text-yellow-300 font-medium mb-2">🚧 Development Status</h4>
        <p className="text-yellow-200 text-sm mb-2">
          AI Branding & Design Studio is in active development. Advanced AI image generation and brand asset creation coming soon.
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">✅ UI Complete</span>
          <span className="bg-yellow-900 bg-opacity-50 text-yellow-300 px-2 py-1 rounded">🚧 AI Image Generation</span>
          <span className="bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded">🔜 Asset Export</span>
          <span className="bg-purple-900 bg-opacity-50 text-purple-300 px-2 py-1 rounded">🔜 Brand Guidelines</span>
        </div>
      </div>
    </div>
  )
}
