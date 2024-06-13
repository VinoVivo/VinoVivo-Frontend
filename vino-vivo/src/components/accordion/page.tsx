import React, { useState, ReactNode } from 'react';

interface AccordionProps {
    title: string;
    children: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border border-gray-200">
            <button
                onClick={toggleAccordion}
                className="w-full px-4 py-2 text-left font-semibold bg-gray-100 rounded-t-lg focus:outline-none flex justify-between"
            >
                {title}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 mt-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </button>
            {isOpen && (
                <div className="px-4 py-2 bg-white">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Accordion;
