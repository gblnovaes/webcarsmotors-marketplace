import { Pencil, Pause, Play, Trash2 } from 'lucide-react'
import type { Vehicle } from '@/features/vehicles/types'

type VehicleRowActionsProps = {
  vehicle: Vehicle
  onEdit: (v: Vehicle) => void
  onTogglePause: (id: string) => void
  onDelete: (v: Vehicle) => void
}

export function VehicleRowActions({
  vehicle,
  onEdit,
  onTogglePause,
  onDelete,
}: VehicleRowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <button
        type="button"
        onClick={() => onEdit(vehicle)}
        title="Editar"
        aria-label="Editar"
        className="grid place-items-center w-11 h-11 rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-primary"
      >
        <Pencil size={17} strokeWidth={1.75} />
      </button>
      <button
        type="button"
        onClick={() => onTogglePause(vehicle.id)}
        title={vehicle.status === 'paused' ? 'Retomar' : 'Pausar'}
        aria-label={vehicle.status === 'paused' ? 'Retomar' : 'Pausar'}
        className="grid place-items-center w-11 h-11 rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-warning"
      >
        {vehicle.status === 'paused' ? (
          <Play size={17} strokeWidth={1.75} />
        ) : (
          <Pause size={17} strokeWidth={1.75} />
        )}
      </button>
      <button
        type="button"
        onClick={() => onDelete(vehicle)}
        title="Excluir"
        aria-label="Excluir"
        className="grid place-items-center w-11 h-11 rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-error"
      >
        <Trash2 size={17} strokeWidth={1.75} />
      </button>
    </div>
  )
}
