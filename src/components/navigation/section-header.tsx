import React from 'react';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
    return (

        <div className='space-y-1'>
            <h2 className='font-semibold text-xl'>{title}</h2>
            {subtitle && <div className='text-base text-muted-foreground'>{subtitle}</div>}
        </div>

    );
};

export default SectionHeader