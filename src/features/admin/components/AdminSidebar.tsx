import { LayoutGrid, Car, Users, Wallet, Settings, LogOut } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

const NAV = [
  { icon: LayoutGrid, label: 'Dashboard' },
  { icon: Car, label: 'Veículos', to: '/admin' },
  { icon: Users, label: 'Clientes', to: '/admin/clientes' },
  { icon: Wallet, label: 'Financeiro' },
  { icon: Settings, label: 'Configurações' },
] as const

type AdminSidebarProps = {
  userLabel: string
  onSignOut: () => void
  onNavigate?: () => void
}

export function AdminSidebar({ userLabel, onSignOut, onNavigate }: AdminSidebarProps) {
  return (
    <>
      <Link
        to="/"
        onClick={onNavigate}
        className="flex items-center gap-3 px-6 h-[76px] shrink-0"
      >
        <span className="grid place-items-center w-9 h-9 rounded-lg bg-primary text-neutral-0">
          <Car size={20} strokeWidth={2} />
        </span>
        <span className="text-h3 font-bold text-neutral-0">WebcarsMotors</span>
      </Link>

      <nav className="px-4 py-2 space-y-1 flex-1">
        {NAV.map((item) => {
          const Icon = item.icon
          if ('to' in item && item.to) {
            return (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === '/admin'}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-md text-label transition-colors ${
                    isActive
                      ? 'bg-primary text-neutral-0'
                      : 'text-neutral-400 hover:text-neutral-0 hover:bg-neutral-800'
                  }`
                }
              >
                <Icon size={18} strokeWidth={1.75} />
                {item.label}
              </NavLink>
            )
          }

          return (
            <a
              key={item.label}
              href="#"
              onClick={(e) => {
                e.preventDefault()
                onNavigate?.()
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-md text-label transition-colors text-neutral-400 hover:text-neutral-0 hover:bg-neutral-800"
            >
              <Icon size={18} strokeWidth={1.75} />
              {item.label}
            </a>
          )
        })}
      </nav>

      <div className="border-t border-neutral-800 p-4">
        <div className="flex items-center gap-3 px-2 py-2">
          <img
            src="https://i.pravatar.cc/80?img=13"
            alt=""
            className="w-9 h-9 rounded-full object-cover"
          />
          <div className="min-w-0">
            <div className="text-label text-neutral-0 truncate">{userLabel}</div>
            <div className="text-caption text-neutral-500 truncate">WebcarsMotors</div>
          </div>
        </div>
        <button
          type="button"
          onClick={onSignOut}
          className="flex w-full items-center gap-3 px-4 py-2.5 mt-1 rounded-md text-label text-neutral-400 hover:text-neutral-0 hover:bg-neutral-800"
        >
          <LogOut size={18} strokeWidth={1.75} />
          Sair
        </button>
      </div>
    </>
  )
}
