const COLUMNS = [
  {
    title: 'Comprar',
    links: ['Carros usados', 'Carros novos', 'Leilões ao vivo', 'Financiamento', 'Simulador'],
  },
  {
    title: 'Vender',
    links: ['Anunciar veículo', 'Avaliação grátis', 'Venda garantida', 'Para lojistas'],
  },
  {
    title: 'Empresa',
    links: ['Sobre a WebcarsMotors', 'Carreiras', 'Imprensa', 'Contato'],
  },
  {
    title: 'Suporte',
    links: ['Central de ajuda', 'Segurança', 'Termos de uso', 'Privacidade'],
  },
]

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400">
      <div className="container-content py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="grid place-items-center w-8 h-8 rounded-md bg-neutral-0 text-neutral-900 text-h3 font-bold">
                W
              </span>
              <span className="text-h3 font-bold text-neutral-0">WebcarsMotors</span>
            </div>
            <p className="text-caption leading-relaxed max-w-[220px]">
              Marketplace de veículos com transparência total, laudo verificado e financiamento
              rápido.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-label text-neutral-0 mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-caption hover:text-neutral-0 transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-neutral-800">
          <p className="text-caption">© 2026 WebcarsMotors. Todos os direitos reservados.</p>
          <p className="text-caption">Feito com o design system WebcarsMotors.</p>
        </div>
      </div>
    </footer>
  )
}
