import React from 'react';
import { MdExpandMore } from 'react-icons/md';
import clsx from 'clsx';

interface SelectWithIconProps {
    label: string;
    value: string;
    options: { id: string; name: string }[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    iconColor?: string;
    iconSize?: string;
    iconThickness?: string;
    customStyles?: {
        select?: string;
        icon?: string;
    };
}

const SelectWithIcon: React.FC<SelectWithIconProps> = ({
    label,
    value,
    options,
    onChange,
    iconColor = 'currentColor',
    iconSize = 'h-6 w-6',
    iconThickness = '1.5',
    customStyles = {},
}) => {
    return (
        <div className="relative w-full mb-4">
            <label className="block text-labelAdminColor text-md font-bold mb-2" htmlFor={label}>
                {label}
            </label>
            <select
                id={label}
                value={value}
                onChange={onChange}
                className={clsx(
                    'shadow appearance-none border border-line rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline',
                    customStyles.select
                )}
            >
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
            <MdExpandMore
                className={clsx(
                    `text-${iconColor}`,
                    `stroke-${iconThickness}`,
                    iconSize,
                    'absolute right-3 top-10 pointer-events-none',
                    customStyles.icon
                )}
            />
        </div>
    );
};

export default SelectWithIcon;
