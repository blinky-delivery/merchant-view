import { Menu, useSiteMenu } from '@/api/menuApi';
import { Modifer, ModifierOption, useModifiersBySite } from '@/api/modifierApi';
import { StoreSite } from '@/api/storeApi';
import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Product } from '@/api/productApi';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Check, Edit2, Ellipsis, Trash } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import ModifierForm from '../forms/modifier-form';

interface ModifiersTableProps {
    storeSite: StoreSite,
    menu: Menu
}

const ModifiersTable: React.FC<ModifiersTableProps> = ({ storeSite, menu }) => {

    const { data: modifiers, isLoading: modifiersLoading } = useModifiersBySite(storeSite.id)
    const optionsCell = (options: ModifierOption[]) => {
        const optionNames = options.map(option => option.name);
        if (optionNames.length > 3) {
            return `${optionNames.slice(0, 3).join(', ')}...`;
        }
        return optionNames.join(', ');
    }
    const productsCell = (products: Product[]) => {
        const productNames = products.map((product) => product.name)
        if (productNames.length > 3) {
            return `${productNames.slice(0, 3).join(', ')}...`;
        }
        return productNames.join(', ');
    };



    return (
        <Card>
            <CardContent className='p-0'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='w-48 font-semibold'>Name</TableHead>
                            <TableHead className='font-semibold'>Options</TableHead>
                            <TableHead className='font-semibold '>Used in</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {modifiers?.map((modifier) => (
                            <ModifierRow menuId={menu.id} site={storeSite} storeId={menu.storeId} modifier={modifier} />
                        ))}
                    </TableBody>

                </Table>
            </CardContent>
        </Card>
    );
};

interface ModifierRowProps {
    modifier: Modifer;
    menuId: string
    storeId: string
    site: StoreSite
}

const ModifierRow: React.FC<ModifierRowProps> = ({ modifier, menuId, site, storeId }) => {
    const optionsCell = (options: ModifierOption[]) => {
        const optionNames = options.map(option => option.name);
        if (optionNames.length > 3) {
            return `${optionNames.slice(0, 3).join(', ')}...`;
        }
        return optionNames.join(', ');
    };

    const productsCell = (products: Product[]) => {
        const productNames = products.map((product) => product.name);
        if (productNames.length > 3) {
            return `${productNames.slice(0, 3).join(', ')}...`;
        }
        return productNames.join(', ');
    };

    const [createModiferFormOpen, setCreateModiferFormOpen] = useState(false)
    const [dropDownOpen, setDropDownOpen] = useState(false)
    const onEditClick = () => {
        setDropDownOpen(false)
        setCreateModiferFormOpen(true)
    }


    return (
        <TableRow key={modifier.id} className='h-20'>
            <TableCell className='font-semibold text-base'>{modifier.name}</TableCell>
            <TableCell className='text-base'>{optionsCell(modifier.options)}</TableCell>
            <TableCell className='text-base'>{productsCell(modifier?.modifiersToProducts?.map((relation) => relation.product) ?? [])}</TableCell>
            <TableCell className='text-right'>
                <DropdownMenu open={dropDownOpen} onOpenChange={setDropDownOpen} modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline'><Ellipsis /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 font-semibold">
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
                            <DropdownMenuItem onClick={(e) => {
                                e.preventDefault()
                                onEditClick()
                            }}>
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
            </TableCell>
            <ModifierForm menuId={menuId} site={site} storeId={storeId} isOpen={createModiferFormOpen} onOpenChanges={setCreateModiferFormOpen} modifier={modifier} />

        </TableRow >
    );
};

export default ModifiersTable;