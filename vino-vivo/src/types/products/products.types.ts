import { ReactNode } from "react";

export interface Product {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    stock?:number;
    nameWinery: string,
    nameVariety: string,
    nameType: string 
    year?: number
}

export interface ProductFormValues {
    id?: string,
    name: string;
    description: string;    
    image: string;
    year: number;
    price: number; 
    stock: number;   
    idWinery: number;
    idVariety: number;    
    idType: number;                   
};

export interface ICardProduct{
    product: Product;
    textButton: string;
    icon?: ReactNode;
    onclick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    href: string
}