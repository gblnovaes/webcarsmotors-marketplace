import { createLocalStorageVehicleRepository } from './localStorageVehicleRepository'
import { createSupabaseVehicleRepository } from './supabaseVehicleRepository'
import { createLocalStorageClientRepository } from './localStorageClientRepository'
import { createSupabaseClientRepository } from './supabaseClientRepository'
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/client'
import type { ClientRepository, VehicleRepository } from './types'

export type DataSource = 'local' | 'supabase'

export function getDataSource(): DataSource {
  const value = import.meta.env.VITE_DATA_SOURCE
  if (value === 'supabase' && isSupabaseConfigured()) return 'supabase'
  return 'local'
}

let cachedVehicles: VehicleRepository | null = null
let cachedClients: ClientRepository | null = null

export function getVehicleRepository(): VehicleRepository {
  if (cachedVehicles) return cachedVehicles

  if (getDataSource() === 'supabase') {
    cachedVehicles = createSupabaseVehicleRepository(getSupabaseClient())
  } else {
    cachedVehicles = createLocalStorageVehicleRepository()
  }

  return cachedVehicles
}

export function getClientRepository(): ClientRepository {
  if (cachedClients) return cachedClients

  if (getDataSource() === 'supabase') {
    cachedClients = createSupabaseClientRepository(getSupabaseClient())
  } else {
    cachedClients = createLocalStorageClientRepository()
  }

  return cachedClients
}

export type { VehicleRepository, ClientRepository }
