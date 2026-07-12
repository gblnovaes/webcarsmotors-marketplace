import VehicleCard from './VehicleCard'
import type { Vehicle } from '@/features/vehicles/types'
import { useMarketplaceFilters } from '@/features/vehicles/context/MarketplaceFiltersContext'

const TABS = [
  { label: 'Todos', value: null as string | null },
  { label: 'Sedans', value: 'Sedã' },
  { label: 'SUVs', value: 'SUV' },
  { label: 'Pick-ups', value: 'Picape' },
  { label: 'Elétricos', value: 'Elétrico' },
]

type Props = {
  vehicles: Vehicle[]
  loading?: boolean
  error?: string | null
}

export default function InventoryGrid({ vehicles, loading, error }: Props) {
  const { chips, setChip, clearChips } = useMarketplaceFilters()
  const active = chips[0] ?? null

  const scrollTop = () => {
    document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="inventory" className="bg-neutral-0 py-14 md:py-16 scroll-mt-20">
      <div className="container-content">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-h1 text-neutral-900 relative inline-block pb-2">
              Veículos em Destaque
              <span className="absolute left-0 bottom-0 w-12 h-1 bg-primary rounded-pill" />
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {TABS.map((tab) => {
              const isActive = tab.value === null ? active === null : active === tab.value
              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => {
                    if (tab.value === null) clearChips()
                    else setChip(tab.value)
                  }}
                  className={`text-label px-3 py-1.5 rounded-md transition-colors ${
                    isActive
                      ? 'text-primary font-semibold bg-accent-soft'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {loading ? (
          <p className="text-body text-neutral-500 py-12 text-center">Carregando veículos...</p>
        ) : error ? (
          <p className="text-body text-error py-12 text-center">{error}</p>
        ) : vehicles.length === 0 ? (
          <div className="rounded-lg border border-neutral-200 p-12 text-center text-neutral-500">
            Nenhum veículo corresponde aos filtros selecionados.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicles.map((v) => (
              <VehicleCard key={v.id} v={v} />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-10">
          <button
            type="button"
            onClick={scrollTop}
            className="btn btn-ghost border-neutral-300 px-8"
          >
            Ver Todo o Estoque
          </button>
        </div>
      </div>
    </section>
  )
}
