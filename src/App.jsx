import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LandingPage from './components/LandingPage'
import AuthPage from './components/AuthPage'
import AdminDashboard from './components/admin/AdminDashboard'
import CustomerDashboard from './components/customer/CustomerDashboard'
import ReceiverTracking from './components/receiver/ReceiverTracking'
import AdminOverview from './components/admin/AdminOverview'
import AdminCustomers from './components/admin/AdminCustomers'
import AdminShipments from './components/admin/AdminShipments'
import AdminActivities from './components/admin/AdminActivities'
import AdminTracking from './components/admin/AdminTracking'
import AdminDrones from './components/admin/AdminDrones'
import AdminMap from './components/admin/AdminMap'
import AdminCarbon from './components/admin/AdminCarbon'
import AdminSettings from './components/admin/AdminSettings'
import AdminBlockchain from './components/admin/AdminBlockchain'
import AdminMaintenance from './components/admin/AdminMaintenance'
import CustomerHome from './components/customer/CustomerHome'
import CustomerCreateShipment from './components/customer/CustomerCreateShipment'
import CustomerTracking from './components/customer/CustomerTracking'
import CustomerShipments from './components/customer/CustomerShipments'
import CustomerAnalytics from './components/customer/CustomerAnalytics'
import CustomerCarbon from './components/customer/CustomerCarbon'
import CustomerSettings from './components/customer/CustomerSettings'
import CustomerBulkUpload from './components/customer/CustomerBulkUpload'

function App() {
  const [user, setUser] = useState(null)
  const [userType, setUserType] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const savedUserType = localStorage.getItem('userType')
    if (savedUser && savedUserType) {
      setUser(JSON.parse(savedUser))
      setUserType(savedUserType)
    }
  }, [])

  const handleLogin = (userData, type) => {
    setUser(userData)
    setUserType(type)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('userType', type)
  }

  const handleLogout = () => {
    setUser(null)
    setUserType(null)
    localStorage.removeItem('user')
    localStorage.removeItem('userType')
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-dark-bg">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/auth/:type" 
            element={<AuthPage onLogin={handleLogin} />} 
          />
          <Route
            path="/admin/*"
            element={
              userType === 'admin' ? (
                <AdminDashboard user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/auth/admin" />
              )
            }
          >
            <Route index element={<AdminOverview />} />
            <Route path="dashboard" element={<AdminOverview />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="shipments" element={<AdminShipments />} />
            <Route path="activities" element={<AdminActivities />} />
            <Route path="tracking" element={<AdminTracking />} />
            <Route path="drones" element={<AdminDrones />} />
            <Route path="map" element={<AdminMap />} />
            <Route path="carbon" element={<AdminCarbon />} />
            <Route path="blockchain" element={<AdminBlockchain />} />
            <Route path="maintenance" element={<AdminMaintenance />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="*" element={<AdminOverview />} />
          </Route>
          <Route
            path="/customer/*"
            element={
              userType === 'customer' ? (
                <CustomerDashboard user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/auth/customer" />
              )
            }
          >
            <Route index element={<CustomerHome />} />
            <Route path="dashboard" element={<CustomerHome />} />
            <Route path="create" element={<CustomerCreateShipment />} />
            <Route path="tracking" element={<CustomerTracking />} />
            <Route path="shipments" element={<CustomerShipments />} />
            <Route path="bulk-upload" element={<CustomerBulkUpload />} />
            <Route path="analytics" element={<CustomerAnalytics />} />
            <Route path="carbon" element={<CustomerCarbon />} />
            <Route path="settings" element={<CustomerSettings />} />
            <Route path="*" element={<CustomerHome />} />
          </Route>
          <Route
            path="/receiver/:trackingId"
            element={<ReceiverTracking />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
