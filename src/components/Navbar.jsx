import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Bell, LogOut, Menu, X } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import logo from '../assets/logo.png'

const Navbar = () => {
  const navigate = useNavigate()
  const { role, currentUser, logout, authMode, toggleAuthMode } = useAppContext()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const userLinks = [
    { label: 'Home', to: '/dashboard' },
    { label: 'Browse Rooms', to: '/rooms' },
    { label: 'My Bookings', to: '/my-bookings' }
  ]

  const adminLinks = [
    { label: 'Dashboard', to: '/admin/dashboard' },
    { label: 'All Requests', to: '/admin/requests' },
    { label: 'Manage Rooms', to: '/admin/manage-rooms' }
  ]

  const links = currentUser ? (role === 'superadmin' ? adminLinks : userLinks) : []

  return (
    <>
      <div className="sticky top-0 z-40 bg-linear-to-r from-[#0A1628] to-[#003087] border-b border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
        <div className="mx-auto flex h-16 max-w-370 items-center justify-between px-6 text-white">
          <button onClick={() => navigate(currentUser ? (role === 'superadmin' ? '/admin/dashboard' : '/dashboard') : '/')} className="flex items-center gap-4 transition-opacity hover:opacity-80">
            <img src={logo} alt="Delhi Police logo" className="h-10 w-auto object-contain drop-shadow-[0_0_8px_rgba(245,166,35,0.3)]" />
            <div className="flex items-center gap-4">
              <div className="h-8 w-px bg-white/20" />
              <div className="text-sm leading-tight">
                <div className="text-white font-bold tracking-[0.2em]">DELHI POLICE</div>
                <div className="text-gold text-[11px] font-medium">Conference Room Portal</div>
              </div>
            </div>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {currentUser ? (
              links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => (isActive ? 'rounded-lg px-4 py-2 text-sm font-medium transition-all duration-150 border-b-2 border-gold bg-white/10 text-gold' : 'rounded-lg px-4 py-2 text-sm font-medium transition-all duration-150 text-white/70 hover:text-white hover:bg-white/10')}
                >
                  {link.label}
                </NavLink>
              ))
            ) : (
              <>
        
                
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            {currentUser && (
              <>
                <div className="relative hidden md:inline-flex">
                  <Bell className="cursor-pointer text-white/70 transition hover:text-white" size={18} />
                  <span className="absolute -right-1 -top-1 inline-flex h-2.5 w-2.5 rounded-full bg-gold ring-2 ring-[#0A1628]" />
                </div>
                <div className="hidden items-center gap-3 rounded-xl px-3 py-2 transition-all hover:bg-white/10 md:flex">
                  <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white/50 bg-linear-to-br from-[#F5A623] to-[#D97706] text-sm font-bold text-white">
                    <img
                      src="/images/avatar.jpg"
                      alt="Officer avatar"
                      className="h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = 'none'
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">{currentUser?.initials || 'DP'}</div>
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-white">{currentUser?.name || 'Officer'}</div>
                    <div className="text-[11px] text-gold">{currentUser?.rank || 'Field Officer'}</div>
                  </div>
                </div>
                <button
                  onClick={() => logout()}
                  className=" sm:hidden items-center gap-1 rounded-lg border border-white/20 px-3 py-1.5 text-xs text-white/60 transition-all hover:border-white/40 hover:text-white md:inline-flex"
                >
                  <LogOut size={12} /> Sign Out
                </button>
              </>
            )}
            <button className="inline-flex items-center rounded-lg border border-white/20 p-2 text-white/70 transition hover:text-white md:hidden" onClick={() => setDrawerOpen(true)}>
              <Menu size={18} />
            </button>
          </div>
        </div>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/40 backdrop-blur-sm">
          <div className="w-72 bg-[#0A1628] p-5 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={logo} alt="Delhi Police logo" className="h-10 w-auto object-contain" />
              </div>
              <button onClick={() => setDrawerOpen(false)} className="rounded-lg border border-white/20 p-2 text-white/70 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              {currentUser ? (
                links.map((link) => (
                  <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setDrawerOpen(false)}
                      className={({ isActive }) => (isActive ? 'rounded-2xl px-4 py-3 text-sm font-medium transition-all bg-white/10 text-gold' : 'rounded-2xl px-4 py-3 text-sm font-medium transition-all text-white/70 hover:bg-white/10 hover:text-white')}
                    >
                      {link.label}
                    </NavLink>
                ))
              ) : (
                <>
                  <NavLink to="/register" onClick={() => setDrawerOpen(false)} className="rounded-2xl px-4 py-3 text-sm font-medium text-white/70 hover:bg-white/10">Create Account</NavLink>
                  <button onClick={() => { toggleAuthMode(); setDrawerOpen(false); navigate('/') }} className="rounded-2xl px-4 py-3 text-sm font-medium text-white/70 hover:bg-white/10">{authMode === 'admin' ? 'User Login' : 'Admin Login'}</button>
                </>
              )}
            </div>
          </div>
          <div className="flex-1" onClick={() => setDrawerOpen(false)} />
        </div>
      )}
    </>
  )
}

export default Navbar
