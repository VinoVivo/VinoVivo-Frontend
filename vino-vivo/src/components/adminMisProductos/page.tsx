import React from 'react';
import CardProduct from './cardProduct';
import { getProductList } from '@/lib/utils';


const ProductList = async () => {
 
  const productList:Product[] = await getProductList()

  return (
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-[150px]">
      {productList.map((product: Product,  index: number) => (
        <CardProduct key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
