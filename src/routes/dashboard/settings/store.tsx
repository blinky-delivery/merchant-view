import { useStoreSites } from '@/api/storeApi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'
import { createFileRoute, useRouteContext } from '@tanstack/react-router'
import { Edit2 } from 'lucide-react'

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


  if (!sites || sitesLoading) {
    return null
  }

  return (
    <div className='flex flex-col space-y-8'>

      <div className='flex flex-col space-y-1'>
        <h2 className='font-semibold text-xl'> Store Logo and Header</h2>
        <div className='text-base text-muted-foreground'>This will be applied to all of your sites on Blinky to highlight your brand</div>
      </div>

      <div className='flex flex-col space-y-4'>
        <div className='font-semibold text-xl'>
          Sites
        </div>
        {sites.map((site) => (
          <Card className='relative'>
            <CardHeader>
              <CardTitle className='text-xl'>{site.name}</CardTitle>
              <CardDescription>{site.address}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link to='/dashboard/settings/site/$id' params={{ id: site.id }}><Button>Edit Settings</Button></Link>
            </CardFooter>
          </Card>
        ))}
      </div>

    </div>
  )
}
