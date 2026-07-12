import type { Vehicle } from '@/features/vehicles/types'

export default function VehicleDescription({ vehicle }: { vehicle: Vehicle }) {
  if (!vehicle.description.trim()) return null

  return (
    <section className="card p-5 sm:p-6">
      <h2 className="text-h2 text-neutral-900 mb-3">Descrição do Vendedor</h2>
      <p className="text-body text-neutral-600 leading-relaxed whitespace-pre-line">
        {vehicle.description}
      </p>
    </section>
  )
}
