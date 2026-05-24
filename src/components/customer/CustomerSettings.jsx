import { useState } from 'react'
import { Settings, User, Bell, MapPin, CreditCard, Shield, Globe, Save, Crown } from 'lucide-react'
import SubscriptionTiers from '../SubscriptionTiers'

export default function CustomerSettings() {
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'addresses', icon: MapPin, label: 'Addresses' },
    { id: 'billing', icon: CreditCard, label: 'Billing' },
    { id: 'subscription', icon: Crown, label: 'Subscription' },
    { id: 'security', icon: Shield, label: 'Security' },
    { id: 'integrations', icon: Globe, label: 'Integrations' },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold neon-text flex items-center gap-2">
        <Settings className="w-6 h-6" />
        Settings
      </h2>

      <div className="flex gap-6">
        {/* Settings Sidebar */}
        <aside className="w-64 glass rounded-xl p-4 neon-border h-fit">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id 
                    ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Settings Content */}
        <main className="flex-1 glass rounded-xl p-6 neon-border">
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'addresses' && <AddressSettings />}
          {activeTab === 'billing' && <BillingSettings />}
          {activeTab === 'subscription' && <SubscriptionTiers />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'integrations' && <IntegrationSettings />}
        </main>
      </div>
    </div>
  )
}

function ProfileSettings() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4">Profile Settings</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            defaultValue="John Doe"
            className="w-full px-4 py-3 bg-dark-surface border border-white/10 rounded-lg focus:border-neon-blue focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            defaultValue="john.doe@company.com"
            className="w-full px-4 py-3 bg-dark-surface border border-white/10 rounded-lg focus:border-neon-blue focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input
            type="tel"
            defaultValue="+1-555-0100"
            className="w-full px-4 py-3 bg-dark-surface border border-white/10 rounded-lg focus:border-neon-blue focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Company</label>
          <input
            type="text"
            defaultValue="TechCorp Industries"
            className="w-full px-4 py-3 bg-dark-surface border border-white/10 rounded-lg focus:border-neon-blue focus:outline-none transition-colors"
          />
        </div>
      </div>

      <button className="flex items-center gap-2 px-6 py-3 bg-neon-blue text-dark-bg font-bold rounded-lg hover:bg-neon-blue/80 transition-all">
        <Save className="w-4 h-4" />
        Save Changes
      </button>
    </div>
  )
}

function NotificationSettings() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4">Notification Preferences</h3>
      
      <div className="space-y-4">
        {[
          { label: 'Email notifications for shipment updates', checked: true },
          { label: 'SMS notifications for delivery alerts', checked: true },
          { label: 'Push notifications for real-time tracking', checked: false },
          { label: 'Weekly analytics summary', checked: true },
          { label: 'Marketing emails and promotions', checked: false },
        ].map((item, index) => (
          <label key={index} className="flex items-center justify-between p-4 bg-dark-surface/50 rounded-lg cursor-pointer">
            <span className="text-sm">{item.label}</span>
            <input
              type="checkbox"
              defaultChecked={item.checked}
              className="w-5 h-5 rounded"
            />
          </label>
        ))}
      </div>

      <button className="flex items-center gap-2 px-6 py-3 bg-neon-blue text-dark-bg font-bold rounded-lg hover:bg-neon-blue/80 transition-all">
        <Save className="w-4 h-4" />
        Save Changes
      </button>
    </div>
  )
}

