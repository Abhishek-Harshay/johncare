'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, MessageCircle, Twitter, Github, FileText } from 'lucide-react'

export default function SocialFloatingWidget() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const socialLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/solxengine',
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'Follow us for updates'
    },
    {
      name: 'Telegram',
      icon: MessageCircle,
      url: 'https://t.me/solxengine',
      color: 'bg-cyan-500 hover:bg-cyan-600',
      description: 'Join our community'
    },
    {
      name: 'GitBook',
      icon: FileText,
      url: '/gitbook',
      color: 'bg-purple-500 hover:bg-purple-600',
      description: 'Read our documentation'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/solxengine',
      color: 'bg-gray-700 hover:bg-gray-800',
      description: 'View our source code'
    }
  ]

  if (!isVisible) return null

  return (
    <div className="fixed left-6 bottom-6 z-40">
      <div className={`flex flex-col space-y-3 transition-all duration-500 ${
        isExpanded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4 pointer-events-none'
      }`}>
        {socialLinks.map((social, index) => {
          const Icon = social.icon
          return (
            <div 
              key={social.name}
              className="relative group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <a
                href={social.url}
                target={social.url.startsWith('http') ? '_blank' : '_self'}
                rel={social.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`w-12 h-12 ${social.color} rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110`}
              >
                <Icon className="w-5 h-5" />
              </a>
              
              {/* Tooltip */}
              <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-black text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                <div className="font-semibold">{social.name}</div>
                <div className="text-xs text-gray-300">{social.description}</div>
                <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-black" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ${
          isExpanded ? 'rotate-45' : ''
        }`}
      >
        <ExternalLink className="w-6 h-6" />
      </button>

      {/* Pulse Animation */}
      {!isExpanded && (
        <div className="absolute inset-0 w-14 h-14 bg-purple-400 rounded-full animate-ping opacity-20" />
      )}
    </div>
  )
}
