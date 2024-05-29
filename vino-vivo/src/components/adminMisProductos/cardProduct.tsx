
'use client'
import React, { FC } from 'react'
import Link from 'next/link';
import { ICardProduct } from '@/types/products/products.types';


const CardProduct: FC<ICardProduct> = ({ product, textButton, icon, href}) => {

  

  const deleteProduct = async (id: number) => {
    try {
      const url: string = `http://localhost:8082/product/delete/${id}`; // Usando una ruta relativa
  
      const response = await fetch(url, {method: 'DELETE'});
  
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
  
      // Si la eliminación fue exitosa, podrías realizar alguna acción adicional si es necesario, como actualizar la lista de productos.
  
    } catch (error) {
      console.error('Error deleting product:', error);
      // Maneja el error de acuerdo a tus necesidades, podría ser mostrar un mensaje al usuario.
    }
  };
  


  return (
    <div key={product.id} className="bg-card rounded-lg border border-gray-200 p-6 w-full sm:w-64">
      <div className="min-h-[40px] min-w-[40px]  flex justify-end">
        {icon && <button onClick={()=> deleteProduct(product.id)} className='text-2xl text-destructive hover:text-primary '>{icon}</button>}
      </div>
      <Link href={`/detail/${product.id}`}>
        <img src={product.image} alt="no Image" width={200} height={200} className="w-full h-auto transform transition-transform duration-300 hover:scale-105" />
      </Link>
      <div className="flex flex-col items-center mt-2">
        <p className="text-md font-bold text-black h-12 text-center">{product.name}</p>
        <p className="text-sm text-black mt-2">{product.nameVariety}</p>
        <p className="text-md font-semibold text-black">${product.price}</p>
      </div>
      <Link href={`/${href}/${product.id}`}>
      <button className="bg-violeta hover:bg-fuchsia-950 text-white font-bold mt-2 py-1.5 px-4 rounded w-full">
        {textButton}
      </button>
      </Link>
    </div>
  )
}

export default CardProduct;
