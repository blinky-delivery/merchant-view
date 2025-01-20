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
import EditMenuForm from '../edit-menu-form';
import { StoreSite } from '@/api/storeApi';
import { Link } from '@tanstack/react-router';

type MenuCardProps = {
    menu: Menu;
    sites: StoreSite[]
}

const MenuCard: React.FC<MenuCardProps> = ({ menu, sites }) => {

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

    const onSaveHnadler = (imageBlob: Blob) => {
        const imageURL = URL.createObjectURL(imageBlob)
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
                    {/* <EditMenuForm menu={menu} storeId={menu.storeId} sites={sites}></EditMenuForm> */}
                    <Link className='w-full' to='/dashboard/menu/$menuId' params={{ menuId: menu.id }}>
                        <Button className='w-full'>Edit Menu </Button>
                    </Link>
                </CardFooter>
            </Card>

            {croppedImg != null &&
                <CropModal
                    imageSrc={croppedImg}
                    isOpen={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    onSaveHandler={onSaveHnadler}
                />
            }
        </>
    );
};

export default MenuCard