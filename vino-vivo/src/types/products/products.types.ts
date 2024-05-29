import { ReactNode } from "react";

export interface Product {
    id: string;
    name: string;
    description: string;
    year: string;
    image: string;
    price: number;
    nameWinery: string,
    nameVariety: string,
    nameType: string
    idVariety: number;  
}

export interface ProductFormValues {
  name: string;
  description: string;
  image: string;
  year: number;
  price: number;
  stock: number;
  idWinery: number;
  idVariety: number;
  idType: number;
}
