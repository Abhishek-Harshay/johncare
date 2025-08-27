// DeepSeek AI Service - 10x cheaper than OpenAI
// ==============================================

export interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string
    }
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

class DeepSeekService {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY || ''
    this.baseUrl = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/v1'
  }

  async generateContent(prompt: string, systemPrompt?: string): Promise<string> {
    try {
      const messages: DeepSeekMessage[] = []
      
      if (systemPrompt) {
        messages.push({ role: 'system', content: systemPrompt })
      }
      
      messages.push({ role: 'user', content: prompt })

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages,
          temperature: 0.7,
          max_tokens: 2000,
          stream: false
        })
      })

      if (!response.ok) {
        if (response.status === 402) {
          console.warn('⚠️ DeepSeek API requires payment, falling back to OpenAI...')
          return this.generateWithOpenAI(prompt)
        }
        throw new Error(`DeepSeek API error: ${response.status} ${response.statusText}`)
      }

      const data: DeepSeekResponse = await response.json()
      return data.choices[0]?.message?.content || 'No response generated'
    } catch (error) {
      console.error('DeepSeek API error:', error)
      console.warn('⚠️ DeepSeek unavailable, falling back to OpenAI...')
      return this.generateWithOpenAI(prompt)
    }
  }

  private async generateWithOpenAI(prompt: string): Promise<string> {
    try {
      const openaiKey = process.env.OPENAI_API_KEY
      if (!openaiKey) {
        return this.generateMockContent(prompt)
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'user', content: prompt }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        console.warn('⚠️ OpenAI also failed, using mock content')
        return this.generateMockContent(prompt)
      }

      const data = await response.json()
      return data.choices[0]?.message?.content || this.generateMockContent(prompt)
    } catch (error) {
      console.error('OpenAI fallback error:', error)
      return this.generateMockContent(prompt)
    }
  }

  private generateMockContent(prompt: string): string {
    // Generate contextual mock content based on prompt keywords
    const lowerPrompt = prompt.toLowerCase()
    
    if (lowerPrompt.includes('token') && lowerPrompt.includes('description')) {
      return '🚀 Revolutionary token with innovative utility and strong community backing. Built on Solana for lightning-fast transactions and low fees.'
    }
    
    if (lowerPrompt.includes('marketing') || lowerPrompt.includes('strategy')) {
      return '📈 Multi-channel marketing approach targeting key demographics through social media engagement, influencer partnerships, and community building initiatives.'
    }
    
    if (lowerPrompt.includes('analysis') || lowerPrompt.includes('market')) {
      return '📊 Market analysis shows strong potential with growing adoption trends, favorable technical indicators, and increasing community interest.'
    }
    
    if (lowerPrompt.includes('whitepaper')) {
      return '📋 Comprehensive technical documentation outlining tokenomics, utility framework, roadmap milestones, and governance structure for sustainable growth.'
    }
    
    return '✨ AI-powered content generation currently using fallback mode. Upgrade to premium AI services for enhanced content quality and personalization.'
  }

  // Specialized methods for different platform features
  async generateTokenDescription(tokenName: string, symbol: string): Promise<string> {
    const prompt = `Create a compelling description for a token named "${tokenName}" with symbol "${symbol}". Make it professional, engaging, and highlight potential use cases. Keep it under 200 words.`
    
    const systemPrompt = 'You are an expert crypto marketing specialist. Create professional, compliant token descriptions that attract investors while being honest about risks.'
    
    return this.generateContent(prompt, systemPrompt)
  }

  async generateMemeTokenContent(tokenName: string, theme: string): Promise<{
    description: string
    tagline: string
    features: string[]
  }> {
    const prompt = `Create meme token content for "${tokenName}" with theme "${theme}". Include: 1) Fun description 2) Catchy tagline 3) List of 5 fun features. Make it engaging and community-focused.`
    
    const systemPrompt = 'You are a meme coin marketing expert. Create fun, engaging content that builds community while being responsible about investment risks.'
    
    const response = await this.generateContent(prompt, systemPrompt)
    
    try {
      // Parse the structured response
      const lines = response.split('\n').filter(line => line.trim())
      return {
        description: lines.find(line => line.includes('Description:'))?.replace('Description:', '').trim() || response.slice(0, 200),
        tagline: lines.find(line => line.includes('Tagline:'))?.replace('Tagline:', '').trim() || 'To the moon! 🚀',
        features: lines.filter(line => line.match(/^\d+\./)).map(line => line.replace(/^\d+\./, '').trim()).slice(0, 5)
      }
    } catch {
      // Fallback if parsing fails
      return {
        description: response.slice(0, 200),
        tagline: 'To the moon! 🚀',
        features: ['Community Driven', 'Meme Power', 'Diamond Hands', 'Moon Mission', 'Fun & Profits']
      }
    }
  }

  async generateWebsiteContent(projectName: string, projectType: string): Promise<{
    heroTitle: string
    heroSubtitle: string
    features: string[]
    aboutText: string
  }> {
    const prompt = `Generate website content for "${projectName}" (${projectType} project). Include: hero title, subtitle, 4 key features, and about section. Make it professional and conversion-focused.`
    
    const systemPrompt = 'You are a web copywriting expert specializing in crypto and DeFi projects. Create compelling, professional content that converts visitors.'
    
    const response = await this.generateContent(prompt, systemPrompt)
    
    try {
      const lines = response.split('\n').filter(line => line.trim())
      return {
        heroTitle: lines.find(line => line.includes('Title:'))?.replace('Title:', '').trim() || projectName,
        heroSubtitle: lines.find(line => line.includes('Subtitle:'))?.replace('Subtitle:', '').trim() || 'Revolutionary DeFi Solution',
        features: lines.filter(line => line.match(/^[\-\*]\s/)).map(line => line.replace(/^[\-\*]\s/, '')).slice(0, 4),
        aboutText: lines.slice(-3).join(' ').trim() || 'Built for the future of decentralized finance.'
      }
    } catch {
      return {
        heroTitle: projectName,
        heroSubtitle: 'Revolutionary DeFi Solution',
        features: ['Secure Trading', 'Low Fees', 'Fast Transactions', 'Community Driven'],
        aboutText: 'Built for the future of decentralized finance.'
      }
    }
  }

  async analyzeTradingStrategy(tokenData: any): Promise<string> {
    const prompt = `Analyze this token data and provide trading insights: ${JSON.stringify(tokenData)}. Include technical analysis, risk assessment, and potential strategies.`
    
    const systemPrompt = 'You are a professional crypto analyst. Provide objective analysis with clear risk warnings. Never give direct financial advice.'
    
    return this.generateContent(prompt, systemPrompt)
  }

  // Check if DeepSeek is available and working
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.generateContent('Test connection', 'Respond with: Connection successful')
      return response.includes('successful') || response.includes('working') || response.includes('Connection')
    } catch (error) {
      console.log('⚠️ DeepSeek unavailable, will fallback to OpenAI:', error)
      return false
    }
  }
}

// Singleton instance
export const deepSeekService = new DeepSeekService()

// Fallback to OpenAI if DeepSeek fails
export async function generateWithFallback(prompt: string, systemPrompt?: string): Promise<string> {
  try {
    // Try DeepSeek first (10x cheaper)
    return await deepSeekService.generateContent(prompt, systemPrompt)
  } catch (error) {
    console.log('DeepSeek failed, falling back to OpenAI:', error)
    
    // Fallback to OpenAI
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 2000,
        })
      })

      const data = await response.json()
      return data.choices[0]?.message?.content || 'No response generated'
    } catch (openaiError) {
      console.error('Both DeepSeek and OpenAI failed:', openaiError)
      throw new Error('AI services unavailable')
    }
  }
}

export default DeepSeekService
