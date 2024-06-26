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
import { FaSearch } from "react-icons/fa";
import { Title } from "@/components/Title/Title";

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
  const [pageSize, setPageSize] = useState(6);
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1920) {
        setPageSize(8); // Cambiar a 8 productos por página 
      } else {
        setPageSize(6); // Cambiar a 6 productos por página
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      <div className="mt-[40px] md:mt-[120px] mb-6 flex flex-col md:flex-row">
        {/* Filtros */}
        <div className="flex-none w-full md:flex md:w-72 ">
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
        </div>
        <div className="mt-10 flex-1 border-l border-gray-200 xl:pr-20 xl:pl-20">
          <div className="flex mx-auto  w-2/3 lg:w-full">
            <Title title="TODOS LOS PRODUCTOS" color="beige" />
          </div>
          <div className="flex justify-center items-center space-x-1 mb-12 mt-12">
            <input
              className="text-violeta px-2 py-1 border border-gray-300 rounded-lg shadow-sm w-2/3  md:w-1/2 lg:w-1/3"
              type="text"
              placeholder="Buscar por nombre"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="text-violeta text-xl" />
          </div>
          {/* Productos */}
          <div className="grid grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4 mt-4 justify-items-center ">
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onBuyClick={() => handleBuyButtonClick(product)}
              />
            ))}
          </div>
          <div className="mt-10">
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
      <DialogeMessage
        open={showAlert}
        onOpenChange={handleCloseAlert}
        type="ALERTA"
        message="Debe estar logueado para comprar productos"
        textButtonOne="Cerrar"
      />
    </>
  );
};

export default ProductsPage;
