import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

type MarketplaceFilters = {
  query: string
  brand: string
  year: string
  priceMax: string
  location: string
  chips: string[]
  sort: string
  setQuery: (value: string) => void
  setBrand: (value: string) => void
  setYear: (value: string) => void
  setPriceMax: (value: string) => void
  setLocation: (value: string) => void
  toggleChip: (chip: string) => void
  setSort: (value: string) => void
  clearChips: () => void
  setChip: (chip: string | null) => void
}

const MarketplaceFiltersContext = createContext<MarketplaceFilters | null>(null)

export function MarketplaceFiltersProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('')
  const [brand, setBrand] = useState('')
  const [year, setYear] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [location, setLocation] = useState('Todo o Brasil')
  const [chips, setChips] = useState<string[]>([])
  const [sort, setSort] = useState('relevance')

  const value = useMemo<MarketplaceFilters>(
    () => ({
      query,
      brand,
      year,
      priceMax,
      location,
      chips,
      sort,
      setQuery,
      setBrand,
      setYear,
      setPriceMax,
      setLocation,
      setSort,
      toggleChip: (chip) =>
        setChips((current) =>
          current.includes(chip) ? current.filter((item) => item !== chip) : [...current, chip],
        ),
      setChip: (chip) => setChips(chip ? [chip] : []),
      clearChips: () => setChips([]),
    }),
    [query, brand, year, priceMax, location, chips, sort],
  )

  return (
    <MarketplaceFiltersContext.Provider value={value}>
      {children}
    </MarketplaceFiltersContext.Provider>
  )
}

export function useMarketplaceFilters() {
  const ctx = useContext(MarketplaceFiltersContext)
  if (!ctx) throw new Error('useMarketplaceFilters must be used within MarketplaceFiltersProvider')
  return ctx
}
