
import React  from 'react';
import CardProduct from './cardProduct';
import { getProductList } from '@/lib/utils';
import {  Product } from '@/types/products/products.types';
import { IoMdTrash } from 'react-icons/io';


const ProductGrid  = async () => {
  interface DetailPageProps {
    params: {
        id: string;
    };
}
  const productList = await getProductList()


  return (
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-[150px]">
      {productList.map((product: Product,  index: number) => (
        <CardProduct key={index} product={product} textButton="Editar" href='product/update' icon={<IoMdTrash className='text-desctructive '/>} />
      ))}
    </div>
  );
};

export default ProductGrid;
