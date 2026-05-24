import { useState } from 'react'
import { Settings, Users, Package, MapPin, Bell, Shield, Globe, Save } from 'lucide-react'

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general')

  const tabs = [
    { id: 'general', icon: Settings, label: 'General' },
    { id: 'users', icon: Users, label: 'User Management' },
    { id: 'shipments', icon: Package, label: 'Shipment Settings' },
    { id: 'locations', icon: MapPin, label: 'Locations' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'security', icon: Shield, label: 'Security' },
    { id: 'integrations', icon: Globe, label: 'Integrations' },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold neon-text flex items-center gap-2">
        <Settings className="w-6 h-6" />
        Admin Settings
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
          {activeTab === 'general' && <GeneralSettings />}
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'shipments' && <ShipmentSettings />}
          {activeTab === 'locations' && <LocationSettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'integrations' && <IntegrationSettings />}
        </main>
      </div>
    </div>
  )
}

function GeneralSettings() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4">General Settings</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Company Name</label>
          <input
            type="text"
            defaultValue="SF Express 2062"
            className="w-full px-4 py-3 bg-dark-surface border border-white/10 rounded-lg focus:border-neon-blue focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Timezone</label>
          <select className="w-full px-4 py-3 bg-dark-surface border border-white/10 rounded-lg focus:border-neon-blue focus:outline-none transition-colors">
            <option>UTC</option>
            <option>America/New_York</option>
            <option>Europe/London</option>
            <option>Asia/Tokyo</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Default Currency</label>
          <select className="w-full px-4 py-3 bg-dark-surface border border-white/10 rounded-lg focus:border-neon-blue focus:outline-none transition-colors">
            <option>USD</option>
            <option>EUR</option>
            <option>JPY</option>
            <option>CNY</option>
          </select>
        </div>
      </div>

      <button className="flex items-center gap-2 px-6 py-3 bg-neon-blue text-dark-bg font-bold rounded-lg hover:bg-neon-blue/80 transition-all">
        <Save className="w-4 h-4" />
        Save Changes
      </button>
    </div>
  )
}

function UserManagement() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4">User Management</h3>
      <p className="text-gray-400">Manage user roles, permissions, and groups.</p>
      <div className="p-4 bg-dark-surface/50 rounded-lg">
        <p className="text-sm text-gray-400">User management interface - Add, edit, remove users and manage their permissions.</p>
      </div>
    </div>
  )
}

function ShipmentSettings() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4">Shipment Settings</h3>
      <p className="text-gray-400">Configure default shipment options, packaging, and delivery preferences.</p>
      <div className="p-4 bg-dark-surface/50 rounded-lg">
        <p className="text-sm text-gray-400">Shipment settings interface - Configure delivery options, packaging rules, and service defaults.</p>
      </div>
    </div>
  )
}

function LocationSettings() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4">Location Settings</h3>
      <p className="text-gray-400">Manage hubs, charging stations, and delivery zones.</p>
      <div className="p-4 bg-dark-surface/50 rounded-lg">
        <p className="text-sm text-gray-400">Location settings interface - Add and manage physical locations in your network.</p>
      </div>
    </div>
  )
}

function NotificationSettings() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4">Notification Settings</h3>
      <p className="text-gray-400">Configure email, SMS, and push notification preferences.</p>
      <div className="p-4 bg-dark-surface/50 rounded-lg">
        <p className="text-sm text-gray-400">Notification settings interface - Configure how and when notifications are sent.</p>
      </div>
    </div>
  )
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4">Security Settings</h3>
      <p className="text-gray-400">Configure authentication, encryption, and access controls.</p>
      <div className="p-4 bg-dark-surface/50 rounded-lg">
        <p className="text-sm text-gray-400">Security settings interface - Manage 2FA, API keys, and security policies.</p>
      </div>
    </div>
  )
}

function IntegrationSettings() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4">Integration Settings</h3>
      <p className="text-gray-400">Manage third-party integrations and API connections.</p>
      <div className="p-4 bg-dark-surface/50 rounded-lg">
        <p className="text-sm text-gray-400">Integration settings interface - Connect with external services and APIs.</p>
      </div>
    </div>
  )
}
