import { ChevronLeft, ChevronRight } from 'lucide-react'

type PaginationProps = {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

const btnBase =
  'min-w-11 h-11 px-2 rounded-md text-label tnum transition-colors grid place-items-center'

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null
  const nums: number[] = []
  for (let i = 1; i <= Math.min(3, totalPages); i++) nums.push(i)
  const showEllipsis = totalPages > 4

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        aria-label="Página anterior"
        className={`${btnBase} bg-neutral-0 border border-neutral-200 text-neutral-600 hover:bg-neutral-100 disabled:opacity-40 disabled:pointer-events-none`}
      >
        <ChevronLeft size={18} strokeWidth={1.75} />
      </button>
      {nums.map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-label={`Página ${n}`}
          aria-current={n === page ? 'page' : undefined}
          className={`${btnBase} ${
            n === page
              ? 'bg-primary text-neutral-0'
              : 'bg-neutral-0 border border-neutral-200 text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          {n}
        </button>
      ))}
      {showEllipsis && <span className="px-1 text-neutral-400">…</span>}
      {totalPages > 3 && (
        <button
          type="button"
          onClick={() => onChange(totalPages)}
          aria-label={`Página ${totalPages}`}
          aria-current={totalPages === page ? 'page' : undefined}
          className={`${btnBase} ${
            totalPages === page
              ? 'bg-primary text-neutral-0'
              : 'bg-neutral-0 border border-neutral-200 text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          {totalPages}
        </button>
      )}
      <button
        type="button"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        aria-label="Próxima página"
        className={`${btnBase} bg-neutral-0 border border-neutral-200 text-neutral-600 hover:bg-neutral-100 disabled:opacity-40 disabled:pointer-events-none`}
      >
        <ChevronRight size={18} strokeWidth={1.75} />
      </button>
    </div>
  )
}
