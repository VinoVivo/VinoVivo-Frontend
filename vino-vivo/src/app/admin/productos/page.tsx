import { Title } from "@/components/Title/Title";
import AdminMisProductos from "@/components/adminMisProductos/page";
import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/types/user/user.type";
import { redirect } from "next/navigation";

export default async function AdminProducts() {
  const session = await getServerSession(authOptions);
  let decodedToken: DecodedToken | null = null;
  if (session?.accessToken) {
    decodedToken = jwtDecode<DecodedToken>(session.accessToken);
  }
  const isAdmin = decodedToken?.realm_access?.roles.includes("admin");
  return isAdmin ? (
    <div className="flex flex-col justify-center items-center mt-40 ">
       <Title title="PRODUCTOS" color="labelAdminColor" letterSpacing='widest'/>
       <AdminMisProductos />
    </div>
  ) : (
    <div>{redirect("/")}</div>
  );
}
