// This will hold the state of common dialogs
import { ImageType } from '@/api/imageApi'
import { create } from 'zustand'

export interface ImageEditorStore {
    isOpen: boolean
    imageToEdit: string | null,
    imageType: ImageType | null,
    productId: string | null
    onImageUploaded: ((imageId: string) => void) | null,
    openImageEditor: (
        productId: string | null,
        imageToEdit: string,
        imageType: ImageType | null,
        onImageUploaded: (imageId: string) => void,
    ) => void,
    closeDialog: () => void,
}

export const useImageEditorDialogState = create<ImageEditorStore>((set) => ({
    isOpen: false,
    imageToEdit: null,
    imageHeight: null,
    imageType: null,
    productId: null,
    onImageUploaded: null,
    openImageEditor: (
        productId: string | null,
        imageToEdit: string,
        imageType: ImageType | null,
        onImageUploaded: (imageId: string) => void,
    ) => {
        set({
            isOpen: true,
            productId: productId,
            imageType: imageType,
            onImageUploaded: onImageUploaded,
            imageToEdit: imageToEdit,
        })
    },
    closeDialog: () => set({
        isOpen: false,
        imageType: null,
        productId: null,
        onImageUploaded: null
    })

}))

