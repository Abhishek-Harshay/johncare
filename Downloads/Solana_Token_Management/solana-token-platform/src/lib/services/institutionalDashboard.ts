export interface InstitutionalClient {
  id: string
  name: string
  type: 'hedge_fund' | 'family_office' | 'crypto_fund' | 'trading_firm' | 'bank' | 'exchange'
  aum: number // Assets under management
  region: 'north_america' | 'europe' | 'asia' | 'latam' | 'global'
  tier: 'enterprise' | 'premium' | 'standard'
  status: 'active' | 'pending' | 'inactive'
  joinDate: number
  lastActivity: number
  contactPerson: {
    name: string
    email: string
    phone: string
    position: string
  }
  compliance: {
    kyc: boolean
    aml: boolean
    accredited: boolean
    jurisdiction: string[]
  }
  limits: {
    daily: number
    monthly: number
    perTrade: number
  }
  fees: {
    tradingFee: number // percentage
    managementFee: number // annual percentage
    performanceFee: number // percentage
  }
}

export interface PortfolioMetrics {
  clientId: string
  totalValue: number
  pnl24h: number
  pnl7d: number
  pnl30d: number
  pnlYtd: number
  sharpeRatio: number
  maxDrawdown: number
  volatility: number
  alpha: number
  beta: number
  positions: Position[]
  allocation: AssetAllocation[]
}

export interface Position {
  token: string
  symbol: string
  amount: number
  value: number
  avgEntry: number
  currentPrice: number
  pnl: number
  pnlPercentage: number
  weight: number
  lastUpdated: number
}

export interface AssetAllocation {
  category: 'defi' | 'gaming' | 'nft' | 'infrastructure' | 'meme' | 'stablecoin'
  value: number
  percentage: number
  count: number
}

export interface TradingActivity {
  clientId: string
  period: 'day' | 'week' | 'month'
  totalVolume: number
  tradeCount: number
  avgTradeSize: number
  winRate: number
  profitFactor: number
  fees: number
  activeTokens: number
  topPerformer: string
  worstPerformer: string
}

export interface RiskMetrics {
  clientId: string
  riskScore: number // 0-100
  concentration: number // % in top 3 positions
  leverage: number
  liquidityRisk: number
  counterpartyRisk: number
  varDaily: number // Value at Risk
  stressTest: {
    scenario: string
    impact: number
  }[]
  riskLimits: {
    used: number
    available: number
    percentage: number
  }
}

export interface ComplianceReport {
  clientId: string
  reportType: 'daily' | 'weekly' | 'monthly' | 'quarterly'
  period: {
    start: number
    end: number
  }
  trades: {
    total: number
    flagged: number
    reviewed: number
    cleared: number
  }
  violations: {
    type: string
    severity: 'low' | 'medium' | 'high'
    description: string
    status: 'open' | 'resolved'
    date: number
  }[]
  riskBreaches: number
  status: 'compliant' | 'review_required' | 'violation'
}

export interface MarketIntelligence {
  date: number
  overview: {
    totalMarketCap: number
    change24h: number
    dominance: { [token: string]: number }
    fearGreedIndex: number
  }
  sectors: {
    name: string
    performance: number
    volume: number
    leaders: string[]
    laggards: string[]
  }[]
  opportunities: {
    type: 'arbitrage' | 'momentum' | 'mean_reversion' | 'event_driven'
    token: string
    description: string
    potential: number
    confidence: number
    timeframe: string
  }[]
  risks: {
    type: 'regulatory' | 'technical' | 'market' | 'liquidity'
    severity: 'low' | 'medium' | 'high'
    impact: string
    timeline: string
  }[]
}

class InstitutionalDashboard {
  private static instance: InstitutionalDashboard
  private clients: Map<string, InstitutionalClient> = new Map()
  private portfolios: Map<string, PortfolioMetrics> = new Map()
  private activities: Map<string, TradingActivity[]> = new Map()
  private riskMetrics: Map<string, RiskMetrics> = new Map()
  
