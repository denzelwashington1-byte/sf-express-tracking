import { useState } from 'react'
import { MapPin, Package, Calendar, Calculator, Zap, Leaf, ArrowRight } from 'lucide-react'
import WeatherIntegration from '../WeatherIntegration'

export default function CustomerCreateShipment() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    weight: '',
    dimensions: '',
    service: 'standard',
    eco: false
  })

  const services = [
    { id: 'standard', name: 'Standard Drone', time: '2-4 hours', price: '$25', carbon: '0.5 kg CO2' },
    { id: 'express', name: 'Express Drone', time: '1-2 hours', price: '$45', carbon: '0.8 kg CO2' },
    { id: 'ground', name: 'Ground Bot', time: '4-6 hours', price: '$15', carbon: '0.2 kg CO2' },
    { id: 'tube', name: 'Hyperloop Tube', time: '30 min', price: '$60', carbon: '0.1 kg CO2' },
  ]

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold neon-text">Create New Shipment</h2>

      {/* Progress Steps */}
      <div className="flex items-center gap-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step >= s ? 'bg-neon-blue text-dark-bg' : 'bg-dark-surface text-gray-400'
            }`}>
              {s}
            </div>
            {s < 3 && <ArrowRight className="w-5 h-5 text-gray-400" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="glass rounded-xl p-6 neon-border space-y-6">
          <h3 className="text-xl font-bold mb-4">Route Details</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-neon-blue" />
                Pickup Location
              </label>
              <input
                type="text"
                placeholder="Enter pickup address"
                className="w-full px-4 py-3 bg-dark-surface border border-white/10 rounded-lg focus:border-neon-blue focus:outline-none transition-colors"
                value={formData.from}
                onChange={(e) => setFormData({ ...formData, from: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-neon-purple" />
                Delivery Location
              </label>
              <input
                type="text"
                placeholder="Enter delivery address"
                className="w-full px-4 py-3 bg-dark-surface border border-white/10 rounded-lg focus:border-neon-blue focus:outline-none transition-colors"
                value={formData.to}
                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              />
            </div>
          </div>

          {formData.from && formData.to && (
            <WeatherIntegration route={{ from: formData.from, to: formData.to }} />
          )}

          <button
            onClick={() => setStep(2)}
            className="w-full py-3 bg-neon-blue text-dark-bg font-bold rounded-lg hover:bg-neon-blue/80 transition-all"
          >
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="glass rounded-xl p-6 neon-border space-y-6">
          <h3 className="text-xl font-bold mb-4">Package Details</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Package className="w-4 h-4 text-neon-blue" />
                Weight (kg)
              </label>
              <input
                type="number"
                placeholder="Enter weight"
                className="w-full px-4 py-3 bg-dark-surface border border-white/10 rounded-lg focus:border-neon-blue focus:outline-none transition-colors"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-neon-purple" />
                Dimensions (LxWxH cm)
              </label>
              <input
                type="text"
                placeholder="e.g., 30x20x15"
                className="w-full px-4 py-3 bg-dark-surface border border-white/10 rounded-lg focus:border-neon-blue focus:outline-none transition-colors"
                value={formData.dimensions}
                onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-3 glass rounded-lg hover:bg-white/10 transition-all"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 py-3 bg-neon-blue text-dark-bg font-bold rounded-lg hover:bg-neon-blue/80 transition-all"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div className="glass rounded-xl p-6 neon-border">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-neon-blue" />
              Select Service
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.service === service.id
                      ? 'border-neon-blue bg-neon-blue/10'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                  onClick={() => setFormData({ ...formData, service: service.id })}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold">{service.name}</h4>
                    <span className="text-neon-blue font-bold">{service.price}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {service.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Leaf className="w-3 h-3" />
                      {service.carbon}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-6 neon-border">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.eco}
                onChange={(e) => setFormData({ ...formData, eco: e.target.checked })}
                className="w-5 h-5 rounded"
              />
              <div>
                <span className="font-bold text-neon-green flex items-center gap-2">
                  <Leaf className="w-4 h-4" />
                  Eco-Friendly Mode
                </span>
                <p className="text-sm text-gray-400">Optimize for minimum carbon footprint (may increase delivery time)</p>
              </div>
            </label>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep(2)}
              className="flex-1 py-3 glass rounded-lg hover:bg-white/10 transition-all"
            >
              Back
            </button>
            <button
              onClick={() => alert('Shipment created successfully!')}
              className="flex-1 py-3 bg-neon-blue text-dark-bg font-bold rounded-lg hover:bg-neon-blue/80 transition-all"
            >
              Create Shipment
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
