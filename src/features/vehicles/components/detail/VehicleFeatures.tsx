import { Check } from 'lucide-react'
import type { Vehicle } from '@/features/vehicles/types'

export default function VehicleFeatures({ vehicle }: { vehicle: Vehicle }) {
  if (!vehicle.features.length) return null

  return (
    <section className="card p-5 sm:p-6">
      <h2 className="text-h2 text-neutral-900 mb-4">Equipamentos e Opcionais</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
        {vehicle.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-body text-neutral-700">
            <span className="mt-0.5 grid place-items-center w-5 h-5 rounded-full bg-[#EAF6EE] shrink-0">
              <Check size={12} strokeWidth={2.5} className="text-success" />
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </section>
  )
}
