// AI Service Configuration
interface AIServiceConfig {
  openai: {
    apiKey: string;
    model: string;
  };
  deepseek: {
    apiKey: string;
    model: string;
  };
}

class AIService {
  private config: AIServiceConfig;

  constructor() {
    this.config = {
      openai: {
        apiKey: process.env.OPENAI_API_KEY || '',
        model: 'gpt-4'
      },
      deepseek: {
        apiKey: process.env.DEEPSEEK_API_KEY || '',
        model: 'deepseek-chat'
      }
    };
  }

  // Use OpenAI for design-related tasks (logo, branding, UI suggestions)
  async generateDesignContent(prompt: string): Promise<string> {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.openai.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: this.config.openai.model,
          messages: [
            {
              role: 'system',
              content: 'You are an expert UI/UX designer and branding specialist. Provide creative, modern design suggestions.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1000,
          temperature: 0.8
        })
      });

      const data = await response.json();
      return data.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate design content');
    }
  }

  // Use DeepSeek for writing tasks (descriptions, documentation, marketing content)
  async generateWritingContent(prompt: string): Promise<string> {
    try {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.deepseek.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: this.config.deepseek.model,
          messages: [
            {
              role: 'system',
              content: 'You are an expert content writer and technical documentation specialist. Write clear, engaging, and informative content.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.7
        })
      });

      const data = await response.json();
      return data.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('DeepSeek API error:', error);
      throw new Error('Failed to generate writing content');
    }
  }

  // Generate token metadata using both AIs
  async generateTokenMetadata(tokenName: string, description: string) {
    try {
      // Use DeepSeek for writing the enhanced description
      const enhancedDescription = await this.generateWritingContent(
        `Create an engaging, professional token description for a Solana SPL token called "${tokenName}". Base description: "${description}". Make it compelling for investors while being clear about utility and purpose. Keep it under 200 words.`
      );

      // Use OpenAI for design attributes and branding suggestions
      const designAttributes = await this.generateDesignContent(
        `Suggest visual attributes and branding elements for a token called "${tokenName}" with description: "${description}". Include color schemes, visual themes, and symbol suggestions in JSON format.`
      );

      return {
        enhancedDescription,
        designAttributes,
        generatedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to generate token metadata:', error);
      throw error;
    }
  }
}

export default new AIService();
