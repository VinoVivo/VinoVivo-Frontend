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
    winery: string,
    variety: string,
    type: string,        
}