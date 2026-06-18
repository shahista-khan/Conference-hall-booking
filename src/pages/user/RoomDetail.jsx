import { Building2, Calendar, Hash, Layers, MapPin, ShieldCheck, UserCheck, Users } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import PageTransition from '../../components/PageTransition'

const facilityIcon = (facility) => {
  if (facility.includes('Projector')) return <ShieldCheck size={18} />
  if (facility.includes('AC')) return <Users size={18} />
  if (facility.includes('Whiteboard')) return <MapPin size={18} />
  return <Calendar size={18} />
}

const RoomDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getRoomById, bookings } = useAppContext()
  const room = getRoomById(id)
  const [date, setDate] = useState('2026-06-17')
  const [imageFailed, setImageFailed] = useState(false)

  if (!room) return null

  const heroImage = room.image || '/assets/rooms/room-1.jpg'

  const bookedSlots = useMemo(
    () => bookings.filter((booking) => booking.roomId === room?.id && booking.date === date).map((booking) => `${booking.startTime}-${booking.endTime}`),
    [bookings, date, room]
  )

  const slots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']

  const roomFields = [
    { label: 'Building', value: room.building, icon: <Building2 size={18} /> },
    room.roomNo && room.roomNo !== '-' ? { label: 'Room Number', value: room.roomNo, icon: <Hash size={18} /> } : null,
    { label: 'Floor', value: room.floor, icon: <Layers size={18} /> },
    room.managedBy && room.managedBy !== '-' ? { label: 'Managed By', value: room.managedBy, icon: <UserCheck size={18} /> } : null,
    { label: 'Capacity', value: room.capacityDisplay, icon: <Users size={18} /> }
  ].filter(Boolean)

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F0F4F9] text-[#1A202C]">
        <div className="px-6 py-6 text-xs text-[#718096]">Home / Browse Rooms / {room.name}</div>
        <div className="mx-auto max-w-[1480px] px-6 pb-12 lg:grid lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-2xl bg-slate-900 shadow-sm">
              <div className="relative block h-72 w-full overflow-hidden text-left">
                {!imageFailed ? (
                  <img
                    src={heroImage}
                    alt={room.name}
                    className="h-full w-full object-cover"
                    onError={() => setImageFailed(true)}
                  />
                ) : (
                  <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${room.color}`}>
                    <Building2 size={40} className="text-white opacity-90" />
                    <span className="mt-2 text-xl font-bold text-white">{room.name.split(' ').slice(0, 2).map((word) => word[0]).join('')}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-5 left-5 text-white">
                  <h1 className="text-2xl font-bold">{room.name}</h1>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm mt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#0A1628]">{room.name}</h2>
                <span className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${room.tag === 'Restricted' || room.tag === 'High Security' ? 'bg-[#FEF2F2] text-[#DC2626] border border-[#DC2626]/20' : room.tag === 'Large Venue' || room.tag === 'Auditorium' ? 'bg-[#EFF6FF] text-[#003087] border border-[#003087]/20' : room.tag === 'Tech-Equipped' ? 'bg-[#ECFDF5] text-[#059669] border border-[#059669]/20' : room.tag === 'Bridge Tower' ? 'bg-[#FFFBEB] text-[#D97706] border border-[#F5A623]/20' : room.tag === 'Details TBD' ? 'bg-[#F5F5F5] text-[#9CA3AF] border border-[#E5E7EB]' : 'bg-[#F0F4F9] text-[#4A5568] border border-[#E2E8F0]'}`}>{room.tag}</span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {roomFields.map((item) => (
                  <div key={item.label} className="flex items-start gap-3 rounded-2xl bg-[#F8FAFC] p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#003087]">{item.icon}</div>
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.18em] text-[#718096]">{item.label}</div>
                      <div className="mt-1 text-sm font-semibold text-[#1A202C]">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm mt-4">
              <div className="text-sm font-semibold uppercase tracking-wide text-[#1A202C]">Facilities</div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {room.facilities.map((facility) => (
                  <div key={facility} className="flex items-center gap-3 rounded-xl bg-[#F0F4F9] p-3 text-sm text-[#4A5568]">
                    <div className="rounded-2xl bg-[#EAF2FF] p-2 text-[#003087]">{facilityIcon(facility)}</div>
                    {facility}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm mt-4">
              <p className="text-sm leading-relaxed text-[#4A5568]">{room.description}</p>
              <button onClick={() => navigate(`/book/${room.id}`)} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#003087] to-[#0046C0] px-5 py-4 text-base font-bold text-white transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/25">
                <Calendar size={18} /> Book This Room
              </button>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="sticky top-28 space-y-4">
              <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
                <div className="text-base font-bold text-[#0A1628]">Check Availability</div>
                <div className="mt-4 text-[11px] uppercase tracking-[0.24em] text-[#718096]">Select Date</div>
                <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="mt-2 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm text-[#1A202C] outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#003087]" />
                <div className="mt-4 text-sm font-semibold text-[#1A202C]">Time Slots</div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {slots.map((slot) => {
                    const isBooked = bookedSlots.some((range) => range.includes(slot))
                    return (
                      <div key={slot} className={`rounded-xl border px-3 py-2.5 text-center text-xs font-semibold transition-all ${isBooked ? 'cursor-not-allowed border-[#DC2626]/20 bg-[#FEF2F2] text-[#DC2626] opacity-70' : 'cursor-pointer border-[#059669]/20 bg-[#ECFDF5] text-[#059669] hover:bg-[#059669] hover:text-white'}`}>
                        {slot}
                      </div>
                    )
                  })}
                </div>
                <div className="mt-4 flex flex-wrap gap-4 text-xs">
                  <div className="inline-flex items-center gap-2 text-[#059669]"><span className="h-2.5 w-2.5 rounded-full bg-[#059669]" /> Available</div>
                  <div className="inline-flex items-center gap-2 text-[#DC2626]"><span className="h-2.5 w-2.5 rounded-full bg-[#DC2626]" /> Booked</div>
                </div>
                <button onClick={() => navigate(`/book/${room.id}`)} className="mt-6 w-full rounded-xl bg-[#003087] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#0046C0]">
                  → Proceed to Book
                </button>
              </div>
              <div className="rounded-2xl border border-[#E2E8F0] bg-[#F0F4F9] p-6">
                <div className="text-sm font-semibold text-[#0A1628]">Room Status</div>
                <div className="mt-3 flex items-center gap-2 text-sm text-[#4A5568]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#059669]" /> Available Today
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default RoomDetail
