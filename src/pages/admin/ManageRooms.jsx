import { AlertCircle, Users, Search, Info, Building2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import PageTransition from '../../components/PageTransition'

const ManageRooms = () => {
  const navigate = useNavigate()
  const { rooms } = useAppContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [capacityFilter, setCapacityFilter] = useState('All')

  const filtered = useMemo(() => {
    return rooms.filter((room) => {
      const maxCapacity = room.capacity?.max ?? 0
      const minCapacity = room.capacity?.min ?? 0
      const matchSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) || room.building.toLowerCase().includes(searchTerm.toLowerCase())
      const matchStatus = statusFilter === 'All' || room.status === statusFilter.toLowerCase()
      const matchCapacity =
        capacityFilter === 'All' ||
        (capacityFilter === 'Small' && maxCapacity < 20) ||
        (capacityFilter === 'Medium' && maxCapacity >= 20 && minCapacity <= 50) ||
        (capacityFilter === 'Large' && maxCapacity > 50)
      return matchSearch && matchStatus && matchCapacity
    })
  }, [rooms, searchTerm, statusFilter, capacityFilter])

  const buildingOrder = ['Tower-I', 'Bridge Tower', 'Tower-II']

  const groupedRooms = buildingOrder.reduce((groups, buildingName) => {
    const roomsByBuilding = filtered.filter((room) => room.building === buildingName)
    if (roomsByBuilding.length) groups[buildingName] = roomsByBuilding
    return groups
  }, {})

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F0F4F9] text-[#1A202C] pb-12">
        {/* Header */}
        <div className="bg-linear-to-br from-[#0A1628] via-[#003087] to-[#0046C0] px-8 py-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#F5A623]/20 px-3 py-1 text-xs font-semibold text-[#F5A623]">
              <AlertCircle size={14} /> ROOM MANAGEMENT
            </span>
            <h1 className="mt-4 text-3xl font-bold text-white">Manage Conference Rooms</h1>
            <p className="mt-2 text-sm text-white/60">Manage availability, status, and bookings for all headquarters conference rooms</p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-[1480px] px-6 py-6">
          {/* Rank Priority Info */}
          <div className="mb-6 rounded-2xl border border-[#003087]/20 bg-[#EFF6FF] p-5">
            <div className="flex items-start gap-3">
              <Info size={18} className="text-[#003087] mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-semibold text-sm text-[#003087]">Approval Priority Hierarchy</div>
                <div className="mt-2 text-xs text-[#1E40AF] leading-relaxed">
                  Booking requests are approved based on officer rank: Commissioner (1) → Special Commissioner (2) → Joint Commissioner (3) → DCP (4) → Additional DCP (5) → ACP (6) → Inspector (7) → Sub-Inspector (8). Higher priority ranks may get room preferences during conflicts.
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-1 items-center gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5">
                <Search size={16} className="text-[#718096]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by room name or building..."
                  className="w-full bg-transparent text-sm text-[#1A202C] outline-none placeholder-[#A0AEC0]"
                />
              </div>

              <div className="flex flex-wrap gap-2 md:flex-nowrap">
                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-medium text-[#1A202C] outline-none transition hover:border-[#003087] focus:border-[#003087]"
                >
                  <option value="All">All Status</option>
                  <option value="available">Available</option>
                  <option value="booked">Booked</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="blocked">Blocked</option>
                </select>

                {/* Capacity Filter */}
                <select
                  value={capacityFilter}
                  onChange={(e) => setCapacityFilter(e.target.value)}
                  className="rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-medium text-[#1A202C] outline-none transition hover:border-[#003087] focus:border-[#003087]"
                >
                  <option value="All">All Capacities</option>
                  <option value="Small">Small (1-20)</option>
                  <option value="Medium">Medium (20-50)</option>
                  <option value="Large">Large (50+)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Room Overview Tables */}
          <div className="space-y-10">
            {Object.entries(groupedRooms).map(([buildingName, buildingRooms]) => (
              <div key={buildingName}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex-1 h-px bg-[#E2E8F0]" />
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#0A1628] px-4 py-1.5 text-xs font-bold text-white">
                    <Building2 size={14} /> {buildingName} ({buildingRooms.length} rooms)
                  </div>
                  <div className="flex-1 h-px bg-[#E2E8F0]" />
                </div>
                <div className="overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-sm">
                  <table className="min-w-full border-collapse text-left">
                    <thead className="bg-[#0A1628] text-white text-xs uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Room No.</th>
                        <th className="py-3 px-4">Venue / Name</th>
                        <th className="py-3 px-4">Managed By</th>
                        <th className="py-3 px-4">Seating Capacity</th>
                        <th className="py-3 px-4">Tag</th>
                        <th className="py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {buildingRooms.map((room, index) => {
                        const restricted = room.tag === 'Restricted' || room.tag === 'High Security'
                        return (
                          <tr key={room.id} className={`${restricted ? 'bg-[#FFF5F5] border-l-4 border-[#DC2626]' : index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'} transition-all hover:bg-[#EFF6FF]`}>
                            <td className="whitespace-nowrap py-4 px-4 text-sm text-[#1A202C]">{room.roomNo !== '-' ? room.roomNo : '—'}</td>
                            <td className="py-4 px-4 text-sm text-[#0A1628]"><div className="font-semibold">{room.name}</div><div className="mt-1 text-xs text-[#718096]">{room.floor}</div></td>
                            <td className="py-4 px-4 text-sm text-[#4A5568]">{room.managedBy && room.managedBy !== '-' ? room.managedBy : '—'}</td>
                            <td className="py-4 px-4 text-sm text-[#4A5568]">{room.capacityDisplay} seats</td>
                            <td className="py-4 px-4 text-sm">
                              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${room.tag === 'Restricted' || room.tag === 'High Security' ? 'bg-[#FEF2F2] text-[#DC2626] border border-[#DC2626]/20' : room.tag === 'Large Venue' || room.tag === 'Auditorium' ? 'bg-[#EFF6FF] text-[#003087] border border-[#003087]/20' : room.tag === 'Tech-Equipped' ? 'bg-[#ECFDF5] text-[#059669] border border-[#059669]/20' : room.tag === 'Bridge Tower' ? 'bg-[#FFFBEB] text-[#D97706] border border-[#F5A623]/20' : room.tag === 'Details TBD' ? 'bg-[#F5F5F5] text-[#9CA3AF] border border-[#E5E7EB]' : 'bg-[#F0F4F9] text-[#4A5568] border border-[#E2E8F0]'}`}>{room.tag}</span>
                            </td>
                            <td className="py-4 px-4 text-sm">
                              <div className="flex flex-col gap-2 sm:flex-row">
                                <button onClick={() => navigate(`/admin/rooms/${room.id}`)} className="rounded-full bg-[#003087] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#0046C0]">View Details</button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                      <tr className="bg-[#F8FAFC] text-sm font-semibold text-[#0A1628]">
                        <td className="py-4 px-4" colSpan={6}>Total: {buildingRooms.length} rooms in {buildingName}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default ManageRooms
