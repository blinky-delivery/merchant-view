import * as React from "react"
import {
    BookOpen,
    Bot,
    Frame,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
} from "lucide-react"
import { NavMain } from "@/components/navigation/nav-main"
import { NavProjects } from "@/components/navigation/nav-projects"
import { NavUser } from "@/components/navigation/nav-user"
import { SiteSwitcher } from "@/components/navigation/SiteSwitcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { User, useStoreUser } from "@/api/userApi"
import { StoreSite, useStoreSites } from "@/api/storeApi"
import { useMenus } from "@/api/menuApi"
// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Analytics",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "History",
                    url: "#",
                },
                {
                    title: "Starred",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "Menus",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Orders",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    storeId: string
    user: User
    sites: StoreSite[]
}

export function AppSidebar({ storeId, ...props }: AppSidebarProps) {
    const { data: userData } = useStoreUser()

    if (userData === undefined) return null
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <div className="flex gap-2 mx-auto py-2 items-center  text-orange-600">
                    <img src="/blinky_orange.png" className="w-10" />
                    {/* <p className="font-semibold mt-5 text-3xl">Linky</p> */}
                </div>
                <SiteSwitcher sites={props.sites} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain storeId={storeId} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={{
                    email: userData.email,
                    name: userData.fullName,
                    avatar: '',
                }} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}