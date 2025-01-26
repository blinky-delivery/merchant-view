import React from 'react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { ImageStatus, ImageType, useStoreImages } from '@/api/imageApi';
import { TabsContent } from '@radix-ui/react-tabs';
import { useRouteContext } from '@tanstack/react-router';

interface GalleryPhotoSelectorProps {
    onSelect: (photo: string) => void;
}

const GalleryPhotoSelector: React.FC<GalleryPhotoSelectorProps> = ({ onSelect }) => {

    const context = useRouteContext({ from: '/dashboard' })
    const storeId = context.storeId as string

    const { data: approvedImages, isLoading: loadingApproved, error: errorApproved } = useStoreImages(storeId, ImageType.ITEM_PHOTO, ImageStatus.APPROVED)
    const { data: reviewImages, isLoading: loadingReview, error: errorReview } = useStoreImages(storeId, ImageType.ITEM_PHOTO, ImageStatus.REVIEW)
    const { data: rejectedImages, isLoading: loadingRejected, error: errorRejected } = useStoreImages(storeId, ImageType.ITEM_PHOTO, ImageStatus.REJECTED)


    return (
        <Tabs defaultValue='approved' className='w-full'>
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="approved">Approved {approvedImages?.length}</TabsTrigger>
                <TabsTrigger value="review">In Review {reviewImages?.length}</TabsTrigger>
                <TabsTrigger value="rejected">Rejected {rejectedImages?.length}</TabsTrigger>
            </TabsList>
            <TabsContent value='approved'>
                <div>
                    Approved {approvedImages?.length}
                </div>
            </TabsContent>
            <TabsContent value='review'>
                <div>
                    In Review {reviewImages?.length}
                </div>
            </TabsContent>
            <TabsContent value='rejected'>
                <div>
                    Rejected {rejectedImages?.length}
                </div>
            </TabsContent>
        </Tabs>
    );
};

export default GalleryPhotoSelector;