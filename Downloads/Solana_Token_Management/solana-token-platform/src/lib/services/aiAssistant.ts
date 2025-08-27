export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  isTyping?: boolean
}

export interface ChatSession {
  id: string
  messages: ChatMessage[]
  createdAt: string
  lastActivity: string
}

export interface ServiceGuide {
  service: string
  category: string
  description: string
  steps: string[]
  requirements: string[]
  tips: string[]
  relatedServices: string[]
}

class AIAssistantService {
  private static instance: AIAssistantService
  private sessions: Map<string, ChatSession> = new Map()

  // Comprehensive service guides database
  private serviceGuides: ServiceGuide[] = [
    {
      service: 'Token Manager',
      category: 'Core Services',
      description: 'Create and manage SPL tokens on Solana blockchain with professional-grade tools',
      steps: [
        'Navigate to "Token Management" → "Token Manager"',
        'Connect your Solana wallet',
        'Choose "Create New Token" or "Manage Existing Token"',
        'For new tokens: Fill in token details (name, symbol, decimals, supply)',
        'Set token metadata (description, image, website)',
        'Review and confirm transaction',
        'Your token will be created and ready for use'
      ],
      requirements: ['Solana wallet with SOL for transaction fees', 'Token metadata preparation'],
      tips: [
        'Use testnet first to practice token creation',
        'Prepare high-quality token logo (recommended: 512x512px)',
        'Consider token economics before setting supply'
      ],
      relatedServices: ['Balance Checker', 'Multisender', 'Liquidity Manager', 'Burn Tokens']
    },
    {
      service: 'Volume Bot',
      category: 'Bot Extensions',
      description: 'Automated trading bot to generate volume and market activity for your token',
      steps: [
        'Go to "Bot Extensions" → "Volume Bot"',
        'Enter your token contract address',
        'Set trading parameters (volume target, price range)',
        'Choose trading pattern (Organic, Aggressive, Whale Simulation, Flash Trading)',
        'Configure wallet settings and SOL amounts',
        'Set duration and frequency',
        'Start the bot and monitor progress'
      ],
      requirements: ['Token contract address', 'SOL for trading', 'Multiple wallets for realistic trading'],
      tips: [
        'Start with lower volumes to test',
        'Use organic patterns for natural-looking volume',
        'Monitor for 24-48 hours for best results'
      ],
      relatedServices: ['Holder Generator', 'Wallet Generator', 'SOL Distribution']
    },
    {
      service: 'Legal Document Generator',
      category: 'Legal & Compliance',
      description: 'Generate professional legal documents for token launches and compliance',
      steps: [
        'Navigate to "Legal & Compliance" → "Legal Document Generator"',
        'Fill in company information (name, address, jurisdiction)',
        'Enter token details (name, symbol, purpose, utilities)',
        'Select document type or choose "Full Package"',
        'Configure compliance options (KYC, AML, GDPR, CCPA)',
        'Add target jurisdictions and custom clauses',
        'Review configuration and start generation',
        'Download generated documents in JSON format'
      ],
      requirements: ['Company legal information', 'Token specifications', 'Target market analysis'],
      tips: [
        'Consult with legal professionals for complex projects',
        'Review all generated documents carefully',
        'Update documents as regulations change'
      ],
      relatedServices: ['Compliance Checker', 'Whitepaper Generator']
    },
    {
      service: 'Raydium Integration',
      category: 'DEX Integration',
      description: 'Create liquidity pools and manage trading on Raydium DEX',
      steps: [
        'Go to "DEX Integration" → "Raydium AMM/CLMM/CPMM"',
        'Connect wallet with your tokens and SOL',
        'Choose pool type (AMM for standard, CLMM for concentrated)',
        'Set initial price and liquidity amounts',
        'Configure fee tier and price range (for CLMM)',
        'Review pool parameters',
        'Create pool and provide initial liquidity'
      ],
      requirements: ['Token and SOL for liquidity', 'Understanding of impermanent loss', 'Price strategy'],
      tips: [
        'Start with smaller liquidity to test',
        'Monitor pool performance regularly',
        'Consider concentrated liquidity for better capital efficiency'
      ],
      relatedServices: ['Jupiter DEX', 'Orca', 'Liquidity Manager']
    },
    {
      service: 'AI Content Generator',
      category: 'AI Tools',
      description: 'Generate marketing content, social posts, and promotional materials using AI',
      steps: [
        'Navigate to "AI Tools" → "Content Generator"',
        'Choose content type (social posts, articles, announcements)',
        'Provide token/project context and key details',
        'Select tone and style preferences',
        'Specify target audience and platform',
        'Generate content and review suggestions',
        'Edit and customize generated content',
        'Export for use across marketing channels'
      ],
      requirements: ['Project information', 'Marketing objectives', 'Brand guidelines'],
      tips: [
        'Provide detailed project context for better results',
        'Always review and edit AI-generated content',
        'Test different tones for various audiences'
      ],
      relatedServices: ['Branding Design', 'Social Automation', 'Whitepaper Generator']
    }
    // Add more service guides here...
  ]

