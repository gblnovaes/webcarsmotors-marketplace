import type { Vehicle, VehicleInput, VehiclePatch, VehicleSeller } from '@/features/vehicles/types'
import { DEFAULT_SELLER } from '@/features/vehicles/schema'
import { seedVehicles } from '@/data/seed/vehicles'
import type { VehicleRepository } from './types'

const STORAGE_KEY = 'carriage:vehicles:v2'

function createId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is string => typeof item === 'string')
}

function normalizeSeller(raw: unknown): VehicleSeller {
  if (!raw || typeof raw !== 'object') {
    return { ...DEFAULT_SELLER }
  }
  const s = raw as Record<string, unknown>
  return {
    name: typeof s.name === 'string' && s.name ? s.name : DEFAULT_SELLER.name,
    rating: Number(s.rating) || DEFAULT_SELLER.rating,
    location: typeof s.location === 'string' && s.location ? s.location : DEFAULT_SELLER.location,
    phone: typeof s.phone === 'string' && s.phone ? s.phone : DEFAULT_SELLER.phone,
  }
}

function normalizeVehicle(raw: Record<string, unknown>): Vehicle {
  const imageUrl =
    typeof raw.imageUrl === 'string'
      ? raw.imageUrl
      : typeof raw.image === 'string'
        ? raw.image
        : ''

  const images = asStringArray(raw.images)
  const gallery = images.length > 0 ? images : imageUrl ? [imageUrl] : []

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
    imageUrl: imageUrl || gallery[0] || '',
    version: String(raw.version ?? ''),
    doors: Number(raw.doors) || 4,
    drivetrain: String(raw.drivetrain ?? ''),
    power: String(raw.power ?? ''),
    torque: String(raw.torque ?? ''),
    ipva: String(raw.ipva ?? ''),
    images: gallery,
    features: asStringArray(raw.features),
    seller: normalizeSeller(raw.seller),
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

function withSyncedCover(input: VehicleInput): VehicleInput {
  const images =
    input.images.length > 0 ? input.images : input.imageUrl ? [input.imageUrl] : []
  return {
    ...input,
    images,
    imageUrl: images[0] ?? input.imageUrl,
  }
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
      const synced = withSyncedCover(input)
      const vehicle: Vehicle = {
        ...synced,
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
      const current = list[index]
      const merged: Vehicle = { ...current, ...patch, id }
      const synced = withSyncedCover({
        brand: merged.brand,
        model: merged.model,
        year: merged.year,
        price: merged.price,
        km: merged.km,
        fuel: merged.fuel,
        transmission: merged.transmission,
        color: merged.color,
        plate: merged.plate,
        location: merged.location,
        category: merged.category,
        status: merged.status,
        description: merged.description,
        imageUrl: merged.imageUrl,
        version: merged.version,
        doors: merged.doors,
        drivetrain: merged.drivetrain,
        power: merged.power,
        torque: merged.torque,
        ipva: merged.ipva,
        images: merged.images,
        features: merged.features,
        seller: merged.seller,
      })
      const updated: Vehicle = {
        ...synced,
        id,
        createdAt: current.createdAt,
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
