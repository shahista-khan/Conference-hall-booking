import { Info, Search, ShieldCheck, XCircle, RefreshCw } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import PageTransition from '../../components/PageTransition'

const AllRequests = () => {
  const { bookings, users, rooms, rankPriority } = useAppContext()
  const navigate = useNavigate()
  const [statusFilter, setStatusFilter] = useState('All')
  const [search, setSearch] = useState('')

  const location = useLocation()
  const roomIdQuery = new URLSearchParams(location.search).get('roomId')

  const filtered = useMemo(() => {
    return bookings
      .filter((booking) => {
        if (roomIdQuery && booking.roomId !== Number(roomIdQuery)) return false
        if (statusFilter === 'All') return true
        if (statusFilter === 'Alternate') return booking.status === 'alternate_suggested'
        return booking.status === statusFilter.toLowerCase()
      })
      .filter((booking) => {
        const user = users.find((item) => item.id === booking.userId)
        return user?.name.toLowerCase().includes(search.toLowerCase()) || booking.id.toLowerCase().includes(search.toLowerCase())
      })
      .sort((a, b) => {
        const rankA = rankPriority[users.find((item) => item.id === a.userId)?.rank] || 99
        const rankB = rankPriority[users.find((item) => item.id === b.userId)?.rank] || 99
        if (a.status !== b.status) return a.status === 'pending' ? -1 : 1
        if (rankA !== rankB) return rankA - rankB
        return new Date(a.requestedOn) - new Date(b.requestedOn)
      })
  }, [bookings, statusFilter, search, users, rankPriority, roomIdQuery])

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F0F4F9]  text-[#1A202C]">
        <div className="border-b border-[#E2E8F0] bg-white px-6 py-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-xl font-bold text-[#0A1628]">Booking Requests</h1>
              <p className="text-sm text-[#4A5568]">{bookings.length} total requests</p>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-[1480px] px-6 py-4">
          <div className="rounded-2xl bg-[#EFF6FF] border border-[#003087]/20 p-4 text-sm text-[#1E40AF]">
            <div className="flex items-start gap-3">
              <Info size={18} />
              <div>ℹ️ Requests from higher-ranked officers are highlighted with a gold indicator. Consider rank priority when reviewing conflicting time slots.</div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {['All', 'Pending', 'Approved', 'Rejected', 'Alternate'].map((tab) => (
              <button key={tab} onClick={() => setStatusFilter(tab)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${statusFilter === tab ? 'bg-[#003087] text-white' : 'bg-white border border-[#E2E8F0] text-[#4A5568] hover:border-[#003087] hover:text-[#003087]'}`}>
                {tab} {tab === 'All' ? `(${bookings.length})` : `(${bookings.filter((booking) => booking.status === (tab === 'Alternate' ? 'alternate_suggested' : tab.toLowerCase())).length})`}
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3 rounded-2xl border border-[#E2E8F0] bg-white px-4 py-4">
            <div className="flex min-w-[200px] items-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 text-sm text-[#1A202C]">
              <Search size={16} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by officer or request" className="w-full bg-transparent outline-none" />
            </div>
          </div>
          <div className="mt-4 space-y-3 pb-8">
            {filtered.map((booking) => {
              const user = users.find((item) => item.id === booking.userId)
              const room = rooms.find((item) => item.id === booking.roomId)
              const senior = rankPriority[user.rank] <= 4
              return (
                <div key={booking.id} className={`rounded-2xl border border-[#E2E8F0] bg-white p-5 transition-all duration-200 hover:shadow-md ${senior ? 'border-l-4 border-gold' : ''}`}>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold ${senior ? 'border-2 border-gold bg-white text-[#0A1628]' : 'border border-[#E2E8F0] bg-[#F8FAFC] text-[#0A1628]'}`}>
                        {user.initials}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#0A1628]">{user.name}</div>
                        <div className="mt-1 flex flex-wrap gap-2 text-xs text-[#718096]">
                          <span className="rounded-full bg-[#F0F4F9] px-2 py-1">{user.rank}</span>
                          <span>{user.badgeNumber}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-3 sm:items-end">
                      {senior && <span className="rounded-full bg-[#FFFBEB] px-2 py-1 text-[11px] font-semibold text-[#D97706]">⭐ Priority</span>}
                      <button onClick={() => navigate(`/admin/requests/${booking.id}`)} className="rounded-xl bg-[#003087] px-4 py-2 text-xs font-semibold text-white">Review Request →</button>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      { label: 'Room', value: room.name },
                      { label: 'Date', value: booking.date },
                      { label: 'Time', value: `${booking.startTime} - ${booking.endTime}` },
                      { label: 'Attendees', value: booking.attendees }
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="text-[10px] uppercase tracking-[0.24em] text-[#718096]">{item.label}</div>
                        <div className="mt-1 text-sm font-semibold text-[#1A202C]">{item.value}</div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-[#4A5568]">{booking.purpose}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default AllRequests
