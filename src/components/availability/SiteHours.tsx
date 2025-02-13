import { StoreAvailability, StoreSite, useSiteAvailability } from '@/api/storeApi';
import { Days } from '@/constatnts';
import React, { useState } from 'react';
import SiteAvailabilityForm from './site-availability-form';
import { Button } from '../ui/button';

interface SiteHoursProps {
    site: StoreSite
}



const SiteHours: React.FC<SiteHoursProps> = ({ site }) => {
    const { data: availability, isLoading } = useSiteAvailability(site.id)
    const [isOpen, setIsOpen] = useState(false)
    const onEditClick = () => {
        setIsOpen(true)
    }


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
            <div className='flex flex-row justify-between'>
                <div className='space-y-2'>
                    <h2 className='text-2xl font-semibold'>
                        Regular Menu Hours
                    </h2>
                    <h4 className='text-muted-foreground'>
                        These are the hours your store is available on Blinky
                    </h4>
                </div>
                <Button onClick={onEditClick}>Edit</Button>
            </div>
            <div className='flex flex-col space-y-4'>
                {Days.map((day, dayOfWeek) => (
                    <DayAvailability day={day} availabilities={availabilityMap[dayOfWeek]} site={site} />
                ))}
            </div>
            <SiteAvailabilityForm isOpen={isOpen} onOpenChanges={setIsOpen} site={site} availabilities={availability} />
        </div>
    );
};

interface DayAvailabilityProps {
    site: StoreSite
    day: string;
    availabilities: StoreAvailability[]
}

const DayAvailability: React.FC<DayAvailabilityProps> = ({ site, day, availabilities }) => {
    return (

        <>
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
        </>
    )
}

export default SiteHours;