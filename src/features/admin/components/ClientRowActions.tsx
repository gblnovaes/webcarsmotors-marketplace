import { Pencil, Trash2 } from 'lucide-react'
import type { Client } from '@/features/clients/types'

type ClientRowActionsProps = {
  client: Client
  onEdit: (c: Client) => void
  onDelete: (c: Client) => void
}

export function ClientRowActions({ client, onEdit, onDelete }: ClientRowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <button
        type="button"
        onClick={() => onEdit(client)}
        title="Editar"
        aria-label="Editar"
        className="grid place-items-center w-11 h-11 rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-primary"
      >
        <Pencil size={17} strokeWidth={1.75} />
      </button>
      <button
        type="button"
        onClick={() => onDelete(client)}
        title="Excluir"
        aria-label="Excluir"
        className="grid place-items-center w-11 h-11 rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-error"
      >
        <Trash2 size={17} strokeWidth={1.75} />
      </button>
    </div>
  )
}
