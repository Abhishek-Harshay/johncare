'use client'

import { Brain, Play, BarChart3, Settings } from 'lucide-react'

export default function LaunchSimulator() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Launch Simulator</h1>
            <p className="text-zinc-400">Simulate token launches and predict outcomes</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Simulation Parameters</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Initial Supply</label>
              <input 
                type="number" 
                placeholder="1,000,000"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:border-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Initial Liquidity</label>
              <input 
                type="number" 
                placeholder="10,000"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:border-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Marketing Budget</label>
              <input 
                type="number" 
                placeholder="5,000"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:border-green-500 focus:outline-none"
              />
            </div>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
              <Play className="w-4 h-4" />
              <span>Run Simulation</span>
            </button>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Simulation Results</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-zinc-400">Predicted Success Rate</span>
              <span className="text-green-400 font-semibold">78%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Expected ROI</span>
              <span className="text-blue-400 font-semibold">+145%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Risk Level</span>
              <span className="text-yellow-400 font-semibold">Medium</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Time to Break Even</span>
              <span className="text-purple-400 font-semibold">12 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
