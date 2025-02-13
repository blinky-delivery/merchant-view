import { StoreAvailability, StoreSite } from "@/api/storeApi"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet"
import { Days } from "@/constatnts"
import DayAvailabilityForm from "./day-availability-form"

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
            <SheetContent className="min-w-[700px] overflow-y-auto" >
                <SheetHeader>
                    <SheetTitle>Edit Site Hours</SheetTitle>
                    <SheetDescription>Customers may see adjusted values of these hours.</SheetDescription>
                </SheetHeader>

                <div className="flex flex-col space-y-8 mt-8">
                    {Days.map((day, dayOfWeek) => (
                        <DayAvailabilityForm day={day} dayAvailabilities={availabilityMap[dayOfWeek]} onAvailabilitiesChanged={(values) => { }} />
                    ))}
                </div>

            </SheetContent>
        </Sheet>
    )
}

export default SiteAvailabilityForm