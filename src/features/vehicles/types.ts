export type VehicleStatus = 'available' | 'reserved' | 'sold' | 'paused'

export type VehicleSeller = {
  name: string
  rating: number
  location: string
  phone: string
}

export type Vehicle = {
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
  imageUrl: string
  version: string
  doors: number
  drivetrain: string
  power: string
  torque: string
  ipva: string
  images: string[]
  features: string[]
  seller: VehicleSeller
  createdAt?: string
  updatedAt?: string
}

export type VehicleInput = Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>

export type VehiclePatch = Partial<VehicleInput>
