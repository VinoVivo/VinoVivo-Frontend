
export interface Product {
    id: number;
    name: string;
    description: string;
    year: string,
    image: string;
    price: number;
    nameWinery: string,
    nameVariety: string,
    nameType: string,
    stock?:number
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



export interface ICardProduct {
  product: Product, 
  textButton: string, 
  icon: React.ReactNode, 
  href: string, 
  deleteProduct: (id:number) => void
 


}