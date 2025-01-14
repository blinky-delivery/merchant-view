import { userApi, useStoreUser } from '@/api/userApi'
import { queryClient } from '@/main'
import { createFileRoute, Outlet, useMatchRoute, useNavigate, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  beforeLoad: async () => {
    try {
      const userQuery = await queryClient.fetchQuery({ queryKey: ['user'], queryFn: userApi.getUser })
      return {
        storeId: userQuery.data.storeId
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
    console.log(data.message)
    if (data.data.storeId) {
      if (!matchRoute({ to: '/dashboard/store' })) {
        navigate({ to: '/dashboard/store' })
      }
    } else {
      if (!matchRoute({ to: '/dashboard/apply' })) {
        navigate({ to: '/dashboard/apply' })
      }
    }
  }

  return <Outlet />

}