'use client'

import { 
  Wrench, 
  Settings, 
  Users, 
  Droplets, 
  Flame, 
  Lightbulb,
  Palette,
  PieChart,
  FileText,
  Globe,
  MessageSquare,
  Share2,
  UserCheck,
  TrendingUp,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Search,
  Target,
  Brain,
  Home,
  Bot,
  Activity,
  Wallet,
  DollarSign,
  Scale,
  Shield,
  Coins
} from 'lucide-react'
import { useState } from 'react'
import Logo from '../Logo'

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const menuItems = [
  { id: 'overview', label: 'Project Overview', icon: Home },
  { id: 'solx-token', label: '$SOLX Token', icon: Coins, isSpecial: true },
  {
    id: 'creation-lab',
    label: 'Creation Lab',
    icon: Wrench,
    hasSubmenu: true,
    submenu: [
      { id: 'token-manager', label: 'Token Manager', icon: Settings },
      { id: 'balance-checker', label: 'Balance Checker', icon: Search },
    ]
  },
  {
    id: 'dex-operations',
    label: 'DEX Operations',
    icon: TrendingUp,
    hasSubmenu: true,
    submenu: [
      { id: 'raydium-amm', label: 'Raydium AMM', icon: Droplets },
      { id: 'raydium-clmm', label: 'Raydium CLMM', icon: BarChart3 },
      { id: 'raydium-cpmm', label: 'Raydium CPMM', icon: PieChart },
      { id: 'pump-fun', label: 'Pump.fun', icon: TrendingUp },
      { id: 'pump-swap', label: 'Pump.swap', icon: Share2 },
      { id: 'orca', label: 'Orca DEX', icon: Droplets },
      { id: 'jupiter', label: 'Jupiter Swap', icon: Share2 },
      { id: 'cross-chain-bridge', label: 'Cross-Chain Bridge', icon: Share2 },
    ]
  },
  { id: 'multisender', label: 'Multisender', icon: Users },
  { id: 'liquidity-manager', label: 'Liquidity Manager', icon: Droplets },
  { id: 'burn', label: 'Token Burner', icon: Flame },
  {
    id: 'ai-tools',
    label: 'AI Tools',
    icon: Lightbulb,
    hasSubmenu: true,
    submenu: [
      { id: 'idea-generation', label: 'Project Ideas', icon: Lightbulb },
      { id: 'branding-design', label: 'Branding & Design', icon: Palette },
      { id: 'tokenomics', label: 'Tokenomics Calculator', icon: PieChart },
      { id: 'whitepaper', label: 'Whitepaper Generator', icon: FileText },
      { id: 'website-builder', label: 'Website Builder', icon: Globe },
      { id: 'ai-signal-generator', label: 'AI Signal Generator', icon: Activity },
      { id: 'launch-simulator', label: 'Launch Simulator', icon: Brain },
    ]
  },
  {
    id: 'marketing-suite',
    label: 'Marketing Suite',
    icon: MessageSquare,
    hasSubmenu: true,
    submenu: [
      { id: 'content-generator', label: 'Content Generator', icon: MessageSquare },
      { id: 'social-automation', label: 'Social Automation', icon: Share2 },
      { id: 'community-tools', label: 'Community Tools', icon: UserCheck },
    ]
  },
  {
    id: 'wallet-management',
    label: 'Wallet Management',
    icon: Wallet,
    hasSubmenu: true,
    submenu: [
      { id: 'wallet-generator', label: 'Bulk Wallet Generator', icon: Wallet },
      { id: 'sol-distribution', label: 'SOL Distribution', icon: DollarSign },
      { id: 'token-distribution', label: 'Token Distribution', icon: DollarSign },
    ]
  },
  {
    id: 'bot-extensions',
    label: 'Bot Extensions',
    icon: Bot,
    hasSubmenu: true,
    submenu: [
      { id: 'volume-bot', label: 'Volume Bot', icon: Activity },
      { id: 'holder-bot', label: 'Holder Generator', icon: Users },
    ]
  },
  {
    id: 'legal-compliance',
    label: 'Legal & Compliance',
    icon: Scale,
    hasSubmenu: true,
    submenu: [
      { id: 'legal-docs', label: 'Legal Document Generator', icon: FileText },
      { id: 'compliance-checker', label: 'Compliance Checker', icon: Shield },
      { id: 'phantom-compliance', label: 'Phantom Compliance', icon: Shield },
    ]
  },
  {
    id: 'advanced-features',
    label: 'Advanced Features',
    icon: Brain,
    hasSubmenu: true,
    submenu: [
      { id: 'portfolio-tracker', label: 'Portfolio Tracker', icon: Target },
      { id: 'arbitrage-scanner', label: 'Arbitrage Scanner', icon: TrendingUp },
      { id: 'gamification-leaderboards', label: 'Gamification Hub', icon: Target },
      { id: 'api-key-vault', label: 'API Key Vault', icon: Shield },
    ]
  },
  {
    id: 'staking-rewards',
    label: 'Staking & Rewards',
    icon: Coins,
    hasSubmenu: true,
    submenu: [
      { id: 'solx-staking', label: 'SOLX Staking Hub', icon: Coins },
    ]
  },
  {
    id: 'institutional',
    label: 'Institutional Tools',
    icon: BarChart3,
    hasSubmenu: true,
    submenu: [
      { id: 'institutional-dashboard', label: 'Institutional Dashboard', icon: BarChart3 },
    ]
  },
  { id: 'analytics', label: 'Analytics & Insights', icon: BarChart3 },
  { id: 'settings', label: 'Settings & Config', icon: Settings },
]

export default function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['creation-lab'])

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    )
  }

  return (
    <div className="w-64 bg-black border-r border-zinc-800 h-full overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-zinc-800">
        <Logo />
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => (
          <div key={item.id}>
            {item.hasSubmenu ? (
              <>
                <button
                  onClick={() => toggleMenu(item.id)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-zinc-300 hover:bg-zinc-800 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon size={18} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {expandedMenus.includes(item.id) ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>
                {expandedMenus.includes(item.id) && item.submenu && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.submenu.map((subitem) => (
                      <button
                        key={subitem.id}
                        onClick={() => setActiveSection(subitem.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                          activeSection === subitem.id
                            ? 'bg-purple-900 text-purple-300 border-r-2 border-purple-500'
                            : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300'
                        }`}
                      >
                        <subitem.icon size={16} />
                        <span>{subitem.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              item.id === 'solx-token' ? (
                <a
                  href="/solx"
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all duration-300 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                >
                  <item.icon size={18} />
                  <span className="font-bold">{item.label}</span>
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                  </div>
                </a>
              ) : (
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSection === item.id
                      ? 'bg-purple-900 text-purple-300 border-r-2 border-purple-500'
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300'
                  }`}
                >
                  <item.icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}
