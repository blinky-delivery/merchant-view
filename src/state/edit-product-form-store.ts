import { MenuCategory } from "@/api/menuApi"
import { Product } from "@/api/productApi"
import { create } from "zustand"

export interface EditProductFormStore {
    product: Product | null
    menuCategory: MenuCategory | null
    isOpen: boolean
    openForm: (product: Product, menuCategory: MenuCategory) => void,
    closeForm: () => void
}

export const useEditProductForm = create<EditProductFormStore>((set) => ({
    isOpen: false,
    product: null,
    menuCategory: null,
    openForm: (product: Product, menuCategory: MenuCategory) => set({
        isOpen: true,
        product: product,
        menuCategory: menuCategory,
    }),
    closeForm: () => set({
        product: null,
        menuCategory: null,
        isOpen: false
    })
}))