import { Menu } from '@/api/menuApi'
import React, { ChangeEvent, useRef, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ImagePlus } from 'lucide-react';
import { getImageDimensions, readFileAsDataURL } from '@/lib/file-utils';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import CropModal from '../crop-modal';
import { Button } from '../ui/button';
import Modal from '../modal';

type MenuCardProps = {
    menu: Menu;
}

const MenuCard: React.FC<MenuCardProps> = ({ menu }) => {

    const [coverImg, setCoverImg] = useState<string | null>(null);
    const [croppedImg, setCroppedImg] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false)
    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const handleChange = async (event: ChangeEvent<HTMLInputElement>,) => {
        if (event.target.files) {
            const file = event.target.files[0]
            if (file) {
                const dimensions = await getImageDimensions(file)
                console.log("dimensions", dimensions)
                const croppedImage = await readFileAsDataURL(file)
                console.log("croppedImage", croppedImage)
                setCroppedImg(croppedImage)
                if (croppedImage) setDialogOpen(true)
                return croppedImage
            }
        }

    }

    return (
        <>
            <Card >
                <CardHeader>
                    <div className='h-[200px]  '>
                        {menu.coverImage ? (
                            <img src={menu.coverImage} alt={menu.name} />
                        ) : (
                            <div
                                onClick={() => hiddenFileInput.current?.click()}
                                className='w-full h-full text-gray-500 cursor-pointer hover:bg-slate-100  bg-[#f7faf9] mb-8 flex flex-col items-center justify-center border-gray  border-2 rounded-md'
                            >

                                <ImagePlus size={40} />
                                <p className='font-semibold '>Upload an image</p>
                                <input
                                    type="file"
                                    onChange={event => handleChange(event)}
                                    ref={hiddenFileInput}
                                    onClick={event => {
                                        const element = event.target as HTMLInputElement;
                                        element.value = '';
                                    }}
                                    style={{ display: "none" }}
                                />
                            </div>
                        )}
                    </div>
                    <div className='h-2'></div>
                    <CardTitle>{menu.name}</CardTitle>
                    <CardDescription>{menu.description}</CardDescription>
                </CardHeader>

                <CardFooter>
                    <p>Status: {menu.status}</p>
                </CardFooter>
            </Card>

            {croppedImg != null && <Modal title='Update menu cover image' isOpen={dialogOpen} onClose={() => setDialogOpen(false)}>

                <CropModal imageSrc={croppedImg} />


            </Modal>}
        </>
    );
};

export default MenuCard