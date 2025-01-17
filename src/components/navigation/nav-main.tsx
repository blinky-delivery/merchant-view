import { ChevronRight, MenuIcon, Plus, type LucideIcon } from "lucide-react"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useMenus } from "@/api/menuApi"
import { Link } from "@tanstack/react-router"

interface NavMainPorps {
    storeId: string,
}

export function NavMain({
    storeId,
}: NavMainPorps) {
    const { data: menus, isLoading: menusLoading } = useMenus(storeId)

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                <Collapsible
                    key={'menus'}
                    asChild
                    defaultOpen={false}
                    className="group/collapsible"
                >
                    <SidebarMenuItem className="text-slate-900">
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton className="font-semibold" tooltip={'Menus'}>
                                <MenuIcon />
                                <span>Menus</span>
                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <SidebarMenuSub>
                                {menus?.map((menu) => (
                                    <SidebarMenuSubItem key={menu.id}>
                                        <SidebarMenuSubButton asChild>
                                            <Link to="/dashboard/store/menu/$menuId" params={{ menuId: menu.id }}>
                                                <span className="font-semibold text-slate-900" >{menu.name}</span>
                                            </Link>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                ))}
                                <SidebarMenuSubItem key={'create'}>
                                    <SidebarMenuSubButton asChild>
                                        <Link to="/dashboard/store/menu/create">
                                            <div className="flex text-orange-600 items-center gap-2">
                                                <Plus className="size-4" />  <span className=" font-semibold">Create a menu</span>

                                            </div>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </SidebarMenuItem>
                </Collapsible>

            </SidebarMenu>
        </SidebarGroup>
    )
}
