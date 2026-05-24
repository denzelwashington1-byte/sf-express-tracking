import { useState } from 'react'
import { Download, FileText, Calendar, Filter, BarChart3, CheckCircle } from 'lucide-react'

export default function ExportReporting({ data, type = 'shipments' }) {
  const [exportFormat, setExportFormat] = useState('csv')
  const [dateRange, setDateRange] = useState('30')
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = () => {
    setIsExporting(true)
    
    // Simulate export process
    setTimeout(() => {
      const mockData = generateMockData(type)
      
      if (exportFormat === 'csv') {
        exportToCSV(mockData, type)
      } else if (exportFormat === 'pdf') {
        exportToPDF(mockData, type)
      } else if (exportFormat === 'json') {
        exportToJSON(mockData, type)
      }
      
      setIsExporting(false)
    }, 1500)
  }

  const generateMockData = (reportType) => {
    switch (reportType) {
      case 'shipments':
        return [
          { id: 'SF-2062-001234', date: '2024-01-15', from: 'San Francisco', to: 'Tokyo', status: 'delivered', cost: 45.00 },
          { id: 'SF-2062-001235', date: '2024-01-14', from: 'New York', to: 'London', status: 'delivered', cost: 38.00 },
          { id: 'SF-2062-001236', date: '2024-01-15', from: 'Los Angeles', to: 'Singapore', status: 'in-transit', cost: 52.00 },
        ]
      case 'analytics':
        return {
          totalShipments: 1247,
          totalCost: 12847,
          avgDeliveryTime: 2.4,
          onTimeRate: 96,
          carbonSaved: 347
        }
      case 'carbon':
        return [
          { month: 'January', co2Saved: 347, co2Emitted: 372, greenRoutes: 89 },
          { month: 'December', co2Saved: 356, co2Emitted: 367, greenRoutes: 91 },
          { month: 'November', co2Saved: 334, co2Emitted: 378, greenRoutes: 88 },
        ]
      default:
        return []
    }
  }

  const exportToCSV = (data, reportType) => {
    let csvContent = ''
    
    if (reportType === 'shipments') {
      csvContent = 'ID,Date,From,To,Status,Cost\n'
      data.forEach(row => {
        csvContent += `${row.id},${row.date},${row.from},${row.to},${row.status},${row.cost}\n`
      })
    } else if (reportType === 'carbon') {
      csvContent = 'Month,CO2 Saved (kg),CO2 Emitted (kg),Green Routes (%)\n'
      data.forEach(row => {
        csvContent += `${row.month},${row.co2Saved},${row.co2Emitted},${row.greenRoutes}\n`
      })
    }
    
    downloadFile(csvContent, `${reportType}_report.csv`, 'text/csv')
  }

  const exportToPDF = (data, reportType) => {
    // For demo purposes, we'll create a simple text-based PDF
    let pdfContent = `SF Express 2062 - ${reportType.toUpperCase()} Report\n\n`
    pdfContent += `Generated: ${new Date().toLocaleString()}\n\n`
    
    if (reportType === 'shipments') {
      pdfContent += 'SHIPMENT REPORT\n\n'
      data.forEach(row => {
        pdfContent += `${row.id} | ${row.date} | ${row.from} → ${row.to} | ${row.status} | $${row.cost}\n`
      })
    } else if (reportType === 'analytics') {
      pdfContent = `SF Express 2062 - ANALYTICS REPORT\n\n`
      pdfContent += `Generated: ${new Date().toLocaleString()}\n\n`
      pdfContent += `Total Shipments: ${data.totalShipments}\n`
      pdfContent += `Total Cost: $${data.totalCost}\n`
      pdfContent += `Average Delivery Time: ${data.avgDeliveryTime}h\n`
      pdfContent += `On-Time Rate: ${data.onTimeRate}%\n`
      pdfContent += `CO2 Saved: ${data.carbonSaved} kg\n`
    } else if (reportType === 'carbon') {
      pdfContent += 'CARBON FOOTPRINT REPORT\n\n'
      data.forEach(row => {
        pdfContent += `${row.month} | Saved: ${row.co2Saved}kg | Emitted: ${row.co2Emitted}kg | Green: ${row.greenRoutes}%\n`
      })
    }
    
    downloadFile(pdfContent, `${reportType}_report.txt`, 'text/plain')
  }

  const exportToJSON = (data, reportType) => {
    const jsonContent = JSON.stringify(data, null, 2)
    downloadFile(jsonContent, `${reportType}_report.json`, 'application/json')
  }

  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="glass rounded-xl p-6 neon-border">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Download className="w-5 h-5 text-neon-blue" />
        Export & Reporting
      </h3>

      {/* Report Type Selection */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Report Type</label>
          <select
            value={type}
            disabled
            className="w-full px-4 py-3 bg-dark-surface border border-white/10 rounded-lg focus:border-neon-blue focus:outline-none transition-colors"
          >
            <option value="shipments">Shipment Report</option>
            <option value="analytics">Analytics Report</option>
            <option value="carbon">Carbon Footprint Report</option>
          </select>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Date Range
          </label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full px-4 py-3 bg-dark-surface border border-white/10 rounded-lg focus:border-neon-blue focus:outline-none transition-colors"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
            <option value="custom">Custom range</option>
          </select>
        </div>

        {/* Export Format */}
        <div>
          <label className="block text-sm font-medium mb-2">Export Format</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'csv', label: 'CSV', icon: FileText },
              { value: 'pdf', label: 'PDF', icon: FileText },
              { value: 'json', label: 'JSON', icon: FileText },
            ].map((format) => (
              <button
                key={format.value}
                onClick={() => setExportFormat(format.value)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  exportFormat === format.value
                    ? 'border-neon-blue bg-neon-blue/20'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                <format.icon className="w-5 h-5 mx-auto mb-2 text-gray-400" />
                <span className="text-sm">{format.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Export Button */}
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="w-full py-3 bg-neon-blue text-dark-bg font-bold rounded-lg hover:bg-neon-blue/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isExporting ? (
            <>
              <div className="w-4 h-4 border-2 border-dark-bg border-t-transparent rounded-full animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Export Report
            </>
          )}
        </button>
      </div>

      {/* Scheduled Reports */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-neon-purple" />
          Scheduled Reports
        </h4>
        <div className="space-y-3">
          {[
            { name: 'Weekly Shipment Summary', frequency: 'Every Monday', next: 'Jan 22, 2024' },
            { name: 'Monthly Analytics', frequency: '1st of month', next: 'Feb 1, 2024' },
            { name: 'Carbon Footprint Report', frequency: 'Quarterly', next: 'Apr 1, 2024' },
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-dark-surface/50 rounded-lg">
              <div>
                <p className="font-semibold text-sm">{report.name}</p>
                <p className="text-xs text-gray-400">{report.frequency}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-neon-green flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Active
                </p>
                <p className="text-xs text-gray-400">Next: {report.next}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full py-2 glass rounded-lg hover:bg-white/10 transition-all text-sm">
          + Schedule New Report
        </button>
      </div>
    </div>
  )
}
