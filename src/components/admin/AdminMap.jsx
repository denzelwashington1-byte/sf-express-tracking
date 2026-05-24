import { useState } from 'react'
import { Map, Activity, Zap, Globe, Eye, Layers } from 'lucide-react'

export default function AdminMap() {
  const [viewMode, setViewMode] = useState('2d')
  const [selectedLayer, setSelectedLayer] = useState('all')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold neon-text flex items-center gap-2">
          <Map className="w-6 h-6" />
          Live Global Map
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('2d')}
            className={`px-4 py-2 rounded-lg transition-all ${
              viewMode === '2d' ? 'bg-neon-blue text-dark-bg' : 'glass hover:bg-white/10'
            }`}
          >
            2D View
          </button>
          <button
            onClick={() => setViewMode('3d')}
            className={`px-4 py-2 rounded-lg transition-all ${
              viewMode === '3d' ? 'bg-neon-blue text-dark-bg' : 'glass hover:bg-white/10'
            }`}
          >
            3D View
          </button>
          <button
            onClick={() => setViewMode('ar')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              viewMode === 'ar' ? 'bg-neon-purple text-white' : 'glass hover:bg-white/10'
            }`}
          >
            <Eye className="w-4 h-4" />
            AR Mode
          </button>
        </div>
      </div>

      {/* Map Controls */}
      <div className="glass rounded-xl p-4 neon-border">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-400">Layers:</span>
          </div>
          <button
            onClick={() => setSelectedLayer('all')}
            className={`px-3 py-1 rounded-lg text-sm transition-all ${
              selectedLayer === 'all' ? 'bg-neon-blue text-dark-bg' : 'glass hover:bg-white/10'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedLayer('drones')}
            className={`px-3 py-1 rounded-lg text-sm transition-all ${
              selectedLayer === 'drones' ? 'bg-neon-blue text-dark-bg' : 'glass hover:bg-white/10'
            }`}
          >
            Drones
          </button>
          <button
            onClick={() => setSelectedLayer('ground')}
            className={`px-3 py-1 rounded-lg text-sm transition-all ${
              selectedLayer === 'ground' ? 'bg-neon-blue text-dark-bg' : 'glass hover:bg-white/10'
            }`}
          >
            Ground Bots
          </button>
          <button
            onClick={() => setSelectedLayer('tubes')}
            className={`px-3 py-1 rounded-lg text-sm transition-all ${
              selectedLayer === 'tubes' ? 'bg-neon-blue text-dark-bg' : 'glass hover:bg-white/10'
            }`}
          >
            Tube Network
          </button>
          <button
            onClick={() => setSelectedLayer('weather')}
            className={`px-3 py-1 rounded-lg text-sm transition-all ${
              selectedLayer === 'weather' ? 'bg-neon-blue text-dark-bg' : 'glass hover:bg-white/10'
            }`}
          >
            Weather
          </button>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="glass rounded-xl p-8 neon-border min-h-[600px] flex items-center justify-center relative overflow-hidden">
        {/* Animated background to simulate map */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-surface to-dark-bg">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute w-2 h-2 bg-neon-blue rounded-full top-1/4 left-1/4 animate-pulse" />
            <div className="absolute w-2 h-2 bg-neon-purple rounded-full top-1/3 left-1/2 animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute w-2 h-2 bg-neon-green rounded-full top-1/2 left-3/4 animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute w-2 h-2 bg-neon-blue rounded-full top-2/3 left-1/3 animate-pulse" style={{ animationDelay: '1.5s' }} />
            <div className="absolute w-2 h-2 bg-neon-purple rounded-full top-3/4 left-2/3 animate-pulse" style={{ animationDelay: '2s' }} />
            
            {/* Grid lines */}
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 240, 255, 0.1)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 text-center">
          <Globe className="w-24 h-24 text-neon-blue mx-auto mb-4 animate-pulse-slow" />
          <h3 className="text-2xl font-bold mb-2 neon-text">Global Logistics Network</h3>
          <p className="text-gray-400 mb-4">Real-time tracking of 284 autonomous vehicles worldwide</p>
          <div className="flex justify-center gap-8 mt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-blue">247</div>
              <div className="text-sm text-gray-400">Drones Active</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-purple">1,847</div>
              <div className="text-sm text-gray-400">Ground Bots</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-green">89</div>
              <div className="text-sm text-gray-400">Tube Stations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Legend */}
      <div className="glass rounded-xl p-6 neon-border">
        <h3 className="text-xl font-bold mb-4">Map Legend</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-neon-blue rounded-full" />
            <span className="text-sm">Delivery Drones</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-neon-purple rounded-full" />
            <span className="text-sm">Ground Bots</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-neon-green rounded-full" />
            <span className="text-sm">Tube Network</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-yellow-400 rounded-full" />
            <span className="text-sm">Charging Stations</span>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="glass rounded-xl p-6 neon-border">
        <h3 className="text-xl font-bold mb-4 neon-purple-text flex items-center gap-2">
          <Zap className="w-5 h-5" />
          AI-Powered Map Insights
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-dark-surface/50 rounded-lg">
            <h4 className="font-semibold mb-2 text-neon-green">Congestion Prediction</h4>
            <p className="text-sm text-gray-400">Low congestion expected in next 2 hours across all sectors</p>
          </div>
          <div className="p-4 bg-dark-surface/50 rounded-lg">
            <h4 className="font-semibold mb-2 text-neon-blue">Weather Impact</h4>
            <p className="text-sm text-gray-400">3 routes adjusted for weather in Pacific sector</p>
          </div>
          <div className="p-4 bg-dark-surface/50 rounded-lg">
            <h4 className="font-semibold mb-2 text-neon-purple">Optimal Dispatch</h4>
            <p className="text-sm text-gray-400">AI recommends 12 drone reassignments for efficiency</p>
          </div>
        </div>
      </div>
    </div>
  )
}
