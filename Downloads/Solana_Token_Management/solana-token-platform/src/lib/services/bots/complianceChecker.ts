import { testnetService } from '../testnet'

export interface ComplianceCheckConfig {
  // Project Information
  projectName: string
  tokenSymbol: string
  tokenType: 'utility' | 'security' | 'governance' | 'stablecoin' | 'meme' | 'defi'
  
  // Regulatory Information
  targetMarkets: string[]
  fundingMethod: 'ico' | 'ido' | 'private' | 'airdrop' | 'fair-launch' | 'stealth-launch'
  hasUtility: boolean
  isInvestmentContract: boolean
  hasGovernanceRights: boolean
  promisesReturns: boolean
  
  // Technical Compliance
  hasKYC: boolean
  hasAML: boolean
  hasWhitelist: boolean
  hasVesting: boolean
  hasLockup: boolean
  
  // Documentation
  hasWhitepaper: boolean
  hasTerms: boolean
  hasPrivacyPolicy: boolean
  hasRiskDisclosure: boolean
  
  // Team & Corporate
  teamDoxxed: boolean
  hasLegalEntity: boolean
  auditCompleted: boolean
  insuranceCoverage: boolean
}

export interface ComplianceResult {
  overallScore: number
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  complianceGrade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'F'
  recommendations: ComplianceRecommendation[]
  requirements: ComplianceRequirement[]
  warnings: ComplianceWarning[]
  jurisdictionAnalysis: JurisdictionAnalysis[]
}

export interface ComplianceRecommendation {
  category: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  title: string
  description: string
  actionItems: string[]
  estimatedCost: string
  timeline: string
}

export interface ComplianceRequirement {
  jurisdiction: string
  requirement: string
  status: 'compliant' | 'partial' | 'non-compliant' | 'not-applicable'
  description: string
  deadline?: string
}

export interface ComplianceWarning {
  type: 'legal' | 'regulatory' | 'technical' | 'documentation'
  severity: 'high' | 'medium' | 'low'
  message: string
  solution: string
}

export interface JurisdictionAnalysis {
  jurisdiction: string
  regulatoryFramework: string
  tokenClassification: string
  requiredCompliance: string[]
  prohibitions: string[]
  recommendations: string[]
  riskLevel: 'low' | 'medium' | 'high' | 'prohibited'
}

export interface ComplianceSession {
  id: string
  config: ComplianceCheckConfig
  result?: ComplianceResult
  status: 'pending' | 'analyzing' | 'completed' | 'error'
  startTime: string
  endTime?: string
  errors: string[]
}

class ComplianceCheckerService {
  private static instance: ComplianceCheckerService
  private sessions: Map<string, ComplianceSession> = new Map()

  public static getInstance(): ComplianceCheckerService {
    if (!ComplianceCheckerService.instance) {
      ComplianceCheckerService.instance = new ComplianceCheckerService()
    }
    return ComplianceCheckerService.instance
  }

