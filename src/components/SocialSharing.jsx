import { useState } from 'react'
import { Share2, Facebook, Twitter, Linkedin, MessageCircle, Mail, Link as LinkIcon, Copy, Check, Gift, Heart } from 'lucide-react'

export default function SocialSharing({ shipmentId, shipmentDetails }) {
  const [copied, setCopied] = useState(false)
  const [sharedPlatforms, setSharedPlatforms] = useState([])

  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'bg-sky-500' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700' },
    { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, color: 'bg-green-500' },
    { id: 'email', name: 'Email', icon: Mail, color: 'bg-gray-600' },
  ]

  const shareMessage = `🚀 My package ${shipmentId || 'SF-2062-001234'} is on its way! Track it live with SF Express 2062's quantum-encrypted delivery system. #FutureOfLogistics #SFExpress2062`

  const handleCopyLink = () => {
    const trackingUrl = `https://sfexpress2062.netlify.app/receiver/${shipmentId || 'SF-2062-001234'}`
    navigator.clipboard.writeText(trackingUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = (platform) => {
    setSharedPlatforms(prev => [...prev, platform])
    
    const url = `https://sfexpress2062.netlify.app/receiver/${shipmentId || 'SF-2062-001234'}`
    
    switch (platform.id) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage + ' ' + url)}`, '_blank')
        break
      case 'email':
        window.open(`mailto:?subject=Package Delivery Update&body=${encodeURIComponent(shareMessage + '\n\nTrack here: ' + url)}`, '_blank')
        break
    }
  }

  const celebrationAnimations = [
    { emoji: '🎉', label: 'Package Delivered!' },
    { emoji: '🚁', label: 'On the Way!' },
    { emoji: '✨', label: 'Fast Delivery!' },
    { emoji: '🌟', label: 'Express Service!' },
    { emoji: '🎁', label: 'Special Delivery!' },
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <Share2 className="w-5 h-5 text-neon-blue" />
        Share Delivery Update
      </h3>

      {/* Share Options */}
      <div className="glass rounded-xl p-6 neon-border">
        <div className="grid grid-cols-5 gap-4 mb-6">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => handleShare(platform)}
              className={`p-4 rounded-lg ${platform.color} text-white hover:opacity-80 transition-all flex flex-col items-center gap-2`}
            >
              <platform.icon className="w-6 h-6" />
              <span className="text-xs font-semibold">{platform.name}</span>
            </button>
          ))}
        </div>

        {/* Copy Link */}
        <div className="flex gap-2">
          <div className="flex-1 px-4 py-3 bg-dark-surface border border-white/10 rounded-lg flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400 truncate">
              https://sfexpress2062.netlify.app/receiver/{shipmentId || 'SF-2062-001234'}
            </span>
          </div>
          <button
            onClick={handleCopyLink}
            className="px-4 py-3 bg-neon-blue text-dark-bg rounded-lg hover:bg-neon-blue/80 transition-all flex items-center gap-2"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Celebration Animations */}
      <div className="glass rounded-xl p-6 neon-border">
        <h4 className="font-bold mb-4 flex items-center gap-2">
          <Gift className="w-5 h-5 text-neon-purple" />
          Delivery Celebration
        </h4>
        <p className="text-sm text-gray-400 mb-4">Share a celebration animation when your package is delivered</p>
        <div className="grid grid-cols-5 gap-3">
          {celebrationAnimations.map((anim, index) => (
            <button
              key={index}
              className="p-4 bg-dark-surface/50 rounded-lg hover:bg-white/10 transition-all text-center"
            >
              <div className="text-3xl mb-2">{anim.emoji}</div>
              <p className="text-xs text-gray-400">{anim.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Message */}
      <div className="glass rounded-xl p-6 neon-border">
        <h4 className="font-bold mb-4">Custom Message</h4>
        <textarea
          defaultValue={shareMessage}
          className="w-full px-4 py-3 bg-dark-surface border border-white/10 rounded-lg focus:border-neon-blue focus:outline-none transition-colors resize-none"
          rows={3}
          placeholder="Add a personal message..."
        />
        <button className="mt-4 w-full py-3 bg-neon-purple text-white font-semibold rounded-lg hover:bg-neon-purple/80 transition-all">
          Share with Custom Message
        </button>
      </div>

      {/* Privacy Settings */}
      <div className="glass rounded-xl p-6 neon-border">
        <h4 className="font-bold mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-neon-green" />
          Privacy Settings
        </h4>
        <div className="space-y-3">
          {[
            { label: 'Show tracking link publicly', checked: false },
            { label: 'Display delivery address', checked: false },
            { label: 'Show package contents', checked: false },
            { label: 'Allow recipient to share', checked: true },
          ].map((setting, index) => (
            <label key={index} className="flex items-center justify-between p-3 bg-dark-surface/50 rounded-lg cursor-pointer">
              <span className="text-sm">{setting.label}</span>
              <input
                type="checkbox"
                defaultChecked={setting.checked}
                className="w-5 h-5 rounded"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Shared History */}
      {sharedPlatforms.length > 0 && (
        <div className="glass rounded-xl p-6 neon-border">
          <h4 className="font-bold mb-4">Recently Shared</h4>
          <div className="space-y-2">
            {sharedPlatforms.map((platform, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-dark-surface/50 rounded-lg">
                <platform.icon className="w-5 h-5 text-gray-400" />
                <span className="text-sm">Shared to {platform.name}</span>
                <span className="text-xs text-gray-500 ml-auto">Just now</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
