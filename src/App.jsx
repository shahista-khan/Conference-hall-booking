import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider, useAppContext } from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Toast from './components/Toast'
import Login from './pages/Login'
import Dashboard from './pages/user/Dashboard'
import BrowseRooms from './pages/user/BrowseRooms'
import RoomDetail from './pages/user/RoomDetail'
import BookingForm from './pages/user/BookingForm'
import MyBookings from './pages/user/MyBookings'
import AdminDashboard from './pages/admin/AdminDashboard'
import AllRequests from './pages/admin/AllRequests'
import RequestDetail from './pages/admin/RequestDetail'
import ManageRooms from './pages/admin/ManageRooms'
import RoomDetails from './pages/admin/RoomDetails'

const ProtectedRoute = ({ children, role, fallback }) => {
  const { currentUser, role: currentRole } = useAppContext()

  if (!currentUser) {
    return <Navigate to="/" />
  }
  // If a specific role is required, enforce it
  if (role && currentRole !== role) {
    return <Navigate to={fallback || '/dashboard'} />
  }
  // If no role specified, treat routes as user-only by default — prevent admin access unless explicit
  if (!role && currentRole === 'superadmin') {
    return <Navigate to="/admin/dashboard" />
  }
  return children
}

const AppRoutes = () => (
  <BrowserRouter>
    <Navbar />
    
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/rooms" element={<ProtectedRoute><BrowseRooms /></ProtectedRoute>} />
      <Route path="/rooms/:id" element={<ProtectedRoute><RoomDetail /></ProtectedRoute>} />
      <Route path="/book/:id" element={<ProtectedRoute><BookingForm /></ProtectedRoute>} />
      <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
      <Route path="/admin/dashboard" element={<ProtectedRoute role="superadmin" fallback="/dashboard"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/requests" element={<ProtectedRoute role="superadmin" fallback="/dashboard"><AllRequests /></ProtectedRoute>} />
      <Route path="/admin/requests/:id" element={<ProtectedRoute role="superadmin" fallback="/dashboard"><RequestDetail /></ProtectedRoute>} />
      <Route path="/admin/manage-rooms" element={<ProtectedRoute role="superadmin" fallback="/dashboard"><ManageRooms /></ProtectedRoute>} />
      <Route path="/admin/rooms/:roomId" element={<ProtectedRoute role="superadmin" fallback="/dashboard"><RoomDetails /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    <Toast />
    <Footer />
  </BrowserRouter>
)

const App = () => (
  <AppProvider>
    <AppRoutes />
  </AppProvider>
)

export default App
