import type { Vehicle } from '@/features/vehicles/types'
import { brl, km } from '@/shared/lib/format'
import { StatusPill } from '@/features/admin/components/StatusPill'
import { VehicleRowActions } from '@/features/admin/components/VehicleRowActions'

type VehicleMobileCardProps = {
  vehicle: Vehicle
  onEdit: (v: Vehicle) => void
  onTogglePause: (id: string) => void
  onDelete: (v: Vehicle) => void
}

export function VehicleMobileCard({
  vehicle,
  onEdit,
  onTogglePause,
  onDelete,
}: VehicleMobileCardProps) {
  return (
    <article className="p-4 border-t border-neutral-100 first:border-t-0">
      <div className="flex gap-3">
        <img
          src={vehicle.imageUrl}
          alt=""
          className="w-20 h-14 rounded-md object-cover bg-neutral-100 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="text-body font-semibold text-neutral-900 leading-tight truncate">
                {vehicle.brand}
              </div>
              <div className="text-caption text-neutral-500 truncate">{vehicle.model}</div>
            </div>
            <StatusPill status={vehicle.status} />
          </div>
          <div className="mt-1.5 text-body font-bold text-primary tnum">{brl(vehicle.price)}</div>
          <div className="mt-0.5 text-caption text-neutral-500 tnum">
            {vehicle.year} · {km(vehicle.km)} · {vehicle.fuel}
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-end -mr-1">
        <VehicleRowActions
          vehicle={vehicle}
          onEdit={onEdit}
          onTogglePause={onTogglePause}
          onDelete={onDelete}
        />
      </div>
    </article>
  )
}