  public static getInstance(): AIAssistantService {
    if (!AIAssistantService.instance) {
      AIAssistantService.instance = new AIAssistantService()
    }
    return AIAssistantService.instance
  }

  // Create new chat session
  createSession(): string {
    const sessionId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const session: ChatSession = {
      id: sessionId,
      messages: [{
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: `👋 Hello! I'm the SolX Engine AI Assistant. I'm here to help you navigate our comprehensive Solana token management platform.

I can help you with:
🔧 **Core Services**: Token creation, management, trading, and analytics
🤖 **Bot Tools**: Volume bots, holder generation, wallet management
⚖️ **Legal & Compliance**: Document generation, compliance checking
🎨 **AI-Powered Tools**: Content generation, branding, tokenomics
💹 **DEX Integration**: Raydium, Jupiter, Orca, Pump.fun
📊 **Analytics**: Portfolio tracking, arbitrage scanning

How can I help you today? You can ask me things like:
• "How do I create a new token?"
• "Guide me through setting up a volume bot"
• "What legal documents do I need for token launch?"
• "How to add liquidity on Raydium?"

Just ask, and I'll provide step-by-step guidance! 🚀`,
        timestamp: new Date().toISOString()
      }],
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    }

    this.sessions.set(sessionId, session)
    return sessionId
  }

  // Add message to session
  async addMessage(sessionId: string, content: string, role: 'user' | 'assistant'): Promise<ChatMessage> {
    const session = this.sessions.get(sessionId)
    if (!session) {
      throw new Error('Session not found')
    }

    const message: ChatMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      role,
      content,
      timestamp: new Date().toISOString()
    }

    session.messages.push(message)
    session.lastActivity = new Date().toISOString()
    this.sessions.set(sessionId, session)

