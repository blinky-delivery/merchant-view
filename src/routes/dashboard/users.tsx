import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/users')({
    component: RouteComponent,
    staticData: {
        title: 'Manage Users'
    }
})

function RouteComponent() {
    return <div>Hello "/dashboard/users"!</div>
}
