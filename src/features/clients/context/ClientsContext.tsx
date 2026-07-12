import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Client, ClientInput, ClientPatch } from '@/features/clients/types'
import { getClientRepository } from '@/data/repositories'

type ClientsContextValue = {
  clients: Client[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  addClient: (input: ClientInput) => Promise<Client>
  updateClient: (id: string, patch: ClientPatch) => Promise<Client>
  removeClient: (id: string) => Promise<void>
}

const ClientsContext = createContext<ClientsContextValue | null>(null)

export function ClientsProvider({ children }: { children: ReactNode }) {
  const repo = useMemo(() => getClientRepository(), [])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const list = await repo.list()
      setClients(list)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao carregar clientes')
    } finally {
      setLoading(false)
    }
  }, [repo])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const addClient = useCallback(
    async (input: ClientInput) => {
      const created = await repo.create(input)
      setClients((list) => [created, ...list])
      return created
    },
    [repo],
  )

  const updateClient = useCallback(
    async (id: string, patch: ClientPatch) => {
      const updated = await repo.update(id, patch)
      setClients((list) => list.map((c) => (c.id === id ? updated : c)))
      return updated
    },
    [repo],
  )

  const removeClient = useCallback(
    async (id: string) => {
      await repo.remove(id)
      setClients((list) => list.filter((c) => c.id !== id))
    },
    [repo],
  )

  const value = useMemo(
    () => ({
      clients,
      loading,
      error,
      refresh,
      addClient,
      updateClient,
      removeClient,
    }),
    [clients, loading, error, refresh, addClient, updateClient, removeClient],
  )

  return <ClientsContext.Provider value={value}>{children}</ClientsContext.Provider>
}

export function useClients() {
  const ctx = useContext(ClientsContext)
  if (!ctx) throw new Error('useClients must be used within ClientsProvider')
  return ctx
}
