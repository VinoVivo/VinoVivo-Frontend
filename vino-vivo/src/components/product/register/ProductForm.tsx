import { ProductFormValues } from '@/types/products/products.types';
import { useForm } from 'react-hook-form';
import TextInput from './inputs/TextInput';
import SelectInput from './inputs/SelectInput';
import TextAreaInput from './inputs/TextAreaInput';
import { useState } from 'react';
import DialogeMessage from './DialogeMessage';
import BackText from '@/components/ui/BackText';
import DinamicButton from '@/components/ui/DinamicButton';

interface ProductFormProps {
    wineries: { id: number, name: string }[];
    types: { id: number, name: string }[];
    varieties: { id: number, name: string }[];
};

const ProductForm: React.FC<ProductFormProps> = ({  wineries, types, varieties}) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const [dialogType, setDialogType] = useState<"ÉXITO" | "ERROR">("ÉXITO");    
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ProductFormValues>();
    
    const handleTextAndNumberInput = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]*$/.test(e.key) && e.key !== "Backspace") {
        e.preventDefault();
        }
    };

    const handleNumberInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!/^\d*\.?\d*$/.test(e.key) && e.key !== 'Backspace') {
            e.preventDefault();
        }
    };

    const createProduct = async (data: object) => {
        try {
            const response = await fetch('/api/products/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            setDialogType("ÉXITO");
            setDialogMessage('Su producto ha sido creado exitosamente');
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            setDialogType("ERROR");
            setDialogMessage('Su producto no ha podido ser creado, por favor revise los datos e intente nuevamente');
            console.error('Error al crear el producto:', error);
            throw error;
        }finally{
            setDialogOpen(true);
            reset()
        }
        // para probar unicamente los cuadros de dialogo sin crear un producto: 
        // const simulateSuccess = true; // Cambia esto a false para probar el caso de error
        // if (simulateSuccess) {
        //     console.log('Producto creado:', data);
        //     setDialogType("Success");
        //     setDialogMessage('Su producto ha sido creado exitosamente');
            
        // } else {
        //     console.error('Error al crear el producto');
        //     setDialogType("Error");
        //     setDialogMessage('Su producto no ha podido ser creado, por favor revise los datos e intente nuevamente');
        // }        
        // setDialogOpen(true);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(createProduct)} 
                className="shadow-md rounded px-20 py-10 my-8 grid gap-4 sm:grid-cols-2 border-primary border-2 bg-backgroundForms">
                {/* name */}
                <TextInput 
                    label={'Nombre del vino'} 
                    placeholder={'Nombre del vino'} 
                    register={register('name', {                
                        required: 'Este campo es requerido',
                        minLength: { value: 5, message: 'Debe tener al menos 5 caracteres' },
                        pattern: { value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]*$/, message: 'Solo se permiten letras, números y espacios' }
                    })}
                    error={errors.name?.message}
                    onKeyDown={handleTextAndNumberInput}
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
                <div className="flex flex-col col-span-full">
                    <div className="flex justify-center">
                        <DinamicButton
                            bgColor="bg-primary"
                            textColor="text-white"
                            width="w-1/2"
                            borderRadius="rounded-md"
                            hoverBgColor="hover:bg-white"
                            hoverTextColor="hover:text-primary"
                            hoverBorderColor="hover:border-primary"
                            className="mb-4 border-2"
                        >
                            CREAR PRODUCTO
                        </DinamicButton>
                    </div>
                    <div className="flex justify-center">
                        <BackText
                            color="text-gray-700"
                            fontSize="text-lg"
                            fontWeight="font-semibold"
                            underlineWidth="border-b-2"
                        />
                    </div>
                </div>
            </form>
            <DialogeMessage 
                open={dialogOpen} 
                onOpenChange={setDialogOpen} 
                type={dialogType} 
                message={dialogMessage}
                textButtonOne="SEGUIR CREANDO"
                textButtonTwo="VOLVER A PRODUCTOS"
                buttonTwoHref="/admin/productos"
            />
        </>
    );
};

export default ProductForm;