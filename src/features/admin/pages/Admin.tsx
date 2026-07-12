import { useEffect, useRef, useState } from 'react'
import { Plus, Bell, Search, ChevronDown, Menu, X, LogOut, Car } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useVehicles } from '@/features/vehicles/context/VehiclesContext'
import { useAuth } from '@/features/auth/context/AuthContext'
import VehicleForm from '@/features/admin/components/VehicleForm'
import { StatusPill } from '@/features/admin/components/StatusPill'
import { Pagination } from '@/features/admin/components/Pagination'
import { AdminSidebar } from '@/features/admin/components/AdminSidebar'
import { VehicleRowActions } from '@/features/admin/components/VehicleRowActions'
import { VehicleMobileCard } from '@/features/admin/components/VehicleMobileCard'
import { brl, km } from '@/shared/lib/format'
import type { Vehicle, VehicleInput, VehicleStatus } from '@/features/vehicles/types'

const PAGE_SIZE = 6

export default function Admin() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const { vehicles, addVehicle, updateVehicle, removeVehicle, togglePause } = useVehicles()
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Vehicle | null>(null)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | VehicleStatus>('all')
  const [page, setPage] = useState(1)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches,
  )
  const avatarMenuRef = useRef<HTMLDivElement>(null)

  const userLabel = user?.email?.split('@')[0] || 'Admin'

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const openNew = () => {
    setEditing(null)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openEdit = (v: Vehicle) => {
    setEditing(v)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const closeForm = () => {
    setShowForm(false)
    setEditing(null)
  }

  const handleSubmit = async (data: VehicleInput) => {
    if (editing) await updateVehicle(editing.id, data)
    else await addVehicle(data)
    closeForm()
  }

  const handleDelete = async (v: Vehicle) => {
    if (
      window.confirm(`Excluir "${v.brand} ${v.model}"? Esta ação não pode ser desfeita.`)
    ) {
      await removeVehicle(v.id)
    }
  }

  const handleSignOut = async () => {
    setMobileNavOpen(false)
    setAvatarMenuOpen(false)
    await signOut()
    navigate('/')
  }

  useEffect(() => {
    const lock = mobileNavOpen || (showForm && isMobile)
    if (!lock) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileNavOpen, showForm, isMobile])

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

  const filtered = vehicles.filter((v) => {
    const q = query.toLowerCase()
    const matchQ = `${v.brand} ${v.model}`.toLowerCase().includes(q)
    const matchS = statusFilter === 'all' || v.status === statusFilter
    return matchQ && matchS
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageSafe = Math.min(page, totalPages)
  const start = (pageSafe - 1) * PAGE_SIZE
  const rows = filtered.slice(start, start + PAGE_SIZE)

  const formElement = (
    <VehicleForm
      key={editing?.id ?? 'new'}
      initial={editing}
      onSubmit={handleSubmit}
      onCancel={closeForm}
      hideTitle={isMobile}
    />
  )

  return (
    <div className="min-h-screen bg-neutral-100 flex">
      <aside className="hidden md:flex flex-col w-64 bg-neutral-900 shrink-0 sticky top-0 h-screen">
        <AdminSidebar
          userLabel={userLabel}
          onSignOut={() => void handleSignOut()}
        />
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
              <Link to="/" className="hover:text-neutral-700">
                Admin
              </Link>
              <span className="mx-2 text-neutral-300">/</span>
              <span className="text-neutral-900 font-medium">Veículos</span>
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

        <div className="px-4 sm:px-6 md:px-10 py-6 sm:py-8 space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-h2 sm:text-h1 text-neutral-900">Gerenciar Veículos</h1>
            <button
              type="button"
              onClick={openNew}
              className="btn btn-primary w-full sm:w-auto"
            >
              <Plus size={18} strokeWidth={2} />
              Novo Veículo
            </button>
          </div>

          {showForm && !isMobile && formElement}

          <div className="card rounded-lg overflow-hidden">
            <div className="px-4 sm:px-6 md:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-h3 text-neutral-900">Veículos Cadastrados</h2>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-52">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                    size={16}
                    strokeWidth={1.75}
                  />
                  <input
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value)
                      setPage(1)
                    }}
                    className="bg-neutral-50 border border-neutral-200 rounded-md text-body text-neutral-700 placeholder:text-neutral-400 pl-9 pr-4 h-10 w-full"
                    placeholder="Buscar veículos..."
                  />
                </div>
                <div className="relative w-full sm:w-auto">
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value as 'all' | VehicleStatus)
                      setPage(1)
                    }}
                    className="bg-neutral-50 border border-neutral-200 rounded-md text-label text-neutral-600 pl-3 pr-8 h-10 appearance-none cursor-pointer w-full sm:w-auto"
                  >
                    <option value="all">Status: Todos</option>
                    <option value="available">Disponível</option>
                    <option value="reserved">Reservado</option>
                    <option value="sold">Vendido</option>
                    <option value="paused">Pausado</option>
                  </select>
                  <ChevronDown
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                    size={15}
                    strokeWidth={1.75}
                  />
                </div>
              </div>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden border-t border-neutral-200">
              {rows.map((v) => (
                <VehicleMobileCard
                  key={v.id}
                  vehicle={v}
                  onEdit={openEdit}
                  onTogglePause={(id) => void togglePause(id)}
                  onDelete={(vehicle) => void handleDelete(vehicle)}
                />
              ))}
              {rows.length === 0 && (
                <p className="px-6 py-12 text-center text-neutral-500">
                  Nenhum veículo encontrado.
                </p>
              )}
            </div>

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-t border-neutral-200">
                <thead>
                  <tr className="text-overline uppercase text-neutral-400 bg-neutral-50">
                    <th className="font-semibold px-6 md:px-8 py-3">Foto</th>
                    <th className="font-semibold px-4 py-3">Veículo</th>
                    <th className="font-semibold px-4 py-3">Ano</th>
                    <th className="font-semibold px-4 py-3">Preço</th>
                    <th className="font-semibold px-4 py-3">KM</th>
                    <th className="font-semibold px-4 py-3">Comb.</th>
                    <th className="font-semibold px-4 py-3">Status</th>
                    <th className="font-semibold px-4 py-3 text-right pr-6 md:pr-8">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((v) => (
                    <tr key={v.id} className="border-t border-neutral-100 hover:bg-neutral-50">
                      <td className="px-6 md:px-8 py-4">
                        <img
                          src={v.imageUrl}
                          alt=""
                          className="w-14 h-10 rounded-md object-cover bg-neutral-100"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-body font-semibold text-neutral-900 leading-tight">
                          {v.brand}
                        </div>
                        <div className="text-caption text-neutral-500">{v.model}</div>
                      </td>
                      <td className="px-4 py-4 text-body text-neutral-600 tnum">{v.year}</td>
                      <td className="px-4 py-4 text-body font-bold text-primary tnum whitespace-nowrap">
                        {brl(v.price)}
                      </td>
                      <td className="px-4 py-4 text-body text-neutral-600 tnum whitespace-nowrap">
                        {km(v.km)}
                      </td>
                      <td className="px-4 py-4 text-body text-neutral-600">{v.fuel}</td>
                      <td className="px-4 py-4">
                        <StatusPill status={v.status} />
                      </td>
                      <td className="px-4 py-4 pr-6 md:pr-8">
                        <VehicleRowActions
                          vehicle={v}
                          onEdit={openEdit}
                          onTogglePause={(id) => void togglePause(id)}
                          onDelete={(vehicle) => void handleDelete(vehicle)}
                        />
                      </td>
                    </tr>
                  ))}
                  {rows.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-8 py-12 text-center text-neutral-500">
                        Nenhum veículo encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-4 sm:px-6 md:px-8 py-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-caption text-neutral-500">
                Mostrando{' '}
                <span className="text-neutral-700 font-semibold tnum">
                  {filtered.length === 0 ? 0 : start + 1}-
                  {Math.min(start + PAGE_SIZE, filtered.length)}
                </span>{' '}
                de <span className="text-neutral-700 font-semibold tnum">{filtered.length}</span>{' '}
                veículos
              </p>
              <Pagination page={pageSafe} totalPages={totalPages} onChange={setPage} />
            </div>
          </div>
        </div>
      </div>

      {showForm && isMobile && (
        <div className="fixed inset-0 z-30 flex flex-col bg-neutral-100">
          <div className="flex items-center justify-between gap-3 h-[60px] px-4 bg-neutral-0 border-b border-neutral-200 shrink-0">
            <h2 className="text-h3 text-neutral-900 truncate">
              {editing ? 'Editar Veículo' : 'Novo Veículo'}
            </h2>
            <button
              type="button"
              onClick={closeForm}
              className="grid place-items-center w-11 h-11 rounded-md text-neutral-600 hover:bg-neutral-100"
              aria-label="Fechar formulário"
            >
              <X size={20} strokeWidth={1.75} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">{formElement}</div>
        </div>
      )}
    </div>
  )
}
