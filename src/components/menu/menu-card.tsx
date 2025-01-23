import { Menu, useMenuCategories } from '@/api/menuApi'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { StoreSite } from '@/api/storeApi';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowUpDown, Calendar, Check, ChevronDown, ChevronUp, Edit2, Ellipsis, Eye, Plus, Settings, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import SectionHeader from '../navigation/section-header';
import EditMenuForm from '../forms/edit-menu-form';
import CreateMenuCategoryForm from '../forms/create-menu-category';
import MenuCategoryCard from './menu-category-card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import SortMenuCategoriesForm from '../forms/sort-menu-categories';
import { useState } from 'react';

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

    return (
        <>
            <EditMenuForm menu={menu} sites={sites} storeId={storeId} open={showEditMenuForm} onOpenChanged={setShowEditMenuForm} />
            <Card>
                <Collapsible className='group/collapsible' defaultOpen={true}>
                    <CardHeader>
                        <CardTitle>
                            <div className="flex justify-between items-start">
                                <SectionHeader title={menu.name} subtitle={menu.description} />
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
                                                    <DropdownMenuItem onClick={() => setShowEditMenuForm(true)}>
                                                        <Edit2 />
                                                        <span>Edit Details</span>
                                                    </DropdownMenuItem>

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
                                    <CollapsibleTrigger asChild>
                                        <Button variant={'link'}>
                                            <ChevronDown className="ml-auto group-data-[state=open]/collapsible:hidden" />
                                            <ChevronUp className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                                        </Button>
                                    </CollapsibleTrigger>
                                </div>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CollapsibleContent>
                        <CardContent>
                            <div>
                                <div className='flex flex-col space-y-4'>
                                    {menuCategories?.map((category) => (
                                        <MenuCategoryCard key={category.id} category={category} menuId={menu.id} storeId={storeId} />
                                    ))}
                                </div>
                                <CreateMenuCategoryForm menuId={menu.id} storeId={storeId}>
                                    <Button className='mt-4 items-center' variant={'outline'}>
                                        Add category
                                    </Button>
                                </CreateMenuCategoryForm>
                            </div>
                        </CardContent>
                    </CollapsibleContent>
                </Collapsible>

            </Card>
        </>
    );
};

export default MenuCard