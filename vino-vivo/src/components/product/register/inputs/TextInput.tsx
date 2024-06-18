import { UseFormRegisterReturn } from 'react-hook-form';

interface TextInputProps {
    label: string;
    placeholder: string;
    register: UseFormRegisterReturn;
    error?: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({ label, placeholder, register, error, onKeyDown }) => (
    <div className="mb-4">
        <label className="block text-labelAdminColor text-md font-bold mb-2" htmlFor={register.name}>
            {label}
        </label>
        <input
            {...register}
            className="shadow appearance-none border border-line rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder={placeholder}
            onKeyDown={onKeyDown}
        />
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
);

export default TextInput;