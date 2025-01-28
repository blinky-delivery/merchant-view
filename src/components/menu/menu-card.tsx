import { Menu, useMenuCategories } from '@/api/menuApi'

import { StoreSite } from '@/api/storeApi';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowUpDown, Calendar, Check, Eye, Plus, Settings, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import SectionHeader from '../navigation/section-header';
import EditMenuForm from '../forms/edit-menu-form';
import CreateMenuCategoryForm from '../forms/create-menu-category';
import MenuCategoryCard from './menu-category-card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import SortMenuCategoriesForm from '../forms/sort-menu-categories';
import { useState } from 'react';
import { useNavigationStore } from '@/state/store';

type MenuCardProps = {
    menu: Menu
    sites: StoreSite[]
    storeId: string
}

const MenuCard: React.FC<MenuCardProps> = ({ menu, sites, storeId }: MenuCardProps) => {
    const onSaveHnadler = (imageBlob: Blob) => {
        const imageURL = URL.createObjectURL(imageBlob)
    }
    const { data: menuCategories, isLoading: menuCategoriesLoading } = useMenuCategories(menu.id)
    const [dropdDownOpen, setDropDownOpen] = useState(false)

    const [showEditMenuForm, setShowEditMenuForm] = useState(false)
    const activeSite = useNavigationStore((state) => state.storeSite)

    if (!activeSite) return null


    return (
        <>
            <EditMenuForm menu={menu} sites={sites} storeId={storeId} open={showEditMenuForm} onOpenChanged={setShowEditMenuForm} />
            <Card>
                <CardHeader>
                    <CardTitle>
                        <div className="flex justify-between items-start">
                            <SectionHeader title={`Menu - ${activeSite.name}`} subtitle={menu.description} />
                            <div className='flex space-x-4'>
                                <div className='flex space-x-4'>
                                    <Button variant='outline' className='p-2 rounded-full size-12 '><Calendar strokeWidth={2} /></Button>
                                    <Button variant='outline' className='p-2 rounded-full size-12 '><Eye strokeWidth={2} /></Button>

                                    <DropdownMenu open={dropdDownOpen} onOpenChange={setDropDownOpen} modal={false}>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant='outline' className='p-2 rounded-full size-12 '><Settings strokeWidth={2} /></Button>
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

                                                <SortMenuCategoriesForm menuId={menu.id} categories={menuCategories ?? []}>
                                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                        <ArrowUpDown />
                                                        <span>Rearrange Categories</span>
                                                    </DropdownMenuItem>
                                                </SortMenuCategoriesForm>
                                                <DropdownMenuItem>
                                                    <Plus />
                                                    <span>Add a Category</span>
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
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <div className='flex flex-col space-y-4'>
                            {menuCategories?.map((category) => (
                                <MenuCategoryCard key={category.id} category={category} menuId={menu.id} storeId={storeId} />
                            ))}
                        </div>
                        <CreateMenuCategoryForm menuId={menu.id} storeId={storeId}>
                            <Button className='mt-4 items-center text-muted-foreground font-semibold space-x-1' variant={'outline'}>
                                <Plus size={20} />   <span>Add Category</span>
                            </Button>
                        </CreateMenuCategoryForm>
                    </div>
                </CardContent>

            </Card>
        </>
    );
};

export default MenuCard