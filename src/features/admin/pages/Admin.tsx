import { useState } from 'react'
import {
  LayoutGrid,
  Car,
  Users,
  Wallet,
  Settings,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Pause,
  Play,
  Bell,
  Search,
  ChevronDown,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useVehicles } from '@/features/vehicles/context/VehiclesContext'
import { useAuth } from '@/features/auth/context/AuthContext'
import VehicleForm from '@/features/admin/components/VehicleForm'
import { StatusPill } from '@/features/admin/components/StatusPill'
import { Pagination } from '@/features/admin/components/Pagination'
import { brl, km } from '@/shared/lib/format'
import type { Vehicle, VehicleInput, VehicleStatus } from '@/features/vehicles/types'

const NAV = [
  { icon: LayoutGrid, label: 'Dashboard' },
  { icon: Car, label: 'Veículos', active: true },
  { icon: Users, label: 'Clientes' },
  { icon: Wallet, label: 'Financeiro' },
  { icon: Settings, label: 'Configurações' },
]

const PAGE_SIZE = 6

export default function Admin() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const { vehicles, addVehicle, updateVehicle, removeVehicle, togglePause } = useVehicles()
  const [showForm, setShowForm] = useState(true)
  const [editing, setEditing] = useState<Vehicle | null>(null)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | VehicleStatus>('all')
  const [page, setPage] = useState(1)

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
    await signOut()
    navigate('/')
  }

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

  return (
    <div className="min-h-screen bg-neutral-100 flex">
      <aside className="hidden md:flex flex-col w-64 bg-neutral-900 shrink-0 sticky top-0 h-screen">
        <Link to="/" className="flex items-center gap-3 px-6 h-[76px] shrink-0">
          <span className="grid place-items-center w-9 h-9 rounded-lg bg-primary text-neutral-0">
            <Car size={20} strokeWidth={2} />
          </span>
          <span className="text-h3 font-bold text-neutral-0">WebcarsMotors</span>
        </Link>

        <nav className="px-4 py-2 space-y-1 flex-1">
          {NAV.map(({ icon: Icon, label, active }) => (
            <a
              key={label}
              href="#"
              className={`flex items-center gap-3 px-4 py-3 rounded-md text-label transition-colors ${
                active
                  ? 'bg-primary text-neutral-0'
                  : 'text-neutral-400 hover:text-neutral-0 hover:bg-neutral-800'
              }`}
            >
              <Icon size={18} strokeWidth={1.75} />
              {label}
            </a>
          ))}
        </nav>

        <div className="border-t border-neutral-800 p-4">
          <div className="flex items-center gap-3 px-2 py-2">
            <img
              src="https://i.pravatar.cc/80?img=13"
              alt=""
              className="w-9 h-9 rounded-full object-cover"
            />
            <div className="min-w-0">
              <div className="text-label text-neutral-0 truncate">
                {user?.email?.split('@')[0] || 'Admin'}
              </div>
              <div className="text-caption text-neutral-500 truncate">WebcarsMotors</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => void handleSignOut()}
            className="flex w-full items-center gap-3 px-4 py-2.5 mt-1 rounded-md text-label text-neutral-400 hover:text-neutral-0 hover:bg-neutral-800"
          >
            <LogOut size={18} strokeWidth={1.75} />
            Sair
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="bg-neutral-0 border-b border-neutral-200 h-[76px] px-6 md:px-10 flex items-center justify-between sticky top-0 z-20">
          <div className="text-body text-neutral-500">
            <Link to="/" className="hover:text-neutral-700">
              Admin
            </Link>
            <span className="mx-2 text-neutral-300">/</span>
            <span className="text-neutral-900 font-medium">Veículos</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="grid place-items-center w-10 h-10 rounded-md text-neutral-500 hover:bg-neutral-100"
              aria-label="Notificações"
            >
              <Bell size={20} strokeWidth={1.75} />
            </button>
            <img
              src="https://i.pravatar.cc/80?img=13"
              alt=""
              className="w-10 h-10 rounded-full object-cover ring-2 ring-neutral-100"
            />
          </div>
        </header>

        <div className="px-6 md:px-10 py-8 space-y-8">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-h1 text-neutral-900">Gerenciar Veículos</h1>
            <button type="button" onClick={openNew} className="btn btn-primary">
              <Plus size={18} strokeWidth={2} />
              Novo Veículo
            </button>
          </div>

          {showForm && (
            <VehicleForm
              key={editing?.id ?? 'new'}
              initial={editing}
              onSubmit={handleSubmit}
              onCancel={closeForm}
            />
          )}

          <div className="card rounded-lg overflow-hidden">
            <div className="px-6 md:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-h3 text-neutral-900">Veículos Cadastrados</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
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
                    className="bg-neutral-50 border border-neutral-200 rounded-md text-body text-neutral-700 placeholder:text-neutral-400 pl-9 pr-4 h-10 w-52"
                    placeholder="Buscar veículos..."
                  />
                </div>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value as 'all' | VehicleStatus)
                      setPage(1)
                    }}
                    className="bg-neutral-50 border border-neutral-200 rounded-md text-label text-neutral-600 pl-3 pr-8 h-10 appearance-none cursor-pointer"
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

            <div className="overflow-x-auto">
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
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEdit(v)}
                            title="Editar"
                            className="grid place-items-center w-9 h-9 rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-primary"
                          >
                            <Pencil size={17} strokeWidth={1.75} />
                          </button>
                          <button
                            type="button"
                            onClick={() => void togglePause(v.id)}
                            title={v.status === 'paused' ? 'Retomar' : 'Pausar'}
                            className="grid place-items-center w-9 h-9 rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-warning"
                          >
                            {v.status === 'paused' ? (
                              <Play size={17} strokeWidth={1.75} />
                            ) : (
                              <Pause size={17} strokeWidth={1.75} />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => void handleDelete(v)}
                            title="Excluir"
                            className="grid place-items-center w-9 h-9 rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-error"
                          >
                            <Trash2 size={17} strokeWidth={1.75} />
                          </button>
                        </div>
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

            <div className="px-6 md:px-8 py-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
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
    </div>
  )
}
