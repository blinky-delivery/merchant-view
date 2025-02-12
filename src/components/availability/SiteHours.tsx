import { StoreAvailability, StoreSite, useSiteAvailability } from '@/api/storeApi';
import { Days } from '@/constatnts';
import React from 'react';

interface SiteHoursProps {
    site: StoreSite
}



const SiteHours: React.FC<SiteHoursProps> = ({ site }) => {
    const { data: availability, isLoading } = useSiteAvailability(site.id)

    if (!availability) return null

    const getAvailabilitiesForDay = (dayOfWeek: number) => {
        return availability.filter((a) => a.dayOfWeek === dayOfWeek);
    }

    const availabilityMap = Days.reduce((acc, day, index) => {
        acc[index] = getAvailabilitiesForDay(index);
        return acc;
    }, {} as Record<number, StoreAvailability[]>);

    return (
        <div className='flex flex-col space-y-4'>
            {Days.map((day, dayOfWeek) => (
                <DayAvailability day={day} availabilities={availabilityMap[dayOfWeek]} />
            ))}
        </div>
    );
};

interface DayAvailabilityProps {
    day: string;
    availabilities: StoreAvailability[]
}

const DayAvailability: React.FC<DayAvailabilityProps> = ({ day, availabilities }) => {
    return (
        <div className='flex flex-row justify-between'>
            <span className='text-foreground'>
                {day}
            </span>
            <div className='flex flex-col space-y-2 text-muted-foreground'>
                {availabilities.length === 0 ? (
                    <div className='flex flex-row space-x-4 font-semibold'>
                        Closed
                    </div>
                ) : (
                    availabilities.map((availability, index) => (
                        <div key={index} className='flex flex-row space-x-4'>
                            {availability.openTime} - {availability.closTime}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SiteHours;