import type { Vehicle, VehicleInput, VehiclePatch } from '@/features/vehicles/types'

export interface VehicleRepository {
  list(): Promise<Vehicle[]>
  getById(id: string): Promise<Vehicle | null>
  create(input: VehicleInput): Promise<Vehicle>
  update(id: string, patch: VehiclePatch): Promise<Vehicle>
  remove(id: string): Promise<void>
}
