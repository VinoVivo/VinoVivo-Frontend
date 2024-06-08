"use client";
import React, { useEffect, useState } from "react";
import CardProduct from "./cardProduct";
import { getProductList } from "@/lib/utils";
import { Product } from "@/types/products/products.types";
import { IoMdTrash } from "react-icons/io";

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const deleteProduct = async (id: number) => {
    try {
      const url: string = `${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/product/delete/${id}`; 

      const response = await fetch(url, { method: "DELETE" });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      setLoading(true);


    } catch (error) {
      console.error("Error deleting product:", error);
     
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
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-[150px]">
      {products.map((product: Product, index: number) => (
        <CardProduct
          key={index}
          product={product}
          textButton="Editar"
          href="product/update"
          deleteProduct={deleteProduct}
          icon={<IoMdTrash className="text-desctructive " />}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
