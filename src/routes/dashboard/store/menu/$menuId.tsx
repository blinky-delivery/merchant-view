import { useMenu, } from '@/api/menuApi'
import EditMenuForm from '@/components/edit-menu-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { createFileRoute } from '@tanstack/react-router'
import { Eye, Settings } from 'lucide-react'

export const Route = createFileRoute('/dashboard/store/menu/$menuId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { menuId } = Route.useParams()
  const { data: menu, isLoading: menuLoading } = useMenu(menuId)


  if (menuLoading) {
    return <p>Loading...</p>
  }

  if (!menu) {
    return <p>Menu not found</p>
  }

  return (
    <div>
      <div className='flex space-y-6 justify-between'>
        <div className='space-y-4'>
          <h2 className="text-2xl font-bold tracking-tight">{menu.name}</h2>
          <h3 className="text-1xl tracking-tight">{menu.description}</h3>
        </div>
        <div className='flex space-x-4'>
          <Eye />
          <EditMenuForm menu={menu} />
        </div>
      </div>
      <Separator className='my-4' />

    </div>
  )
}
