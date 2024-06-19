import clsx from 'clsx';
import React, { useState, ReactNode } from 'react';
import { MdExpandMore } from 'react-icons/md';

interface AccordionProps {
    title: string;
    children: ReactNode;
    iconColor?: string;
    iconThickness?: string;
    iconSize?: string;
    customStyles?: {
        button?: string;
        icon?: string;
        content?: string;
        borderRadius?: string;
    };
}

const Accordion: React.FC<AccordionProps> = ({
    title,
    children,
    iconColor = 'currentColor',
    iconThickness = '1.5',
    iconSize = 'h-6 w-6',
    customStyles = {},
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={clsx(
            'border border-gray-200 mb-2',
            customStyles.borderRadius ?? 'rounded-lg', 
        )}>
            <button
                onClick={toggleAccordion}
                className={clsx(
                    'w-full px-4 py-2 text-left font-semibold bg-gray-100  focus:outline-none flex justify-between items-center',
                    customStyles.button
                )}
            >
                {title}
                <MdExpandMore
                    className={clsx(
                        `text-${iconColor}`,
                        `stroke-${iconThickness}`,
                        iconSize,
                        'mt-1',
                    )}
                />
            </button>
            {isOpen && (
                <div className={clsx('px-4 py-2 bg-white', customStyles.content)}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default Accordion;
