import { Dispatch } from "react";
import { Product } from "../products/products.types";

export interface ProductState {
    productList: Product | Product[];
    productDetail: {};
  }
  
  export interface Action {
    type: 'GET_PRODUCTS' | 'GET_PRODUCT';
    payload: Product[] | Product;
  }
  
 export interface ContextProps {
    productListState: ProductState;
    productListDispatch: Dispatch<Action>;
     }