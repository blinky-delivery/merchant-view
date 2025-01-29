import { Info } from 'lucide-react';
import React from 'react';

interface InfoLabelProps {
    title: string;
    subtitle: string;
}

const InfoLabel: React.FC<InfoLabelProps> = ({ title, subtitle }) => {
    return (
        <div className='w-full flex flex-col p-4 bg-[#ededed] rounded-md'>
            <div className='flex space-x-4 items-start'>
                <Info className='size-10 ' />
                <div className='flex flex-col'>
                    <p className='font-semibold text-lg'>
                        {title}
                    </p>
                    <p>
                        {subtitle}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InfoLabel;