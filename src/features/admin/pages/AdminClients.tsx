import { useEffect, useState } from 'react'
import { Plus, Search, ChevronDown, X } from 'lucide-react'
import { useClients } from '@/features/clients/context/ClientsContext'
import { clientInitials, CLIENT_STATUS_META } from '@/features/clients/schema'
import ClientForm from '@/features/admin/components/ClientForm'
import { ClientStatusPill } from '@/features/admin/components/ClientStatusPill'
import { Pagination } from '@/features/admin/components/Pagination'
import { ClientRowActions } from '@/features/admin/components/ClientRowActions'
import { ClientMobileCard } from '@/features/admin/components/ClientMobileCard'
import type { Client, ClientInput, ClientStatus } from '@/features/clients/types'

const PAGE_SIZE = 6

export default function AdminClients() {
  const { clients, addClient, updateClient, removeClient } = useClients()
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Client | null>(null)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | ClientStatus>('all')
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

  const openEdit = (c: Client) => {
    setEditing(c)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const closeForm = () => {
    setShowForm(false)
    setEditing(null)
  }

  const handleSubmit = async (data: ClientInput) => {
    if (editing) await updateClient(editing.id, data)
    else await addClient(data)
    closeForm()
  }

  const handleDelete = async (c: Client) => {
    if (window.confirm(`Excluir "${c.fullName}"? Esta ação não pode ser desfeita.`)) {
      await removeClient(c.id)
    }
  }

  const filtered = clients.filter((c) => {
    const q = query.toLowerCase()
    const matchQ =
      c.fullName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q)
    const matchS = statusFilter === 'all' || c.status === statusFilter
    return matchQ && matchS
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageSafe = Math.min(page, totalPages)
  const start = (pageSafe - 1) * PAGE_SIZE
  const rows = filtered.slice(start, start + PAGE_SIZE)

  const formElement = (
    <ClientForm
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
          <h1 className="text-h2 sm:text-h1 text-neutral-900">Gerenciar Clientes</h1>
          <button type="button" onClick={openNew} className="btn btn-primary w-full sm:w-auto">
            <Plus size={18} strokeWidth={2} />
            Novo Cliente
          </button>
        </div>

        {showForm && !isMobile && formElement}

        <div className="card rounded-lg overflow-hidden">
          <div className="px-4 sm:px-6 md:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-h3 text-neutral-900">Clientes Cadastrados</h2>
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
                  placeholder="Buscar clientes..."
                />
              </div>
              <div className="relative w-full sm:w-auto">
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value as 'all' | ClientStatus)
                    setPage(1)
                  }}
                  className="bg-neutral-50 border border-neutral-200 rounded-md text-label text-neutral-600 pl-3 pr-8 h-10 appearance-none cursor-pointer w-full sm:w-auto"
                >
                  <option value="all">Status: Todos</option>
                  {(Object.keys(CLIENT_STATUS_META) as ClientStatus[]).map((status) => (
                    <option key={status} value={status}>
                      {CLIENT_STATUS_META[status].label}
                    </option>
                  ))}
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
            {rows.map((c) => (
              <ClientMobileCard
                key={c.id}
                client={c}
                onEdit={openEdit}
                onDelete={(client) => void handleDelete(client)}
              />
            ))}
            {rows.length === 0 && (
              <p className="px-6 py-12 text-center text-neutral-500">Nenhum cliente encontrado.</p>
            )}
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-t border-neutral-200">
              <thead>
                <tr className="text-overline uppercase text-neutral-400 bg-neutral-50">
                  <th className="font-semibold px-6 md:px-8 py-3">Foto</th>
                  <th className="font-semibold px-4 py-3">Nome</th>
                  <th className="font-semibold px-4 py-3">Telefone</th>
                  <th className="font-semibold px-4 py-3">Cidade/UF</th>
                  <th className="font-semibold px-4 py-3">Interesse</th>
                  <th className="font-semibold px-4 py-3">Visitas</th>
                  <th className="font-semibold px-4 py-3">Status</th>
                  <th className="font-semibold px-4 py-3 text-right pr-6 md:pr-8">Ações</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => (
                  <tr key={c.id} className="border-t border-neutral-100 hover:bg-neutral-50">
                    <td className="px-6 md:px-8 py-4">
                      <div className="w-10 h-10 rounded-full bg-accent-soft text-primary grid place-items-center text-caption font-semibold">
                        {c.photoUrl ? (
                          <img
                            src={c.photoUrl}
                            alt=""
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          clientInitials(c.fullName)
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-body font-semibold text-neutral-900 leading-tight">
                        {c.fullName}
                      </div>
                      <div className="text-caption text-neutral-500">{c.email}</div>
                    </td>
                    <td className="px-4 py-4 text-body text-neutral-600 tnum whitespace-nowrap">
                      {c.phone}
                    </td>
                    <td className="px-4 py-4 text-body text-neutral-600 whitespace-nowrap">
                      {c.city ? `${c.city}/${c.state}` : '—'}
                    </td>
                    <td className="px-4 py-4 text-body text-neutral-600">{c.interest || '—'}</td>
                    <td className="px-4 py-4 text-body text-neutral-600 tnum">{c.visits}</td>
                    <td className="px-4 py-4">
                      <ClientStatusPill status={c.status} />
                    </td>
                    <td className="px-4 py-4 pr-6 md:pr-8">
                      <ClientRowActions
                        client={c}
                        onEdit={openEdit}
                        onDelete={(client) => void handleDelete(client)}
                      />
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-8 py-12 text-center text-neutral-500">
                      Nenhum cliente encontrado.
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
              clientes
            </p>
            <Pagination page={pageSafe} totalPages={totalPages} onChange={setPage} />
          </div>
        </div>
      </div>

      {showForm && isMobile && (
        <div className="fixed inset-0 z-30 flex flex-col bg-neutral-100">
          <div className="flex items-center justify-between gap-3 h-[60px] px-4 bg-neutral-0 border-b border-neutral-200 shrink-0">
            <h2 className="text-h3 text-neutral-900 truncate">
              {editing ? 'Editar Cliente' : 'Novo Cliente'}
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
