'use client'

import { Zap } from 'lucide-react'

interface LogoProps {
  className?: string
  showText?: boolean
}

export default function Logo({ className = "w-8 h-8", showText = true }: LogoProps) {
  return (
    <div className="flex items-center space-x-2">
      {/* Logo Icon */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg blur-sm opacity-75"></div>
        <div className="relative bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg p-2 shadow-lg">
          <Zap className={`${className} text-white`} />
        </div>
      </div>
      
      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            SolX Engine
          </div>
          <div className="text-xs text-zinc-400 -mt-1">
            AI-Powered Token Genesis
          </div>
        </div>
      )}
    </div>
  )
}
