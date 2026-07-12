import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/context/AuthContext'
import type { ReactNode } from 'react'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading, isAdmin } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-neutral-50 text-neutral-500">
        Carregando...
      </div>
    )
  }

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}
