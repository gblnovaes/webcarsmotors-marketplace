const STATS = [
  { value: '12.480', label: 'Veículos disponíveis' },
  { value: '98%', label: 'Aprovação de laudo' },
  { value: '4.9/5', label: 'Avaliação dos clientes' },
  { value: '24h', label: 'Financiamento médio' },
]

export default function StatStrip() {
  return (
    <section className="bg-neutral-900">
      <div className="container-content grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
        {STATS.map((s) => (
          <div key={s.label} className="text-center md:text-left">
            <div className="text-h1 font-bold text-neutral-0 tnum">{s.value}</div>
            <div className="text-caption text-neutral-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
