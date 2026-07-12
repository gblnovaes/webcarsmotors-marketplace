import { Plus } from 'lucide-react'
import { useMarketplaceFilters } from '@/features/vehicles/context/MarketplaceFiltersContext'

const CATS = [
  {
    label: 'Sedan',
    chip: 'Sedã',
    image:
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80&auto=format&fit=crop',
  },
  {
    label: 'SUV',
    chip: 'SUV',
    image:
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80&auto=format&fit=crop',
  },
  {
    label: 'Hatchback',
    chip: 'Hatch',
    image:
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80&auto=format&fit=crop',
  },
  {
    label: 'Picape',
    chip: 'Picape',
    image:
      'https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?w=600&q=80&auto=format&fit=crop',
  },
  {
    label: 'Esportivo',
    chip: 'Esportivo',
    image:
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80&auto=format&fit=crop',
  },
  {
    label: 'Luxo',
    chip: 'SUV',
    image:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80&auto=format&fit=crop',
  },
]

export default function CategoryExplorer() {
  const { setChip } = useMarketplaceFilters()

  const onSelect = (chip: string) => {
    setChip(chip)
    document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="bg-neutral-0 py-14 md:py-20">
      <div className="container-content">
        <h2 className="text-h1 text-neutral-900 text-center mb-10">Explore por Categoria</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATS.map((cat) => (
            <button
              key={cat.label}
              type="button"
              onClick={() => onSelect(cat.chip)}
              className="relative aspect-[3/4] rounded-lg overflow-hidden group text-left"
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 flex items-end justify-between">
                <span className="text-label font-semibold text-neutral-0">{cat.label}</span>
                <span className="grid place-items-center w-7 h-7 rounded-full bg-neutral-0/20 text-neutral-0 backdrop-blur">
                  <Plus size={14} strokeWidth={2.5} />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
