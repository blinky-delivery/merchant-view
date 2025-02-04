import { SiteStatus } from '@/api/storeApi'
import { SiteStatusCard } from '@/components/availability/SiteStatusCard'
import SectionHeader from '@/components/navigation/section-header'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/availability/')({
    component: RouteComponent,

    staticData: {
        title: 'Store Availability'
    }
})

function RouteComponent() {
    return <div className='flex flex-col space-y-8 p-4'>
        <h2 className='text-2xl font-semibold'>
            Marketplace Status
        </h2>
        <SiteStatusCard status={SiteStatus.OPEN} details="Available and Accepting Orders" />
        <SiteStatusCard status={SiteStatus.PAUSED} details="Paused until 8:10 PM MDT on 5/24/2022." />
        <SiteStatusCard status={SiteStatus.CLOSED} details="Will be available again on Tuesday at 4:00 PM PDT." />
        <SiteStatusCard status={SiteStatus.INACTIVE} />

        <div className='flex flex-row justify-between'>
            <div className='flex flex-col space-y-4'>
                <h2 className='text-2xl font-semibold'>
                    Regular Menu Hours
                </h2>
            </div>
        </div>

    </div>
}
