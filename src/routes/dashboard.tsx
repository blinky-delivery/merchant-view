import { useMerchantStore, useStoreSites } from '@/api/storeApi'
import { userApi, useStoreUser } from '@/api/userApi'
import ImageEditorDialog from '@/components/image-editor-dialog'
import { AppSidebar } from '@/components/navigation/app-sidebar'
import SelectImageDialog from '@/components/select-image-dialog'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { queryClient } from '@/main'
import { createFileRoute, Outlet, useMatches, useMatchRoute, useNavigate, useRouteContext } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  staticData: {
    title: 'Dashboard'
  },
  component: RouteComponent,
  beforeLoad: async () => {
    try {
      const userQuery = await queryClient.fetchQuery({
        queryKey: ['user'], queryFn: async () => {
          const response = await userApi.getUser()
          return response.data
        }
      })
      return {
        storeId: userQuery.storeId
      }
    } catch (error) {
      console.log(error)
    }
  }
})

function RouteComponent() {

  const navigate = useNavigate()
  const matchRoute = useMatchRoute()
  const context = useRouteContext({ from: '/dashboard' })
  const storeId = context.storeId as string

  const {
    data: store,
    error: storeError,
    isLoading: storeLoading,
  } = useMerchantStore(storeId)
  const {
    data: sites,
    error: sitesError,
    isLoading: sitesLoading,
  } = useStoreSites(storeId)
  const {
    data: user,
    error: userError,
    isLoading: userLoading,
  } = useStoreUser()

  const matches = useMatches()

  if (storeLoading || sitesLoading || userLoading) {
    return <div>Loading...</div>
  }

  if (storeError || sitesError || userError) {
    return <div>Error loading data</div>
  }

  if (!store || !sites || !user) {
    return <div>Data is not available</div>
  }

  const getHeaderTitle = () => {
    return matches.at(-1)?.staticData?.title
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar sites={sites} storeId={storeId} user={user} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <h1 className="text-2xl font-semibold">{getHeaderTitle()}</h1>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-8 bg-[#f7faf9]">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
      <SelectImageDialog />
      <ImageEditorDialog />
    </>
  )


}