import {
  Calendar,
  Gauge,
  Fuel,
  Settings2,
  Car,
  Palette,
  Share2,
} from 'lucide-react'
import { brl, installment, km } from '@/shared/lib/format'
import { STATUS_META } from '@/features/vehicles/schema'
import type { Vehicle } from '@/features/vehicles/types'

function StatusBadge({ status }: { status: Vehicle['status'] }) {
  const meta = STATUS_META[status] ?? STATUS_META.available
  if (status === 'sold') {
    return (
      <span className="badge" style={{ background: '#FBECEC', color: '#DC2626' }}>
        {meta.label}
      </span>
    )
  }
  return <span className={meta.badgeClass}>{meta.label}</span>
}

type Props = {
  vehicle: Vehicle
  onContact: () => void
  onTestDrive: () => void
}

export default function VehicleSummary({ vehicle, onContact, onTestDrive }: Props) {
  const title = `${vehicle.brand} ${vehicle.model}`
  const sold = vehicle.status === 'sold'

  const share = async () => {
    const url = window.location.href
    const data = { title, text: `${title} — ${brl(vehicle.price)}`, url }
    try {
      if (navigator.share) {
        await navigator.share(data)
        return
      }
      await navigator.clipboard.writeText(url)
      alert('Link copiado para a área de transferência.')
    } catch {
      /* user cancelled share */
    }
  }

  const specs = [
    { icon: Calendar, label: 'Ano', value: String(vehicle.year) },
    { icon: Gauge, label: 'Km', value: km(vehicle.km).replace(' km', '') },
    { icon: Fuel, label: 'Combustível', value: vehicle.fuel },
    { icon: Settings2, label: 'Câmbio', value: vehicle.transmission },
    { icon: Car, label: 'Portas', value: String(vehicle.doors) },
    { icon: Palette, label: 'Cor', value: vehicle.color },
  ]

  return (
    <div className="card p-5 sm:p-6 flex flex-col gap-5 h-full">
      <div>
        <StatusBadge status={vehicle.status} />
        <h1 className="text-h1 text-neutral-900 mt-3">{title}</h1>
        <p className="text-body text-neutral-500 mt-1">
          {vehicle.year} · {km(vehicle.km)} · {vehicle.location}
        </p>
      </div>

      <div>
        <p className="text-h1 font-bold text-primary tnum">{brl(vehicle.price)}</p>
        <p className="text-caption text-neutral-500 mt-1">
          ou 60x de {installment(vehicle.price)}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-4 border-y border-neutral-200">
        {specs.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-2.5">
            <Icon size={18} strokeWidth={1.75} className="text-primary mt-0.5 shrink-0" />
            <div>
              <span className="text-overline text-neutral-400 uppercase block">{label}</span>
              <span className="text-label text-neutral-800 font-medium">{value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 mt-auto">
        <button
          type="button"
          className="btn btn-primary w-full"
          disabled={sold}
          onClick={onContact}
        >
          Entrar em Contato
        </button>
        <button
          type="button"
          className="btn w-full border border-primary text-primary bg-neutral-0 hover:bg-accent-soft"
          disabled={sold}
          onClick={onTestDrive}
        >
          Agendar Test Drive
        </button>
        <button
          type="button"
          onClick={() => void share()}
          className="inline-flex items-center justify-center gap-2 text-label text-primary hover:underline py-2"
        >
          <Share2 size={16} strokeWidth={1.75} />
          Compartilhar este anúncio
        </button>
      </div>
    </div>
  )
}