  // Start compliance analysis
  async startAnalysis(config: ComplianceCheckConfig): Promise<{ success: boolean; sessionId?: string; message?: string }> {
    try {
      const sessionId = `compliance_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      const session: ComplianceSession = {
        id: sessionId,
        config,
        status: 'analyzing',
        startTime: new Date().toISOString(),
        errors: []
      }

      this.sessions.set(sessionId, session)

      // Start analysis process
      this.processComplianceAnalysis(sessionId)

      return {
        success: true,
        sessionId,
        message: 'Compliance analysis started'
      }
    } catch (error) {
      return {
        success: false,
        message: `Failed to start analysis: ${error instanceof Error ? error.message : 'Unknown error'}`
      }
    }
  }

  // Process compliance analysis
  private async processComplianceAnalysis(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId)
    if (!session) return

    try {
      // Simulate analysis delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      const result = this.analyzeCompliance(session.config)
      
      session.result = result
      session.status = 'completed'
      session.endTime = new Date().toISOString()
      this.sessions.set(sessionId, session)

    } catch (error) {
      session.status = 'error'
      session.errors.push(error instanceof Error ? error.message : 'Unknown error')
      this.sessions.set(sessionId, session)
    }
  }

  // Analyze compliance
  private analyzeCompliance(config: ComplianceCheckConfig): ComplianceResult {
    let score = 0
    const recommendations: ComplianceRecommendation[] = []
    const requirements: ComplianceRequirement[] = []
    const warnings: ComplianceWarning[] = []
    const jurisdictionAnalysis: JurisdictionAnalysis[] = []

    // Token Type Analysis
    if (config.tokenType === 'security') {
      score -= 20
      warnings.push({
        type: 'regulatory',
        severity: 'high',
        message: 'Security tokens require extensive compliance across most jurisdictions',
        solution: 'Consider reclassifying as utility token or implement full securities compliance'
      })
    } else if (config.tokenType === 'utility') {
      score += 15
    }

    // Investment Contract Analysis (Howey Test)
    const howeyFactors = {
      investmentOfMoney: config.fundingMethod !== 'airdrop' && config.fundingMethod !== 'fair-launch',
      commonEnterprise: true, // Usually true for token projects
      expectationOfProfits: config.promisesReturns,
      effortsOfOthers: !config.hasGovernanceRights || !config.teamDoxxed
    }

    const howeyScore = Object.values(howeyFactors).filter(Boolean).length
    if (howeyScore >= 3) {
      score -= 25
      warnings.push({
        type: 'legal',
        severity: 'high',
        message: 'Project may be classified as a security under Howey Test',
        solution: 'Implement securities compliance or restructure token economics'
      })
    }

    // KYC/AML Compliance
    if (config.hasKYC && config.hasAML) {
      score += 20
    } else {
      score -= 10
      recommendations.push({
        category: 'Regulatory Compliance',
        priority: 'high',
        title: 'Implement KYC/AML Procedures',
        description: 'Know Your Customer and Anti-Money Laundering procedures are required in most jurisdictions',
        actionItems: [
          'Partner with KYC/AML service provider',
          'Implement user verification system',
          'Create suspicious activity monitoring',
          'Establish reporting procedures'
        ],
        estimatedCost: '$5,000 - $15,000 setup + ongoing fees',
        timeline: '2-4 weeks'
      })
    }

    // Documentation Requirements
    const docScore = [
      config.hasWhitepaper,
      config.hasTerms,
      config.hasPrivacyPolicy,
      config.hasRiskDisclosure
    ].filter(Boolean).length

    score += docScore * 5
    
    if (!config.hasRiskDisclosure) {
      warnings.push({
        type: 'documentation',
        severity: 'high',
        message: 'Risk disclosure is legally required in most jurisdictions',
        solution: 'Create comprehensive risk disclosure document'
      })
    }

    // Team and Corporate Structure
    if (config.teamDoxxed && config.hasLegalEntity) {
      score += 15
    } else if (!config.teamDoxxed) {
      score -= 10
      warnings.push({
        type: 'legal',
        severity: 'medium',
        message: 'Anonymous teams face increased regulatory scrutiny',
        solution: 'Consider partial or full team disclosure'
      })
    }

    // Audit and Insurance
    if (config.auditCompleted) {
      score += 10
    } else {
      recommendations.push({
        category: 'Technical Security',
        priority: 'high',
        title: 'Complete Smart Contract Audit',
        description: 'Professional security audit builds trust and identifies vulnerabilities',
        actionItems: [
          'Select reputable audit firm',
          'Schedule comprehensive audit',
          'Address identified issues',
          'Publish audit results'
        ],
        estimatedCost: '$15,000 - $50,000',
        timeline: '2-6 weeks'
      })
    }

    if (config.insuranceCoverage) {
      score += 5
    }

    // Jurisdiction-specific analysis
    for (const jurisdiction of config.targetMarkets) {
      jurisdictionAnalysis.push(this.analyzeJurisdiction(jurisdiction, config))
    }

    // Calculate final metrics
    const maxScore = 100
    const normalizedScore = Math.max(0, Math.min(maxScore, score + 50)) // Normalize to 0-100

    const riskLevel = this.calculateRiskLevel(normalizedScore, warnings)
    const complianceGrade = this.calculateGrade(normalizedScore)

    return {
      overallScore: normalizedScore,
      riskLevel,
      complianceGrade,
      recommendations,
      requirements,
      warnings,
      jurisdictionAnalysis
    }
  }

  // Analyze specific jurisdiction
  private analyzeJurisdiction(jurisdiction: string, config: ComplianceCheckConfig): JurisdictionAnalysis {
    const baseAnalysis = {
      jurisdiction,
      regulatoryFramework: '',
      tokenClassification: '',
      requiredCompliance: [] as string[],
      prohibitions: [] as string[],
      recommendations: [] as string[],
      riskLevel: 'medium' as const
    }

    switch (jurisdiction.toLowerCase()) {
      case 'us':
      case 'united states':
        return {
          ...baseAnalysis,
          regulatoryFramework: 'SEC, CFTC, FinCEN oversight',
          tokenClassification: config.isInvestmentContract ? 'Likely Security' : 'Potentially Utility',
          requiredCompliance: ['Securities Registration or Exemption', 'AML/BSA', 'State Money Transmitter Licenses'],
          prohibitions: ['Unregistered securities offerings', 'Market manipulation'],
          recommendations: ['Legal opinion on token classification', 'Implement accredited investor verification'],
          riskLevel: config.isInvestmentContract ? 'high' : 'medium'
        }

      case 'eu':
      case 'european union':
        return {
          ...baseAnalysis,
          regulatoryFramework: 'MiCA Regulation (2024+)',
          tokenClassification: 'Crypto-asset under MiCA',
          requiredCompliance: ['MiCA Authorization', 'GDPR', 'AML5 Directive'],
          prohibitions: ['Unauthorized crypto-asset services', 'Privacy violations'],
          recommendations: ['MiCA compliance assessment', 'Data protection impact assessment'],
          riskLevel: 'medium'
        }

      case 'uk':
      case 'united kingdom':
        return {
          ...baseAnalysis,
          regulatoryFramework: 'FCA oversight',
          tokenClassification: config.isInvestmentContract ? 'Security Token' : 'Exchange Token',
          requiredCompliance: ['FCA Authorization', 'AML Regulations', 'Financial Promotions Order'],
          prohibitions: ['Unauthorized financial services', 'Misleading promotions'],
          recommendations: ['FCA perimeter guidance review', 'Financial promotion compliance'],
          riskLevel: 'medium'
        }

      case 'singapore':
        return {
          ...baseAnalysis,
          regulatoryFramework: 'MAS Payment Services Act',
          tokenClassification: config.isInvestmentContract ? 'Capital Markets Product' : 'Digital Payment Token',
          requiredCompliance: ['MAS License', 'AML/CFT', 'Technology Risk Management'],
          prohibitions: ['Unlicensed payment services', 'Securities offerings without prospectus'],
          recommendations: ['Token classification assessment', 'MAS consultation'],
          riskLevel: 'low'
        }

      default:
        return {
          ...baseAnalysis,
          regulatoryFramework: 'Jurisdiction-specific regulations apply',
          tokenClassification: 'Subject to local classification',
          requiredCompliance: ['Local registration requirements', 'AML compliance'],
          prohibitions: ['Varies by jurisdiction'],
          recommendations: ['Seek local legal counsel', 'Monitor regulatory developments'],
          riskLevel: 'medium'
        }
    }
  }

  // Calculate risk level
  private calculateRiskLevel(score: number, warnings: ComplianceWarning[]): 'low' | 'medium' | 'high' | 'critical' {
    const highSeverityWarnings = warnings.filter(w => w.severity === 'high').length
    
    if (score < 30 || highSeverityWarnings >= 3) return 'critical'
    if (score < 50 || highSeverityWarnings >= 2) return 'high'
    if (score < 70 || highSeverityWarnings >= 1) return 'medium'
    return 'low'
  }

  // Calculate compliance grade
  private calculateGrade(score: number): 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'F' {
    if (score >= 95) return 'A+'
    if (score >= 90) return 'A'
    if (score >= 85) return 'B+'
    if (score >= 80) return 'B'
    if (score >= 70) return 'C+'
    if (score >= 60) return 'C'
    if (score >= 50) return 'D'
    return 'F'
  }

  // Get session
  getSession(sessionId: string): ComplianceSession | null {
    return this.sessions.get(sessionId) || null
  }

  // Get all sessions
  getAllSessions(): ComplianceSession[] {
    return Array.from(this.sessions.values())
  }

  // Delete session
  deleteSession(sessionId: string): boolean {
    return this.sessions.delete(sessionId)
  }

  // Export compliance report
  exportReport(sessionId: string): { success: boolean; data?: string; message?: string } {
    const session = this.sessions.get(sessionId)
    if (!session) {
      return { success: false, message: 'Session not found' }
    }

    if (session.status !== 'completed' || !session.result) {
      return { success: false, message: 'Analysis not completed' }
    }

    try {
      const report = {
        projectName: session.config.projectName,
        tokenSymbol: session.config.tokenSymbol,
        analysisDate: session.endTime,
        overallScore: session.result.overallScore,
        complianceGrade: session.result.complianceGrade,
        riskLevel: session.result.riskLevel,
        summary: {
          totalRecommendations: session.result.recommendations.length,
          criticalWarnings: session.result.warnings.filter(w => w.severity === 'high').length,
          jurisdictionsAnalyzed: session.result.jurisdictionAnalysis.length
        },
        recommendations: session.result.recommendations,
        warnings: session.result.warnings,
        jurisdictionAnalysis: session.result.jurisdictionAnalysis,
        requirements: session.result.requirements
      }

      return {
        success: true,
        data: JSON.stringify(report, null, 2),
        message: 'Report exported successfully'
      }
    } catch (error) {
      return {
        success: false,
        message: `Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      }
    }
  }

  // Cleanup old sessions
  cleanup(): { cleaned: number; total: number } {
    const now = Date.now()
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours
    let cleaned = 0
    const total = this.sessions.size

    for (const [sessionId, session] of this.sessions.entries()) {
      const sessionAge = now - new Date(session.startTime).getTime()
      if (sessionAge > maxAge && session.status !== 'analyzing') {
        this.sessions.delete(sessionId)
        cleaned++
      }
    }

    return { cleaned, total }
  }
}

export const complianceCheckerService = ComplianceCheckerService.getInstance()
