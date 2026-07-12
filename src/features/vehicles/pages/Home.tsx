import { useMemo } from 'react'
import Header from '@/shared/components/Header'
import Footer from '@/shared/components/Footer'
import TopBar from '@/features/vehicles/components/home/TopBar'
import Hero from '@/features/vehicles/components/Hero'
import InventoryGrid from '@/features/vehicles/components/InventoryGrid'
import StatStrip from '@/features/vehicles/components/StatStrip'
import HowItWorks from '@/features/vehicles/components/home/HowItWorks'
import CategoryExplorer from '@/features/vehicles/components/home/CategoryExplorer'
import WhyChoose from '@/features/vehicles/components/home/WhyChoose'
import NewsSection from '@/features/vehicles/components/home/NewsSection'
import CtaBanner from '@/features/vehicles/components/home/CtaBanner'
import { useVehicles } from '@/features/vehicles/context/VehiclesContext'
import { useMarketplaceFilters } from '@/features/vehicles/context/MarketplaceFiltersContext'

export default function Home() {
  const { vehicles: all, loading, error } = useVehicles()
  const { query, brand, year, priceMax, location, chips, sort } = useMarketplaceFilters()

  const vehicles = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = all.filter((v) => v.status !== 'paused')

    if (chips.length > 0) {
      list = list.filter((v) => chips.includes(v.category))
    }

    if (brand) {
      list = list.filter((v) => v.brand.toLowerCase() === brand.toLowerCase())
    }

    if (q) {
      list = list.filter((v) =>
        `${v.brand} ${v.model} ${v.category} ${v.version}`.toLowerCase().includes(q),
      )
    }

    if (year) {
      list = list.filter((v) => String(v.year) === year)
    }

    if (priceMax) {
      const max = Number(priceMax)
      if (max > 0) list = list.filter((v) => v.price <= max)
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
  }, [all, brand, chips, location, priceMax, query, sort, year])

  return (
    <div className="min-h-screen bg-neutral-0">
      <TopBar />
      <Header />
      <main>
        <Hero />
        <InventoryGrid vehicles={vehicles} loading={loading} error={error} />
        <StatStrip />
        <HowItWorks />
        <CategoryExplorer />
        <WhyChoose />
        <NewsSection />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  )
}
