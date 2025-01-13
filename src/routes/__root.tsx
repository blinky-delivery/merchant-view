import { addJwtToAxios } from "@/api/axiosInstance";
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

        const { isSignedIn, isLoaded, session } = useSession()
        if (isSignedIn && isLoaded) {
            session.getToken({ template: 'store-user' }).then((token) => {
                if (token) addJwtToAxios(token)
            })
        }
        return (
            <>
                <Outlet />
                {isSignedIn && <SignOutButton>Signout</SignOutButton>}
                <TanStackRouterDevtools />
            </>
        )
    }
})