import { Activity, Clock, CheckCircle, AlertTriangle, Info, TrendingUp } from 'lucide-react'

export default function AdminActivities() {
  const activities = [
    { id: 1, type: 'delivery', icon: CheckCircle, message: 'Drone #DX-2847 delivered package SF-2062-001234 to Tokyo', time: '2 min ago', user: 'System', status: 'success' },
    { id: 2, type: 'alert', icon: AlertTriangle, message: 'Weather delay detected in Sector 7 - 12 shipments affected', time: '5 min ago', user: 'AI System', status: 'warning' },
    { id: 3, type: 'new', icon: Info, message: 'New customer registered: TechCorp Industries', time: '12 min ago', user: 'Admin', status: 'info' },
    { id: 4, type: 'delivery', icon: CheckCircle, message: 'Ground bot #GB-192 completed route in New York', time: '18 min ago', user: 'System', status: 'success' },
    { id: 5, type: 'routing', icon: TrendingUp, message: 'AI re-optimized 47 routes for efficiency - saved 847 kg CO2', time: '25 min ago', user: 'AI System', status: 'success' },
    { id: 6, type: 'alert', icon: AlertTriangle, message: 'Drone #DX-2901 battery low - rerouting to charging station', time: '32 min ago', user: 'System', status: 'warning' },
    { id: 7, type: 'delivery', icon: CheckCircle, message: 'Tube transport delivered package SF-2062-001237 to Seoul', time: '45 min ago', user: 'System', status: 'success' },
    { id: 8, type: 'new', icon: Info, message: 'Shipment SF-2062-001239 created by Global Logistics Ltd', time: '1 hour ago', user: 'Customer', status: 'info' },
    { id: 9, type: 'routing', icon: TrendingUp, message: 'Predictive demand spike detected for Tokyo sector', time: '1 hour ago', user: 'AI System', status: 'info' },
    { id: 10, type: 'delivery', icon: CheckCircle, message: 'Autonomous truck AT-882 completed cross-country delivery', time: '2 hours ago', user: 'System', status: 'success' },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'bg-neon-green/20 text-neon-green'
      case 'warning': return 'bg-yellow-400/20 text-yellow-400'
      case 'info': return 'bg-neon-blue/20 text-neon-blue'
      default: return 'bg-gray-400/20 text-gray-400'
    }
  }

  const getIconColor = (status) => {
    switch (status) {
      case 'success': return 'text-neon-green'
      case 'warning': return 'text-yellow-400'
      case 'info': return 'text-neon-blue'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold neon-text flex items-center gap-2">
          <Activity className="w-6 h-6" />
          Activity Log
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-white/10 transition-all">
          Export Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass rounded-lg p-4">
          <div className="text-2xl font-bold text-neon-green">1,247</div>
          <div className="text-sm text-gray-400">Successful Deliveries Today</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-400">23</div>
          <div className="text-sm text-gray-400">Warnings/Alerts</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-2xl font-bold text-neon-blue">847</div>
          <div className="text-sm text-gray-400">CO2 Saved (kg)</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-2xl font-bold text-neon-purple">94%</div>
          <div className="text-sm text-gray-400">Fleet Efficiency</div>
        </div>
      </div>

      {/* Activities List */}
      <div className="glass rounded-xl p-6 neon-border">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 p-4 bg-dark-surface/50 rounded-lg hover:bg-white/5 transition-colors">
              <div className={`p-2 rounded-lg ${getStatusColor(activity.status)}`}>
                <activity.icon className={`w-5 h-5 ${getIconColor(activity.status)}`} />
              </div>
              <div className="flex-1">
                <p className="text-white">{activity.message}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {activity.time}
                  </span>
                  <span>by {activity.user}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(activity.status)}`}>
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
