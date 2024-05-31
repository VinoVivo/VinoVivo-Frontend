import { Button } from '@/components/ui/button';
import { ProductFormValues } from '@/types/products/products.types';
import { SubmitHandler, useForm } from 'react-hook-form';

interface ProductFormProps {
    onSubmit: SubmitHandler<ProductFormValues>;
    wineries: { id: number, name: string }[];
    types: { id: number, name: string }[];
    varieties: { id: number, name: string }[];
};

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, wineries, types, varieties}) => {
    
    const { register, handleSubmit, formState: { errors } } = useForm<ProductFormValues>();
    
    const handleTextInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!/^[A-Za-z\s]*$/.test(e.key) && e.key !== 'Backspace') {
            e.preventDefault();
        }
    };

    const handleNumberInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!/^\d*\.?\d*$/.test(e.key) && e.key !== 'Backspace') {
            e.preventDefault();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="shadow-md rounded px-8 pt-6 pb-8 my-6 grid gap-4 sm:grid-cols-2 border-primary border-2">
            {/* name */}
            <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Nombre del Vino
                    </label>
                    <input
                        {...register('name', {
                            required: 'Este campo es requerido',
                            minLength: { value: 5, message: 'Debe tener al menos 5 caracteres' },
                            pattern: { value: /^[A-Za-z\s]+$/, message: 'Solo se permiten letras y espacios' }
                        })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Nombre del Vino"
                        onKeyDown={handleTextInput}
                    />
                    {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
                </div>
                {/* image */}               
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Imagen del producto
                    </label>
                    <input
                        {...register('image', {
                            required: 'Este campo es requerido',
                            minLength: { value: 5, message: 'Debe tener al menos 5 caracteres' },
                        })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Imagen del producto"
                    />
                    {errors.image && <p className="text-red-500 text-xs italic">{errors.image.message}</p>}
                </div>                
                {/* wine type */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="idType">
                        Tipo de Vino
                    </label>
                    <select
                        {...register('idType', { required: 'Este campo es requerido' })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline "
                    >
                        <option value="">Selecciona el tipo de vino</option>
                        {types.map((type) => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                    </select>
                    {errors.idType && <p className="text-red-500 text-xs italic">{errors.idType.message}</p>}
                </div>
                {/* wine winnery */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="idWinery">
                        Bodega del Vino
                    </label>
                    <select
                        {...register('idWinery', {
                            required: 'Este campo es requerido',
                        })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Selecciona la bodega del vino</option>
                        {wineries.map((winery) => (
                            <option key={winery.id} value={winery.id}>{winery.name}</option>
                        ))}
                    </select>
                    {errors.idWinery && <p className="text-red-500 text-xs italic">{errors.idWinery.message}</p>}
                </div>
                {/* grape variety */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="idVariety">
                        Variedad de uva
                    </label>
                    <select
                        {...register('idVariety', { required: 'Este campo es requerido' })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Selecciona la variedad de uva</option>
                        {varieties.map((variety) => (
                            <option key={variety.id} value={variety.id}>{variety.name}</option>
                        ))}
                    </select>
                    {errors.idVariety && <p className="text-red-500 text-xs italic">{errors.idVariety.message}</p>}
                </div>
                {/* stock */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                        Stock
                    </label>
                    <input
                        {...register('stock', {
                            required: 'Este campo es requerido',
                            min: { value: 1, message: 'Debe ser al menos 1' },
                            maxLength: { value: 9, message: 'Debe tener máximo 9 caracteres' },
                            pattern: { value: /^\d+$/, message: 'Solo se permiten números' }
                        })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="numero de unidades disponible"
                        onKeyDown={handleNumberInput}
                    />
                    {errors.stock && <p className="text-red-500 text-xs italic">{errors.stock.message}</p>}
                </div>            
                {/* price */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        Precio
                    </label>
                    <input
                        {...register('price', {
                            required: 'Este campo es requerido',
                            min: { value: 1, message: 'Debe ser al menos 1' },
                            maxLength: { value: 9, message: 'Debe tener máximo 9 caracteres' },
                            pattern: { value: /^\d*\.?\d*$/, message: 'Debe ser un número válido' }
                        })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Precio"
                        onKeyDown={handleNumberInput}
                    />
                    {errors.price && <p className="text-red-500 text-xs italic">{errors.price.message}</p>}
                </div>
                {/* year */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
                        Año
                    </label>
                    <input
                        {...register('year', {
                            required: 'Este campo es requerido',
                            min: { value: 1, message: 'Debe ser al menos 1' },
                            maxLength: { value: 9, message: 'Debe tener máximo 9 caracteres' },
                            pattern: { value: /^\d+$/, message: 'Solo se permiten números' }
                        })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="Año"
                        onKeyDown={handleNumberInput}
                    />
                    {errors.year && <p className="text-red-500 text-xs italic">{errors.year.message}</p>}
                </div>
                {/* description */}
                <div className="mb-4 col-span-full">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Descripción
                    </label>
                    <textarea
                        {...register('description', {
                            required: 'Este campo es requerido',
                            minLength: { value: 30, message: 'Debe tener al menos 20 caracteres' },
                            maxLength: { value: 400, message: 'Debe tener hasta 200 caracteres' },
                        })}
                        className=" h-30 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Descripción"
                    />
                    {errors.description && <p className="text-red-500 text-xs italic">{errors.description.message}</p>}
                </div>
            {/* Button */}
            <div className="flex justify-end col-span-full ">
                <Button
                    className=" 
                        bg-primary 
                        text-white
                        hover: hover:bg-white 
                        hover:text-primary 
                        hover:border-primary    
                        border-2   
                        w-full "
                    type="submit"
                >
                    Crear Producto
                </Button>
            </div>
        </form>
    );
};

export default ProductForm;