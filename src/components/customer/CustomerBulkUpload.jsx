import { useState } from 'react'
import { Upload, Download, FileSpreadsheet, CheckCircle, AlertCircle, X } from 'lucide-react'

export default function CustomerBulkUpload() {
  const [file, setFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState('idle')
  const [uploadedData, setUploadedData] = useState([])
  const [errors, setErrors] = useState([])

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setUploadStatus('uploading')
      
      // Simulate file processing
      setTimeout(() => {
        // Simulate parsed data
        const mockData = [
          { id: 1, from: 'San Francisco', to: 'Tokyo', weight: '2.5 kg', service: 'express' },
          { id: 2, from: 'New York', to: 'London', weight: '1.8 kg', service: 'standard' },
          { id: 3, from: 'Los Angeles', to: 'Singapore', weight: '3.2 kg', service: 'express' },
        ]
        setUploadedData(mockData)
        setUploadStatus('success')
      }, 1500)
    }
  }

  const handleDownloadTemplate = () => {
    // Create a CSV template
    const template = 'From,To,Weight (kg),Service,Recipient Name,Recipient Email,Recipient Phone\nSan Francisco,Tokyo,2.5,express,John Doe,john@example.com,+1-555-0100\nNew York,London,1.8,standard,Jane Smith,jane@example.com,+1-555-0101'
    
    const blob = new Blob([template], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'bulk_shipment_template.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleProcessShipments = () => {
    setUploadStatus('processing')
    setTimeout(() => {
      setUploadStatus('completed')
    }, 2000)
  }

  const handleRemoveFile = () => {
    setFile(null)
    setUploadedData([])
    setErrors([])
    setUploadStatus('idle')
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold neon-text flex items-center gap-2">
        <FileSpreadsheet className="w-6 h-6" />
        Bulk Shipment Upload
      </h2>

      {/* Upload Area */}
      {uploadStatus === 'idle' && (
        <div className="glass rounded-xl p-8 neon-border">
          <div className="border-2 border-dashed border-white/20 rounded-lg p-12 text-center hover:border-neon-blue/50 transition-colors">
            <Upload className="w-16 h-16 text-neon-blue mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Upload CSV or Excel File</h3>
            <p className="text-gray-400 mb-4">Drag and drop your file here, or click to browse</p>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-block px-6 py-3 bg-neon-blue text-dark-bg font-semibold rounded-lg hover:bg-neon-blue/80 transition-all cursor-pointer"
            >
              Select File
            </label>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Supported formats: CSV, XLSX, XLS</p>
              <p className="text-xs text-gray-500 mt-1">Max file size: 10MB</p>
            </div>
            <button
              onClick={handleDownloadTemplate}
              className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-white/10 transition-all"
            >
              <Download className="w-4 h-4" />
              Download Template
            </button>
          </div>
        </div>
      )}

      {/* Uploading State */}
      {uploadStatus === 'uploading' && (
        <div className="glass rounded-xl p-8 neon-border text-center">
          <div className="w-16 h-16 border-4 border-neon-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Processing File...</h3>
          <p className="text-gray-400">Please wait while we parse your data</p>
        </div>
      )}

      {/* Data Preview */}
      {uploadStatus === 'success' && (
        <div className="space-y-6">
          <div className="glass rounded-xl p-6 neon-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-neon-green" />
                <div>
                  <h3 className="font-bold">File Parsed Successfully</h3>
                  <p className="text-sm text-gray-400">{file?.name} • {uploadedData.length} shipments found</p>
                </div>
              </div>
              <button
                onClick={handleRemoveFile}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-surface/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">#</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">From</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">To</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Weight</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Service</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {uploadedData.map((item, index) => (
                    <tr key={item.id} className="border-t border-white/10">
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{item.from}</td>
                      <td className="px-4 py-3">{item.to}</td>
                      <td className="px-4 py-3">{item.weight}</td>
                      <td className="px-4 py-3 capitalize">{item.service}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-neon-green/20 text-neon-green text-xs rounded-full">Valid</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={handleProcessShipments}
                className="flex-1 py-3 bg-neon-blue text-dark-bg font-bold rounded-lg hover:bg-neon-blue/80 transition-all"
              >
                Create All Shipments
              </button>
              <button
                onClick={handleRemoveFile}
                className="px-6 py-3 glass rounded-lg hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Processing State */}
      {uploadStatus === 'processing' && (
        <div className="glass rounded-xl p-8 neon-border text-center">
          <div className="w-16 h-16 border-4 border-neon-purple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Creating Shipments...</h3>
          <p className="text-gray-400">Processing {uploadedData.length} shipments</p>
        </div>
      )}

      {/* Completed State */}
      {uploadStatus === 'completed' && (
        <div className="glass rounded-xl p-8 neon-border text-center">
          <CheckCircle className="w-16 h-16 text-neon-green mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2 text-neon-green">All Shipments Created!</h3>
          <p className="text-gray-400 mb-6">{uploadedData.length} shipments have been successfully created</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/customer/shipments'}
              className="px-6 py-3 bg-neon-blue text-dark-bg font-bold rounded-lg hover:bg-neon-blue/80 transition-all"
            >
              View Shipments
            </button>
            <button
              onClick={handleRemoveFile}
              className="px-6 py-3 glass rounded-lg hover:bg-white/10 transition-all"
            >
              Upload More
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="glass rounded-xl p-6 neon-border">
        <h3 className="font-bold mb-4">How to Use Bulk Upload</h3>
        <ol className="space-y-3 text-sm text-gray-400">
          <li className="flex gap-3">
            <span className="w-6 h-6 bg-neon-blue/20 text-neon-blue rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
            <span>Download the CSV template to see the required format</span>
          </li>
          <li className="flex gap-3">
            <span className="w-6 h-6 bg-neon-blue/20 text-neon-blue rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
            <span>Fill in your shipment details in the template file</span>
          </li>
          <li className="flex gap-3">
            <span className="w-6 h-6 bg-neon-blue/20 text-neon-blue rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
            <span>Upload the completed file</span>
          </li>
          <li className="flex gap-3">
            <span className="w-6 h-6 bg-neon-blue/20 text-neon-blue rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
            <span>Review the parsed data and create all shipments at once</span>
          </li>
        </ol>
      </div>
    </div>
  )
}
