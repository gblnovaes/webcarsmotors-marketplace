import { Facebook, Instagram, Phone, Mail } from 'lucide-react'

export default function TopBar() {
  return (
    <div className="bg-neutral-900 text-neutral-300 text-caption">
      <div className="container-content flex items-center justify-between h-9 gap-4">
        <div className="flex items-center gap-4 sm:gap-6 min-w-0">
          <a
            href="tel:1130000000"
            className="inline-flex items-center gap-1.5 hover:text-neutral-0 transition-colors truncate"
          >
            <Phone size={12} strokeWidth={2} className="shrink-0" />
            <span className="hidden sm:inline">(11) 3000-0000</span>
          </a>
          <a
            href="mailto:contato@webcarsmotors.com.br"
            className="inline-flex items-center gap-1.5 hover:text-neutral-0 transition-colors truncate"
          >
            <Mail size={12} strokeWidth={2} className="shrink-0" />
            <span className="hidden md:inline">contato@webcarsmotors.com.br</span>
          </a>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="#"
            aria-label="Facebook"
            className="grid place-items-center w-7 h-7 rounded-sm hover:bg-neutral-800 hover:text-neutral-0 transition-colors"
          >
            <Facebook size={14} strokeWidth={1.75} />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="grid place-items-center w-7 h-7 rounded-sm hover:bg-neutral-800 hover:text-neutral-0 transition-colors"
          >
            <Instagram size={14} strokeWidth={1.75} />
          </a>
        </div>
      </div>
    </div>
  )
}
