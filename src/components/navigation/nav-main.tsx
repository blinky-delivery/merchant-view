import { BookOpenText, ChevronRight, LayoutDashboard, MapPin, Settings, Settings2, Store } from "lucide-react"
import {
    SidebarGroup,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Link } from "@tanstack/react-router"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
interface NavMainPorps {
    storeId: string,
}

export function NavMain({
    storeId,
}: NavMainPorps) {

    return (
        <SidebarGroup>
            <Link to='/dashboard'>
                <SidebarMenuButton className="font-semibold" tooltip={'Dashboard'}>
                    <LayoutDashboard />
                    <span>Home</span>
                </SidebarMenuButton>
            </Link>
            <Link to='/dashboard/store'>
                <SidebarMenuButton className="font-semibold" tooltip={'Store'}>
                    <Store />
                    <span>Store</span>
                </SidebarMenuButton>
            </Link>

            <Link to='/dashboard/menu/overview'>
                <SidebarMenuButton className="font-semibold" tooltip={'Menus'}>
                    <BookOpenText />
                    <span>Menu Manager</span>
                </SidebarMenuButton>
            </Link>


            <Collapsible
            >
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="font-semibold" tooltip={'Settings1'}>
                        <Settings2 />
                        <span>{'Settings'}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        <SidebarMenuSubItem key={'store settings'}>
                            <SidebarMenuSubButton asChild>
                                <Link to="/dashboard/settings/store" className="font-semibold"><span>Store Settings</span></Link>
                            </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>

        </SidebarGroup>
    )
}
