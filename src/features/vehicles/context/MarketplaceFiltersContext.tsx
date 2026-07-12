import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

type MarketplaceFilters = {
  query: string
  location: string
  chips: string[]
  sort: string
  setQuery: (value: string) => void
  setLocation: (value: string) => void
  toggleChip: (chip: string) => void
  setSort: (value: string) => void
  clearChips: () => void
}

const MarketplaceFiltersContext = createContext<MarketplaceFilters | null>(null)

export function MarketplaceFiltersProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('Todo o Brasil')
  const [chips, setChips] = useState<string[]>([])
  const [sort, setSort] = useState('relevance')

  const value = useMemo<MarketplaceFilters>(
    () => ({
      query,
      location,
      chips,
      sort,
      setQuery,
      setLocation,
      setSort,
      toggleChip: (chip) =>
        setChips((current) =>
          current.includes(chip) ? current.filter((item) => item !== chip) : [...current, chip],
        ),
      clearChips: () => setChips([]),
    }),
    [query, location, chips, sort],
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
