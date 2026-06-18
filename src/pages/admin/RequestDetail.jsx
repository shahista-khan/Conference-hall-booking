import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AlertTriangle, ArrowLeft, CheckCircle2, RefreshCw, ShieldCheck, XCircle, Phone } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'
import PageTransition from '../../components/PageTransition'
import StatusBadge from '../../components/StatusBadge'

const RequestDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getBookingById, getUserById, getRoomById, updateBookingStatus, suggestAlternate, rankPriority } = useAppContext()
  const booking = getBookingById(id)
  const user = getUserById(booking?.userId)
  const room = getRoomById(booking?.roomId)
  const [action, setAction] = useState('')
  const [note, setNote] = useState('')
  const [altRoom, setAltRoom] = useState(room?.id || 1)
  const [altDate, setAltDate] = useState('2026-06-18')
  const [altStart, setAltStart] = useState('10:00')
  const [altEnd, setAltEnd] = useState('12:00')
  const [allowEditDecision, setAllowEditDecision] = useState(false)

  const priorityLevel = rankPriority[user?.rank] || 11
  const hasDecision = booking?.status !== 'pending'

  const rooms = useMemo(() => [
    { id: 1, name: "Commissioner's Conference Hall" },
    { id: 2, name: 'Joint Commissioner Meeting Room' },
    { id: 3, name: 'DCP Boardroom' },
    { id: 4, name: 'Training & Briefing Room' },
    { id: 5, name: 'Intelligence Wing Conference Room' }
  ], [])

  if (!booking || !user || !room) return null

  const conflict = booking.status === 'alternate_suggested'

  const handleApprove = () => {
    updateBookingStatus(booking.id, { status: 'approved', adminNote: note || 'Approved by HQ Admin.' })
    setAction('')
    setAllowEditDecision(false)
  }

  const handleReject = () => {
    updateBookingStatus(booking.id, { status: 'rejected', adminNote: note || 'Rejected by HQ Admin.' })
    setAction('')
    setAllowEditDecision(false)
  }

  const handleAlternate = () => {
    suggestAlternate(booking.id, altRoom, altDate, altStart, altEnd, note)
    setAction('')
    setAllowEditDecision(false)
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F0F4F9] text-[#1A202C]">
        <div className="border-b border-[#E2E8F0] bg-white px-6 py-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <button onClick={() => navigate('/admin/requests')} className="inline-flex items-center gap-2 text-[#003087] font-medium text-sm hover:underline">
              <ArrowLeft size={16} /> All Requests
            </button>
            <div className="flex flex-wrap items-center gap-2 text-sm text-[#718096]">
              <span className="rounded-full bg-[#F0F4F9] px-3 py-1">{booking.id}</span>
              <StatusBadge status={booking.status} />
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-370 px-6 py-6 lg:grid lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-3 space-y-4">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <div className="text-sm uppercase tracking-[0.24em] text-[#718096]">Officer Information</div>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#003087] text-white text-lg font-bold">{user.initials}</div>
                <div>
                  <div className="text-lg font-bold text-[#0A1628]">{user.name}</div>
                  <div className="mt-2 inline-flex rounded-full bg-[#003087] px-3 py-1 text-xs text-white">{user.rank}</div>
                  <div className="mt-2 text-xs text-[#718096]">{user.badgeNumber}</div>
                  <div className="text-xs text-[#718096]">{user.department}</div>
                </div>
              </div>
              <div className="mt-5 rounded-xl border border-[#F5A623]/30 bg-[#FFFBEB] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.24em] text-[#718096]">Rank Priority Level</div>
                    <div className="text-2xl font-bold text-[#D97706]">{priorityLevel}</div>
                    <div className="text-xs text-[#4A5568]">({booking.status === 'approved' ? 'Approved Level' : 'DCP — Level 4'})</div>
                  </div>
                  <div className="text-sm font-semibold text-[#4A5568]">{priorityLevel <= 4 ? '⭐⭐' : priorityLevel <= 7 ? 'Mid Priority' : 'Standard Priority'}</div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-3 rounded-2xl bg-[#F8FAFC] p-4">
                  <Phone size={20} className="text-[#003087]" />
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.24em] text-[#718096]">Contact</div>
                    <div className="text-sm font-semibold text-[#1A202C]">{user.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-[#F8FAFC] p-4">
                  <ShieldCheck size={20} className="text-[#003087]" />
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.24em] text-[#718096]">Department</div>
                    <div className="text-sm font-semibold text-[#1A202C]">{user.department}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <div className="text-sm uppercase tracking-[0.24em] text-[#718096]">Booking Details</div>
              <div className="mt-4 flex gap-4">
                <div className="h-20 w-28 overflow-hidden rounded-3xl bg-slate-800">
                  <img src={room.image || '/assets/rooms/room-1.jpg'} alt={room.name} className="h-full w-full object-cover" onError={(event) => { event.currentTarget.style.display = 'none' }} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-[#0A1628]">{room.name}</div>
                  <div className="text-xs text-[#718096]">{room.floor} · {room.building}</div>
                </div>
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {[
                  { label: 'Date', value: booking.date },
                  { label: 'Time', value: `${booking.startTime} - ${booking.endTime}` },
                  { label: 'Duration', value: `${Number(booking.endTime.split(':')[0]) - Number(booking.startTime.split(':')[0])} hrs` },
                  { label: 'Attendees', value: booking.attendees }
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl bg-[#F8FAFC] p-4">
                    <div className="text-[10px] uppercase tracking-[0.24em] text-[#718096]">{item.label}</div>
                    <div className="mt-2 text-sm font-semibold text-[#1A202C]">{item.value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                <div className="text-[10px] uppercase tracking-[0.24em] text-[#718096]">Purpose of Meeting</div>
                <p className="mt-2 text-sm text-[#1A202C]">{booking.purpose}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <div className="text-sm uppercase tracking-[0.24em] text-[#718096]">Conflict Analysis</div>
              {conflict ? (
                <div className="mt-4 rounded-xl border border-[#DC2626]/20 bg-[#FEF2F2] p-4">
                  <div className="flex items-start gap-3 text-[#DC2626]">
                    <AlertTriangle size={20} />
                    <div>
                      <div className="text-sm font-semibold">Scheduling Conflict Detected</div>
                      <div className="mt-2 text-xs text-[#4A5568]">Room already booked for this request slot. Please suggest an alternate room or reject the request.</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 rounded-xl border border-[#059669]/20 bg-[#ECFDF5] p-4">
                  <div className="flex items-center gap-3 text-[#059669]">
                    <CheckCircle2 size={20} />
                    <div className="text-sm font-medium">No conflicts found for this request.</div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <div className="text-base font-bold text-[#0A1628]">Admin Decision</div>
              <div className="mt-2 text-xs text-[#718096]">Request ID: {booking.id} · Submitted {new Date(booking.requestedOn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
              <div className="mt-5 space-y-3">
                {hasDecision && !allowEditDecision ? (
                  <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5">
                    <StatusBadge status={booking.status} />
                    <div className="mt-4 text-xs text-[#718096]">Decision made by: HQ Admin</div>
                    <div className="mt-1 text-xs text-[#718096]">Date of action: Jun 16, 2026</div>
                    <div className="mt-4 rounded-xl bg-white p-4 text-xs italic text-[#4A5568] border border-[#E2E8F0]">{booking.adminNote}</div>
                    <button onClick={() => {
                      setAllowEditDecision(true)
                      setNote(booking.adminNote || '')
                      setAction('')
                    }} className="mt-4 rounded-xl border border-[#003087] bg-white px-4 py-3 text-sm font-semibold text-[#003087] transition-all hover:bg-[#EFF6FF]">
                      Edit Decision
                    </button>
                  </div>
                ) : (
                  <>
                    <button onClick={() => setAction(action === 'approve' ? '' : 'approve')} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#059669] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#047857]">
                      <CheckCircle2 size={16} /> Approve Request
                    </button>
                    {action === 'approve' && (
                      <div className="space-y-3 rounded-2xl border border-[#E2E8F0] bg-[#ECFDF5] p-4">
                        <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Add approval note (optional)" className="w-full rounded-2xl border border-[#D1D5DB] bg-white p-3 text-sm text-[#1A202C] outline-none" />
                        <button onClick={handleApprove} className="w-full rounded-xl bg-[#059669] px-4 py-3 text-sm font-semibold text-white">Confirm Approval</button>
                      </div>
                    )}
                    <button onClick={() => setAction(action === 'reject' ? '' : 'reject')} className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#DC2626] bg-white px-4 py-3 text-sm font-semibold text-[#DC2626] transition-all hover:bg-[#DC2626] hover:text-white">
                      <XCircle size={16} /> Reject Request
                    </button>
                    {action === 'reject' && (
                      <div className="space-y-3 rounded-2xl border border-[#E2E8F0] bg-[#FEF2F2] p-4">
                        <div className="text-xs font-semibold text-[#DC2626]">Reason for rejection</div>
                        <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Add rejection reason" maxLength={200} className="w-full rounded-2xl border border-[#D1D5DB] bg-white p-3 text-sm text-[#1A202C] outline-none" />
                        <div className="text-xs text-[#718096]">{note.length}/200</div>
                        <button onClick={handleReject} className="w-full rounded-xl bg-[#DC2626] px-4 py-3 text-sm font-semibold text-white">Confirm Rejection</button>
                      </div>
                    )}
                    <button onClick={() => setAction(action === 'alternate' ? '' : 'alternate')} className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#7C3AED] bg-white px-4 py-3 text-sm font-semibold text-[#7C3AED] transition-all hover:bg-[#7C3AED] hover:text-white">
                      <RefreshCw size={16} /> Suggest Alternate
                    </button>
                    {action === 'alternate' && (
                      <div className="rounded-2xl border border-[#7C3AED]/20 bg-[#F5F3FF] p-4">
                        <div className="space-y-4">
                          <label className="block text-xs uppercase tracking-[0.24em] text-[#718096]">Alternate Room</label>
                          <select value={altRoom} onChange={(event) => setAltRoom(Number(event.target.value))} className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#1A202C] outline-none">
                            {rooms.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
                          </select>
                          <label className="block text-xs uppercase tracking-[0.24em] text-[#718096]">Alternate Date</label>
                          <input type="date" value={altDate} onChange={(event) => setAltDate(event.target.value)} className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#1A202C] outline-none" />
                          <div className="grid gap-4 md:grid-cols-2">
                            <label className="block text-xs uppercase tracking-[0.24em] text-[#718096]">Start Time</label>
                            <input type="time" value={altStart} onChange={(event) => setAltStart(event.target.value)} className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#1A202C] outline-none" />
                            <label className="block text-xs uppercase tracking-[0.24em] text-[#718096]">End Time</label>
                            <input type="time" value={altEnd} onChange={(event) => setAltEnd(event.target.value)} className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#1A202C] outline-none" />
                          </div>
                          <label className="block text-xs uppercase tracking-[0.24em] text-[#718096]">Message to Officer</label>
                          <textarea value={note} onChange={(event) => setNote(event.target.value)} rows="3" className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#1A202C] outline-none" placeholder="Enter your suggestion details" />
                          <button onClick={handleAlternate} className="w-full rounded-xl bg-[#7C3AED] px-4 py-3 text-sm font-semibold text-white">Send Alternate Suggestion</button>
                        </div>
                      </div>
                    )}
                    {hasDecision && (
                      <button onClick={() => {
                        setAllowEditDecision(false)
                        setNote(booking.adminNote || '')
                        setAction('')
                      }} className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm font-semibold text-[#4A5568] transition-all hover:border-[#718096] hover:bg-[#F8FAFC]">
                        Cancel Edit
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default RequestDetail
