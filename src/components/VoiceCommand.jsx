import { useState, useEffect, useRef } from 'react'
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react'

export default function VoiceCommand({ onCommand }) {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [lastCommand, setLastCommand] = useState('')
  const recognitionRef = useRef(null)

  useEffect(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = ''
        let interimTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
            processCommand(transcript)
          } else {
            interimTranscript += transcript
          }
        }

        setTranscript(interimTranscript || finalTranscript)
      }

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current.start()
        }
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [isListening])

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser')
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
      setTranscript('')
    }
  }

  const processCommand = (command) => {
    const lowerCommand = command.toLowerCase()
    setLastCommand(command)
    speak(`Processing: ${command}`)

    // Voice commands
    if (lowerCommand.includes('create shipment') || lowerCommand.includes('new shipment')) {
      onCommand?.('create-shipment')
      speak('Opening shipment creation form')
    } else if (lowerCommand.includes('track') || lowerCommand.includes('tracking')) {
      onCommand?.('tracking')
      speak('Opening live tracking')
    } else if (lowerCommand.includes('dashboard') || lowerCommand.includes('home')) {
      onCommand?.('dashboard')
      speak('Going to dashboard')
    } else if (lowerCommand.includes('analytics') || lowerCommand.includes('reports')) {
      onCommand?.('analytics')
      speak('Opening analytics')
    } else if (lowerCommand.includes('settings') || lowerCommand.includes('preferences')) {
      onCommand?.('settings')
      speak('Opening settings')
    } else if (lowerCommand.includes('help') || lowerCommand.includes('what can i say')) {
      speak('You can say: create shipment, track package, go to dashboard, show analytics, open settings, or stop listening')
    } else if (lowerCommand.includes('stop') || lowerCommand.includes('cancel')) {
      setIsListening(false)
      recognitionRef.current?.stop()
      speak('Voice commands stopped')
    } else {
      speak(`I heard: ${command}. Try saying "help" for available commands`)
    }
  }

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      window.speechSynthesis.speak(utterance)
    }
  }

  const commands = [
    { phrase: 'Create shipment', action: 'Opens shipment creation form' },
    { phrase: 'Track package', action: 'Opens live tracking' },
    { phrase: 'Go to dashboard', action: 'Navigates to dashboard' },
    { phrase: 'Show analytics', action: 'Opens analytics dashboard' },
    { phrase: 'Open settings', action: 'Opens settings page' },
    { phrase: 'Stop listening', action: 'Stops voice recognition' },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="glass rounded-2xl p-4 neon-border w-80">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-full ${isListening ? 'bg-neon-blue animate-pulse' : 'bg-dark-surface'}`}>
              {isListening ? <Mic className="w-4 h-4 text-dark-bg" /> : <MicOff className="w-4 h-4 text-gray-400" />}
            </div>
            <span className="font-semibold text-sm">Voice Commands</span>
          </div>
          <button
            onClick={toggleListening}
            className={`p-2 rounded-lg transition-all ${
              isListening ? 'bg-red-400/20 text-red-400 hover:bg-red-400/30' : 'bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        </div>

        {/* Transcript */}
        {transcript && (
          <div className="mb-4 p-3 bg-dark-surface/50 rounded-lg">
            <p className="text-sm text-gray-400">Listening...</p>
            <p className="text-white">{transcript}</p>
          </div>
        )}

        {/* Last Command */}
        {lastCommand && !transcript && (
          <div className="mb-4 p-3 bg-neon-green/20 rounded-lg">
            <p className="text-sm text-neon-green">Last command:</p>
            <p className="text-white">{lastCommand}</p>
          </div>
        )}

        {/* Available Commands */}
        <div className="space-y-2">
          <p className="text-xs text-gray-400 mb-2">Say:</p>
          {commands.map((cmd, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-white">"{cmd.phrase}"</span>
              <span className="text-gray-500">{cmd.action}</span>
            </div>
          ))}
        </div>

        {/* Status */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs">
            {isListening ? (
              <>
                <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
                <span className="text-neon-blue">Listening...</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-gray-400 rounded-full" />
                <span className="text-gray-400">Click mic to start</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
