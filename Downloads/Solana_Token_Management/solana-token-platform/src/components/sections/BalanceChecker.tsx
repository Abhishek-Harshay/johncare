'use client'

import { useState } from 'react'
import { Search, Upload, Download, Wallet as WalletIcon } from 'lucide-react'
import { useConnection } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'

interface WalletData {
  publicKey: string
  privateKey: string
  solBalance?: number
}

export default function BalanceChecker() {
  const [wallets, setWallets] = useState<WalletData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<WalletData[]>([])
  const { connection } = useConnection()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string
        const lines = text.split('\n').filter(line => line.trim() !== '')
        
        // Skip header if present
        const dataLines = lines[0].toLowerCase().includes('wallet_address') ? lines.slice(1) : lines
        
        const walletData: WalletData[] = dataLines
          .map(line => {
            const [publicKey, privateKey] = line.split(',')
            if (publicKey && privateKey) {
              return {
                publicKey: publicKey.trim(),
                privateKey: privateKey.trim()
              }
            }
            return null
          })
          .filter(Boolean) as WalletData[]

        setWallets(walletData)
      } catch (error) {
        console.error('Error parsing file:', error)
      }
    }
    reader.readAsText(file)
  }

  const checkBalances = async () => {
    if (wallets.length === 0) return

    setIsLoading(true)

    try {
      // Use the API endpoint instead of direct connection
      const response = await fetch('/api/balance/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallets })
      })

      const data = await response.json()
      
      if (data.success) {
        const balanceResults = data.data.results.map((result: any, index: number) => ({
          ...wallets[index],
          solBalance: result.balance
        }))
        
        setResults(balanceResults)
        console.log(`✅ Checked ${data.data.totalWallets} wallets. ${data.data.walletsWithBalance} have balance.`)
      } else {
        alert(`Error checking balances: ${data.error}`)
        console.error('Balance check API error:', data.error)
      }
    } catch (error) {
      console.error('Balance check failed:', error)
      alert('Failed to check balances. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const exportResults = () => {
    if (results.length === 0) return

    const csvContent = [
      'wallet_address,private_key,sol_balance',
      ...results.map(wallet => 
        `${wallet.publicKey},${wallet.privateKey},${wallet.solBalance || 0}`
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'wallet_balances.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">
          Wallet Balance Checker
        </h1>
        <p className="text-zinc-400">
          Upload your wallet file and check SOL balances across multiple wallets
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Upload Wallet File
        </h3>
        <div className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center hover:border-zinc-600 transition-colors">
          <Upload className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
          <div className="mb-4">
            <label htmlFor="wallet-file" className="cursor-pointer">
              <span className="text-purple-400 hover:text-purple-300 font-medium">
                Click to upload
              </span>
              <span className="text-zinc-400"> or drag and drop</span>
            </label>
            <input
              id="wallet-file"
              type="file"
              accept=".csv,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
          <p className="text-sm text-zinc-500">
            CSV or TXT file with wallet_address,private_key format
          </p>
        </div>
        
        {wallets.length > 0 && (
          <div className="mt-4 p-4 bg-green-900 bg-opacity-30 rounded-lg border border-green-700">
            <p className="text-green-300 font-medium">
              ✅ {wallets.length} wallets loaded successfully
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      {wallets.length > 0 && (
        <div className="flex space-x-4 mb-6">
          <button
            onClick={checkBalances}
            disabled={isLoading}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>{isLoading ? 'Checking...' : 'Check Balances'}</span>
          </button>
          
          {results.length > 0 && (
            <button
              onClick={exportResults}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export Results</span>
            </button>
          )}
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800">
          <div className="p-6 border-b border-zinc-800">
            <h3 className="text-lg font-semibold text-white">
              Balance Results ({results.length} wallets)
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    Wallet Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    SOL Balance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {results.map((wallet, index) => (
                  <tr key={index} className="hover:bg-zinc-800 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <WalletIcon className="w-4 h-4 text-zinc-500 mr-2" />
                        <span className="text-sm font-mono text-white">
                          {wallet.publicKey.slice(0, 8)}...{wallet.publicKey.slice(-8)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-white">
                        {wallet.solBalance?.toFixed(6) || '0.000000'} SOL
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        (wallet.solBalance || 0) > 0 
                          ? 'bg-green-900 bg-opacity-30 text-green-300 border border-green-700'
                          : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                      }`}>
                        {(wallet.solBalance || 0) > 0 ? 'Has Balance' : 'Empty'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
