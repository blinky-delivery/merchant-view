import { createFileRoute, useRouteContext } from '@tanstack/react-router'
import { useMenus } from '@/api/menuApi'
import MenuCard from '@/components/menu/menu-card'
import { useStoreSites } from '@/api/storeApi'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SectionHeader from '@/components/navigation/section-header'

export const Route = createFileRoute('/dashboard/menu/overview')({
  staticData: {
    title: 'Menu Manager'
  },
  component: RouteComponent,
})

function RouteComponent() {
  const context = useRouteContext({ from: '/dashboard' })
  const storeId = context.storeId as string

  const { data: menus, isLoading: menusLoading } = useMenus(storeId)
  const { data: sites, isLoading: sitesLoading } = useStoreSites(storeId)

  if (!sites || !menus) return null

  return (
    <div className="flex flex-col space-y-4">
      <Tabs defaultValue='overview' className='w-full'>
        <TabsList className="grid w-full grid-cols-2 mb-4 h-14 text-lg">
          <TabsTrigger value="overview" className='h-12 text-lg'>Overview </TabsTrigger>
          <TabsTrigger value="modifiers" className='h-12 text-lg'>Modifiers</TabsTrigger>
        </TabsList>
        <TabsContent value='overview'>
          <div className="flex flex-col space-y-8">
            {menus?.map((menu) => (
              <MenuCard key={menu.id} sites={sites} menu={menu} storeId={storeId} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value='modifiers'>
          <div className='flex flex-col py-4'>
            <SectionHeader title='Modifiers' subtitle='Here you can manage your menu modifers for customizable menu items' />
          </div>
        </TabsContent>
      </Tabs>


    </div>
  )
}
