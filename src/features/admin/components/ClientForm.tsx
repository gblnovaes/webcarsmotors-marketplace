import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import {
  budgetRanges,
  brazilianStates,
  CLIENT_STATUS_META,
  howFoundUsOptions,
  interests,
  maskCpf,
  maskPhone,
  maskZipCode,
} from '@/features/clients/schema'
import type { Client, ClientInput, ClientStatus } from '@/features/clients/types'

type ClientFormProps = {
  initial?: Client | null
  onSubmit: (data: ClientInput) => Promise<void>
  onCancel: () => void
  hideTitle?: boolean
}

type FormState = {
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
  visits: string
  photoUrl: string
}

const EMPTY: FormState = {
  fullName: '',
  cpf: '',
  birthDate: '',
  email: '',
  phone: '',
  profession: '',
  zipCode: '',
  city: '',
  state: '',
  address: '',
  complement: '',
  interest: 'Compra',
  budgetRange: 'R$ 50–100 mil',
  howFoundUs: 'Google',
  status: 'active',
  visits: '0',
  photoUrl: '',
}

function toFormState(initial?: Client | null): FormState {
  if (!initial) return EMPTY
  return {
    fullName: initial.fullName,
    cpf: initial.cpf,
    birthDate: initial.birthDate,
    email: initial.email,
    phone: initial.phone,
    profession: initial.profession,
    zipCode: initial.zipCode,
    city: initial.city,
    state: initial.state,
    address: initial.address,
    complement: initial.complement,
    interest: initial.interest,
    budgetRange: initial.budgetRange,
    howFoundUs: initial.howFoundUs,
    status: initial.status,
    visits: String(initial.visits),
    photoUrl: initial.photoUrl,
  }
}

const STATUS_OPTS = (Object.keys(CLIENT_STATUS_META) as ClientStatus[]).map(
  (value) => [value, CLIENT_STATUS_META[value].label] as const,
)

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-label text-neutral-700 font-semibold mb-2 block">{label}</span>
      {children}
    </label>
  )
}

const ctrl =
  'w-full bg-neutral-50 rounded-md border border-neutral-200 text-body text-neutral-700 placeholder:text-neutral-400 px-4 min-h-[48px]'

export default function ClientForm({
  initial,
  onSubmit,
  onCancel,
  hideTitle = false,
}: ClientFormProps) {
  const [form, setForm] = useState<FormState>(() => toFormState(initial))
  const [saving, setSaving] = useState(false)

  const set =
    (key: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  const setMasked =
    (key: 'cpf' | 'phone' | 'zipCode', mask: (v: string) => string) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: mask(e.target.value) }))

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await onSubmit({
        fullName: form.fullName.trim(),
        cpf: form.cpf,
        birthDate: form.birthDate,
        email: form.email.trim(),
        phone: form.phone,
        profession: form.profession.trim(),
        zipCode: form.zipCode,
        city: form.city.trim(),
        state: form.state,
        address: form.address.trim(),
        complement: form.complement.trim(),
        interest: form.interest,
        budgetRange: form.budgetRange,
        howFoundUs: form.howFoundUs,
        status: form.status,
        visits: Number(form.visits) || 0,
        photoUrl: form.photoUrl,
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="card rounded-lg">
      {!hideTitle && (
        <div className="px-6 md:px-8 py-5 border-b border-neutral-200">
          <h2 className="text-h3 text-neutral-900">
            {initial ? 'Editar Cliente' : 'Cadastrar Novo Cliente'}
          </h2>
        </div>
      )}

      <form onSubmit={(e) => void submit(e)}>
        <div className="px-4 sm:px-6 md:px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
          <Field label="Nome Completo">
            <input
              value={form.fullName}
              onChange={set('fullName')}
              className={ctrl}
              placeholder="Ex: João da Silva"
              required
            />
          </Field>
          <Field label="CPF">
            <input
              value={form.cpf}
              onChange={setMasked('cpf', maskCpf)}
              className={`${ctrl} tnum`}
              placeholder="000.000.000-00"
              inputMode="numeric"
              required
            />
          </Field>
          <Field label="Data de Nascimento">
            <input
              type="date"
              value={form.birthDate}
              onChange={set('birthDate')}
              className={`${ctrl} tnum`}
            />
          </Field>

          <Field label="E-mail">
            <input
              type="email"
              value={form.email}
              onChange={set('email')}
              className={ctrl}
              placeholder="email@exemplo.com"
              required
            />
          </Field>
          <Field label="Telefone">
            <input
              value={form.phone}
              onChange={setMasked('phone', maskPhone)}
              className={`${ctrl} tnum`}
              placeholder="(00) 00000-0000"
              inputMode="tel"
              required
            />
          </Field>
          <Field label="Profissão">
            <input
              value={form.profession}
              onChange={set('profession')}
              className={ctrl}
              placeholder="Ex: Engenheiro"
            />
          </Field>

          <Field label="CEP">
            <input
              value={form.zipCode}
              onChange={setMasked('zipCode', maskZipCode)}
              className={`${ctrl} tnum`}
              placeholder="00000-000"
              inputMode="numeric"
            />
          </Field>
          <Field label="Cidade">
            <input
              value={form.city}
              onChange={set('city')}
              className={ctrl}
              placeholder="Ex: São Paulo"
            />
          </Field>
          <Field label="Estado">
            <select value={form.state} onChange={set('state')} className={`${ctrl} cursor-pointer`}>
              <option value="">UF</option>
              {brazilianStates.map((uf) => (
                <option key={uf} value={uf}>
                  {uf}
                </option>
              ))}
            </select>
          </Field>

          <div className="md:col-span-2">
            <Field label="Endereço">
              <input
                value={form.address}
                onChange={set('address')}
                className={ctrl}
                placeholder="Rua, número"
              />
            </Field>
          </div>
          <Field label="Complemento">
            <input
              value={form.complement}
              onChange={set('complement')}
              className={ctrl}
              placeholder="Apto, bloco..."
            />
          </Field>

          <Field label="Interesse">
            <select
              value={form.interest}
              onChange={set('interest')}
              className={`${ctrl} cursor-pointer`}
            >
              {interests.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Faixa de Orçamento">
            <select
              value={form.budgetRange}
              onChange={set('budgetRange')}
              className={`${ctrl} cursor-pointer`}
            >
              {budgetRanges.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Como nos Conheceu">
            <select
              value={form.howFoundUs}
              onChange={set('howFoundUs')}
              className={`${ctrl} cursor-pointer`}
            >
              {howFoundUsOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Status">
            <select value={form.status} onChange={set('status')} className={`${ctrl} cursor-pointer`}>
              {STATUS_OPTS.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Visitas">
            <input
              type="number"
              min={0}
              value={form.visits}
              onChange={set('visits')}
              className={`${ctrl} tnum`}
              placeholder="0"
            />
          </Field>
        </div>

        <div className="px-4 sm:px-6 md:px-8 py-4 border-t border-neutral-200 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3">
          <button type="button" onClick={onCancel} className="btn btn-ghost w-full sm:w-auto">
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={saving}>
            {saving ? 'Salvando...' : initial ? 'Salvar Alterações' : 'Salvar Cliente'}
          </button>
        </div>
      </form>
    </div>
  )
}
