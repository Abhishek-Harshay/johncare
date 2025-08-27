import { testnetService } from '../testnet'

export interface LegalDocConfig {
  // Company Information
  companyName: string
  companyAddress: string
  companyEmail: string
  companyWebsite: string
  jurisdiction: string
  incorporationDate?: string
  
  // Token Information
  tokenName: string
  tokenSymbol: string
  tokenPurpose: string
  tokenUtility: string[]
  maxSupply: number
  initialSupply: number
  
  // Legal Requirements
  docType: 'terms' | 'privacy' | 'whitepaper' | 'disclaimer' | 'compliance' | 'full-package'
  includeKYC: boolean
  includeAML: boolean
  targetJurisdictions: string[]
  riskLevel: 'low' | 'medium' | 'high'
  
  // Additional Options
  includeGDPR: boolean
  includeCCPA: boolean
  customClauses: string[]
  contactInfo: {
    legalContact: string
    complianceOfficer: string
    supportEmail: string
  }
}

export interface LegalDocSession {
  id: string
  config: LegalDocConfig
  status: 'idle' | 'generating' | 'completed' | 'error'
  startTime?: string
  endTime?: string
  documents: GeneratedDocument[]
  progress: number
  errors: string[]
}

export interface GeneratedDocument {
  type: string
  title: string
  content: string
  lastUpdated: string
  wordCount: number
  sections: DocumentSection[]
}

export interface DocumentSection {
  title: string
  content: string
  isRequired: boolean
  riskLevel: 'low' | 'medium' | 'high'
}

class LegalDocGeneratorService {
  private static instance: LegalDocGeneratorService
  private sessions: Map<string, LegalDocSession> = new Map()

  public static getInstance(): LegalDocGeneratorService {
    if (!LegalDocGeneratorService.instance) {
      LegalDocGeneratorService.instance = new LegalDocGeneratorService()
    }
    return LegalDocGeneratorService.instance
  }

