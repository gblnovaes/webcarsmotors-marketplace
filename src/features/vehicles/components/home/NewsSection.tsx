const POSTS = [
  {
    tag: 'Mercado',
    title: 'Toyota Hilux 2024: Vale a Pena?',
    excerpt: 'Analisamos desempenho, consumo e custo de manutenção da picape mais desejada do Brasil.',
    image:
      'https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?w=800&q=80&auto=format&fit=crop',
  },
  {
    tag: 'Dicas',
    title: 'Como Negociar o Melhor Preço',
    excerpt: 'Passo a passo para avaliar o anúncio, inspecionar o veículo e fechar com segurança.',
    image:
      'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&q=80&auto=format&fit=crop',
  },
  {
    tag: 'Lançamentos',
    title: 'SUVs Híbridos em Alta',
    excerpt: 'Os modelos que estão dominando o mercado e o que esperar de autonomia e economia.',
    image:
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80&auto=format&fit=crop',
  },
]

export default function NewsSection() {
  return (
    <section id="novidades" className="bg-neutral-0 py-14 md:py-20 scroll-mt-20">
      <div className="container-content">
        <h2 className="text-h1 text-neutral-900 text-center mb-10">Novidades & Avaliações</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.map((post) => (
            <article
              key={post.title}
              className="rounded-lg overflow-hidden border border-neutral-200 shadow-sm bg-neutral-0 flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
                <img src={post.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-overline uppercase text-primary">{post.tag}</span>
                <h3 className="text-h3 text-neutral-900 mt-2">{post.title}</h3>
                <p className="text-body text-neutral-500 mt-2 flex-1">{post.excerpt}</p>
                <a href="#" className="text-label text-primary font-semibold mt-4 hover:underline">
                  Ler Mais →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
