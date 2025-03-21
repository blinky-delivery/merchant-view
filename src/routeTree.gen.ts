/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as DashboardImport } from './routes/dashboard'
import { Route as ApplyImport } from './routes/apply'
import { Route as AuthImport } from './routes/_auth'
import { Route as DashboardUsersImport } from './routes/dashboard/users'
import { Route as DashboardStoreImport } from './routes/apply'
import { Route as AuthSignupImport } from './routes/_auth/signup'
import { Route as AuthLoginImport } from './routes/_auth/login'
import { Route as DashboardAvailabilityIndexImport } from './routes/dashboard/availability/index'
import { Route as DashboardSettingsStoreImport } from './routes/dashboard/settings/store'
import { Route as DashboardMenuOverviewImport } from './routes/dashboard/menu/overview'
import { Route as DashboardSettingsSiteIdImport } from './routes/dashboard/settings/site/$id'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const DashboardRoute = DashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const ApplyRoute = ApplyImport.update({
  id: '/apply',
  path: '/apply',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const DashboardUsersRoute = DashboardUsersImport.update({
  id: '/users',
  path: '/users',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardStoreRoute = DashboardStoreImport.update({
  id: '/store',
  path: '/store',
  getParentRoute: () => DashboardRoute,
} as any)

const AuthSignupRoute = AuthSignupImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => AuthRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AuthRoute,
} as any)

const DashboardAvailabilityIndexRoute = DashboardAvailabilityIndexImport.update(
  {
    id: '/availability/',
    path: '/availability/',
    getParentRoute: () => DashboardRoute,
  } as any,
)

const DashboardSettingsStoreRoute = DashboardSettingsStoreImport.update({
  id: '/settings/store',
  path: '/settings/store',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardMenuOverviewRoute = DashboardMenuOverviewImport.update({
  id: '/menu/overview',
  path: '/menu/overview',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardSettingsSiteIdRoute = DashboardSettingsSiteIdImport.update({
  id: '/settings/site/$id',
  path: '/settings/site/$id',
  getParentRoute: () => DashboardRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/apply': {
      id: '/apply'
      path: '/apply'
      fullPath: '/apply'
      preLoaderRoute: typeof ApplyImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/_auth/login': {
      id: '/_auth/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof AuthImport
    }
    '/_auth/signup': {
      id: '/_auth/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof AuthSignupImport
      parentRoute: typeof AuthImport
    }
    '/dashboard/store': {
      id: '/dashboard/store'
      path: '/store'
      fullPath: '/dashboard/store'
      preLoaderRoute: typeof DashboardStoreImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/users': {
      id: '/dashboard/users'
      path: '/users'
      fullPath: '/dashboard/users'
      preLoaderRoute: typeof DashboardUsersImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/menu/overview': {
      id: '/dashboard/menu/overview'
      path: '/menu/overview'
      fullPath: '/dashboard/menu/overview'
      preLoaderRoute: typeof DashboardMenuOverviewImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/settings/store': {
      id: '/dashboard/settings/store'
      path: '/settings/store'
      fullPath: '/dashboard/settings/store'
      preLoaderRoute: typeof DashboardSettingsStoreImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/availability/': {
      id: '/dashboard/availability/'
      path: '/availability'
      fullPath: '/dashboard/availability'
      preLoaderRoute: typeof DashboardAvailabilityIndexImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/settings/site/$id': {
      id: '/dashboard/settings/site/$id'
      path: '/settings/site/$id'
      fullPath: '/dashboard/settings/site/$id'
      preLoaderRoute: typeof DashboardSettingsSiteIdImport
      parentRoute: typeof DashboardImport
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthLoginRoute: typeof AuthLoginRoute
  AuthSignupRoute: typeof AuthSignupRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthLoginRoute: AuthLoginRoute,
  AuthSignupRoute: AuthSignupRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

interface DashboardRouteChildren {
  DashboardStoreRoute: typeof DashboardStoreRoute
  DashboardUsersRoute: typeof DashboardUsersRoute
  DashboardMenuOverviewRoute: typeof DashboardMenuOverviewRoute
  DashboardSettingsStoreRoute: typeof DashboardSettingsStoreRoute
  DashboardAvailabilityIndexRoute: typeof DashboardAvailabilityIndexRoute
  DashboardSettingsSiteIdRoute: typeof DashboardSettingsSiteIdRoute
}

const DashboardRouteChildren: DashboardRouteChildren = {
  DashboardStoreRoute: DashboardStoreRoute,
  DashboardUsersRoute: DashboardUsersRoute,
  DashboardMenuOverviewRoute: DashboardMenuOverviewRoute,
  DashboardSettingsStoreRoute: DashboardSettingsStoreRoute,
  DashboardAvailabilityIndexRoute: DashboardAvailabilityIndexRoute,
  DashboardSettingsSiteIdRoute: DashboardSettingsSiteIdRoute,
}

const DashboardRouteWithChildren = DashboardRoute._addFileChildren(
  DashboardRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '': typeof AuthRouteWithChildren
  '/apply': typeof ApplyRoute
  '/dashboard': typeof DashboardRouteWithChildren
  '/login': typeof AuthLoginRoute
  '/signup': typeof AuthSignupRoute
  '/dashboard/store': typeof DashboardStoreRoute
  '/dashboard/users': typeof DashboardUsersRoute
  '/dashboard/menu/overview': typeof DashboardMenuOverviewRoute
  '/dashboard/settings/store': typeof DashboardSettingsStoreRoute
  '/dashboard/availability': typeof DashboardAvailabilityIndexRoute
  '/dashboard/settings/site/$id': typeof DashboardSettingsSiteIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '': typeof AuthRouteWithChildren
  '/apply': typeof ApplyRoute
  '/dashboard': typeof DashboardRouteWithChildren
  '/login': typeof AuthLoginRoute
  '/signup': typeof AuthSignupRoute
  '/dashboard/store': typeof DashboardStoreRoute
  '/dashboard/users': typeof DashboardUsersRoute
  '/dashboard/menu/overview': typeof DashboardMenuOverviewRoute
  '/dashboard/settings/store': typeof DashboardSettingsStoreRoute
  '/dashboard/availability': typeof DashboardAvailabilityIndexRoute
  '/dashboard/settings/site/$id': typeof DashboardSettingsSiteIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/_auth': typeof AuthRouteWithChildren
  '/apply': typeof ApplyRoute
  '/dashboard': typeof DashboardRouteWithChildren
  '/_auth/login': typeof AuthLoginRoute
  '/_auth/signup': typeof AuthSignupRoute
  '/dashboard/store': typeof DashboardStoreRoute
  '/dashboard/users': typeof DashboardUsersRoute
  '/dashboard/menu/overview': typeof DashboardMenuOverviewRoute
  '/dashboard/settings/store': typeof DashboardSettingsStoreRoute
  '/dashboard/availability/': typeof DashboardAvailabilityIndexRoute
  '/dashboard/settings/site/$id': typeof DashboardSettingsSiteIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
  | '/'
  | ''
  | '/apply'
  | '/dashboard'
  | '/login'
  | '/signup'
  | '/dashboard/store'
  | '/dashboard/users'
  | '/dashboard/menu/overview'
  | '/dashboard/settings/store'
  | '/dashboard/availability'
  | '/dashboard/settings/site/$id'
  fileRoutesByTo: FileRoutesByTo
  to:
  | '/'
  | ''
  | '/apply'
  | '/dashboard'
  | '/login'
  | '/signup'
  | '/dashboard/store'
  | '/dashboard/users'
  | '/dashboard/menu/overview'
  | '/dashboard/settings/store'
  | '/dashboard/availability'
  | '/dashboard/settings/site/$id'
  id:
  | '__root__'
  | '/'
  | '/_auth'
  | '/apply'
  | '/dashboard'
  | '/_auth/login'
  | '/_auth/signup'
  | '/dashboard/store'
  | '/dashboard/users'
  | '/dashboard/menu/overview'
  | '/dashboard/settings/store'
  | '/dashboard/availability/'
  | '/dashboard/settings/site/$id'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  AuthRoute: typeof AuthRouteWithChildren
  ApplyRoute: typeof ApplyRoute
  DashboardRoute: typeof DashboardRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AuthRoute: AuthRouteWithChildren,
  ApplyRoute: ApplyRoute,
  DashboardRoute: DashboardRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth",
        "/apply",
        "/dashboard"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/login",
        "/_auth/signup"
      ]
    },
    "/apply": {
      "filePath": "apply.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.tsx",
      "children": [
        "/dashboard/store",
        "/dashboard/users",
        "/dashboard/menu/overview",
        "/dashboard/settings/store",
        "/dashboard/availability/",
        "/dashboard/settings/site/$id"
      ]
    },
    "/_auth/login": {
      "filePath": "_auth/login.tsx",
      "parent": "/_auth"
    },
    "/_auth/signup": {
      "filePath": "_auth/signup.tsx",
      "parent": "/_auth"
    },
    "/dashboard/store": {
      "filePath": "dashboard/store.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/users": {
      "filePath": "dashboard/users.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/menu/overview": {
      "filePath": "dashboard/menu/overview.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/settings/store": {
      "filePath": "dashboard/settings/store.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/availability/": {
      "filePath": "dashboard/availability/index.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/settings/site/$id": {
      "filePath": "dashboard/settings/site/$id.tsx",
      "parent": "/dashboard"
    }
  }
}
ROUTE_MANIFEST_END */
