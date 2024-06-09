import { Title } from '@/components/Title/Title'
import AdminMisProductos from '@/components/adminMisProductos/page'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'


export default async function AdminProducts() {
 
  return (
    <div className="flex flex-col justify-center items-center mt-40 ">
        <Title title="Productos" color="beige"/>
        <Link className="bg-violeta hover:bg-fuchsia-950 text-white font-bold py-1.5 px-4 my-6  rounded " href={'product/register'}>Registrar Producto</Link>
        <AdminMisProductos  />
       
    </div>
  
  )
}

