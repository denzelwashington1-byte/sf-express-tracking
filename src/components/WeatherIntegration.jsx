import { useState, useEffect } from 'react'
import { Cloud, CloudRain, Sun, Wind, AlertTriangle, MapPin, Clock } from 'lucide-react'

export default function WeatherIntegration({ route }) {
  const [weatherData, setWeatherData] = useState(null)
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    // Simulate weather data
    const mockWeatherData = {
      origin: {
        location: route?.from || 'San Francisco',
        temperature: 22,
        condition: 'sunny',
        humidity: 45,
        windSpeed: 12,
        visibility: 10
      },
      destination: {
        location: route?.to || 'Tokyo',
        temperature: 18,
        condition: 'cloudy',
        humidity: 65,
        windSpeed: 8,
        visibility: 8
      },
      route: {
        conditions: 'mostly clear',
        riskLevel: 'low',
        recommendation: 'optimal for delivery'
      }
    }

    const mockAlerts = [
      { id: 1, type: 'info', message: 'Light winds expected along Pacific route', severity: 'low' },
      { id: 2, type: 'warning', message: 'Possible rain in Tokyo sector in 4 hours', severity: 'medium' },
    ]

    setWeatherData(mockWeatherData)
    setAlerts(mockAlerts)
  }, [route])

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-6 h-6 text-yellow-400" />
      case 'cloudy': return <Cloud className="w-6 h-6 text-gray-400" />
      case 'rainy': return <CloudRain className="w-6 h-6 text-blue-400" />
      default: return <Cloud className="w-6 h-6 text-gray-400" />
    }
  }

  const getRiskColor = (level) => {
    switch (level) {
      case 'low': return 'text-neon-green'
      case 'medium': return 'text-yellow-400'
      case 'high': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'low': return 'bg-neon-blue/20 text-neon-blue'
      case 'medium': return 'bg-yellow-400/20 text-yellow-400'
      case 'high': return 'bg-red-400/20 text-red-400'
      default: return 'bg-gray-400/20 text-gray-400'
    }
  }

  if (!weatherData) return null

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold flex items-center gap-2">
        <Cloud className="w-5 h-5 text-neon-blue" />
        Weather Integration
      </h3>

      {/* Route Weather */}
      <div className="glass rounded-xl p-4 neon-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Route Conditions</span>
          </div>
          <span className={`font-semibold ${getRiskColor(weatherData.route.riskLevel)}`}>
            {weatherData.route.riskLevel.toUpperCase()} RISK
          </span>
        </div>
        <p className="text-sm text-gray-400 mb-3">{weatherData.route.conditions}</p>
        <div className="p-3 bg-neon-green/20 rounded-lg">
          <p className="text-sm text-neon-green">
            <strong>AI Recommendation:</strong> {weatherData.route.recommendation}
          </p>
        </div>
      </div>

      {/* Origin & Destination Weather */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass rounded-xl p-4 neon-border">
          <div className="flex items-center gap-2 mb-3">
            {getWeatherIcon(weatherData.origin.condition)}
            <div>
              <p className="font-semibold">{weatherData.origin.location}</p>
              <p className="text-xs text-gray-400">Origin</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Temperature</span>
              <span className="font-semibold">{weatherData.origin.temperature}°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Humidity</span>
              <span className="font-semibold">{weatherData.origin.humidity}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Wind</span>
              <span className="font-semibold">{weatherData.origin.windSpeed} km/h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Visibility</span>
              <span className="font-semibold">{weatherData.origin.visibility} km</span>
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-4 neon-border">
          <div className="flex items-center gap-2 mb-3">
            {getWeatherIcon(weatherData.destination.condition)}
            <div>
              <p className="font-semibold">{weatherData.destination.location}</p>
              <p className="text-xs text-gray-400">Destination</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Temperature</span>
              <span className="font-semibold">{weatherData.destination.temperature}°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Humidity</span>
              <span className="font-semibold">{weatherData.destination.humidity}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Wind</span>
              <span className="font-semibold">{weatherData.destination.windSpeed} km/h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Visibility</span>
              <span className="font-semibold">{weatherData.destination.visibility} km</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Alerts */}
      {alerts.length > 0 && (
        <div className="glass rounded-xl p-4 neon-border">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            Weather Alerts
          </h4>
          <div className="space-y-2">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-3 rounded-lg ${getAlertColor(alert.severity)}`}>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold">{alert.message}</p>
                    <p className="text-xs opacity-75">Severity: {alert.severity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Route Optimization */}
      <div className="glass rounded-xl p-4 neon-border">
        <h4 className="font-semibold mb-3 text-neon-purple-text">AI Route Optimization</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <Wind className="w-4 h-4" />
            <span>Wind patterns analyzed - optimal altitude: 150m</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Cloud className="w-4 h-4" />
            <span>Cloud cover minimal - clear visibility expected</span>
          </div>
          <div className="flex items-center gap-2 text-neon-green">
            <Sun className="w-4 h-4" />
            <span>No weather delays anticipated</span>
          </div>
        </div>
      </div>
    </div>
  )
}
