'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Zap, 
  Rocket, 
  Shield, 
  Globe, 
  Coins,
  Users,
  TrendingUp,
  Target,
  Star,
  ChevronDown,
  ChevronRight,
  Copy,
  ExternalLink,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react'

export default function SolXTokenPage() {
  const [activeSection, setActiveSection] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isScrolled, setIsScrolled] = useState(false)
  const [roadmapPhase, setRoadmapPhase] = useState(0)
  const [tokenomicsView, setTokenomicsView] = useState('distribution')
  const [copied, setCopied] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Token Contract Address
  const contractAddress = "Coming Soon - Presale Starting Q4 2025"

  // Scroll and mouse tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Auto-rotate roadmap phases
  useEffect(() => {
    const interval = setInterval(() => {
      setRoadmapPhase((prev) => (prev + 1) % 4)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const roadmapPhases = [
    {
      phase: "Phase 1",
      title: "Foundation & Launch",
      quarter: "Q4 2025",
      items: [
        "Token Generation Event (TGE)",
        "DEX Listings (Raydium, Jupiter)",
        "Community Building",
        "Staking Mechanism Launch",
        "Initial Marketing Campaign"
      ],
      color: "from-purple-600 to-blue-600",
      status: "upcoming"
    },
    {
      phase: "Phase 2", 
      title: "Platform Integration",
      quarter: "Q1 2026",
      items: [
        "Native Platform Integration", 
        "Token Utility Implementation",
        "Governance System Launch",
        "Partnership Announcements",
        "Enhanced Staking Rewards"
      ],
      color: "from-blue-600 to-cyan-600",
      status: "planned"
    },
    {
      phase: "Phase 3",
      title: "Ecosystem Expansion",
      quarter: "Q2 2026", 
      items: [
        "Multi-chain Bridge",
        "Advanced DeFi Features",
        "NFT Marketplace Integration",
        "Mobile App Launch",
        "Institutional Partnerships"
      ],
      color: "from-cyan-600 to-green-600",
      status: "planned"
    },
    {
      phase: "Phase 4",
      title: "Global Adoption",
      quarter: "Q3 2026",
      items: [
        "Enterprise Solutions",
        "Global Marketing Push", 
        "Major Exchange Listings",
        "Ecosystem Fund Launch",
        "Metaverse Integration"
      ],
      color: "from-green-600 to-yellow-600",
      status: "vision"
    }
  ]

  const tokenomicsData = {
    distribution: [
      { label: "Public Sale", percentage: 35, amount: "350M", color: "bg-purple-500" },
      { label: "Team & Advisors", percentage: 20, amount: "200M", color: "bg-blue-500" },
      { label: "Development", percentage: 15, amount: "150M", color: "bg-cyan-500" },
      { label: "Marketing", percentage: 10, amount: "100M", color: "bg-green-500" },
      { label: "Liquidity", percentage: 10, amount: "100M", color: "bg-yellow-500" },
      { label: "Ecosystem Fund", percentage: 5, amount: "50M", color: "bg-red-500" },
      { label: "Reserve", percentage: 5, amount: "50M", color: "bg-gray-500" }
    ],
    vesting: [
      { label: "Public Sale", months: 0, description: "Immediate unlock" },
      { label: "Team & Advisors", months: 12, description: "12-month cliff, 24-month linear" },
      { label: "Development", months: 6, description: "6-month cliff, 18-month linear" },
      { label: "Marketing", months: 3, description: "3-month cliff, 12-month linear" },
      { label: "Liquidity", months: 0, description: "Immediate for DEX" },
      { label: "Ecosystem Fund", months: 6, description: "6-month cliff, quarterly releases" }
    ],
    utilities: [
      { title: "Platform Fees", description: "50% discount on all platform services" },
      { title: "Governance", description: "Vote on platform upgrades and decisions" },
      { title: "Staking Rewards", description: "Earn APY up to 15% through staking" },
      { title: "Premium Features", description: "Access to advanced tools and analytics" },
      { title: "Launchpad Access", description: "Early access to new token launches" },
      { title: "Revenue Sharing", description: "Share in platform revenue through staking" }
    ]
  }

  const stats = [
    { label: "Total Supply", value: "1B", suffix: "SOLX" },
    { label: "Initial Market Cap", value: "$2.5M", suffix: "" },
    { label: "Circulating at Launch", value: "350M", suffix: "SOLX" },
    { label: "Max APY", value: "15%", suffix: "Staking" }
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Interactive Mouse Trail */}
        <div 
          className="absolute w-96 h-96 bg-gradient-radial from-purple-500/10 to-transparent rounded-full pointer-events-none blur-xl transition-all duration-300"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      {/* Sticky Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Platform</span>
            </Link>
            
            <div className="flex items-center space-x-8">
              <a href="#tokenomics" className="text-white/80 hover:text-white transition-colors">Tokenomics</a>
              <a href="#roadmap" className="text-white/80 hover:text-white transition-colors">Roadmap</a>
              <a href="#presale" className="text-white/80 hover:text-white transition-colors">Presale</a>
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105">
                Join Presale
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Animated Logo/Symbol */}
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-spin-slow opacity-75" />
              <div className="absolute inset-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full animate-spin-reverse opacity-90" />
              <div className="absolute inset-4 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  $SOLX
                </span>
              </div>
              
              {/* Pulsing Ring Effect */}
              <div className="absolute inset-0 rounded-full border-2 border-purple-400 animate-ping opacity-20" />
              <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-20" style={{ animationDelay: '1s' }} />
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 relative">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient bg-300% leading-tight">
              The Future of 
            </span>
            <br />
            <span className="text-white relative">
              Token Economics
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-pulse" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed">
            Powering the next generation of DeFi with <span className="text-cyan-400 font-semibold">AI-driven tokenomics</span>, 
            <span className="text-purple-400 font-semibold"> automated yield optimization</span>, and 
            <span className="text-blue-400 font-semibold"> revolutionary staking mechanisms</span>
          </p>

          {/* Token Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer hover:scale-105"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2 group-hover:from-cyan-400 group-hover:to-green-400 transition-all duration-300">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm">
                  {stat.label} {stat.suffix}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <button className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 w-full sm:w-auto">
              <span className="flex items-center justify-center space-x-2">
                <Rocket className="w-5 h-5 group-hover:animate-bounce" />
                <span>Join Presale</span>
              </span>
            </button>
            
            <button className="group border-2 border-white/20 hover:border-white/40 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-white/5 w-full sm:w-auto">
              <span className="flex items-center justify-center space-x-2">
                <Play className="w-5 h-5 group-hover:text-cyan-400" />
                <span>Watch Demo</span>
              </span>
            </button>
          </div>

          {/* Contract Address */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 max-w-2xl mx-auto">
            <div className="text-white/60 text-sm mb-2">Token Contract Address</div>
            <div className="flex items-center justify-between">
              <span className="text-white font-mono text-sm md:text-base flex-1 text-left">
                {contractAddress}
              </span>
              <button 
                onClick={copyToClipboard}
                className="ml-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {copied ? (
                  <span className="text-green-400 text-sm">Copied!</span>
                ) : (
                  <Copy className="w-4 h-4 text-white/60 hover:text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-white/40" />
          </div>
        </div>
      </section>

      {/* Why $SOLX Section */}
      <section className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Why <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">$SOLX</span>?
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Revolutionary tokenomics meets cutting-edge technology to create the ultimate DeFi experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Built on Solana for sub-second transaction speeds and minimal fees",
                gradient: "from-yellow-400 to-orange-500",
                hoverColor: "hover:border-yellow-400/50"
              },
              {
                icon: Shield, 
                title: "Ultra Secure",
                description: "Advanced security protocols and audited smart contracts protect your assets",
                gradient: "from-green-400 to-cyan-500",
                hoverColor: "hover:border-green-400/50"
              },
              {
                icon: TrendingUp,
                title: "Yield Optimized", 
                description: "AI-powered yield farming strategies maximize your staking rewards automatically",
                gradient: "from-purple-400 to-pink-500",
                hoverColor: "hover:border-purple-400/50"
              },
              {
                icon: Users,
                title: "Community Driven",
                description: "Governance token holders control platform development and revenue distribution",
                gradient: "from-blue-400 to-indigo-500", 
                hoverColor: "hover:border-blue-400/50"
              },
              {
                icon: Globe,
                title: "Multi-Chain Ready",
                description: "Seamless bridging to Ethereum, BSC, and other major blockchain networks",
                gradient: "from-cyan-400 to-blue-500",
                hoverColor: "hover:border-cyan-400/50"
              },
              {
                icon: Target,
                title: "Deflationary",
                description: "Regular token burns and buybacks reduce supply while increasing scarcity",
                gradient: "from-red-400 to-pink-500",
                hoverColor: "hover:border-red-400/50"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`group bg-white/5 backdrop-blur-sm border border-white/10 ${feature.hoverColor} rounded-xl p-8 hover:bg-white/10 transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-2xl`}
              >
                <div className="relative mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300" />
                </div>
                
                <h3 className="text-xl font-bold mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="relative z-10 py-32 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Tokenomics</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Sustainable and innovative token distribution designed for long-term growth
            </p>
          </div>

          {/* Tokenomics Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-2">
              {['distribution', 'vesting', 'utilities'].map((view) => (
                <button
                  key={view}
                  onClick={() => setTokenomicsView(view)}
                  className={`px-6 py-3 rounded-lg font-medium capitalize transition-all duration-300 ${
                    tokenomicsView === view
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>

          {/* Tokenomics Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Chart/Visual */}
            <div className="relative">
              {tokenomicsView === 'distribution' && (
                <div className="relative w-80 h-80 mx-auto">
                  {/* Animated Pie Chart */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {tokenomicsData.distribution.map((item, index) => {
                      const previousPercentages = tokenomicsData.distribution.slice(0, index).reduce((acc, curr) => acc + curr.percentage, 0)
                      const strokeDasharray = `${item.percentage * 0.628} ${100 - item.percentage * 0.628}`
                      const strokeDashoffset = -previousPercentages * 0.628
                      
                      return (
                        <circle
                          key={index}
                          cx="50"
                          cy="50"
                          r="30"
                          fill="none"
                          stroke={`hsl(${240 + index * 30}, 70%, 60%)`}
                          strokeWidth="8"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          className="hover:stroke-width-10 transition-all duration-300 cursor-pointer"
                          style={{
                            animation: `drawCircle 2s ease-in-out ${index * 0.2}s forwards`
                          }}
                        />
                      )
                    })}
                  </svg>
                  
                  {/* Center Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">1B</div>
                      <div className="text-white/60 text-sm">Total Supply</div>
                    </div>
                  </div>
                </div>
              )}

              {tokenomicsView === 'vesting' && (
                <div className="space-y-4">
                  {tokenomicsData.vesting.map((item, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{item.label}</span>
                        <span className="text-sm text-white/60">{item.months} months</span>
                      </div>
                      <div className="text-sm text-white/70">{item.description}</div>
                    </div>
                  ))}
                </div>
              )}

              {tokenomicsView === 'utilities' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tokenomicsData.utilities.map((utility, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold mb-2">{utility.title}</h4>
                      <p className="text-sm text-white/70">{utility.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side - Details */}
            <div className="space-y-6">
              {tokenomicsView === 'distribution' && (
                <div className="space-y-4">
                  {tokenomicsData.distribution.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div className={`w-4 h-4 ${item.color} rounded-full`} />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{item.percentage}%</div>
                        <div className="text-sm text-white/60">{item.amount} tokens</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {tokenomicsView === 'vesting' && (
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Vesting Schedule</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Token Generation Event</span>
                      <span className="text-green-400">Q4 2025</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>First Team Unlock</span>
                      <span className="text-yellow-400">Q4 2026</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Full Circulation</span>
                      <span className="text-blue-400">Q4 2028</span>
                    </div>
                  </div>
                </div>
              )}

              {tokenomicsView === 'utilities' && (
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Token Benefits</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full" />
                      <span>Up to 50% fee discounts</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span>Governance voting power</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                      <span>Staking rewards up to 15% APY</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span>Early access to new features</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Roadmap</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Our journey to revolutionize the DeFi landscape with innovative tokenomics
            </p>
          </div>

          {/* Roadmap Timeline */}
          <div className="relative">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-600 via-blue-600 to-cyan-600" />

            <div className="space-y-24">
              {roadmapPhases.map((phase, index) => (
                <div 
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${phase.color} animate-pulse`} />
                    <div className="absolute inset-0 w-6 h-6 rounded-full bg-gradient-to-r from-white/20 to-white/5 animate-ping" />
                  </div>

                  {/* Phase Content */}
                  <div className={`w-5/12 group cursor-pointer ${
                    index % 2 === 0 ? 'pr-16' : 'pl-16'
                  }`}>
                    <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 hover:scale-105 hover:border-white/20 transition-all duration-500 ${
                      roadmapPhase === index ? 'ring-2 ring-purple-400/50 scale-105' : ''
                    }`}>
                      {/* Phase Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold mb-1">{phase.phase}</h3>
                          <h4 className={`text-lg bg-gradient-to-r ${phase.color} bg-clip-text text-transparent font-semibold`}>
                            {phase.title}
                          </h4>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          phase.status === 'upcoming' ? 'bg-green-500/20 text-green-400' :
                          phase.status === 'planned' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          {phase.quarter}
                        </div>
                      </div>

                      {/* Phase Items */}
                      <div className="space-y-3">
                        {phase.items.map((item, itemIndex) => (
                          <div 
                            key={itemIndex}
                            className="flex items-center space-x-3 group-hover:translate-x-2 transition-transform duration-300"
                            style={{ transitionDelay: `${itemIndex * 100}ms` }}
                          >
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${phase.color}`} />
                            <span className="text-white/80 group-hover:text-white transition-colors duration-300">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-6 pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between text-sm text-white/60 mb-2">
                          <span>Progress</span>
                          <span>
                            {phase.status === 'upcoming' ? '0%' :
                             phase.status === 'planned' ? '0%' :
                             '0%'}
                          </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full bg-gradient-to-r ${phase.color} transition-all duration-1000`}
                            style={{ 
                              width: phase.status === 'upcoming' ? '0%' :
                                     phase.status === 'planned' ? '0%' :
                                     '0%'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Roadmap Navigation */}
          <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              {roadmapPhases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setRoadmapPhase(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    roadmapPhase === index 
                      ? 'bg-purple-400 scale-125' 
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Presale Section */}
      <section id="presale" className="relative z-10 py-32 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Join the Presale</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Be among the first to secure your $SOLX tokens at exclusive presale pricing
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Presale Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  title: "Presale Price",
                  value: "$0.0025",
                  subtitle: "per SOLX token",
                  highlight: true
                },
                {
                  title: "Launch Price",
                  value: "$0.005",
                  subtitle: "100% upside potential"
                },
                {
                  title: "Minimum Buy",
                  value: "100 SOL",
                  subtitle: "40,000 SOLX tokens"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center hover:bg-white/10 hover:scale-105 transition-all duration-300 ${
                    item.highlight ? 'ring-2 ring-purple-400/50' : ''
                  }`}
                >
                  <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    {item.value}
                  </div>
                  <div className="text-white font-semibold mb-1">{item.title}</div>
                  <div className="text-white/60 text-sm">{item.subtitle}</div>
                </div>
              ))}
            </div>

            {/* Presale Form */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-center mb-8">Reserve Your Tokens</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    SOL Amount
                  </label>
                  <input
                    type="number"
                    placeholder="Enter SOL amount"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-black text-sm font-bold">!</span>
                    </div>
                    <div className="text-sm text-yellow-200">
                      <strong>Important:</strong> Presale will begin Q4 2025. By submitting this form, you'll be added to our priority whitelist and notified first when presale opens.
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Join Whitelist
                </button>

                <div className="text-center text-sm text-white/60">
                  By joining the whitelist, you agree to our Terms of Service and Privacy Policy
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-8 mb-8">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 00-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 00-5.487 0 12.36 12.36 0 00-.617-1.23A.077.077 0 008.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 00-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 00.031.055 20.03 20.03 0 005.993 2.98.078.078 0 00.084-.026 13.83 13.83 0 001.226-1.963.074.074 0 00-.041-.104c-.652-.246-1.273-.55-1.872-.892a.077.077 0 01-.008-.128c.126-.094.252-.192.372-.291a.075.075 0 01.078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 01.079.009c.12.1.246.198.373.292a.077.077 0 01-.006.127c-.6.344-1.22.647-1.873.892a.074.074 0 00-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 00.084.028 19.963 19.963 0 006.002-2.981.076.076 0 00.032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 00-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
                </svg>
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.404-5.965 1.404-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
            </div>
            
            <div className="text-white/60 text-sm">
              © 2025 SolX Engine. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes drawCircle {
          from {
            stroke-dasharray: 0 100;
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }

        .bg-300% {
          background-size: 300% 300%;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 6s linear infinite;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  )
}
