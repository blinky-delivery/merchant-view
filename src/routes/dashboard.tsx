import { useStoreUser } from '@/api/userApi'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
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