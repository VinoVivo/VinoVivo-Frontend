import { ReactNode, createContext, useContext, useReducer } from "react";

const ContextGlobal = createContext({});

const initialProductState = { productList: [], productDetail: {} };

const productReducer = (state:any, action:any) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return { productList: action.payload, productDetail: state.productDetail };
    case 'GET_PRODUCT':
      return { productDetail: action.payload, productList: state.productList };
    default:
      return state;
  }
};

const ContextProvider = ({ children}:{children:ReactNode}) => {
  const [productListState, productListDispatch] = useReducer(productReducer, initialProductState);

  const baseUrl: string = 'http://localhost:8082';

  const getProductList = () => {
    const url: string = `${baseUrl}/product/type/all`;
    fetch(url)
      .then(response => response.json())
      .then(data => productListDispatch({ type: 'GET_PRODUCTS', payload: data }))
      .catch(error => console.error('Error fetching products:', error));
  };
  const getProduct = (url:string) => {
      fetch(url)
      .then(response => response.json())
      .then(data => productListDispatch({ type: 'GET_PRODUCTS', payload: data }))
      .catch(error => console.error('Error fetching products:', error));
  };
  return (
    <ContextGlobal.Provider value={{ productListState, productListDispatch, getProductList }}>
      {children}
    </ContextGlobal.Provider>
  );
};

export default ContextProvider;
export const useGlobalStates = () => useContext(ContextGlobal);
