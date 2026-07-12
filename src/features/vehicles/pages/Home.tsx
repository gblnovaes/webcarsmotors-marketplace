import { useMemo } from 'react'
import Header from '@/shared/components/Header'
import Footer from '@/shared/components/Footer'
import Hero from '@/features/vehicles/components/Hero'
import StatStrip from '@/features/vehicles/components/StatStrip'
import FilterBar from '@/features/vehicles/components/FilterBar'
import InventoryGrid from '@/features/vehicles/components/InventoryGrid'
import { useVehicles } from '@/features/vehicles/context/VehiclesContext'
import { useMarketplaceFilters } from '@/features/vehicles/context/MarketplaceFiltersContext'

export default function Home() {
  const { vehicles: all, loading, error } = useVehicles()
  const { query, location, chips, sort, toggleChip, setSort } = useMarketplaceFilters()

  const vehicles = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = all.filter((v) => v.status !== 'paused')

    if (chips.length > 0) {
      list = list.filter((v) => chips.includes(v.category))
    }

    if (q) {
      list = list.filter((v) =>
        `${v.brand} ${v.model} ${v.category}`.toLowerCase().includes(q),
      )
    }

    if (location !== 'Todo o Brasil') {
      list = list.filter((v) => v.location.toLowerCase().includes(location.toLowerCase()))
    }

    const sorted = [...list]
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'km-asc':
        sorted.sort((a, b) => a.km - b.km)
        break
      case 'year-desc':
        sorted.sort((a, b) => b.year - a.year)
        break
      default:
        break
    }
    return sorted
  }, [all, chips, location, query, sort])

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main>
        <Hero />
        <StatStrip />
        <FilterBar
          activeChips={chips}
          onToggleChip={toggleChip}
          sort={sort}
          onSort={setSort}
          count={vehicles.length}
        />
        {loading ? (
          <div className="container-content py-12 text-neutral-500">Carregando veículos...</div>
        ) : error ? (
          <div className="container-content py-12 text-error">{error}</div>
        ) : (
          <InventoryGrid vehicles={vehicles} />
        )}
      </main>
      <Footer />
    </div>
  )
}
