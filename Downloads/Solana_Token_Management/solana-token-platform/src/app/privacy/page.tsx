import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - SolX Engine',
  description: 'Privacy policy for SolX Engine platform - how we collect, use, and protect your data'
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information
          </p>
          <p className="text-sm text-gray-500 mt-2">Last updated: August 27, 2025</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* 1. Information We Collect */}
          <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
            <div className="text-gray-300 space-y-3">
              <h3 className="text-lg font-medium text-green-300">Information You Provide</h3>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Wallet addresses and transaction data when using our services</li>
                <li>Configuration settings for bots and automated tools</li>
                <li>Content you generate using our AI tools</li>
                <li>Communication records when you contact support</li>
                <li>Feedback and survey responses</li>
              </ul>

              <h3 className="text-lg font-medium text-green-300 mt-6">Information We Collect Automatically</h3>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>IP addresses and device information</li>
                <li>Browser type and version</li>
                <li>Usage patterns and platform interactions</li>
                <li>Performance metrics and error logs</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>
          </section>

          {/* 2. How We Use Information */}
          <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
            <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Information</h2>
            <div className="text-gray-300 space-y-3">
              <p>We use the collected information for the following purposes:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Service Provision:</strong> To provide and improve our platform services</li>
                <li><strong>Security:</strong> To protect against fraud and ensure platform security</li>
                <li><strong>Communication:</strong> To respond to your inquiries and provide support</li>
                <li><strong>Analytics:</strong> To understand usage patterns and improve user experience</li>
                <li><strong>Legal Compliance:</strong> To comply with legal obligations and regulations</li>
                <li><strong>AI Training:</strong> To improve our AI models (anonymized data only)</li>
              </ul>
            </div>
          </section>

          {/* 3. Information Sharing */}
          <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
            <h2 className="text-2xl font-semibold text-white mb-4">3. Information Sharing</h2>
            <div className="text-gray-300 space-y-3">
              <p>We do not sell your personal information. We may share information in the following circumstances:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Service Providers:</strong> With trusted third-party services that help us operate the platform</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our legal rights</li>
                <li><strong>Blockchain Networks:</strong> Transaction data is inherently public on blockchain networks</li>
                <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
                <li><strong>Consent:</strong> When you explicitly consent to sharing</li>
              </ul>
            </div>
          </section>

          {/* 4. Data Security */}
          <section className="bg-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-blue-800/50">
            <h2 className="text-2xl font-semibold text-blue-300 mb-4">4. Data Security</h2>
            <div className="text-blue-200 space-y-3">
              <p>We implement industry-standard security measures to protect your information:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and penetration testing</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Secure hosting infrastructure</li>
                <li>Regular backup and disaster recovery procedures</li>
              </ul>
              <p className="text-yellow-300 mt-4">
                <strong>Important:</strong> However, no system is completely secure. We cannot guarantee absolute security 
                of your information. You are responsible for securing your own wallet and private keys.
              </p>
            </div>
          </section>

          {/* 5. Data Retention */}
          <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Data Retention</h2>
            <div className="text-gray-300 space-y-3">
              <p>We retain your information for as long as necessary to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Provide you with our services</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Improve our services and AI models</li>
              </ul>
              <p>
                You may request deletion of your personal data, subject to legal and regulatory requirements. 
                Note that blockchain transaction data cannot be deleted due to the immutable nature of blockchain technology.
              </p>
            </div>
          </section>

          {/* 6. Your Rights */}
          <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
            <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights</h2>
            <div className="text-gray-300 space-y-3">
              <p>Depending on your jurisdiction, you may have the following rights:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Access:</strong> Right to know what personal information we have about you</li>
                <li><strong>Correction:</strong> Right to correct inaccurate personal information</li>
                <li><strong>Deletion:</strong> Right to request deletion of your personal information</li>
                <li><strong>Portability:</strong> Right to receive your data in a portable format</li>
                <li><strong>Objection:</strong> Right to object to certain processing activities</li>
                <li><strong>Withdrawal:</strong> Right to withdraw consent at any time</li>
              </ul>
            </div>
          </section>

          {/* 7. GDPR Rights (EU Users) */}
          <section className="bg-purple-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-800/50">
            <h2 className="text-2xl font-semibold text-purple-300 mb-4">7. GDPR Rights (EU Users)</h2>
            <div className="text-purple-200 space-y-3">
              <p>If you are located in the European Union, you have additional rights under GDPR:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Right to be forgotten (erasure of personal data)</li>
                <li>Right to data portability</li>
                <li>Right to object to automated decision-making</li>
                <li>Right to lodge a complaint with supervisory authorities</li>
              </ul>
              <p>Contact our Data Protection Officer at dpo@solxengine.com to exercise these rights.</p>
            </div>
          </section>

          {/* 8. CCPA Rights (California Users) */}
          <section className="bg-orange-900/20 backdrop-blur-sm rounded-xl p-6 border border-orange-800/50">
            <h2 className="text-2xl font-semibold text-orange-300 mb-4">8. CCPA Rights (California Users)</h2>
            <div className="text-orange-200 space-y-3">
              <p>California residents have specific rights under the California Consumer Privacy Act (CCPA):</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Right to know what personal information is collected</li>
                <li>Right to know whether personal information is sold or disclosed</li>
                <li>Right to say no to the sale of personal information</li>
                <li>Right to access personal information</li>
                <li>Right to equal service and price</li>
              </ul>
              <p>We do not sell personal information to third parties.</p>
            </div>
          </section>

          {/* 9. Cookies and Tracking */}
          <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
            <h2 className="text-2xl font-semibold text-white mb-4">9. Cookies and Tracking</h2>
            <div className="text-gray-300 space-y-3">
              <p>We use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Remember your preferences and settings</li>
                <li>Analyze platform usage and performance</li>
                <li>Provide personalized content and features</li>
                <li>Improve security and prevent fraud</li>
              </ul>
              <p>You can control cookie settings through your browser preferences.</p>
            </div>
          </section>

          {/* 10. Third-Party Services */}
          <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
            <h2 className="text-2xl font-semibold text-white mb-4">10. Third-Party Services</h2>
            <div className="text-gray-300 space-y-3">
              <p>Our platform integrates with various third-party services:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Solana Blockchain:</strong> For token operations and transactions</li>
                <li><strong>Helius API:</strong> For blockchain data and RPC services</li>
                <li><strong>Jupiter DEX:</strong> For token swapping functionality</li>
                <li><strong>DeepSeek AI:</strong> For AI-powered content generation</li>
                <li><strong>Analytics Services:</strong> For platform monitoring and improvement</li>
              </ul>
              <p>These services have their own privacy policies, which we encourage you to review.</p>
            </div>
          </section>

          {/* 11. International Transfers */}
          <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
            <h2 className="text-2xl font-semibold text-white mb-4">11. International Transfers</h2>
            <div className="text-gray-300 space-y-3">
              <p>
                Your information may be transferred to and processed in countries other than your country of residence. 
                We ensure appropriate safeguards are in place to protect your information in accordance with applicable 
                data protection laws.
              </p>
            </div>
          </section>

          {/* 12. Children's Privacy */}
          <section className="bg-red-900/20 backdrop-blur-sm rounded-xl p-6 border border-red-800/50">
            <h2 className="text-2xl font-semibold text-red-300 mb-4">12. Children's Privacy</h2>
            <div className="text-red-200 space-y-3">
              <p>
                Our platform is not intended for use by individuals under 18 years of age. We do not knowingly collect 
                personal information from children under 18. If you become aware that a child has provided us with personal 
                information, please contact us immediately.
              </p>
            </div>
          </section>

          {/* 13. Changes to Privacy Policy */}
          <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50">
            <h2 className="text-2xl font-semibold text-white mb-4">13. Changes to Privacy Policy</h2>
            <div className="text-gray-300 space-y-3">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting 
                the updated policy on our platform and updating the "Last updated" date. Your continued use of the platform 
                after changes are posted constitutes acceptance of the updated policy.
              </p>
            </div>
          </section>

          {/* 14. Contact Information */}
          <section className="bg-green-900/20 backdrop-blur-sm rounded-xl p-6 border border-green-800/50">
            <h2 className="text-2xl font-semibold text-green-300 mb-4">14. Contact Information</h2>
            <div className="text-green-200 space-y-3">
              <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Email:</strong> privacy@solxengine.com</li>
                <li><strong>Data Protection Officer:</strong> dpo@solxengine.com</li>
                <li><strong>Support:</strong> support@solxengine.com</li>
                <li><strong>Telegram:</strong> @SolXEngine</li>
                <li><strong>Twitter:</strong> @SolXEngine</li>
              </ul>
            </div>
          </section>
        </div>

        {/* Back to Platform Button */}
        <div className="text-center mt-12">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all"
          >
            ← Back to Platform
          </a>
        </div>
      </div>
    </div>
  )
}
