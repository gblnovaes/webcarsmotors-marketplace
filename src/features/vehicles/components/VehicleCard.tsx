import { Link } from 'react-router-dom'
import { Heart, Gauge, Fuel, Settings2, MapPin } from 'lucide-react'
import { brl, km } from '@/shared/lib/format'
import { STATUS_META } from '@/features/vehicles/schema'
import type { Vehicle, VehicleStatus } from '@/features/vehicles/types'

function StatusBadge({ status }: { status: VehicleStatus }) {
  const meta = STATUS_META[status] ?? STATUS_META.available
  if (status === 'sold') {
    return (
      <span className="badge" style={{ background: '#FBECEC', color: '#DC2626' }}>
        {meta.label}
      </span>
    )
  }
  if (status === 'paused') return null
  return <span className={meta.badgeClass}>{meta.label}</span>
}

export default function VehicleCard({ v }: { v: Vehicle }) {
  const sold = v.status === 'sold'
  const title = `${v.brand} ${v.model}`

  return (
    <article
      className={`card card-hover overflow-hidden group flex flex-col ${sold ? 'opacity-70' : ''}`}
    >
      <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
        <img
          src={v.imageUrl}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute top-3 left-3">
          <StatusBadge status={v.status} />
        </div>
        <button
          type="button"
          className="absolute top-3 right-3 grid place-items-center w-9 h-9 rounded-pill bg-neutral-0/90 backdrop-blur text-neutral-500 hover:text-error shadow-sm"
          aria-label="Favoritar"
        >
          <Heart size={17} strokeWidth={1.75} />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-h3 text-neutral-900 truncate">{title}</h3>
          <span className="text-caption text-neutral-400 tnum shrink-0">{v.year}</span>
        </div>
        <p className="text-caption text-neutral-500 mt-0.5 truncate">
          {v.category} · {v.color}
        </p>

        <div className="grid grid-cols-2 gap-y-2 gap-x-3 mt-4 text-caption text-neutral-500">
          <span className="flex items-center gap-1.5">
            <Gauge size={14} strokeWidth={1.75} className="text-neutral-400" />
            {km(v.km)}
          </span>
          <span className="flex items-center gap-1.5">
            <Fuel size={14} strokeWidth={1.75} className="text-neutral-400" />
            {v.fuel}
          </span>
          <span className="flex items-center gap-1.5">
            <Settings2 size={14} strokeWidth={1.75} className="text-neutral-400" />
            {v.transmission}
          </span>
          <span className="flex items-center gap-1.5 truncate">
            <MapPin size={14} strokeWidth={1.75} className="text-neutral-400" />
            {v.location}
          </span>
        </div>

        <div className="flex items-end justify-between mt-auto pt-4 border-t border-neutral-200">
          <div>
            <span className="text-overline text-neutral-400 uppercase block">Preço</span>
            <span className="text-h2 font-bold text-neutral-900 tnum">{brl(v.price)}</span>
          </div>
          {sold ? (
            <button type="button" className="btn btn-primary !py-2 !px-3" disabled>
              Vendido
            </button>
          ) : (
            <Link to={`/veiculos/${v.id}`} className="btn btn-primary !py-2 !px-3">
              Ver
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
