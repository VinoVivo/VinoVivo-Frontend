import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface TextAreaInputProps {
    label: string;
    placeholder: string;
    register: UseFormRegisterReturn;
    error?: string;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({ label, placeholder, register, error }) => (
    <div className="mb-4 col-span-full">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={register.name}>
            {label}
        </label>
        <textarea
            {...register}
            className="h-30 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder={placeholder}
        />
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
);

export default TextAreaInput;