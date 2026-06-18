import { Calendar, CheckCircle2, ClipboardList, Clock3, XCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import PageTransition from '../../components/PageTransition'
import StatusBadge from '../../components/StatusBadge'
import emblem from '../../assets/emblem.svg'

const Dashboard = () => {
  const { currentUser, currentUserBookings, counts, rooms, bookings } = useAppContext()

  const recentBookings = bookings.slice(0, 4)
  const today = new Date('2026-06-17').toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F0F4F9]  text-[#1A202C]">
        <div className="bg-linear-to-br from-[#0A1628] via-[#003087] to-[#0046C0] px-8 py-10 relative overflow-hidden">
          <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 border border-white/20">
                <Calendar size={14} /> OFFICER PORTAL
              </span>
              <h1 className="mt-4 max-w-2xl text-3xl font-bold text-white">Good Morning, {currentUser?.rank ?? 'Inspector'} {currentUser?.name?.split(' ')[0] || 'Rajesh'}</h1>
              <p className="mt-2 text-sm text-white/60">Badge No: {currentUser?.badgeNumber || 'DP-4521'} · {currentUser?.department || 'Crime Branch'} · Delhi Police HQ</p>
              <p className="mt-1 text-xs text-white/40">{today}</p>
            </div>
            <img src={emblem} alt="Government emblem" className="hidden h-20 opacity-60 lg:block" />
          </div>
        </div>

        <div className="mx-auto max-w-370 px-6 pb-8">
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Total Requests', value: counts.total, icon: ClipboardList, badge: 'bg-[#EFF6FF] text-[#003087]' },
              { label: 'Approved', value: counts.approved, icon: CheckCircle2, badge: 'bg-[#ECFDF5] text-[#059669]' },
              { label: 'Pending', value: counts.pending, icon: Clock3, badge: 'bg-[#FFFBEB] text-[#D97706]' },
              { label: 'Rejected', value: counts.rejected, icon: XCircle, badge: 'bg-[#FEF2F2] text-[#DC2626]' }
            ].map((card) => (
              <div key={card.label} className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-3xl font-bold text-[#0A1628]">{card.value}</div>
                    <div className="mt-3 text-sm font-medium text-[#4A5568]">{card.label}</div>
                  </div>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${card.badge}`}>
                    <card.icon size={18} />
                  </div>
                </div>
                <div className="mt-3 text-xs text-[#718096]">Last 30 days</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link to="/rooms" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#003087] to-[#0046C0] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25">
              <Calendar size={16} /> Browse Available Rooms
            </Link>
            <Link to="/my-bookings" className="inline-flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-6 py-3 text-sm font-semibold text-[#003087] transition-all duration-200 hover:border-[#003087] hover:shadow-md">
              <Calendar size={16} /> View My Bookings
            </Link>
          </div>

          <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm border border-[#E2E8F0]">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-[#1A202C]">Recent Requests</h2>
              </div>
              <Link to="/my-bookings" className="text-sm font-medium text-[#003087] hover:underline">View all →</Link>
            </div>
            <div className="space-y-3">
              {recentBookings.map((booking) => {
                const room = rooms.find((item) => item.id === booking.roomId)
                const dateLabel = new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                return (
                  <div key={booking.id} className="rounded-2xl border border-[#E2E8F0] bg-white p-5 transition-all duration-200 hover:shadow-md">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="text-sm font-semibold text-[#1A202C]">{room?.name || 'Unknown Room'}</div>
                        <div className="mt-2 flex items-center gap-2 text-xs text-[#718096]">
                          <Calendar size={14} /> {dateLabel} · {booking.startTime} - {booking.endTime}
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-2 sm:items-end">
                        <StatusBadge status={booking.status} />
                        <Link to={`/book/${room?.id ?? 1}`} className="text-xs font-medium text-[#003087] hover:underline">
                          View →
                        </Link>
                      </div>
                    </div>
                    <p className="mt-4 max-w-2xl truncate text-sm text-[#4A5568]">{booking.purpose}</p>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  )
}

export default Dashboard
