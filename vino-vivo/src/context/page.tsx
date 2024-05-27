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


  return (
    <ContextGlobal.Provider value={{ productListState, productListDispatch  }}>
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
