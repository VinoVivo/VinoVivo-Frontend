'use client'
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';

interface ProductFormValues {
    name: string;
    description: string;    
    image: string;
    year: number;
    price: number; 
    stock: number;   
    nameWinery: string;
    nameVariety: string;    
    nameType: string;                   
};

export default function RegisterProductForm() {

    const { register, handleSubmit, formState: { errors } } = useForm<ProductFormValues>();

    // const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    //     try {
    //         const response = await axios.post('http://localhost:8082/product/create', {
    //             id: 0,
    //             ...data,
    //             idWinery: 4,
    //             idVariety: 4,   
    //             idType: 3,
    //         });
    //         console.log('Producto creado:', response.data);
    //     } catch (error) {
    //         console.error('Error al crear el producto:', error);
    //     }
    // };
    const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
        try {
            const payload = {
                ...data,
            };

            const response = await fetch('http://localhost:8082/product/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: 0, ...payload })
            });

            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            const responseData = await response.json();
            console.log('Producto creado:', responseData);
        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
    };
    
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
        <div className="max-w-lg mx-auto my-40">
            <h1 className="text-2xl font-bold my-4">Registro de Producto</h1>
            <form onSubmit={handleSubmit(onSubmit)} className=" shadow-md rounded px-8 pt-6 pb-8 mb-4 grid gap-4 sm:grid-cols-2 ">
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
                {/* description */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Descripción
                    </label>
                    <textarea
                        {...register('description', {
                            required: 'Este campo es requerido',
                            minLength: { value: 20, message: 'Debe tener al menos 20 caracteres' },
                        })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Descripción"
                    />
                    {errors.description && <p className="text-red-500 text-xs italic">{errors.description.message}</p>}
                </div>
                {/* wine type */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nameType">
                        Tipo de Vino
                    </label>
                    <select
                        {...register('nameType', { required: 'Este campo es requerido' })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Selecciona el tipo de vino</option>
                        <option value="tinto">Tinto</option>
                        <option value="blanco">Blanco</option>
                        <option value="espumoso">Espumoso</option>
                        <option value="rosado">Rosado</option>
                    </select>
                    {errors.nameType && <p className="text-red-500 text-xs italic">{errors.nameType.message}</p>}
                </div>
                {/* wine winnery */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nameWinery">
                        Bodega del Vino
                    </label>
                    <input
                        {...register('nameWinery', {
                            required: 'Este campo es requerido',
                            minLength: { value: 5, message: 'Debe tener al menos 5 caracteres' },
                            maxLength: { value: 20, message: 'Debe tener máximo 20 caracteres' },
                            pattern: { value: /^[A-Za-z\s]+$/, message: 'Solo se permiten letras y espacios' }
                        })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Bodega del Vino"
                        onKeyDown={handleTextInput}
                    />
                    {errors.nameWinery && <p className="text-red-500 text-xs italic">{errors.nameWinery.message}</p>}
                </div>
                {/* grape variety */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nameVariety">
                        Variedad de uva
                    </label>
                    <input
                        {...register('nameVariety', {
                            required: 'Este campo es requerido',
                            minLength: { value: 5, message: 'Debe tener al menos 5 caracteres' },
                            pattern: { value: /^[A-Za-z\s]+$/, message: 'Solo se permiten letras y espacios' }
                        })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Variedad de uva"
                        onKeyDown={handleTextInput}
                    />
                    {errors.nameVariety && <p className="text-red-500 text-xs italic">{errors.nameVariety.message}</p>}
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
                {/* botón */}
                <div className="flex items-center justify-end  ">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                        type="submit"
                    >
                        Crear
                    </button>
                </div>
            </form>
        </div>
    );
}


// div -option - para subir imagen
                {/* <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Subir una imagen
                    </label>
                    <input
                        {...register('image', { required: 'Este campo es requerido' })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="file"
                    />
                    {/* {errors.image && <p className="text-red-500 text-xs italic">{errors.image.message}</p>} */}
                {/* </div> */} 