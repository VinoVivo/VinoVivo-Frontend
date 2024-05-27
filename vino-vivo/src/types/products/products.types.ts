interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    idVariety: string;
}

export interface ProductFormValues {
    name: string;
    description: string;    
    image: string;
    year: number;
    price: number; 
    stock: number;   
    nameWinery: string;
    nameVariety: string;    
    nameType: string;                   
};