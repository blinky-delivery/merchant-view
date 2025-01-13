import { userApi, useStoreUser } from '@/api/userApi'
import { queryClient } from '@/main'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  loader: () => queryClient.ensureQueryData({ queryKey: ['user'], queryFn: userApi.getUser })
})

function RouteComponent() {

  const { data, isLoading } = useStoreUser()
  const navigate = useNavigate()

  if (data && !isLoading) {
    console.log(data.message)
    if (data.data.storeId) {
      navigate({ to: '/dashboard/store' })
    } else {
      navigate({ to: '/dashboard/apply' })
    }
  }

  return <Outlet />

}