import { Button } from '@/components/ui/button';
import { ProductFormValues } from '@/types/products/products.types';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextInput from './inputs/TextInput';
import SelectInput from './inputs/SelectInput';
import TextAreaInput from './inputs/TextAreaInput';

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
            <TextInput 
                label={'Nombre del vino'} 
                placeholder={'Nombre del vino'} 
                register={register('name', {                
                    required: 'Este campo es requerido',
                    minLength: { value: 5, message: 'Debe tener al menos 5 caracteres' },
                    pattern: { value: /^[A-Za-z\s]+$/, message: 'Solo se permiten letras y espacios' }
                })}
                error={errors.name?.message}
                onKeyDown={handleTextInput}
            />
            {/* image */}               
            <TextInput
                label="Imagen del producto"
                placeholder="Imagen del producto"
                register={register('image', {
                    required: 'Este campo es requerido',
                    minLength: { value: 5, message: 'Debe tener al menos 5 caracteres' },
                })}
                error={errors.image?.message}
            />
            {/* wine type */}
            <SelectInput
                label="Tipo de Vino"
                options={types}
                register={register('idType', { required: 'Este campo es requerido' })}
                error={errors.idType?.message}
            />
            {/* wine winnery */}
            <SelectInput
                label="Bodega del Vino"
                options={wineries}
                register={register('idWinery', { required: 'Este campo es requerido' })}
                error={errors.idWinery?.message}
            />
            {/* grape variety */}
            <SelectInput
                label="Variedad de uva"
                options={varieties}
                register={register('idVariety', { required: 'Este campo es requerido' })}
                error={errors.idVariety?.message}
            />
            {/* stock */}
            <TextInput
                label="Stock"
                placeholder="Número de unidades disponible"
                register={register('stock', {
                    required: 'Este campo es requerido',
                    min: { value: 1, message: 'Debe ser al menos 1' },
                    maxLength: { value: 9, message: 'Debe tener máximo 9 caracteres' },
                    pattern: { value: /^\d+$/, message: 'Solo se permiten números' }
                })}
                error={errors.stock?.message}
                onKeyDown={handleNumberInput}
            />
            {/* price */}
            <TextInput
                label="Precio"
                placeholder="Precio"
                register={register('price', {
                    required: 'Este campo es requerido',
                    min: { value: 1, message: 'Debe ser al menos 1' },
                    maxLength: { value: 9, message: 'Debe tener máximo 9 caracteres' },
                    pattern: { value: /^\d*\.?\d*$/, message: 'Debe ser un número válido' }
                })}
                error={errors.price?.message}
                onKeyDown={handleNumberInput}
            />
            {/* year */}
            <TextInput
                label="Año"
                placeholder="Año"
                register={register('year', {
                    required: 'Este campo es requerido',
                    min: { value: 1, message: 'Debe ser al menos 1' },
                    maxLength: { value: 9, message: 'Debe tener máximo 9 caracteres' },
                    pattern: { value: /^\d+$/, message: 'Solo se permiten números' }
                })}
                error={errors.year?.message}
                onKeyDown={handleNumberInput}
            />
            {/* description */}
            <TextAreaInput
                label="Descripción"
                placeholder="Descripción"
                register={register('description', {
                    required: 'Este campo es requerido',
                    minLength: { value: 30, message: 'Debe tener al menos 20 caracteres' },
                    maxLength: { value: 400, message: 'Debe tener hasta 200 caracteres' },
                })}
                error={errors.description?.message}
            />
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