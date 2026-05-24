import { useState } from 'react'
import { Check, Star, Zap, Crown, Sparkles, ArrowRight } from 'lucide-react'

export default function SubscriptionTiers() {
  const [annual, setAnnual] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('pro')

  const tiers = [
    {
      id: 'free',
      name: 'Starter',
      icon: Sparkles,
      price: { monthly: 0, annual: 0 },
      description: 'Perfect for individuals',
      features: [
        '5 shipments per month',
        'Basic tracking',
        'Email support',
        'Standard delivery',
        'Carbon footprint tracking',
      ],
      limitations: [
        'No bulk upload',
        'No API access',
        'No priority support',
      ],
      popular: false
    },
    {
      id: 'pro',
      name: 'Professional',
      icon: Zap,
      price: { monthly: 29, annual: 290 },
      description: 'For small businesses',
      features: [
        '50 shipments per month',
        'Advanced tracking with AR',
        'Priority support',
        'Express delivery',
        'Carbon footprint tracking',
        'Bulk upload (CSV)',
        'Export reports',
        'AI chatbot access',
      ],
      limitations: [],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: Crown,
      price: { monthly: 99, annual: 990 },
      description: 'For large organizations',
      features: [
        'Unlimited shipments',
        'Full AI optimization',
        '24/7 dedicated support',
        'Hyperloop access',
        'Blockchain verification',
        'Custom integrations',
        'API access',
        'White-label options',
        'Predictive maintenance',
        'Neural interface access',
      ],
      limitations: [],
      popular: false
    },
  ]

  const handleSubscribe = (planId) => {
    setSelectedPlan(planId)
    // Handle subscription logic
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 neon-text">Choose Your Plan</h2>
        <p className="text-gray-400">Select the perfect plan for your logistics needs</p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="glass rounded-full p-1 flex items-center">
          <button
            onClick={() => setAnnual(false)}
            className={`px-6 py-2 rounded-full transition-all ${
              !annual ? 'bg-neon-blue text-dark-bg font-semibold' : 'text-gray-400'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-6 py-2 rounded-full transition-all ${
              annual ? 'bg-neon-blue text-dark-bg font-semibold' : 'text-gray-400'
            }`}
          >
            Annual
            <span className="ml-2 text-xs bg-neon-green text-dark-bg px-2 py-0.5 rounded-full">Save 17%</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={`glass rounded-2xl p-6 neon-border relative ${
              tier.popular ? 'ring-2 ring-neon-blue scale-105' : ''
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-neon-blue text-dark-bg text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Most Popular
                </span>
              </div>
            )}

            {/* Icon */}
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
              tier.id === 'free' ? 'bg-gray-400/20' :
              tier.id === 'pro' ? 'bg-neon-blue/20' :
              'bg-neon-purple/20'
            }`}>
              <tier.icon className={`w-8 h-8 ${
                tier.id === 'free' ? 'text-gray-400' :
                tier.id === 'pro' ? 'text-neon-blue' :
                'text-neon-purple'
              }`} />
            </div>

            {/* Name & Price */}
            <h3 className="text-xl font-bold text-center mb-1">{tier.name}</h3>
            <p className="text-sm text-gray-400 text-center mb-4">{tier.description}</p>
            <div className="text-center mb-6">
              <span className="text-4xl font-bold">
                ${annual ? tier.price.annual : tier.price.monthly}
              </span>
              <span className="text-gray-400">/{annual ? 'year' : 'month'}</span>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-6">
              {tier.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-neon-green mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
              {tier.limitations.map((limitation, index) => (
                <div key={index} className="flex items-start gap-2 text-gray-500">
                  <span className="w-4 h-4 mt-0.5 flex-shrink-0 text-center">×</span>
                  <span className="text-sm">{limitation}</span>
                </div>
              ))}
            </div>

            {/* Subscribe Button */}
            <button
              onClick={() => handleSubscribe(tier.id)}
              className={`w-full py-3 rounded-lg font-semibold transition-all ${
                selectedPlan === tier.id
                  ? 'bg-neon-blue text-dark-bg'
                  : 'glass hover:bg-white/10'
              }`}
            >
              {selectedPlan === tier.id ? 'Selected' : 'Subscribe'}
            </button>
          </div>
        ))}
      </div>

      {/* Feature Comparison */}
      <div className="glass rounded-xl p-6 neon-border mt-8">
        <h3 className="text-xl font-bold mb-6 text-center">Feature Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4">Feature</th>
                <th className="text-center py-3 px-4">Starter</th>
                <th className="text-center py-3 px-4">Professional</th>
                <th className="text-center py-3 px-4">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: 'Monthly Shipments', starter: '5', pro: '50', enterprise: 'Unlimited' },
                { feature: 'AR Tracking', starter: 'Basic', pro: 'Advanced', enterprise: 'Full' },
                { feature: 'AI Optimization', starter: '×', pro: 'Basic', enterprise: 'Full' },
                { feature: 'Support', starter: 'Email', pro: 'Priority', enterprise: '24/7 Dedicated' },
                { feature: 'Bulk Upload', starter: '×', pro: 'CSV', enterprise: 'CSV + API' },
                { feature: 'Blockchain Verification', starter: '×', pro: '×', enterprise: '✓' },
                { feature: 'API Access', starter: '×', pro: '×', enterprise: '✓' },
                { feature: 'Neural Interface', starter: '×', pro: '×', enterprise: '✓' },
                { feature: 'Custom Integrations', starter: '×', pro: '×', enterprise: '✓' },
              ].map((row, index) => (
                <tr key={index} className="border-b border-white/5">
                  <td className="py-3 px-4 text-sm">{row.feature}</td>
                  <td className="text-center py-3 px-4 text-sm">{row.starter}</td>
                  <td className="text-center py-3 px-4 text-sm text-neon-blue font-semibold">{row.pro}</td>
                  <td className="text-center py-3 px-4 text-sm text-neon-purple font-semibold">{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enterprise CTA */}
      <div className="glass rounded-xl p-8 neon-border text-center">
        <Crown className="w-12 h-12 text-neon-purple mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Need a Custom Solution?</h3>
        <p className="text-gray-400 mb-6">Contact our sales team for enterprise pricing and custom integrations</p>
        <button className="px-8 py-3 bg-neon-purple text-white font-semibold rounded-lg hover:bg-neon-purple/80 transition-all flex items-center gap-2 mx-auto">
          Contact Sales
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
