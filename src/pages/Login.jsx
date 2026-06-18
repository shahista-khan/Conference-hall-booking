import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BadgeCheck, Lock } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import PageTransition from '../components/PageTransition'
import logo from '../assets/logo.png'
import emblem from '../assets/emblem.svg'
import phqDefault from '../assets/phq.jpeg'

const Login = () => {
  const { sendOtp, verifyOtp, authMode, toggleAuthMode } = useAppContext()
  const navigate = useNavigate()
  const [badgeNumber, setBadgeNumber] = useState('')
  
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [displayOtp, setDisplayOtp] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')
    // Send OTP flow is separate; prevent form submit
  }

  const handleSendOtp = () => {
    setError('')
    if (!badgeNumber || !email) {
      setError('Please enter Badge ID and Official Email')
      return
    }
    const sent = sendOtp(badgeNumber, email)
    setDisplayOtp(sent)
    setOtpSent(true)
  }

  const handleVerifyOtp = async () => {
    setError('')
    if (!otp) {
      setError('Please enter OTP')
      return
    }
    const result = verifyOtp(badgeNumber, email, otp)
    if (result.success) {
      // user set in context by verifyOtp
      navigate(result.user.role === 'superadmin' ? '/admin/dashboard' : '/dashboard')
    } else {
      setError(result.message || 'OTP verification failed')
    }
  }

  const phq = phqDefault

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F0F4F9] text-[#1A202C]">
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
          <div
            style={{
              backgroundImage: `url(${phq})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
            className="relative hidden overflow-hidden bg-linear-to-br from-[#0A1628] via-[#003087] to-[#0046C0] p-10 text-white lg:flex lg:flex-col"
          >
            {/* dark overlay to improve readability (doesn't affect children) */}
            <div className="absolute inset-0 bg-[#0A1628]/75 pointer-events-none" />

            <div className="mx-auto relative z-10 flex w-full max-w-md flex-col items-center text-center">
              <img src={logo} alt="Delhi Police logo" className="h-20 w-auto object-contain drop-shadow-[0_0_20px_rgba(245,166,35,0.4)]" />
              <h1 className="mt-8 text-3xl font-bold tracking-[0.25em]">DELHI POLICE</h1>
              <div className="mx-auto mt-3 h-1.5 w-16 rounded-full bg-gold" />
              <p className="mt-4 max-w-xs text-sm leading-6 text-white/70">
                Headquarters Conference Room Portal
              </p>
              <div className="mt-16 space-y-4 text-left">
                {[
                  'Real-time Room Availability',
                  'Rank-based Priority Booking',
                  'Admin Approval Workflow'
                ].map((item) => (
                  <div key={item} className="flex items-start gap-4 rounded-3xl bg-white/10 p-4 backdrop-blur-xl">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-gold">
                      <BadgeCheck size={18} />
                    </div>
                    <div className="text-sm text-white/80">{item}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-15 flex justify-center">
              <img src={emblem} alt="Government of India emblem" className="h-12 opacity-40" />
            </div>
          </div>

          <div className="flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-md rounded-[32px] border border-white/60 bg-white/90 p-10 shadow-2xl backdrop-blur-xl">
              <span className="inline-flex rounded-full border border-[#E2E8F0] bg-[#F0F4F9] px-3 py-1 text-xs font-semibold text-[#003087]">
                SECURE LOGIN
              </span>
              <h2 className="mt-5 text-2xl font-bold text-[#0A1628]">{authMode === 'admin' ? 'Admin Control Panel Login' : 'Welcome Back'}</h2>
              <p className="mt-2 text-sm text-[#718096]">{authMode === 'admin' ? 'Sign in with Admin credentials' : 'Sign in to your officer account'}</p>
              <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#718096]">
                  Badge Number
                  <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 transition-all focus-within:border-transparent focus-within:ring-2 focus-within:ring-[#003087]">
                    <BadgeCheck size={18} className="text-[#4A5568]" />
                    <input
                      value={badgeNumber}
                      onChange={(event) => setBadgeNumber(event.target.value)}
                      placeholder="e.g. DP-4521"
                      className="w-full bg-transparent text-sm text-[#1A202C] outline-none"
                    />
                  </div>
                </label>

                <label className="block text-xs font-semibold uppercase tracking-wider text-[#718096]">
                  Official Email
                  <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 transition-all focus-within:border-transparent focus-within:ring-2 focus-within:ring-[#003087]">
                    <Lock size={18} className="text-[#4A5568]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="your.office@delhipolice.gov.in"
                      className="w-full bg-transparent text-sm text-[#1A202C] outline-none"
                    />
                  </div>
                </label>

                {!otpSent ? (
                  <>
                    {error && <div className="rounded-2xl bg-[#FEF2F2] px-4 py-3 text-sm text-[#DC2626]">{error}</div>}
                    <div className="flex gap-2">
                      <button type="button" onClick={handleSendOtp} className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#003087] to-[#0046C0] px-5 py-3 text-sm font-semibold text-white">Send OTP</button>
                      <button type="button" onClick={() => { toggleAuthMode(); setOtpSent(false); setDisplayOtp(''); setOtp(''); setBadgeNumber('') }} className="flex-1 rounded-xl border border-[#E2E8F0] bg-white px-5 py-3 text-sm font-semibold text-[#003087]">{authMode === 'admin' ? 'User Login' : 'Admin Login'}</button>
                    </div>
                    {displayOtp && (
                      <div className="mt-2 text-xs text-[#718096]">Demo OTP: <span className="font-mono text-[#0A1628]">{displayOtp}</span></div>
                    )}
                  </>
                ) : (
                  <>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#718096]">Enter OTP
                      <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
                        <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" className="w-full bg-transparent text-sm text-[#1A202C] outline-none" />
                      </div>
                    </label>
                    {error && <div className="rounded-2xl bg-[#FEF2F2] px-4 py-3 text-sm text-[#DC2626]">{error}</div>}
                    <div className="flex gap-2">
                      <button type="button" onClick={handleVerifyOtp} className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#059669] to-[#047857] px-5 py-3 text-sm font-semibold text-white">Verify & Login</button>
                      <button type="button" onClick={() => { setOtpSent(false); setDisplayOtp(''); setOtp('') }} className="flex-1 rounded-xl border border-[#E2E8F0] bg-white px-5 py-3 text-sm font-semibold text-[#003087]">Change Details</button>
                    </div>
                  </>
                )}
              </form>
              <div className="my-6 flex items-center gap-3 text-xs text-[#718096]">
                <span className="h-px flex-1 bg-[#E2E8F0]" />
                or
                <span className="h-px flex-1 bg-[#E2E8F0]" />
              </div>
              <div className="rounded-2xl bg-[#FFFBEB] border border-[#F5A623]/30 p-4 text-sm">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#D97706]">Demo Credentials</div>
                <div className="mt-2 text-xs text-[#4A5568]">👮 User: Badge DP-4521, Password: any</div>
                <div className="mt-1 text-xs text-[#4A5568]">🔐 Admin: Badge DP-ADMIN, Password: any</div>
              </div>
              <p className="mt-4 text-center text-xs text-[#718096]">For login support contact HQ Administration</p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default Login
