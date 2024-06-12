import { Title } from '@/components/Title/Title'
import AdminMisProductos from '@/components/adminMisProductos/page'
import Link from 'next/link'
import React from 'react'
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/types/user/user.type";
import { redirect } from 'next/navigation';

export default async function AdminProducts() {
  const session = await getServerSession(authOptions);
  let decodedToken: DecodedToken | null = null;
  if (session?.accessToken) {
    decodedToken = await jwtDecode<DecodedToken>(session.accessToken);
  }
  const isAdmin = decodedToken?.realm_access?.roles.includes('admin');
  return (
    isAdmin ? (
      <div className="flex flex-col justify-center items-center mt-40 ">
        <Title title="Productos" color="beige"/>
        <Link className="bg-violeta hover:bg-fuchsia-950 text-white font-bold py-1.5 px-4 my-6  rounded " href={'product/register'}>Registrar Producto</Link>
        <AdminMisProductos  />
      </div>
    ) : (
      <div>
        {redirect("/")}
      </div>
    )
  )
}
