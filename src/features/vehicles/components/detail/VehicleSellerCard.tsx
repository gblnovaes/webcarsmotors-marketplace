import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Star } from 'lucide-react'
import type { Vehicle } from '@/features/vehicles/types'

export default function VehicleSellerCard({ vehicle }: { vehicle: Vehicle }) {
  const { seller } = vehicle
  const [showPhone, setShowPhone] = useState(false)
  const initial = seller.name.charAt(0).toUpperCase()

  return (
    <section className="card p-5 sm:p-6">
      <h2 className="text-h2 text-neutral-900 mb-4">Sobre o Vendedor</h2>
      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="w-14 h-14 rounded-full bg-accent-soft text-primary grid place-items-center text-h2 font-bold shrink-0">
            {initial}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-h3 text-neutral-900 truncate">{seller.name}</h3>
              <span className="inline-flex items-center gap-1 text-caption text-neutral-600">
                <Star size={14} className="text-warning fill-current" strokeWidth={0} />
                <span className="tnum font-semibold">{seller.rating.toFixed(1)}</span>
              </span>
            </div>
            <p className="flex items-center gap-1.5 text-caption text-neutral-500 mt-1">
              <MapPin size={14} strokeWidth={1.75} className="shrink-0" />
              {seller.location}
            </p>
            <Link
              to="/"
              className="inline-block text-label text-primary hover:underline mt-2"
            >
              Ver estoque completo
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
          <a
            href={`mailto:?subject=${encodeURIComponent(`Interesse: ${vehicle.brand} ${vehicle.model}`)}&body=${encodeURIComponent(`Olá, tenho interesse no ${vehicle.brand} ${vehicle.model}.`)}`}
            className="btn btn-ghost w-full sm:w-auto"
          >
            Enviar Mensagem
          </a>
          {showPhone ? (
            <a href={`tel:${seller.phone.replace(/\D/g, '')}`} className="btn btn-primary w-full sm:w-auto tnum">
              {seller.phone}
            </a>
          ) : (
            <button
              type="button"
              className="btn btn-primary w-full sm:w-auto"
              onClick={() => setShowPhone(true)}
            >
              Ver Telefone
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
