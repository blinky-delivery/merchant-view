import * as React from "react"
import { ChevronsUpDown, GalleryVerticalEnd, Plus, Store } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { StoreSite } from "@/api/storeApi"

export function SiteSwitcher({
    sites,
}: {
    sites: StoreSite[]
}) {
    const { isMobile } = useSidebar()
    const [activeSite, setActiveSite] = React.useState<StoreSite | null>(sites[0])

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                <Store className="size-4" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {activeSite == null ? "Business view" : activeSite.siteName}
                                </span>
                                {activeSite != null ? <span className="truncate text-xs">{activeSite.address}</span> : null}
                            </div>
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        {activeSite != null && (
                            <DropdownMenuItem className="">
                                <p className="font-semibold mx-auto text-orange-600">
                                    Switch to business view
                                </p>

                            </DropdownMenuItem>
                        )}
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                            Select a site for store view
                        </DropdownMenuLabel>
                        {sites.map((site, index) => (
                            <DropdownMenuItem
                                key={site.siteName}
                                onClick={() => setActiveSite(site)}
                                className="gap-2 p-2"
                            >
                                <div className="flex size-6 items-center justify-center rounded-sm border">
                                    <Store className="size-4 shrink-0 " />
                                </div>
                                {site.siteName}
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 p-2">
                            <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                <Plus className="size-4" />
                            </div>
                            <div className="font-medium text-muted-foreground">Add a location</div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
