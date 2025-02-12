import { SiteStatus } from '@/api/storeApi'
import SiteHours from '@/components/availability/SiteHours'
import { SiteStatusCard } from '@/components/availability/SiteStatusCard'
import { Button } from '@/components/ui/button'
import { useNavigationStore } from '@/state/store'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/availability/')({
    component: RouteComponent,

    staticData: {
        title: 'Store Availability'
    }
})

function RouteComponent() {
    const { storeSite } = useNavigationStore()

    if (!storeSite) return null

    return <div className='flex flex-col space-y-8 p-4'>
        <h2 className='text-2xl font-semibold'>
            Marketplace Status
        </h2>
        <SiteStatusCard status={SiteStatus.OPEN} details="Available and Accepting Orders" />
        <SiteStatusCard status={SiteStatus.PAUSED} details="Paused until 8:10 PM MDT on 5/24/2022." />
        <SiteStatusCard status={SiteStatus.CLOSED} details="Will be available again on Tuesday at 4:00 PM PDT." />
        <SiteStatusCard status={SiteStatus.INACTIVE} />

        <div className='flex flex-col space-y-4 max-w-lg'>
            <div className='flex flex-row justify-between'>
                <div className='space-y-2'>
                    <h2 className='text-2xl font-semibold'>
                        Regular Menu Hours
                    </h2>
                    <h4 className='text-muted-foreground'>
                        These are the hours your store is available on Blinky
                    </h4>
                </div>
                <Button>Edit</Button>
            </div>
            <SiteHours site={storeSite} />
        </div>
    </div>

}
