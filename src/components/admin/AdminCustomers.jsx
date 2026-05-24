import { useState } from 'react'
import { Search, Plus, MoreVertical, Edit, Trash2, Mail, Phone } from 'lucide-react'

export default function AdminCustomers() {
  const [searchTerm, setSearchTerm] = useState('')
  
  const customers = [
    { id: 1, name: 'TechCorp Industries', email: 'shipping@techcorp.com', phone: '+1-555-0101', shipments: 1247, status: 'active' },
    { id: 2, name: 'Global Logistics Ltd', email: 'ops@glogistics.com', phone: '+1-555-0102', shipments: 892, status: 'active' },
    { id: 3, name: 'Future Retail Inc', email: 'fulfillment@futureretail.com', phone: '+1-555-0103', shipments: 2341, status: 'active' },
    { id: 4, name: 'Quantum Systems', email: 'logistics@quantum.io', phone: '+1-555-0104', shipments: 567, status: 'pending' },
    { id: 5, name: 'EcoShip Solutions', email: 'green@ecoship.com', phone: '+1-555-0105', shipments: 1893, status: 'active' },
  ]

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold neon-text">Customer Management</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-neon-blue text-dark-bg font-semibold rounded-lg hover:bg-neon-blue/80 transition-all">
          <Plus className="w-4 h-4" />
          Add Customer
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 glass rounded-lg focus:border-neon-blue focus:outline-none transition-colors"
        />
      </div>

      {/* Customers Table */}
      <div className="glass rounded-xl overflow-hidden neon-border">
        <table className="w-full">
          <thead className="bg-dark-surface/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Customer</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Contact</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Shipments</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold">{customer.name}</div>
                  <div className="text-sm text-gray-400">ID: #{customer.id.toString().padStart(6, '0')}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {customer.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                    <Phone className="w-4 h-4" />
                    {customer.phone}
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold">{customer.shipments.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    customer.status === 'active' 
                      ? 'bg-neon-green/20 text-neon-green' 
                      : 'bg-yellow-400/20 text-yellow-400'
                  }`}>
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
