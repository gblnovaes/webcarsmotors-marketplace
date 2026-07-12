import { CLIENT_STATUS_META } from '@/features/clients/schema'
import type { ClientStatus } from '@/features/clients/types'

export function ClientStatusPill({ status }: { status: ClientStatus }) {
  const meta = CLIENT_STATUS_META[status] ?? CLIENT_STATUS_META.active
  return (
    <span className={`inline-flex items-center rounded-pill text-label px-3 py-1 ${meta.pillClass}`}>
      {meta.label}
    </span>
  )
}
