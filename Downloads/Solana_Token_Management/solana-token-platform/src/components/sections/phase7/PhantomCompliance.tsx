'use client'

import { Shield, CheckCircle, AlertTriangle, Settings, FileCheck } from 'lucide-react'

export default function PhantomCompliance() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Phantom Compliance System</h1>
            <p className="text-zinc-400">Advanced compliance monitoring for Phantom wallet integration</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <CheckCircle className="w-8 h-8 text-green-400 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">KYC Verification</h3>
          <p className="text-zinc-400 text-sm">Automated identity verification for Phantom users</p>
        </div>
        
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <AlertTriangle className="w-8 h-8 text-yellow-400 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Risk Assessment</h3>
          <p className="text-zinc-400 text-sm">Real-time transaction risk monitoring</p>
        </div>
        
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <FileCheck className="w-8 h-8 text-blue-400 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Regulatory Compliance</h3>
          <p className="text-zinc-400 text-sm">Automatic compliance with global regulations</p>
        </div>
      </div>
    </div>
  )
}
