import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import AdminMisProductos from '@/components/adminMisProductos/page'
import { getServerSession } from 'next-auth'
import React from 'react'

interface SignInPageProp {
  params: object;
  searchParams: {
    callbackUrl: string;
    error: string;
  };
}
export default async function AdminProducts({
  searchParams: { callbackUrl, error },
}: SignInPageProp) {
  const session = await getServerSession(authOptions);
 
  if (session) {
    console.log(session.accessToken)
  }
  return (
   <AdminMisProductos/>
  )
}

