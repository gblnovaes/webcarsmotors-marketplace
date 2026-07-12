import { useState, type FormEvent } from 'react'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Logo from '@/shared/components/Logo'
import { useAuth } from '@/features/auth/context/AuthContext'
import { getDataSource } from '@/data/repositories'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isAdmin, signInWithPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const from = (location.state as { from?: string } | null)?.from ?? '/admin'
  const isLocal = getDataSource() === 'local'

  if (user && isAdmin) {
    return <Navigate to={from} replace />
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signInWithPassword(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao entrar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden lg:block bg-neutral-900 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'linear-gradient(180deg, rgba(15,20,25,.3) 0%, rgba(15,20,25,.85) 100%), url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80&auto=format&fit=crop) center/cover',
          }}
        />
        <div className="relative h-full flex flex-col justify-between p-12">
          <Logo variant="light" />
          <div>
            <h2 className="text-h1 text-neutral-0 max-w-sm">Painel do lojista</h2>
            <p className="text-body-l text-neutral-300 mt-3 max-w-sm">
              Gerencie seu estoque, publique veículos e acompanhe leilões em um só lugar.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 bg-neutral-50">
        <form onSubmit={(e) => void submit(e)} className="w-full max-w-sm">
          <div className="lg:hidden mb-8">
            <Logo variant="dark" />
          </div>

          <h1 className="text-h1 text-neutral-900">Entrar</h1>
          <p className="text-body text-neutral-500 mt-2">
            Acesse a área administrativa para gerenciar seus veículos.
          </p>

          <div className="mt-8 space-y-4">
            <label className="block">
              <span className="text-label text-neutral-600 mb-1.5 block">E-mail</span>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                  size={18}
                  strokeWidth={1.75}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-10"
                  placeholder="voce@loja.com.br"
                  required
                />
              </div>
            </label>

            <label className="block">
              <span className="text-label text-neutral-600 mb-1.5 block">Senha</span>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                  size={18}
                  strokeWidth={1.75}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </label>
          </div>

          {error && <p className="text-caption text-error mt-4">{error}</p>}

          <button type="submit" className="btn btn-primary w-full mt-8" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
            <ArrowRight size={18} strokeWidth={1.75} />
          </button>

          <p className="text-caption text-neutral-400 text-center mt-4">
            {isLocal
              ? 'Modo local: qualquer e-mail/senha válidos abrem o painel.'
              : 'Use as credenciais do Supabase Auth com role admin.'}
          </p>
          <Link to="/" className="text-label text-primary hover:text-primary-hover block text-center mt-6">
            ← Voltar ao site
          </Link>
        </form>
      </div>
    </div>
  )
}
