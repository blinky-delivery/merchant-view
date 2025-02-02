import { createFileRoute, useRouteContext } from '@tanstack/react-router'
import MenuCard from '@/components/menu/menu-card'
import { StoreSite, useStoreSites } from '@/api/storeApi'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SectionHeader from '@/components/navigation/section-header'
import ModifierForm from '@/components/forms/modifier-form'
import { useNavigationStore } from '@/state/store'
import ModifiersTable from '@/components/menu/modifiers-table'
import { useSiteMenu } from '@/api/menuApi'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

export const Route = createFileRoute('/dashboard/menu/overview')({
  staticData: {
    title: 'Menu Manager'
  },
  component: RouteComponent,
})

function RouteComponent() {
  const context = useRouteContext({ from: '/dashboard' })
  const storeId = context.storeId as string

  const { data: sites, isLoading: sitesLoading } = useStoreSites(storeId)

  const activeSite = useNavigationStore((state) => state.storeSite)


  if (!sites || !activeSite) return null

  return (
    <MneuSiteWrapper
      sites={sites}
      activeSite={activeSite}
      storeId={storeId}
    />
  )
}

type MneuSiteWrapperProps = {
  activeSite: StoreSite;
  storeId: string
  sites: StoreSite[]
};

const MneuSiteWrapper: React.FC<MneuSiteWrapperProps> = ({ activeSite, storeId, sites }) => {
  const { data: menu, isLoading: menuisLoading } = useSiteMenu(activeSite.id)

  if (!menu) return null

  return (
    <div className="flex flex-col space-y-4">
      <Tabs defaultValue='overview' className='w-full'>
        <TabsList className="grid w-full grid-cols-2 mb-4 h-14 text-lg">
          <TabsTrigger value="overview" className='h-12 text-lg'>Overview </TabsTrigger>
          <TabsTrigger value="modifiers" className='h-12 text-lg'>Modifiers</TabsTrigger>
        </TabsList>
        <TabsContent value='overview'>
          <div className="flex flex-col space-y-8">
            <MenuCard sites={sites} storeId={storeId} activeSite={activeSite} />
          </div>
        </TabsContent>
        <TabsContent value='modifiers'>
          <div className='flex flex-col py-4 space-y-8'>
            <div className='flex justify-between items-center'>
              <SectionHeader title='Modifiers' />
              <ModifierForm menuId={menu.id} site={activeSite} storeId={storeId} >
                <Button className="space-x-1">
                  <PlusIcon /> <span>New Modifier</span>
                </Button>
              </ModifierForm>
            </div>
            <ModifiersTable menu={menu} storeSite={activeSite} />
          </div>
        </TabsContent>
      </Tabs>

    </div>
  );
};