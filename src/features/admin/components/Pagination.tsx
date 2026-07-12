type PaginationProps = {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null
  const nums: number[] = []
  for (let i = 1; i <= Math.min(3, totalPages); i++) nums.push(i)
  const showEllipsis = totalPages > 4

  return (
    <div className="flex items-center gap-1.5">
      {nums.map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`min-w-[36px] h-9 px-2 rounded-md text-label tnum transition-colors ${
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
          className={`min-w-[36px] h-9 px-2 rounded-md text-label tnum transition-colors ${
            totalPages === page
              ? 'bg-primary text-neutral-0'
              : 'bg-neutral-0 border border-neutral-200 text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          {totalPages}
        </button>
      )}
    </div>
  )
}
