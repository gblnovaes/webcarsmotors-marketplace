import { Link, useParams } from 'react-router-dom'
import Header from '@/shared/components/Header'
import Footer from '@/shared/components/Footer'
import TopBar from '@/features/vehicles/components/home/TopBar'
import { useVehicles } from '@/features/vehicles/context/VehiclesContext'
import VehicleBreadcrumb from '@/features/vehicles/components/detail/VehicleBreadcrumb'
import VehicleGallery from '@/features/vehicles/components/detail/VehicleGallery'
import VehicleSummary from '@/features/vehicles/components/detail/VehicleSummary'
import VehicleDetailsTable from '@/features/vehicles/components/detail/VehicleDetailsTable'
import VehicleFeatures from '@/features/vehicles/components/detail/VehicleFeatures'
import VehicleDescription from '@/features/vehicles/components/detail/VehicleDescription'
import VehicleSellerCard from '@/features/vehicles/components/detail/VehicleSellerCard'

export default function VehicleDetail() {
  const { id } = useParams<{ id: string }>()
  const { vehicles, loading, error } = useVehicles()
  const vehicle = vehicles.find((v) => v.id === id)

  const scrollToSeller = () => {
    document.getElementById('vendedor')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <TopBar />
      <Header />
      <main className="flex-1 pb-16">
        <div className="container-content pt-6 md:pt-8">
          {loading && (
            <p className="text-body text-neutral-500 py-20 text-center">Carregando veículo...</p>
          )}

          {!loading && error && (
            <p className="text-body text-error py-20 text-center">{error}</p>
          )}

          {!loading && !error && !vehicle && (
            <div className="py-20 text-center space-y-4">
              <h1 className="text-h2 text-neutral-900">Veículo não encontrado</h1>
              <p className="text-body text-neutral-500">
                Este anúncio pode ter sido removido ou o link está incorreto.
              </p>
              <Link to="/" className="btn btn-primary inline-flex">
                Voltar ao estoque
              </Link>
            </div>
          )}

          {!loading && vehicle && (
            <div className="space-y-8">
              <VehicleBreadcrumb vehicle={vehicle} />

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
                <div className="lg:col-span-3">
                  <VehicleGallery vehicle={vehicle} />
                </div>
                <div className="lg:col-span-2">
                  <VehicleSummary
                    vehicle={vehicle}
                    onContact={scrollToSeller}
                    onTestDrive={scrollToSeller}
                  />
                </div>
              </div>

              <VehicleDetailsTable vehicle={vehicle} />
              <VehicleFeatures vehicle={vehicle} />
              <VehicleDescription vehicle={vehicle} />
              <div id="vendedor">
                <VehicleSellerCard vehicle={vehicle} />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
