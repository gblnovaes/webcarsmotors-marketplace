import { createLocalStorageVehicleRepository } from './localStorageVehicleRepository'
import { createSupabaseVehicleRepository } from './supabaseVehicleRepository'
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/client'
import type { VehicleRepository } from './types'

export type DataSource = 'local' | 'supabase'

export function getDataSource(): DataSource {
  const value = import.meta.env.VITE_DATA_SOURCE
  if (value === 'supabase' && isSupabaseConfigured()) return 'supabase'
  return 'local'
}

let cached: VehicleRepository | null = null

export function getVehicleRepository(): VehicleRepository {
  if (cached) return cached

  if (getDataSource() === 'supabase') {
    cached = createSupabaseVehicleRepository(getSupabaseClient())
  } else {
    cached = createLocalStorageVehicleRepository()
  }

  return cached
}

export type { VehicleRepository }
