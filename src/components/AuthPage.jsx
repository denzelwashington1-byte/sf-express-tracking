import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Mail, Phone, Lock, User, ArrowLeft, Check } from 'lucide-react'

export default function AuthPage({ onLogin }) {
  const { type } = useParams()
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [isEmailAuth, setIsEmailAuth] = useState(true)
  const [verificationSent, setVerificationSent] = useState(false)
  const [verified, setVerified] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    name: '',
    verificationCode: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (isLogin) {
      // Login logic
      const userData = {
        id: Date.now(),
        email: formData.email,
        phone: formData.phone,
        name: formData.name || 'User',
        type: type
      }
      onLogin(userData, type)
      navigate(type === 'admin' ? '/admin/dashboard' : '/customer/dashboard')
    } else if (verified) {
      // After verification, complete signup
      const userData = {
        id: Date.now(),
        email: formData.email,
        phone: formData.phone,
        name: formData.name,
        type: type
      }
      onLogin(userData, type)
      navigate(type === 'admin' ? '/admin/dashboard' : '/customer/dashboard')
    } else {
      // Send verification code
      setVerificationSent(true)
    }
  }

  const handleVerify = (e) => {
    e.preventDefault()
    // Simulate verification - in real app, this would verify the code
    if (formData.verificationCode === '123456') {
      setVerified(true)
    } else {
      alert('Invalid code. Use 123456 for demo.')
    }
  }

  const handleResend = () => {
    alert(`Verification code resent to ${isEmailAuth ? formData.email : formData.phone}`)
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl animate-pulse-slow top-20 left-20"></div>
        <div className="absolute w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-pulse-slow bottom-20 right-20" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="glass rounded-2xl p-8 neon-border">
          <h1 className="text-3xl font-bold mb-2 neon-text">
            {type === 'admin' ? 'Admin' : type === 'customer' ? 'Customer' : 'Receiver'} {isLogin ? 'Login' : 'Sign Up'}
          </h1>
          <p className="text-gray-400 mb-6">
            {type === 'admin' ? 'Manage your logistics empire' : 'Ship with the future'}
          </p>

          {!verificationSent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-dark-surface border border-white/10 rounded-lg focus:border-neon-blue focus:outline-none transition-colors"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">
                  {isEmailAuth ? 'Email Address' : 'Phone Number'}
                </label>
                <div className="relative">
                  {isEmailAuth ? (
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  ) : (
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  )}
                  <input
                    type={isEmailAuth ? 'email' : 'tel'}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-dark-surface border border-white/10 rounded-lg focus:border-neon-blue focus:outline-none transition-colors"
                    placeholder={isEmailAuth ? 'Enter your email' : 'Enter your phone'}
                    value={isEmailAuth ? formData.email : formData.phone}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      [isEmailAuth ? 'email' : 'phone']: e.target.value 
                    })}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsEmailAuth(!isEmailAuth)}
                className="text-sm text-neon-blue hover:underline"
              >
                Use {isEmailAuth ? 'phone number' : 'email'} instead
              </button>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-dark-surface border border-white/10 rounded-lg focus:border-neon-blue focus:outline-none transition-colors"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-neon-blue text-dark-bg font-bold rounded-lg hover:bg-neon-blue/80 transition-all"
              >
                {isLogin ? 'Login' : 'Send Verification Code'}
              </button>

              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="w-full text-sm text-gray-400 hover:text-white transition-colors"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
              </button>
            </form>
          ) : verified ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-neon-green" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-neon-green">Verified!</h2>
              <p className="text-gray-400 mb-6">Your account has been verified successfully.</p>
              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-neon-green text-dark-bg font-bold rounded-lg hover:bg-neon-green/80 transition-all"
              >
                Complete Sign Up
              </button>
            </div>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="text-center mb-6">
                <p className="text-gray-400">
                  We've sent a 6-digit verification code to:
                </p>
                <p className="text-white font-semibold mt-1">
                  {isEmailAuth ? formData.email : formData.phone}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Verification Code</label>
                <input
                  type="text"
                  required
                  maxLength="6"
                  className="w-full px-4 py-3 bg-dark-surface border border-white/10 rounded-lg focus:border-neon-blue focus:outline-none transition-colors text-center text-2xl tracking-widest"
                  placeholder="123456"
                  value={formData.verificationCode}
                  onChange={(e) => setFormData({ ...formData, verificationCode: e.target.value })}
                />
                <p className="text-xs text-gray-500 mt-2">Demo code: 123456</p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-neon-blue text-dark-bg font-bold rounded-lg hover:bg-neon-blue/80 transition-all"
              >
                Verify
              </button>

              <button
                type="button"
                onClick={handleResend}
                className="w-full text-sm text-neon-blue hover:underline"
              >
                Resend Code
              </button>

              <button
                type="button"
                onClick={() => setVerificationSent(false)}
                className="w-full text-sm text-gray-400 hover:text-white transition-colors"
              >
                Change {isEmailAuth ? 'email' : 'phone'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
