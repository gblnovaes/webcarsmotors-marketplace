import { km } from '@/shared/lib/format'
import type { Vehicle } from '@/features/vehicles/types'

function plateFinal(plate: string) {
  const digits = plate.replace(/\D/g, '')
  return digits.slice(-1) || '—'
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5 border-b border-neutral-100 last:border-0">
      <span className="text-body text-neutral-500">{label}</span>
      <span className="text-label text-neutral-900 font-semibold text-right">{value || '—'}</span>
    </div>
  )
}

export default function VehicleDetailsTable({ vehicle }: { vehicle: Vehicle }) {
  const left = [
    { label: 'Marca', value: vehicle.brand },
    { label: 'Modelo', value: vehicle.model },
    { label: 'Ano', value: String(vehicle.year) },
    { label: 'Versão', value: vehicle.version },
    { label: 'Quilometragem', value: km(vehicle.km) },
    { label: 'Combustível', value: vehicle.fuel },
    { label: 'Câmbio', value: vehicle.transmission },
  ]

  const right = [
    { label: 'Tração', value: vehicle.drivetrain },
    { label: 'Portas', value: String(vehicle.doors) },
    { label: 'Cor', value: vehicle.color },
    { label: 'Potência', value: vehicle.power },
    { label: 'Torque', value: vehicle.torque },
    { label: 'Placa Final', value: plateFinal(vehicle.plate) },
    { label: 'IPVA', value: vehicle.ipva },
  ]

  return (
    <section className="card p-5 sm:p-6">
      <h2 className="text-h2 text-neutral-900 mb-4">Detalhes do Veículo</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1">
        <div>
          {left.map((row) => (
            <DetailRow key={row.label} {...row} />
          ))}
        </div>
        <div>
          {right.map((row) => (
            <DetailRow key={row.label} {...row} />
          ))}
        </div>
      </div>
    </section>
  )
}
