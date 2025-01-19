import { BookOpenText, MapPin } from "lucide-react"
import {
    SidebarGroup,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Link } from "@tanstack/react-router"
interface NavMainPorps {
    storeId: string,
}

export function NavMain({
    storeId,
}: NavMainPorps) {

    return (
        <SidebarGroup>
            <SidebarMenuButton className="font-semibold" tooltip={'Menus'}>
                <MapPin />
                <span>Sites</span>
            </SidebarMenuButton>
            <Link to='/dashboard/store/menu/overview'>
                <SidebarMenuButton className="font-semibold" tooltip={'Menus'}>
                    <BookOpenText />
                    <span>Menu Manager</span>
                </SidebarMenuButton>
            </Link>


        </SidebarGroup>
    )
}
