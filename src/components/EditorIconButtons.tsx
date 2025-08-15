import React, { type ReactNode } from 'react'

type EditorIconButtonsProps = {
    onClick: () => void;
    label: string;
    active?: boolean;
    disabled?: boolean;
    children: ReactNode;
}

export function EditorIconButtons ({
    onClick,
    label,
    active,
    disabled = false,
    children,
}: EditorIconButtonsProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            title={label}
            className={`p-2 ${active ? 'bg-primary': ''} disabled:opacity-40 disabled:cursor-not-allowed`}
        >
            {children}
        </button>
        
    );
}