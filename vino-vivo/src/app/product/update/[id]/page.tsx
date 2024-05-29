import React from 'react';
import UpdateProductForm from '@/components/product/update/page';
import { IwineDetail } from '@/types/detail/detail.types';
import { notFound } from 'next/navigation';
import { Product, ProductFormValues } from '@/types/products/products.types';




interface DetailPageProps {
    params: {
id: number| undefined;
    };
}

async function fetchProductData(id: number | undefined): Promise<Product | null> {
    try {
    const response = await fetch(`http://localhost:8082/product/id/${id}`, {
      cache: 'no-store', // Esto asegura que se obtengan datos frescos en cada solicitud.
    });

    if (!response.ok) {
        return null;
    };

    const productData = await response.json();

    const product: Product = {
        id: Number(productData.id),
        name: productData.name,
        description: productData.description,
        image: productData.image,
        year: productData.year,
        price: productData.price,
        stock: productData.stock,
        nameWinery: productData.nameWinary,
        nameVariety: productData.nameVariety,
        nameType: productData.nameType,
        };
        return product;
    } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
        return null;
    }
}

export default async function UpdatePageId({ params }: Readonly<DetailPageProps>) {
    const  product: Product | null = await fetchProductData(params.id);

    if (!product) {
        notFound;
    }

    return <>{ product && <UpdateProductForm id={product.id} />}</>;
}