    return message
  }

  // Process user message and generate AI response
  async processMessage(sessionId: string, userMessage: string): Promise<ChatMessage> {
    const session = this.sessions.get(sessionId)
    if (!session) {
      throw new Error('Session not found')
    }

    // Add user message
    await this.addMessage(sessionId, userMessage, 'user')

    // Generate AI response
    const response = this.generateResponse(userMessage.toLowerCase())
    const assistantMessage = await this.addMessage(sessionId, response, 'assistant')

    return assistantMessage
  }

  // Generate contextual response based on user input
  private generateResponse(input: string): string {
    // Token creation related
    if (input.includes('create token') || input.includes('new token') || input.includes('token creation')) {
      return this.getServiceGuide('Token Manager')
    }

    // Volume bot related
    if (input.includes('volume bot') || input.includes('trading bot') || input.includes('generate volume')) {
      return this.getServiceGuide('Volume Bot')
    }

    // Legal/compliance related
    if (input.includes('legal') || input.includes('compliance') || input.includes('terms') || input.includes('privacy')) {
      return this.getServiceGuide('Legal Document Generator')
    }

    // DEX/Liquidity related
    if (input.includes('raydium') || input.includes('liquidity') || input.includes('pool') || input.includes('dex')) {
      return this.getServiceGuide('Raydium Integration')
    }

    // AI tools related
    if (input.includes('content') || input.includes('marketing') || input.includes('ai tools') || input.includes('generate content')) {
      return this.getServiceGuide('AI Content Generator')
    }

    // General service listing
    if (input.includes('services') || input.includes('features') || input.includes('what can') || input.includes('help me')) {
      return this.getServicesOverview()
    }

    // Holder generation
    if (input.includes('holder') || input.includes('fake holders') || input.includes('holder bot')) {
      return `🚀 **Holder Generator Guide**

The Holder Generator creates realistic holder distributions for your token:

**Steps to Use:**
1. Go to "Bot Extensions" → "Holder Generator"
2. Enter your token contract address
3. Set the number of holders you want (10-1000)
4. Choose distribution pattern:
   - **Natural**: Realistic Pareto distribution
   - **Whale Heavy**: Few large holders
   - **Retail Heavy**: Many small holders
   - **Balanced**: Even distribution
5. Set holder size ranges (min/max token amounts)
6. Configure creation speed and delays
7. Start generation and monitor progress

**Requirements:**
- Token contract address
- SOL for transaction fees
- Realistic holder targets

**Pro Tips:**
- Start with smaller numbers to test
- Use natural distribution for authenticity
- Monitor gas costs for large holder counts

Need help with any specific part? 🤖`
    }

    // Wallet management
    if (input.includes('wallet') || input.includes('bulk wallet') || input.includes('generate wallet')) {
      return `💰 **Wallet Management Guide**

Our platform offers comprehensive wallet tools:

**Bulk Wallet Generator:**
1. Navigate to "Wallet Management" → "Bulk Wallet Generator"
2. Set number of wallets (up to 100,000)
3. Choose security level and entropy source
4. Generate wallets with public/private key pairs
5. Export in various formats (JSON, CSV, TXT)

**SOL Distribution:**
1. Go to "Wallet Management" → "SOL Distribution"
2. Upload wallet list or enter addresses manually
3. Set SOL amount per wallet
4. Choose distribution pattern
5. Configure batch settings
6. Execute distribution

**Token Distribution:**
1. Access "Wallet Management" → "Token Distribution"
2. Enter token mint address and source wallet
3. Upload target wallet list
4. Set token amounts and decimals
5. Choose distribution pattern
6. Start bulk token distribution

**Use Cases:**
- Airdrop campaigns
- Team wallet setup
- Testing environments
- Large-scale distributions

Which wallet tool interests you most? 🔧`
    }

    // Default helpful response
    return `🤔 I understand you're looking for help! Here are some popular topics I can assist with:

**🔧 Core Platform Services:**
• Token creation and management
• Balance checking and multisender tools
• Token burning and liquidity management

**🤖 Bot & Automation Tools:**
• Volume bot setup and configuration
• Holder generation strategies
• Bulk wallet creation and management

**⚖️ Legal & Compliance:**
• Legal document generation
• Compliance checking and analysis
• Terms of service and privacy policies

**🎨 AI-Powered Tools:**
• Content generation and marketing
• Branding and design assistance
• Tokenomics planning

**💹 DEX Integration:**
• Raydium pool creation
• Jupiter swapping
• Orca and Pump.fun integration

Just ask me about any specific service! For example:
- "How do I create a token?"
- "Set up volume bot"
- "Generate legal documents"
- "Add Raydium liquidity"

What would you like to learn about? 🚀`
  }

  // Get detailed service guide
  private getServiceGuide(serviceName: string): string {
    const guide = this.serviceGuides.find(g => g.service === serviceName)
    if (!guide) {
      return "Service guide not found. Please ask about our available services."
    }

    return `🎯 **${guide.service}** (${guide.category})

${guide.description}

**📋 Step-by-Step Guide:**
${guide.steps.map((step, index) => `${index + 1}. ${step}`).join('\n')}

**✅ Requirements:**
${guide.requirements.map(req => `• ${req}`).join('\n')}

**💡 Pro Tips:**
${guide.tips.map(tip => `• ${tip}`).join('\n')}

**🔗 Related Services:**
${guide.relatedServices.join(', ')}

Need more specific help with any step? Just ask! 🚀`
  }

  // Get services overview
  private getServicesOverview(): string {
    return `🌟 **SolX Engine - Complete Service Overview**

**🔧 CORE SERVICES**
• **Token Manager**: Create & manage SPL tokens
• **Balance Checker**: Check token balances across wallets
• **Multisender**: Bulk token/SOL distribution
• **Liquidity Manager**: Add/remove liquidity pools
• **Burn Tokens**: Permanently destroy tokens

**🤖 BOT & AUTOMATION**
• **Volume Bot**: Generate realistic trading volume
• **Holder Generator**: Create authentic holder base
• **Bulk Wallet Generator**: Mass wallet creation (up to 100k)
• **SOL Distribution**: Automated SOL funding
• **Token Distribution**: Bulk token transfers

**💹 DEX INTEGRATION**
• **Raydium**: AMM, CLMM, CPMM pools
• **Jupiter**: Best-rate token swapping
• **Orca**: Whirlpool concentrated liquidity
• **Pump.fun**: Memecoin launching platform

**🎨 AI-POWERED TOOLS**
• **Content Generator**: Marketing content creation
• **Branding Design**: Logo and visual design
• **Tokenomics**: Token economics planning
• **Whitepaper**: Professional documentation
• **Website Builder**: Landing page creation

**⚖️ LEGAL & COMPLIANCE**
• **Legal Doc Generator**: Terms, privacy, compliance docs
• **Compliance Checker**: Regulatory analysis
• **Risk Assessment**: Multi-jurisdiction compliance

**📊 ANALYTICS & INSIGHTS**
• **Portfolio Tracker**: Real-time portfolio monitoring
• **Arbitrage Scanner**: Cross-DEX opportunity detection
• **Market Analysis**: Price and volume analytics

**All services include:**
✅ Testnet support for safe testing
✅ Real-time monitoring and controls
✅ Professional-grade security
✅ Comprehensive documentation

Which service category interests you most? 🚀`
  }

  // Get session messages
  getSession(sessionId: string): ChatSession | null {
    return this.sessions.get(sessionId) || null
  }

  // Get all sessions
  getAllSessions(): ChatSession[] {
    return Array.from(this.sessions.values())
  }

  // Delete session
  deleteSession(sessionId: string): boolean {
    return this.sessions.delete(sessionId)
  }

  // Cleanup old sessions
  cleanup(): { cleaned: number; total: number } {
    const now = Date.now()
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours
    let cleaned = 0
    const total = this.sessions.size

    for (const [sessionId, session] of this.sessions.entries()) {
      const sessionAge = now - new Date(session.lastActivity).getTime()
      if (sessionAge > maxAge) {
        this.sessions.delete(sessionId)
        cleaned++
      }
    }

    return { cleaned, total }
  }
}

export const aiAssistantService = AIAssistantService.getInstance()