  // Start document generation session
  async startGeneration(config: LegalDocConfig): Promise<{ success: boolean; sessionId?: string; message?: string }> {
    try {
      const sessionId = `legal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      const session: LegalDocSession = {
        id: sessionId,
        config,
        status: 'generating',
        startTime: new Date().toISOString(),
        documents: [],
        progress: 0,
        errors: []
      }

      this.sessions.set(sessionId, session)

      // Start generation process
      this.processDocumentGeneration(sessionId)

      return {
        success: true,
        sessionId,
        message: 'Legal document generation started'
      }
    } catch (error) {
      return {
        success: false,
        message: `Failed to start generation: ${error instanceof Error ? error.message : 'Unknown error'}`
      }
    }
  }

  // Process document generation
  private async processDocumentGeneration(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId)
    if (!session) return

    try {
      const documents: GeneratedDocument[] = []
      const totalSteps = this.getDocumentCount(session.config.docType)
      let currentStep = 0

      // Generate documents based on type
      if (session.config.docType === 'terms' || session.config.docType === 'full-package') {
        documents.push(await this.generateTermsOfService(session.config))
        currentStep++
        session.progress = Math.round((currentStep / totalSteps) * 100)
        this.sessions.set(sessionId, { ...session })
      }

      if (session.config.docType === 'privacy' || session.config.docType === 'full-package') {
        documents.push(await this.generatePrivacyPolicy(session.config))
        currentStep++
        session.progress = Math.round((currentStep / totalSteps) * 100)
        this.sessions.set(sessionId, { ...session })
      }

      if (session.config.docType === 'disclaimer' || session.config.docType === 'full-package') {
        documents.push(await this.generateLegalDisclaimer(session.config))
        currentStep++
        session.progress = Math.round((currentStep / totalSteps) * 100)
        this.sessions.set(sessionId, { ...session })
      }

      if (session.config.docType === 'compliance' || session.config.docType === 'full-package') {
        documents.push(await this.generateComplianceDoc(session.config))
        currentStep++
        session.progress = Math.round((currentStep / totalSteps) * 100)
        this.sessions.set(sessionId, { ...session })
      }

      if (session.config.docType === 'whitepaper' || session.config.docType === 'full-package') {
        documents.push(await this.generateWhitepaper(session.config))
        currentStep++
        session.progress = Math.round((currentStep / totalSteps) * 100)
        this.sessions.set(sessionId, { ...session })
      }

      // Complete session
      session.status = 'completed'
      session.endTime = new Date().toISOString()
      session.documents = documents
      session.progress = 100
      this.sessions.set(sessionId, session)

    } catch (error) {
      session.status = 'error'
      session.errors.push(error instanceof Error ? error.message : 'Unknown error')
      this.sessions.set(sessionId, session)
    }
  }

  // Generate Terms of Service
  private async generateTermsOfService(config: LegalDocConfig): Promise<GeneratedDocument> {
    const sections: DocumentSection[] = [
      {
        title: "1. Acceptance of Terms",
        content: `By accessing and using ${config.tokenName} (${config.tokenSymbol}) and related services provided by ${config.companyName}, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.`,
        isRequired: true,
        riskLevel: 'low'
      },
      {
        title: "2. Token Description",
        content: `${config.tokenName} (${config.tokenSymbol}) is a digital token built on the Solana blockchain. The token serves the following purposes: ${config.tokenPurpose}. Token utilities include: ${config.tokenUtility.join(', ')}.`,
        isRequired: true,
        riskLevel: 'medium'
      },
      {
        title: "3. Token Economics",
        content: `Total Maximum Supply: ${config.maxSupply.toLocaleString()} ${config.tokenSymbol}. Initial Supply: ${config.initialSupply.toLocaleString()} ${config.tokenSymbol}. Token distribution and economics are subject to the terms outlined in our whitepaper and technical documentation.`,
        isRequired: true,
        riskLevel: 'high'
      },
      {
        title: "4. Risk Warnings",
        content: `IMPORTANT: Cryptocurrency investments involve substantial risk. The value of ${config.tokenSymbol} may fluctuate significantly. You may lose all or part of your investment. Past performance does not guarantee future results. Regulatory changes may affect token value and utility.`,
        isRequired: true,
        riskLevel: 'high'
      },
      {
        title: "5. Compliance and Legal",
        content: `Users must comply with all applicable laws and regulations in their jurisdiction. ${config.companyName} reserves the right to restrict access to users from certain jurisdictions. This agreement is governed by the laws of ${config.jurisdiction}.`,
        isRequired: true,
        riskLevel: 'high'
      }
    ]

    if (config.includeKYC) {
      sections.push({
        title: "6. Know Your Customer (KYC)",
        content: `Users may be required to complete KYC verification before accessing certain services. We reserve the right to request additional documentation to verify identity and comply with regulatory requirements.`,
        isRequired: true,
        riskLevel: 'medium'
      })
    }

    if (config.includeAML) {
      sections.push({
        title: "7. Anti-Money Laundering (AML)",
        content: `We maintain strict AML policies and procedures. Suspicious transactions will be reported to relevant authorities. Users agree to cooperate with any AML investigations or compliance requests.`,
        isRequired: true,
        riskLevel: 'medium'
      })
    }

    const content = sections.map(section => `${section.title}\n\n${section.content}\n\n`).join('')

    return {
      type: 'terms',
      title: `Terms of Service - ${config.tokenName}`,
      content,
      lastUpdated: new Date().toISOString(),
      wordCount: content.split(' ').length,
      sections
    }
  }

  // Generate Privacy Policy
  private async generatePrivacyPolicy(config: LegalDocConfig): Promise<GeneratedDocument> {
    const sections: DocumentSection[] = [
      {
        title: "1. Information We Collect",
        content: `${config.companyName} collects information necessary to provide ${config.tokenName} services, including: wallet addresses, transaction data, IP addresses, device information, and communication records.`,
        isRequired: true,
        riskLevel: 'medium'
      },
      {
        title: "2. How We Use Information",
        content: `We use collected information to: provide and improve our services, ensure security and compliance, communicate with users, and fulfill legal obligations. We do not sell personal information to third parties.`,
        isRequired: true,
        riskLevel: 'low'
      },
      {
        title: "3. Data Security",
        content: `We implement industry-standard security measures to protect user data. However, no system is completely secure. Users are responsible for securing their own wallets and private keys.`,
        isRequired: true,
        riskLevel: 'high'
      },
      {
        title: "4. Data Retention",
        content: `We retain user data as long as necessary to provide services and comply with legal obligations. Users may request data deletion subject to legal and regulatory requirements.`,
        isRequired: true,
        riskLevel: 'medium'
      }
    ]

    if (config.includeGDPR) {
      sections.push({
        title: "5. GDPR Rights (EU Users)",
        content: `EU users have rights under GDPR including: access to personal data, data portability, rectification, erasure (right to be forgotten), and objection to processing. Contact our Data Protection Officer to exercise these rights.`,
        isRequired: true,
        riskLevel: 'medium'
      })
    }

    if (config.includeCCPA) {
      sections.push({
        title: "6. CCPA Rights (California Users)",
        content: `California residents have rights under CCPA including: right to know what personal information is collected, right to delete personal information, right to opt-out of sale, and right to non-discrimination.`,
        isRequired: true,
        riskLevel: 'medium'
      })
    }

    const content = sections.map(section => `${section.title}\n\n${section.content}\n\n`).join('')

    return {
      type: 'privacy',
      title: `Privacy Policy - ${config.tokenName}`,
      content,
      lastUpdated: new Date().toISOString(),
      wordCount: content.split(' ').length,
      sections
    }
  }

  // Generate Legal Disclaimer
  private async generateLegalDisclaimer(config: LegalDocConfig): Promise<GeneratedDocument> {
    const sections: DocumentSection[] = [
      {
        title: "Investment Risk Disclaimer",
        content: `${config.tokenName} (${config.tokenSymbol}) is a high-risk investment. Cryptocurrency markets are highly volatile and speculative. You should never invest more than you can afford to lose. Consult with financial advisors before making investment decisions.`,
        isRequired: true,
        riskLevel: 'high'
      },
      {
        title: "No Investment Advice",
        content: `Information provided by ${config.companyName} does not constitute investment, financial, trading, or other advice. We do not recommend any specific course of action. All decisions are solely your responsibility.`,
        isRequired: true,
        riskLevel: 'high'
      },
      {
        title: "Regulatory Uncertainty",
        content: `Cryptocurrency regulations are evolving and uncertain. Regulatory changes may negatively impact ${config.tokenSymbol} value, utility, or legality. Users are responsible for understanding applicable laws in their jurisdiction.`,
        isRequired: true,
        riskLevel: 'high'
      },
      {
        title: "Technology Risks",
        content: `Blockchain technology involves risks including: smart contract vulnerabilities, network congestion, hard forks, and technological obsolescence. ${config.companyName} cannot guarantee the technical stability of ${config.tokenSymbol}.`,
        isRequired: true,
        riskLevel: 'high'
      },
      {
        title: "No Guarantees",
        content: `${config.companyName} makes no warranties or guarantees regarding ${config.tokenSymbol} performance, utility, or value. Token features and roadmap are subject to change without notice.`,
        isRequired: true,
        riskLevel: 'high'
      }
    ]

    const content = sections.map(section => `${section.title}\n\n${section.content}\n\n`).join('')

    return {
      type: 'disclaimer',
      title: `Legal Disclaimer - ${config.tokenName}`,
      content,
      lastUpdated: new Date().toISOString(),
      wordCount: content.split(' ').length,
      sections
    }
  }

  // Generate Compliance Documentation
  private async generateComplianceDoc(config: LegalDocConfig): Promise<GeneratedDocument> {
    const sections: DocumentSection[] = [
      {
        title: "Regulatory Framework",
        content: `${config.companyName} operates under the regulatory framework of ${config.jurisdiction}. We monitor regulatory developments in target jurisdictions: ${config.targetJurisdictions.join(', ')}.`,
        isRequired: true,
        riskLevel: 'high'
      },
      {
        title: "Token Classification",
        content: `${config.tokenName} is classified as a utility token providing access to platform services. The token is not intended as a security, investment contract, or financial instrument under applicable securities laws.`,
        isRequired: true,
        riskLevel: 'high'
      },
      {
        title: "Compliance Procedures",
        content: `We maintain comprehensive compliance procedures including: regular legal reviews, transaction monitoring, suspicious activity reporting, and cooperation with regulatory authorities.`,
        isRequired: true,
        riskLevel: 'medium'
      }
    ]

    if (config.includeKYC) {
      sections.push({
        title: "KYC/AML Compliance",
        content: `Our KYC/AML program includes: customer identification procedures, ongoing monitoring, sanctions screening, and suspicious transaction reporting. We use third-party verification services to ensure compliance.`,
        isRequired: true,
        riskLevel: 'medium'
      })
    }

    const content = sections.map(section => `${section.title}\n\n${section.content}\n\n`).join('')

    return {
      type: 'compliance',
      title: `Compliance Documentation - ${config.tokenName}`,
      content,
      lastUpdated: new Date().toISOString(),
      wordCount: content.split(' ').length,
      sections
    }
  }

  // Generate Whitepaper
  private async generateWhitepaper(config: LegalDocConfig): Promise<GeneratedDocument> {
    const sections: DocumentSection[] = [
      {
        title: "Executive Summary",
        content: `${config.tokenName} (${config.tokenSymbol}) is a blockchain-based digital asset designed to ${config.tokenPurpose}. Built on the Solana network, the token provides utility through: ${config.tokenUtility.join(', ')}.`,
        isRequired: true,
        riskLevel: 'low'
      },
      {
        title: "Technology Overview",
        content: `${config.tokenName} leverages Solana's high-performance blockchain infrastructure, capable of processing thousands of transactions per second with minimal fees. The token follows SPL token standards ensuring compatibility with Solana ecosystem tools.`,
        isRequired: true,
        riskLevel: 'low'
      },
      {
        title: "Tokenomics",
        content: `Total Supply: ${config.maxSupply.toLocaleString()} ${config.tokenSymbol}\nInitial Supply: ${config.initialSupply.toLocaleString()} ${config.tokenSymbol}\n\nToken distribution is designed to ensure long-term sustainability and community growth while maintaining appropriate incentive structures.`,
        isRequired: true,
        riskLevel: 'medium'
      },
      {
        title: "Use Cases",
        content: `${config.tokenSymbol} serves multiple utility functions within our ecosystem: ${config.tokenUtility.map(utility => `• ${utility}`).join('\n')}`,
        isRequired: true,
        riskLevel: 'low'
      },
      {
        title: "Legal and Compliance",
        content: `${config.companyName} is committed to regulatory compliance across all operating jurisdictions. The token is designed as a utility asset and not as a security or investment instrument.`,
        isRequired: true,
        riskLevel: 'high'
      }
    ]

