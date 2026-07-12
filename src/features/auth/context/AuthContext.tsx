import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getDataSource } from '@/data/repositories'
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/client'

export type AuthUser = {
  id: string
  email: string
  role: 'admin' | 'user'
}

type AuthContextValue = {
  user: AuthUser | null
  loading: boolean
  isAdmin: boolean
  signInWithPassword: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)
const MOCK_SESSION_KEY = 'carriage:auth'

function readMockSession(): AuthUser | null {
  try {
    const raw = sessionStorage.getItem(MOCK_SESSION_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

function writeMockSession(user: AuthUser | null) {
  if (!user) {
    sessionStorage.removeItem(MOCK_SESSION_KEY)
    return
  }
  sessionStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(user))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const useSupabase = getDataSource() === 'supabase' && isSupabaseConfigured()

  useEffect(() => {
    let mounted = true

    async function init() {
      if (!useSupabase) {
        if (mounted) {
          setUser(readMockSession())
          setLoading(false)
        }
        return
      }

      const client = getSupabaseClient()
      const { data } = await client.auth.getSession()
      if (!mounted) return

      const sessionUser = data.session?.user
      if (sessionUser) {
        const role =
          (sessionUser.app_metadata?.role as 'admin' | 'user' | undefined) ?? 'admin'
        setUser({
          id: sessionUser.id,
          email: sessionUser.email ?? '',
          role,
        })
      }
      setLoading(false)

      const { data: sub } = client.auth.onAuthStateChange((_event, session) => {
        if (!session?.user) {
          setUser(null)
          return
        }
        const role =
          (session.user.app_metadata?.role as 'admin' | 'user' | undefined) ?? 'admin'
        setUser({
          id: session.user.id,
          email: session.user.email ?? '',
          role,
        })
      })

      return () => sub.subscription.unsubscribe()
    }

    let cleanup: (() => void) | undefined
    void init().then((fn) => {
      cleanup = fn
    })

    return () => {
      mounted = false
      cleanup?.()
    }
  }, [useSupabase])

  const signInWithPassword = useCallback(
    async (email: string, password: string) => {
      if (!useSupabase) {
        if (!email.trim() || !password.trim()) {
          throw new Error('Informe e-mail e senha')
        }
        const mockUser: AuthUser = {
          id: 'local-admin',
          email: email.trim(),
          role: 'admin',
        }
        writeMockSession(mockUser)
        setUser(mockUser)
        return
      }

      const client = getSupabaseClient()
      const { data, error } = await client.auth.signInWithPassword({ email, password })
      if (error) throw error
      const sessionUser = data.user
      const role =
        (sessionUser.app_metadata?.role as 'admin' | 'user' | undefined) ?? 'admin'
      setUser({
        id: sessionUser.id,
        email: sessionUser.email ?? email,
        role,
      })
    },
    [useSupabase],
  )

  const signOut = useCallback(async () => {
    if (!useSupabase) {
      writeMockSession(null)
      setUser(null)
      return
    }
    const client = getSupabaseClient()
    const { error } = await client.auth.signOut()
    if (error) throw error
    setUser(null)
  }, [useSupabase])

  const value = useMemo(
    () => ({
      user,
      loading,
      isAdmin: user?.role === 'admin',
      signInWithPassword,
      signOut,
    }),
    [user, loading, signInWithPassword, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
