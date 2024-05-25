import { createContext, useContext, useReducer } from "react";


const ContextGlobal = createContext({});

const initialProductState = {productList:[], productDetail:{}};

const productReducer = (state: any, action:any) => {
  switch(action.type){
   case 'GET_PRDDUCTS':
        return {productList: action.payload, productDetail: state.productDetail}
    case 'GET_PRDDUCT':
        return {productDetail: action.payload, productList: state.productDetail}

  }

}

const ContextProvider = ({children}:{children:any}) =>{
    const [productListState, productListDispatch] = useReducer(productReducer, initialProductState)
    return(
      
        <ContextGlobal.Provider value={{productListState, productListDispatch}}>
         {children}
        </ContextGlobal.Provider>
    );
};

export default ContextProvider
export const useGlobalStates=() => useContext(ContextGlobal)