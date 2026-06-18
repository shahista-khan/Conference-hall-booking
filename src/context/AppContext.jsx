import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { bookings as initialBookings, rankPriority, rooms, users } from '../data/mockData'

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [role, setRole] = useState('user')
  const [authMode, setAuthMode] = useState('user') // 'user' | 'admin' for pre-login mode
  const [bookings, setBookings] = useState(initialBookings)
  const [roomsList, setRoomsList] = useState(rooms)
  const [toasts, setToasts] = useState([])
  const [otpStore, setOtpStore] = useState({}) // key: `${badge}|${email}` -> otp

  // OTP mock service
  const sendOtp = (badge, email) => {
    const key = `${badge.trim().toUpperCase()}|${(email || '').trim().toLowerCase()}`
    const otp = '123456' // demo static OTP; replaceable with API
    setOtpStore((s) => ({ ...s, [key]: otp }))
    return otp
  }

  const verifyOtp = (badge, email, otp) => {
    // Demo bypass: accept any OTP/email for now but enforce authMode role isolation
    const normalizedBadge = badge?.trim().toUpperCase()
    const user = users.find((u) => u.badgeNumber.toUpperCase() === normalizedBadge)
    if (!user) return { success: false, message: 'User not found for provided Badge' }

    // Enforce role isolation: admin mode only allows superadmin users; user mode disallows superadmin
    if (authMode === 'admin') {
      if (user.role !== 'superadmin') {
        return { success: false, message: 'Admin login requires admin credentials' }
      }
    } else {
      if (user.role === 'superadmin') {
        return { success: false, message: 'Use Admin Login for admin credentials' }
      }
    }

    setCurrentUser(user)
    setRole(user.role === 'superadmin' ? 'superadmin' : 'user')
    // persist session
    try {
      localStorage.setItem('dp_currentUserId', String(user.id))
      localStorage.setItem('dp_role', user.role === 'superadmin' ? 'superadmin' : 'user')
    } catch (e) {}

    // clear stored otp for key if present
    const key = `${normalizedBadge}|${(email || '').trim().toLowerCase()}`
    setOtpStore((s) => {
      const next = { ...s }
      delete next[key]
      return next
    })
    return { success: true, user }
  }

  // Toggle pre-login auth mode and clear any existing session
  const toggleAuthMode = () => {
    const next = authMode === 'admin' ? 'user' : 'admin'
    // clear session when switching modes
    setCurrentUser(null)
    setRole('user')
    try {
      localStorage.removeItem('dp_currentUserId')
      localStorage.removeItem('dp_role')
    } catch (e) {}
    setAuthMode(next)
  }

  const logout = () => {
    setCurrentUser(null)
    setRole('user')
    try {
      localStorage.removeItem('dp_currentUserId')
      localStorage.removeItem('dp_role')
    } catch (e) {}
  }

  const addToast = ({ type, title, message }) => {
    const toast = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      type,
      title,
      message
    }
    setToasts((current) => [toast, ...current])
    setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== toast.id))
    }, 4200)
  }

  const removeToast = (id) => {
    setToasts((current) => current.filter((item) => item.id !== id))
  }

  const getRoomById = (id) => roomsList.find((room) => room.id === Number(id))

  const getBookingById = (id) => bookings.find((booking) => booking.id === id)

  const getUserById = (id) => users.find((user) => user.id === Number(id))

  const createBookingRequest = ({ roomId, date, startTime, endTime, purpose, attendees, notes }) => {
    const nextId = `BK00${bookings.length + 1}`
    const request = {
      id: nextId,
      roomId: Number(roomId),
      userId: currentUser?.id || 1,
      date,
      startTime,
      endTime,
      purpose,
      attendees: Number(attendees),
      status: 'pending',
      requestedOn: new Date().toISOString().slice(0, 10),
      adminNote: notes || ''
    }
    setBookings((current) => [request, ...current])
    addToast({
      type: 'success',
      title: 'Request Submitted!',
      message: `Your booking request ${nextId} is pending admin approval.`
    })
    return request
  }

  const updateBookingStatus = (id, updates) => {
    setBookings((current) =>
      current.map((booking) => (booking.id === id ? { ...booking, ...updates } : booking))
    )
    // simulate email notifications for status changes
    if (updates.status === 'approved') {
      addToast({ type: 'success', title: 'Approval email sent (Demo Mode)', message: `Approval email notification sent to officer.` })
    } else if (updates.status === 'rejected') {
      addToast({ type: 'info', title: 'Rejection email sent (Demo Mode)', message: `Rejection email notification sent to officer.` })
    }
  }

  const cancelBooking = (id) => {
    const booking = getBookingById(id)
    if (!booking) return
    updateBookingStatus(id, {
      status: 'rejected',
      adminNote: 'Request cancelled by user.'
    })
    addToast({
      type: 'error',
      title: 'Request Cancelled',
      message: `${id} has been cancelled successfully.`
    })
  }

  const suggestAlternate = (id, alternateRoomId, alternateDate, startTime, endTime, message) => {
    const alternateRoom = getRoomById(alternateRoomId)
    updateBookingStatus(id, {
      status: 'alternate_suggested',
      adminNote: `Alternate suggested: ${alternateRoom?.name} on ${alternateDate} from ${startTime} to ${endTime}. ${message}`
    })
    addToast({
      type: 'info',
      title: 'Alternate Suggested',
      message: `Officer has been offered an alternate room.`
    })
    addToast({ type: 'success', title: 'Alternative suggestion email sent (Demo Mode)', message: `Alternative suggestion email sent to officer.` })
  }

  const currentUserBookings = useMemo(
    () => (currentUser ? bookings.filter((booking) => booking.userId === currentUser.id) : []),
    [bookings, currentUser]
  )

  // load persisted session on mount
  useEffect(() => {
    try {
      const storedId = localStorage.getItem('dp_currentUserId')
      const storedRole = localStorage.getItem('dp_role')
      if (storedId) {
        const u = users.find((x) => String(x.id) === String(storedId))
        if (u) {
          setCurrentUser(u)
          setRole(storedRole === 'superadmin' ? 'superadmin' : 'user')
        }
      }
    } catch (e) {
      // ignore
    }
  }, [])

  const counts = useMemo(() => {
    const total = bookings.length
    const approved = bookings.filter((item) => item.status === 'approved').length
    const pending = bookings.filter((item) => item.status === 'pending').length
    const rejected = bookings.filter((item) => item.status === 'rejected').length
    const alternate = bookings.filter((item) => item.status === 'alternate_suggested').length
    return { total, approved, pending, rejected, alternate }
  }, [bookings])

  return (
    <AppContext.Provider
      value={{
        currentUser,
        role,
        rooms: roomsList,
        users,
        bookings,
        rankPriority,
        counts,
        currentUserBookings,
        sendOtp,
        verifyOtp,
        authMode,
        toggleAuthMode,
        logout,
        addToast,
        removeToast,
        createBookingRequest,
        updateBookingStatus,
        cancelBooking,
        getRoomById,
        getBookingById,
        getUserById,
        suggestAlternate,
        toasts
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider')
  }
  return context
}
