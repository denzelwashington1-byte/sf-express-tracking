import { useState } from 'react'
import { Wrench, AlertTriangle, CheckCircle, Clock, Battery, TrendingUp, Calendar, Settings } from 'lucide-react'

export default function AdminMaintenance() {
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  
  const fleetHealth = [
    { id: 'DX-2847', type: 'Drone', health: 92, status: 'optimal', nextMaintenance: '2024-02-15', issues: 0, flightHours: 1247 },
    { id: 'DX-2848', type: 'Drone', health: 78, status: 'attention', nextMaintenance: '2024-01-20', issues: 1, flightHours: 1892 },
    { id: 'DX-2849', type: 'Drone', health: 45, status: 'critical', nextMaintenance: '2024-01-18', issues: 3, flightHours: 2341 },
    { id: 'GB-192', type: 'Ground Bot', health: 95, status: 'optimal', nextMaintenance: '2024-03-01', issues: 0, operationHours: 3421 },
    { id: 'GB-193', type: 'Ground Bot', health: 88, status: 'optimal', nextMaintenance: '2024-02-28', issues: 0, operationHours: 2891 },
    { id: 'HT-001', type: 'Hyperloop', health: 98, status: 'optimal', nextMaintenance: '2024-04-15', issues: 0, operationHours: 8472 },
  ]

  const maintenanceSchedule = [
    { id: 1, vehicle: 'DX-2849', type: 'Battery Replacement', priority: 'critical', scheduled: '2024-01-18', estimated: '4 hours' },
    { id: 2, vehicle: 'DX-2848', type: 'Motor Calibration', priority: 'high', scheduled: '2024-01-20', estimated: '2 hours' },
    { id: 3, vehicle: 'DX-2847', type: 'Routine Inspection', priority: 'medium', scheduled: '2024-02-15', estimated: '1 hour' },
    { id: 4, vehicle: 'GB-192', type: 'Software Update', priority: 'low', scheduled: '2024-03-01', estimated: '30 min' },
  ]

  const getHealthColor = (health) => {
    if (health >= 90) return 'bg-neon-green'
    if (health >= 70) return 'bg-yellow-400'
    return 'bg-red-400'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal': return 'bg-neon-green/20 text-neon-green'
      case 'attention': return 'bg-yellow-400/20 text-yellow-400'
      case 'critical': return 'bg-red-400/20 text-red-400'
      default: return 'bg-gray-400/20 text-gray-400'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-400/20 text-red-400'
      case 'high': return 'bg-orange-400/20 text-orange-400'
      case 'medium': return 'bg-yellow-400/20 text-yellow-400'
      case 'low': return 'bg-neon-blue/20 text-neon-blue'
      default: return 'bg-gray-400/20 text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold neon-text flex items-center gap-2">
        <Wrench className="w-6 h-6" />
        Predictive Maintenance
      </h2>

      {/* Fleet Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass rounded-lg p-4">
          <div className="text-2xl font-bold text-neon-green">94%</div>
          <div className="text-sm text-gray-400">Fleet Health</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-400">2</div>
          <div className="text-sm text-gray-400">Need Attention</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-2xl font-bold text-red-400">1</div>
          <div className="text-sm text-gray-400">Critical</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-2xl font-bold text-neon-blue">4</div>
          <div className="text-sm text-gray-400">Scheduled This Week</div>
        </div>
      </div>

      {/* Fleet Health List */}
      <div className="glass rounded-xl p-6 neon-border">
        <h3 className="text-xl font-bold mb-4">Fleet Health Status</h3>
        <div className="space-y-4">
          {fleetHealth.map((vehicle) => (
            <div 
              key={vehicle.id}
              onClick={() => setSelectedVehicle(vehicle)}
              className="flex items-center justify-between p-4 bg-dark-surface/50 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg ${getHealthColor(vehicle.health)} flex items-center justify-center`}>
                  <span className="text-dark-bg font-bold">{vehicle.health}%</span>
                </div>
                <div>
                  <p className="font-semibold">{vehicle.id}</p>
                  <p className="text-sm text-gray-400">{vehicle.type} • {vehicle.flightHours || vehicle.operationHours} hours</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(vehicle.status)}`}>
                  {vehicle.status}
                </span>
                <p className="text-sm text-gray-400 mt-1">{vehicle.issues} issues</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Maintenance Schedule */}
      <div className="glass rounded-xl p-6 neon-border">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-neon-blue" />
          Upcoming Maintenance
        </h3>
        <div className="space-y-4">
          {maintenanceSchedule.map((schedule) => (
            <div key={schedule.id} className="flex items-center justify-between p-4 bg-dark-surface/50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${getPriorityColor(schedule.priority)}`}>
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold">{schedule.vehicle}</p>
                  <p className="text-sm text-gray-400">{schedule.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{schedule.scheduled}</p>
                <p className="text-sm text-gray-400">{schedule.estimated}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Vehicle Details */}
      {selectedVehicle && (
        <div className="glass rounded-xl p-6 neon-border">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Vehicle Details - {selectedVehicle.id}</h3>
            <button 
              onClick={() => setSelectedVehicle(null)}
              className="text-gray-400 hover:text-white"
            >
              Close
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-dark-surface/50 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Health Score</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-4 bg-dark-surface rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getHealthColor(selectedVehicle.health)}`}
                      style={{ width: `${selectedVehicle.health}%` }}
                    />
                  </div>
                  <span className="font-bold">{selectedVehicle.health}%</span>
                </div>
              </div>
              <div className="p-4 bg-dark-surface/50 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Status</p>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedVehicle.status)}`}>
                  {selectedVehicle.status}
                </span>
              </div>
              <div className="p-4 bg-dark-surface/50 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Next Maintenance</p>
                <p className="font-semibold">{selectedVehicle.nextMaintenance}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-dark-surface/50 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Operating Hours</p>
                <p className="font-semibold">{selectedVehicle.flightHours || selectedVehicle.operationHours.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-dark-surface/50 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Active Issues</p>
                <p className="font-semibold text-red-400">{selectedVehicle.issues}</p>
              </div>
              <div className="p-4 bg-dark-surface/50 rounded-lg">
                <p className="text-sm text-gray-400 mb-1">Predicted Failure</p>
                <p className="font-semibold text-neon-green">Low risk</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Predictions */}
      <div className="glass rounded-xl p-6 neon-border">
        <h3 className="text-xl font-bold mb-4 neon-purple-text flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          AI Predictive Analytics
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-dark-surface/50 rounded-lg">
            <h4 className="font-semibold mb-2 text-neon-green">Battery Life Prediction</h4>
            <p className="text-sm text-gray-400">DX-2849 battery will reach 20% in 47 flights. Recommend replacement before Jan 20.</p>
          </div>
          <div className="p-4 bg-dark-surface/50 rounded-lg">
            <h4 className="font-semibold mb-2 text-neon-blue">Motor Wear Analysis</h4>
            <p className="text-sm text-gray-400">DX-2848 showing 15% increased vibration. Calibration recommended within 72 hours.</p>
          </div>
          <div className="p-4 bg-dark-surface/50 rounded-lg">
            <h4 className="font-semibold mb-2 text-neon-purple">Parts Inventory</h4>
            <p className="text-sm text-gray-400">All critical parts in stock. 234 replacement batteries available.</p>
          </div>
        </div>
      </div>

      {/* Maintenance Actions */}
      <div className="glass rounded-xl p-6 neon-border">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Maintenance Actions
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <button className="p-4 bg-dark-surface/50 rounded-lg hover:bg-white/10 transition-all text-left">
            <div className="flex items-center gap-2 mb-2">
              <Wrench className="w-5 h-5 text-neon-blue" />
              <span className="font-semibold">Schedule Maintenance</span>
            </div>
            <p className="text-sm text-gray-400">Create new maintenance schedule</p>
          </button>
          <button className="p-4 bg-dark-surface/50 rounded-lg hover:bg-white/10 transition-all text-left">
            <div className="flex items-center gap-2 mb-2">
              <Battery className="w-5 h-5 text-neon-green" />
              <span className="font-semibold">Order Parts</span>
            </div>
            <p className="text-sm text-gray-400">Request replacement components</p>
          </button>
          <button className="p-4 bg-dark-surface/50 rounded-lg hover:bg-white/10 transition-all text-left">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-neon-purple" />
              <span className="font-semibold">View History</span>
            </div>
            <p className="text-sm text-gray-400">Maintenance logs and records</p>
          </button>
        </div>
      </div>
    </div>
  )
}
