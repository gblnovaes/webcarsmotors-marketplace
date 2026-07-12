import { Car, Star, BadgeCheck, Handshake } from 'lucide-react'

const STATS = [
  { icon: Car, value: '15.500+', label: 'Carros Disponíveis' },
  { icon: Star, value: '1.750+', label: 'Avaliações Positivas' },
  { icon: BadgeCheck, value: '3.500+', label: 'Veículos Vendidos' },
  { icon: Handshake, value: '250+', label: 'Parceiros Oficiais' },
]

export default function StatStrip() {
  return (
    <section className="bg-neutral-900">
      <div className="container-content grid grid-cols-2 lg:grid-cols-4 gap-8 py-10 md:py-12">
        {STATS.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex items-center gap-4">
            <span className="grid place-items-center w-12 h-12 rounded-full bg-neutral-800 text-primary shrink-0">
              <Icon size={22} strokeWidth={1.75} />
            </span>
            <div>
              <div className="text-h2 font-bold text-neutral-0 tnum">{value}</div>
              <div className="text-caption text-neutral-400 mt-0.5">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
