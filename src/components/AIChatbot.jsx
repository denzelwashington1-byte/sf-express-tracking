import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, Bot, User, Zap } from 'lucide-react'

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hello! I\'m your AI assistant. How can I help you with your shipments today?' }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { id: Date.now(), type: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateAIResponse(input)
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: botResponse }])
      setIsTyping(false)
    }, 1000)
  }

  const generateAIResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase()

    if (lowerInput.includes('track') || lowerInput.includes('where is')) {
      return 'I can help you track your package. Please provide your tracking ID, or I can show you all your active shipments in the tracking section.'
    } else if (lowerInput.includes('create') || lowerInput.includes('new') || lowerInput.includes('ship')) {
      return 'To create a new shipment, go to the "Create Shipment" section. You can also use voice commands by saying "Create shipment to [destination]"'
    } else if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('quote')) {
      return 'I can help you get a shipping quote. Please provide the origin, destination, and package weight. Or use the Quick Quote feature in the dashboard.'
    } else if (lowerInput.includes('delay') || lowerInput.includes('late') || lowerInput.includes('problem')) {
      return 'I\'m sorry to hear about a delay. Let me check the status... The AI system has already rerouted affected shipments. Your package should arrive within the revised ETA.'
    } else if (lowerInput.includes('carbon') || lowerInput.includes('eco') || lowerInput.includes('green')) {
      return 'Great question about sustainability! Your shipments have saved 347 kg of CO2 this month. You can view detailed carbon analytics in the Carbon Footprint section.'
    } else if (lowerInput.includes('drone') || lowerInput.includes('autonomous')) {
      return 'Our autonomous fleet includes 247 active drones, 1,847 ground bots, and 89 hyperloop tube stations. All are AI-optimized for efficiency and safety.'
    } else if (lowerInput.includes('help') || lowerInput.includes('what can you do')) {
      return 'I can help you with: tracking shipments, creating new shipments, getting price quotes, checking delivery status, carbon footprint information, fleet details, and general account questions. What would you like to know?'
    } else if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return 'Hello! How can I assist you with your logistics needs today?'
    } else {
      return 'I understand you\'re asking about "' + userInput + '". Let me help you with that. You can find more details in the relevant section of your dashboard, or would you like me to guide you through specific features?'
    }
  }

  const quickActions = [
    { label: 'Track Package', action: 'Where is my package?' },
    { label: 'Create Shipment', action: 'I want to create a shipment' },
    { label: 'Get Quote', action: 'How much to ship to Tokyo?' },
    { label: 'Carbon Info', action: 'Tell me about my carbon footprint' },
  ]

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 bg-neon-blue text-dark-bg rounded-full shadow-lg hover:bg-neon-blue/80 transition-all neon-border"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] glass rounded-2xl neon-border flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-neon-blue/20 rounded-lg">
                <Bot className="w-5 h-5 text-neon-blue" />
              </div>
              <div>
                <h3 className="font-bold">SF Express AI</h3>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`p-2 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-neon-blue text-dark-bg' 
                    : 'bg-dark-surface text-white'
                }`}>
                  {message.type === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-neon-blue text-dark-bg'
                    : 'bg-dark-surface/50 text-white'
                }`}>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="p-2 rounded-lg bg-dark-surface">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-dark-surface/50 p-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-white/10">
            <p className="text-xs text-gray-400 mb-2">Quick actions:</p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => setInput(action.action)}
                  className="px-3 py-1 text-xs bg-dark-surface/50 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 bg-dark-surface border border-white/10 rounded-lg focus:border-neon-blue focus:outline-none transition-colors text-sm"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2 bg-neon-blue text-dark-bg rounded-lg hover:bg-neon-blue/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
