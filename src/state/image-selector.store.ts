// This will hold the state of common dialogs
import { ImageType, TImage } from '@/api/imageApi'
import { create } from 'zustand'

export interface ImageSelecetorDialogsState {
    isOpen: boolean
    imageType: ImageType | null
    productId: string | null
    onImageSelected: ((image: TImage) => void) | null,
    openProductImageSelecetor: (
        productId: string,
        onImageSelected: (image: TImage) => void,
    ) => void,
    closeDialog: () => void,
}

export const useImageSelectorDialogState = create<ImageSelecetorDialogsState>((set) => ({
    isOpen: false,
    imageType: null,
    productId: null,
    onImageSelected: null,
    openProductImageSelecetor: (productId: string, onImageSelected: (image: TImage) => void) => {
        set({
            isOpen: true,
            productId: productId,
            imageType: ImageType.ITEM_PHOTO,
            onImageSelected: onImageSelected,
        })
    },
    closeDialog: () => set({
        isOpen: false,
        imageType: null,
        productId: null,
        onImageSelected: null
    })
}))

