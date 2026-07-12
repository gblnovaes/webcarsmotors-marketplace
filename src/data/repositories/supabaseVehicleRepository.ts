import type { SupabaseClient } from '@supabase/supabase-js'
import type { Vehicle, VehicleInput, VehiclePatch, VehicleStatus } from '@/features/vehicles/types'
import type { VehicleRepository } from './types'

type VehicleRow = {
  id: string
  brand: string
  model: string
  year: number
  price: number
  km: number
  fuel: string
  transmission: string
  color: string
  plate: string
  location: string
  category: string
  status: VehicleStatus
  description: string
  image_url: string
  created_at: string | null
  updated_at: string | null
}

function rowToVehicle(row: VehicleRow): Vehicle {
  return {
    id: row.id,
    brand: row.brand,
    model: row.model,
    year: row.year,
    price: Number(row.price),
    km: row.km,
    fuel: row.fuel,
    transmission: row.transmission,
    color: row.color,
    plate: row.plate,
    location: row.location,
    category: row.category,
    status: row.status,
    description: row.description,
    imageUrl: row.image_url,
    createdAt: row.created_at ?? undefined,
    updatedAt: row.updated_at ?? undefined,
  }
}

function inputToRow(input: VehicleInput | VehiclePatch) {
  const row: Record<string, unknown> = {}
  if (input.brand !== undefined) row.brand = input.brand
  if (input.model !== undefined) row.model = input.model
  if (input.year !== undefined) row.year = input.year
  if (input.price !== undefined) row.price = input.price
  if (input.km !== undefined) row.km = input.km
  if (input.fuel !== undefined) row.fuel = input.fuel
  if (input.transmission !== undefined) row.transmission = input.transmission
  if (input.color !== undefined) row.color = input.color
  if (input.plate !== undefined) row.plate = input.plate
  if (input.location !== undefined) row.location = input.location
  if (input.category !== undefined) row.category = input.category
  if (input.status !== undefined) row.status = input.status
  if (input.description !== undefined) row.description = input.description
  if (input.imageUrl !== undefined) row.image_url = input.imageUrl
  return row
}

export function createSupabaseVehicleRepository(client: SupabaseClient): VehicleRepository {
  return {
    async list() {
      const { data, error } = await client
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return ((data ?? []) as VehicleRow[]).map(rowToVehicle)
    },

    async getById(id) {
      const { data, error } = await client.from('vehicles').select('*').eq('id', id).maybeSingle()
      if (error) throw error
      return data ? rowToVehicle(data as VehicleRow) : null
    },

    async create(input) {
      const { data, error } = await client
        .from('vehicles')
        .insert(inputToRow(input))
        .select('*')
        .single()

      if (error) throw error
      return rowToVehicle(data as VehicleRow)
    },

    async update(id, patch) {
      const { data, error } = await client
        .from('vehicles')
        .update({ ...inputToRow(patch), updated_at: new Date().toISOString() })
        .eq('id', id)
        .select('*')
        .single()

      if (error) throw error
      return rowToVehicle(data as VehicleRow)
    },

    async remove(id) {
      const { error } = await client.from('vehicles').delete().eq('id', id)
      if (error) throw error
    },
  }
}

export async function uploadVehicleImage(
  client: SupabaseClient,
  file: File,
): Promise<string> {
  const ext = file.name.split('.').pop() || 'jpg'
  const path = `${crypto.randomUUID()}.${ext}`
  const { error } = await client.storage.from('vehicle-images').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })
  if (error) throw error
  const { data } = client.storage.from('vehicle-images').getPublicUrl(path)
  return data.publicUrl
}
