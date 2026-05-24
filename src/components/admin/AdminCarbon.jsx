import { Leaf, TrendingUp, Tree, Zap, Globe, Award } from 'lucide-react'

export default function AdminCarbon() {
  const stats = [
    { label: 'CO2 Saved Today', value: '1,847 kg', icon: Leaf, change: '+12%', trend: 'up' },
    { label: 'Trees Equivalent', value: '84 trees', icon: Tree, change: '+8%', trend: 'up' },
    { label: 'Green Routes', value: '94%', icon: Zap, change: '+5%', trend: 'up' },
    { label: 'Carbon Offset', value: '2,341 tons', icon: Globe, change: '+15%', trend: 'up' },
  ]

  const topPerformers = [
    { name: 'TechCorp Industries', co2Saved: '347 kg', greenRoutes: 98, rank: 1 },
    { name: 'EcoShip Solutions', co2Saved: '289 kg', greenRoutes: 96, rank: 2 },
    { name: 'Future Retail Inc', co2Saved: '234 kg', greenRoutes: 94, rank: 3 },
    { name: 'Global Logistics Ltd', co2Saved: '198 kg', greenRoutes: 92, rank: 4 },
    { name: 'Quantum Systems', co2Saved: '167 kg', greenRoutes: 90, rank: 5 },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold neon-text flex items-center gap-2">
        <Leaf className="w-6 h-6 text-neon-green" />
        Carbon Footprint Tracking
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="glass rounded-xl p-6 neon-border">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-neon-green/20 rounded-lg">
                <stat.icon className="w-6 h-6 text-neon-green" />
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

      {/* Carbon Reduction Chart */}
      <div className="glass rounded-xl p-6 neon-border">
        <h3 className="text-xl font-bold mb-4">Monthly Carbon Reduction</h3>
        <div className="space-y-4">
          {[
            { month: 'January', saved: 1247, target: 1000 },
            { month: 'February', saved: 1456, target: 1000 },
            { month: 'March', saved: 1678, target: 1000 },
            { month: 'April', saved: 1534, target: 1000 },
            { month: 'May', saved: 1847, target: 1000 },
          ].map((item) => (
            <div key={item.month} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{item.month}</span>
                <span className="font-semibold text-neon-green">{item.saved} kg saved</span>
              </div>
              <div className="h-4 bg-dark-surface rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-neon-green to-neon-blue transition-all"
                  style={{ width: `${Math.min((item.saved / item.target) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performers */}
      <div className="glass rounded-xl p-6 neon-border">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-neon-purple" />
          Top Green Partners
        </h3>
        <div className="space-y-4">
          {topPerformers.map((performer) => (
            <div key={performer.name} className="flex items-center justify-between p-4 bg-dark-surface/50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  performer.rank === 1 ? 'bg-yellow-400 text-dark-bg' :
                  performer.rank === 2 ? 'bg-gray-300 text-dark-bg' :
                  performer.rank === 3 ? 'bg-orange-400 text-dark-bg' : 'bg-dark-surface text-gray-400'
                }`}>
                  {performer.rank}
                </div>
                <div>
                  <p className="font-semibold">{performer.name}</p>
                  <p className="text-sm text-gray-400">{performer.greenRoutes}% green routes</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-neon-green">{performer.co2Saved}</p>
                <p className="text-sm text-gray-400">CO2 saved</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="glass rounded-xl p-6 neon-border">
        <h3 className="text-xl font-bold mb-4 neon-purple-text">AI Sustainability Recommendations</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-dark-surface/50 rounded-lg">
            <h4 className="font-semibold mb-2 text-neon-green">Route Optimization</h4>
            <p className="text-sm text-gray-400">Switch 23 routes to electric ground bots to save 156 kg CO2 daily</p>
          </div>
          <div className="p-4 bg-dark-surface/50 rounded-lg">
            <h4 className="font-semibold mb-2 text-neon-blue">Packaging</h4>
            <p className="text-sm text-gray-400">Recommend biodegradable packaging for 47 customers to reduce waste by 34%</p>
          </div>
          <div className="p-4 bg-dark-surface/50 rounded-lg">
            <h4 className="font-semibold mb-2 text-neon-purple">Charging Schedule</h4>
            <p className="text-sm text-gray-400">Optimize drone charging during renewable energy peak hours</p>
          </div>
        </div>
      </div>
    </div>
  )
}
