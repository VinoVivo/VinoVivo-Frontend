import clsx from 'clsx';
import React, { useState, ReactNode } from 'react';
import { MdExpandMore } from "react-icons/md";

interface AccordionProps {
    title: string;
    children: ReactNode;
    iconColor?: string;
    iconThickness?: string;
    iconSize?: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, iconColor = "currentColor", iconThickness = "1.5", iconSize = '4' }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border border-gray-200 mb-2 rounded-lg">
            <button
                onClick={toggleAccordion}
                className="w-full px-4 py-2 text-left font-semibold bg-gray-100 rounded-t-lg focus:outline-none flex justify-between items-center"
            >
                {title}
                <MdExpandMore
                    className={clsx('size-4 mt-1', `text-${iconColor}`, `stroke-${iconThickness}`,`size-${iconSize}`,)}
                />
                {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={iconThickness}
                    stroke={iconColor}
                    className={`w-6 h-6 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg> */}
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
