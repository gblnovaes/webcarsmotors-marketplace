export type ClientStatus = 'active' | 'inactive' | 'negotiating'

export type Client = {
  id: string
  fullName: string
  cpf: string
  birthDate: string
  email: string
  phone: string
  profession: string
  zipCode: string
  city: string
  state: string
  address: string
  complement: string
  interest: string
  budgetRange: string
  howFoundUs: string
  status: ClientStatus
  visits: number
  photoUrl: string
  createdAt?: string
  updatedAt?: string
}

export type ClientInput = Omit<Client, 'id' | 'createdAt' | 'updatedAt'>

export type ClientPatch = Partial<ClientInput>
