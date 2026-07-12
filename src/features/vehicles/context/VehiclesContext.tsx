import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Vehicle, VehicleInput, VehiclePatch } from '@/features/vehicles/types'
import { getVehicleRepository } from '@/data/repositories'

type VehiclesContextValue = {
  vehicles: Vehicle[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  addVehicle: (input: VehicleInput) => Promise<Vehicle>
  updateVehicle: (id: string, patch: VehiclePatch) => Promise<Vehicle>
  removeVehicle: (id: string) => Promise<void>
  togglePause: (id: string) => Promise<Vehicle>
}

const VehiclesContext = createContext<VehiclesContextValue | null>(null)

export function VehiclesProvider({ children }: { children: ReactNode }) {
  const repo = useMemo(() => getVehicleRepository(), [])
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const list = await repo.list()
      setVehicles(list)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao carregar veículos')
    } finally {
      setLoading(false)
    }
  }, [repo])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const addVehicle = useCallback(
    async (input: VehicleInput) => {
      const created = await repo.create(input)
      setVehicles((list) => [created, ...list])
      return created
    },
    [repo],
  )

  const updateVehicle = useCallback(
    async (id: string, patch: VehiclePatch) => {
      const updated = await repo.update(id, patch)
      setVehicles((list) => list.map((v) => (v.id === id ? updated : v)))
      return updated
    },
    [repo],
  )

  const removeVehicle = useCallback(
    async (id: string) => {
      await repo.remove(id)
      setVehicles((list) => list.filter((v) => v.id !== id))
    },
    [repo],
  )

  const togglePause = useCallback(
    async (id: string) => {
      const current = vehicles.find((v) => v.id === id)
      if (!current) throw new Error('Veículo não encontrado')
      const nextStatus = current.status === 'paused' ? 'available' : 'paused'
      return updateVehicle(id, { status: nextStatus })
    },
    [updateVehicle, vehicles],
  )

  const value = useMemo(
    () => ({
      vehicles,
      loading,
      error,
      refresh,
      addVehicle,
      updateVehicle,
      removeVehicle,
      togglePause,
    }),
    [vehicles, loading, error, refresh, addVehicle, updateVehicle, removeVehicle, togglePause],
  )

  return <VehiclesContext.Provider value={value}>{children}</VehiclesContext.Provider>
}

export function useVehicles() {
  const ctx = useContext(VehiclesContext)
  if (!ctx) throw new Error('useVehicles must be used within VehiclesProvider')
  return ctx
}
