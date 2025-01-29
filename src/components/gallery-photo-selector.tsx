import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { imageApi, ImageStatus, ImageType, TImage, useStoreImages } from '@/api/imageApi';
import { TabsContent } from '@radix-ui/react-tabs';
import { useRouteContext } from '@tanstack/react-router';

import { cn } from '@/lib/utils';
import { getImageSrcFromFileId } from '@/lib/file-utils';
import { Check } from 'lucide-react';

interface ImageCardProps {
    imageId: string
    imageUrl: string;
    onSelected: (selected: boolean, imageId: string) => void;
    selected: boolean;
}


const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, onSelected, selected, imageId }) => {
    return (
        <div
            className={cn(
                'relative w-40 h-40 rounded-md overflow-hidden cursor-pointer',
                selected && 'bg-black bg-opacity-50'
            )}
            onClick={() => onSelected(!selected, imageId)}
        >
            <img src={imageUrl} alt="Image" className="w-full h-full object-cover" />
            {selected && (
                <>
                    <div className="absolute inset-0 bg-black opacity-50" />
                    <Check className="absolute top-2 right-2 text-white" />
                </>
            )}
        </div>
    );
};

interface GalleryPhotoSelectorProps {
    onSelect: (photo: string) => void;
}

const GalleryPhotoSelector: React.FC<GalleryPhotoSelectorProps> = ({ onSelect }) => {

    const context = useRouteContext({ from: '/dashboard' })
    const storeId = context.storeId as string

    const { data: approvedImages, isLoading: loadingApproved, error: errorApproved } = useStoreImages(storeId, ImageType.ITEM_PHOTO, ImageStatus.APPROVED)
    const { data: reviewImages, isLoading: loadingReview, error: errorReview } = useStoreImages(storeId, ImageType.ITEM_PHOTO, ImageStatus.REVIEW)
    const { data: rejectedImages, isLoading: loadingRejected, error: errorRejected } = useStoreImages(storeId, ImageType.ITEM_PHOTO, ImageStatus.REJECTED)

    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const onImageSelected = (selected: boolean, imageId: string) => {
        if (selected) {
            setSelectedImage(imageId)
        } else {
            setSelectedImage(null)
        }
    }

    const renderImagesGallery = (images: TImage[]) => {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[21rem] max-h-[21rem] overflow-y-scroll">
                {images.map((image) => <ImageCard imageId={image.id} imageUrl={getImageSrcFromFileId(image.fileId)} onSelected={onImageSelected} selected={image.id == selectedImage} />)}
            </div >
        )
    }

    return (
        <Tabs defaultValue='approved' className='w-full'>
            <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="approved">Approved {approvedImages?.length}</TabsTrigger>
                <TabsTrigger value="review">In Review {reviewImages?.length}</TabsTrigger>
                <TabsTrigger value="rejected">Rejected {rejectedImages?.length}</TabsTrigger>
            </TabsList>
            <TabsContent value='approved'>
                <div>
                    {renderImagesGallery(approvedImages ?? [])}
                </div>
            </TabsContent>
            <TabsContent value='review'>
                {renderImagesGallery(reviewImages ?? [])}
            </TabsContent>
            <TabsContent value='rejected'>
                <div>
                    {renderImagesGallery(rejectedImages ?? [])}
                </div>
            </TabsContent>
        </Tabs>
    );
};

export default GalleryPhotoSelector;