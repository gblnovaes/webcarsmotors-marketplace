import { STATUS_META } from '@/features/vehicles/schema'
import type { VehicleStatus } from '@/features/vehicles/types'

export function StatusPill({ status }: { status: VehicleStatus }) {
  const meta = STATUS_META[status] ?? STATUS_META.available
  return (
    <span className={`inline-flex items-center rounded-pill text-label px-3 py-1 ${meta.pillClass}`}>
      {meta.label}
    </span>
  )
}
