'use client'

import { useState } from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Logo from './Logo'
import Sidebar from './layout/Sidebar'
import TokenManager from './sections/TokenManager'
import BalanceChecker from './sections/BalanceChecker'
import Multisender from './sections/Multisender'
import LiquidityManager from './sections/LiquidityManager'
import BurnTokens from './sections/BurnTokens'
import RaydiumAMM from './sections/RaydiumAMM'
import RaydiumCLMM from './sections/RaydiumCLMM'
import RaydiumCPMM from './sections/RaydiumCPMM'
import PumpFun from './sections/PumpFun'
import PumpSwap from './sections/PumpSwap'
import Orca from './sections/Orca'
import Jupiter from './sections/Jupiter'
import Analytics from './sections/Analytics'
import IdeaGeneration from './sections/IdeaGeneration'
import BrandingDesign from './sections/BrandingDesign'
import Tokenomics from './sections/Tokenomics'
import WhitepaperGenerator from './sections/WhitepaperGenerator'
import WebsiteBuilder from './sections/WebsiteBuilder'
import ContentGenerator from './sections/ContentGenerator'
import SocialAutomation from './sections/SocialAutomation'
import CommunityTools from './sections/CommunityTools'
import PortfolioTracker from './sections/PortfolioTracker'
import ArbitrageScanner from './sections/ArbitrageScanner'
import SettingsConfig from './sections/SettingsConfig'
import ProjectOverview from './sections/ProjectOverview'
import VolumeBot from './bots/VolumeBot'
import HolderBot from './bots/HolderBot'
import BulkWalletGenerator from './bots/BulkWalletGenerator'
import SolDistribution from './bots/SolDistribution'
import TokenDistribution from './bots/TokenDistribution'
import LegalDocGenerator from './bots/LegalDocGenerator'
import ComplianceChecker from './bots/ComplianceChecker'

// Phase 7 Components
import SolxStaking from './sections/phase7/SolxStaking'
import PhantomCompliance from './sections/phase7/PhantomCompliance'
import AiSignalGenerator from './sections/phase7/AiSignalGenerator'
import GamificationLeaderboards from './sections/phase7/GamificationLeaderboards'
import CrossChainBridge from './sections/phase7/CrossChainBridge'
import InstitutionalDashboard from './sections/phase7/InstitutionalDashboard'
import ApiKeyVault from './sections/phase7/ApiKeyVault'
import LaunchSimulator from './sections/phase7/LaunchSimulator'

type ActiveSection = 'token-manager' | 'balance-checker' | 'multisender' | 'liquidity-manager' | 'burn' | 'analytics' | 'raydium-amm' | 'raydium-clmm' | 'raydium-cpmm' | 'pump-fun' | 'pump-swap' | 'orca' | 'jupiter' | 'idea-generation' | 'branding-design' | 'tokenomics' | 'whitepaper' | 'website-builder' | 'content-generator' | 'social-automation' | 'community-tools' | 'portfolio-tracker' | 'arbitrage-scanner' | 'settings' | 'overview' | 'volume-bot' | 'holder-bot' | 'wallet-generator' | 'sol-distribution' | 'token-distribution' | 'legal-docs' | 'compliance-checker' | 'solx-staking' | 'phantom-compliance' | 'ai-signal-generator' | 'gamification-leaderboards' | 'cross-chain-bridge' | 'institutional-dashboard' | 'api-key-vault' | 'launch-simulator'

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview')

  const handleSectionChange = (section: string) => {
    setActiveSection(section as ActiveSection)
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'token-manager':
        return <TokenManager />
      case 'balance-checker':
        return <BalanceChecker />
      case 'multisender':
        return <Multisender />
      case 'liquidity-manager':
        return <LiquidityManager />
      case 'burn':
        return <BurnTokens />
      case 'raydium-amm':
        return <RaydiumAMM />
      case 'raydium-clmm':
        return <RaydiumCLMM />
      case 'raydium-cpmm':
        return <RaydiumCPMM />
      case 'pump-fun':
        return <PumpFun />
      case 'pump-swap':
        return <PumpSwap />
      case 'orca':
        return <Orca />
      case 'jupiter':
        return <Jupiter />
      case 'analytics':
        return <Analytics />
      case 'idea-generation':
        return <IdeaGeneration />
      case 'branding-design':
        return <BrandingDesign />
      case 'tokenomics':
        return <Tokenomics />
      case 'whitepaper':
        return <WhitepaperGenerator />
      case 'website-builder':
        return <WebsiteBuilder />
      case 'content-generator':
        return <ContentGenerator />
      case 'social-automation':
        return <SocialAutomation />
      case 'community-tools':
        return <CommunityTools />
      case 'portfolio-tracker':
        return <PortfolioTracker />
      case 'arbitrage-scanner':
        return <ArbitrageScanner />
      case 'settings':
        return <SettingsConfig />
      case 'volume-bot':
        return <VolumeBot />
      case 'holder-bot':
        return <HolderBot />
      case 'wallet-generator':
        return <BulkWalletGenerator />
      case 'sol-distribution':
        return <SolDistribution />
      case 'token-distribution':
        return <TokenDistribution />
      case 'legal-docs':
        return <LegalDocGenerator />
      case 'compliance-checker':
        return <ComplianceChecker />
      case 'solx-staking':
        return <SolxStaking />
      case 'phantom-compliance':
        return <PhantomCompliance />
      case 'ai-signal-generator':
        return <AiSignalGenerator />
      case 'gamification-leaderboards':
        return <GamificationLeaderboards />
      case 'cross-chain-bridge':
        return <CrossChainBridge />
      case 'institutional-dashboard':
        return <InstitutionalDashboard />
      case 'api-key-vault':
        return <ApiKeyVault />
      case 'launch-simulator':
        return <LaunchSimulator />
      case 'overview':
        return <ProjectOverview />
      default:
        return <ProjectOverview />
    }
  }

  return (
    <div className="flex h-screen bg-black">
      <Sidebar activeSection={activeSection} setActiveSection={handleSectionChange} />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Logo showText={true} />
            <span className="text-zinc-600">|</span>
            <span className="text-purple-400 capitalize font-medium">
              {activeSection.replace('-', ' ')}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg">
              Buy SOLX
            </button>
            <WalletMultiButton className="!bg-black hover:!bg-zinc-800 !border-zinc-700" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-zinc-950">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  )
}
