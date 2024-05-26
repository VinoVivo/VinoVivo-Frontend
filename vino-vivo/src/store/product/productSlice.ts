import { ProductState } from '@/types/context/page';
import { createSlice } from '@reduxjs/toolkit'


const initialState: ProductState = {
    productList: [],
    productDetail: {}

}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    
  }
});

export const {} = productSlice.actions;

export default productSlice.reducer;