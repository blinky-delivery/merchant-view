import { User } from "@/api/userApi";
import { SignOutButton, useSession, } from "@clerk/clerk-react";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export interface RouterContext {
    isSignedIn: boolean
    user: User | null
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: () => {
        const { isSignedIn } = useSession()
        return (
            <>
                <Outlet />
                {isSignedIn && <SignOutButton>Signout</SignOutButton>}
                <TanStackRouterDevtools />
            </>
        )
    }
})