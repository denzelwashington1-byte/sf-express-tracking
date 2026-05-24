import { Package, Users, Truck, Activity, TrendingUp, Clock } from 'lucide-react'

export default function AdminOverview() {
  const stats = [
    { label: 'Total Shipments', value: '12,847', icon: Package, change: '+12%', trend: 'up' },
    { label: 'Active Customers', value: '3,421', icon: Users, change: '+8%', trend: 'up' },
    { label: 'Drones in Flight', value: '284', icon: Truck, change: '+5%', trend: 'up' },
    { label: "Today's Deliveries", value: '1,892', icon: Activity, change: '+15%', trend: 'up' },
  ]

  const recentActivities = [
    { id: 1, type: 'delivery', message: 'Drone #DX-2847 delivered package to Tokyo', time: '2 min ago', status: 'completed' },
    { id: 2, type: 'alert', message: 'Weather delay detected in Sector 7', time: '5 min ago', status: 'warning' },
    { id: 3, type: 'new', message: 'New customer registered: TechCorp Industries', time: '12 min ago', status: 'info' },
    { id: 4, type: 'delivery', message: 'Ground bot #GB-192 completed route', time: '18 min ago', status: 'completed' },
    { id: 5, type: 'routing', message: 'AI re-optimized 47 routes for efficiency', time: '25 min ago', status: 'success' },
  ]

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="glass rounded-xl p-6 neon-border">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-neon-blue/20 rounded-lg">
                <stat.icon className="w-6 h-6 text-neon-blue" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-neon-green' : 'text-red-400'}`}>
                <TrendingUp className="w-4 h-4" />
                <span>{stat.change}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="glass rounded-xl p-6 neon-border">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-neon-blue" />
          Recent Activities
        </h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 p-4 bg-dark-surface/50 rounded-lg">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                activity.status === 'completed' ? 'bg-neon-green' :
                activity.status === 'warning' ? 'bg-yellow-400' :
                activity.status === 'success' ? 'bg-neon-blue' : 'bg-purple-400'
              }`} />
              <div className="flex-1">
                <p className="text-white">{activity.message}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3" />
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="glass rounded-xl p-6 neon-border">
        <h2 className="text-xl font-bold mb-4 neon-purple-text">AI-Powered Insights</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-dark-surface/50 rounded-lg">
            <h3 className="font-semibold mb-2 text-neon-green">Route Optimization</h3>
            <p className="text-sm text-gray-400">AI has optimized 234 routes today, saving 1,847 kg of CO2</p>
          </div>
          <div className="p-4 bg-dark-surface/50 rounded-lg">
            <h3 className="font-semibold mb-2 text-neon-blue">Predictive Demand</h3>
            <p className="text-sm text-gray-400">Expected 15% increase in deliveries for Tokyo sector in next 2 hours</p>
          </div>
          <div className="p-4 bg-dark-surface/50 rounded-lg">
            <h3 className="font-semibold mb-2 text-neon-purple">Fleet Status</h3>
            <p className="text-sm text-gray-400">94% of autonomous vehicles operational, 6% charging</p>
          </div>
        </div>
      </div>
    </div>
  )
}
