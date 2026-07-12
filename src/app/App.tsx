import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/features/auth/context/AuthContext'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { VehiclesProvider } from '@/features/vehicles/context/VehiclesContext'
import { ClientsProvider } from '@/features/clients/context/ClientsContext'
import { MarketplaceFiltersProvider } from '@/features/vehicles/context/MarketplaceFiltersContext'
import Home from '@/features/vehicles/pages/Home'
import Login from '@/features/auth/pages/Login'
import AdminLayout from '@/features/admin/pages/AdminLayout'
import AdminVehicles from '@/features/admin/pages/AdminVehicles'
import AdminClients from '@/features/admin/pages/AdminClients'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <VehiclesProvider>
          <ClientsProvider>
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
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminVehicles />} />
                <Route path="clientes" element={<AdminClients />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ClientsProvider>
        </VehiclesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
