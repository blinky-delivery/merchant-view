import { createFileRoute, useRouteContext } from '@tanstack/react-router'
import { useMenus } from '@/api/menuApi'
import MenuCard from '@/components/menu/menu-card'
import { useStoreSites } from '@/api/storeApi'
import CreateMenuForm from '@/components/forms/create-menu-form'
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
      {/* <div className="flex justify-between">
        <SectionHeader title='Menus' subtitle='Here you can manage your menus' />
        <CreateMenuForm sites={sites} storeId={storeId} />
      </div> */}
      <div className="flex flex-col space-y-8">
        {menus?.map((menu) => (
          <MenuCard sites={sites} menu={menu} storeId={storeId} />
        ))}
      </div>
    </div>
  )
}
