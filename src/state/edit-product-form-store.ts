import { TImage } from "@/api/imageApi"
import { MenuCategory } from "@/api/menuApi"
import { Product } from "@/api/productApi"
import { create } from "zustand"

export interface EditProductFormStore {
    product: Product | null
    primaryImage: TImage | null
    menuCategory: MenuCategory | null
    isOpen: boolean
    openForm: (product: Product, menuCategory: MenuCategory) => void,
    setProductPrimaryImage: (primaryImage: TImage | null) => void,
    closeForm: () => void
}

export const useEditProductForm = create<EditProductFormStore>((set) => ({
    isOpen: false,
    product: null,
    menuCategory: null,
    primaryImage: null,
    setProductPrimaryImage: (primaryImage: TImage | null) => set({ primaryImage: primaryImage }),
    openForm: (product: Product, menuCategory: MenuCategory) => set({
        isOpen: true,
        product: product,
        primaryImage: product.primaryImage,
        menuCategory: menuCategory,
    }),
    closeForm: () => set({
        product: null,
        menuCategory: null,
        isOpen: false
    }),

}))