import { useState } from 'react'
import { Link, Lock, CheckCircle, AlertTriangle, Hash, Clock, Shield, FileText } from 'lucide-react'

export default function AdminBlockchain() {
  const [selectedBlock, setSelectedBlock] = useState(null)
  
  const blockchainData = [
    { 
      id: '0x1a2b...3c4d', 
      blockNumber: 1847234, 
      timestamp: '2024-01-15 14:32:15 UTC',
      shipmentId: 'SF-2062-001234',
      transaction: 'DELIVERY_CONFIRMED',
      hash: '0x8f7d...3e2a',
      status: 'verified',
      confirmations: 12847
    },
    { 
      id: '0x5e6f...7g8h', 
      blockNumber: 1847233, 
      timestamp: '2024-01-15 14:30:42 UTC',
      shipmentId: 'SF-2062-001235',
      transaction: 'PICKUP_CONFIRMED',
      hash: '0x2b9c...4d1e',
      status: 'verified',
      confirmations: 12848
    },
    { 
      id: '0x9i0j...1k2l', 
      blockNumber: 1847232, 
      timestamp: '2024-01-15 14:28:18 UTC',
      shipmentId: 'SF-2062-001236',
      transaction: 'SHIPMENT_CREATED',
      hash: '0x7a3f...5c2b',
      status: 'verified',
      confirmations: 12849
    },
    { 
      id: '0x3m4n...5o6p', 
      blockNumber: 1847231, 
      timestamp: '2024-01-15 14:25:33 UTC',
      shipmentId: 'SF-2062-001237',
      transaction: 'PAYMENT_PROCESSED',
      hash: '0x1d8e...6f4a',
      status: 'verified',
      confirmations: 12850
    },
  ]

  const smartContracts = [
    { 
      id: 'SC-DELIVERY-001',
      name: 'Delivery Verification Contract',
      address: '0x1234...5678',
      status: 'active',
      transactions: 12847,
      lastUpdated: '2 min ago'
    },
    { 
      id: 'SC-PAYMENT-002',
      name: 'Automated Payment Contract',
      address: '0xabcd...efgh',
      status: 'active',
      transactions: 8432,
      lastUpdated: '5 min ago'
    },
    { 
      id: 'SC-INSURANCE-003',
      name: 'Insurance Claim Contract',
      address: '0x9876...5432',
      status: 'active',
      transactions: 2341,
      lastUpdated: '12 min ago'
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'bg-neon-green/20 text-neon-green'
      case 'pending': return 'bg-yellow-400/20 text-yellow-400'
      case 'failed': return 'bg-red-400/20 text-red-400'
      default: return 'bg-gray-400/20 text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold neon-text flex items-center gap-2">
        <Link className="w-6 h-6 text-neon-purple" />
        Blockchain Shipment Records
      </h2>

      {/* Blockchain Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass rounded-lg p-4">
          <div className="text-2xl font-bold text-neon-purple">1,847,234</div>
          <div className="text-sm text-gray-400">Total Blocks</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-2xl font-bold text-neon-green">23,647</div>
          <div className="text-sm text-gray-400">Verified Transactions</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-2xl font-bold text-neon-blue">3</div>
          <div className="text-sm text-gray-400">Active Smart Contracts</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-400">0.00s</div>
          <div className="text-sm text-gray-400">Avg Block Time</div>
        </div>
      </div>

      {/* Recent Blocks */}
      <div className="glass rounded-xl p-6 neon-border">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Hash className="w-5 h-5 text-neon-blue" />
          Recent Blockchain Transactions
        </h3>
        <div className="space-y-3">
          {blockchainData.map((block) => (
            <div 
              key={block.id}
              onClick={() => setSelectedBlock(block)}
              className="flex items-center justify-between p-4 bg-dark-surface/50 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(block.status)}`} />
                <div>
                  <p className="font-semibold text-neon-purple">{block.hash}</p>
                  <p className="text-sm text-gray-400">{block.shipmentId} • {block.transaction}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {block.timestamp}
                </p>
                <p className="text-xs text-neon-green">{block.confirmations} confirmations</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smart Contracts */}
      <div className="glass rounded-xl p-6 neon-border">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-neon-blue" />
          Smart Contracts
        </h3>
        <div className="space-y-4">
          {smartContracts.map((contract) => (
            <div key={contract.id} className="p-4 bg-dark-surface/50 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold">{contract.name}</p>
                  <p className="text-sm text-gray-400">{contract.id}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(contract.status)}`}>
                  {contract.status}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Address</p>
                  <p className="font-mono text-neon-purple">{contract.address}</p>
                </div>
                <div>
                  <p className="text-gray-400">Transactions</p>
                  <p className="font-semibold">{contract.transactions.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Last Updated</p>
                  <p className="font-semibold">{contract.lastUpdated}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Block Details */}
      {selectedBlock && (
        <div className="glass rounded-xl p-6 neon-border">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Block Details</h3>
            <button 
              onClick={() => setSelectedBlock(null)}
              className="text-gray-400 hover:text-white"
            >
              Close
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-dark-surface/50 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Block Hash</p>
                <p className="font-mono text-neon-purple">{selectedBlock.hash}</p>
              </div>
              <div className="p-4 bg-dark-surface/50 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Block Number</p>
                <p className="font-semibold">{selectedBlock.blockNumber.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-dark-surface/50 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Timestamp</p>
                <p className="font-semibold">{selectedBlock.timestamp}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-dark-surface/50 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Shipment ID</p>
                <p className="font-semibold text-neon-blue">{selectedBlock.shipmentId}</p>
              </div>
              <div className="p-4 bg-dark-surface/50 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Transaction Type</p>
                <p className="font-semibold">{selectedBlock.transaction}</p>
              </div>
              <div className="p-4 bg-dark-surface/50 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Confirmations</p>
                <p className="font-semibold text-neon-green">{selectedBlock.confirmations.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-neon-green/20 rounded-lg">
            <p className="text-sm text-neon-green flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <strong>Verified on Blockchain:</strong> This transaction has been verified by {selectedBlock.confirmations} network nodes and is immutable.
            </p>
          </div>
        </div>
      )}

      {/* Security Features */}
      <div className="glass rounded-xl p-6 neon-border">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-neon-green" />
          Quantum-Encrypted Security
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-dark-surface/50 rounded-lg">
            <h4 className="font-semibold mb-2 text-neon-green">Quantum Encryption</h4>
            <p className="text-sm text-gray-400">All shipment data encrypted using quantum-resistant algorithms</p>
          </div>
          <div className="p-4 bg-dark-surface/50 rounded-lg">
            <h4 className="font-semibold mb-2 text-neon-blue">Immutable Records</h4>
            <p className="text-sm text-gray-400">Once recorded on blockchain, data cannot be altered or deleted</p>
          </div>
          <div className="p-4 bg-dark-surface/50 rounded-lg">
            <h4 className="font-semibold mb-2 text-neon-purple">Decentralized Verification</h4>
            <p className="text-sm text-gray-400">Network-wide consensus ensures data integrity</p>
          </div>
        </div>
      </div>
    </div>
  )
}
