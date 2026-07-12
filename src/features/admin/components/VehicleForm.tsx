import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { UploadCloud } from 'lucide-react'
import {
  brands,
  categories,
  DEFAULT_VEHICLE_IMAGE,
  fuels,
  STATUS_META,
  transmissions,
} from '@/features/vehicles/schema'
import type { Vehicle, VehicleInput, VehicleStatus } from '@/features/vehicles/types'
import { getDataSource } from '@/data/repositories'
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/client'
import { uploadVehicleImage } from '@/data/repositories/supabaseVehicleRepository'

type VehicleFormProps = {
  initial?: Vehicle | null
  onSubmit: (data: VehicleInput) => Promise<void>
  onCancel: () => void
  hideTitle?: boolean
}

type FormState = {
  brand: string
  model: string
  year: string
  price: string
  km: string
  fuel: string
  transmission: string
  color: string
  plate: string
  location: string
  category: string
  status: VehicleStatus
  description: string
  imageUrl: string
  imageFile: File | null
}

const EMPTY: FormState = {
  brand: '',
  model: '',
  year: '',
  price: '',
  km: '',
  fuel: '',
  transmission: 'Automático',
  color: '',
  plate: '',
  location: '',
  category: 'SUV',
  status: 'available',
  description: '',
  imageUrl: '',
  imageFile: null,
}

function toFormState(initial?: Vehicle | null): FormState {
  if (!initial) return EMPTY
  return {
    brand: initial.brand,
    model: initial.model,
    year: String(initial.year),
    price: String(initial.price),
    km: String(initial.km),
    fuel: initial.fuel,
    transmission: initial.transmission,
    color: initial.color,
    plate: initial.plate,
    location: initial.location,
    category: initial.category,
    status: initial.status,
    description: initial.description,
    imageUrl: initial.imageUrl,
    imageFile: null,
  }
}

const STATUS_OPTS = (Object.keys(STATUS_META) as VehicleStatus[]).map(
  (value) => [value, STATUS_META[value].label] as const,
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

export default function VehicleForm({
  initial,
  onSubmit,
  onCancel,
  hideTitle = false,
}: VehicleFormProps) {
  const [form, setForm] = useState<FormState>(() => toFormState(initial))
  const [saving, setSaving] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const set =
    (key: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  const readFile = (file?: File | null) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () =>
      setForm((f) => ({
        ...f,
        imageFile: file,
        imageUrl: typeof reader.result === 'string' ? reader.result : f.imageUrl,
      }))
    reader.readAsDataURL(file)
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      let imageUrl = form.imageUrl || DEFAULT_VEHICLE_IMAGE

      if (form.imageFile && getDataSource() === 'supabase' && isSupabaseConfigured()) {
        imageUrl = await uploadVehicleImage(getSupabaseClient(), form.imageFile)
      }

      await onSubmit({
        brand: form.brand,
        model: form.model,
        year: Number(form.year) || new Date().getFullYear(),
        price: Number(form.price) || 0,
        km: Number(form.km) || 0,
        fuel: form.fuel,
        transmission: form.transmission,
        color: form.color,
        plate: form.plate,
        location: form.location,
        category: form.category,
        status: form.status,
        description: form.description,
        imageUrl,
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
            {initial ? 'Editar Veículo' : 'Cadastrar Novo Veículo'}
          </h2>
        </div>
      )}

      <form onSubmit={(e) => void submit(e)}>
        <div className="px-4 sm:px-6 md:px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
          <Field label="Marca">
            <select value={form.brand} onChange={set('brand')} className={`${ctrl} cursor-pointer`}>
              <option value="">Selecione a marca</option>
              {brands.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </Field>
          <Field label="Modelo">
            <input
              value={form.model}
              onChange={set('model')}
              className={ctrl}
              placeholder="Ex: Corolla"
              required
            />
          </Field>
          <Field label="Ano">
            <input
              type="number"
              value={form.year}
              onChange={set('year')}
              className={`${ctrl} tnum`}
              placeholder="Ex: 2024"
            />
          </Field>

          <Field label="Preço">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-body">
                R$
              </span>
              <input
                type="number"
                value={form.price}
                onChange={set('price')}
                className={`${ctrl} tnum pl-10`}
                placeholder="0,00"
              />
            </div>
          </Field>
          <Field label="Quilometragem">
            <div className="relative">
              <input
                type="number"
                value={form.km}
                onChange={set('km')}
                className={`${ctrl} tnum pr-12`}
                placeholder="0"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 text-body">
                km
              </span>
            </div>
          </Field>
          <Field label="Combustível">
            <select value={form.fuel} onChange={set('fuel')} className={`${ctrl} cursor-pointer`}>
              <option value="">Selecione</option>
              {fuels.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </Field>

          <Field label="Câmbio">
            <select
              value={form.transmission}
              onChange={set('transmission')}
              className={`${ctrl} cursor-pointer`}
            >
              {transmissions.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field label="Cor">
            <input
              value={form.color}
              onChange={set('color')}
              className={ctrl}
              placeholder="Ex: Branco"
            />
          </Field>
          <Field label="Placa">
            <input
              value={form.plate}
              onChange={set('plate')}
              className={`${ctrl} uppercase`}
              placeholder="Ex: ABC-1234"
            />
          </Field>

          <Field label="Localização / Cidade">
            <input
              value={form.location}
              onChange={set('location')}
              className={ctrl}
              placeholder="Ex: São Paulo"
            />
          </Field>
          <Field label="Categoria">
            <select
              value={form.category}
              onChange={set('category')}
              className={`${ctrl} cursor-pointer`}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
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

          <div className="md:col-span-3">
            <Field label="Descrição">
              <textarea
                value={form.description}
                onChange={set('description')}
                rows={4}
                className={`${ctrl} py-3 resize-y`}
                placeholder="Descreva detalhes como opcionais, estado de conservação, revisões..."
              />
            </Field>
          </div>

          <div className="md:col-span-3">
            <span className="text-label text-neutral-700 font-semibold mb-2 block">
              Upload de Fotos
            </span>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => readFile(e.target.files?.[0])}
            />
            <div
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                readFile(e.dataTransfer.files?.[0])
              }}
              className="rounded-lg border-2 border-dashed border-accent-400/50 bg-neutral-50 hover:bg-accent-soft/50 transition-colors cursor-pointer py-10 px-6 text-center"
            >
              {form.imageUrl ? (
                <div className="flex flex-col items-center gap-3">
                  <img src={form.imageUrl} alt="Prévia" className="h-24 rounded-md object-cover" />
                  <span className="text-caption text-neutral-500">Clique para trocar a imagem</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-neutral-500">
                  <UploadCloud size={28} strokeWidth={1.75} className="text-primary" />
                  <span className="text-body text-neutral-600">
                    Arraste imagens ou clique para enviar
                  </span>
                  <span className="text-caption text-neutral-400">PNG, JPG até 5MB</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 md:px-8 py-4 border-t border-neutral-200 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3">
          <button type="button" onClick={onCancel} className="btn btn-ghost w-full sm:w-auto">
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn-primary w-full sm:w-auto"
            disabled={saving}
          >
            {saving ? 'Salvando...' : initial ? 'Salvar Alterações' : 'Salvar Veículo'}
          </button>
        </div>
      </form>
    </div>
  )
}
