import { Leaf, TrendingUp, Tree, Globe, Award, Zap } from 'lucide-react'

export default function CustomerCarbon() {
  const stats = [
    { label: 'CO2 Saved', value: '347 kg', icon: Leaf, change: '+22%', trend: 'up' },
    { label: 'Trees Equivalent', value: '16 trees', icon: Tree, change: '+18%', trend: 'up' },
    { label: 'Green Routes', value: '89%', icon: Globe, change: '+5%', trend: 'up' },
    { label: 'Carbon Offset', value: '12 tons', icon: Award, change: '+15%', trend: 'up' },
  ]

  const shipments = [
    { id: 'SF-2062-001234', route: 'San Francisco → Tokyo', co2: '0.5 kg', saved: '2.3 kg', green: true },
    { id: 'SF-2062-001235', route: 'New York → London', co2: '0.3 kg', saved: '1.8 kg', green: true },
    { id: 'SF-2062-001236', route: 'Los Angeles → Singapore', co2: '0.8 kg', saved: '1.2 kg', green: false },
    { id: 'SF-2062-001237', route: 'Seattle → Seoul', co2: '0.4 kg', saved: '2.1 kg', green: true },
    { id: 'SF-2062-001238', route: 'Chicago → Berlin', co2: '0.6 kg', saved: '1.5 kg', green: true },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold neon-text flex items-center gap-2">
        <Leaf className="w-6 h-6 text-neon-green" />
        Carbon Footprint
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

      {/* Carbon Impact Chart */}
      <div className="glass rounded-xl p-6 neon-border">
        <h3 className="text-xl font-bold mb-4">Monthly Carbon Impact</h3>
        <div className="space-y-4">
          {[
            { month: 'August', saved: 234, emitted: 456 },
            { month: 'September', saved: 289, emitted: 423 },
            { month: 'October', saved: 312, emitted: 398 },
            { month: 'November', saved: 334, emitted: 378 },
            { month: 'December', saved: 356, emitted: 367 },
            { month: 'January', saved: 347, emitted: 372 },
          ].map((item) => (
            <div key={item.month} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{item.month}</span>
                <div className="flex gap-4">
                  <span className="text-neon-green">{item.saved} kg saved</span>
                  <span className="text-red-400">{item.emitted} kg emitted</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-3 bg-dark-surface rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neon-green transition-all"
                    style={{ width: `${(item.saved / 356) * 100}%` }}
                  />
                </div>
                <div className="h-3 bg-dark-surface rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-400 transition-all"
                    style={{ width: `${(item.emitted / 456) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-6 mt-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-neon-green rounded-full" />
            <span className="text-gray-400">CO2 Saved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-full" />
            <span className="text-gray-400">CO2 Emitted</span>
          </div>
        </div>
      </div>

      {/* Shipment Carbon Breakdown */}
      <div className="glass rounded-xl p-6 neon-border">
        <h3 className="text-xl font-bold mb-4">Recent Shipments Carbon Impact</h3>
        <div className="space-y-4">
          {shipments.map((shipment) => (
            <div key={shipment.id} className="flex items-center justify-between p-4 bg-dark-surface/50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${shipment.green ? 'bg-neon-green' : 'bg-yellow-400'}`} />
                <div>
                  <p className="font-semibold">{shipment.id}</p>
                  <p className="text-sm text-gray-400">{shipment.route}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Emitted</p>
                    <p className="font-semibold text-red-400">{shipment.co2}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Saved</p>
                    <p className="font-semibold text-neon-green">{shipment.saved}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Eco Recommendations */}
      <div className="glass rounded-xl p-6 neon-border">
        <h3 className="text-xl font-bold mb-4 neon-purple-text flex items-center gap-2">
          <Zap className="w-5 h-5" />
          AI Eco Recommendations
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-dark-surface/50 rounded-lg">
            <h4 className="font-semibold mb-2 text-neon-green">Route Optimization</h4>
            <p className="text-sm text-gray-400">Switch 8 shipments to ground bots to save 45 kg CO2 this month</p>
          </div>
          <div className="p-4 bg-dark-surface/50 rounded-lg">
            <h4 className="font-semibold mb-2 text-neon-blue">Packaging</h4>
            <p className="text-sm text-gray-400">Use eco-friendly packaging for 23% more shipments to reduce waste</p>
          </div>
          <div className="p-4 bg-dark-surface/50 rounded-lg">
            <h4 className="font-semibold mb-2 text-neon-purple">Timing</h4>
            <p className="text-sm text-gray-400">Schedule deliveries during renewable energy peak hours</p>
          </div>
        </div>
      </div>

      {/* Carbon Offset Program */}
      <div className="glass rounded-xl p-6 neon-border">
        <h3 className="text-xl font-bold mb-4">Carbon Offset Program</h3>
        <div className="flex items-center justify-between p-6 bg-neon-green/20 rounded-lg">
          <div>
            <h4 className="font-bold text-neon-green text-xl mb-2">You're a Green Partner!</h4>
            <p className="text-gray-400">Your shipments have saved 347 kg of CO2 this month. You're in the top 15% of eco-conscious shippers.</p>
          </div>
          <div className="text-right">
            <Award className="w-16 h-16 text-neon-green mx-auto mb-2" />
            <p className="text-sm text-gray-400">Green Badge Earned</p>
          </div>
        </div>
      </div>
    </div>
  )
}
