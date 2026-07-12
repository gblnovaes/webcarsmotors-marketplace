import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/features/auth/context/AuthContext'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { VehiclesProvider } from '@/features/vehicles/context/VehiclesContext'
import { MarketplaceFiltersProvider } from '@/features/vehicles/context/MarketplaceFiltersContext'
import Home from '@/features/vehicles/pages/Home'
import Login from '@/features/auth/pages/Login'
import Admin from '@/features/admin/pages/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <VehiclesProvider>
          <Routes>
            <Route
              path="/"
              element={
                <MarketplaceFiltersProvider>
                  <Home />
                </MarketplaceFiltersProvider>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </VehiclesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
