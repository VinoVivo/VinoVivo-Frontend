import { IIdName } from "@/types/idName/idName.types";
import { Product, ProductFormValues } from "@/types/products/products.types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const baseUrl: string = 'http://localhost:8082';

export const getProductList = async (): Promise<Product[]> => {
  const url: string = `${baseUrl}/product/type/all`;

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    
    if (!response.ok) {
      throw new Error('Error fetching products'); // Lanzar un error si la solicitud no es exitosa
    }
    
    const data: Product[] = await response.json();
       
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Lanzar el error para que pueda ser manejado por el código que llama a esta función
  }
};

export const getProduct = async (id:any) => {
  const url: string = `${baseUrl}/product/id/${id}`;
  const response = await fetch(url, { cache: 'no-store' }) ;
  if (!response.ok) {
    throw new Error('Error fetching ');
  }
  const products = await response.json();
  return products;
};

export const getVarietyList = async (): Promise<IIdName[]> => {
  const url: string = `${baseUrl}/product/variety/all`;

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    
    if (!response.ok) {
      throw new Error('Error fetching products'); // Lanzar un error si la solicitud no es exitosa
    }
    
    const dataVariety: IIdName[] = await response.json();
       
    return dataVariety;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Lanzar el error para que pueda ser manejado por el código que llama a esta función
  }
};

export const getTypeList = async (): Promise<IIdName[]> => {
  const url: string = `${baseUrl}/product/type/all`;

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    
    if (!response.ok) {
      throw new Error('Error fetching products'); // Lanzar un error si la solicitud no es exitosa
    }
    
    const dataType: IIdName[] = await response.json();
       
    return dataType;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Lanzar el error para que pueda ser manejado por el código que llama a esta función
  }
};

export const getWineryList = async (): Promise<IIdName[]> => {
  const url: string = `${baseUrl}/product/winery/all`;

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    
    if (!response.ok) {
      throw new Error('Error fetching products'); // Lanzar un error si la solicitud no es exitosa
    }
    
    const dataWinery: IIdName[] = await response.json();
       
    return dataWinery;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Lanzar el error para que pueda ser manejado por el código que llama a esta función
  }
};



export const deleteProduct= async (id:number): Promise<IIdName[]> => {
  const url: string = `${baseUrl}/product/delete/${id}`;

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    
    if (!response.ok) {
      throw new Error('Error fetching products'); // Lanzar un error si la solicitud no es exitosa
    }
    
    const dataWinery: IIdName[] = await response.json();
       
    return dataWinery;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Lanzar el error para que pueda ser manejado por el código que llama a esta función
  }
};


export const updateProduct= async (id:string, data:ProductFormValues): Promise<Product> => {

  const url: string = `${baseUrl}/product/update/${id}`;

  try {
    const payload = { ...data };

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...payload })
    });
    
    
    if (!response.ok) {
      throw new Error('Error fetching products'); // Lanzar un error si la solicitud no es exitosa
    }
    
    const dataProduct: Product = await response.json();
       
    return dataProduct;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Lanzar el error para que pueda ser manejado por el código que llama a esta función
  }
};


