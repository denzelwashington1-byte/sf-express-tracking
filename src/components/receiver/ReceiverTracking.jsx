import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MapPin, Truck, Zap, Activity, Eye, RotateCw, Shield, CheckCircle, AlertTriangle } from 'lucide-react'

export default function ReceiverTracking() {
  const { trackingId } = useParams()
  const [verified, setVerified] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [showVerification, setShowVerification] = useState(true)
  
  // Simulated shipment data
  const shipment = {
    id: trackingId || 'SF-2062-001234',
    from: 'San Francisco, USA',
    to: 'Tokyo, Japan',
    status: 'in-transit',
    progress: 65,
    vehicle: 'Drone #DX-2847',
    eta: '2h 34m',
    currentLocation: 'Pacific Ocean - Sector 7',
    temperature: '22°C',
    humidity: '45%',
    shock: 'Normal',
    sender: 'TechCorp Industries',
    estimatedDelivery: 'Today, 6:45 PM JST'
  }

  const timeline = [
    { time: '10:30 AM', event: 'Package picked up', status: 'completed', location: 'San Francisco Hub' },
    { time: '11:15 AM', event: 'In transit to drone station', status: 'completed', location: 'Oakland' },
    { time: '12:00 PM', event: 'Loaded onto drone', status: 'completed', location: 'Drone Station #7' },
    { time: '12:30 PM', event: 'Crossing Pacific Ocean', status: 'in-progress', location: 'Sector 7' },
    { time: '4:15 PM', event: 'Expected arrival in Tokyo', status: 'pending', location: 'Tokyo Hub' },
    { time: '6:45 PM', event: 'Final delivery', status: 'pending', location: 'Tokyo, Japan' },
  ]

  const handleVerify = (e) => {
    e.preventDefault()
    // Demo verification - accept any 6-digit code
    if (verificationCode.length === 6) {
      setVerified(true)
      setShowVerification(false)
    } else {
      alert('Please enter a valid 6-digit code')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-neon-green'
      case 'in-progress': return 'bg-neon-blue'
      case 'pending': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  if (showVerification) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl animate-pulse-slow top-20 left-20"></div>
          <div className="absolute w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-pulse-slow bottom-20 right-20" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="glass rounded-2xl p-8 neon-border">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-neon-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-neon-blue" />
              </div>
              <h1 className="text-2xl font-bold mb-2 neon-text">Verify Your Identity</h1>
              <p className="text-gray-400">Enter the 6-digit code sent to your email or phone</p>
            </div>

            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <input
                  type="text"
                  maxLength="6"
                  placeholder="Enter code (e.g., 123456)"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-4 py-3 bg-dark-surface border border-white/10 rounded-lg focus:border-neon-blue focus:outline-none transition-colors text-center text-2xl tracking-widest"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-neon-blue text-dark-bg font-bold rounded-lg hover:bg-neon-blue/80 transition-all"
              >
                Verify & Track
              </button>

              <p className="text-center text-sm text-gray-400">
                Demo: Enter any 6 digits to continue
              </p>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-bg p-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl animate-pulse-slow top-20 left-20"></div>
        <div className="absolute w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-pulse-slow bottom-20 right-20" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="glass rounded-xl p-6 neon-border mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2 neon-text">Package Tracking</h1>
              <p className="text-gray-400">Tracking ID: {shipment.id}</p>
            </div>
            <div className="text-right">
              <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                shipment.status === 'delivered' ? 'bg-neon-green/20 text-neon-green' : 'bg-neon-blue/20 text-neon-blue'
              }`}>
                {shipment.status.toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Shipment Details */}
          <div className="space-y-6">
            {/* Route */}
            <div className="glass rounded-xl p-6 neon-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-neon-blue" />
                Route Information
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-dark-surface/50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-400">From</p>
                    <p className="font-semibold">{shipment.from}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-neon-green" />
                </div>
                <div className="flex justify-between items-center p-3 bg-dark-surface/50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-400">To</p>
                    <p className="font-semibold">{shipment.to}</p>
                  </div>
                  <MapPin className="w-5 h-5 text-neon-blue" />
                </div>
                <div className="flex justify-between items-center p-3 bg-dark-surface/50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-400">Sender</p>
                    <p className="font-semibold">{shipment.sender}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="glass rounded-xl p-6 neon-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-neon-purple" />
                Delivery Progress
              </h2>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Progress</span>
                  <span className="font-semibold">{shipment.progress}%</span>
                </div>
                <div className="h-3 bg-dark-surface rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-neon-blue to-neon-purple transition-all"
                    style={{ width: `${shipment.progress}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-dark-surface/50 rounded-lg">
                  <p className="text-sm text-gray-400">ETA</p>
                  <p className="font-bold text-neon-green">{shipment.eta}</p>
                </div>
                <div className="p-3 bg-dark-surface/50 rounded-lg">
                  <p className="text-sm text-gray-400">Vehicle</p>
                  <p className="font-bold">{shipment.vehicle}</p>
                </div>
              </div>
            </div>

            {/* Package Sensors */}
            <div className="glass rounded-xl p-6 neon-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-neon-green" />
                Live Package Sensors
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-dark-surface/50 rounded-lg text-center">
                  <Zap className="w-6 h-6 text-neon-blue mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Temperature</p>
                  <p className="text-xl font-bold">{shipment.temperature}</p>
                </div>
                <div className="p-4 bg-dark-surface/50 rounded-lg text-center">
                  <Activity className="w-6 h-6 text-neon-purple mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Humidity</p>
                  <p className="text-xl font-bold">{shipment.humidity}</p>
                </div>
                <div className="p-4 bg-dark-surface/50 rounded-lg text-center">
                  <RotateCw className="w-6 h-6 text-neon-green mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Shock</p>
                  <p className="text-xl font-bold">{shipment.shock}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="glass rounded-xl p-6 neon-border">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-neon-blue" />
              Delivery Timeline
            </h2>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full ${getStatusColor(item.status)}`} />
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-16 bg-white/10" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{item.event}</p>
                        <p className="text-sm text-gray-400">{item.location}</p>
                      </div>
                      <span className="text-sm text-gray-400">{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* AR Mode */}
            <div className="mt-6 p-4 bg-neon-purple/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-neon-purple" />
                  <div>
                    <p className="font-bold text-neon-purple">AR Tracking Mode</p>
                    <p className="text-sm text-gray-400">View package in 3D holographic space</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-neon-purple text-white rounded-lg hover:bg-neon-purple/80 transition-all">
                  Enable AR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
