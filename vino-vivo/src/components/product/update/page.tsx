'use client'
import { Title } from '@/components/Title/Title';
import BackButton from '@/components/ui/BackButton';
import { AlertDialogAction, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { getProduct, getType, getVariety, getWinery} from '@/lib/utils';
import { IIdName } from '@/types/idName/idName.types';
import {  Product, ProductFormValues } from '@/types/products/products.types';
import { AlertDialog, AlertDialogContent } from '@radix-ui/react-alert-dialog';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdReportGmailerrorred } from "react-icons/md";

export default function UpdateProductForm({ id }: { id: number }) {
    const [product, setProduct] = useState<Product>()
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const [dialogType, setDialogType] = useState<"success" | "error">("success");
    const [wineries, setWineries] = useState<IIdName[]>([]);
    const [types, setTypes] = useState<IIdName[]>([]);
    const [varieties, setVarieties] = useState<IIdName[]>([]);
    const { register, handleSubmit,  setValue, formState: { errors } } = useForm<ProductFormValues>();
    const defaultWineryId = wineries.find(winery => winery.name === product?.nameWinery)?.id;
    const defaultTypeId = types.find(type => type.name === product?.nameType)?.id;
    const defaultVarietyId = varieties.find(variety => variety.name === product?.nameVariety)?.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productResponse, wineriesResponse, typesResponse, varietiesResponse] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/product/id/${id}`).then(res => res.json()),
                    fetch(`${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/winery/all`).then(res => res.json()),
                    fetch(`${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/type/all`).then(res => res.json()),
                    fetch(`${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/variety/all`).then(res => res.json())
                ]);
                setProduct(productResponse);
                setWineries(wineriesResponse);
                setTypes(typesResponse);
                setVarieties(varietiesResponse);

                setValue('name', productResponse.name);
                setValue('image', productResponse.image);
                setValue('idType', typesResponse.find(type => type.name === productResponse.nameType)?.id || undefined as number | undefined);
                setValue('idWinery', wineriesResponse.find(winery => winery.name === productResponse.nameWinery)?.id ||  undefined as number | undefined);
                setValue('idVariety', varietiesResponse.find(variety => variety.name === productResponse.nameVariety)?.id || undefined as number | undefined);
                setValue('stock', productResponse.stock);
                setValue('price', productResponse.price);
                setValue('year', productResponse.year);
                setValue('description', productResponse.description);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

 

   


    const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
        try {
            const payload = { ...data };

            const response = await fetch(`${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/product/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id, ...payload })
            });

            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            const responseData = await response.json();
            console.log('Producto actualizado:', responseData);
            setDialogType("success");
            setDialogMessage('Su producto ha sido actualizado exitosamente');
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            setDialogType("error");
            setDialogMessage('Su producto no ha podido ser actualizado, por favor revise los datos e intente nuevamente');
        } finally {
            setDialogOpen(true);
        }
    
    }

    const handleTextAndNumberInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]*$/.test(e.key) && e.key !== 'Backspace') {
            e.preventDefault();
        }
    };

    const handleNumberInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!/^\d*\.?\d*$/.test(e.key) && e.key !== 'Backspace') {
            e.preventDefault();
        }
    };

    return (
        <div className="max-w-4xl mx-auto my-40 sm:mx-auto">
            <div className='flex direction-row'>
                <Title title="Actualizar Producto" color="beige"/>
                <span className="ml-2 "><BackButton/></span>
            </div>            
            <form onSubmit={handleSubmit(onSubmit)} className=" shadow-md rounded px-8 pt-6 pb-8 my-6 grid gap-4 sm:grid-cols-2 border-primary border-2">
                {/* name */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Nombre del Vino
                    </label>
                    <input
                        {...register(`name`, {
                            required: 'Este campo es requerido',
                            minLength: { value: 5, message: 'Debe tener al menos 5 caracteres' },
                            pattern: { value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]*/, message: 'Solo se permiten letras, números y espacios' }
                        })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        defaultValue={product?.name }
                        onKeyDown={handleTextAndNumberInput}
                    />
                    { errors.name  && <p className="text-red-500 text-xs italic">{errors.name.message}</p>} 
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
                        defaultValue={product?.image || ''}
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
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        defaultValue={defaultTypeId || ''}
                   >
                        <option value=''>Seleciona un tipo</option>
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
                            defaultValue={defaultWineryId}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value=''>Seleciona una bodega</option>
                            {wineries.map((winery) => (
                                <option key={winery.id} value={winery.id}>
                                    {winery.name}
                                </option>
                            ))}
                    </select>
                                            
                    { errors.idWinery && <p className="text-red-500 text-xs italic">{errors.idWinery.message}</p>} 
                </div>
                {/* grape variety */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="idVariety">
                        Variedad de uva
                    </label>
                    <select
                        {...register('idVariety', { required: 'Este campo es requerido' })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        defaultValue={defaultVarietyId}
                   >   
                       <option value=''>Seleciona un variedad</option>
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
                        defaultValue={product?.stock || ''}
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
                        defaultValue={product?.price || ''}
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
                        defaultValue={product?.year || ''}
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
                        defaultValue={product?.description || ''}
                    />
                     {errors.description && <p className="text-red-500 text-xs italic">{errors.description.message}</p>} 
                </div>
                {/* botón */}
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
                     Actualizar Producto
                    </Button>
                </div>
            </form>
            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialogContent className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-10 shadow-lg justify-between border-primary border-2">
                    <AlertDialogHeader className="flex flex-col items-center">                        
                            <AlertDialogTitle className='mt-2 mb-2 text-3xl'>
                                {dialogType === "success" ? "Éxito" : "Error"}                                
                            </AlertDialogTitle>
                            {dialogType === "success" ? (
                                    <FaRegCircleCheck className="h-12 w-12 text-success mb-2" />
                                ) : (
                                    <MdReportGmailerrorred className="h-12 w-12 text-destructive mb-2" />
                                )}
                            <AlertDialogDescription className='text-base'>
                                {dialogMessage}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className='mt-4'>
                            <AlertDialogAction onClick={() => setDialogOpen(false)}>
                                Cerrar
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
