import { UseFormRegisterReturn } from 'react-hook-form';

interface SelectInputProps {
    label: string;
    options: { id: number; name: string }[];
    register: UseFormRegisterReturn;
    error?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({ label, options, register, error }) => (
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={register.name}>
            {label}
        </label>
        <select
            {...register}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
        >
            <option value="">Selecciona una opción</option>
            {options.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            ))}
        </select>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
);

export default SelectInput;