import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/store')({
  staticData: {
    title: 'Store',
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/store/"!</div>
}
