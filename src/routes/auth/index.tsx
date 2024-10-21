import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/')({
  beforeLoad: async ({ location }) => {

  },
  component: AuthPage,
})

function AuthPage() {
  return <Outlet />
}
