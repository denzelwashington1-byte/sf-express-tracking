import { useState } from 'react'
import { Search, Filter, Package, Eye, Download, Share2 } from 'lucide-react'
import ExportReporting from '../ExportReporting'

export default function CustomerShipments() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  
  const shipments = [
    { id: 'SF-2062-001234', to: 'Tokyo, Japan', from: 'San Francisco, USA', status: 'in-transit', date: '2024-01-15', cost: '$45.00', vehicle: 'Drone #DX-2847' },
    { id: 'SF-2062-001235', to: 'London, UK', from: 'New York, USA', status: 'delivered', date: '2024-01-14', cost: '$38.00', vehicle: 'Ground Bot #GB-192' },
    { id: 'SF-2062-001236', to: 'Singapore', from: 'Los Angeles, USA', status: 'processing', date: '2024-01-15', cost: '$52.00', vehicle: 'Pending' },
    { id: 'SF-2062-001237', to: 'Seoul, South Korea', from: 'Seattle, USA', status: 'delivered', date: '2024-01-13', cost: '$41.00', vehicle: 'Tube Transport' },
    { id: 'SF-2062-001238', to: 'Berlin, Germany', from: 'Chicago, USA', status: 'delayed', date: '2024-01-15', cost: '$47.00', vehicle: 'Drone #DX-2901' },
    { id: 'SF-2062-001239', to: 'Sydney, Australia', from: 'Miami, USA', status: 'in-transit', date: '2024-01-15', cost: '$65.00', vehicle: 'Drone #DX-2850' },
  ]

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = 
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.to.toLowerCase().includes(searchTerm.toLowerCase())
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
      <h2 className="text-2xl font-bold neon-text flex items-center gap-2">
        <Package className="w-6 h-6" />
        My Shipments
      </h2>

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

      {/* Shipments Table */}
      <div className="glass rounded-xl overflow-hidden neon-border">
        <table className="w-full">
          <thead className="bg-dark-surface/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Shipment ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Route</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Cost</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredShipments.map((shipment) => (
              <tr key={shipment.id} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-neon-blue">{shipment.id}</div>
                  <div className="text-sm text-gray-400">{shipment.vehicle}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">{shipment.from}</div>
                  <div className="text-sm text-gray-400">→ {shipment.to}</div>
                </td>
                <td className="px-6 py-4 text-gray-400">{shipment.date}</td>
                <td className="px-6 py-4 font-semibold">{shipment.cost}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(shipment.status)}`}>
                    {shipment.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="View Details">
                      <Eye className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Download Label">
                      <Download className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Share Tracking">
                      <Share2 className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export & Reporting */}
      <ExportReporting type="shipments" />
    </div>
  )
}
