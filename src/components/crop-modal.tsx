import React, { useState, useCallback } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import { Slider } from './ui/slider';
import Modal from './modal';
import { Button } from './ui/button';
import { createImage, cropImage } from '@/lib/image-utils';

interface CropModalProps {
    imageSrc: string
    isOpen: boolean
    onClose: () => void
    onSaveHandler: (image: Blob) => void
}

const CropModal = ({ imageSrc, isOpen, onClose, onSaveHandler }: CropModalProps) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({ width: 0, height: 0, x: 0, y: 0 });
    const [modalOpen, setModalOpen] = useState(isOpen)

    const onCloseHandler = () => {
        onClose()
        setModalOpen(false)
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
        try {
            const image = await createImage(imageSrc)
            if (image) {
                const croppedImageBlob = await cropImage(image, croppedAreaPixels, { height: 500, width: 500 })
                if (croppedImageBlob) {
                    onSaveHandler(croppedImageBlob)
                }
            }
        } catch (error) {
            console.log("error saving cropped image", error)
        }
        onCloseHandler()
    }

    return (

        <Modal title='Update menu cover image' isOpen={modalOpen} onClose={onCloseHandler}>
            <div className='flex flex-col space-y-4'>
                <div className='h-[500px] w-[500px] relative mx-auto'>
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={4 / 3}
                        onCropChange={onCropChange}
                        onZoomChange={onZoomChange}
                        onCropComplete={onCropCompleteHandler}
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

                <div className='flex space-x-4'>
                    <Button className='w-full' variant='secondary' onClick={onCloseHandler}>Cancel</Button>
                    <Button className='w-full' onClick={saveCroppedImage}>Save</Button>
                </div>


            </div>

        </Modal>

    );
};

export default CropModal;