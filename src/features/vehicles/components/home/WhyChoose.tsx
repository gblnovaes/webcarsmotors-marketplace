import { ShieldCheck, Landmark, BadgeCheck } from 'lucide-react'

const ITEMS = [
  {
    icon: ShieldCheck,
    title: 'Veículos Verificados',
    text: 'Cada anúncio passa por checagem de documentação e histórico para você comprar com confiança.',
  },
  {
    icon: Landmark,
    title: 'Financiamento Facilitado',
    text: 'Parcerias com os principais bancos para aprovação rápida e condições competitivas.',
  },
  {
    icon: BadgeCheck,
    title: 'Garantia Estendida',
    text: 'Opções de proteção pós-compra para você dirigir com tranquilidade por mais tempo.',
  },
]

export default function WhyChoose() {
  return (
    <section id="por-que" className="bg-neutral-50 py-14 md:py-20 scroll-mt-20">
      <div className="container-content">
        <h2 className="text-h1 text-neutral-900 text-center mb-10">Por Que Escolher a WebCars?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ITEMS.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="bg-neutral-0 rounded-lg border border-neutral-200 shadow-sm p-8 text-center"
            >
              <span className="mx-auto grid place-items-center w-14 h-14 rounded-full bg-accent-soft text-primary mb-5">
                <Icon size={26} strokeWidth={1.75} />
              </span>
              <h3 className="text-h3 text-neutral-900">{title}</h3>
              <p className="text-body text-neutral-500 mt-3">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
