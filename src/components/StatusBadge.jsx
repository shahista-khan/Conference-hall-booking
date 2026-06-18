const palette = {
  approved: 'bg-[#ECFDF5] text-[#059669]',
  pending: 'bg-[#FFFBEB] text-[#D97706]',
  rejected: 'bg-[#FEF2F2] text-[#DC2626]',
  alternate_suggested: 'bg-[#F5F3FF] text-[#7C3AED]'
}

const dot = {
  approved: 'bg-[#059669]',
  pending: 'bg-[#D97706]',
  rejected: 'bg-[#DC2626]',
  alternate_suggested: 'bg-[#7C3AED]'
}

const labels = {
  approved: 'Approved',
  pending: 'Pending',
  rejected: 'Rejected',
  alternate_suggested: 'Alternate'
}

const StatusBadge = ({ status }) => {
  return (
    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${palette[status] || 'bg-[#F8FAFC] text-[#4A5568]'}`}>
      <span className={`h-2.5 w-2.5 rounded-full ${dot[status] || 'bg-[#718096]'}`} />
      {labels[status] || 'Unknown'}
    </div>
  )
}

export default StatusBadge
