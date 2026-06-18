import { Building2, Calendar, Layers, Users, UserCheck } from 'lucide-react'
import { useMemo, useState } from 'react'
import RoomCard from '../../components/RoomCard'
import { useAppContext } from '../../context/AppContext'
import PageTransition from '../../components/PageTransition'

const floorOptions = [
  'Ground Floor',
  '1st Floor',
  '2nd Floor',
  '3rd Floor',
  '4th Floor',
  '7th Floor',
  '13th Floor',
  '14th Floor',
  '17th Floor'
]

const buildingOptions = ['Tower-I', 'Bridge Tower', 'Tower-II']

const managedByOptions = [
  'HRD',
  'Traffic',
  'DCP/GA',
  'IT Center',
  'PRO',
  'CP Secretariats',
  'Reception',
  'Media Cell',
  'L&O Zone-1',
  'Spl. Cell'
]

const capacityOptions = [
  { id: '', label: 'All' },
  { id: 'upto-30', label: 'Upto 30' },
  { id: '31-50', label: '31–50' },
  { id: '51-100', label: '51–100' },
  { id: '100+', label: '100+' }
]

const buildingOrder = ['Tower-I', 'Bridge Tower', 'Tower-II']

const BrowseRooms = () => {
  const { rooms, bookings } = useAppContext()
  const [building, setBuilding] = useState('')
  const [capacity, setCapacity] = useState('')
  const [floor, setFloor] = useState('')
  const [managedBy, setManagedBy] = useState('')
  const [date, setDate] = useState('2026-06-17')

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const min = room.capacity?.min ?? 0
      const max = room.capacity?.max ?? 0
      if (building && room.building !== building) return false
      if (managedBy && room.managedBy !== managedBy) return false
      if (floor && room.floor !== floor) return false
      if (capacity === 'upto-30' && max > 30) return false
      if (capacity === '31-50' && (max < 31 || min > 50)) return false
      if (capacity === '51-100' && (max < 51 || min > 100)) return false
      if (capacity === '100+' && max < 100) return false
      return true
    })
  }, [rooms, building, capacity, floor, managedBy])

  const groupedRooms = useMemo(() => {
    if (building) {
      return { [building]: filteredRooms }
    }
    return buildingOrder.reduce((acc, buildingName) => {
      const group = filteredRooms.filter((room) => room.building === buildingName)
      if (group.length) acc[buildingName] = group
      return acc
    }, {})
  }, [filteredRooms, building])

  const getBookingCount = (roomId) => bookings.filter((booking) => booking.roomId === roomId && booking.date === date).length

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F0F4F9] text-[#1A202C]">
        <div className="border-b border-[#E2E8F0] bg-white px-6 py-6">
          <div className="text-xs text-[#718096]">Home / Browse Rooms</div>
          <h1 className="mt-2 text-2xl font-bold text-[#0A1628]">Conference Rooms</h1>
          <p className="mt-1 text-sm text-[#4A5568]">Select a room to view availability and submit a booking request</p>
        </div>
        <div className="sticky  z-40 border-b border-[#E2E8F0] bg-white px-6 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex flex-1 min-w-[180px] items-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 text-sm text-[#1A202C] focus-within:ring-2 focus-within:ring-[#003087]">
              <Building2 size={16} />
              <select className="w-full bg-transparent outline-none" value={building} onChange={(event) => setBuilding(event.target.value)}>
                <option value="">All Buildings</option>
                {buildingOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-1 min-w-[180px] items-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 text-sm text-[#1A202C] focus-within:ring-2 focus-within:ring-[#003087]">
              <Users size={16} />
              <select className="w-full bg-transparent outline-none" value={capacity} onChange={(event) => setCapacity(event.target.value)}>
                {capacityOptions.map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-1 min-w-[180px] items-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 text-sm text-[#1A202C] focus-within:ring-2 focus-within:ring-[#003087]">
              <Layers size={16} />
              <select className="w-full bg-transparent outline-none" value={floor} onChange={(event) => setFloor(event.target.value)}>
                <option value="">All Floors</option>
                {floorOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-1 min-w-[180px] items-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 text-sm text-[#1A202C] focus-within:ring-2 focus-within:ring-[#003087]">
              <UserCheck size={16} />
              <select className="w-full bg-transparent outline-none" value={managedBy} onChange={(event) => setManagedBy(event.target.value)}>
                <option value="">All</option>
                {managedByOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-1 min-w-[180px] items-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 text-sm text-[#1A202C] focus-within:ring-2 focus-within:ring-[#003087]">
              <Calendar size={16} />
              <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="w-full bg-transparent outline-none" />
            </label>
            <button className="rounded-xl bg-[#003087] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#0046C0]">Search</button>
            <button onClick={() => { setBuilding(''); setCapacity(''); setFloor(''); setManagedBy(''); setDate('2026-06-17') }} className="text-sm text-[#718096] transition hover:text-[#003087]">Clear Filters</button>
          </div>
        </div>
        <div className="px-6 py-6">
          {Object.entries(groupedRooms).map(([buildingName, groupRooms]) => (
            <div key={buildingName} className="mb-10">
              {!building && (
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex-1 h-px bg-[#E2E8F0]" />
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#0A1628] px-4 py-1.5 text-xs font-bold text-white">
                    <Building2 size={14} /> {buildingName} ({groupRooms.length} rooms)
                  </div>
                  <div className="flex-1 h-px bg-[#E2E8F0]" />
                </div>
              )}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {groupRooms.map((room) => (
                  <RoomCard key={room.id} room={room} bookingCount={getBookingCount(room.id)} />
                ))}
              </div>
            </div>
          ))}
          {filteredRooms.length === 0 && (
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-12 text-center">
              <div className="text-lg font-semibold text-[#1A202C]">No rooms found</div>
              <p className="mt-2 text-sm text-[#718096]">Try adjusting your filters or clearing the selection.</p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}

export default BrowseRooms
