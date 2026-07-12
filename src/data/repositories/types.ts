import type { Client, ClientInput, ClientPatch } from '@/features/clients/types'
import type { Vehicle, VehicleInput, VehiclePatch } from '@/features/vehicles/types'

export interface VehicleRepository {
  list(): Promise<Vehicle[]>
  getById(id: string): Promise<Vehicle | null>
  create(input: VehicleInput): Promise<Vehicle>
  update(id: string, patch: VehiclePatch): Promise<Vehicle>
  remove(id: string): Promise<void>
}

export interface ClientRepository {
  list(): Promise<Client[]>
  getById(id: string): Promise<Client | null>
  create(input: ClientInput): Promise<Client>
  update(id: string, patch: ClientPatch): Promise<Client>
  remove(id: string): Promise<void>
}
