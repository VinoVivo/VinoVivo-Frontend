'use client'
import { useForm } from 'react-hook-form';
import {  ScriptProps } from 'next/script';

export default function RegisterProductForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: ScriptProps) => {
        console.log(data); // Aquí puedes enviar los datos del formulario al backend
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
                        {...register('name', { required: 'Este campo es requerido' })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Nombre del Vino"
                    />
                    {/* {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>} */}
                </div>
                {/* description */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Descripción
                    </label>
                    <textarea
                        {...register('description', { required: 'Este campo es requerido' })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Descripción"
                    />
                    {/* {errors.description && <p className="text-red-500 text-xs italic">{errors.description.message}</p>} */}
                </div>
                {/* wine type */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                        Tipo de Vino
                    </label>
                    <select
                        {...register('type', { required: 'Este campo es requerido' })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Selecciona el tipo de vino</option>
                        <option value="tinto">Tinto</option>
                        <option value="blanco">Blanco</option>
                        <option value="espumoso">Espumoso</option>
                        <option value="rosado">Rosado</option>
                    </select>
                    {/* {errors.type && <p className="text-red-500 text-xs italic">{errors.type.message}</p>} */}
                </div>
                {/* wine winnery */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="idWinery">
                        Bodega del Vino
                    </label>
                    <input
                        {...register('idWinery', { required: 'Este campo es requerido' })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="Id Bodega del Vino"
                    />
                    {/* {errors.idWinery && <p className="text-red-500 text-xs italic">{errors.idWinery.message}</p>} */}
                </div>
                {/* grape variety */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="idVariety">
                        Variedad de uva
                    </label>
                    <input
                        {...register('idVariety', { required: 'Este campo es requerido' })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="Id Variedad de uva"
                    />
                    {/* {errors.idVariety && <p className="text-red-500 text-xs italic">{errors.idVariety.message}</p>} */}
                </div>
                {/* stock */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                        Stock
                    </label>
                    <input
                        {...register('idVariety', { required: 'Este campo es requerido' })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="numero de unidades disponible"
                    />
                    {/* {errors.stock && <p className="text-red-500 text-xs italic">{errors.stock.message}</p>} */}
                </div>            
                {/* price */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        Precio
                    </label>
                    <input
                        {...register('price', { required: 'Este campo es requerido' })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="Precio"
                    />
                    {/* {errors.price && <p className="text-red-500 text-xs italic">{errors.price.message}</p>} */}
                </div>
                {/* year */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
                        Año
                    </label>
                    <input
                        {...register('year', { required: 'Este campo es requerido' })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="Año"
                    />
                    {/* {errors.year && <p className="text-red-500 text-xs italic">{errors.year.message}</p>} */}
                </div>
                {/* image */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Subir una imagen
                    </label>
                    <input
                        {...register('image', { required: 'Este campo es requerido' })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="file"
                    />
                    {/* {errors.image && <p className="text-red-500 text-xs italic">{errors.image.message}</p>} */}
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