  constructor() {
    this.initializeMockData()
  }

  public static getInstance(): InstitutionalDashboard {
    if (!InstitutionalDashboard.instance) {
      InstitutionalDashboard.instance = new InstitutionalDashboard()
    }
    return InstitutionalDashboard.instance
  }

  // Get all institutional clients
  getClients(filters?: {
    type?: string
    tier?: string
    status?: string
    region?: string
  }): InstitutionalClient[] {
    let clients = Array.from(this.clients.values())
    
    if (filters) {
      if (filters.type) clients = clients.filter(c => c.type === filters.type)
      if (filters.tier) clients = clients.filter(c => c.tier === filters.tier)
      if (filters.status) clients = clients.filter(c => c.status === filters.status)
      if (filters.region) clients = clients.filter(c => c.region === filters.region)
    }
    
    return clients.sort((a, b) => b.aum - a.aum)
  }

  // Get client portfolio metrics
  getPortfolioMetrics(clientId: string): PortfolioMetrics | null {
    return this.portfolios.get(clientId) || null
  }

  // Get aggregated platform metrics
  getPlatformMetrics(): {
    totalAUM: number
    totalClients: number
    totalVolume24h: number
    avgPerformance: number
    topPerformers: string[]
    revenue: {
      trading: number
      management: number
      performance: number
      total: number
    }
  } {
    const clients = Array.from(this.clients.values())
    const portfolios = Array.from(this.portfolios.values())
    
    const totalAUM = clients.reduce((sum, c) => sum + c.aum, 0)
    const totalVolume24h = portfolios.reduce((sum, p) => 
      sum + p.positions.reduce((pSum, pos) => pSum + pos.value, 0), 0
    )
    
    const avgPerformance = portfolios.reduce((sum, p) => sum + p.pnl30d, 0) / portfolios.length
    
    const topPerformers = portfolios
      .sort((a, b) => b.pnl30d - a.pnl30d)
      .slice(0, 5)
      .map(p => clients.find(c => c.id === p.clientId)?.name || 'Unknown')

    // Calculate revenue
    const tradingRevenue = totalVolume24h * 0.001 // 0.1% avg fee
    const managementRevenue = totalAUM * 0.02 / 365 // 2% annual fee, daily
    const performanceRevenue = portfolios.reduce((sum, p) => 
      sum + Math.max(0, p.pnlYtd) * 0.2, 0 // 20% performance fee
    )

    return {
      totalAUM,
      totalClients: clients.length,
      totalVolume24h,
      avgPerformance,
      topPerformers,
      revenue: {
        trading: tradingRevenue,
        management: managementRevenue,
        performance: performanceRevenue,
        total: tradingRevenue + managementRevenue + performanceRevenue
      }
    }
  }

  // Get trading activity for client
  getTradingActivity(clientId: string, period: 'day' | 'week' | 'month' = 'month'): TradingActivity | null {
    const activities = this.activities.get(clientId) || []
    return activities.find(a => a.period === period) || null
  }

  // Get risk metrics for client
  getRiskMetrics(clientId: string): RiskMetrics | null {
    return this.riskMetrics.get(clientId) || null
  }

  // Generate compliance report
  generateComplianceReport(
    clientId: string,
    reportType: 'daily' | 'weekly' | 'monthly' | 'quarterly'
  ): ComplianceReport {
    const client = this.clients.get(clientId)
    if (!client) {
      throw new Error('Client not found')
    }

    const now = Date.now()
    const periodDays = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      quarterly: 90
    }[reportType]

    const startDate = now - (periodDays * 24 * 60 * 60 * 1000)
    
    // Mock compliance data
    const totalTrades = Math.floor(Math.random() * 1000) + 100
    const flaggedTrades = Math.floor(totalTrades * 0.05) // 5% flagged
    const violations = []
    
    if (Math.random() > 0.7) {
      violations.push({
        type: 'Position Limit Breach',
        severity: 'medium' as const,
        description: 'Single position exceeded 10% portfolio limit',
        status: 'resolved' as const,
        date: now - 24 * 60 * 60 * 1000
      })
    }

