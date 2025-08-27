import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions - SolX Engine',
  description: 'Terms and conditions for using SolX Engine platform and services'
}

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using SolX Engine platform and services
          </p>
          <p className="text-sm text-gray-500 mt-2">Last updated: August 27, 2025</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* 1. Acceptance of Terms */}
          <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <div className="text-gray-300 space-y-3">
              <p>
                By accessing and using SolX Engine ("the Platform"), you agree to be bound by these Terms and Conditions ("Terms"). 
                If you do not agree to these terms, please do not use our services.
              </p>
              <p>
                SolX Engine is a comprehensive Solana token management platform that provides various tools and services for token creation, 
                management, trading automation, and compliance. These Terms apply to all users of the platform.
              </p>
            </div>
          </section>

          {/* 2. Description of Services */}
          <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
            <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Services</h2>
            <div className="text-gray-300 space-y-3">
              <p>SolX Engine provides the following services:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Token Management:</strong> Token creation, balance checking, multisender, liquidity management, and token burning</li>
                <li><strong>Trading Integration:</strong> Integration with Raydium, Pump.fun, Orca, and Jupiter protocols</li>
                <li><strong>AI-Powered Tools:</strong> Content generation, branding design, tokenomics planning, and whitepaper creation</li>
                <li><strong>Bot Services:</strong> Volume bots, holder generators, wallet management, and distribution tools</li>
                <li><strong>Legal & Compliance:</strong> Legal document generation and compliance checking</li>
                <li><strong>Analytics:</strong> Portfolio tracking, arbitrage scanning, and market analysis</li>
              </ul>
            </div>
          </section>

          {/* 3. User Responsibilities */}
          <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
            <h2 className="text-2xl font-semibold text-white mb-4">3. User Responsibilities</h2>
            <div className="text-gray-300 space-y-3">
              <p>As a user of SolX Engine, you agree to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Provide accurate and complete information when required</li>
                <li>Maintain the confidentiality of your account credentials and private keys</li>
                <li>Comply with all applicable laws and regulations in your jurisdiction</li>
                <li>Use the platform only for lawful purposes</li>
                <li>Not engage in any activity that could harm the platform or other users</li>
                <li>Take full responsibility for your trading and investment decisions</li>
              </ul>
            </div>
          </section>

          {/* 4. Risk Warnings */}
          <section className="bg-red-900/20 backdrop-blur-sm rounded-xl p-6 border border-red-800/50">
            <h2 className="text-2xl font-semibold text-red-300 mb-4">4. Risk Warnings</h2>
            <div className="text-red-200 space-y-3">
              <p><strong>IMPORTANT RISK DISCLOSURE:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Cryptocurrency trading involves substantial risk of loss</li>
                <li>Token values can fluctuate dramatically and you may lose all your investment</li>
                <li>Past performance does not guarantee future results</li>
                <li>Regulatory changes may affect token legality and value</li>
                <li>Smart contract risks and blockchain vulnerabilities exist</li>
                <li>Bot trading carries additional risks of automated losses</li>
                <li>You should never invest more than you can afford to lose</li>
              </ul>
            </div>
          </section>

          {/* 5. No Investment Advice */}
          <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
            <h2 className="text-2xl font-semibold text-white mb-4">5. No Investment Advice</h2>
            <div className="text-gray-300 space-y-3">
              <p>
                SolX Engine does not provide investment, financial, trading, or legal advice. All information provided is for 
                educational and informational purposes only. You should consult with qualified professionals before making 
                any investment decisions.
              </p>
              <p>
                The platform's tools and AI-generated content are not recommendations to buy, sell, or hold any cryptocurrencies 
                or tokens. All trading and investment decisions are solely your responsibility.
              </p>
            </div>
          </section>

          {/* 6. Platform Availability */}
          <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
            <h2 className="text-2xl font-semibold text-white mb-4">6. Platform Availability</h2>
            <div className="text-gray-300 space-y-3">
              <p>
                While we strive to maintain continuous platform availability, SolX Engine may experience downtime due to 
                maintenance, updates, or technical issues. We do not guarantee uninterrupted access to the platform.
              </p>
              <p>
                We reserve the right to modify, suspend, or discontinue any part of the platform at any time without prior notice.
              </p>
            </div>
          </section>

          {/* 7. Intellectual Property */}
          <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
            <h2 className="text-2xl font-semibold text-white mb-4">7. Intellectual Property</h2>
            <div className="text-gray-300 space-y-3">
              <p>
                All content, features, and functionality of SolX Engine are owned by us and are protected by copyright, 
                trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative 
                works without our express written consent.
              </p>
            </div>
          </section>

          {/* 8. Limitation of Liability */}
          <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
            <h2 className="text-2xl font-semibold text-white mb-4">8. Limitation of Liability</h2>
            <div className="text-gray-300 space-y-3">
              <p>
                To the maximum extent permitted by law, SolX Engine and its affiliates shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, 
                or other intangible losses resulting from your use of the platform.
              </p>
              <p>
                Our total liability to you for all claims arising from your use of the platform shall not exceed the amount 
                you paid to us in the 12 months preceding the claim.
              </p>
            </div>
          </section>

          {/* 9. Indemnification */}
          <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
            <h2 className="text-2xl font-semibold text-white mb-4">9. Indemnification</h2>
            <div className="text-gray-300 space-y-3">
              <p>
                You agree to indemnify, defend, and hold harmless SolX Engine and its affiliates from and against any claims, 
                damages, losses, liabilities, costs, and expenses arising from your use of the platform, violation of these 
                Terms, or violation of any rights of another party.
              </p>
            </div>
          </section>

          {/* 10. Governing Law */}
          <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
            <h2 className="text-2xl font-semibold text-white mb-4">10. Governing Law</h2>
            <div className="text-gray-300 space-y-3">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard 
                to its conflict of law principles. Any disputes arising from these Terms shall be subject to the exclusive 
                jurisdiction of the courts in [Jurisdiction].
              </p>
            </div>
          </section>

          {/* 11. Changes to Terms */}
          <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
            <h2 className="text-2xl font-semibold text-white mb-4">11. Changes to Terms</h2>
            <div className="text-gray-300 space-y-3">
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting 
                on the platform. Your continued use of SolX Engine after changes are posted constitutes acceptance of the 
                revised Terms.
              </p>
            </div>
          </section>

          {/* 12. Contact Information */}
          <section className="bg-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-blue-800/50">
            <h2 className="text-2xl font-semibold text-blue-300 mb-4">12. Contact Information</h2>
            <div className="text-blue-200 space-y-3">
              <p>If you have any questions about these Terms, please contact us:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Email: legal@solxengine.com</li>
                <li>Telegram: @SolXEngine</li>
                <li>Twitter: @SolXEngine</li>
                <li>Documentation: GitBook (link will be provided)</li>
              </ul>
            </div>
          </section>
        </div>

        {/* Back to Platform Button */}
        <div className="text-center mt-12">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all"
          >
            ← Back to Platform
          </a>
        </div>
      </div>
    </div>
  )
}
