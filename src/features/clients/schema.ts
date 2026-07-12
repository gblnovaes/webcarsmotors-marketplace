import type { ClientStatus } from './types'

export const interests = ['Compra', 'Financiamento', 'Troca', 'Venda'] as const

export const budgetRanges = [
  'Até R$ 50 mil',
  'R$ 50–100 mil',
  'R$ 100–200 mil',
  'Acima de R$ 200 mil',
] as const

export const howFoundUsOptions = [
  'Google',
  'Instagram',
  'Indicação',
  'Outdoor',
  'Outro',
] as const

export const brazilianStates = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
] as const

export const clientStatuses: ClientStatus[] = ['active', 'inactive', 'negotiating']

export const CLIENT_STATUS_META: Record<
  ClientStatus,
  { label: string; pillClass: string; badgeClass: string }
> = {
  active: {
    label: 'Ativo',
    pillClass: 'text-success bg-[#EAF6EE]',
    badgeClass: 'badge badge-success',
  },
  inactive: {
    label: 'Inativo',
    pillClass: 'text-neutral-600 bg-neutral-100',
    badgeClass: 'badge',
  },
  negotiating: {
    label: 'Negociando',
    pillClass: 'text-warning bg-[#FBF1E3]',
    badgeClass: 'badge badge-warning',
  },
}

export function clientInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export function maskCpf(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 10) {
    return digits
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
  }
  return digits
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
}

export function maskZipCode(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  return digits.replace(/(\d{5})(\d)/, '$1-$2')
}
