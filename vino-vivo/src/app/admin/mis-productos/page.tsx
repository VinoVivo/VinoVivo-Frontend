'use client'
import AdminMisProductos from '@/components/adminMisProductos/page'
import { IwineDetail } from '@/types/detail/detail.types';
import React from 'react'

const MisProductos= () => {

  
  const deleteProduct = async (id: number) => {
    try {
      const url: string = `http://localhost:8082/product/delete/${id}`; 
      const response = await fetch(`http://localhost:8082/product/delete/${id}`, {
        method: 'DELETE',
              });
  
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
  
    
    } catch (error) {
      console.error('Error deleting product:', error);
   
    }
  };
  
 
  return (
   <AdminMisProductos deleteProduct={deleteProduct}/>
  )
}

export default MisProductos