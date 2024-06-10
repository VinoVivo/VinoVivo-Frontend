import { IIdName} from "@/types/idName/idName.types";
import { Product, ProductFormValues } from "@/types/products/products.types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { IwineDetail, WineType } from "@/types/detail/detail.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



export const getProductList = async (): Promise<Product[]> => {
  const url: string = `${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/product/type/all`;

  try {
    const response = await fetch(url, { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error("Error fetching products"); // Lanzar un error si la solicitud no es exitosa
    }

    const data: Product[] = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Lanzar el error para que pueda ser manejado por el código que llama a esta función
  }
};

// -----------------------------

export const getProduct = async (id:number) => {
  const url: string = `${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/product/id/${id}`
  const url: string = `${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/product/id/${id}`

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error fetching products');
  }
  const products = await response.json();
  return products;
};

export const getProductsType = async (type:any): Promise<IwineDetail[]> => {
  const url: string = `${baseUrl}/product/type/${type}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error fetching products");
    }

    const data: IwineDetail[] = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export const getTypes = async (): Promise<WineType[]> => {
  const url: string = `${baseUrl}/type/all`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error fetching products");
    }

    const data: WineType[] = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// -------------------------------------



export const getVariety = async (): Promise<IIdName[]> => {
  const url: string = `$${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/variety/all`

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error fetching products');
  }
  const variety:IIdName[] = await response.json();
  return variety;
};

export const getType = async (): Promise<IIdName[]> => {
  const url: string = `$${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commercetype/all`

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error fetching products');
  }
  const type:IIdName[] = await response.json();
  return type;
};

export const getWinery = async (): Promise<IIdName[]> => {
  const url: string = `$${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commercetype/all`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error fetching products');
  }
  const winery: IIdName[] = await response.json();
  return winery;
};
