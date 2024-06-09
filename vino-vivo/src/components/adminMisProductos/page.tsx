'use client'
import React, { useEffect, useState } from "react";
import CardProduct from "./cardProduct";
import { getProductList } from "@/lib/utils";
import { Product } from "@/types/products/products.types";
import { IoMdTrash } from "react-icons/io";
import {   Pagination,
  PaginationContent,
   PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious, } from "../ui/pagination";






const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] =useState(false)
  const pageSize = 8
  const [currentPage, setCurrentPage]= useState(1)

  // Calcular los productos a mostrar en la página actual
  const startIndex = (currentPage - 1) * pageSize;
  const currentProducts = products.slice(startIndex, startIndex + pageSize);

  const totalPages = Math.ceil(products.length / pageSize);

  const deleteProducto = async (id: number) => {
    setFlag(false)
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
  
      console.log('Product deleted successfully');
      setFlag(true)
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProductList();
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [flag]);

  return (
    <div >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-[30px] ">
      {currentProducts.map((product: Product, index: number) => (
        <CardProduct
          key={index}
          product={product}
          textButton="Editar"
          href="admin/product/update"
          deleteProduct={deleteProducto}
          icon={<IoMdTrash className="text-desctructive " />}
        />
      ))}
    </div>
     <Pagination className="mt-2">
     <PaginationContent>
       <PaginationItem>
         <PaginationPrevious
           href="#"
           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
         />
       </PaginationItem>
       {Array.from({ length: totalPages }, (_, index) => (
         <PaginationItem key={index}>
           <PaginationLink
             href="#"
             onClick={() => setCurrentPage(index + 1)}
           >
             {index + 1}
           </PaginationLink>
         </PaginationItem>
       ))}
       <PaginationItem>
         <PaginationNext
           href="#"
           onClick={() =>
             setCurrentPage((prev) => Math.min(prev + 1, totalPages))
           }
         />
       </PaginationItem>
     </PaginationContent>
   </Pagination>
   </div>
  );
 
};

export default ProductGrid;
