import { create } from 'zustand'

export interface NavigationState {
    storeSiteId?: string
    setStoreSite: (id: string) => void
}

export const useNavigationStore = create<NavigationState>((set) => ({
    storeSiteId: undefined,
    setStoreSite: (storeSiteId: string) => set({ storeSiteId })
}))