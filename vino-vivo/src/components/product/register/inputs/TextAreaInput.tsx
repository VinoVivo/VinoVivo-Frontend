import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaInputProps {
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  label,
  placeholder,
  register,
  error,
}) => (
  <div className="mb-4 col-span-full">
    <label
      className="block text-labelAdminColor text-md font-bold mb-2"
      htmlFor={register.name}
    >
      {label}
    </label>
    <textarea
      {...register}
      className="h-30 shadow appearance-none border border-line rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-inset focus:ring-violetaDos"
      placeholder={placeholder}
    />
    {error && <p className="text-red-500 text-xs italic">{error}</p>}
  </div>
);

export default TextAreaInput;
