'use client'

import { useState } from 'react'
import { Coins, TrendingUp, DollarSign, Clock, Zap, ChevronDown, ChevronUp, Lock, Unlock, Info } from 'lucide-react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'

interface StakingPool {
  id: string
  name: string
  apy: number
  lockPeriod: string
  minStake: number
  totalStaked: number
  userStaked: number
  rewards: number
  isActive: boolean
  tier: 'bronze' | 'silver' | 'gold' | 'diamond'
}

export default function SolxStaking() {
  const { connected } = useWallet()
  const [activeTab, setActiveTab] = useState<'stake' | 'pools' | 'rewards' | 'analytics'>('stake')
  const [selectedPool, setSelectedPool] = useState('')
  const [stakeAmount, setStakeAmount] = useState('')
  const [loading, setLoading] = useState(false)
  
  // Mock staking pools
  const stakingPools: StakingPool[] = [
    {
      id: 'flexible',
      name: 'Flexible Staking',
      apy: 8.5,
      lockPeriod: 'No lock',
      minStake: 100,
      totalStaked: 2500000,
      userStaked: 5000,
      rewards: 45.2,
      isActive: true,
      tier: 'bronze'
    },
    {
      id: '30day',
      name: '30-Day Lock',
      apy: 12.0,
      lockPeriod: '30 days',
      minStake: 500,
      totalStaked: 1800000,
      userStaked: 10000,
      rewards: 120.0,
      isActive: true,
      tier: 'silver'
    },
    {
      id: '90day',
      name: '90-Day Lock',
      apy: 18.5,
      lockPeriod: '90 days',
      minStake: 1000,
      totalStaked: 1200000,
      userStaked: 25000,
      rewards: 462.5,
      isActive: true,
      tier: 'gold'
    },
    {
      id: '365day',
      name: 'Diamond Tier - 1 Year',
      apy: 28.0,
      lockPeriod: '365 days',
      minStake: 10000,
      totalStaked: 800000,
      userStaked: 50000,
      rewards: 1400.0,
      isActive: true,
      tier: 'diamond'
    }
  ]

  const userBalance = 15000 // Mock SOLX balance
  const totalUserStaked = stakingPools.reduce((acc, pool) => acc + pool.userStaked, 0)
  const totalUserRewards = stakingPools.reduce((acc, pool) => acc + pool.rewards, 0)

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'text-amber-600 bg-amber-900/20 border-amber-700'
      case 'silver': return 'text-slate-300 bg-slate-800/20 border-slate-600'
      case 'gold': return 'text-yellow-400 bg-yellow-900/20 border-yellow-600'
      case 'diamond': return 'text-cyan-400 bg-cyan-900/20 border-cyan-600'
      default: return 'text-zinc-400 bg-zinc-800/20 border-zinc-700'
    }
  }

  const handleStake = async () => {
    if (!connected || !selectedPool || !stakeAmount) return
    
    setLoading(true)
    try {
      console.log(`Staking ${stakeAmount} SOLX in pool ${selectedPool}`)
      await new Promise(resolve => setTimeout(resolve, 2000))
    } catch (error) {
      console.error('Staking failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClaim = async (poolId: string) => {
    setLoading(true)
    try {
      console.log(`Claiming rewards from pool ${poolId}`)
      await new Promise(resolve => setTimeout(resolve, 1500))
    } catch (error) {
      console.error('Claim failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
            <Coins className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">SOLX Staking Hub</h1>
            <p className="text-zinc-400">Stake SOLX tokens and earn passive rewards</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
            <div className="flex items-center space-x-2 mb-1">
              <Coins className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-zinc-400">Available Balance</span>
            </div>
            <div className="text-xl font-bold text-white">{userBalance.toLocaleString()} SOLX</div>
          </div>
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
            <div className="flex items-center space-x-2 mb-1">
              <Lock className="w-4 h-4 text-green-400" />
              <span className="text-sm text-zinc-400">Total Staked</span>
            </div>
            <div className="text-xl font-bold text-white">{totalUserStaked.toLocaleString()} SOLX</div>
          </div>
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
            <div className="flex items-center space-x-2 mb-1">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-zinc-400">Total Rewards</span>
            </div>
            <div className="text-xl font-bold text-white">{totalUserRewards.toFixed(2)} SOLX</div>
          </div>
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
            <div className="flex items-center space-x-2 mb-1">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-zinc-400">Avg APY</span>
            </div>
            <div className="text-xl font-bold text-white">16.5%</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 bg-zinc-900 p-1 rounded-lg w-fit">
        {[
          { id: 'stake', label: 'Stake Tokens', icon: Lock },
          { id: 'pools', label: 'Staking Pools', icon: Coins },
          { id: 'rewards', label: 'Claim Rewards', icon: DollarSign },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white'
                : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Stake Tab */}
      {activeTab === 'stake' && (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Stake SOLX Tokens</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Select Staking Pool</label>
                <select
                  value={selectedPool}
                  onChange={(e) => setSelectedPool(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                >
                  <option value="">Choose a staking pool</option>
                  {stakingPools.map((pool) => (
                    <option key={pool.id} value={pool.id}>
                      {pool.name} - {pool.apy}% APY ({pool.lockPeriod})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Amount to Stake</label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="0"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    max={userBalance}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 pr-16 text-white focus:border-purple-500 focus:outline-none"
                  />
                  <div className="absolute right-3 top-2 text-zinc-400 text-sm">SOLX</div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {['25%', '50%', '75%', '100%'].map((percent) => (
                  <button
                    key={percent}
                    onClick={() => {
                      const percentage = parseInt(percent) / 100
                      setStakeAmount((userBalance * percentage).toString())
                    }}
                    className="py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-sm transition-colors"
                  >
                    {percent}
                  </button>
                ))}
              </div>

              <button
                onClick={handleStake}
                disabled={!connected || loading || !selectedPool || !stakeAmount}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white py-3 rounded-lg font-medium transition-colors"
              >
                {loading ? 'Staking...' : 'Stake SOLX'}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {selectedPool && stakingPools.find(p => p.id === selectedPool) && (
              <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Pool Details</h3>
                {(() => {
                  const pool = stakingPools.find(p => p.id === selectedPool)!
                  return (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Pool Name</span>
                        <span className="text-white font-medium">{pool.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">APY</span>
                        <span className="text-green-400 font-medium">{pool.apy}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Lock Period</span>
                        <span className="text-white font-medium">{pool.lockPeriod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Minimum Stake</span>
                        <span className="text-white font-medium">{pool.minStake} SOLX</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Total Staked</span>
                        <span className="text-white font-medium">{pool.totalStaked.toLocaleString()} SOLX</span>
                      </div>
                      <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${getTierColor(pool.tier)}`}>
                        {pool.tier.toUpperCase()} TIER
                      </div>
                    </div>
                  )
                })()}
              </div>
            )}

            <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Info className="w-5 h-5 text-yellow-400 mt-0.5" />
                <div className="text-sm text-yellow-300">
                  <div className="font-medium mb-2">Staking Benefits</div>
                  <ul className="space-y-1 text-xs">
                    <li>• Higher tiers unlock exclusive platform features</li>
                    <li>• Compounds automatically for maximum returns</li>
                    <li>• Governance voting rights for SOLX holders</li>
                    <li>• Priority access to new token launches</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pools Tab */}
      {activeTab === 'pools' && (
        <div className="grid gap-6">
          {stakingPools.map((pool) => (
            <div key={pool.id} className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                    <Coins className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{pool.name}</h3>
                    <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${getTierColor(pool.tier)}`}>
                      {pool.tier.toUpperCase()} TIER
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-400">{pool.apy}%</div>
                  <div className="text-sm text-zinc-400">APY</div>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-zinc-400">Lock Period</div>
                  <div className="text-white font-medium">{pool.lockPeriod}</div>
                </div>
                <div>
                  <div className="text-sm text-zinc-400">Min Stake</div>
                  <div className="text-white font-medium">{pool.minStake} SOLX</div>
                </div>
                <div>
                  <div className="text-sm text-zinc-400">Your Stake</div>
                  <div className="text-white font-medium">{pool.userStaked.toLocaleString()} SOLX</div>
                </div>
                <div>
                  <div className="text-sm text-zinc-400">Your Rewards</div>
                  <div className="text-purple-400 font-medium">{pool.rewards.toFixed(2)} SOLX</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rewards Tab */}
      {activeTab === 'rewards' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Total Claimable Rewards</h3>
                <p className="text-purple-300">Accumulated from all staking pools</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-purple-400">{totalUserRewards.toFixed(2)} SOLX</div>
                <button
                  onClick={() => handleClaim('all')}
                  disabled={loading || totalUserRewards === 0}
                  className="mt-2 bg-purple-600 hover:bg-purple-700 disabled:bg-zinc-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  {loading ? 'Claiming...' : 'Claim All'}
                </button>
              </div>
            </div>
          </div>

          {stakingPools.filter(pool => pool.rewards > 0).map((pool) => (
            <div key={pool.id} className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-semibold">{pool.name}</h4>
                  <p className="text-sm text-zinc-400">Staked: {pool.userStaked.toLocaleString()} SOLX</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-purple-400">{pool.rewards.toFixed(2)} SOLX</div>
                  <button
                    onClick={() => handleClaim(pool.id)}
                    disabled={loading}
                    className="mt-1 bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-1 rounded text-sm transition-colors"
                  >
                    {loading ? 'Claiming...' : 'Claim'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Staking Performance</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-zinc-400">Total Staked Value</span>
                <span className="text-white font-semibold">${(totalUserStaked * 1.25).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Total Rewards Earned</span>
                <span className="text-green-400 font-semibold">{totalUserRewards.toFixed(2)} SOLX</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Average APY</span>
                <span className="text-purple-400 font-semibold">16.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Days Staking</span>
                <span className="text-white font-semibold">127 days</span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Portfolio Distribution</h3>
            
            <div className="space-y-3">
              {stakingPools.filter(pool => pool.userStaked > 0).map((pool) => (
                <div key={pool.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-zinc-400">{pool.name}</span>
                    <span className="text-sm text-white">
                      {((pool.userStaked / totalUserStaked) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        pool.tier === 'diamond' ? 'bg-cyan-400' :
                        pool.tier === 'gold' ? 'bg-yellow-400' :
                        pool.tier === 'silver' ? 'bg-slate-400' : 'bg-amber-600'
                      }`}
                      style={{ width: `${(pool.userStaked / totalUserStaked) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
