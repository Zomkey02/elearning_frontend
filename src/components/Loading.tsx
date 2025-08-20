import React from 'react'
import { RiLoader2Line } from 'react-icons/ri';

export const Spinner: React.FC<{size?: number; label?: string; className?: string}> = ({
    size = 24,
    label,
    className = '',
}) => (
    <div className='flex items-center' role='status'>
        <RiLoader2Line className={`animate-spin ${className}`} size={size} />
        {label ? <span className='text-sm'>{label}</span> : null}
    </div>
);

export const PageLoader: React.FC<{label?:string; }> = ({
    label = 'Loading...'
}) => (
    <div className='place-items-center'>
        <Spinner size={28} label={label} />
    </div>
);

export const SectionLoader: React.FC<{label?:string; }> = ({
    label = 'Loading...'
}) => (
    <div className='place-items-center'>
        <Spinner size={28} label={label} />
    </div>
);