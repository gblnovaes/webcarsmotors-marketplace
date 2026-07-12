import { Search, Heart, Bell, ChevronDown, Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo'
import { useMarketplaceFilters } from '@/features/vehicles/context/MarketplaceFiltersContext'

const NAV = ['Comprar', 'Vender', 'Leilões', 'Financiamento', 'Sobre']

export default function Header() {
  const navigate = useNavigate()
  const { query, setQuery } = useMarketplaceFilters()

  return (
    <header className="sticky top-0 z-40 bg-neutral-0/90 backdrop-blur border-b border-neutral-200">
      <div className="container-content flex items-center gap-6 h-16">
        <Logo variant="dark" />

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item, i) => (
            <a
              key={item}
              href="#"
              className={`text-label px-3 py-2 rounded-md transition-colors ${
                i === 0
                  ? 'text-primary bg-accent-soft'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex flex-1 max-w-sm ml-auto relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            size={18}
            strokeWidth={1.75}
          />
          <input
            className="input pl-10"
            placeholder="Buscar marca, modelo..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-1 ml-auto md:ml-0">
          <button
            className="grid place-items-center w-11 h-11 rounded-md text-neutral-600 hover:bg-neutral-100"
            aria-label="Favoritos"
          >
            <Heart size={20} strokeWidth={1.75} />
          </button>
          <button
            className="grid place-items-center w-11 h-11 rounded-md text-neutral-600 hover:bg-neutral-100"
            aria-label="Notificações"
          >
            <Bell size={20} strokeWidth={1.75} />
          </button>
          <button onClick={() => navigate('/login')} className="hidden sm:flex btn btn-ghost">
            Entrar
            <ChevronDown size={16} strokeWidth={1.75} />
          </button>
          <button
            className="lg:hidden grid place-items-center w-11 h-11 rounded-md text-neutral-600 hover:bg-neutral-100"
            aria-label="Menu"
          >
            <Menu size={20} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </header>
  )
}
