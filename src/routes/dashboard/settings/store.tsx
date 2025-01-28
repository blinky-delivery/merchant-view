import { useStoreSites } from '@/api/storeApi'
import EditButton from '@/components/edit-button'
import SectionHeader from '@/components/navigation/section-header'
import StoreMockup from '@/components/store-mockup'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigationStore } from '@/state/store'
import { Link } from '@tanstack/react-router'
import { createFileRoute, useRouteContext } from '@tanstack/react-router'
import { MapPin, Phone } from 'lucide-react'

export const Route = createFileRoute('/dashboard/settings/store')({
  staticData: {
    title: 'Store Settings'
  },
  component: RouteComponent,
})

function RouteComponent() {
  const context = useRouteContext({ from: '/dashboard' })
  const storeId = context.storeId as string

  const { data: sites, isLoading: sitesLoading } = useStoreSites(storeId)
  const activeSite = useNavigationStore((state) => state.storeSite)


  if (!sites || !activeSite || sitesLoading) {
    return null
  }

  const currentActiveSite = sites.find((site) => site.id == activeSite.id)

  if (!currentActiveSite) return null

  return (
    <div className='flex flex-col space-y-8'>
      <div className='flex flex-col space-y-4'>
        <Card>
          <CardHeader>
            <CardTitle className='text-xl'>
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold">{currentActiveSite.name}</h2>
                <Link to='/dashboard/settings/site/$id' params={{ id: currentActiveSite.id }}>
                  <EditButton />
                </Link>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className='space-y-2'>
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-gray-500 mr-2 mt-1 flex-shrink-0" />
              <p className="text-base text-muted-foreground">{currentActiveSite.address}</p>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />
              <p className="text-base text-muted-foreground">{currentActiveSite.phone}</p>
            </div>
          </CardContent>

        </Card>
      </div>

      <div className='flex flex-col space-y-8'>
        <SectionHeader title='Store Logo and Header' subtitle='This will be applied to all of your sites on Blinky to highlight your brand' />

        <div className='mx-auto'>
          <StoreMockup storeName={currentActiveSite.name} />
        </div>

      </div>

    </div>
  )
}
