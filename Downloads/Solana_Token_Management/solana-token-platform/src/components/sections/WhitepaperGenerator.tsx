'use client'

import { useState } from 'react'
import { FileText, PenTool, Download, Eye, BookOpen, Target, Users, Lightbulb, TrendingUp, Shield, Zap } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'

interface WhitepaperSection {
  id: string
  title: string
  content: string
  required: boolean
  completed: boolean
}

interface ProjectInfo {
  name: string
  tagline: string
  category: string
  problem: string
  solution: string
  targetMarket: string
  uniqueValue: string
  tokenUtility: string[]
}

export default function WhitepaperGenerator() {
  const { publicKey } = useWallet()
  const [activeTab, setActiveTab] = useState<'builder' | 'preview' | 'export'>('builder')
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>({
    name: '',
    tagline: '',
    category: 'DeFi',
    problem: '',
    solution: '',
    targetMarket: '',
    uniqueValue: '',
    tokenUtility: ['Governance', 'Rewards']
  })

  const [sections, setSections] = useState<WhitepaperSection[]>([
    { id: 'executive', title: 'Executive Summary', content: '', required: true, completed: false },
    { id: 'problem', title: 'Problem Statement', content: '', required: true, completed: false },
    { id: 'solution', title: 'Our Solution', content: '', required: true, completed: false },
    { id: 'market', title: 'Market Analysis', content: '', required: true, completed: false },
    { id: 'product', title: 'Product Overview', content: '', required: true, completed: false },
    { id: 'tokenomics', title: 'Tokenomics', content: '', required: true, completed: false },
    { id: 'technology', title: 'Technology Stack', content: '', required: true, completed: false },
    { id: 'roadmap', title: 'Roadmap', content: '', required: true, completed: false },
    { id: 'team', title: 'Team', content: '', required: false, completed: false },
    { id: 'partnerships', title: 'Partnerships', content: '', required: false, completed: false },
    { id: 'risk', title: 'Risk Assessment', content: '', required: true, completed: false },
    { id: 'legal', title: 'Legal Compliance', content: '', required: true, completed: false }
  ])

  const categories = ['DeFi', 'NFT', 'Gaming', 'Metaverse', 'Infrastructure', 'Social', 'Utility', 'Other']
  
  const tokenUtilities = [
    'Governance', 'Rewards', 'Staking', 'Fee Payment', 'Access Token', 
    'Liquidity Mining', 'Burn Mechanism', 'Collateral', 'Revenue Share', 'Voting Rights'
  ]

  const generateSection = async (sectionId: string) => {
    setIsGenerating(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockContent = {
        executive: `${projectInfo.name} is revolutionizing the ${projectInfo.category.toLowerCase()} space by ${projectInfo.solution.toLowerCase() || 'providing innovative blockchain solutions'}. Our platform addresses critical market gaps and delivers exceptional value to users through cutting-edge technology and community-driven governance.`,
        problem: `The current ${projectInfo.category.toLowerCase()} ecosystem faces significant challenges including ${projectInfo.problem || 'lack of user-friendly interfaces, high fees, and limited accessibility'}. These issues prevent mainstream adoption and limit the potential for innovation in the space.`,
        solution: `${projectInfo.name} solves these challenges through ${projectInfo.solution || 'innovative technology and user-centric design'}. Our approach combines advanced blockchain technology with intuitive user experience to deliver unparalleled value.`,
        market: `The global ${projectInfo.category.toLowerCase()} market is experiencing rapid growth, with increasing demand for decentralized solutions. Our target market of ${projectInfo.targetMarket || 'crypto-native users and institutions'} represents significant opportunity for expansion.`,
        product: `Our product suite includes comprehensive tools and features designed to meet the evolving needs of ${projectInfo.category.toLowerCase()} users. Built on Solana for optimal performance and cost-effectiveness.`,
        tokenomics: `The ${projectInfo.name} token serves multiple utilities within our ecosystem: ${projectInfo.tokenUtility.join(', ')}. Our carefully designed tokenomics ensure sustainable growth and value accrual for all stakeholders.`,
        technology: `Built on the Solana blockchain for high throughput and low fees. Our technical architecture prioritizes security, scalability, and user experience through proven development frameworks and best practices.`,
        roadmap: `Our development roadmap spans 24 months with key milestones including product launch, partnership integrations, community growth initiatives, and feature expansions based on user feedback and market demands.`,
        team: `Our team combines extensive experience in blockchain development, ${projectInfo.category.toLowerCase()}, and product management. Led by industry veterans with proven track records in building successful crypto projects.`,
        partnerships: `Strategic partnerships with leading ${projectInfo.category.toLowerCase()} protocols, infrastructure providers, and community organizations enable us to deliver comprehensive solutions and accelerate ecosystem growth.`,
        risk: `Key risks include regulatory changes, market volatility, technical challenges, and competitive pressures. We have implemented comprehensive risk management strategies and maintain strong reserves for operational continuity.`,
        legal: `Full compliance with applicable regulations and ongoing legal review ensure project sustainability. We work closely with legal experts to navigate the evolving regulatory landscape and maintain operational compliance.`
      }

      setSections(prev => prev.map(section => 
        section.id === sectionId 
          ? { ...section, content: mockContent[sectionId as keyof typeof mockContent] || 'Generated content...', completed: true }
          : section
      ))
      
      alert(`🎯 AI Whitepaper Section Generated!\n\n"${sections.find(s => s.id === sectionId)?.title}" section has been automatically generated based on your project information.`)
    } catch (error) {
      console.error('Section generation failed:', error)
      alert('Section generation failed')
    }
    setIsGenerating(false)
  }

  const generateFullWhitepaper = async () => {
    setIsGenerating(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Generate all required sections
      const updatedSections = sections.map(section => ({
        ...section,
        completed: section.required,
        content: section.required ? `Generated content for ${section.title.toLowerCase()}...` : section.content
      }))
      
      setSections(updatedSections)
      setActiveTab('preview')
      
      alert(`🚀 Complete Whitepaper Generated!\n\nYour comprehensive whitepaper for "${projectInfo.name || 'Your Project'}" is ready!\n\n• ${updatedSections.filter(s => s.completed).length} sections completed\n• Professional formatting applied\n• Ready for review and export`)
    } catch (error) {
      console.error('Whitepaper generation failed:', error)
      alert('Whitepaper generation failed')
    }
    setIsGenerating(false)
  }

  const exportWhitepaper = () => {
    const completedSections = sections.filter(s => s.completed)
    const content = completedSections.map(section => `${section.title}\n\n${section.content}\n\n`).join('')
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${projectInfo.name || 'whitepaper'}-whitepaper.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const completedCount = sections.filter(s => s.completed).length
  const totalCount = sections.length
  const progress = (completedCount / totalCount) * 100

  const steps = [
    { title: 'Project Info', description: 'Basic project details' },
    { title: 'Content Generation', description: 'AI-powered sections' },
    { title: 'Review & Export', description: 'Final whitepaper' }
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          AI Whitepaper Generator
        </h1>
        <p className="text-zinc-400">
          Create professional whitepapers with AI-powered content generation and industry best practices
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-6 bg-zinc-900 rounded-xl p-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-1">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
              currentStep >= index 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-blue-500 text-white' 
                : 'border-zinc-600 text-zinc-400'
            }`}>
              {index + 1}
            </div>
            <div className="ml-3 flex-1">
              <div className={`font-medium ${currentStep >= index ? 'text-white' : 'text-zinc-400'}`}>
                {step.title}
              </div>
              <div className="text-xs text-zinc-500">{step.description}</div>
            </div>
            {index < steps.length - 1 && (
              <div className={`h-px w-full mx-4 ${currentStep > index ? 'bg-blue-500' : 'bg-zinc-700'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-zinc-900 rounded-xl p-1">
        {[
          { id: 'builder', label: 'Builder', icon: PenTool },
          { id: 'preview', label: 'Preview', icon: Eye },
          { id: 'export', label: 'Export', icon: Download }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Builder Tab */}
      {activeTab === 'builder' && (
        <div className="space-y-6">
          {/* Project Information */}
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-400" />
              Project Information
            </h3>
            <div className="grid lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Project Name</label>
                <input
                  type="text"
                  value={projectInfo.name}
                  onChange={(e) => setProjectInfo({...projectInfo, name: e.target.value})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your project name..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Tagline</label>
                <input
                  type="text"
                  value={projectInfo.tagline}
                  onChange={(e) => setProjectInfo({...projectInfo, tagline: e.target.value})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500"
                  placeholder="Brief project description..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Category</label>
                <select
                  value={projectInfo.category}
                  onChange={(e) => setProjectInfo({...projectInfo, category: e.target.value})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Target Market</label>
                <input
                  type="text"
                  value={projectInfo.targetMarket}
                  onChange={(e) => setProjectInfo({...projectInfo, targetMarket: e.target.value})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500"
                  placeholder="Who are your users?"
                />
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Problem Statement</label>
                <textarea
                  value={projectInfo.problem}
                  onChange={(e) => setProjectInfo({...projectInfo, problem: e.target.value})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500 h-20 resize-none"
                  placeholder="What problem does your project solve?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Your Solution</label>
                <textarea
                  value={projectInfo.solution}
                  onChange={(e) => setProjectInfo({...projectInfo, solution: e.target.value})}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500 h-20 resize-none"
                  placeholder="How do you solve this problem?"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-zinc-300 mb-2">Token Utility (Select all that apply)</label>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
                {tokenUtilities.map(utility => (
                  <label key={utility} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={projectInfo.tokenUtility.includes(utility)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setProjectInfo({...projectInfo, tokenUtility: [...projectInfo.tokenUtility, utility]})
                        } else {
                          setProjectInfo({...projectInfo, tokenUtility: projectInfo.tokenUtility.filter(u => u !== utility)})
                        }
                      }}
                      className="accent-blue-500"
                    />
                    <span className="text-zinc-300 text-sm">{utility}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Section Builder */}
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <FileText className="w-5 h-5 mr-2 text-purple-400" />
                Whitepaper Sections
              </h3>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-zinc-400">
                  Progress: {completedCount}/{totalCount} sections
                </div>
                <button
                  onClick={generateFullWhitepaper}
                  disabled={isGenerating || !projectInfo.name}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-all"
                >
                  {isGenerating ? 'Generating...' : 'Generate All'}
                </button>
              </div>
            </div>

            <div className="mb-4 bg-zinc-800 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              {sections.map((section) => (
                <div key={section.id} className={`bg-zinc-800 rounded-lg p-4 border ${section.completed ? 'border-green-600' : 'border-zinc-700'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${section.completed ? 'bg-green-500' : 'bg-zinc-500'}`} />
                      <h4 className="text-white font-medium">{section.title}</h4>
                      {section.required && (
                        <span className="text-red-400 text-xs">*</span>
                      )}
                    </div>
                    <button
                      onClick={() => generateSection(section.id)}
                      disabled={isGenerating}
                      className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-3 py-1 rounded text-xs transition-all"
                    >
                      {isGenerating ? 'Gen...' : 'Generate'}
                    </button>
                  </div>
                  {section.completed && (
                    <p className="text-zinc-300 text-xs line-clamp-2">
                      {section.content}
                    </p>
                  )}
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
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-green-400" />
                Whitepaper Preview
              </h3>
              <button
                onClick={exportWhitepaper}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
            </div>

            {/* Whitepaper Content */}
            <div className="max-w-4xl mx-auto bg-white text-black rounded-lg p-8 shadow-2xl">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">{projectInfo.name || 'Your Project'}</h1>
                {projectInfo.tagline && (
                  <p className="text-lg text-gray-600 mb-4">{projectInfo.tagline}</p>
                )}
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto" />
              </div>

              {sections.filter(s => s.completed).map((section) => (
                <div key={section.id} className="mb-8">
                  <h2 className="text-xl font-bold mb-4 text-gray-800">{section.title}</h2>
                  <div className="prose max-w-none text-gray-700 leading-relaxed">
                    {section.content.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>
              ))}

              {completedCount === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No sections generated yet. Go to Builder tab to create content.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Export Tab */}
      {activeTab === 'export' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Export Options</h3>
            
            <div className="text-center py-12">
              <Download className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 text-lg">Export & Distribution</p>
              <p className="text-zinc-500 text-sm mt-2 max-w-md mx-auto">
                Export your whitepaper in multiple formats: PDF, Word, HTML, or share directly to social platforms and communities.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Development Status */}
      <div className="mt-8 bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-4">
        <h4 className="text-blue-300 font-medium mb-2">🚧 Development Status</h4>
        <p className="text-blue-200 text-sm mb-2">
          AI Whitepaper Generator is in active development. Advanced content generation and professional formatting coming soon.
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">✅ Section Builder</span>
          <span className="bg-yellow-900 bg-opacity-50 text-yellow-300 px-2 py-1 rounded">🚧 AI Content Engine</span>
          <span className="bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded">🔜 PDF Export</span>
          <span className="bg-purple-900 bg-opacity-50 text-purple-300 px-2 py-1 rounded">🔜 Template Library</span>
        </div>
      </div>
    </div>
  )
}
