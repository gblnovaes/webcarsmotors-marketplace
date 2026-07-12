import { useState } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { brands } from '@/features/vehicles/schema'
import { useMarketplaceFilters } from '@/features/vehicles/context/MarketplaceFiltersContext'

const LOCATIONS = ['Todo o Brasil', 'São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Curitiba', 'Porto Alegre']
const YEARS = ['', '2024', '2023', '2022', '2021', '2020']
const PRICES = [
  { label: 'Preço', value: '' },
  { label: 'Até R$ 100 mil', value: '100000' },
  { label: 'Até R$ 200 mil', value: '200000' },
  { label: 'Até R$ 300 mil', value: '300000' },
  { label: 'Até R$ 500 mil', value: '500000' },
]

const selectClass =
  'w-full h-12 rounded-md border border-neutral-200 bg-neutral-50 text-body text-neutral-700 px-3 appearance-none cursor-pointer'

export default function Hero() {
  const {
    brand,
    setBrand,
    query,
    setQuery,
    year,
    setYear,
    priceMax,
    setPriceMax,
    location,
    setLocation,
  } = useMarketplaceFilters()

  const [modelDraft, setModelDraft] = useState(query)

  const scrollToInventory = () => {
    document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' })
  }

  const onSearch = () => {
    setQuery(modelDraft.trim())
    scrollToInventory()
  }

  return (
    <section className="relative min-h-[560px] md:min-h-[640px] bg-neutral-900 overflow-hidden flex flex-col justify-end">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, rgba(15,20,25,.92) 0%, rgba(15,20,25,.55) 45%, rgba(15,20,25,.35) 100%), url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1800&q=80&auto=format&fit=crop) center/cover',
        }}
      />

      <div className="container-content relative pt-16 md:pt-24 pb-28 md:pb-32">
        <span className="inline-block text-overline uppercase text-primary bg-accent-soft/90 px-3 py-1.5 rounded-sm mb-4">
          O melhor lugar para comprar
        </span>
        <h1 className="text-display text-neutral-0 max-w-2xl">
          Descubra o Veículo dos Seus Sonhos
        </h1>
        <p className="text-body-l text-neutral-300 mt-4 max-w-xl">
          Mais de 15.000 veículos novos e seminovos com as melhores condições de mercado do Brasil.
        </p>

        <div className="flex flex-wrap gap-3 mt-8">
          <button type="button" className="btn btn-primary" onClick={scrollToInventory}>
            Explorar Estoque
          </button>
          <a
            href="#cta"
            className="btn border border-neutral-0/30 bg-neutral-900/40 text-neutral-0 hover:bg-neutral-900/70 backdrop-blur"
          >
            Anunciar Meu Veículo
          </a>
        </div>
      </div>

      <div className="relative container-content pb-8 -mt-16 md:-mt-20 z-10">
        <div className="card rounded-lg shadow-lg p-4 md:p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            <div className="relative">
              <select
                className={selectClass}
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                aria-label="Marca"
              >
                <option value="">Marca</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                size={16}
              />
            </div>

            <input
              className={`${selectClass} !appearance-auto`}
              placeholder="Modelo"
              value={modelDraft}
              onChange={(e) => setModelDraft(e.target.value)}
              aria-label="Modelo"
            />

            <div className="relative">
              <select
                className={selectClass}
                value={year}
                onChange={(e) => setYear(e.target.value)}
                aria-label="Ano"
              >
                <option value="">Ano</option>
                {YEARS.filter(Boolean).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                size={16}
              />
            </div>

            <div className="relative">
              <select
                className={selectClass}
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                aria-label="Preço"
              >
                {PRICES.map((p) => (
                  <option key={p.label} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                size={16}
              />
            </div>

            <div className="relative">
              <select
                className={selectClass}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                aria-label="Localização"
              >
                {LOCATIONS.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                size={16}
              />
            </div>

            <button type="button" className="btn btn-primary w-full h-12" onClick={onSearch}>
              <Search size={18} strokeWidth={1.75} />
              Buscar
            </button>
          </div>
          <button
            type="button"
            onClick={scrollToInventory}
            className="text-label text-primary hover:underline mt-3"
          >
            Busca avançada
          </button>
        </div>
      </div>
    </section>
  )
}
