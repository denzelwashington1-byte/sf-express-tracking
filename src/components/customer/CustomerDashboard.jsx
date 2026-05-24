import { useState } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { 
  Package, 
  Plus, 
  Map, 
  Activity, 
  Settings, 
  LogOut,
  BarChart3,
  Truck,
  Globe,
  Leaf
} from 'lucide-react'
import VoiceCommand from '../VoiceCommand'
import AIChatbot from '../AIChatbot'
import NeuralInterface from '../NeuralInterface'

export default function CustomerDashboard({ user, onLogout }) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')

  const handleVoiceCommand = (command) => {
    switch (command) {
      case 'create-shipment':
        navigate('/customer/create')
        setActiveTab('create')
        break
      case 'tracking':
        navigate('/customer/tracking')
        setActiveTab('tracking')
        break
      case 'dashboard':
        navigate('/customer/dashboard')
        setActiveTab('dashboard')
        break
      case 'analytics':
        navigate('/customer/analytics')
        setActiveTab('analytics')
        break
      case 'settings':
        navigate('/customer/settings')
        setActiveTab('settings')
        break
      default:
        break
    }
  }

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard', path: '/customer/dashboard' },
    { id: 'create', icon: Plus, label: 'Create Shipment', path: '/customer/create' },
    { id: 'bulk-upload', icon: Package, label: 'Bulk Upload', path: '/customer/bulk-upload' },
    { id: 'shipments', icon: Package, label: 'My Shipments', path: '/customer/shipments' },
    { id: 'tracking', icon: Map, label: 'Live Tracking', path: '/customer/tracking' },
    { id: 'analytics', icon: Activity, label: 'Analytics', path: '/customer/analytics' },
    { id: 'carbon', icon: Leaf, label: 'Carbon Footprint', path: '/customer/carbon' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/customer/settings' },
  ]

  return (
    <div className="min-h-screen bg-dark-bg flex">
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-white/10 p-6 fixed h-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-neon-blue rounded-lg flex items-center justify-center">
            <Package className="w-6 h-6 text-dark-bg" />
          </div>
          <div>
            <h2 className="font-bold neon-text">SF Express 2062</h2>
            <p className="text-xs text-gray-400">Customer Portal</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id 
                  ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 neon-text">Customer Dashboard</h1>
          <p className="text-gray-400">Welcome back, {user?.name || 'Customer'}</p>
        </div>

        <Outlet />
      </main>

      <VoiceCommand onCommand={handleVoiceCommand} />
      <AIChatbot />
      <NeuralInterface />
    </div>
  )
}
