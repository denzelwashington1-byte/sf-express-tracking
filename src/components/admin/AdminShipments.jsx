import { useState } from 'react'
import { Search, Filter, Plus, Eye, Edit, Truck, Package } from 'lucide-react'

export default function AdminShipments() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  
  const shipments = [
    { id: 'SF-2062-001234', customer: 'TechCorp Industries', from: 'San Francisco', to: 'Tokyo', status: 'in-transit', vehicle: 'Drone #DX-2847', eta: '2h 34m' },
    { id: 'SF-2062-001235', customer: 'Global Logistics Ltd', from: 'New York', to: 'London', status: 'delivered', vehicle: 'Ground Bot #GB-192', eta: 'Delivered' },
    { id: 'SF-2062-001236', customer: 'Future Retail Inc', from: 'Los Angeles', to: 'Singapore', status: 'processing', vehicle: 'Pending', eta: '4h 12m' },
    { id: 'SF-2062-001237', customer: 'Quantum Systems', from: 'Seattle', to: 'Seoul', status: 'in-transit', vehicle: 'Tube Transport', eta: '1h 45m' },
    { id: 'SF-2062-001238', customer: 'EcoShip Solutions', from: 'Chicago', to: 'Berlin', status: 'delayed', vehicle: 'Drone #DX-2901', eta: 'Delayed' },
  ]

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = 
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-neon-green/20 text-neon-green'
      case 'in-transit': return 'bg-neon-blue/20 text-neon-blue'
      case 'processing': return 'bg-purple-400/20 text-purple-400'
      case 'delayed': return 'bg-red-400/20 text-red-400'
      default: return 'bg-gray-400/20 text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold neon-text">Shipment Management</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-neon-blue text-dark-bg font-semibold rounded-lg hover:bg-neon-blue/80 transition-all">
          <Plus className="w-4 h-4" />
          Create Shipment
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search shipments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 glass rounded-lg focus:border-neon-blue focus:outline-none transition-colors"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 glass rounded-lg focus:border-neon-blue focus:outline-none transition-colors"
        >
          <option value="all">All Status</option>
          <option value="processing">Processing</option>
          <option value="in-transit">In Transit</option>
          <option value="delivered">Delivered</option>
          <option value="delayed">Delayed</option>
        </select>
      </div>

      {/* Shipments Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredShipments.map((shipment) => (
          <div key={shipment.id} className="glass rounded-xl p-6 neon-border hover:bg-white/5 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-neon-blue" />
                <span className="font-semibold">{shipment.id}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(shipment.status)}`}>
                {shipment.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Customer</p>
                <p className="font-semibold">{shipment.customer}</p>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-400">From</p>
                  <p className="font-semibold">{shipment.from}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">To</p>
                  <p className="font-semibold">{shipment.to}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Truck className="w-4 h-4 text-neon-purple" />
                <span className="text-gray-400">{shipment.vehicle}</span>
              </div>
              <div>
                <p className="text-sm text-gray-400">ETA</p>
                <p className="font-semibold text-neon-green">{shipment.eta}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-neon-blue/20 text-neon-blue rounded-lg hover:bg-neon-blue/30 transition-colors">
                <Eye className="w-4 h-4" />
                View
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Edit className="w-4 h-4" />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
