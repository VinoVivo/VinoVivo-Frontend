'use client'
import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';

interface ProductState {
  productList: any[];
  productDetail: any;
}

interface Action {
  type: 'GET_PRODUCTS' | 'GET_PRODUCT';
  payload: any;
}

interface ContextProps {
  productListState: ProductState;
  productListDispatch: Dispatch<Action>;
  getProductList: () => void;
  getProduct: (url: string) => void;
}

const ContextGlobal = createContext<ContextProps | undefined>(undefined);

const initialProductState: ProductState = { productList: [], productDetail: {} };

const productReducer = (state: ProductState, action: Action): ProductState => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return { productList: action.payload, productDetail: state.productDetail };
    case 'GET_PRODUCT':
      return { productDetail: action.payload, productList: state.productList };
    default:
      return state;
  }
};

interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [productListState, productListDispatch] = useReducer(productReducer, initialProductState);

  const baseUrl: string = 'http://localhost:8082';

  const getProductList = (): void => {
    const url: string = `${baseUrl}/product/type/all`;
    fetch(url)
      .then(response => response.json())
      .then(data => productListDispatch({ type: 'GET_PRODUCTS', payload: data }))
      .catch(error => console.error('Error fetching products:', error));
  };

  const getProduct = (url: string): void => {
    fetch(url)
      .then(response => response.json())
      .then(data => productListDispatch({ type: 'GET_PRODUCT', payload: data }))
      .catch(error => console.error('Error fetching product:', error));
  };

  return (
    <ContextGlobal.Provider value={{ productListState, productListDispatch, getProductList, getProduct }}>
      {children}
    </ContextGlobal.Provider>
  );
};

export default ContextProvider;

export const useGlobalStates = (): ContextProps => {
  const context = useContext(ContextGlobal);
  if (context === undefined) {
    throw new Error('useGlobalStates must be used within a ContextProvider');
  }
  return context;
};