function AddressSettings() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4">Saved Addresses</h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-dark-surface/50 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-semibold">San Francisco Office</p>
              <p className="text-sm text-gray-400">123 Tech Street, San Francisco, CA 94102</p>
            </div>
            <span className="px-2 py-1 bg-neon-blue/20 text-neon-blue text-xs rounded">Default</span>
          </div>
          <div className="flex gap-2 mt-3">
            <button className="text-sm text-neon-blue hover:underline">Edit</button>
            <button className="text-sm text-gray-400 hover:underline">Delete</button>
          </div>
        </div>
        <div className="p-4 bg-dark-surface/50 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-semibold">Los Angeles Warehouse</p>
              <p className="text-sm text-gray-400">456 Logistics Ave, Los Angeles, CA 90001</p>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <button className="text-sm text-neon-blue hover:underline">Edit</button>
            <button className="text-sm text-gray-400 hover:underline">Delete</button>
            <button className="text-sm text-neon-green hover:underline">Set as Default</button>
          </div>
        </div>
      </div>

      <button className="flex items-center gap-2 px-6 py-3 glass rounded-lg hover:bg-white/10 transition-all">
        Add New Address
      </button>
    </div>
  )
}

function BillingSettings() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4">Billing Information</h3>
      
      <div className="p-4 bg-dark-surface/50 rounded-lg">
        <p className="text-sm text-gray-400 mb-2">Current Plan</p>
        <p className="font-bold text-xl mb-1">Enterprise</p>
        <p className="text-sm text-gray-400">Unlimited shipments with priority support</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Card Number</label>
          <input
            type="text"
            placeholder="•••• •••• •••• 4242"
            className="w-full px-4 py-3 bg-dark-surface border border-white/10 rounded-lg focus:border-neon-blue focus:outline-none transition-colors"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Expiry Date</label>
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full px-4 py-3 bg-dark-surface border border-white/10 rounded-lg focus:border-neon-blue focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">CVV</label>
            <input
              type="text"
              placeholder="•••"
              className="w-full px-4 py-3 bg-dark-surface border border-white/10 rounded-lg focus:border-neon-blue focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      <button className="flex items-center gap-2 px-6 py-3 bg-neon-blue text-dark-bg font-bold rounded-lg hover:bg-neon-blue/80 transition-all">
        <Save className="w-4 h-4" />
        Save Changes
      </button>
    </div>
  )
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4">Security Settings</h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-dark-surface/50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Two-Factor Authentication</p>
              <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
            </div>
            <button className="px-4 py-2 bg-neon-green/20 text-neon-green rounded-lg hover:bg-neon-green/30 transition-all">
              Enabled
            </button>
          </div>
        </div>
        <div className="p-4 bg-dark-surface/50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Biometric Authentication</p>
              <p className="text-sm text-gray-400">Use fingerprint or face recognition for login</p>
            </div>
            <button className="px-4 py-2 glass rounded-lg hover:bg-white/10 transition-all">
              Setup
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Change Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full px-4 py-3 bg-dark-surface border border-white/10 rounded-lg focus:border-neon-blue focus:outline-none transition-colors"
          />
        </div>
      </div>

      <button className="flex items-center gap-2 px-6 py-3 bg-neon-blue text-dark-bg font-bold rounded-lg hover:bg-neon-blue/80 transition-all">
        <Save className="w-4 h-4" />
        Save Changes
      </button>
    </div>
  )
}

function IntegrationSettings() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4">Integrations</h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-dark-surface/50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">ERP System</p>
              <p className="text-sm text-gray-400">Connect with your enterprise resource planning system</p>
            </div>
            <button className="px-4 py-2 glass rounded-lg hover:bg-white/10 transition-all">
              Connect
            </button>
          </div>
        </div>
        <div className="p-4 bg-dark-surface/50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">E-commerce Platform</p>
              <p className="text-sm text-gray-400">Auto-import orders from your online store</p>
            </div>
            <button className="px-4 py-2 bg-neon-green/20 text-neon-green rounded-lg">
              Connected
            </button>
          </div>
        </div>
        <div className="p-4 bg-dark-surface/50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">API Access</p>
              <p className="text-sm text-gray-400">Generate API keys for custom integrations</p>
            </div>
            <button className="px-4 py-2 glass rounded-lg hover:bg-white/10 transition-all">
              Manage Keys
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
