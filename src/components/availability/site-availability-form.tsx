import { StoreAvailability, StoreSite } from "@/api/storeApi"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet"
import { Days } from "@/constatnts"

interface SiteAvailabilityFormProps {
    site: StoreSite
    availabilities: StoreAvailability[]
    isOpen: boolean
    onOpenChanges: (value: boolean) => void
}

const SiteAvailabilityForm: React.FC<SiteAvailabilityFormProps> = ({ site, availabilities, isOpen, onOpenChanges }) => {

    const getAvailabilitiesForDay = (dayOfWeek: number) => {
        return availabilities.filter((a) => a.dayOfWeek === dayOfWeek);
    }

    const availabilityMap = Days.reduce((acc, day, index) => {
        acc[index] = getAvailabilitiesForDay(index);
        return acc;
    }, {} as Record<number, StoreAvailability[]>);

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChanges}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Regular Site Hours</SheetTitle>
                    <SheetDescription>Customers may see adjusted values of these hours.</SheetDescription>
                </SheetHeader>

            </SheetContent>
        </Sheet>
    )
}