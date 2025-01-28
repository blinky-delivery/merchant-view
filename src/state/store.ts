import { StoreSite } from '@/api/storeApi'
import { create } from 'zustand'

export interface NavigationState {
    storeSite?: StoreSite
    setStoreSite: (site: StoreSite) => void
}

export const useNavigationStore = create<NavigationState>((set) => ({
    storeSite: undefined,
    setStoreSite: (site: StoreSite) => set({ storeSite: site })
}))


