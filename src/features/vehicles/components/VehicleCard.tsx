import { Link } from 'react-router-dom'
import { Heart, Gauge, Fuel, Settings2, MapPin } from 'lucide-react'
import { brl, km } from '@/shared/lib/format'
import type { Vehicle } from '@/features/vehicles/types'

export default function VehicleCard({ v }: { v: Vehicle }) {
  const sold = v.status === 'sold'
  const title = `${v.brand} ${v.model}`

  return (
    <article
      className={`bg-neutral-0 rounded-lg overflow-hidden shadow-sm border border-neutral-200 group flex flex-col transition-shadow hover:shadow-md ${
        sold ? 'opacity-70' : ''
      }`}
    >
      <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden">
        <img
          src={v.imageUrl}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <button
          type="button"
          className="absolute top-3 right-3 grid place-items-center w-9 h-9 rounded-pill bg-neutral-0/90 backdrop-blur text-neutral-500 hover:text-error shadow-sm"
          aria-label="Favoritar"
        >
          <Heart size={16} strokeWidth={1.75} />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-h3 text-neutral-900 truncate">{title}</h3>
        <p className="text-caption text-neutral-500 mt-0.5">
          {v.year} · {v.version || v.category}
        </p>

        <p className="text-h2 font-bold text-primary tnum mt-3">{brl(v.price)}</p>

        <div className="grid grid-cols-2 gap-y-2 gap-x-2 mt-4 pt-3 border-t border-neutral-100 text-caption text-neutral-500">
          <span className="flex items-center gap-1.5 truncate">
            <MapPin size={13} strokeWidth={1.75} className="text-primary shrink-0" />
            {v.location}
          </span>
          <span className="flex items-center gap-1.5 truncate">
            <Fuel size={13} strokeWidth={1.75} className="text-primary shrink-0" />
            {v.fuel}
          </span>
          <span className="flex items-center gap-1.5 truncate">
            <Settings2 size={13} strokeWidth={1.75} className="text-primary shrink-0" />
            {v.transmission}
          </span>
          <span className="flex items-center gap-1.5 truncate">
            <Gauge size={13} strokeWidth={1.75} className="text-primary shrink-0" />
            {km(v.km)}
          </span>
        </div>

        {!sold && (
          <Link
            to={`/veiculos/${v.id}`}
            className="mt-4 text-label text-primary font-semibold hover:underline self-start"
          >
            Ver detalhes →
          </Link>
        )}
        {sold && (
          <span className="mt-4 text-label text-error font-semibold">Vendido</span>
        )}
      </div>
    </article>
  )
}
