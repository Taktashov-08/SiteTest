import { reservationStatuses } from '../../data/restaurant.js'

const statusClasses = {
  pending: 'border-[#d6a94f] bg-[#fff5d7] text-[#7a4d00]',
  accepted: 'border-[#78a46b] bg-[#edf7e8] text-[#28502b]',
  rejected: 'border-[#d28b7b] bg-[#fff0e8] text-[#9f2f21]',
  cancelled: 'border-[#b5ad9b] bg-[#f3eee3] text-[#5f5747]',
}

function StatusBadge({ status = 'pending' }) {
  const normalizedStatus = status || 'pending'

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${
        statusClasses[normalizedStatus] || statusClasses.pending
      }`}
    >
      {reservationStatuses[normalizedStatus] || reservationStatuses.pending}
    </span>
  )
}

export default StatusBadge
