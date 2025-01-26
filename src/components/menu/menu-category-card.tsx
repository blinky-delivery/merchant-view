import { MenuCategory } from '@/api/menuApi';
import React, { useState } from 'react';
import { ArrowUpDown, Check, Edit2, Ellipsis, Trash, Plus, PlusIcon } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useProductsByCategory } from '@/api/productApi';
import CreateProductForm from '../forms/create-product-form';


interface MenuCategoryCardProps {
    category: MenuCategory
    menuId: string
    storeId: string
}

const MenuCategoryCard: React.FC<MenuCategoryCardProps> = ({ category, menuId, storeId }) => {

    const { data: products, isLoading: productsLoading, error: productsError } = useProductsByCategory(category.id)
    const [productFormOpen, setProductFormOpen] = useState(false)

    return (
        <>
            <CreateProductForm open={productFormOpen} onOpenChanged={setProductFormOpen} menuCategory={category} />
            <div className='flex flex-col space-y-4'>
                <div className='flex justify-between'>
                    <div className='flex flex-col space-y-2'>
                        <div className="px-2 py-1 text-sm bg-blue-50 text-blue-700 rounded-xl w-fit font-semibold">Category</div>
                        <div className='font-semibold space-x-2'>
                            <span className='text-xl'>{category.name}</span>
                            <span className='text-base text-muted-foreground'>{products?.length} items</span>
                        </div>
                        {products?.length == 0 && <span className='text-sm text-muted-foreground font-normal'>Hidden from customers until at least 1 item is added.</span>}
                    </div>

                    <DropdownMenu >
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
                                <DropdownMenuItem>
                                    <Edit2 />
                                    <span>Edit Details</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <ArrowUpDown />
                                    <span>Rearrange Items</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Plus />
                                    <span>Add an Item</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className='text-red-600 hover:text-red-600'>
                                    <Trash />
                                    <span>Delete</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>

                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
                <div>
                    <Button className='mt-4 items-center text-muted-foreground font-semibold space-x-1' variant={'outline'} onClick={() => setProductFormOpen(true)}>
                        <Plus size={20} />   <span>Add Item</span>
                    </Button>
                </div>
                <div className='px-14'>
                    <Separator />
                </div>
            </div>
        </>
    )
}

export default MenuCategoryCard;