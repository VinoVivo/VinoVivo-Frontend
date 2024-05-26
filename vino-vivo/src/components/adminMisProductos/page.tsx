'use client'

import React from 'react';
import CardProduct from './cardProduct';




const ProductList = () => {
 
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-[150px]">
      {productListState?.productList.map((product: Product,  index: number) => (
        <CardProduct key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
