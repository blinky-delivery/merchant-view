import { ImageStatus } from '@/api/imageApi';
import { Product } from '@/api/productApi';
import { getImageSrcFromFileId } from '@/lib/file-utils';
import { Clock9, Trash } from 'lucide-react';
import EditButton from '../edit-button';
import { Button } from '../ui/button';

interface ProductImageProps {
    primaryImage: Product['primaryImage'];
    width: number;
    height: number;
    onEdit?: () => void;
    onRemove?: () => void;
}

const ProductImage: React.FC<ProductImageProps> = ({ primaryImage, width, height, onEdit, onRemove }) => {
    const imageEl = (<div className='relative' style={{ width, height }}>

        <div className='relative' style={{ width, height }}>
            {primaryImage && <img className='rounded-md' style={{ width, height }} src={getImageSrcFromFileId(primaryImage.fileId)} />}
            {!primaryImage && <img
                src="/placeholder.svg"
                alt="Store Cover"
                className='rounded-sm'
                style={{ width, height }}
            />}
            {primaryImage?.status == ImageStatus.REVIEW && <div className='absolute inset-0 flex items-center justify-center'>
                <Clock9 className='w-5 h-5 text-white z-10' />
                <div className='rounded-md bg-black w-full h-full absolute opacity-30'></div>
            </div>}
        </div>
    </div>)
    return (

        <div className='relative p-4 pt-8'>
            <div className='flex space-x-1 absolute top-0 right-0 z-10'>

                {onRemove && (
                    <Button
                        className="p-2 rounded-full w-10 h-10 shadow-md"
                        onClick={(e) => {
                            e.preventDefault()
                            onRemove()
                        }}
                        variant={'destructive'}
                    >
                        <Trash className="w-5 h-5" />
                    </Button>
                )}
                {onEdit && (
                    <EditButton onClick={onEdit} />
                )}
            </div>

            {imageEl}
        </div>
    );
};

export default ProductImage;