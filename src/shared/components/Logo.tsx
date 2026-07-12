import { Car } from 'lucide-react'
import { Link } from 'react-router-dom'

type LogoProps = {
  variant?: 'dark' | 'light'
  to?: string | null
  className?: string
}

export default function Logo({ variant = 'dark', to = '/', className = '' }: LogoProps) {
  const textClass = variant === 'light' ? 'text-neutral-0' : 'text-neutral-900'

  const content = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className="grid place-items-center w-9 h-9 rounded-full shrink-0 text-white bg-primary"
        aria-hidden
      >
        <Car size={18} strokeWidth={2.25} />
      </span>
      <span className={`text-h3 font-bold tracking-tight ${textClass}`}>WebcarsMotors</span>
    </span>
  )

  if (to) {
    return (
      <Link to={to} className="shrink-0 w-fit" aria-label="WebcarsMotors — início">
        {content}
      </Link>
    )
  }

  return content
}
