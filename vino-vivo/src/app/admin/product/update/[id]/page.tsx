import React from "react";
import { notFound, redirect } from "next/navigation";
import { Product } from "@/types/products/products.types";
import UpdateProductForm from "@/components/product/update/page";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { DecodedToken } from "@/types/user/user.type";
import { jwtDecode } from "jwt-decode";

interface DetailPageProps {
  params: {
    id: string | undefined;
  };
}

async function fetchProductData(
  id: string | undefined
): Promise<Product | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/product/id/${id}`,
      {
        cache: "no-store", // Esto asegura que se obtengan datos frescos en cada solicitud.
      }
    );

    if (!response.ok) {
      return null;
    }

    const productData = await response.json();

    const product: Product = {
      id: productData.id,
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
    console.log(product);
    return product;
  } catch (error) {
    console.error("Error al obtener los detalles del producto:", error);
    return null;
  }
}

export default async function UpdatePageId({
  params,
}: Readonly<DetailPageProps>) {
  const session = await getServerSession(authOptions);
  let decodedToken: DecodedToken | null = null;
  if (session?.accessToken) {
    decodedToken = await jwtDecode<DecodedToken>(session.accessToken);
  }
  const isAdmin = decodedToken?.realm_access?.roles.includes("admin");
  const product = await fetchProductData(params.id);

  if (!product) {
    notFound;
  }

  return isAdmin ? (
    <>{product && <UpdateProductForm id={product?.id} />}</>
  ) : (
    <div>{redirect("/")}</div>
  );
}
