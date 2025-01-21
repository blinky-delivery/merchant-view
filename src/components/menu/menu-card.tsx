import { Menu } from '@/api/menuApi'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { StoreSite } from '@/api/storeApi';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../ui/button';

type MenuCardProps = {
    menu: Menu;
    sites: StoreSite[]
}

const MenuCard: React.FC<MenuCardProps> = ({ menu, sites }: MenuCardProps) => {


    const onSaveHnadler = (imageBlob: Blob) => {
        const imageURL = URL.createObjectURL(imageBlob)
    }

    return (
        <Card>
            <Collapsible className='group/collapsible'>
                <CardHeader>
                    <CardTitle>
                        <div className="flex justify-between items-start">
                            <p>{menu.name}</p>
                            <CollapsibleTrigger asChild>
                                <Button variant={'link'}>
                                    <ChevronDown className="ml-auto group-data-[state=open]/collapsible:hidden" />
                                    <ChevronUp className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                                </Button>
                            </CollapsibleTrigger>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CollapsibleContent>
                    <CardContent></CardContent>
                </CollapsibleContent>
            </Collapsible>

        </Card>
    );
};

export default MenuCard