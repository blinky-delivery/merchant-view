import { useMenu } from '@/api/menuApi'
import { useStoreSites } from '@/api/storeApi'
import EditMenuForm from '@/components/edit-menu-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { createFileRoute, useRouteContext } from '@tanstack/react-router'
import { Eye, Pencil, Settings } from 'lucide-react'

export const Route = createFileRoute('/dashboard/menu/$menuId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { menuId } = Route.useParams()
  const context = useRouteContext({ from: '/dashboard' })

  const storeId = context.storeId as string

  const { data: menu, isLoading: menuLoading } = useMenu(menuId)
  const { data: sites, isLoading: sitesLoading } = useStoreSites(storeId)

  if (menuLoading || sitesLoading) {
    return <p>Loading...</p>
  }

  if (!menu || !sites) {
    return <p>Menu not found</p>
  }

  return (
    <div>
      <div className="flex space-y-6 justify-between">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">{menu.name}</h2>
          <h3 className="text-1xl tracking-tight">{menu.description}</h3>
        </div>
        <div className="flex space-x-4">
          <EditMenuForm storeId={storeId} sites={sites} menu={menu}>
            <Button className="rounded-full w-14 h-14">
              <Pencil />{' '}
            </Button>
          </EditMenuForm>
        </div>
      </div>
      <Separator className="my-4" />
    </div>
  )
}
