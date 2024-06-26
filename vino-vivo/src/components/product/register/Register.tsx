'use client'
import { Title } from '@/components/Title/Title';
import { useEffect, useState } from 'react';
import ProductForm from './ProductForm';

export default function Register() {
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

    return (
        <div className="max-w-4xl mx-8 my-40 lg:mx-auto">
            <div className="flex  flex-col sm:flex-row justify-between items-center mb-4">
                <Title title="REGISTRO DE PRODUCTO" color="labelAdminColor" letterSpacing='widest'/>
            </div>            
            <ProductForm  wineries={wineries} types={types} varieties={varieties}/>
        </div>
    );
}