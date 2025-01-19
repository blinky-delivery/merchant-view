import { createFileRoute, Link, useRouteContext } from '@tanstack/react-router'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useMenus } from '@/api/menuApi'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import MenuCard from '@/components/menu/menu-card'

export const Route = createFileRoute('/dashboard/store/menu/overview')({
    component: RouteComponent,
})

function RouteComponent() {

    const context = useRouteContext({ from: '/dashboard' })
    const storeId = context.storeId as string

    const { data: menus, isLoading: menusLoading } = useMenus(storeId)

    return <div className='flex flex-col space-y-4' >
        <div className='flex justify-between'>
            <h2 className="text-2xl font-bold tracking-tight">Menus</h2>
            <Link to='/dashboard/store/menu/create'>
                <Button className='space-x-1'>
                    <PlusIcon /> <span>Create menu</span>
                </Button>
            </Link>
        </div>
        <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {menus?.map((menu) => (
                <MenuCard key={menu.id} menu={menu} />
            ))}
        </div>
    </div>
}
