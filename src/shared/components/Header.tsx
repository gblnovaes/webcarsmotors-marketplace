import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'

const NAV = [
  { label: 'Início', href: '/' },
  { label: 'Comprar', href: '/#inventory' },
  { label: 'Vender', href: '/#cta' },
  { label: 'Serviços', href: '/#como-funciona' },
  { label: 'Financiamento', href: '/#por-que' },
  { label: 'Novidades', href: '/#novidades' },
  { label: 'Contato', href: '/#footer' },
]

export default function Header() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-neutral-900/95 backdrop-blur border-b border-neutral-800">
      <div className="container-content flex items-center gap-4 h-16">
        <Logo variant="light" />

        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {NAV.map((item) => {
            const active =
              (item.href === '/' && pathname === '/') ||
              (item.href !== '/' && pathname === '/' && false)
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`text-label px-3 py-2 rounded-md transition-colors ${
                  active
                    ? 'text-neutral-0'
                    : 'text-neutral-300 hover:text-neutral-0 hover:bg-neutral-800'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 ml-auto lg:ml-0">
          <a href="/#cta" className="hidden sm:inline-flex btn btn-primary !py-2.5 !px-4">
            Quero vender meu carro
          </a>
          <button
            type="button"
            className="lg:hidden grid place-items-center w-11 h-11 rounded-md text-neutral-300 hover:bg-neutral-800 hover:text-neutral-0"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-neutral-800 bg-neutral-900">
          <nav className="container-content py-3 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setOpen(false)}
                className="text-label text-neutral-300 hover:text-neutral-0 px-3 py-2.5 rounded-md hover:bg-neutral-800"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="/#cta"
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-2 w-full"
            >
              Quero vender meu carro
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
