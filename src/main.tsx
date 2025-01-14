import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ClerkProvider, useSession } from '@clerk/clerk-react'
import './index.css'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a new router instance
const router = createRouter({ routeTree, context: { isSignedIn: false } })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const queryClient = new QueryClient()

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}


function AuthenticatedRouterProvider() {
  const { isLoaded, isSignedIn } = useSession()
  if (!isLoaded) return null
  return <RouterProvider router={router} context={{ isSignedIn }} />
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <QueryClientProvider client={queryClient}>
          <AuthenticatedRouterProvider />
        </QueryClientProvider>
      </ClerkProvider>
    </StrictMode>,
  )
}