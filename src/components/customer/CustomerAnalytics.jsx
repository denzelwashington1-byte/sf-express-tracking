import { BarChart3, TrendingUp, Package, Clock, DollarSign, Leaf, ArrowUpRight, ArrowDownRight } from 'lucide-react'

export default function CustomerAnalytics() {
  const stats = [
    { label: 'Total Shipments', value: '1,247', icon: Package, change: '+12%', trend: 'up' },
    { label: 'Avg Delivery Time', value: '2.4h', icon: Clock, change: '-8%', trend: 'down' },
    { label: 'Total Spent', value: '$12,847', icon: DollarSign, change: '+15%', trend: 'up' },
    { label: 'CO2 Saved', value: '347 kg', icon: Leaf, change: '+22%', trend: 'up' },
  ]

  const monthlyData = [
    { month: 'Aug', shipments: 89, cost: 1247, onTime: 94 },
    { month: 'Sep', shipments: 102, cost: 1456, onTime: 96 },
    { month: 'Oct', shipments: 118, cost: 1678, onTime: 95 },
    { month: 'Nov', shipments: 134, cost: 1892, onTime: 97 },
    { month: 'Dec', shipments: 156, cost: 2134, onTime: 98 },
    { month: 'Jan', shipments: 147, cost: 1847, onTime: 96 },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold neon-text flex items-center gap-2">
        <BarChart3 className="w-6 h-6" />
        Analytics Dashboard
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="glass rounded-xl p-6 neon-border">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-neon-blue/20 rounded-lg">
                <stat.icon className="w-6 h-6 text-neon-blue" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stat.trend === 'up' && stat.label !== 'Avg Delivery Time' ? 'text-neon-green' :
                stat.trend === 'down' ? 'text-neon-green' : 'text-red-400'
              }`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span>{stat.change}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Monthly Chart */}
      <div className="glass rounded-xl p-6 neon-border">
        <h3 className="text-xl font-bold mb-4">Monthly Overview</h3>
        <div className="space-y-4">
          {monthlyData.map((data) => (
            <div key={data.month} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{data.month}</span>
                <div className="flex gap-4">
                  <span className="text-neon-blue">{data.shipments} shipments</span>
                  <span className="text-neon-purple">${data.cost}</span>
                  <span className="text-neon-green">{data.onTime}% on-time</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-2 bg-dark-surface rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neon-blue transition-all"
                    style={{ width: `${(data.shipments / 156) * 100}%` }}
                  />
                </div>
                <div className="h-2 bg-dark-surface rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neon-purple transition-all"
                    style={{ width: `${(data.cost / 2134) * 100}%` }}
                  />
                </div>
                <div className="h-2 bg-dark-surface rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neon-green transition-all"
                    style={{ width: `${data.onTime}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-6 mt-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-neon-blue rounded-full" />
            <span className="text-gray-400">Shipments</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-neon-purple rounded-full" />
            <span className="text-gray-400">Cost</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-neon-green rounded-full" />
            <span className="text-gray-400">On-Time Rate</span>
          </div>
        </div>
      </div>

      {/* Service Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-6 neon-border">
          <h3 className="text-xl font-bold mb-4">Service Usage</h3>
          <div className="space-y-4">
            {[
              { service: 'Standard Drone', percentage: 45, count: 561 },
              { service: 'Express Drone', percentage: 28, count: 349 },
              { service: 'Ground Bot', percentage: 18, count: 224 },
              { service: 'Hyperloop Tube', percentage: 9, count: 113 },
            ].map((item) => (
              <div key={item.service} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.service}</span>
                  <span className="text-gray-400">{item.count} shipments</span>
                </div>
                <div className="h-2 bg-dark-surface rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-neon-blue to-neon-purple transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl p-6 neon-border">
          <h3 className="text-xl font-bold mb-4">Top Destinations</h3>
          <div className="space-y-4">
            {[
              { destination: 'Tokyo, Japan', count: 234, percentage: 19 },
              { destination: 'London, UK', count: 198, percentage: 16 },
              { destination: 'Singapore', count: 167, percentage: 13 },
              { destination: 'Seoul, South Korea', count: 145, percentage: 12 },
              { destination: 'Berlin, Germany', count: 128, percentage: 10 },
            ].map((item) => (
              <div key={item.destination} className="flex items-center justify-between p-3 bg-dark-surface/50 rounded-lg">
                <div>
                  <p className="font-semibold">{item.destination}</p>
                  <p className="text-sm text-gray-400">{item.count} shipments</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-neon-blue">{item.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="glass rounded-xl p-6 neon-border">
        <h3 className="text-xl font-bold mb-4 neon-purple-text">AI-Powered Insights</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-dark-surface/50 rounded-lg">
            <h4 className="font-semibold mb-2 text-neon-green">Cost Optimization</h4>
            <p className="text-sm text-gray-400">Switch 15% of shipments to ground bots to save $847 monthly</p>
          </div>
          <div className="p-4 bg-dark-surface/50 rounded-lg">
            <h4 className="font-semibold mb-2 text-neon-blue">Delivery Speed</h4>
            <p className="text-sm text-gray-400">Your average delivery time is 18% faster than industry average</p>
          </div>
          <div className="p-4 bg-dark-surface/50 rounded-lg">
            <h4 className="font-semibold mb-2 text-neon-purple">Carbon Impact</h4>
            <p className="text-sm text-gray-400">You've saved 347 kg CO2 this month - equivalent to 16 trees</p>
          </div>
        </div>
      </div>
    </div>
  )
}
