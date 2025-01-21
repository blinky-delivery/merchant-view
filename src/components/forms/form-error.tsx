import React from 'react';

interface FormErrorProps {
    message: string;
}

const FormError: React.FC<FormErrorProps> = ({ message }) => {
    return (
        <p className='text-[0.8rem] font-medium text-destructive'>
            {message}
        </p>
    );
};

export default FormError;