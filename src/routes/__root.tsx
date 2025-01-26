import { Toaster } from "@/components/ui/toaster";
import { SignOutButton, useSession, } from "@clerk/clerk-react";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export interface RouterContext {
    isSignedIn: boolean
    storeId?: string
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: () => {
        const { isSignedIn } = useSession()
        return (
            <>
                <Toaster />
                <Outlet />
                {isSignedIn && <SignOutButton>Signout</SignOutButton>}
                <TanStackRouterDevtools />
            </>
        )
    }
})