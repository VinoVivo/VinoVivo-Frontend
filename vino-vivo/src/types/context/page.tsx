import { Dispatch } from "react";

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
    getProductList: () => void;
    getProduct: (url: string) => void;
  }