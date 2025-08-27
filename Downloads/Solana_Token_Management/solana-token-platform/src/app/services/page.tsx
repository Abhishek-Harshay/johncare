'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Zap, 
  Bot, 
  Shield, 
  Palette, 
  BarChart, 
  Coins, 
  Users, 
  Code,
  TrendingUp,
  FileText,
  Sparkles,
  Search,
  ExternalLink,
  ChevronRight,
  Star,
  Clock,
  CheckCircle2
} from 'lucide-react'

interface Service {
  id: string
  name: string
  description: string
  category: string
  targetAudience: string[]
  features: string[]
  pricing: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  isPopular?: boolean
  isNew?: boolean
}

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedAudience, setSelectedAudience] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const services: Service[] = [
    // Core Services
    {
      id: 'token-manager',
      name: 'Token Manager',
      description: 'Create and manage SPL tokens with professional-grade tools and metadata management',
      category: 'Core Services',
      targetAudience: ['developers', 'token-launchers', 'businesses'],
      features: ['Token Creation', 'Metadata Management', 'Supply Control', 'Authority Management'],
      pricing: 'Starting at 0.1 SOL per token',
      difficulty: 'Beginner',
      isPopular: true
    },
    {
      id: 'balance-checker',
      name: 'Balance Checker',
      description: 'Monitor token balances across multiple wallets with real-time updates',
      category: 'Core Services',
      targetAudience: ['traders', 'developers', 'businesses'],
      features: ['Multi-wallet Tracking', 'Real-time Updates', 'Export Options', 'Alert System'],
      pricing: 'Free',
      difficulty: 'Beginner'
    },
    {
      id: 'multisender',
      name: 'Multisender',
      description: 'Distribute tokens or SOL to multiple addresses efficiently in bulk transactions',
      category: 'Core Services',
      targetAudience: ['token-launchers', 'businesses', 'marketers'],
      features: ['Bulk Distribution', 'CSV Import', 'Cost Optimization', 'Transaction History'],
      pricing: '0.01 SOL per transaction',
      difficulty: 'Beginner',
      isPopular: true
    },
    {
      id: 'liquidity-manager',
      name: 'Liquidity Manager',
      description: 'Add and remove liquidity across multiple DEXs with advanced pool management',
      category: 'Core Services',
      targetAudience: ['traders', 'token-launchers', 'defi-users'],
      features: ['Multi-DEX Support', 'Pool Analytics', 'Auto-compound', 'Impermanent Loss Protection'],
      pricing: 'Dynamic fees based on pool',
      difficulty: 'Intermediate'
    },
    {
      id: 'burn-tokens',
      name: 'Burn Tokens',
      description: 'Permanently destroy tokens to reduce supply with transparent verification',
      category: 'Core Services',
      targetAudience: ['token-launchers', 'developers', 'businesses'],
      features: ['Supply Reduction', 'Transparent Verification', 'Batch Burning', 'Proof of Burn'],
      pricing: '0.005 SOL per burn',
      difficulty: 'Beginner'
    },

    // Bot Extensions
    {
      id: 'volume-bot',
      name: 'Volume Bot',
      description: 'Generate realistic trading volume with multiple patterns and whale simulation',
      category: 'Bot Extensions',
      targetAudience: ['token-launchers', 'marketers', 'traders'],
      features: ['Multiple Patterns', 'Whale Simulation', 'Organic Trading', 'Analytics Dashboard'],
      pricing: 'Premium feature - Contact us',
      difficulty: 'Advanced',
      isPopular: true
    },
    {
      id: 'holder-generator',
      name: 'Holder Generator',
      description: 'Create authentic holder distributions with realistic wallet behavior patterns',
      category: 'Bot Extensions',
      targetAudience: ['token-launchers', 'marketers'],
      features: ['Distribution Patterns', 'Realistic Behavior', 'Holder Analytics', 'Growth Tracking'],
      pricing: 'Premium feature - Contact us',
      difficulty: 'Advanced'
    },
    {
      id: 'bulk-wallet-generator',
      name: 'Bulk Wallet Generator',
      description: 'Generate up to 100,000 secure wallets for testing and distribution purposes',
      category: 'Bot Extensions',
      targetAudience: ['developers', 'businesses', 'marketers'],
      features: ['Mass Generation', 'Security Focus', 'Export Options', 'Integration Ready'],
      pricing: '0.001 SOL per wallet',
      difficulty: 'Intermediate'
    },
    {
      id: 'sol-distribution',
      name: 'SOL Distribution',
      description: 'Automated SOL funding across multiple wallets with smart batching',
      category: 'Bot Extensions',
      targetAudience: ['developers', 'businesses', 'marketers'],
      features: ['Smart Batching', 'Cost Optimization', 'Progress Tracking', 'Retry Logic'],
      pricing: 'Gas fees only',
      difficulty: 'Intermediate'
    },
    {
      id: 'token-distribution',
      name: 'Token Distribution',
      description: 'Bulk token transfers with advanced distribution patterns and scheduling',
      category: 'Bot Extensions',
      targetAudience: ['token-launchers', 'marketers', 'businesses'],
      features: ['Bulk Transfers', 'Scheduling', 'Pattern Options', 'Analytics'],
      pricing: '0.005 SOL per batch',
      difficulty: 'Intermediate'
    },

    // DEX Integration
    {
      id: 'raydium-integration',
      name: 'Raydium Integration',
      description: 'Create and manage AMM, CLMM, and CPMM pools on Raydium with advanced features',
      category: 'DEX Integration',
      targetAudience: ['traders', 'token-launchers', 'defi-users'],
      features: ['Multiple Pool Types', 'Liquidity Management', 'Fee Collection', 'Price Analytics'],
      pricing: 'DEX fees apply',
      difficulty: 'Intermediate',
      isPopular: true
    },
    {
      id: 'jupiter-integration',
      name: 'Jupiter Integration',
      description: 'Best-rate token swapping with MEV protection and route optimization',
      category: 'DEX Integration',
      targetAudience: ['traders', 'defi-users'],
      features: ['Best Rates', 'MEV Protection', 'Route Optimization', 'Slippage Control'],
      pricing: 'Market rates apply',
      difficulty: 'Beginner'
    },
    {
      id: 'orca-integration',
      name: 'Orca Integration',
      description: 'Concentrated liquidity pools with Whirlpool technology and yield farming',
      category: 'DEX Integration',
      targetAudience: ['traders', 'defi-users', 'yield-farmers'],
      features: ['Concentrated Liquidity', 'Yield Farming', 'Position Management', 'Fee Optimization'],
      pricing: 'Pool fees apply',
      difficulty: 'Advanced'
    },
    {
      id: 'pump-fun-integration',
      name: 'Pump.fun Integration',
      description: 'Launch and trade memecoins on Pump.fun with integrated tools',
      category: 'DEX Integration',
      targetAudience: ['token-launchers', 'traders', 'memecoin-creators'],
      features: ['Memecoin Launch', 'Integrated Trading', 'Community Tools', 'Viral Marketing'],
      pricing: 'Platform fees apply',
      difficulty: 'Beginner',
      isNew: true
    },

    // AI Tools
    {
      id: 'content-generator',
      name: 'AI Content Generator',
      description: 'Generate marketing content, social posts, and promotional materials using advanced AI',
      category: 'AI Tools',
      targetAudience: ['marketers', 'businesses', 'content-creators'],
      features: ['Multiple Content Types', 'Brand Voice', 'Multi-platform', 'SEO Optimization'],
      pricing: '0.01 SOL per generation',
      difficulty: 'Beginner',
      isPopular: true
    },
    {
      id: 'branding-design',
      name: 'AI Branding Design',
      description: 'Create professional logos, color palettes, and brand guidelines with AI assistance',
      category: 'AI Tools',
      targetAudience: ['businesses', 'token-launchers', 'brands'],
      features: ['Logo Generation', 'Color Palettes', 'Brand Guidelines', 'Asset Creation'],
      pricing: '0.05 SOL per design package',
      difficulty: 'Beginner'
    },
    {
      id: 'tokenomics-planner',
      name: 'AI Tokenomics Planner',
      description: 'Design sustainable token economics with AI-powered analysis and recommendations',
      category: 'AI Tools',
      targetAudience: ['token-launchers', 'developers', 'economists'],
      features: ['Economic Modeling', 'Sustainability Analysis', 'Incentive Design', 'Projections'],
      pricing: '0.1 SOL per analysis',
      difficulty: 'Advanced'
    },
    {
      id: 'whitepaper-generator',
      name: 'AI Whitepaper Generator',
      description: 'Create professional whitepapers and technical documentation with AI assistance',
      category: 'AI Tools',
      targetAudience: ['token-launchers', 'developers', 'businesses'],
      features: ['Technical Writing', 'Structure Templates', 'Research Integration', 'Export Options'],
      pricing: '0.2 SOL per whitepaper',
      difficulty: 'Intermediate'
    },

    // Legal & Compliance
    {
      id: 'legal-doc-generator',
      name: 'Legal Document Generator',
      description: 'Generate comprehensive legal documents for token launches and compliance',
      category: 'Legal & Compliance',
      targetAudience: ['token-launchers', 'businesses', 'legal-teams'],
      features: ['Multiple Document Types', 'Jurisdiction Support', 'Compliance Checks', 'Updates'],
      pricing: '0.5 SOL per document package',
      difficulty: 'Advanced',
      isPopular: true
    },
    {
      id: 'compliance-checker',
      name: 'Compliance Checker',
      description: 'Analyze regulatory requirements and compliance status across jurisdictions',
      category: 'Legal & Compliance',
      targetAudience: ['token-launchers', 'businesses', 'legal-teams'],
      features: ['Multi-jurisdiction Analysis', 'Risk Assessment', 'Recommendations', 'Updates'],
      pricing: '0.3 SOL per analysis',
      difficulty: 'Advanced'
    },

    // Analytics & Monitoring
    {
      id: 'portfolio-tracker',
      name: 'Portfolio Tracker',
      description: 'Real-time portfolio monitoring with advanced analytics and performance tracking',
      category: 'Analytics & Monitoring',
      targetAudience: ['traders', 'investors', 'businesses'],
      features: ['Real-time Tracking', 'Performance Analytics', 'Risk Analysis', 'Reports'],
      pricing: 'Free basic / 0.1 SOL per month premium',
      difficulty: 'Beginner'
    },
    {
      id: 'arbitrage-scanner',
      name: 'Arbitrage Scanner',
      description: 'Identify profitable arbitrage opportunities across multiple DEXs automatically',
      category: 'Analytics & Monitoring',
      targetAudience: ['traders', 'arbitrageurs', 'defi-users'],
      features: ['Cross-DEX Analysis', 'Profit Calculations', 'Risk Assessment', 'Alerts'],
      pricing: '0.05 SOL per month',
      difficulty: 'Advanced'
    },
    {
      id: 'market-analysis',
      name: 'Market Analysis',
      description: 'Comprehensive market intelligence with trend analysis and predictions',
      category: 'Analytics & Monitoring',
      targetAudience: ['traders', 'analysts', 'businesses'],
      features: ['Trend Analysis', 'Market Intelligence', 'Predictions', 'Custom Reports'],
      pricing: '0.1 SOL per report',
      difficulty: 'Intermediate'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Services', icon: Zap, color: 'purple' },
    { id: 'Core Services', name: 'Core Services', icon: Coins, color: 'blue' },
    { id: 'Bot Extensions', name: 'Bot Extensions', icon: Bot, color: 'green' },
    { id: 'DEX Integration', name: 'DEX Integration', icon: BarChart, color: 'orange' },
    { id: 'AI Tools', name: 'AI Tools', icon: Sparkles, color: 'pink' },
    { id: 'Legal & Compliance', name: 'Legal & Compliance', icon: Shield, color: 'red' },
    { id: 'Analytics & Monitoring', name: 'Analytics & Monitoring', icon: TrendingUp, color: 'indigo' }
  ]

  const audiences = [
    { id: 'all', name: 'All Users', icon: Users },
    { id: 'developers', name: 'Developers', icon: Code },
    { id: 'traders', name: 'Traders', icon: TrendingUp },
    { id: 'token-launchers', name: 'Token Launchers', icon: Coins },
    { id: 'businesses', name: 'Businesses', icon: FileText },
    { id: 'marketers', name: 'Marketers', icon: Palette }
  ]

  const filteredServices = services.filter(service => {
    const categoryMatch = selectedCategory === 'all' || service.category === selectedCategory
    const audienceMatch = selectedAudience === 'all' || service.targetAudience.includes(selectedAudience)
    const searchMatch = searchQuery === '' || 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return categoryMatch && audienceMatch && searchMatch
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.name === category)
    return cat?.icon || Zap
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Platform</span>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center space-x-2">
                <Zap className="w-6 h-6 text-purple-600" />
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  All Services
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
                />
              </div>
              <Link
                href="/gitbook"
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Documentation</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Filter by Category</h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                        selectedCategory === category.id
                          ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
                          : 'bg-white text-gray-600 hover:bg-gray-50 border-2 border-transparent'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{category.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Audience Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Filter by Target Audience</h3>
              <div className="grid grid-cols-2 gap-2">
                {audiences.map((audience) => {
                  const Icon = audience.icon
                  return (
                    <button
                      key={audience.id}
                      onClick={() => setSelectedAudience(audience.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                        selectedAudience === audience.id
                          ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                          : 'bg-white text-gray-600 hover:bg-gray-50 border-2 border-transparent'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{audience.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredServices.length}</span> services
            </span>
            {selectedCategory !== 'all' && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                {selectedCategory}
              </span>
            )}
            {selectedAudience !== 'all' && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {audiences.find(a => a.id === selectedAudience)?.name}
              </span>
            )}
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all')
              setSelectedAudience('all')
              setSearchQuery('')
            }}
            className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
          >
            Clear all filters
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const CategoryIcon = getCategoryIcon(service.category)
            return (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-purple-200 transition-all duration-300 group"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-center justify-center group-hover:from-purple-200 group-hover:to-blue-200 transition-colors">
                        <CategoryIcon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{service.name}</h3>
                        <span className="text-xs text-gray-500">{service.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {service.isPopular && (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                          <Star className="w-3 h-3" />
                          <span className="text-xs font-medium">Popular</span>
                        </div>
                      )}
                      {service.isNew && (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-800 rounded-full">
                          <Sparkles className="w-3 h-3" />
                          <span className="text-xs font-medium">New</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-900 mb-2">Key Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {service.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                      {service.features.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          +{service.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-900 mb-2">Target Audience:</h4>
                    <div className="flex flex-wrap gap-1">
                      {service.targetAudience.map((audience, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs capitalize"
                        >
                          {audience.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(service.difficulty)}`}>
                        {service.difficulty}
                      </span>
                      <span className="text-xs font-medium text-gray-900">{service.pricing}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link
                        href="/gitbook"
                        className="text-xs text-gray-500 hover:text-purple-600 transition-colors flex items-center space-x-1"
                      >
                        <FileText className="w-3 h-3" />
                        <span>Docs</span>
                      </Link>
                      <button className="flex items-center space-x-1 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded text-xs font-medium transition-colors">
                        <span>Try Now</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters or search terms to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all')
                setSelectedAudience('all')
                setSearchQuery('')
              }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
