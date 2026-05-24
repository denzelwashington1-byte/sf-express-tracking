import { useState } from 'react'
import { Search, Copy, Share2, QrCode, Link as LinkIcon, Check } from 'lucide-react'

export default function AdminTracking() {
  const [searchTerm, setSearchTerm] = useState('')
  const [copiedId, setCopiedId] = useState(null)
  
  const trackingLinks = [
    { id: 'SF-2062-001234', customer: 'TechCorp Industries', receiver: 'john.doe@email.com', status: 'active', created: '2 hours ago', clicks: 47 },
    { id: 'SF-2062-001235', customer: 'Global Logistics Ltd', receiver: '+1-555-0199', status: 'active', created: '3 hours ago', clicks: 23 },
    { id: 'SF-2062-001236', customer: 'Future Retail Inc', receiver: 'sarah.smith@company.com', status: 'active', created: '5 hours ago', clicks: 89 },
    { id: 'SF-2062-001237', customer: 'Quantum Systems', receiver: '+1-555-0200', status: 'expired', created: '1 day ago', clicks: 156 },
    { id: 'SF-2062-001238', customer: 'EcoShip Solutions', receiver: 'mike.johnson@eco.io', status: 'active', created: '6 hours ago', clicks: 34 },
  ]

  const filteredLinks = trackingLinks.filter(link =>
    link.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.receiver.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const copyToClipboard = (id) => {
    const trackingUrl = `https://sfexpress2062.netlify.app/receiver/${id}`
    navigator.clipboard.writeText(trackingUrl)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const generatePrivateCode = (id) => {
    // Generate a private tracking code
    const privateCode = btoa(id + Date.now()).substring(0, 12).toUpperCase()
    alert(`Private tracking code generated: ${privateCode}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold neon-text flex items-center gap-2">
          <LinkIcon className="w-6 h-6" />
          Tracking Links
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-neon-blue text-dark-bg font-semibold rounded-lg hover:bg-neon-blue/80 transition-all">
          <Share2 className="w-4 h-4" />
          Generate New Link
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search tracking links..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 glass rounded-lg focus:border-neon-blue focus:outline-none transition-colors"
        />
      </div>

      {/* Tracking Links Table */}
      <div className="glass rounded-xl overflow-hidden neon-border">
        <table className="w-full">
          <thead className="bg-dark-surface/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Shipment ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Customer</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Receiver</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Created</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Clicks</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLinks.map((link) => (
              <tr key={link.id} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-neon-blue">{link.id}</div>
                </td>
                <td className="px-6 py-4">{link.customer}</td>
                <td className="px-6 py-4 text-gray-400">{link.receiver}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    link.status === 'active' 
                      ? 'bg-neon-green/20 text-neon-green' 
                      : 'bg-red-400/20 text-red-400'
                  }`}>
                    {link.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400">{link.created}</td>
                <td className="px-6 py-4 font-semibold">{link.clicks}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(link.id)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors relative"
                      title="Copy Link"
                    >
                      {copiedId === link.id ? (
                        <Check className="w-4 h-4 text-neon-green" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                    <button
                      onClick={() => generatePrivateCode(link.id)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="Generate Private Code"
                    >
                      <QrCode className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Instructions */}
      <div className="glass rounded-xl p-6 neon-border">
        <h3 className="font-bold mb-4 neon-purple-text">How Tracking Links Work</h3>
        <div className="space-y-3 text-gray-400">
          <p>• <strong className="text-white">Public Link:</strong> Shareable URL that receivers can access to track their shipment</p>
          <p>• <strong className="text-white">Private Code:</strong> Unique code for additional security verification</p>
          <p>• <strong className="text-white">Click Tracking:</strong> Monitor how many times the tracking link has been accessed</p>
          <p>• <strong className="text-white">Status:</strong> Links can be active or expired based on delivery status</p>
        </div>
      </div>
    </div>
  )
}
