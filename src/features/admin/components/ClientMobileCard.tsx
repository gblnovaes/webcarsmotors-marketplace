import type { Client } from '@/features/clients/types'
import { clientInitials } from '@/features/clients/schema'
import { ClientStatusPill } from '@/features/admin/components/ClientStatusPill'
import { ClientRowActions } from '@/features/admin/components/ClientRowActions'

type ClientMobileCardProps = {
  client: Client
  onEdit: (c: Client) => void
  onDelete: (c: Client) => void
}

export function ClientMobileCard({ client, onEdit, onDelete }: ClientMobileCardProps) {
  return (
    <article className="p-4 border-t border-neutral-100 first:border-t-0">
      <div className="flex gap-3">
        <div className="w-12 h-12 rounded-full bg-accent-soft text-primary grid place-items-center text-label font-semibold shrink-0">
          {client.photoUrl ? (
            <img
              src={client.photoUrl}
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            clientInitials(client.fullName)
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="text-body font-semibold text-neutral-900 leading-tight truncate">
                {client.fullName}
              </div>
              <div className="text-caption text-neutral-500 truncate">{client.email}</div>
            </div>
            <ClientStatusPill status={client.status} />
          </div>
          <div className="mt-1.5 text-caption text-neutral-500">
            {client.phone}
            {client.city ? ` · ${client.city}/${client.state}` : ''}
          </div>
          <div className="mt-0.5 text-caption text-neutral-500">
            {client.interest}
            {client.visits > 0 ? ` · ${client.visits} visitas` : ''}
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-end -mr-1">
        <ClientRowActions client={client} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </article>
  )
}
