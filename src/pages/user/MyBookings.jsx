import { MessageSquare, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import PageTransition from '../../components/PageTransition'
import StatusBadge from '../../components/StatusBadge'

const MyBookings = () => {
  const { currentUserBookings, cancelBooking, rooms, currentUser } = useAppContext()
  const [filter, setFilter] = useState('All')
  const navigate = useNavigate()

  const filtered = currentUserBookings.filter((booking) => {
    if (filter === 'All') return true
    if (filter === 'Approved') return booking.status === 'approved'
    if (filter === 'Pending') return booking.status === 'pending'
    if (filter === 'Rejected') return booking.status === 'rejected'
    if (filter === 'Alternate') return booking.status === 'alternate_suggested'
    return true
  })

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F0F4F9] text-[#1A202C]">
        <div className="border-b border-[#E2E8F0] bg-white px-6 py-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-xl font-bold text-[#0A1628]">My Bookings</h1>
              <p className="text-sm text-[#4A5568]">Track and manage your conference room requests</p>
            </div>
            <button onClick={() => navigate('/book/1')} className="rounded-xl bg-[#003087] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#0046C0]">
              New Request
            </button>
          </div>
        </div>
        <div className="px-6 pt-5">
          <div className="flex flex-wrap gap-3">
            {['All', 'Pending', 'Approved', 'Rejected', 'Alternate'].map((tab) => (
              <button key={tab} onClick={() => setFilter(tab)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${filter === tab ? 'bg-[#003087] text-white shadow-sm' : 'bg-white text-[#4A5568] border border-[#E2E8F0] hover:border-[#003087] hover:text-[#003087]'}`}>
                {tab} {tab === 'All' ? `(${currentUserBookings.length})` : `(${currentUserBookings.filter((booking) => booking.status === (tab === 'Alternate' ? 'alternate_suggested' : tab.toLowerCase())).length})`}
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-4 pb-8">
            {filtered.length === 0 ? (
              <div className="rounded-3xl border border-[#E2E8F0] bg-white p-12 text-center text-[#718096] shadow-sm">
                <div className="text-4xl">🗂️</div>
                <div className="mt-4 text-lg font-medium text-[#718096]">No bookings found</div>
                <p className="mt-1 text-sm text-[#A0AEC0]">Create a new request to get started.</p>
              </div>
            ) : (
              filtered.map((booking) => {
                const room = rooms.find((item) => item.id === booking.roomId)
                const dateLabel = new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                return (
                  <div key={booking.id} className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm transition-all hover:shadow-md">
                    <div className={`flex h-full gap-4 border-l-4 ${booking.status === 'approved' ? 'border-[#059669]' : booking.status === 'pending' ? 'border-[#D97706]' : booking.status === 'rejected' ? 'border-[#DC2626]' : 'border-[#7C3AED]'}`}>
                      <div className="flex-1 p-5 pl-6">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="text-base font-semibold text-[#0A1628]">{room?.name}</div>
                            <div className="text-xs text-[#718096] mt-1">{booking.id}</div>
                          </div>
                          <StatusBadge status={booking.status} />
                        </div>
                        <div className="mt-4 grid gap-4 md:grid-cols-4">
                          {[
                            { label: 'Date', value: dateLabel },
                            { label: 'Time', value: `${booking.startTime} – ${booking.endTime}` },
                            { label: 'Attendees', value: `${booking.attendees} persons` },
                            { label: 'Purpose', value: booking.purpose }
                          ].map((item) => (
                            <div key={item.label}>
                              <div className="text-[10px] uppercase tracking-[0.24em] text-[#718096]">{item.label}</div>
                              <div className="mt-1 text-sm font-semibold text-[#1A202C] truncate">{item.value}</div>
                            </div>
                          ))}
                        </div>
                        {booking.adminNote && (
                          <div className="mt-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 text-xs italic text-[#4A5568]">
                            <div className="flex items-center gap-2 text-[#003087] font-semibold"><MessageSquare size={14} /> Admin Note:</div>
                            <p className="mt-2">{booking.adminNote}</p>
                          </div>
                        )}
                        {booking.status === 'alternate_suggested' && (
                          <div className="mt-4 rounded-xl border border-[#7C3AED]/20 bg-[#F5F3FF] p-4">
                            <div className="text-sm font-semibold text-[#7C3AED]">Alternate Room Suggested</div>
                            <p className="mt-2 text-xs text-[#4A5568]">{booking.adminNote}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <button className="rounded-lg bg-[#7C3AED] px-4 py-2 text-xs font-semibold text-white">Accept Alternate</button>
                              <button className="rounded-lg border border-[#DC2626] px-4 py-2 text-xs font-semibold text-[#DC2626]">Decline</button>
                            </div>
                          </div>
                        )}
                        <div className="mt-4 flex flex-col gap-2 border-t border-[#E2E8F0] pt-4 text-xs text-[#718096] md:flex-row md:items-center md:justify-between">
                          <div>Requested on {new Date(booking.requestedOn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                          {booking.status === 'pending' && (
                            <button onClick={() => cancelBooking(booking.id)} className="inline-flex items-center gap-1 text-[#DC2626] font-medium hover:underline">
                              <Trash2 size={14} /> Cancel Request
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default MyBookings
