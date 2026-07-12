import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { UploadCloud } from 'lucide-react'
import {
  brands,
  categories,
  DEFAULT_SELLER,
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
  version: string
  doors: string
  drivetrain: string
  power: string
  torque: string
  ipva: string
  featuresText: string
  galleryUrls: string
  imageUrl: string
  imageFile: File | null
  sellerName: string
  sellerRating: string
  sellerLocation: string
  sellerPhone: string
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
  version: '',
  doors: '4',
  drivetrain: '',
  power: '',
  torque: '',
  ipva: 'Pago',
  featuresText: '',
  galleryUrls: '',
  imageUrl: '',
  imageFile: null,
  sellerName: DEFAULT_SELLER.name,
  sellerRating: String(DEFAULT_SELLER.rating),
  sellerLocation: DEFAULT_SELLER.location,
  sellerPhone: DEFAULT_SELLER.phone,
}

function toFormState(initial?: Vehicle | null): FormState {
  if (!initial) return EMPTY
  const extraImages = initial.images.filter((url) => url && url !== initial.imageUrl)
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
    version: initial.version,
    doors: String(initial.doors),
    drivetrain: initial.drivetrain,
    power: initial.power,
    torque: initial.torque,
    ipva: initial.ipva,
    featuresText: initial.features.join('\n'),
    galleryUrls: extraImages.join('\n'),
    imageUrl: initial.imageUrl,
    imageFile: null,
    sellerName: initial.seller.name,
    sellerRating: String(initial.seller.rating),
    sellerLocation: initial.seller.location,
    sellerPhone: initial.seller.phone,
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

function parseLines(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

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

      const extra = parseLines(form.galleryUrls)
      const images = [imageUrl, ...extra.filter((url) => url !== imageUrl)]

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
        version: form.version,
        doors: Number(form.doors) || 4,
        drivetrain: form.drivetrain,
        power: form.power,
        torque: form.torque,
        ipva: form.ipva,
        images,
        features: parseLines(form.featuresText),
        seller: {
          name: form.sellerName || DEFAULT_SELLER.name,
          rating: Number(form.sellerRating) || DEFAULT_SELLER.rating,
          location: form.sellerLocation || DEFAULT_SELLER.location,
          phone: form.sellerPhone || DEFAULT_SELLER.phone,
        },
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

          <Field label="Versão">
            <input
              value={form.version}
              onChange={set('version')}
              className={ctrl}
              placeholder="Ex: XRE / Touring"
            />
          </Field>
          <Field label="Portas">
            <input
              type="number"
              value={form.doors}
              onChange={set('doors')}
              className={`${ctrl} tnum`}
              min={2}
              max={5}
            />
          </Field>
          <Field label="Tração">
            <input
              value={form.drivetrain}
              onChange={set('drivetrain')}
              className={ctrl}
              placeholder="Ex: Dianteira / Integral"
            />
          </Field>

          <Field label="Potência">
            <input
              value={form.power}
              onChange={set('power')}
              className={ctrl}
              placeholder="Ex: 177 cv"
            />
          </Field>
          <Field label="Torque">
            <input
              value={form.torque}
              onChange={set('torque')}
              className={ctrl}
              placeholder="Ex: 21,4 kgfm"
            />
          </Field>
          <Field label="IPVA">
            <input
              value={form.ipva}
              onChange={set('ipva')}
              className={ctrl}
              placeholder="Ex: Pago"
            />
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
            <Field label="Equipamentos (um por linha)">
              <textarea
                value={form.featuresText}
                onChange={set('featuresText')}
                rows={5}
                className={`${ctrl} py-3 resize-y`}
                placeholder={'Ar-condicionado\nApple CarPlay\nCâmera de ré'}
              />
            </Field>
          </div>

          <div className="md:col-span-3 border-t border-neutral-200 pt-5">
            <h3 className="text-h3 text-neutral-900 mb-4">Vendedor</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <Field label="Nome">
                <input
                  value={form.sellerName}
                  onChange={set('sellerName')}
                  className={ctrl}
                  placeholder="Ex: Premium Motors SP"
                />
              </Field>
              <Field label="Avaliação">
                <input
                  type="number"
                  step="0.1"
                  min={0}
                  max={5}
                  value={form.sellerRating}
                  onChange={set('sellerRating')}
                  className={`${ctrl} tnum`}
                />
              </Field>
              <Field label="Localização">
                <input
                  value={form.sellerLocation}
                  onChange={set('sellerLocation')}
                  className={ctrl}
                  placeholder="Ex: São Paulo, SP"
                />
              </Field>
              <Field label="Telefone">
                <input
                  value={form.sellerPhone}
                  onChange={set('sellerPhone')}
                  className={`${ctrl} tnum`}
                  placeholder="Ex: (11) 3456-7890"
                />
              </Field>
            </div>
          </div>

          <div className="md:col-span-3">
            <span className="text-label text-neutral-700 font-semibold mb-2 block">
              Foto de capa
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

          <div className="md:col-span-3">
            <Field label="URLs extras da galeria (uma por linha)">
              <textarea
                value={form.galleryUrls}
                onChange={set('galleryUrls')}
                rows={3}
                className={`${ctrl} py-3 resize-y`}
                placeholder="https://..."
              />
            </Field>
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
