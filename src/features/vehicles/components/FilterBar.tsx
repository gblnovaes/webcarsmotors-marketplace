import { SlidersHorizontal, ChevronDown } from 'lucide-react'
import { bodyTypes } from '@/features/vehicles/schema'

type FilterBarProps = {
  activeChips: string[]
  onToggleChip: (chip: string) => void
  sort: string
  onSort: (value: string) => void
  count: number
}

export default function FilterBar({
  activeChips,
  onToggleChip,
  sort,
  onSort,
  count,
}: FilterBarProps) {
  return (
    <div className="sticky top-16 z-30 bg-neutral-50/95 backdrop-blur border-b border-neutral-200">
      <div className="container-content py-4">
        <div className="flex items-center gap-3 overflow-x-auto pb-1 -mb-1">
          <button type="button" className="pill shrink-0 border-neutral-300 font-medium">
            <SlidersHorizontal size={15} strokeWidth={1.75} />
            Filtros
          </button>
          <span className="w-px h-6 bg-neutral-200 shrink-0" />
          {bodyTypes.map((t) => {
            const active = activeChips.includes(t)
            return (
              <button
                key={t}
                type="button"
                onClick={() => onToggleChip(t)}
                className={`pill shrink-0 ${active ? 'pill-active' : ''}`}
              >
                {t}
              </button>
            )
          })}
        </div>

        <div className="flex items-center justify-between mt-3">
          <p className="text-caption text-neutral-500">
            <span className="text-neutral-700 font-semibold tnum">{count}</span> veículos
            encontrados
          </p>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => onSort(e.target.value)}
              className="text-label text-neutral-600 bg-neutral-0 border border-neutral-200 rounded-sm pl-3 pr-8 h-9 appearance-none cursor-pointer"
            >
              <option value="relevance">Mais relevantes</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
              <option value="km-asc">Menor km</option>
              <option value="year-desc">Mais novos</option>
            </select>
            <ChevronDown
              className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
              size={15}
              strokeWidth={1.75}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
