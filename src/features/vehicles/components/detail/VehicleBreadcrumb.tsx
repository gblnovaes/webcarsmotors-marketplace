import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import type { Vehicle } from '@/features/vehicles/types'

export default function VehicleBreadcrumb({ vehicle }: { vehicle: Vehicle }) {
  const title = `${vehicle.brand} ${vehicle.model}`

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-caption text-neutral-500">
      <Link to="/" className="hover:text-primary transition-colors">
        Início
      </Link>
      <ChevronRight size={14} strokeWidth={1.75} className="text-neutral-300 shrink-0" />
      <Link to="/" className="hover:text-primary transition-colors">
        Estoque
      </Link>
      <ChevronRight size={14} strokeWidth={1.75} className="text-neutral-300 shrink-0" />
      <span className="text-neutral-600">{vehicle.category}</span>
      <ChevronRight size={14} strokeWidth={1.75} className="text-neutral-300 shrink-0" />
      <span className="text-neutral-900 font-medium truncate">{title}</span>
    </nav>
  )
}
