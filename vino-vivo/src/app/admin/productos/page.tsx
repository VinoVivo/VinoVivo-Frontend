import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import AdminMisProductos from '@/components/adminMisProductos/page'
import { getServerSession } from 'next-auth'
import React from 'react'
import { headers } from 'next/headers'

interface SignInPageProp {
  params: object;
  searchParams: {
    callbackUrl: string;
    error: string;
    id: number
  };
}



// Actualizar la función deleteProducto para llamar a la API route
export const deleteProducto = async (id: number) => {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }

    console.log('Product deleted successfully');
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};


export default async function AdminProducts() {
 
  return (
    <AdminMisProductos  />
  )
}

