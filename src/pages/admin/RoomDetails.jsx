import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, Building2, Users, Layers, UserCheck, Calendar, AlertCircle } from 'lucide-react'
import { useMemo } from 'react'
import { useAppContext } from '../../context/AppContext'
import PageTransition from '../../components/PageTransition'
import placeholderUrl from '../../assets/room-placeholder.svg'

const RoomDetails = () => {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const { rooms, bookings, users } = useAppContext()

  const room = useMemo(() => rooms.find((r) => r.id === Number(roomId)), [rooms, roomId])

  const roomBookings = useMemo(() => {
    if (!room) return []
    const filtered = bookings.filter((b) => b.roomId === room.id)
    // Sort by date descending (most recent first)
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [bookings, room])

  const bookingStats = useMemo(() => {
    if (!room) return { total: 0, approved: 0, pending: 0, rejected: 0 }
    return {
      total: roomBookings.length,
      approved: roomBookings.filter((b) => b.status === 'approved').length,
      pending: roomBookings.filter((b) => b.status === 'pending').length,
      rejected: roomBookings.filter((b) => b.status === 'rejected').length
    }
  }, [roomBookings, room])

  const getOfficerName = (userId) => {
    const user = users.find((u) => u.id === userId)
    return user ? user.name : 'Unknown Officer'
  }

  const getRankDisplay = (userId) => {
    const user = users.find((u) => u.id === userId)
    return user ? user.rank : 'Unknown Rank'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-[#ECFDF5] text-[#059669]'
      case 'pending':
        return 'bg-[#FFFBEB] text-[#D97706]'
      case 'rejected':
        return 'bg-[#FEF2F2] text-[#DC2626]'
      default:
        return 'bg-[#F0F4F9] text-[#4A5568]'
    }
  }

  const getStatusBorder = (status) => {
    switch (status) {
      case 'approved':
        return 'border-[#059669]/20'
      case 'pending':
        return 'border-[#F5A623]/20'
      case 'rejected':
        return 'border-[#DC2626]/20'
      default:
        return 'border-[#E2E8F0]'
    }
  }

  if (!room) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-[#F0F4F9] pb-12">
          <div className="mx-auto max-w-[1480px] px-6 py-12 text-center">
            <AlertCircle size={48} className="mx-auto text-[#CBD5E1] mb-4" />
            <h2 className="text-xl font-bold text-[#0A1628]">Room not found</h2>
            <button
              onClick={() => navigate('/admin/manage-rooms')}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#003087] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0046C0]"
            >
              <ChevronLeft size={16} /> Back to Rooms
            </button>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F0F4F9] pt-8 pb-12">
        {/* Header with Back Button */}
        <div className="bg-linear-to-br from-[#0A1628] via-[#003087] to-[#0046C0] px-8 py-10">
          <button
            onClick={() => navigate('/admin/manage-rooms')}
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
          >
            <ChevronLeft size={16} /> Back to Rooms
          </button>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#F5A623]/20 px-3 py-1 text-xs font-semibold text-[#F5A623]">
              <Building2 size={14} /> {room.building}
            </span>
            <h1 className="mt-4 text-3xl font-bold text-white">{room.name}</h1>
            {room.roomNo !== '-' && <p className="mt-2 text-sm text-white/60">Room No: {room.roomNo}</p>}
          </div>
        </div>

        {/* Room banner image */}
        <div className="mx-auto max-w-[1480px] -mt-8 px-6">
          <div className="rounded-3xl overflow-hidden shadow-sm">
            <img
              src={roomImageMap[room.roomNo] || roomImageMap[String(room.roomNo)] || placeholderUrl}
              alt={room.name}
              className="w-full h-64 object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-[1480px] px-6 py-6">
          {/* Room Information Cards */}
          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Building */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[#EFF6FF] p-2.5">
                  <Building2 size={18} className="text-[#003087]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#718096]">Building</p>
                  <p className="mt-1 font-semibold text-[#0A1628]">{room.building}</p>
                </div>
              </div>
            </div>

            {/* Floor */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[#EFF6FF] p-2.5">
                  <Layers size={18} className="text-[#003087]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#718096]">Floor</p>
                  <p className="mt-1 font-semibold text-[#0A1628]">{room.floor}</p>
                </div>
              </div>
            </div>

            {/* Capacity */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[#ECFDF5] p-2.5">
                  <Users size={18} className="text-[#059669]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#718096]">Capacity</p>
                  <p className="mt-1 font-semibold text-[#0A1628]">{room.capacityDisplay}</p>
                </div>
              </div>
            </div>

            {/* Managed By */}
            {room.managedBy && room.managedBy !== '-' && (
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-[#F5F3FF] p-2.5">
                    <UserCheck size={18} className="text-[#7C3AED]" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#718096]">Managed By</p>
                    <p className="mt-1 font-semibold text-[#0A1628]">{room.managedBy}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Room Description */}
          {room.description && (
            <div className="mb-8 rounded-2xl border border-[#E2E8F0] bg-white p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#718096]">Description</h3>
              <p className="mt-3 text-[#4A5568]">{room.description}</p>
            </div>
          )}

          {/* Facilities */}
          {room.facilities && room.facilities.length > 0 && (
            <div className="mb-8 rounded-2xl border border-[#E2E8F0] bg-white p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#718096]">Facilities</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {room.facilities.map((facility, idx) => (
                  <span key={idx} className="inline-flex rounded-full bg-[#EFF6FF] px-3 py-1.5 text-xs font-semibold text-[#003087]">
                    {facility}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Booking Statistics */}
          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#718096]">Total Bookings</p>
              <p className="mt-3 text-3xl font-bold text-[#0A1628]">{bookingStats.total}</p>
            </div>
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#059669]">Approved</p>
              <p className="mt-3 text-3xl font-bold text-[#059669]">{bookingStats.approved}</p>
            </div>
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#D97706]">Pending</p>
              <p className="mt-3 text-3xl font-bold text-[#D97706]">{bookingStats.pending}</p>
            </div>
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#DC2626]">Rejected</p>
              <p className="mt-3 text-3xl font-bold text-[#DC2626]">{bookingStats.rejected}</p>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E2E8F0]">
              <h3 className="text-lg font-bold text-[#0A1628]">
                Booking Requests ({roomBookings.length})
              </h3>
            </div>

            {roomBookings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-left text-sm">
                  <thead className="bg-[#F8FAFC] text-xs uppercase tracking-wider text-[#718096]">
                    <tr>
                      <th className="px-6 py-3">Request ID</th>
                      <th className="px-6 py-3">Officer Name</th>
                      <th className="px-6 py-3">Rank</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Time</th>
                      <th className="px-6 py-3">Attendees</th>
                      <th className="px-6 py-3">Purpose</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roomBookings.map((booking, idx) => (
                      <tr
                        key={booking.id}
                        className={`${
                          idx % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'
                        } transition-all hover:bg-[#EFF6FF]`}
                      >
                        <td className="px-6 py-4 font-semibold text-[#0A1628]">#{booking.id}</td>
                        <td className="px-6 py-4 text-[#4A5568]">{getOfficerName(booking.userId)}</td>
                        <td className="px-6 py-4 text-[#4A5568] text-xs">
                          <span className="inline-flex rounded-full bg-[#F0F4F9] px-2.5 py-1 text-[#718096]">
                            {getRankDisplay(booking.userId)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[#4A5568]">
                          {new Date(booking.date).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4 text-[#4A5568]">{booking.startTime} - {booking.endTime}</td>
                        <td className="px-6 py-4 text-[#4A5568]">{booking.attendees}</td>
                        <td className="px-6 py-4 text-[#4A5568] max-w-xs truncate" title={booking.purpose}>
                          {booking.purpose}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold border ${getStatusColor(
                              booking.status
                            )} ${getStatusBorder(booking.status)}`}
                          >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => navigate(`/admin/requests/${booking.id}`)}
                            className="rounded-lg bg-[#003087] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#0046C0]"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-6 py-12 text-center">
                <Calendar size={48} className="mx-auto text-[#CBD5E1] mb-4" />
                <h4 className="text-base font-semibold text-[#1A202C]">No booking requests</h4>
                <p className="mt-2 text-sm text-[#718096]">There are no bookings for this room yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default RoomDetails
