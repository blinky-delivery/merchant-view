import React, { useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Upload } from 'lucide-react';
import { Separator } from './ui/separator';
import GalleryPhotoSelector from './gallery-photo-selector';
import { useImageSelectorDialogState } from '@/state/image-selector.store';
import { getImageDimensions, readFileAsDataURL } from '@/lib/file-utils';
import { useImageEditorDialogState } from '@/state/image-editor.store';


const SelectImageDialog: React.FC = () => {
    const { isOpen, imageType, onImageSelected, productId, closeDialog } = useImageSelectorDialogState()
    const { openImageEditor } = useImageEditorDialogState()

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Programmatically trigger the file input click
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const imageFile = files[0]
            const imageToEditAsURL = await readFileAsDataURL(imageFile)
            const dimensions = await getImageDimensions(imageFile)


            if (imageToEditAsURL && dimensions) {
                closeDialog()
                openImageEditor(productId, imageToEditAsURL, imageType, dimensions.height, () => { })
            }

        }
    }


    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) closeDialog()
        }}>

            <DialogContent className='max-w-fit'>
                <DialogTitle><h2 className='text-2xl'>Add a Photo</h2> </DialogTitle>
                <div className='w-[800px] flex flex-col space-y-4 items-center mt-4'>
                    <Upload className='text-muted-foreground' />
                    <h2 className='text-foreground font-semibold'>Drago and drop a file to upload</h2>
                    <h5 className='text-muted-foreground'>or</h5>
                    <Button onClick={handleButtonClick} className='px-10'>Select file</Button>

                    <input
                        type="file"
                        accept='image/*'
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: "none" }} // Hide the input element
                    />


                    <div className='text-center'>
                        <h5 className='text-muted-foreground'>Accepted file types: JPG, JPEG or PNG</h5>
                        <h5 className='text-muted-foreground'>Maximum resolution: 1400x800</h5>
                    </div>
                    <Separator />
                    <GalleryPhotoSelector onSelect={(imageId) => { }} />
                </div>
                <Separator />
                <div className='flex justify-between'>
                    <Button variant='outline'>
                        View Photo Guidelines
                    </Button>
                    <Button>
                        Save Changes
                    </Button>
                </div>

            </DialogContent>

        </Dialog>
    );
};

export default SelectImageDialog;