    const content = sections.map(section => `${section.title}\n\n${section.content}\n\n`).join('')

    return {
      type: 'whitepaper',
      title: `${config.tokenName} Whitepaper`,
      content,
      lastUpdated: new Date().toISOString(),
      wordCount: content.split(' ').length,
      sections
    }
  }

  // Get document count for progress tracking
  private getDocumentCount(docType: string): number {
    const counts = {
      'terms': 1,
      'privacy': 1,
      'disclaimer': 1,
      'compliance': 1,
      'whitepaper': 1,
      'full-package': 5
    }
    return counts[docType as keyof typeof counts] || 1
  }

  // Get session
  getSession(sessionId: string): LegalDocSession | null {
    return this.sessions.get(sessionId) || null
  }

  // Get all sessions
  getAllSessions(): LegalDocSession[] {
    return Array.from(this.sessions.values())
  }

  // Delete session
  deleteSession(sessionId: string): boolean {
    return this.sessions.delete(sessionId)
  }

  // Export documents as ZIP
  exportDocuments(sessionId: string): { success: boolean; data?: string; message?: string } {
    const session = this.sessions.get(sessionId)
    if (!session) {
      return { success: false, message: 'Session not found' }
    }

    if (session.status !== 'completed') {
      return { success: false, message: 'Session not completed' }
    }

    try {
      // Create exportable data structure
      const exportData = {
        sessionId,
        generatedAt: new Date().toISOString(),
        companyInfo: {
          name: session.config.companyName,
          address: session.config.companyAddress,
          website: session.config.companyWebsite
        },
        tokenInfo: {
          name: session.config.tokenName,
          symbol: session.config.tokenSymbol,
          purpose: session.config.tokenPurpose
        },
        documents: session.documents.map(doc => ({
          type: doc.type,
          title: doc.title,
          content: doc.content,
          wordCount: doc.wordCount,
          sections: doc.sections.length
        }))
      }

      return {
        success: true,
        data: JSON.stringify(exportData, null, 2),
        message: 'Documents exported successfully'
      }
    } catch (error) {
      return {
        success: false,
        message: `Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      }
    }
  }

  // Validate legal compliance
  validateCompliance(config: LegalDocConfig): { isValid: boolean; warnings: string[]; errors: string[] } {
    const warnings: string[] = []
    const errors: string[] = []

    // Check required fields
    if (!config.companyName) errors.push('Company name is required')
    if (!config.tokenName) errors.push('Token name is required')
    if (!config.tokenSymbol) errors.push('Token symbol is required')
    if (!config.jurisdiction) errors.push('Jurisdiction is required')

    // Check token economics
    if (config.maxSupply <= 0) errors.push('Max supply must be greater than 0')
    if (config.initialSupply > config.maxSupply) errors.push('Initial supply cannot exceed max supply')

    // Risk level warnings
    if (config.riskLevel === 'high' && !config.includeKYC) {
      warnings.push('High-risk tokens should consider KYC requirements')
    }

    if (config.targetJurisdictions.includes('US') && !config.includeCCPA) {
      warnings.push('US operations should consider CCPA compliance')
    }

    if (config.targetJurisdictions.some(j => ['EU', 'UK', 'Germany', 'France'].includes(j)) && !config.includeGDPR) {
      warnings.push('EU operations should consider GDPR compliance')
    }

    return {
      isValid: errors.length === 0,
      warnings,
      errors
    }
  }

  // Cleanup old sessions
  cleanup(): { cleaned: number; total: number } {
    const now = Date.now()
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours
    let cleaned = 0
    const total = this.sessions.size

    for (const [sessionId, session] of this.sessions.entries()) {
      const sessionAge = now - new Date(session.startTime || 0).getTime()
      if (sessionAge > maxAge && session.status !== 'generating') {
        this.sessions.delete(sessionId)
        cleaned++
      }
    }

    return { cleaned, total }
  }
}

export const legalDocGeneratorService = LegalDocGeneratorService.getInstance()
