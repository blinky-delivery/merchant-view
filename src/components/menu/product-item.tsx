import { Product } from '@/api/productApi';
import React from 'react';
import { Separator } from '../ui/separator';
import { Check, Clock9, Edit2, Ellipsis, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useEditProductForm } from '@/state/edit-product-form-store';
import { MenuCategory } from '@/api/menuApi';
import ProductImage from './product-image';

interface ProductItemProps {
    product: Product,
    menuCategory: MenuCategory
}


const ProductItem: React.FC<ProductItemProps> = ({ product, menuCategory }: ProductItemProps) => {
    const { openForm } = useEditProductForm()

    const onEditClick = () => openForm(product, menuCategory)

    const primaryImage = product.primaryImage
    return (
        <div className='flex flex-col space-y-4' id={product.id}>
            <div className="flex justify-between" >

                <div className='flex space-x-4 items-center '>
                    <ProductImage height={60} width={60} primaryImage={primaryImage} />
                    <p className='text-foreground font-semibold'>
                        {product.name}
                    </p>

                </div>

                <div className='flex space-x-14 items-center'>
                    <p className='text-accent-foreground text-base'>
                        {`${product.price.toFixed(2)} MAD`}
                    </p>
                    <DropdownMenu modal={false} >
                        <DropdownMenuTrigger asChild>
                            <Button variant={'outline'}><Ellipsis /></Button>

                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 font-semibold  ">
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Check className='text-orange-600' />
                                    <span>Available</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Unavailable Today</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Unavailable Indefinitely</span>
                                </DropdownMenuItem>

                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem onSelect={onEditClick}>
                                    <Edit2 />
                                    <span>Edit Details</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem className='text-red-600 hover:text-red-600'>
                                    <Trash />
                                    <span>Delete</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>

                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>

            </div>
            <div className='px-20'>
                <Separator />
            </div>
        </div>
    );
};

export default ProductItem;