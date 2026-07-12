import VehicleCard from './VehicleCard'
import type { Vehicle } from '@/features/vehicles/types'

export default function InventoryGrid({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <section id="inventory" className="container-content py-12 scroll-mt-28">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="text-h2 text-neutral-900">Estoque em destaque</h2>
      </div>

      {vehicles.length === 0 ? (
        <div className="card p-12 text-center text-neutral-500">
          Nenhum veículo corresponde aos filtros selecionados.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((v) => (
            <VehicleCard key={v.id} v={v} />
          ))}
        </div>
      )}
    </section>
  )
}
