import { useMerchantStore, useStoreSites } from '@/api/storeApi'
import { useStoreUser } from '@/api/userApi'
import { AppSidebar } from '@/components/navigation/app-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { createFileRoute, Outlet, useRouteContext, } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/store')({
    component: RouteComponent,
})

function RouteComponent() {

    const context = useRouteContext({ from: '/dashboard' })
    const storeId = context.storeId as string

    const { data: store, error: storeError, isLoading: storeLoading } = useMerchantStore(storeId)
    const { data: sites, error: sitesError, isLoading: sitesLoading } = useStoreSites(storeId)
    const { data: user, error: userError, isLoading: userLoading } = useStoreUser()

    if (storeLoading || sitesLoading || userLoading) {
        return <div>Loading...</div>
    }

    if (storeError || sitesError || userError) {
        return <div>Error loading data</div>
    }

    if (!store || !sites || !user) {
        return <div>Data is not available</div>
    }
    return (
        <SidebarProvider>
            <AppSidebar sites={sites} storeId={storeId} user={user} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />

                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-8 pt-0 bg-[#f7faf9]">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )

}
