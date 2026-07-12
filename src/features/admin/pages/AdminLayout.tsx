import { useEffect, useRef, useState } from 'react'
import { Bell, Menu, LogOut, Car } from 'lucide-react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/context/AuthContext'
import { AdminSidebar } from '@/features/admin/components/AdminSidebar'

function breadcrumbLabel(pathname: string): string {
  if (pathname.startsWith('/admin/clientes')) return 'Clientes'
  return 'Veículos'
}

export default function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, signOut } = useAuth()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false)
  const avatarMenuRef = useRef<HTMLDivElement>(null)

  const userLabel = user?.email?.split('@')[0] || 'Admin'
  const sectionLabel = breadcrumbLabel(location.pathname)

  const handleSignOut = async () => {
    setMobileNavOpen(false)
    setAvatarMenuOpen(false)
    await signOut()
    navigate('/')
  }

  useEffect(() => {
    if (!mobileNavOpen) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileNavOpen])

  useEffect(() => {
    if (!mobileNavOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileNavOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [mobileNavOpen])

  useEffect(() => {
    if (!avatarMenuOpen) return
    const onPointer = (e: MouseEvent) => {
      if (!avatarMenuRef.current?.contains(e.target as Node)) {
        setAvatarMenuOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAvatarMenuOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [avatarMenuOpen])

  return (
    <div className="min-h-screen bg-neutral-100 flex">
      <aside className="hidden md:flex flex-col w-64 bg-neutral-900 shrink-0 sticky top-0 h-screen">
        <AdminSidebar userLabel={userLabel} onSignOut={() => void handleSignOut()} />
      </aside>

      {mobileNavOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <button
            type="button"
            className="absolute inset-0 bg-neutral-900/50"
            aria-label="Fechar menu"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="relative flex flex-col w-64 max-w-[85vw] h-full bg-neutral-900 shadow-lg">
            <AdminSidebar
              userLabel={userLabel}
              onSignOut={() => void handleSignOut()}
              onNavigate={() => setMobileNavOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="bg-neutral-0 border-b border-neutral-200 h-[76px] px-4 sm:px-6 md:px-10 flex items-center justify-between sticky top-0 z-20 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              className="md:hidden grid place-items-center w-11 h-11 rounded-md text-neutral-600 hover:bg-neutral-100 shrink-0"
              aria-label="Abrir menu"
              onClick={() => setMobileNavOpen(true)}
            >
              <Menu size={20} strokeWidth={1.75} />
            </button>
            <Link
              to="/"
              className="md:hidden flex items-center gap-2 shrink-0"
              aria-label="WebcarsMotors"
            >
              <span className="grid place-items-center w-8 h-8 rounded-lg bg-primary text-neutral-0">
                <Car size={16} strokeWidth={2} />
              </span>
            </Link>
            <div className="text-body text-neutral-500 truncate min-w-0">
              <Link to="/admin" className="hover:text-neutral-700">
                Admin
              </Link>
              <span className="mx-2 text-neutral-300">/</span>
              <span className="text-neutral-900 font-medium">{sectionLabel}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              type="button"
              className="grid place-items-center w-11 h-11 rounded-md text-neutral-500 hover:bg-neutral-100"
              aria-label="Notificações"
            >
              <Bell size={20} strokeWidth={1.75} />
            </button>
            <div className="relative" ref={avatarMenuRef}>
              <button
                type="button"
                onClick={() => setAvatarMenuOpen((o) => !o)}
                className="rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                aria-label="Menu do usuário"
                aria-expanded={avatarMenuOpen}
              >
                <img
                  src="https://i.pravatar.cc/80?img=13"
                  alt=""
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-neutral-100"
                />
              </button>
              {avatarMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 rounded-md border border-neutral-200 bg-neutral-0 shadow-md py-1 z-30">
                  <button
                    type="button"
                    onClick={() => void handleSignOut()}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-label text-neutral-700 hover:bg-neutral-100"
                  >
                    <LogOut size={16} strokeWidth={1.75} />
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <Outlet />
      </div>
    </div>
  )
}
