import { useState } from 'react'
import { Drone, Battery, MapPin, Activity, AlertTriangle, CheckCircle, Settings } from 'lucide-react'

export default function AdminDrones() {
  const [selectedDrone, setSelectedDrone] = useState(null)
  
  const drones = [
    { id: 'DX-2847', type: 'Delivery Drone', status: 'in-flight', battery: 78, location: 'Pacific Ocean - Sector 7', payload: '2.3 kg', speed: '120 km/h', altitude: '150m' },
    { id: 'DX-2848', type: 'Delivery Drone', status: 'in-flight', battery: 45, location: 'Tokyo Bay', payload: '1.8 kg', speed: '95 km/h', altitude: '120m' },
    { id: 'DX-2849', type: 'Delivery Drone', status: 'charging', battery: 23, location: 'Charging Station #7', payload: '0 kg', speed: '0 km/h', altitude: '0m' },
    { id: 'DX-2850', type: 'Heavy Lift Drone', status: 'in-flight', battery: 92, location: 'New York Sector', payload: '5.0 kg', speed: '85 km/h', altitude: '200m' },
    { id: 'DX-2851', type: 'Delivery Drone', status: 'maintenance', battery: 0, location: 'Maintenance Hub', payload: '0 kg', speed: '0 km/h', altitude: '0m' },
    { id: 'DX-2852', type: 'Delivery Drone', status: 'in-flight', battery: 67, location: 'London Approach', payload: '3.1 kg', speed: '110 km/h', altitude: '180m' },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-flight': return 'bg-neon-blue'
      case 'charging': return 'bg-yellow-400'
      case 'maintenance': return 'bg-red-400'
      default: return 'bg-gray-400'
    }
  }

  const getBatteryColor = (battery) => {
    if (battery > 50) return 'text-neon-green'
    if (battery > 25) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold neon-text flex items-center gap-2">
          <Drone className="w-6 h-6" />
          Drone Fleet Management
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-neon-blue text-dark-bg font-semibold rounded-lg hover:bg-neon-blue/80 transition-all">
          <Settings className="w-4 h-4" />
          Fleet Settings
        </button>
      </div>

      {/* Fleet Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass rounded-lg p-4">
          <div className="text-2xl font-bold text-neon-blue">284</div>
          <div className="text-sm text-gray-400">Total Drones</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-2xl font-bold text-neon-green">247</div>
          <div className="text-sm text-gray-400">In Flight</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-400">32</div>
          <div className="text-sm text-gray-400">Charging</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-2xl font-bold text-red-400">5</div>
          <div className="text-sm text-gray-400">Maintenance</div>
        </div>
      </div>

      {/* Drones Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drones.map((drone) => (
          <div 
            key={drone.id}
            className="glass rounded-xl p-6 neon-border hover:bg-white/5 transition-all cursor-pointer"
            onClick={() => setSelectedDrone(drone)}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-neon-blue">{drone.id}</h3>
                <p className="text-sm text-gray-400">{drone.type}</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${getStatusColor(drone.status)}`} />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <Battery className="w-4 h-4" />
                  Battery
                </span>
                <span className={`font-bold ${getBatteryColor(drone.battery)}`}>{drone.battery}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Location
                </span>
                <span className="text-sm text-right">{drone.location}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Payload</span>
                <span className="font-semibold">{drone.payload}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Speed</span>
                <span className="font-semibold">{drone.speed}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Altitude</span>
                <span className="font-semibold">{drone.altitude}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Drone Details */}
      {selectedDrone && (
        <div className="glass rounded-xl p-6 neon-border">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Drone Details - {selectedDrone.id}</h3>
            <button 
              onClick={() => setSelectedDrone(null)}
              className="text-gray-400 hover:text-white"
            >
              Close
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-dark-surface/50 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Status</p>
                <p className="font-bold capitalize">{selectedDrone.status}</p>
              </div>
              <div className="p-4 bg-dark-surface/50 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Current Mission</p>
                <p className="font-semibold">SF-2062-001234 - San Francisco to Tokyo</p>
              </div>
              <div className="p-4 bg-dark-surface/50 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">ETA to Destination</p>
                <p className="font-bold text-neon-green">2h 34m</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-dark-surface/50 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Predictive Path</p>
                <p className="font-semibold">AI-optimized route active</p>
              </div>
              <div className="p-4 bg-dark-surface/50 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Weather Conditions</p>
                <p className="font-semibold text-neon-green">Optimal - No delays expected</p>
              </div>
              <div className="p-4 bg-dark-surface/50 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Quantum Encryption</p>
                <p className="font-semibold text-neon-purple flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Active
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Fleet Optimization */}
      <div className="glass rounded-xl p-6 neon-border">
        <h3 className="text-xl font-bold mb-4 neon-purple-text flex items-center gap-2">
          <Activity className="w-5 h-5" />
          AI Fleet Optimization
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-dark-surface/50 rounded-lg">
            <h4 className="font-semibold mb-2 text-neon-green">Route Efficiency</h4>
            <p className="text-sm text-gray-400">AI has optimized 47 drone routes today, saving 12% energy</p>
          </div>
          <div className="p-4 bg-dark-surface/50 rounded-lg">
            <h4 className="font-semibold mb-2 text-neon-blue">Battery Management</h4>
            <p className="text-sm text-gray-400">Predictive charging scheduled for 23 drones based on route analysis</p>
          </div>
          <div className="p-4 bg-dark-surface/50 rounded-lg">
            <h4 className="font-semibold mb-2 text-neon-purple">Swarm Intelligence</h4>
            <p className="text-sm text-gray-400">Coordinated delivery patterns reducing airspace congestion by 18%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
