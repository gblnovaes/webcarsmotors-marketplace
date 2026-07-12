export default function CtaBanner() {
  const scrollToInventory = () => {
    document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="cta" className="bg-primary scroll-mt-20">
      <div className="container-content py-12 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="max-w-xl">
          <h2 className="text-h1 text-neutral-0">Pronto para Encontrar Seu Próximo Veículo?</h2>
          <p className="text-body text-accent-100 mt-2">
            Explore milhares de opções verificadas e feche negócio com segurança.
          </p>
        </div>
        <button
          type="button"
          onClick={scrollToInventory}
          className="btn bg-neutral-0 text-primary hover:bg-accent-50 shrink-0 px-8"
        >
          Ver Todo o Estoque
        </button>
      </div>
    </section>
  )
}
