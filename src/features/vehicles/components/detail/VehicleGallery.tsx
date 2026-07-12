import { useState } from 'react'
import type { Vehicle } from '@/features/vehicles/types'

export default function VehicleGallery({ vehicle }: { vehicle: Vehicle }) {
  const images =
    vehicle.images.length > 0
      ? vehicle.images
      : vehicle.imageUrl
        ? [vehicle.imageUrl]
        : []
  const [active, setActive] = useState(0)
  const title = `${vehicle.brand} ${vehicle.model}`
  const current = images[active] ?? images[0]

  if (!current) {
    return (
      <div className="aspect-[4/3] rounded-lg bg-neutral-100 grid place-items-center text-neutral-400">
        Sem imagem
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-neutral-100">
        <img
          src={current}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {images.slice(0, 4).map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={`aspect-[4/3] rounded-md overflow-hidden border-2 transition-colors ${
                i === active ? 'border-primary' : 'border-transparent hover:border-neutral-300'
              }`}
              aria-label={`Foto ${i + 1}`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
