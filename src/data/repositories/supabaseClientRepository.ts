import type { SupabaseClient } from '@supabase/supabase-js'
import type { Client, ClientInput, ClientPatch, ClientStatus } from '@/features/clients/types'
import type { ClientRepository } from './types'

type ClientRow = {
  id: string
  full_name: string
  cpf: string
  birth_date: string
  email: string
  phone: string
  profession: string
  zip_code: string
  city: string
  state: string
  address: string
  complement: string
  interest: string
  budget_range: string
  how_found_us: string
  status: ClientStatus
  visits: number
  photo_url: string
  created_at: string | null
  updated_at: string | null
}

function rowToClient(row: ClientRow): Client {
  return {
    id: row.id,
    fullName: row.full_name,
    cpf: row.cpf,
    birthDate: row.birth_date,
    email: row.email,
    phone: row.phone,
    profession: row.profession,
    zipCode: row.zip_code,
    city: row.city,
    state: row.state,
    address: row.address,
    complement: row.complement,
    interest: row.interest,
    budgetRange: row.budget_range,
    howFoundUs: row.how_found_us,
    status: row.status,
    visits: row.visits,
    photoUrl: row.photo_url,
    createdAt: row.created_at ?? undefined,
    updatedAt: row.updated_at ?? undefined,
  }
}

function inputToRow(input: ClientInput | ClientPatch) {
  const row: Record<string, unknown> = {}
  if (input.fullName !== undefined) row.full_name = input.fullName
  if (input.cpf !== undefined) row.cpf = input.cpf
  if (input.birthDate !== undefined) row.birth_date = input.birthDate
  if (input.email !== undefined) row.email = input.email
  if (input.phone !== undefined) row.phone = input.phone
  if (input.profession !== undefined) row.profession = input.profession
  if (input.zipCode !== undefined) row.zip_code = input.zipCode
  if (input.city !== undefined) row.city = input.city
  if (input.state !== undefined) row.state = input.state
  if (input.address !== undefined) row.address = input.address
  if (input.complement !== undefined) row.complement = input.complement
  if (input.interest !== undefined) row.interest = input.interest
  if (input.budgetRange !== undefined) row.budget_range = input.budgetRange
  if (input.howFoundUs !== undefined) row.how_found_us = input.howFoundUs
  if (input.status !== undefined) row.status = input.status
  if (input.visits !== undefined) row.visits = input.visits
  if (input.photoUrl !== undefined) row.photo_url = input.photoUrl
  return row
}

export function createSupabaseClientRepository(client: SupabaseClient): ClientRepository {
  return {
    async list() {
      const { data, error } = await client
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return ((data ?? []) as ClientRow[]).map(rowToClient)
    },

    async getById(id) {
      const { data, error } = await client.from('clients').select('*').eq('id', id).maybeSingle()
      if (error) throw error
      return data ? rowToClient(data as ClientRow) : null
    },

    async create(input) {
      const { data, error } = await client
        .from('clients')
        .insert(inputToRow(input))
        .select('*')
        .single()

      if (error) throw error
      return rowToClient(data as ClientRow)
    },

    async update(id, patch) {
      const { data, error } = await client
        .from('clients')
        .update({ ...inputToRow(patch), updated_at: new Date().toISOString() })
        .eq('id', id)
        .select('*')
        .single()

      if (error) throw error
      return rowToClient(data as ClientRow)
    },

    async remove(id) {
      const { error } = await client.from('clients').delete().eq('id', id)
      if (error) throw error
    },
  }
}
