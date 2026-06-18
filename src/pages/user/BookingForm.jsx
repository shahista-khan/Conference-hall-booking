import { AlertTriangle, Calendar, Send } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import PageTransition from '../../components/PageTransition'

const BookingForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { rooms, currentUser, createBookingRequest, getRoomById } = useAppContext()
  const room = getRoomById(id) || rooms[0]
  const [date, setDate] = useState('2026-06-17')
  const [startTime, setStartTime] = useState('10:00')
  const [endTime, setEndTime] = useState('12:00')
  const [attendees, setAttendees] = useState(10)
  const [purpose, setPurpose] = useState('')
  const [notes, setNotes] = useState('')

  const exceedsCapacity = attendees > (room.capacity?.max ?? 0)
  const isTBD = room.tag === 'Details TBD'
  const isRestricted = room.tag === 'Restricted' || room.tag === 'High Security'

  const summary = useMemo(
    () => [
      { label: 'Room', value: room.name },
      { label: 'Date', value: date },
      { label: 'Time', value: `${startTime} - ${endTime}` },
      { label: 'Attendees', value: `${attendees} persons` }
    ],
    [room, date, startTime, endTime, attendees]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    if (exceedsCapacity) return
    createBookingRequest({ roomId: room.id, date, startTime, endTime, purpose, attendees, notes })
    navigate('/my-bookings')
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F0F4F9] pt-20 text-[#1A202C]">
        <div className="border-b border-[#E2E8F0] bg-white px-6 py-5">
          <div className="text-xs text-[#718096]">Home / New Booking Request</div>
          <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-xl font-bold text-[#0A1628]">New Booking Request</h1>
              <p className="text-sm text-[#4A5568] mt-1">Room name <span className="text-gold">{room.name}</span></p>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-[1480px] px-6 py-6 lg:grid lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <div className="text-base font-semibold text-[#0A1628]">Booking Details</div>
              <div className="mt-4 space-y-6">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#718096]">
                  Select Room
                  <select value={room.id} disabled className="mt-2 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm text-[#1A202C] outline-none">
                    <optgroup label="── Tower-I ──" style={{ fontWeight: 'bold', color: '#003087' }}>
                      {rooms.filter((option) => option.building === 'Tower-I').map((option) => (
                        <option key={option.id} value={option.id}>{`${option.name} (${option.floor}, ${option.capacityDisplay} seats)`}</option>
                      ))}
                    </optgroup>
                    <optgroup label="── Bridge Tower ──" style={{ fontWeight: 'bold', color: '#003087' }}>
                      {rooms.filter((option) => option.building === 'Bridge Tower').map((option) => (
                        <option key={option.id} value={option.id}>{`${option.name} (${option.floor}, ${option.capacityDisplay} seats)`}</option>
                      ))}
                    </optgroup>
                    <optgroup label="── Tower-II ──" style={{ fontWeight: 'bold', color: '#003087' }}>
                      {rooms.filter((option) => option.building === 'Tower-II').map((option) => (
                        <option key={option.id} value={option.id}>{`${option.name} – ${option.roomNo} (${option.floor}, ${option.capacityDisplay} seats)`}</option>
                      ))}
                    </optgroup>
                  </select>
                </label>
                {isTBD && (
                  <div className="mt-2 rounded-xl border border-[#F5A623]/30 bg-[#FFFBEB] p-3 text-xs text-[#D97706]">
                    Details for this room are not yet confirmed. Contact administration for more information.
                  </div>
                )}
                {isRestricted && (
                  <div className="mt-2 rounded-xl border border-[#DC2626]/20 bg-[#FEF2F2] p-3 text-xs text-[#DC2626]">
                    ⚠️ This is a restricted access room. Your request will require additional authorization.
                  </div>
                )}
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#718096]">
                  Date
                  <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 focus-within:ring-2 focus-within:ring-[#003087]">
                    <Calendar size={18} className="text-[#4A5568]" />
                    <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="w-full bg-transparent text-sm text-[#1A202C] outline-none" />
                  </div>
                </label>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#718096]">
                    Start Time
                    <input type="time" value={startTime} onChange={(event) => setStartTime(event.target.value)} className="mt-2 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm text-[#1A202C] outline-none focus:border-transparent focus:ring-2 focus:ring-[#003087]" />
                  </label>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#718096]">
                    End Time
                    <input type="time" value={endTime} onChange={(event) => setEndTime(event.target.value)} className="mt-2 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm text-[#1A202C] outline-none focus:border-transparent focus:ring-2 focus:ring-[#003087]" />
                  </label>
                </div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#718096]">
                  Number of Attendees
                  <input type="number" min="1" value={attendees} onChange={(event) => setAttendees(event.target.value)} className="mt-2 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm text-[#1A202C] outline-none focus:border-transparent focus:ring-2 focus:ring-[#003087]" />
                  <p className="mt-2 text-xs text-[#718096]">Max capacity: {room.capacity?.max ?? 0} persons</p>
                  {exceedsCapacity && <p className="mt-2 text-xs text-[#DC2626]">⚠️ Exceeds room capacity</p>}
                </label>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#718096]">
                  Purpose of Meeting
                  <textarea rows="4" value={purpose} onChange={(event) => setPurpose(event.target.value)} className="mt-2 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm text-[#1A202C] outline-none focus:border-transparent focus:ring-2 focus:ring-[#003087]" />
                </label>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#718096]">
                  Additional Notes
                  <textarea rows="2" value={notes} onChange={(event) => setNotes(event.target.value)} className="mt-2 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm text-[#1A202C] outline-none focus:border-transparent focus:ring-2 focus:ring-[#003087]" />
                </label>
                <div className="flex flex-col gap-3 md:flex-row">
                  <button type="button" onClick={handleSubmit} disabled={exceedsCapacity} className="flex-1 rounded-xl bg-gradient-to-r from-[#003087] to-[#0046C0] px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 disabled:cursor-not-allowed disabled:opacity-60">
                    <Send size={16} /> Submit Request
                  </button>
                  <button type="button" onClick={() => navigate('/rooms')} className="flex-1 rounded-xl border border-[#E2E8F0] bg-white px-8 py-3.5 text-sm font-semibold text-[#4A5568] transition-all duration-200 hover:border-[#718096]">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-wide text-[#718096]">Officer Details</div>
              <p className="mt-1 text-xs text-[#718096]">Auto-filled from your profile</p>
              <div className="mt-5 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#003087] text-white">{currentUser?.initials || 'DP'}</div>
                <div>
                  <div className="text-sm font-semibold text-[#0A1628]">{currentUser?.name || 'Rajesh Kumar Singh'}</div>
                  <div className="text-xs text-[#4A5568]">{currentUser?.rank || 'Inspector'}</div>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {[
                  { label: 'Badge No', value: currentUser?.badgeNumber || 'DP-4521' },
                  { label: 'Department', value: currentUser?.department || 'Crime Branch' },
                  { label: 'Contact', value: currentUser?.phone || '9810001234' }
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-xl bg-[#F0F4F9] p-3">
                    <div className="h-10 w-10 rounded-2xl bg-white/80" />
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.22em] text-[#718096]">{item.label}</div>
                      <div className="text-sm font-semibold text-[#0A1628]">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-[#F5A623]/30 bg-[#FFFBEB] p-5">
              <div className="flex items-center gap-3 text-[#D97706]">
                <AlertTriangle size={20} />
                <div className="text-sm font-semibold">Please Note</div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[#92400E]">Booking requests require admin approval. Approval priority is based on officer rank. You will be notified once reviewed.</p>
            </div>
            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F0F4F9] p-5">
              <div className="text-sm font-semibold text-[#1A202C]">Request Summary</div>
              <div className="mt-4 space-y-3">
                {summary.map((item) => (
                  <div key={item.label} className="rounded-2xl bg-white p-3">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[#718096]">{item.label}</div>
                    <div className="mt-1 text-sm font-semibold text-[#003087]">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default BookingForm
