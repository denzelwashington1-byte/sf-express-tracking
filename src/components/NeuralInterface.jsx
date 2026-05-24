import { useState, useEffect } from 'react'
import { Brain, Activity, Zap, Eye, Hand, Mic, X, Maximize2 } from 'lucide-react'

export default function NeuralInterface() {
  const [isActive, setIsActive] = useState(false)
  const [brainActivity, setBrainActivity] = useState(0)
  const [thoughts, setThoughts] = useState([])
  const [gestureMode, setGestureMode] = useState(false)

  useEffect(() => {
    let interval
    if (isActive) {
      interval = setInterval(() => {
        setBrainActivity(prev => Math.min(prev + Math.random() * 10, 100))
        
        // Simulate neural thoughts
        const possibleThoughts = [
          'Analyzing shipment route optimization...',
          'Processing weather data for Pacific sector...',
          'Calculating optimal drone altitude...',
          'Predicting delivery time based on traffic patterns...',
          'Evaluating carbon footprint impact...',
          'Scanning for potential route conflicts...',
          'Optimizing swarm intelligence patterns...',
        ]
        
        if (Math.random() > 0.7) {
          setThoughts(prev => [...prev.slice(-4), { text: possibleThoughts[Math.floor(Math.random() * possibleThoughts.length)], time: new Date().toLocaleTimeString() }])
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isActive])

  const toggleInterface = () => {
    setIsActive(!isActive)
    if (!isActive) {
      setBrainActivity(0)
      setThoughts([])
    }
  }

  const neuralCommands = [
    { icon: Package, label: 'Create Shipment', action: 'THOUGHT: Create new shipment to Tokyo' },
    { icon: MapPin, label: 'Track Package', action: 'THOUGHT: Where is my package SF-2062-001234?' },
    { icon: BarChart3, label: 'Analytics', action: 'THOUGHT: Show me delivery analytics' },
    { icon: Leaf, label: 'Carbon Info', action: 'THOUGHT: What is my carbon footprint?' },
  ]

  return (
    <>
      {/* Toggle Button */}
      {!isActive && (
        <button
          onClick={toggleInterface}
          className="fixed bottom-24 right-6 z-40 p-4 bg-neon-purple text-white rounded-full shadow-lg hover:bg-neon-purple/80 transition-all neon-border"
        >
          <Brain className="w-6 h-6" />
        </button>
      )}

      {/* Neural Interface Panel */}
      {isActive && (
        <div className="fixed inset-0 z-50 bg-dark-bg/95 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="w-full max-w-4xl glass rounded-2xl p-8 neon-border">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-neon-purple/20 rounded-lg">
                  <Brain className="w-8 h-8 text-neon-purple animate-pulse" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold neon-purple-text">Neural Interface</h2>
                  <p className="text-sm text-gray-400">Brain-Computer Interface Active</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setGestureMode(!gestureMode)}
                  className={`p-3 rounded-lg transition-all ${gestureMode ? 'bg-neon-blue/20 text-neon-blue' : 'glass hover:bg-white/10'}`}
                >
                  <Hand className="w-5 h-5" />
                </button>
                <button
                  onClick={toggleInterface}
                  className="p-3 glass rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Brain Activity Visualization */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Activity Monitor */}
              <div className="glass rounded-xl p-6 neon-border">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-neon-blue" />
                  Neural Activity
                </h3>
                <div className="relative h-32 bg-dark-surface/50 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-end justify-around px-4 pb-4">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 bg-neon-blue rounded-full transition-all"
                        style={{
                          height: `${Math.random() * 80 + 20}%`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="text-3xl font-bold text-neon-blue">{Math.round(brainActivity)}%</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between text-sm">
                  <span className="text-gray-400">Synchronization</span>
                  <span className="text-neon-green font-semibold">Optimal</span>
                </div>
              </div>

              {/* Thought Stream */}
              <div className="glass rounded-xl p-6 neon-border">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-neon-purple" />
                  Thought Stream
                </h3>
                <div className="space-y-3 h-32 overflow-y-auto">
                  {thoughts.length === 0 ? (
                    <p className="text-gray-400 text-sm">Waiting for neural input...</p>
                  ) : (
                    thoughts.map((thought, index) => (
                      <div key={index} className="p-3 bg-dark-surface/50 rounded-lg">
                        <p className="text-sm text-neon-purple">{thought.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{thought.time}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Neural Commands */}
            <div className="glass rounded-xl p-6 neon-border mb-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-neon-green" />
                Neural Commands
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {neuralCommands.map((command, index) => (
                  <button
                    key={index}
                    onClick={() => setThoughts(prev => [...prev, { text: command.action, time: new Date().toLocaleTimeString() }])}
                    className="p-4 bg-dark-surface/50 rounded-lg hover:bg-white/10 transition-all text-center group"
                  >
                    <command.icon className="w-6 h-6 mx-auto mb-2 text-neon-blue group-hover:text-neon-purple transition-colors" />
                    <p className="text-sm font-semibold">{command.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Gesture Mode */}
            {gestureMode && (
              <div className="glass rounded-xl p-6 neon-border mb-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Hand className="w-5 h-5 text-neon-blue" />
                  Gesture Control Mode
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-dark-surface/50 rounded-lg">
                    <p className="text-2xl mb-2">👆</p>
                    <p className="text-sm text-gray-400">Tap to Select</p>
                  </div>
                  <div className="p-4 bg-dark-surface/50 rounded-lg">
                    <p className="text-2xl mb-2">👈</p>
                    <p className="text-sm text-gray-400">Swipe Left</p>
                  </div>
                  <div className="p-4 bg-dark-surface/50 rounded-lg">
                    <p className="text-2xl mb-2">👉</p>
                    <p className="text-sm text-gray-400">Swipe Right</p>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-400 mt-4">Camera tracking active - gesture recognition enabled</p>
              </div>
            )}

            {/* Biometric Status */}
            <div className="glass rounded-xl p-6 neon-border">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Mic className="w-5 h-5 text-neon-green" />
                Biometric Status
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-dark-surface/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Brain Waves</span>
                    <span className="text-neon-green text-sm">Connected</span>
                  </div>
                  <div className="h-2 bg-dark-surface rounded-full overflow-hidden">
                    <div className="h-full bg-neon-green w-full animate-pulse" />
                  </div>
                </div>
                <div className="p-4 bg-dark-surface/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Heart Rate</span>
                    <span className="text-neon-blue text-sm">72 BPM</span>
                  </div>
                  <div className="h-2 bg-dark-surface rounded-full overflow-hidden">
                    <div className="h-full bg-neon-blue w-3/4" />
                  </div>
                </div>
                <div className="p-4 bg-dark-surface/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Focus Level</span>
                    <span className="text-neon-purple text-sm">High</span>
                  </div>
                  <div className="h-2 bg-dark-surface rounded-full overflow-hidden">
                    <div className="h-full bg-neon-purple w-11/12" />
                  </div>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-6 text-center">
              <button
                onClick={toggleInterface}
                className="px-8 py-3 glass rounded-lg hover:bg-white/10 transition-all"
              >
                Disconnect Neural Interface
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
