import { useState, type FormEvent } from 'react'
import { Facebook, Instagram, Youtube, Send } from 'lucide-react'
import Logo from './Logo'

const QUICK_LINKS = [
  { label: 'Início', href: '/' },
  { label: 'Estoque', href: '/#inventory' },
  { label: 'Como funciona', href: '/#como-funciona' },
  { label: 'Novidades', href: '/#novidades' },
  { label: 'Contato', href: '/#footer' },
]

export default function Footer() {
  const [email, setEmail] = useState('')

  const onNewsletter = (e: FormEvent) => {
    e.preventDefault()
    setEmail('')
  }

  return (
    <footer id="footer" className="bg-neutral-900 text-neutral-400 scroll-mt-20">
      <div className="container-content py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Logo variant="light" className="mb-4" />
            <p className="text-caption leading-relaxed max-w-xs">
              O melhor lugar para comprar e vender veículos novos e seminovos com transparência e
              as melhores condições do mercado.
            </p>
            <div className="flex items-center gap-2 mt-5">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid place-items-center w-9 h-9 rounded-md bg-neutral-800 text-neutral-300 hover:bg-primary hover:text-neutral-0 transition-colors"
                  aria-label="Rede social"
                >
                  <Icon size={16} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-label text-neutral-0 mb-4">Links Rápidos</h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-caption hover:text-neutral-0 transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-label text-neutral-0 mb-4">Atendimento</h4>
            <ul className="space-y-2.5 text-caption">
              <li>(11) 3000-0000</li>
              <li>contato@webcarsmotors.com.br</li>
              <li>Av. Paulista, 1000 — São Paulo, SP</li>
              <li>Seg–Sáb: 9h às 18h</li>
            </ul>
          </div>

          <div>
            <h4 className="text-label text-neutral-0 mb-4">Newsletter</h4>
            <p className="text-caption mb-3">Receba ofertas e novidades do estoque.</p>
            <form onSubmit={onNewsletter} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu e-mail"
                className="input flex-1 !bg-neutral-800 !border-neutral-700 !text-neutral-0 placeholder:!text-neutral-500"
              />
              <button type="submit" className="btn btn-primary !px-3" aria-label="Inscrever">
                <Send size={16} strokeWidth={1.75} />
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-neutral-800">
          <p className="text-caption">© 2026 WebCars Motors. Todos os direitos reservados.</p>
          <div className="flex gap-4 text-caption">
            <a href="#" className="hover:text-neutral-0 transition-colors">
              Políticas de Privacidade
            </a>
            <a href="#" className="hover:text-neutral-0 transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
