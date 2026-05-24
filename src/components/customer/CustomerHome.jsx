import { Package, TrendingUp, Clock, MapPin, Zap, Leaf } from 'lucide-react'

export default function CustomerHome() {
  const stats = [
    { label: 'Active Shipments', value: '23', icon: Package, change: '+3', trend: 'up' },
    { label: 'Delivered This Month', value: '147', icon: TrendingUp, change: '+12%', trend: 'up' },
    { label: 'Pending Pickups', value: '5', icon: Clock, change: '-2', trend: 'down' },
    { label: 'CO2 Saved (kg)', value: '89', icon: Leaf, change: '+15%', trend: 'up' },
  ]

  const recentShipments = [
    { id: 'SF-2062-001234', to: 'Tokyo, Japan', status: 'in-transit', eta: '2h 34m', vehicle: 'Drone #DX-2847' },
    { id: 'SF-2062-001235', to: 'London, UK', status: 'delivered', eta: 'Delivered', vehicle: 'Ground Bot #GB-192' },
    { id: 'SF-2062-001236', to: 'Singapore', status: 'processing', eta: '4h 12m', vehicle: 'Pending' },
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

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <button className="glass rounded-xl p-6 neon-border hover:bg-white/5 transition-all text-left">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-neon-blue/20 rounded-lg">
              <Package className="w-5 h-5 text-neon-blue" />
            </div>
            <h3 className="font-bold">Create Shipment</h3>
          </div>
          <p className="text-sm text-gray-400">Start a new delivery with AI-optimized routing</p>
        </button>
        <button className="glass rounded-xl p-6 neon-border hover:bg-white/5 transition-all text-left">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-neon-purple/20 rounded-lg">
              <MapPin className="w-5 h-5 text-neon-purple" />
            </div>
            <h3 className="font-bold">Live Tracking</h3>
          </div>
          <p className="text-sm text-gray-400">View packages in real-time AR 3D space</p>
        </button>
        <button className="glass rounded-xl p-6 neon-border hover:bg-white/5 transition-all text-left">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-neon-green/20 rounded-lg">
              <Zap className="w-5 h-5 text-neon-green" />
            </div>
            <h3 className="font-bold">Quick Quote</h3>
          </div>
          <p className="text-sm text-gray-400">Get instant pricing with carbon impact</p>
        </button>
      </div>

      {/* Recent Shipments */}
      <div className="glass rounded-xl p-6 neon-border">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-neon-blue" />
          Recent Shipments
        </h2>
        <div className="space-y-4">
          {recentShipments.map((shipment) => (
            <div key={shipment.id} className="flex items-center justify-between p-4 bg-dark-surface/50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${
                  shipment.status === 'delivered' ? 'bg-neon-green' :
                  shipment.status === 'in-transit' ? 'bg-neon-blue' : 'bg-purple-400'
                }`} />
                <div>
                  <p className="font-semibold">{shipment.id}</p>
                  <p className="text-sm text-gray-400">{shipment.to}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">{shipment.vehicle}</p>
                <p className={`font-semibold ${
                  shipment.status === 'delivered' ? 'text-neon-green' : 'text-neon-blue'
                }`}>{shipment.eta}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
