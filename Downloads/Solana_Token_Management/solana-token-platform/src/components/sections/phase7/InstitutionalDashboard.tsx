'use client'

import { BarChart3, Users, TrendingUp, PieChart } from 'lucide-react'

export default function InstitutionalDashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Institutional Dashboard</h1>
            <p className="text-zinc-400">Advanced analytics and portfolio management for institutions</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-sm text-zinc-400">AUM</span>
          </div>
          <div className="text-2xl font-bold text-white">$25.4M</div>
        </div>
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-zinc-400">Active Clients</span>
          </div>
          <div className="text-2xl font-bold text-white">1,247</div>
        </div>
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <div className="flex items-center space-x-2 mb-2">
            <PieChart className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-zinc-400">Portfolio ROI</span>
          </div>
          <div className="text-2xl font-bold text-white">+18.7%</div>
        </div>
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <div className="flex items-center space-x-2 mb-2">
            <BarChart3 className="w-5 h-5 text-orange-400" />
            <span className="text-sm text-zinc-400">Risk Score</span>
          </div>
          <div className="text-2xl font-bold text-white">7.2/10</div>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Institutional Features</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-white font-medium mb-2">Risk Management</h4>
            <p className="text-zinc-400 text-sm">Advanced risk analytics and portfolio optimization</p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-2">Compliance Reporting</h4>
            <p className="text-zinc-400 text-sm">Automated regulatory reporting and audit trails</p>
          </div>
        </div>
      </div>
    </div>
  )
}
