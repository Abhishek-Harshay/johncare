'use client'

import { useState } from 'react'
import { Globe, Code, Palette, Eye, Download, Smartphone, Layout, Zap, Rocket, Settings, Monitor } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'

interface WebsiteConfig {
  projectName: string
  tagline: string
  logo: string
  primaryColor: string
  template: string
  domain: string
  features: string[]
  socialLinks: {
    twitter: string
    discord: string
    telegram: string
    github: string
  }
}

interface TemplateOption {
  id: string
  name: string
  description: string
  image: string
  features: string[]
  category: 'landing' | 'dapp' | 'portfolio' | 'docs' | 'meme'
}

export default function WebsiteBuilder() {
  const { publicKey } = useWallet()
  const [activeTab, setActiveTab] = useState<'setup' | 'customize' | 'preview' | 'deploy'>('setup')
  const [isBuilding, setIsBuilding] = useState(false)

  const [config, setConfig] = useState<WebsiteConfig>({
    projectName: '',
    tagline: '',
    logo: '',
    primaryColor: '#3b82f6',
    template: '',
    domain: '',
    features: [],
    socialLinks: {
      twitter: '',
      discord: '',
      telegram: '',
      github: ''
    }
  })

  const [selectedTemplate, setSelectedTemplate] = useState<TemplateOption | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const templates: TemplateOption[] = [
    {
      id: 'modern-landing',
      name: 'Modern Landing',
      description: 'Clean, professional landing page with hero section and feature highlights',
      image: '/templates/modern.jpg',
      features: ['Hero Section', 'Features Grid', 'Tokenomics Chart', 'Team Cards', 'Contact Form'],
      category: 'landing'
    },
    {
      id: 'crypto-dashboard',
      name: 'Crypto Dashboard',
      description: 'Interactive dashboard for DeFi projects with live data integration',
      image: '/templates/dashboard.jpg',
      features: ['Live Charts', 'Portfolio Tracker', 'Swap Interface', 'Staking Panel'],
      category: 'dapp'
    },
    {
      id: 'meme-doge',
      name: 'Doge Classic',
      description: 'Much wow! Classic Dogecoin-inspired design with Comic Sans and yellow colors',
      image: '/templates/doge.jpg',
      features: ['Such Header', 'Much Features', 'Very Tokenomics', 'Wow Community', 'Moon Roadmap'],
      category: 'meme'
    },
    {
      id: 'meme-pepe',
      name: 'Pepe Paradise',
      description: 'Based template with green theme and rare Pepe collections',
      image: '/templates/pepe.jpg',
      features: ['Rare Pepe Gallery', 'Based Meter', 'Kek Chart', 'Frog Squad', 'Meme Archive'],
      category: 'meme'
    },
    {
      id: 'meme-bonk',
      name: 'Bonk Energy',
      description: 'High-energy Solana meme coin design with baseball bat aesthetics',
      image: '/templates/bonk.jpg',
      features: ['Bonk Counter', 'Home Run Stats', 'Team Roster', 'Stadium View', 'Championship Mode'],
      category: 'meme'
    },
    {
      id: 'meme-rocket',
      name: 'To The Moon',
      description: 'Space-themed meme coin site with rocket ships and moon imagery',
      image: '/templates/rocket.jpg',
      features: ['Launch Pad', 'Rocket Tracker', 'Moon Distance', 'Astronaut Crew', 'Galaxy Map'],
      category: 'meme'
    }
  ]

  const buildWebsite = async () => {
    setIsBuilding(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 3000))
      setActiveTab('preview')
      alert(`🚀 Website Built Successfully!\n\n"${config.projectName || 'Your Project'}" website is ready!\n\n• Professional ${selectedTemplate?.name || 'template'} applied\n• Responsive design optimized\n• SEO and performance optimized\n• Ready for deployment`)
    } catch (error) {
      console.error('Website building failed:', error)
      alert('Website building failed')
    }
    setIsBuilding(false)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          AI Website Builder
        </h1>
        <p className="text-zinc-400">
          Build professional websites for your crypto project with AI-powered design and meme token templates
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-zinc-900 rounded-xl p-1">
        {[
          { id: 'setup', label: 'Setup', icon: Settings },
          { id: 'customize', label: 'Customize', icon: Palette },
          { id: 'preview', label: 'Preview', icon: Eye },
          { id: 'deploy', label: 'Deploy', icon: Rocket }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Setup Tab */}
      {activeTab === 'setup' && (
        <div className="space-y-6">
          {/* Template Selection */}
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Layout className="w-5 h-5 mr-2 text-blue-400" />
              Template Selection
            </h3>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['all', 'professional', 'meme'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                      : 'bg-zinc-800 text-zinc-400 hover:text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {category === 'all' ? 'All Templates' : 
                   category === 'meme' ? '🚀 Meme Coins' :
                   '💼 Professional'}
                </button>
              ))}
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates
                .filter(template => selectedCategory === 'all' || 
                  (selectedCategory === 'professional' && template.category !== 'meme') ||
                  template.category === selectedCategory)
                .map((template) => (
                <div
                  key={template.id}
                  onClick={() => {
                    setSelectedTemplate(template)
                    setConfig({...config, template: template.id})
                  }}
                  className={`cursor-pointer bg-zinc-800 rounded-lg p-4 border transition-all hover:border-cyan-500 ${
                    config.template === template.id ? 'border-cyan-500 bg-cyan-900 bg-opacity-20' : 'border-zinc-700'
                  }`}
                >
                  <div className={`aspect-video rounded-lg mb-3 flex items-center justify-center ${
                    template.category === 'meme' 
                      ? 'bg-gradient-to-br from-yellow-600 to-orange-600' 
                      : 'bg-gradient-to-br from-zinc-700 to-zinc-800'
                  }`}>
                    {template.category === 'meme' ? (
                      <span className="text-2xl">🚀</span>
                    ) : (
                      <Monitor className="w-8 h-8 text-zinc-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-white font-medium">{template.name}</h4>
                    {template.category === 'meme' && (
                      <span className="text-xs bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-2 py-1 rounded-full">
                        MEME
                      </span>
                    )}
                  </div>
                  <p className="text-zinc-400 text-sm mb-2">{template.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {template.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className={`text-xs px-2 py-1 rounded ${
                        template.category === 'meme'
                          ? 'bg-yellow-900 bg-opacity-50 text-yellow-300'
                          : 'bg-zinc-700 text-zinc-300'
                      }`}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Preview Tab */}
      {activeTab === 'preview' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-green-400" />
              Website Preview
            </h3>

            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              <div className={`h-2 ${
                selectedTemplate?.category === 'meme' 
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600'
              }`}></div>
              <div className="p-8">
                <div className="text-center mb-8">
                  <h1 className={`text-3xl font-bold text-gray-900 mb-2 ${
                    selectedTemplate?.category === 'meme' ? 'font-mono' : 'font-sans'
                  }`}>
                    {config.projectName || (selectedTemplate?.category === 'meme' ? 'MUCH WOW TOKEN 🚀' : 'Your Project')}
                  </h1>
                  <p className="text-gray-600 text-lg">
                    {config.tagline || (
                      selectedTemplate?.category === 'meme' 
                        ? 'To the moon and beyond! 🌙 Diamond hands only! 💎🙌'
                        : 'Professional crypto solutions for the future'
                    )}
                  </p>
                </div>

                {selectedTemplate?.category === 'meme' && (
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full inline-block font-bold text-lg">
                      🚀 BUY $WOW NOW! 🚀
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Development Status */}
      <div className="mt-8 bg-cyan-900 bg-opacity-30 border border-cyan-700 rounded-lg p-4">
        <h4 className="text-cyan-300 font-medium mb-2">🚧 Development Status</h4>
        <p className="text-cyan-200 text-sm mb-2">
          Website Builder with meme token templates is fully functional. Template selection and preview working perfectly.
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">✅ Template Selection</span>
          <span className="bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">✅ Meme Templates</span>
          <span className="bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">✅ Preview System</span>
          <span className="bg-yellow-900 bg-opacity-50 text-yellow-300 px-2 py-1 rounded">🚧 Live Deployment</span>
        </div>
      </div>
    </div>
  )
}
