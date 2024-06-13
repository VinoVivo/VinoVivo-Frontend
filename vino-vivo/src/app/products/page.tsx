"use client";
import React, { useState, useEffect } from "react";
import { getProductList } from "@/lib/utils";
import { Product } from "@/types/products/products.types";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import DialogeMessage from "@/components/product/register/DialogeMessage";
import ProductCard from "@/components/product/ProductCard";
import ProductFilters from "@/components/product/ProductsFilter";
import PaginationComponent from "@/components/pagination/PaginationComponent";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVarieties, setSelectedVarieties] = useState<string[]>([]);
  const [selectedWineries, setSelectedWineries] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const { openCart, addToCart } = useCart();
  const { data: session } = useSession();
  const [showAlert, setShowAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const startIndex = (currentPage - 1) * pageSize;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(products.length / pageSize);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProductList();
        setProducts(productList);
        setFilteredProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products.filter((product) => {
      if (
        searchTerm &&
        !product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      if (
        selectedTypes.length > 0 &&
        !selectedTypes.includes(product.nameType)
      ) {
        return false;
      }
      if (
        selectedVarieties.length > 0 &&
        !selectedVarieties.includes(product.nameVariety)
      ) {
        return false;
      }
      if (
        selectedWineries.length > 0 &&
        !selectedWineries.includes(product.nameWinery)
      ) {
        return false;
      }
      if (selectedYears.length > 0 && !selectedYears.includes(product.year)) {
        return false;
      }
      if (minPrice !== null && product.price < minPrice) {
        return false;
      }
      if (maxPrice !== null && product.price > maxPrice) {
        return false;
      }
      return true;
    });
    setFilteredProducts(filtered);
  }, [
    products,
    searchTerm,
    selectedTypes,
    selectedVarieties,
    selectedWineries,
    selectedYears,
    minPrice,
    maxPrice,
  ]);

  const handleBuyButtonClick = (product: Product) => {
    if (!session) {
      setShowAlert(true);
      return;
    }
    const item = {
      id: product.id,
      name: product.name,
      variety: product.nameVariety,
      price: product.price,
      image: product.image,
      quantity: 1,
    };
    addToCart(item);
    openCart();
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <div className="mt-20 sm:mt-40 mb-6 flex flex-col sm:flex-row">
        {/* Filtros */}
        <ProductFilters
          products={products}
          selectedTypes={selectedTypes}
          selectedVarieties={selectedVarieties}
          selectedWineries={selectedWineries}
          selectedYears={selectedYears}
          minPrice={minPrice}
          maxPrice={maxPrice}
          setSearchTerm={setSearchTerm}
          setSelectedTypes={setSelectedTypes}
          setSelectedVarieties={setSelectedVarieties}
          setSelectedWineries={setSelectedWineries}
          setSelectedYears={setSelectedYears}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
        />

        {/* Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBuyClick={() => handleBuyButtonClick(product)}
            />
          ))}
        </div>
      </div>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      <DialogeMessage
        open={showAlert}
        onOpenChange={handleCloseAlert}
        type="Alert"
        message="Debe estar logeado para comprar productos"
        textButtonOne="Cerrar"
      />
    </>
  );
};

export default ProductsPage;