export interface DetailPageProps {
    params: {
        productId: string;
    };
}

export interface IwineDetail {
    id: number,    
    name: string,
    description: string,
    image: string,
    year: number, 
    price: number,
    stock: number,
    nameWinery: string,
    nameVariety: string,
    nameType: string,        
}

export interface WineType {
    id: number;
    name: string;
}