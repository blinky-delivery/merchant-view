import React, { useState, useCallback } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import { Slider } from './ui/slider';

interface CropModalProps {
    imageSrc: string
}

const CropModal = ({ imageSrc, }: CropModalProps) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);



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

    return (

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
            <div className='flex space-x-4 w-[300px] mx-auto'>
                <p>
                    Zoom
                </p>
                <Slider
                    defaultValue={[zoom]}
                    min={1}
                    max={3}
                    step={0.1}
                    onValueChange={(value) => setZoom(value[0])}
                />
            </div>


        </div>

    );
};

export default CropModal;