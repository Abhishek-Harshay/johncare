'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Book, ExternalLink, ChevronRight, Search, Download, Copy, CheckCircle } from 'lucide-react'

interface DocumentSection {
  id: string
  title: string
  content: string
  subsections?: DocumentSection[]
}

export default function GitBookPage() {
  const [activeSection, setActiveSection] = useState('getting-started')
  const [searchQuery, setSearchQuery] = useState('')
  const [copied, setCopied] = useState(false)

  const documentSections: DocumentSection[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      content: `# Welcome to SolX Engine Documentation

SolX Engine is a comprehensive AI-powered token management and growth platform built specifically for the Solana blockchain. This guide will walk you through every feature and service we offer.

## Quick Start

1. **Connect Your Wallet**: Use any Solana-compatible wallet (Phantom, Solflare, etc.)
2. **Fund Your Account**: Ensure you have SOL for transaction fees
3. **Choose Your Service**: Navigate to any of our 7 main categories
4. **Follow the Guides**: Each service includes step-by-step instructions

## Platform Overview

SolX Engine provides professional-grade tools for:
- Token creation and management
- Automated trading and volume generation
- Legal compliance and documentation
- DEX integration and liquidity management
- AI-powered content creation and branding

Let's dive into each category!`
    },
    {
      id: 'core-services',
      title: 'Core Services',
      content: `# Core Services

## Token Manager
Create and manage SPL tokens with professional-grade tools.

### Step-by-Step Guide:
1. Navigate to "Token Management" → "Token Manager"
2. Connect your Solana wallet
3. Choose "Create New Token"
4. Fill in token details:
   - **Name**: Your token's display name
   - **Symbol**: Trading symbol (3-6 characters)
   - **Decimals**: Usually 6-9 for tokens
   - **Total Supply**: Maximum tokens to create
5. Add metadata:
   - Description
   - Logo image (512x512px recommended)
   - Website URL
6. Review settings and confirm transaction
7. Your token is live on Solana!

### Pro Tips:
- Test on testnet first
- Prepare metadata before creation
- Consider token economics carefully

## Balance Checker
Monitor token balances across multiple wallets.

### Features:
- Real-time balance updates
- Support for any SPL token
- Bulk wallet checking
- Export functionality

## Multisender
Distribute tokens or SOL to multiple addresses efficiently.

### Use Cases:
- Airdrop campaigns
- Team token distribution
- Community rewards
- Bulk payments`
    },
    {
      id: 'bot-extensions',
      title: 'Bot Extensions',
      content: `# Bot Extensions

## Volume Bot
Generate realistic trading volume for your token.

### Trading Patterns:
1. **Organic Pattern**: Natural trading behavior
2. **Aggressive Pattern**: High-frequency trading
3. **Whale Simulation**: Large holder behavior
4. **Flash Trading**: Quick buy/sell cycles

### Setup Guide:
1. Go to "Bot Extensions" → "Volume Bot"
2. Enter your token contract address
3. Configure parameters:
   - Volume target (daily/weekly)
   - Price range tolerance
   - Trading frequency
   - Wallet distribution
4. Set SOL amounts for trading
5. Choose pattern and duration
6. Start bot and monitor progress

### Best Practices:
- Start with lower volumes
- Use organic patterns for authenticity
- Monitor for 24-48 hours minimum
- Ensure sufficient SOL in trading wallets

## Holder Generator
Create authentic holder distributions.

### Distribution Types:
- **Natural**: Realistic Pareto distribution
- **Whale Heavy**: Few large holders
- **Retail Heavy**: Many small holders
- **Balanced**: Even distribution

### Configuration:
- Holder count (10-1000)
- Token amount ranges
- Creation speed settings
- Distribution patterns

## Bulk Wallet Generator
Create up to 100,000 wallets for various purposes.

### Features:
- High-entropy wallet generation
- Multiple export formats
- Batch processing
- Security-focused design`
    },
    {
      id: 'dex-integration',
      title: 'DEX Integration',
      content: `# DEX Integration

## Raydium Integration
Create and manage liquidity pools on Raydium.

### Pool Types:
1. **AMM**: Standard automated market maker
2. **CLMM**: Concentrated liquidity market maker
3. **CPMM**: Constant product market maker

### Creating a Pool:
1. Navigate to "DEX Integration" → "Raydium"
2. Connect wallet with tokens and SOL
3. Choose pool type
4. Set parameters:
   - Initial price
   - Liquidity amounts
   - Fee tier (for CLMM)
   - Price range (for concentrated liquidity)
5. Review pool configuration
6. Create pool and provide initial liquidity

### Pool Management:
- Add/remove liquidity
- Monitor performance
- Adjust price ranges
- Collect fees

## Jupiter Integration
Best-rate token swapping across all Solana DEXs.

### Features:
- Automatic route optimization
- Slippage protection
- MEV protection
- Price impact analysis

## Orca Integration
Whirlpool concentrated liquidity pools.

### Advantages:
- Capital efficiency
- Customizable fee tiers
- Advanced position management
- Yield farming opportunities`
    },
    {
      id: 'ai-tools',
      title: 'AI Tools',
      content: `# AI Tools

## Content Generator
Create marketing materials using advanced AI.

### Content Types:
- Social media posts
- Blog articles
- Press releases
- Community announcements
- Website copy

### Generation Process:
1. Access "AI Tools" → "Content Generator"
2. Select content type
3. Provide project context:
   - Token/project name
   - Key features
   - Target audience
   - Brand voice
4. Choose style preferences
5. Generate content
6. Edit and customize
7. Export for use

### Best Practices:
- Provide detailed context
- Review all generated content
- Maintain brand consistency
- Test different approaches

## Branding Design
AI-powered logo and visual design.

### Services:
- Logo creation
- Color palette generation
- Brand guideline development
- Marketing material design

## Tokenomics Planner
Design sustainable token economics.

### Analysis Areas:
- Supply distribution
- Vesting schedules
- Utility mechanisms
- Incentive structures
- Growth projections`
    },
    {
      id: 'legal-compliance',
      title: 'Legal & Compliance',
      content: `# Legal & Compliance

## Legal Document Generator
Create professional legal documentation.

### Available Documents:
- Terms of Service
- Privacy Policy
- Token Sale Agreement
- Whitepaper Template
- Compliance Reports

### Generation Process:
1. Go to "Legal & Compliance" → "Legal Document Generator"
2. Enter company information
3. Provide token details
4. Select jurisdictions
5. Configure compliance options:
   - KYC requirements
   - AML compliance
   - GDPR/CCPA compliance
6. Add custom clauses
7. Generate documents
8. Download in multiple formats

### Compliance Features:
- Multi-jurisdiction support
- Regulatory requirement analysis
- Risk assessment
- Update notifications

## Compliance Checker
Analyze regulatory requirements across jurisdictions.

### Analysis Areas:
- Securities law compliance
- Tax implications
- Licensing requirements
- Registration needs
- Ongoing obligations

### Reports Include:
- Jurisdiction-specific analysis
- Risk assessments
- Recommendation summaries
- Action items
- Timeline requirements`
    },
    {
      id: 'analytics',
      title: 'Analytics & Monitoring',
      content: `# Analytics & Monitoring

## Portfolio Tracker
Real-time portfolio monitoring and analytics.

### Features:
- Multi-wallet tracking
- Performance analytics
- P&L calculations
- Risk assessments
- Historical data

### Setup:
1. Add wallet addresses
2. Configure tracking preferences
3. Set alerts and notifications
4. Monitor performance
5. Generate reports

## Arbitrage Scanner
Identify profitable trading opportunities.

### Scanning Features:
- Cross-DEX price analysis
- Profit calculations
- Risk assessments
- Execution recommendations

### Benefits:
- Automated opportunity detection
- Real-time price monitoring
- Risk-adjusted returns
- Market inefficiency identification

## Market Analysis
Comprehensive market intelligence.

### Data Points:
- Price movements
- Volume analysis
- Liquidity metrics
- Market sentiment
- Trading patterns

### Insights:
- Market trends
- Trading opportunities
- Risk factors
- Performance benchmarks`
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      content: `# API Reference

## Authentication
All API endpoints require authentication using API keys.

### Getting API Keys:
1. Navigate to Settings → API Keys
2. Generate new API key
3. Copy and store securely
4. Use in request headers

### Header Format:
\`\`\`
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
\`\`\`

## Endpoints

### Token Management
\`\`\`
POST /api/token-manager
GET /api/token-manager/{tokenAddress}
PUT /api/token-manager/{tokenAddress}
DELETE /api/token-manager/{tokenAddress}
\`\`\`

### Volume Bot
\`\`\`
POST /api/volume-bot/start
GET /api/volume-bot/status/{botId}
POST /api/volume-bot/stop/{botId}
\`\`\`

### Legal Documents
\`\`\`
POST /api/legal-generator
GET /api/legal-documents
POST /api/compliance-check
\`\`\`

## Rate Limits
- 1000 requests per hour for free tier
- 10,000 requests per hour for premium
- Contact us for enterprise limits

## Error Handling
All errors return JSON with error code and message:
\`\`\`json
{
  "error": "INVALID_TOKEN",
  "message": "Token address is not valid",
  "status": 400
}
\`\`\``
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      content: `# Troubleshooting

## Common Issues

### Wallet Connection Problems
**Problem**: Wallet won't connect
**Solutions**:
- Refresh the page
- Clear browser cache
- Ensure wallet extension is enabled
- Try different browser
- Check wallet balance for SOL

### Transaction Failures
**Problem**: Transactions fail or timeout
**Solutions**:
- Increase slippage tolerance
- Ensure sufficient SOL for fees
- Check network congestion
- Try during off-peak hours
- Verify token addresses

### Bot Performance Issues
**Problem**: Bots not performing as expected
**Solutions**:
- Check wallet balances
- Verify token liquidity
- Adjust parameters
- Monitor network conditions
- Review bot logs

## Support Channels

### Community Support
- Telegram: @SolXEngine
- Discord: discord.gg/solxengine
- Twitter: @SolXEngine

### Direct Support
- Email: support@solxengine.com
- Live Chat: Available 24/7
- Support Tickets: Create in dashboard

## FAQ

**Q: What are the minimum requirements?**
A: Solana wallet with SOL for fees, supported browser with JavaScript enabled.

**Q: Are there usage limits?**
A: Free tier has basic limits, premium plans offer higher limits.

**Q: Is testnet supported?**
A: Yes, all services support testnet for safe testing.

**Q: How do I report bugs?**
A: Use the bug report form in settings or contact support directly.`
    }
  ]

  const filteredSections = documentSections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const currentSection = documentSections.find(section => section.id === activeSection)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
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
                <Book className="w-6 h-6 text-purple-600" />
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  SolX Engine Documentation
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
                />
              </div>
              <button
                onClick={() => copyToClipboard(currentSection?.content || '')}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
              <a
                href="#"
                download="solx-documentation.md"
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Documentation</h3>
              <nav className="space-y-2">
                {filteredSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center justify-between group ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border-l-4 border-purple-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium">{section.title}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${
                      activeSection === section.id ? 'rotate-90' : 'group-hover:translate-x-1'
                    }`} />
                  </button>
                ))}
              </nav>
              
              {/* Quick Links */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Quick Links</h4>
                <div className="space-y-2">
                  <a
                    href="https://github.com/solxengine"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>GitHub Repository</span>
                  </a>
                  <a
                    href="https://t.me/solxengine"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Telegram Community</span>
                  </a>
                  <a
                    href="/api-reference"
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>API Reference</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {currentSection && (
                <div className="p-8">
                  <div className="prose prose-lg max-w-none">
                    <div 
                      className="documentation-content"
                      dangerouslySetInnerHTML={{
                        __html: currentSection.content
                          .replace(/\n/g, '<br/>')
                          .replace(/# (.*?)<br\/>/g, '<h1 class="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">$1</h1>')
                          .replace(/## (.*?)<br\/>/g, '<h2 class="text-2xl font-semibold mb-4 text-gray-900 mt-8">$1</h2>')
                          .replace(/### (.*?)<br\/>/g, '<h3 class="text-xl font-semibold mb-3 text-gray-800 mt-6">$1</h3>')
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
                          .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded font-mono text-sm">$1</code>')
                          .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto"><code>$1</code></pre>')
                      }}
                    />
                  </div>
                  
                  {/* Navigation Footer */}
                  <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Last updated:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
                        Edit this page
                      </button>
                      <button className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
                        Report issue
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
