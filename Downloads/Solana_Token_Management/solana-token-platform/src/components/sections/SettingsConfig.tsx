'use client'

import { useState } from 'react'
import { Settings, User, Shield, Bell, Key, Database, Palette, Globe, HelpCircle, Save, Download, Upload } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'

interface UserProfile {
  username: string
  email: string
  avatar: string
  joinDate: Date
  plan: 'Free' | 'Pro' | 'Enterprise'
  referralCode: string
}

interface NotificationSettings {
  email: boolean
  push: boolean
  sms: boolean
  priceAlerts: boolean
  portfolioAlerts: boolean
  newsUpdates: boolean
  marketingEmails: boolean
}

interface SecuritySettings {
  twoFactorAuth: boolean
  loginAlerts: boolean
  sessionTimeout: number
  apiAccess: boolean
  allowedIPs: string[]
}

export default function SettingsConfig() {
  const { publicKey } = useWallet()
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'api' | 'preferences' | 'backup'>('profile')
  const [isSaving, setIsSaving] = useState(false)
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: 'SolanaTrader',
    email: 'trader@example.com',
    avatar: '',
    joinDate: new Date('2024-01-15'),
    plan: 'Pro',
    referralCode: 'SOL2024XYZ'
  })

  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    push: true,
    sms: false,
    priceAlerts: true,
    portfolioAlerts: true,
    newsUpdates: false,
    marketingEmails: false
  })

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorAuth: true,
    loginAlerts: true,
    sessionTimeout: 60,
    apiAccess: false,
    allowedIPs: ['192.168.1.1', '10.0.0.1']
  })

  const [theme, setTheme] = useState('dark')
  const [language, setLanguage] = useState('en')
  const [currency, setCurrency] = useState('USD')
  const [timezone, setTimezone] = useState('UTC')

  const saveSettings = async () => {
    setIsSaving(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('✅ Settings Saved!\n\nAll your configuration changes have been saved successfully.')
    } catch (error) {
      console.error('Settings save failed:', error)
      alert('Failed to save settings')
    }
    setIsSaving(false)
  }

  const exportSettings = () => {
    const settings = {
      profile: userProfile,
      notifications,
      security: { ...security, allowedIPs: security.allowedIPs },
      preferences: { theme, language, currency, timezone }
    }
    
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'solx-settings-backup.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    alert('📁 Settings Exported!\n\nYour configuration has been exported as a JSON file.')
  }

  const importSettings = () => {
    alert('📂 Import Settings\n\nSelect a previously exported settings file to restore your configuration.\n\n⚠️ This will overwrite your current settings.')
  }

  const resetToDefaults = () => {
    if (confirm('⚠️ Reset to Defaults\n\nThis will reset all settings to their default values. This action cannot be undone.\n\nAre you sure you want to continue?')) {
      alert('🔄 Settings Reset\n\nAll settings have been reset to their default values.')
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-2">
              Settings & Configuration
            </h1>
            <p className="text-zinc-400">
              Customize your SolX Engine experience and manage your account preferences
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={exportSettings}
              className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button
              onClick={saveSettings}
              disabled={isSaving}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save All'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-zinc-900 rounded-xl p-1 overflow-x-auto">
        {[
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'security', label: 'Security', icon: Shield },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'api', label: 'API Keys', icon: Key },
          { id: 'preferences', label: 'Preferences', icon: Palette },
          { id: 'backup', label: 'Backup', icon: Database }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-400" />
              Profile Information
            </h3>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Username</label>
                  <input
                    type="text"
                    value={userProfile.username}
                    onChange={(e) => setUserProfile({...userProfile, username: e.target.value})}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Avatar URL</label>
                  <input
                    type="url"
                    value={userProfile.avatar}
                    onChange={(e) => setUserProfile({...userProfile, avatar: e.target.value})}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <h4 className="text-white font-medium mb-3">Account Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Plan:</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        userProfile.plan === 'Enterprise' ? 'bg-purple-600 bg-opacity-20 text-purple-300' :
                        userProfile.plan === 'Pro' ? 'bg-blue-600 bg-opacity-20 text-blue-300' :
                        'bg-zinc-600 bg-opacity-20 text-zinc-300'
                      }`}>{userProfile.plan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Member Since:</span>
                      <span className="text-white">{userProfile.joinDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Wallet:</span>
                      <span className="text-white">{publicKey ? `${publicKey.toString().slice(0, 8)}...` : 'Not Connected'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <h4 className="text-white font-medium mb-3">Referral Program</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 text-sm">Your Code:</span>
                      <code className="bg-zinc-700 px-2 py-1 rounded text-purple-400 text-sm">{userProfile.referralCode}</code>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 text-sm">Referrals:</span>
                      <span className="text-white">12 users</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 text-sm">Earned:</span>
                      <span className="text-green-400">2.45 SOL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-green-400" />
              Security Settings
            </h3>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                    <p className="text-zinc-400 text-sm">Add an extra layer of security to your account</p>
                  </div>
                  <button
                    onClick={() => setSecurity({...security, twoFactorAuth: !security.twoFactorAuth})}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                      security.twoFactorAuth ? 'bg-green-600' : 'bg-zinc-600'
                    }`}
                  >
                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                      security.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Login Alerts</h4>
                    <p className="text-zinc-400 text-sm">Get notified of new login attempts</p>
                  </div>
                  <button
                    onClick={() => setSecurity({...security, loginAlerts: !security.loginAlerts})}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                      security.loginAlerts ? 'bg-green-600' : 'bg-zinc-600'
                    }`}
                  >
                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                      security.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    min="5"
                    max="1440"
                    value={security.sessionTimeout}
                    onChange={(e) => setSecurity({...security, sessionTimeout: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Allowed IP Addresses</label>
                  <div className="space-y-2">
                    {security.allowedIPs.map((ip, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={ip}
                          onChange={(e) => {
                            const newIPs = [...security.allowedIPs]
                            newIPs[idx] = e.target.value
                            setSecurity({...security, allowedIPs: newIPs})
                          }}
                          className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-green-500 text-sm"
                        />
                        <button
                          onClick={() => {
                            const newIPs = security.allowedIPs.filter((_, i) => i !== idx)
                            setSecurity({...security, allowedIPs: newIPs})
                          }}
                          className="text-red-400 hover:text-red-300 px-2"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => setSecurity({...security, allowedIPs: [...security.allowedIPs, '']})}
                      className="text-green-400 hover:text-green-300 text-sm"
                    >
                      + Add IP Address
                    </button>
                  </div>
                </div>

                <div className="bg-yellow-900 bg-opacity-20 border border-yellow-700 rounded-lg p-4">
                  <h4 className="text-yellow-300 font-medium mb-2">Security Recommendations</h4>
                  <ul className="text-yellow-200 text-sm space-y-1">
                    <li>• Enable 2FA for maximum security</li>
                    <li>• Use strong, unique passwords</li>
                    <li>• Regularly review login activity</li>
                    <li>• Keep your recovery phrases safe</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-yellow-400" />
              Notification Preferences
            </h3>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-white font-medium">Notification Channels</h4>
                {Object.entries(notifications).slice(0, 3).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h5 className="text-white capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h5>
                      <p className="text-zinc-400 text-sm">
                        {key === 'email' ? 'Receive notifications via email' :
                         key === 'push' ? 'Browser push notifications' :
                         'SMS text message notifications'}
                      </p>
                    </div>
                    <button
                      onClick={() => setNotifications({...notifications, [key]: !value})}
                      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                        value ? 'bg-yellow-600' : 'bg-zinc-600'
                      }`}
                    >
                      <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-medium">Alert Types</h4>
                {Object.entries(notifications).slice(3).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h5 className="text-white capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h5>
                      <p className="text-zinc-400 text-sm">
                        {key === 'priceAlerts' ? 'Token price movement alerts' :
                         key === 'portfolioAlerts' ? 'Portfolio performance updates' :
                         key === 'newsUpdates' ? 'Crypto market news and updates' :
                         'Promotional emails and offers'}
                      </p>
                    </div>
                    <button
                      onClick={() => setNotifications({...notifications, [key]: !value})}
                      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                        value ? 'bg-yellow-600' : 'bg-zinc-600'
                      }`}
                    >
                      <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* API Tab */}
      {activeTab === 'api' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Key className="w-5 h-5 mr-2 text-purple-400" />
              API Key Management
            </h3>
            
            <div className="text-center py-12">
              <Key className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400 text-lg">API Integration</p>
              <p className="text-zinc-500 text-sm mt-2 max-w-md mx-auto">
                Generate and manage API keys for programmatic access to SolX Engine features and data.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Palette className="w-5 h-5 mr-2 text-pink-400" />
              Application Preferences
            </h3>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Theme</label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                  >
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                    <option value="auto">Auto (System)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="zh">中文</option>
                    <option value="ja">日本語</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                    <option value="SOL">SOL (◎)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Timezone</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                  >
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                    <option value="Europe/London">London</option>
                    <option value="Europe/Berlin">Berlin</option>
                    <option value="Asia/Tokyo">Tokyo</option>
                    <option value="Asia/Shanghai">Shanghai</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backup Tab */}
      {activeTab === 'backup' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Database className="w-5 h-5 mr-2 text-cyan-400" />
              Backup & Restore
            </h3>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <h4 className="text-white font-medium mb-2">Export Settings</h4>
                  <p className="text-zinc-400 text-sm mb-4">
                    Download a backup of all your settings and preferences
                  </p>
                  <button
                    onClick={exportSettings}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Settings</span>
                  </button>
                </div>

                <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <h4 className="text-white font-medium mb-2">Import Settings</h4>
                  <p className="text-zinc-400 text-sm mb-4">
                    Restore settings from a previously exported backup file
                  </p>
                  <button
                    onClick={importSettings}
                    className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center space-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Import Settings</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                  <h4 className="text-white font-medium mb-2">Reset Settings</h4>
                  <p className="text-zinc-400 text-sm mb-4">
                    Reset all settings to their default values
                  </p>
                  <button
                    onClick={resetToDefaults}
                    className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-all"
                  >
                    Reset to Defaults
                  </button>
                </div>

                <div className="bg-blue-900 bg-opacity-20 border border-blue-700 rounded-lg p-4">
                  <h4 className="text-blue-300 font-medium mb-2">💡 Backup Tips</h4>
                  <ul className="text-blue-200 text-sm space-y-1">
                    <li>• Export settings regularly</li>
                    <li>• Store backups securely</li>
                    <li>• Include wallet preferences</li>
                    <li>• Backup before major updates</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Development Status */}
      <div className="mt-8 bg-purple-900 bg-opacity-30 border border-purple-700 rounded-lg p-4">
        <h4 className="text-purple-300 font-medium mb-2">🚧 Development Status</h4>
        <p className="text-purple-200 text-sm mb-2">
          Settings & Configuration system is in active development. Cloud sync and advanced preferences coming soon.
        </p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded">✅ Basic Settings</span>
          <span className="bg-yellow-900 bg-opacity-50 text-yellow-300 px-2 py-1 rounded">🚧 Cloud Sync</span>
          <span className="bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded">🔜 API Management</span>
          <span className="bg-purple-900 bg-opacity-50 text-purple-300 px-2 py-1 rounded">🔜 Advanced Security</span>
        </div>
      </div>
    </div>
  )
}
