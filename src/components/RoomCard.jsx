import { Building2, MapPin, Users, UserCheck } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const tagStyles = {
  'Restricted': 'bg-[#FEF2F2] text-[#DC2626] border border-[#DC2626]/20',
  'High Security': 'bg-[#FEF2F2] text-[#DC2626] border border-[#DC2626]/20',
  'Large Venue': 'bg-[#EFF6FF] text-[#003087] border border-[#003087]/20',
  'Auditorium': 'bg-[#EFF6FF] text-[#003087] border border-[#003087]/20',
  'Tech-Equipped': 'bg-[#ECFDF5] text-[#059669] border border-[#059669]/20',
  'Mid-Size': 'bg-[#F0F4F9] text-[#4A5568] border border-[#E2E8F0]',
  'Small': 'bg-[#F0F4F9] text-[#4A5568] border border-[#E2E8F0]',
  'Bridge Tower': 'bg-[#FFFBEB] text-[#D97706] border border-[#F5A623]/20',
  'Details TBD': 'bg-[#F5F5F5] text-[#9CA3AF] border border-[#E5E7EB]'
}

const RoomCard = ({ room, bookingCount }) => {
  const [imageFailed, setImageFailed] = useState(false)
  const availableToday = bookingCount === 0
  const roomLabel = room.roomNo !== '-' ? `Room ${room.roomNo}` : null
  const tagClassName = tagStyles[room.tag] || 'bg-[#F0F4F9] text-[#4A5568] border border-[#E2E8F0]'
  const roomInitials = room.name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')

  const mainImage = room.image || '/assets/rooms/room-1.jpg'

  return (
    <div className="group overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
      <Link to={`/rooms/${room.id}`} className="block overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          {!imageFailed ? (
            <img
              src={mainImage}
              alt={room.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${room.color}`}>
              <Building2 size={40} className="text-white opacity-90" />
              <span className="mt-2 text-xl font-bold text-white">{roomInitials}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute left-3 top-3 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-[#0A1628] flex items-center gap-1">
            <Building2 size={12} /> {room.building}
          </div>
          {roomLabel && (
            <div className="absolute left-3 bottom-3 rounded-full bg-[#0A1628]/80 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-white">
              {roomLabel}
            </div>
          )}
          <div className="absolute right-3 top-3 rounded-full bg-[#0A1628]/80 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-white flex items-center gap-1">
            <Users size={12} /> {room.capacityDisplay} seats
          </div>
        </div>
      </Link>
      <div className="p-5">
        <h3 className="text-base font-semibold text-[#0A1628]">{room.name}</h3>
        <div className="mt-3 flex items-center gap-2 text-xs text-[#718096]">
          <MapPin size={12} /> {room.floor}
        </div>
        {room.managedBy && room.managedBy !== '-' && (
          <div className="mt-2 flex items-center gap-2 text-xs text-[#718096]">
            <UserCheck size={12} /> Managed by: {room.managedBy}
          </div>
        )}
        <div className="mt-4">
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${tagClassName}`}>
            {room.tag}
          </span>
        </div>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold bg-[#ECFDF5] text-[#059669]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#059669]" />
          {availableToday ? 'Available Today' : 'Partially Booked Today'}
        </div>
        <div className="mt-5 flex gap-2">
          <Link
            to={`/rooms/${room.id}`}
            className="flex-1 rounded-xl border border-[#E2E8F0] bg-[#F0F4F9] px-4 py-2 text-sm font-semibold text-[#003087] transition-all duration-200 hover:bg-[#003087] hover:text-white"
          >
            Check Availability
          </Link>
          <Link
            to={`/book/${room.id}`}
            className="flex-1 rounded-xl bg-gradient-to-r from-[#003087] to-[#0046C0] px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:shadow-md hover:shadow-blue-500/20"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RoomCard
