'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Bot, Send, Minimize2, Maximize2, X, User, MessageCircle, RotateCcw, ExternalLink } from 'lucide-react'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  isTyping?: boolean
}

interface ChatSession {
  id: string
  messages: ChatMessage[]
  createdAt: string
  lastActivity: string
}

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !sessionId) {
      createNewSession()
    }
  }, [isOpen])

  const createNewSession = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'createSession' })
      })

      const data = await response.json()
      if (data.success) {
        setSessionId(data.sessionId)
        setMessages(data.session.messages)
      }
    } catch (error) {
      console.error('Failed to create chat session:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!inputValue.trim() || !sessionId || isLoading) return

    const userMessage = inputValue.trim()
    setInputValue('')
    setIsLoading(true)
    setIsTyping(true)

    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sendMessage',
          sessionId,
          message: userMessage
        })
      })

      const data = await response.json()
      if (data.success) {
        setMessages(data.session.messages)
      }
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setIsLoading(false)
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const resetChat = () => {
    setMessages([])
    setSessionId(null)
    createNewSession()
  }

  const formatMessage = (content: string) => {
    // Convert markdown-style formatting to HTML
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')
      .replace(/\n/g, '<br/>')
  }

  const QuickActions = () => (
    <div className="p-3 border-t bg-gray-50">
      <p className="text-xs text-gray-600 mb-2">Quick Actions:</p>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setInputValue("How do I create a new token?")}
          className="text-xs h-8 px-2 border rounded-lg bg-white hover:bg-gray-50 transition-colors"
        >
          Create Token
        </button>
        <button
          onClick={() => setInputValue("Guide me through volume bot setup")}
          className="text-xs h-8 px-2 border rounded-lg bg-white hover:bg-gray-50 transition-colors"
        >
          Volume Bot
        </button>
        <button
          onClick={() => setInputValue("What services do you offer?")}
          className="text-xs h-8 px-2 border rounded-lg bg-white hover:bg-gray-50 transition-colors"
        >
          All Services
        </button>
        <button
          onClick={() => setInputValue("How to add Raydium liquidity?")}
          className="text-xs h-8 px-2 border rounded-lg bg-white hover:bg-gray-50 transition-colors"
        >
          Add Liquidity
        </button>
      </div>
    </div>
  )

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 text-white flex items-center justify-center"
        >
          <Bot className="w-6 h-6" />
        </button>
      </div>
    )
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${
      isMinimized ? 'w-80' : 'w-96'
    } transition-all duration-300`}>
      <div className="shadow-2xl border-0 overflow-hidden bg-white rounded-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">SolX AI Assistant</h3>
                <p className="text-xs opacity-90">Always here to help</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={resetChat}
                className="text-white hover:bg-white/10 w-8 h-8 p-0 rounded flex items-center justify-center transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/10 w-8 h-8 p-0 rounded flex items-center justify-center transition-colors"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/10 w-8 h-8 p-0 rounded flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {!isMinimized && (
          <div className="overflow-hidden">
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                        : 'bg-white border shadow-sm'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.role === 'assistant' && (
                        <Bot className="w-4 h-4 mt-0.5 text-purple-600 flex-shrink-0" />
                      )}
                      <div
                        className={`text-sm leading-relaxed ${
                          message.role === 'user' ? 'text-white' : 'text-gray-800'
                        }`}
                        dangerouslySetInnerHTML={{
                          __html: formatMessage(message.content)
                        }}
                      />
                      {message.role === 'user' && (
                        <User className="w-4 h-4 mt-0.5 text-white flex-shrink-0" />
                      )}
                    </div>
                    <div className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border shadow-sm rounded-2xl p-3 max-w-[85%]">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-purple-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <QuickActions />

            {/* Input */}
            <div className="p-4 bg-white border-t">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about SolX services..."
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center disabled:opacity-50 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                <span>Powered by SolX AI Engine</span>
                <div className="flex items-center space-x-2">
                  <a
                    href="/gitbook"
                    target="_blank"
                    className="flex items-center space-x-1 hover:text-purple-600 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Full Guide</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
