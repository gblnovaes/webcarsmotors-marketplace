import type { VehicleStatus } from './types'

export const brands = [
  'Toyota',
  'Honda',
  'Jeep',
  'Volkswagen',
  'Ford',
  'BMW',
  'Chevrolet',
  'Hyundai',
  'Fiat',
  'Mercedes-Benz',
  'Porsche',
] as const

export const categories = ['SUV', 'Sedã', 'Hatch', 'Picape', 'Esportivo', 'Elétrico'] as const

export const fuels = ['Flex', 'Gasolina', 'Diesel', 'Híbrido', 'Elétrico'] as const

export const transmissions = ['Automático', 'Manual', 'CVT'] as const

export const statuses: VehicleStatus[] = ['available', 'reserved', 'sold', 'paused']

export const bodyTypes = categories

export const STATUS_META: Record<
  VehicleStatus,
  { label: string; pillClass: string; badgeClass: string }
> = {
  available: {
    label: 'Disponível',
    pillClass: 'text-success bg-[#EAF6EE]',
    badgeClass: 'badge badge-success',
  },
  reserved: {
    label: 'Reservado',
    pillClass: 'text-warning bg-[#FBF1E3]',
    badgeClass: 'badge badge-warning',
  },
  sold: {
    label: 'Vendido',
    pillClass: 'text-error bg-[#FBECEC]',
    badgeClass: 'badge',
  },
  paused: {
    label: 'Pausado',
    pillClass: 'text-neutral-600 bg-neutral-100',
    badgeClass: 'badge',
  },
}

export const DEFAULT_VEHICLE_IMAGE =
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80&auto=format&fit=crop'

export const DEFAULT_SELLER = {
  name: 'WebCars Motors',
  rating: 4.8,
  location: 'São Paulo, SP',
  phone: '(11) 4000-0000',
} as const
