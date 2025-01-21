import { useSite } from '@/api/storeApi'
import EditSiteForm from '@/components/forms/edit-site-form'
import { createFileRoute } from '@tanstack/react-router'



export const Route = createFileRoute('/dashboard/settings/site/$id')({
    staticData: {
        title: "Site Settings"
    },
    component: RouteComponent,

})

function RouteComponent() {
    const { id: siteId } = Route.useParams()

    const { data: site, isLoading: siteLoading } = useSite(siteId)

    return <div className='flex flex-col space-y-8'>
        {site && <EditSiteForm site={site} />}

    </div>
}
