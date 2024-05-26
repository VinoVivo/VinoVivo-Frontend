'use client'

import { useGlobalStates } from '@/context/page';
import React, {  useEffect } from 'react';
import CardProduct from './cardProduct';
import { ContextProps } from "@/types/context/page"; 



const ProductList = () => {
  const { productListState , getProductList } = useGlobalStates();

  useEffect(() => {
    getProductList();
  }, [ productListState ]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-[150px]">
      {productListState?.productList.map((product: Product,  index: number) => (
        <CardProduct key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
