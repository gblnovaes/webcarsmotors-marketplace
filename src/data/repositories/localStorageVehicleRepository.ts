import type { Vehicle, VehicleInput, VehiclePatch } from '@/features/vehicles/types'
import { seedVehicles } from '@/data/seed/vehicles'
import type { VehicleRepository } from './types'

const STORAGE_KEY = 'carriage:vehicles'

function createId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function normalizeVehicle(raw: Record<string, unknown>): Vehicle {
  const imageUrl =
    typeof raw.imageUrl === 'string'
      ? raw.imageUrl
      : typeof raw.image === 'string'
        ? raw.image
        : ''

  return {
    id: String(raw.id),
    brand: String(raw.brand ?? ''),
    model: String(raw.model ?? ''),
    year: Number(raw.year) || 0,
    price: Number(raw.price) || 0,
    km: Number(raw.km) || 0,
    fuel: String(raw.fuel ?? ''),
    transmission: String(raw.transmission ?? ''),
    color: String(raw.color ?? ''),
    plate: String(raw.plate ?? ''),
    location: String(raw.location ?? ''),
    category: String(raw.category ?? ''),
    status: (raw.status as Vehicle['status']) || 'available',
    description: String(raw.description ?? ''),
    imageUrl,
    createdAt: typeof raw.createdAt === 'string' ? raw.createdAt : undefined,
    updatedAt: typeof raw.updatedAt === 'string' ? raw.updatedAt : undefined,
  }
}

function load(): Vehicle[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return structuredClone(seedVehicles)
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return structuredClone(seedVehicles)
    return parsed.map((item) => normalizeVehicle(item as Record<string, unknown>))
  } catch {
    return structuredClone(seedVehicles)
  }
}

function save(vehicles: Vehicle[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles))
}

export function createLocalStorageVehicleRepository(): VehicleRepository {
  return {
    async list() {
      return load()
    },

    async getById(id) {
      return load().find((v) => v.id === id) ?? null
    },

    async create(input: VehicleInput) {
      const now = new Date().toISOString()
      const vehicle: Vehicle = {
        ...input,
        id: createId(),
        createdAt: now,
        updatedAt: now,
      }
      const list = load()
      list.unshift(vehicle)
      save(list)
      return vehicle
    },

    async update(id, patch: VehiclePatch) {
      const list = load()
      const index = list.findIndex((v) => v.id === id)
      if (index === -1) throw new Error(`Vehicle ${id} not found`)
      const updated: Vehicle = {
        ...list[index],
        ...patch,
        id,
        updatedAt: new Date().toISOString(),
      }
      list[index] = updated
      save(list)
      return updated
    },

    async remove(id) {
      const list = load().filter((v) => v.id !== id)
      save(list)
    },
  }
}
