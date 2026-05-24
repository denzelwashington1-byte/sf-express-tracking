import { Link } from 'react-router-dom'
import { Package, Drone, Shield, Zap, Globe, Leaf } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-bg relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl animate-pulse-slow top-20 left-20"></div>
        <div className="absolute w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-pulse-slow bottom-20 right-20" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-64 h-64 bg-neon-green/20 rounded-full blur-3xl animate-pulse-slow top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-6 py-8">
          <nav className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Package className="w-10 h-10 text-neon-blue" />
              <span className="text-2xl font-bold neon-text">SF Express 2062</span>
            </div>
            <div className="flex gap-4">
              <Link to="/auth/admin" className="px-6 py-2 rounded-lg glass hover:bg-white/10 transition-all">
                Admin
              </Link>
              <Link to="/auth/customer" className="px-6 py-2 rounded-lg glass hover:bg-white/10 transition-all">
                Customer
              </Link>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-6xl font-bold mb-6 neon-text animate-float">
            The Future of Delivery is Here
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Experience quantum-encrypted logistics with AR tracking, autonomous drone delivery, 
            and AI-powered routing. Welcome to 2062.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              to="/auth/customer" 
              className="px-8 py-4 bg-neon-blue text-dark-bg font-bold rounded-lg hover:bg-neon-blue/80 transition-all neon-border"
            >
              Start Shipping
            </Link>
            <Link 
              to="/auth/admin" 
              className="px-8 py-4 glass rounded-lg hover:bg-white/10 transition-all"
            >
              Admin Access
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold text-center mb-12 neon-purple-text">Futuristic Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Drone className="w-12 h-12" />}
              title="Autonomous Delivery"
              description="Drone and autonomous vehicle tracking with predictive paths in real-time 3D space"
            />
            <FeatureCard
              icon={<Shield className="w-12 h-12" />}
              title="Quantum Security"
              description="Quantum-encrypted location data with sub-centimeter accuracy"
            />
            <FeatureCard
              icon={<Zap className="w-12 h-12" />}
              title="AI Logistics"
              description="Self-optimizing routing using swarm intelligence and predictive delivery timing"
            />
            <FeatureCard
              icon={<Globe className="w-12 h-12" />}
              title="AR Tracking"
              description="Holographic map overlays showing packages in real-time 3D space"
            />
            <FeatureCard
              icon={<Leaf className="w-12 h-12" />}
              title="Sustainability"
              description="Carbon footprint tracking per shipment with eco-friendly routing"
            />
            <FeatureCard
              icon={<Package className="w-12 h-12" />}
              title="Smart Sensors"
              description="Package sensors streaming live data (temperature, shock, location)"
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-8 text-center text-gray-500">
          <p>© 2062 SF Express. The Future of Logistics.</p>
        </footer>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="glass rounded-xl p-6 hover:bg-white/10 transition-all neon-border">
      <div className="text-neon-blue mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}
