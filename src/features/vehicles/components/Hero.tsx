import { Search, MapPin, ChevronDown } from 'lucide-react'
import { useMarketplaceFilters } from '@/features/vehicles/context/MarketplaceFiltersContext'

const LOCATIONS = ['Todo o Brasil', 'São Paulo', 'Rio de Janeiro', 'Minas Gerais']

export default function Hero() {
  const { query, setQuery, location, setLocation } = useMarketplaceFilters()

  const scrollToInventory = () => {
    document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative bg-neutral-900 overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'linear-gradient(180deg, rgba(15,20,25,0) 0%, rgba(15,20,25,.7) 100%), url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80&auto=format&fit=crop) center/cover',
        }}
      />
      <div className="container-content relative py-16 md:py-24">
        <span className="badge badge-accent mb-4">Marketplace + Leilões</span>
        <h1 className="text-display text-neutral-0 max-w-2xl">
          Encontre o carro certo, com transparência total.
        </h1>
        <p className="text-body-l text-neutral-300 mt-4 max-w-xl">
          Mais de 12.000 veículos verificados, laudo cautelar e financiamento aprovado em minutos.
        </p>

        <div className="card rounded-lg shadow-lg mt-8 p-3 flex flex-col md:flex-row gap-2 max-w-3xl">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              size={18}
              strokeWidth={1.75}
            />
            <input
              className="input pl-10 border-transparent bg-neutral-50"
              placeholder="Marca ou modelo"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="md:w-52 relative">
            <MapPin
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              size={18}
              strokeWidth={1.75}
            />
            <select
              className="input pl-10 pr-8 border-transparent bg-neutral-50 appearance-none cursor-pointer"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              {LOCATIONS.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
              size={16}
              strokeWidth={1.75}
            />
          </div>
          <button type="button" className="btn btn-primary md:w-auto" onClick={scrollToInventory}>
            <Search size={18} strokeWidth={1.75} />
            Buscar
          </button>
        </div>
      </div>
    </section>
  )
}
