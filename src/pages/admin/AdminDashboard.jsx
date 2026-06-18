import { AlertCircle, CheckCircle2, ClipboardList, Clock3, RefreshCw, XCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import PageTransition from '../../components/PageTransition'
import StatusBadge from '../../components/StatusBadge'

const AdminDashboard = () => {
  const { counts, bookings, users, rooms } = useAppContext()
  const navigate = useNavigate()
  const today = new Date('2026-06-17').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const scheduleRooms = rooms
  const timeBlocks = ['08-10', '10-12', '12-14', '14-16', '16-18', '18-20']

  const tableRows = scheduleRooms.map((room) => ({
    room,
    blocks: timeBlocks.map((block) => {
      const booking = bookings.find((bookingItem) => bookingItem.roomId === room.id && bookingItem.date === '2026-06-17' && bookingItem.startTime === `${block.slice(0, 2)}:00`)
      return booking
    })
  }))

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F0F4F9]  text-[#1A202C]">
        <div className="bg-linear-to-br from-[#0A1628] via-[#003087] to-[#0046C0] px-8 py-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#F5A623]/20 px-3 py-1 text-xs font-semibold text-[#F5A623]"><AlertCircle size={14} /> ADMIN PANEL</span>
              <h1 className="mt-4 text-3xl font-bold text-white">HQ Administration Dashboard</h1>
              <p className="mt-2 text-sm text-white/60">Logged in as: HQ Admin · Superintendent (Admin)</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-[#0A1628]">
              <AlertCircle size={16} /> 2 requests pending your review
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-[1480px] px-6 pb-12">
          <div className="mt-6 grid gap-4 lg:grid-cols-5">
            {[
              { label: 'Total Requests', value: counts.total, icon: ClipboardList, style: 'bg-[#EFF6FF] text-[#003087]' },
              { label: 'Pending Review', value: counts.pending, icon: Clock3, style: 'bg-[#FFFBEB] text-[#D97706]' },
              { label: 'Approved', value: counts.approved, icon: CheckCircle2, style: 'bg-[#ECFDF5] text-[#059669]' },
              { label: 'Rejected', value: counts.rejected, icon: XCircle, style: 'bg-[#FEF2F2] text-[#DC2626]' },
              { label: 'Alternate Given', value: counts.alternate, icon: RefreshCw, style: 'bg-[#F5F3FF] text-[#7C3AED]' }
            ].map((card) => (
              <div key={card.label} className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-3xl font-bold text-[#0A1628]">{card.value}</div>
                    <div className="mt-3 text-sm font-medium text-[#4A5568]">{card.label}</div>
                  </div>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${card.style}`}>
                    <card.icon size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <button onClick={() => navigate('/admin/requests')} className="rounded-xl bg-[#D97706] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#b36c05]">Review Pending Requests ({counts.pending})</button>
            <button onClick={() => navigate('/admin/requests')} className="rounded-xl bg-[#003087] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#0046C0]">View All Requests</button>
            <button onClick={() => navigate('/admin/manage-rooms')} className="rounded-xl border border-[#E2E8F0] bg-white px-6 py-3 text-sm font-semibold text-[#003087] transition-all hover:border-[#003087]">Room Overview</button>
          </div>
          <div className="mt-8 rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
            <div className="px-5 py-5">
              <div className="text-base font-semibold text-[#1A202C]">Today's Room Schedule</div>
              <div className="text-xs text-[#718096]">{today}</div>
            </div>
            <div className="overflow-x-auto px-5 pb-5">
              <table className="min-w-full border-separate border-spacing-y-2 text-sm">
                <thead className="bg-[#F8FAFC] text-[#718096]">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-3 text-left">Room</th>
                    {timeBlocks.map((block) => (
                      <th key={block} className="whitespace-nowrap px-4 py-3 text-left">{block}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map(({ room, blocks }) => (
                    <tr key={room.id} className="bg-white">
                      <td className="whitespace-nowrap px-4 py-3 font-medium text-[#1A202C]">{room.name}</td>
                      {blocks.map((booking, index) => (
                        <td key={index} className="whitespace-nowrap px-2 py-3">
                          {booking ? (
                            <div className="inline-flex rounded-2xl bg-[#003087] px-2 py-1 text-[11px] font-semibold text-white">{booking.purpose.slice(0, 20)}</div>
                          ) : (
                            <div className="h-6 rounded-2xl bg-[#F8FAFC] text-transparent">empty</div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-[#1A202C]">Recent Booking Requests</h2>
              </div>
              <button onClick={() => navigate('/admin/requests')} className="text-sm cursor-pointer font-medium text-[#003087] hover:underline">View All →</button>
            </div>
            <div className="mt-4 space-y-3">
              {bookings.slice(0, 3).map((booking) => {
                const user = users.find((item) => item.id === booking.userId)
                const room = rooms.find((item) => item.id === booking.roomId)
                return (
                  <div key={booking.id} className="flex flex-col gap-3 rounded-2xl border border-[#E2E8F0] p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${booking.userId <= 3 ? 'border-2 border-gold bg-white text-[#0A1628]' : 'border border-[#E2E8F0] bg-[#F8FAFC] text-[#0A1628]'}`}>
                        {user?.initials}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#0A1628]">{user?.name}</div>
                        <div className="text-xs text-[#718096]">{room?.name} · {booking.date}</div>
                      </div>
                    </div>
                    <div className="text-sm text-[#4A5568] truncate">{booking.purpose}</div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-[#F0F4F9] px-3 py-1 text-xs font-semibold text-[#003087]"><StatusBadge status={booking.status}/></div>
                      <button onClick={() => navigate(`/admin/requests/${booking.id}`)} className="rounded-lg bg-[#003087] px-4 py-2 text-xs font-semibold text-white">Review</button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default AdminDashboard
