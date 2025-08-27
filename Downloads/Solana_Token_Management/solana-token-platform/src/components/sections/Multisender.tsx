'use client'

import { useState } from 'react'
import { Send, Upload, Loader2 } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'

interface RecipientData {
  address: string
  amount: number
}

export default function Multisender() {
  const { publicKey } = useWallet()
  const [recipients, setRecipients] = useState<RecipientData[]>([])
  const [tokenAddress, setTokenAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sendType, setSendType] = useState<'SOL' | 'TOKEN'>('SOL')

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string
        const lines = text.split('\n').filter(line => line.trim() !== '')
        
        const recipientData: RecipientData[] = lines
          .map(line => {
            const [address, amount] = line.split(',')
            if (address && amount && !isNaN(parseFloat(amount))) {
              return {
                address: address.trim(),
                amount: parseFloat(amount.trim())
              }
            }
            return null
          })
          .filter(Boolean) as RecipientData[]

        setRecipients(recipientData)
      } catch (error) {
        console.error('Error parsing file:', error)
        alert('Error parsing file. Please check the format.')
      }
    }
    reader.readAsText(file)
  }

  const handleBulkSend = async () => {
    if (!publicKey) {
      alert('Please connect your wallet first')
      return
    }

    if (recipients.length === 0) {
      alert('Please upload recipients file first')
      return
    }

    if (sendType === 'TOKEN' && !tokenAddress) {
      alert('Please enter token address for token transfers')
      return
    }

    setIsLoading(true)
    
    // This would integrate with your multisend API
    try {
      alert(`🚧 Multisender functionality coming soon!\n\nWould send ${sendType} to ${recipients.length} recipients.\nTotal amount: ${recipients.reduce((sum, r) => sum + r.amount, 0)}`)
      
      // TODO: Implement actual multisend functionality
      // const response = await fetch('/api/multisend', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     recipients,
      //     tokenAddress: sendType === 'TOKEN' ? tokenAddress : null,
      //     sendType
      //   })
      // })
    } catch (error) {
      console.error('Multisend failed:', error)
      alert('Multisend failed')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
          Multisender - Bulk Token Distribution
        </h1>
        <p className="text-zinc-400">
          Send SOL or SPL tokens to multiple recipients in a single transaction
        </p>
      </div>

      {/* Send Type Selection */}
      <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Send Type</h3>
        <div className="flex space-x-4">
          <button
            onClick={() => setSendType('SOL')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              sendType === 'SOL'
                ? 'bg-purple-600 text-white'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            Send SOL
          </button>
          <button
            onClick={() => setSendType('TOKEN')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              sendType === 'TOKEN'
                ? 'bg-purple-600 text-white'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            Send Token
          </button>
        </div>

        {sendType === 'TOKEN' && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-zinc-300 mb-2">Token Address</label>
            <input
              type="text"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-purple-500"
              placeholder="Enter SPL token mint address..."
            />
          </div>
        )}
      </div>

      {/* File Upload */}
      <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Upload Recipients File</h3>
        
        <div className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center hover:border-zinc-600 transition-colors">
          <Upload className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
          <div className="mb-4">
            <label htmlFor="recipients-file" className="cursor-pointer">
              <span className="text-purple-400 hover:text-purple-300 font-medium">
                Click to upload CSV file
              </span>
            </label>
            <input
              id="recipients-file"
              type="file"
              accept=".csv,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
          <p className="text-sm text-zinc-500">
            CSV format: wallet_address,amount (e.g., 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU,1.5)
          </p>
        </div>

        {recipients.length > 0 && (
          <div className="mt-4 p-4 bg-green-900 bg-opacity-30 rounded-lg border border-green-700">
            <p className="text-green-300 font-medium">
              ✅ {recipients.length} recipients loaded
            </p>
            <p className="text-green-200 text-sm mt-1">
              Total amount: {recipients.reduce((sum, r) => sum + r.amount, 0).toFixed(6)} {sendType}
            </p>
          </div>
        )}
      </div>

      {/* Recipients Preview */}
      {recipients.length > 0 && (
        <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recipients Preview (First 10)</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-800">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-zinc-300">Address</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-zinc-300">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {recipients.slice(0, 10).map((recipient, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm text-white font-mono">
                      {recipient.address.slice(0, 8)}...{recipient.address.slice(-8)}
                    </td>
                    <td className="px-4 py-2 text-sm text-white">
                      {recipient.amount} {sendType}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {recipients.length > 10 && (
              <p className="text-zinc-400 text-sm mt-2">
                ... and {recipients.length - 10} more recipients
              </p>
            )}
          </div>
        </div>
      )}

      {/* Send Button */}
      {recipients.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={handleBulkSend}
            disabled={isLoading || !publicKey}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 text-white px-8 py-3 rounded-lg font-medium flex items-center space-x-2 transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Send to {recipients.length} Recipients</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Feature Status */}
      <div className="mt-8 bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded-lg p-4">
        <h4 className="text-yellow-300 font-medium mb-2">🚧 Development Status</h4>
        <p className="text-yellow-200 text-sm">
          Multisender functionality is currently in development. The UI is complete and ready for backend integration.
          Features include SOL and SPL token bulk distribution with CSV file upload support.
        </p>
      </div>
    </div>
  )
}
