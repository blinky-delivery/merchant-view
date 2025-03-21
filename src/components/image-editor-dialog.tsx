import { useState, useCallback } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import { Slider } from './ui/slider';
import { Button } from './ui/button';
import { createImage, getCroppedImage } from '@/lib/image-utils';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { useImageEditorDialogState } from '@/state/image-editor.store';
import { Separator } from './ui/separator';
import { useMutation } from '@tanstack/react-query';
import { imageApi, ImageType } from '@/api/imageApi';
import FormSubmitButtons from './forms/form-submit-buttons';

interface ImageEditorDialogProps {
    storeId: string
    storeSiteId: string | null
}

const ImageEditorDialog = ({ storeId, storeSiteId }: ImageEditorDialogProps) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({ width: 0, height: 0, x: 0, y: 0 });
    const [error, setError] = useState<string>("")

    const { isOpen, imageToEdit, productId, imageType, onImageUploaded, closeDialog } = useImageEditorDialogState()

    const onCloseHandler = () => {
        closeDialog()
    }

    const onCropChange = (crop: Point) => {
        setCrop(crop);
    };

    const onZoomChange = (zoom: number) => {
        setZoom(zoom);
    };

    const onCropCompleteHandler = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const onCrop = async () => {
        try {
        } catch (e) {
            console.error(e);
        }
    };

    const saveCroppedImage = async () => {
        if (imageToEdit) {
            try {
                const image = await createImage(imageToEdit.src)
                if (image) {
                    const croppedImageBlob = await getCroppedImage(image, croppedAreaPixels)
                    if (croppedImageBlob) {
                        console.log('blob saved', croppedImageBlob)
                        if (productId && imageType) {
                            uploadMuation.mutate({
                                productId: productId,
                                storeId: storeId,
                                storeSiteId: storeSiteId,
                                imageBlob: croppedImageBlob,
                                imageFileName: imageToEdit.fileName,
                                type: imageType,
                            })
                        }

                    }
                }
            } catch (error) {
                console.log("error saving cropped image", error)
            }
            onCloseHandler()
        }

    }

    const uploadMuation = useMutation({
        mutationFn: imageApi.uploadImage,
        onError: (error) => setError(error.message)
    })



    if (!imageToEdit) return null

    return (

        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) closeDialog()
        }}>
            <DialogContent className='max-w-fit'>
                <div className='flex flex-col space-y-4'>
                    <DialogTitle><h2 className='text-2xl'>Edit Photo</h2> </DialogTitle>
                    <div className='h-[50vh] md:w-[700px] relative mx-auto'>
                        <Cropper
                            image={imageToEdit.src}
                            crop={crop}
                            zoom={zoom}
                            aspect={1 / 1}
                            onCropChange={onCropChange}
                            onZoomChange={onZoomChange}
                            onCropComplete={onCropCompleteHandler}
                            objectFit='vertical-cover'

                        />

                    </div>
                    <div className='flex space-x-4  mx-auto'>
                        <span className='font-semibold'>
                            Zoom
                        </span>
                        <Slider
                            className='w-[300px]'
                            defaultValue={[zoom]}
                            min={1}
                            max={3}
                            step={0.1}
                            onValueChange={(value) => setZoom(value[0])}
                        />
                    </div>

                    <Separator />
                    <FormSubmitButtons
                        isDisabled={uploadMuation.isPending}
                        isLoading={uploadMuation.isPending}
                        onSubmit={saveCroppedImage}
                        onCancel={onCloseHandler}
                        showCancel={true}

                    />


                </div>
            </DialogContent>
        </Dialog>

    );
};

export default ImageEditorDialog;