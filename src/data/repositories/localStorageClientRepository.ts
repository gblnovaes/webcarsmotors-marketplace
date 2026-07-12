import type { Client, ClientInput, ClientPatch } from '@/features/clients/types'
import { seedClients } from '@/data/seed/clients'
import type { ClientRepository } from './types'

const STORAGE_KEY = 'carriage:clients'

function createId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function normalizeClient(raw: Record<string, unknown>): Client {
  return {
    id: String(raw.id),
    fullName: String(raw.fullName ?? ''),
    cpf: String(raw.cpf ?? ''),
    birthDate: String(raw.birthDate ?? ''),
    email: String(raw.email ?? ''),
    phone: String(raw.phone ?? ''),
    profession: String(raw.profession ?? ''),
    zipCode: String(raw.zipCode ?? ''),
    city: String(raw.city ?? ''),
    state: String(raw.state ?? ''),
    address: String(raw.address ?? ''),
    complement: String(raw.complement ?? ''),
    interest: String(raw.interest ?? ''),
    budgetRange: String(raw.budgetRange ?? ''),
    howFoundUs: String(raw.howFoundUs ?? ''),
    status: (raw.status as Client['status']) || 'active',
    visits: Number(raw.visits) || 0,
    photoUrl: String(raw.photoUrl ?? ''),
    createdAt: typeof raw.createdAt === 'string' ? raw.createdAt : undefined,
    updatedAt: typeof raw.updatedAt === 'string' ? raw.updatedAt : undefined,
  }
}

function load(): Client[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return structuredClone(seedClients)
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return structuredClone(seedClients)
    return parsed.map((item) => normalizeClient(item as Record<string, unknown>))
  } catch {
    return structuredClone(seedClients)
  }
}

function save(clients: Client[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients))
}

export function createLocalStorageClientRepository(): ClientRepository {
  return {
    async list() {
      return load()
    },

    async getById(id) {
      return load().find((c) => c.id === id) ?? null
    },

    async create(input: ClientInput) {
      const now = new Date().toISOString()
      const client: Client = {
        ...input,
        id: createId(),
        createdAt: now,
        updatedAt: now,
      }
      const list = load()
      list.unshift(client)
      save(list)
      return client
    },

    async update(id, patch: ClientPatch) {
      const list = load()
      const index = list.findIndex((c) => c.id === id)
      if (index === -1) throw new Error(`Client ${id} not found`)
      const updated: Client = {
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
      const list = load().filter((c) => c.id !== id)
      save(list)
    },
  }
}
