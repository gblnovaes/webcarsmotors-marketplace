import { useEffect, useState } from 'react'
import { Plus, Search, ChevronDown, X } from 'lucide-react'
import { useVehicles } from '@/features/vehicles/context/VehiclesContext'
import VehicleForm from '@/features/admin/components/VehicleForm'
import { StatusPill } from '@/features/admin/components/StatusPill'
import { Pagination } from '@/features/admin/components/Pagination'
import { VehicleRowActions } from '@/features/admin/components/VehicleRowActions'
import { VehicleMobileCard } from '@/features/admin/components/VehicleMobileCard'
import { brl, km } from '@/shared/lib/format'
import type { Vehicle, VehicleInput, VehicleStatus } from '@/features/vehicles/types'

const PAGE_SIZE = 6

export default function AdminVehicles() {
  const { vehicles, addVehicle, updateVehicle, removeVehicle, togglePause } = useVehicles()
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Vehicle | null>(null)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | VehicleStatus>('all')
  const [page, setPage] = useState(1)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!(showForm && isMobile)) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [showForm, isMobile])

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
    <>
      <div className="px-4 sm:px-6 md:px-10 py-6 sm:py-8 space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-h2 sm:text-h1 text-neutral-900">Gerenciar Veículos</h1>
          <button type="button" onClick={openNew} className="btn btn-primary w-full sm:w-auto">
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
              <p className="px-6 py-12 text-center text-neutral-500">Nenhum veículo encontrado.</p>
            )}
          </div>

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
    </>
  )
}
