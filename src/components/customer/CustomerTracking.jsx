import { useState } from 'react'
import { MapPin, Truck, Zap, Activity, Eye, RotateCw } from 'lucide-react'
import SocialSharing from '../SocialSharing'

export default function CustomerTracking() {
  const [selectedShipment, setSelectedShipment] = useState(null)
  
  const shipments = [
    { 
      id: 'SF-2062-001234', 
      to: 'Tokyo, Japan', 
      status: 'in-transit', 
      progress: 65,
      vehicle: 'Drone #DX-2847',
      eta: '2h 34m',
      currentLocation: 'Pacific Ocean - Sector 7',
      temperature: '22°C',
      humidity: '45%',
      shock: 'Normal'
    },
    { 
      id: 'SF-2062-001235', 
      to: 'London, UK', 
      status: 'delivered', 
      progress: 100,
      vehicle: 'Ground Bot #GB-192',
      eta: 'Delivered',
      currentLocation: 'London, UK',
      temperature: '18°C',
      humidity: '52%',
      shock: 'Normal'
    },
    { 
      id: 'SF-2062-001236', 
      to: 'Singapore', 
      status: 'processing', 
      progress: 15,
      vehicle: 'Pending',
      eta: '4h 12m',
      currentLocation: 'Los Angeles Hub',
      temperature: '20°C',
      humidity: '48%',
      shock: 'Normal'
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-neon-green'
      case 'in-transit': return 'bg-neon-blue'
      case 'processing': return 'bg-purple-400'
      default: return 'bg-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold neon-text flex items-center gap-2">
        <Activity className="w-6 h-6" />
        Live Package Tracking
      </h2>

      {/* AR Mode Toggle */}
      <div className="glass rounded-xl p-4 neon-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Eye className="w-5 h-5 text-neon-purple" />
          <div>
            <h3 className="font-bold">AR Tracking Mode</h3>
            <p className="text-sm text-gray-400">View packages in 3D holographic space</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-neon-purple/20 text-neon-purple rounded-lg hover:bg-neon-purple/30 transition-all">
          Enable AR
        </button>
      </div>

      {/* Shipments Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shipments.map((shipment) => (
          <div 
            key={shipment.id} 
            className="glass rounded-xl p-6 neon-border hover:bg-white/5 transition-all cursor-pointer"
            onClick={() => setSelectedShipment(shipment)}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-neon-blue">{shipment.id}</h3>
                <p className="text-sm text-gray-400">{shipment.to}</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${getStatusColor(shipment.status)}`} />
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Progress</span>
                <span className="font-semibold">{shipment.progress}%</span>
              </div>
              <div className="h-2 bg-dark-surface rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getStatusColor(shipment.status)} transition-all`}
                  style={{ width: `${shipment.progress}%` }}
                />
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <Truck className="w-4 h-4" />
                {shipment.vehicle}
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                {shipment.currentLocation}
              </div>
              <div className="flex items-center gap-2 text-neon-green font-semibold">
                <Zap className="w-4 h-4" />
                ETA: {shipment.eta}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Shipment Details */}
      {selectedShipment && (
        <div className="glass rounded-xl p-6 neon-border">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Package Sensors - {selectedShipment.id}</h3>
            <button 
              onClick={() => setSelectedShipment(null)}
              className="text-gray-400 hover:text-white"
            >
              Close
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-dark-surface/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-neon-blue" />
                <span className="text-sm text-gray-400">Temperature</span>
              </div>
              <p className="text-2xl font-bold">{selectedShipment.temperature}</p>
            </div>
            <div className="p-4 bg-dark-surface/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-neon-purple" />
                <span className="text-sm text-gray-400">Humidity</span>
              </div>
              <p className="text-2xl font-bold">{selectedShipment.humidity}</p>
            </div>
            <div className="p-4 bg-dark-surface/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <RotateCw className="w-4 h-4 text-neon-green" />
                <span className="text-sm text-gray-400">Shock Sensor</span>
              </div>
              <p className="text-2xl font-bold">{selectedShipment.shock}</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-neon-blue/20 rounded-lg">
            <p className="text-sm text-neon-blue">
              <strong className="text-white">AI Prediction:</strong> Package will arrive on time. Weather conditions optimal. No delays expected.
            </p>
          </div>

          <SocialSharing shipmentId={selectedShipment.id} shipmentDetails={selectedShipment} />
        </div>
      )}
    </div>
  )
}
