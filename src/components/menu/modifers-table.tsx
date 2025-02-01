import { Menu } from '@/api/menuApi';
import { Modifer, ModifierOption } from '@/api/modifierApi';
import { StoreSite } from '@/api/storeApi';
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Product } from '@/api/productApi';
import { Card, CardContent } from '../ui/card';

interface ModifersTableProps {
    modifiers: Modifer[]
    storeSite: StoreSite
    menu: Menu
}

const ModifiersTable: React.FC<ModifersTableProps> = ({ modifiers, storeSite, menu }) => {

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
                        {modifiers.map((modifier) => (
                            <TableRow key={modifier.id} className='h-20'>
                                <TableCell className='font-semibold text-base'>{modifier.name}</TableCell>
                                <TableCell className='text-base'>{optionsCell(modifier.options)}</TableCell>
                                <TableCell className='text-base'>{productsCell(modifier.modifiersToProducts?.map((relation) => relation.product) ?? [])}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </CardContent>
        </Card>
    );
};

export default ModifiersTable;