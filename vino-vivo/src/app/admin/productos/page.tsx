import AdminMisProductos from '@/components/adminMisProductos/page'
import React from 'react'

interface SignInPageProp {
  params: object;
  searchParams: {
    id: number
  };
}





export default async function AdminProducts() {
 
  return (
    <AdminMisProductos  />
  )
}