    return {
      clientId,
      reportType,
      period: {
        start: startDate,
        end: now
      },
      trades: {
        total: totalTrades,
        flagged: flaggedTrades,
        reviewed: flaggedTrades,
        cleared: Math.floor(flaggedTrades * 0.95)
      },
      violations,
      riskBreaches: violations.length,
      status: violations.length === 0 ? 'compliant' : 'review_required'
    }
  }

  // Get market intelligence
  getMarketIntelligence(): MarketIntelligence {
    return {
      date: Date.now(),
      overview: {
        totalMarketCap: 2500000000000, // $2.5T
        change24h: 2.3,
        dominance: {
          BTC: 45.2,
          ETH: 18.7,
          SOL: 3.1
        },
        fearGreedIndex: 72 // Greed
      },
      sectors: [
        {
          name: 'DeFi',
          performance: 5.2,
          volume: 12000000000,
          leaders: ['UNI', 'AAVE', 'COMP'],
          laggards: ['YFI', 'CRV']
        },
        {
          name: 'Layer 1',
          performance: 3.8,
          volume: 8000000000,
          leaders: ['SOL', 'AVAX', 'NEAR'],
          laggards: ['ADA', 'DOT']
        },
        {
          name: 'Gaming',
          performance: -2.1,
          volume: 2000000000,
          leaders: ['IMX', 'GALA'],
          laggards: ['AXS', 'SAND']
        }
      ],
      opportunities: [
        {
          type: 'arbitrage',
          token: 'SOL',
          description: 'Price discrepancy between Binance and FTX',
          potential: 1.2,
          confidence: 85,
          timeframe: '2-4 hours'
        },
        {
          type: 'momentum',
          token: 'RAY',
          description: 'Breaking resistance with high volume',
          potential: 8.5,
          confidence: 72,
          timeframe: '1-3 days'
        }
      ],
      risks: [
        {
          type: 'regulatory',
          severity: 'medium',
          impact: 'SEC clarification on DeFi regulations expected',
          timeline: '2-4 weeks'
        },
        {
          type: 'technical',
          severity: 'low',
          impact: 'Ethereum merge technical risks',
          timeline: 'Ongoing'
        }
      ]
    }
  }

  // Create new institutional client
  createClient(clientData: Omit<InstitutionalClient, 'id' | 'joinDate'>): InstitutionalClient {
    const client: InstitutionalClient = {
      ...clientData,
      id: `inst_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      joinDate: Date.now()
    }
    
    this.clients.set(client.id, client)
    this.initializeClientData(client.id)
    
    return client
  }

  // Update client information
  updateClient(clientId: string, updates: Partial<InstitutionalClient>): boolean {
    const client = this.clients.get(clientId)
    if (!client) return false
    
    const updatedClient = { ...client, ...updates }
    this.clients.set(clientId, updatedClient)
    
    return true
  }

  // Get client performance comparison
  getPerformanceComparison(clientIds: string[]): {
    clientId: string
    name: string
    performance: {
      ytd: number
      month: number
      week: number
      sharpe: number
    }
  }[] {
    return clientIds.map(id => {
      const client = this.clients.get(id)
      const portfolio = this.portfolios.get(id)
      
      return {
        clientId: id,
        name: client?.name || 'Unknown',
        performance: {
          ytd: portfolio?.pnlYtd || 0,
          month: portfolio?.pnl30d || 0,
          week: portfolio?.pnl7d || 0,
          sharpe: portfolio?.sharpeRatio || 0
        }
      }
    })
  }

  // Initialize client data
  private initializeClientData(clientId: string): void {
    // Initialize portfolio
    const mockPositions: Position[] = [
      {
        token: 'SOL',
        symbol: 'SOL',
        amount: 1000,
        value: 180000,
        avgEntry: 175,
        currentPrice: 180,
        pnl: 5000,
        pnlPercentage: 2.86,
        weight: 45,
        lastUpdated: Date.now()
      },
      {
        token: 'USDC',
        symbol: 'USDC',
        amount: 100000,
        value: 100000,
        avgEntry: 1,
        currentPrice: 1,
        pnl: 0,
        pnlPercentage: 0,
        weight: 25,
        lastUpdated: Date.now()
      }
    ]

    const portfolio: PortfolioMetrics = {
      clientId,
      totalValue: 400000,
      pnl24h: 8500,
      pnl7d: 15200,
      pnl30d: 32000,
      pnlYtd: 85000,
      sharpeRatio: 1.85,
      maxDrawdown: -0.12,
      volatility: 0.25,
      alpha: 0.08,
      beta: 0.85,
      positions: mockPositions,
      allocation: [
        { category: 'infrastructure', value: 180000, percentage: 45, count: 1 },
        { category: 'stablecoin', value: 100000, percentage: 25, count: 1 },
        { category: 'defi', value: 80000, percentage: 20, count: 3 },
        { category: 'gaming', value: 40000, percentage: 10, count: 2 }
      ]
    }

    // Initialize trading activity
    const activity: TradingActivity = {
      clientId,
      period: 'month',
      totalVolume: 2500000,
      tradeCount: 156,
      avgTradeSize: 16025,
      winRate: 68.5,
      profitFactor: 1.85,
      fees: 2500,
      activeTokens: 12,
      topPerformer: 'SOL',
      worstPerformer: 'SAND'
    }

    // Initialize risk metrics
    const risk: RiskMetrics = {
      clientId,
      riskScore: 65,
      concentration: 35, // % in top 3 positions
      leverage: 1.2,
      liquidityRisk: 15,
      counterpartyRisk: 8,
      varDaily: 12000, // $12k daily VaR
      stressTest: [
        { scenario: 'Market Crash (-30%)', impact: -120000 },
        { scenario: 'Sector Rotation', impact: -45000 },
        { scenario: 'Regulatory Shock', impact: -85000 }
      ],
      riskLimits: {
        used: 280000,
        available: 120000,
        percentage: 70
      }
    }

    this.portfolios.set(clientId, portfolio)
    this.activities.set(clientId, [activity])
    this.riskMetrics.set(clientId, risk)
  }

  // Initialize mock data
  private initializeMockData(): void {
    const mockClients: Omit<InstitutionalClient, 'id' | 'joinDate'>[] = [
      {
        name: 'Quantum Capital',
        type: 'hedge_fund',
        aum: 500000000,
        region: 'north_america',
        tier: 'enterprise',
        status: 'active',
        lastActivity: Date.now() - 60000,
        contactPerson: {
          name: 'Sarah Johnson',
          email: 'sarah@quantum.capital',
          phone: '+1-555-0123',
          position: 'CIO'
        },
        compliance: {
          kyc: true,
          aml: true,
          accredited: true,
          jurisdiction: ['US', 'UK']
        },
        limits: {
          daily: 10000000,
          monthly: 100000000,
          perTrade: 5000000
        },
        fees: {
          tradingFee: 0.05,
          managementFee: 2.0,
          performanceFee: 20.0
        }
      },
      {
        name: 'BlockTower Ventures',
        type: 'crypto_fund',
        aum: 250000000,
        region: 'europe',
        tier: 'premium',
        status: 'active',
        lastActivity: Date.now() - 300000,
        contactPerson: {
          name: 'Marcus Weber',
          email: 'marcus@blocktower.vc',
          phone: '+49-30-12345',
          position: 'Managing Partner'
        },
        compliance: {
          kyc: true,
          aml: true,
          accredited: true,
          jurisdiction: ['DE', 'CH']
        },
        limits: {
          daily: 5000000,
          monthly: 50000000,
          perTrade: 2500000
        },
        fees: {
          tradingFee: 0.08,
          managementFee: 2.5,
          performanceFee: 25.0
        }
      }
    ]

    mockClients.forEach(clientData => {
      this.createClient(clientData)
    })
  }
}

export const institutionalDashboard = InstitutionalDashboard.getInstance()
