'use client'
import { Title } from '@/components/Title/Title';
import BackButton from '@/components/ui/BackButton';
import { ProductFormValues } from '@/types/products/products.types';
import { useEffect, useState } from 'react';
import DialogeRegister from './DialogeRegister';
import ProductForm from './ProductForm';
import { SubmitHandler } from 'react-hook-form';

export default function Register() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const [dialogType, setDialogType] = useState<"Éxito" | "Error">("Éxito");
    const [wineries, setWineries] = useState<{ id: number, name: string }[]>([]);
    const [types, setTypes] = useState<{ id: number, name: string }[]>([]);
    const [varieties, setVarieties] = useState<{ id: number, name: string }[]>([]);
    
        
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [wineriesResponse, typesResponse, varietiesResponse] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/winery/all`).then(res => res.json()),
                    fetch(`${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/type/all`).then(res => res.json()),
                    fetch(`${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/variety/all`).then(res => res.json())
                ]);
                setWineries(wineriesResponse);
                setTypes(typesResponse);
                setVarieties(varietiesResponse);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
        try {
            const payload = { ...data };

            const response = await fetch(`${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/product/create`, {
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
            setDialogType("Éxito");
            setDialogMessage('Su producto ha sido creado exitosamente');
        } catch (error) {
            console.error('Error al crear el producto:', error);
            setDialogType("Error");
            setDialogMessage('Su producto no ha podido ser creado, por favor revise los datos e intente nuevamente');
        } finally {
            setDialogOpen(true);
        }

        // para probar unicamente los cuadros de dialogo sin crear un producto: 
        // const simulateSuccess = true; // Cambia esto a false para probar el caso de error
        // if (simulateSuccess) {
        //     console.log('Producto creado:', data);
        //     setDialogType("success");
        //     setDialogMessage('Su producto ha sido creado exitosamente');
            
        // } else {
        //     console.error('Error al crear el producto');
        //     setDialogType("error");
        //     setDialogMessage('Su producto no ha podido ser creado, por favor revise los datos e intente nuevamente');
        // }        
        // setDialogOpen(true);
    };
    

    return (
        <div className="max-w-4xl mx-4 my-40 lg:mx-auto">
            <div className="flex  flex-col sm:flex-row justify-between items-center mb-4">
                <Title title="Registro de Producto" color="beige"/>
                <span className="ml-2 sm:mt-0"><BackButton/></span>
            </div>            
            <ProductForm onSubmit={onSubmit} wineries={wineries} types={types} varieties={varieties}/>
            <DialogeRegister open={dialogOpen}  onOpenChange={setDialogOpen} type={dialogType} message={dialogMessage} textButtonOne={'cerrar'}/>
        </div>
    );
}