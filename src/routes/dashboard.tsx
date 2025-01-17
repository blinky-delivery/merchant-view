import { userApi, useStoreUser } from '@/api/userApi'
import { queryClient } from '@/main'
import { createFileRoute, Outlet, useChildMatches, useMatchRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
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

  const { data, isLoading } = useStoreUser()
  const navigate = useNavigate()
  const matchRoute = useMatchRoute()
  if (data && !isLoading) {
    // if (data.storeId) {
    //   if (!matchRoute({ to: '/dashboard/store', })) {
    //     navigate({ to: '/dashboard/store' })
    //   }
    // } else {
    //   if (!matchRoute({ to: '/dashboard/apply' })) {
    //     navigate({ to: '/dashboard/apply' })
    //   }
    // }
  }

  return <Outlet />

}