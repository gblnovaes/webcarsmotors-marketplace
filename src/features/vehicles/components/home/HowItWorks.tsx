const STEPS = [
  {
    n: '01',
    title: 'Busque seu Veículo',
    text: 'Use filtros por marca, modelo, ano e preço para encontrar opções que combinam com você.',
  },
  {
    n: '02',
    title: 'Compare e Escolha',
    text: 'Analise fotos, equipamentos e histórico. Compare anúncios lado a lado com transparência.',
  },
  {
    n: '03',
    title: 'Feche o Negócio',
    text: 'Fale com o vendedor, agende test drive e conclua a compra com segurança e suporte.',
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-neutral-50 py-14 md:py-20 scroll-mt-20">
      <div className="container-content">
        <h2 className="text-h1 text-neutral-900 text-center mb-12">Como Funciona</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 relative">
          <div
            className="hidden md:block absolute top-8 left-[16%] right-[16%] border-t-2 border-dashed border-neutral-300"
            aria-hidden
          />
          {STEPS.map((step) => (
            <div key={step.n} className="relative text-center px-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary text-neutral-0 grid place-items-center text-h2 font-bold shadow-md relative z-10">
                {step.n}
              </div>
              <h3 className="text-h3 text-neutral-900 mt-5">{step.title}</h3>
              <p className="text-body text-neutral-500 mt-2 max-w-xs mx-auto">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
