import { useState } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { 
  Users, 
  Package, 
  Activity, 
  Link as LinkIcon, 
  Settings, 
  LogOut,
  BarChart3,
  Truck,
  Map,
  Globe,
  Shield,
  Link,
  Wrench
} from 'lucide-react'

export default function AdminDashboard({ user, onLogout }) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  const menuItems = [
    { id: 'overview', icon: BarChart3, label: 'Overview', path: '/admin/dashboard' },
    { id: 'customers', icon: Users, label: 'Customers', path: '/admin/customers' },
    { id: 'shipments', icon: Package, label: 'Shipments', path: '/admin/shipments' },
    { id: 'activities', icon: Activity, label: 'Activities', path: '/admin/activities' },
    { id: 'tracking', icon: LinkIcon, label: 'Tracking Links', path: '/admin/tracking' },
    { id: 'drones', icon: Truck, label: 'Drone Fleet', path: '/admin/drones' },
    { id: 'map', icon: Map, label: 'Live Map', path: '/admin/map' },
    { id: 'carbon', icon: Globe, label: 'Carbon Footprint', path: '/admin/carbon' },
    { id: 'blockchain', icon: Link, label: 'Blockchain', path: '/admin/blockchain' },
    { id: 'maintenance', icon: Wrench, label: 'Maintenance', path: '/admin/maintenance' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/admin/settings' },
  ]

  return (
    <div className="min-h-screen bg-dark-bg flex">
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-white/10 p-6 fixed h-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-neon-blue rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-dark-bg" />
          </div>
          <div>
            <h2 className="font-bold neon-text">Admin Panel</h2>
            <p className="text-xs text-gray-400">SF Express 2062</p>
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
          <h1 className="text-3xl font-bold mb-2 neon-text">Admin Dashboard</h1>
          <p className="text-gray-400">Welcome back, {user?.name || 'Admin'}</p>
        </div>

        <Outlet />
      </main>
    </div>
  )
}
