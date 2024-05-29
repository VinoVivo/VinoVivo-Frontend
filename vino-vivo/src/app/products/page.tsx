"use client";
import React, { useState, useEffect } from "react";
import { getProductList } from "@/lib/utils";
import Link from "next/link";
import Loader from "@/components/loader/page";
import { FaSearch } from "react-icons/fa";
import { Title } from "@/components/Title/Title";
import Accordion from "@/components/accordion/page";
import { Product } from "@/types/products/products.types";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVarieties, setSelectedVarieties] = useState<string[]>([]);
  const [selectedWineries, setSelectedWineries] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

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
    minPrice,
    maxPrice,
  ]);

  const handleVarietyChange = (variety: string) => {
    if (selectedVarieties.includes(variety)) {
      setSelectedVarieties(selectedVarieties.filter((v) => v !== variety));
    } else {
      setSelectedVarieties([...selectedVarieties, variety]);
    }
  };

  const handleTypeChange = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleWineryChange = (winery: string) => {
    if (selectedWineries.includes(winery)) {
      setSelectedWineries(selectedWineries.filter((v) => v !== winery));
    } else {
      setSelectedWineries([...selectedWineries, winery]);
    }
  };

  return (
    <div className="mt-20 sm:mt-40 mb-6 flex flex-col sm:flex-row">
      {/* Filtros */}
      <div className="w-full sm:w-72 p-3 mt-4 sm:mt-0">
        <Title title="Filtros" color="beige" />
        <div className="mt-4">
          <Accordion title="Tipo">
            <ul>
              {Array.from(
                new Set(products.map((product) => product.nameType))
              ).map((type) => (
                <li key={type} className="mb-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeChange(type)}
                      className="mr-2 accent-violeta"
                    />
                    <span>{type === "Todos" ? "Todos" : type}</span>
                  </label>
                </li>
              ))}
            </ul>
          </Accordion>

          <Accordion title="Variedad">
            <ul>
              {Array.from(
                new Set(products.map((product) => product.nameVariety))
              ).map((variety) => (
                <li key={variety} className="mb-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedVarieties.includes(variety)}
                      onChange={() => handleVarietyChange(variety)}
                      className="mr-2 accent-violeta"
                    />
                    <span>{variety === "Todas" ? "Todas" : variety}</span>
                  </label>
                </li>
              ))}
            </ul>
          </Accordion>

          <Accordion title="Bodega">
            <ul>
              {Array.from(
                new Set(products.map((product) => product.nameWinery))
              ).map((winery) => (
                <li key={winery} className="mb-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedWineries.includes(winery)}
                      onChange={() => handleWineryChange(winery)}
                      className="mr-2 accent-violeta"
                    />
                    <span>{winery === "Todas" ? "Todas" : winery}</span>
                  </label>
                </li>
              ))}
            </ul>
          </Accordion>

          <Accordion title="Precio">
            <div>
              <input
                type="number"
                placeholder="Mínimo"
                value={minPrice || ""}
                onChange={(e) =>
                  setMinPrice(
                    e.target.value !== "" ? parseFloat(e.target.value) : null
                  )
                }
                className="border border-gray-200 rounded-lg w-full px-2 py-1 shadow-sm h-8 mb-2"
              />
              <input
                type="number"
                placeholder="Máximo"
                value={maxPrice || ""}
                onChange={(e) =>
                  setMaxPrice(
                    e.target.value !== "" ? parseFloat(e.target.value) : null
                  )
                }
                className="border border-gray-200 rounded-lg w-full px-2 py-1 shadow-sm h-8"
              />
            </div>
          </Accordion>
        </div>
      </div>

      {/* Productos */}
      <div className="flex-1 border-l border-gray-200 p-3">
        <Title title="Todos los Productos" color="beige" />
        <div className="flex justify-center items-center space-x-1 mb-4 mt-4">
          <input
            className="text-violeta px-2 py-1 border border-gray-300 rounded-lg shadow-sm w-full sm:w-2/3 md:w-1/2 lg:w-1/3"
            type="text"
            placeholder="Buscar por nombre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="text-violeta text-xl" />
        </div>
        {loading && <Loader />}
        <div className="flex justify-center">
          {filteredProducts.length === 0 && !loading ? (
            <div className="flex items-start justify-center min-h-screen">
              <p className="text-violeta text-xl font-semibold">
                No se encontraron productos
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5 gap-10">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg border border-gray-200 p-6 w-full sm:w-64"
                >
                  <Link href={`/detail/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-auto transform transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                  <div className="flex flex-col items-center mt-2">
                    <p className="text-md font-bold text-black h-12 text-center">
                      {product.name}
                    </p>
                    <p className="text-sm text-black mt-2">
                      {product.nameVariety}
                    </p>
                    <p className="text-md font-semibold text-black">
                      ${product.price}
                    </p>
                  </div>
                  <button className="bg-violeta hover:bg-fuchsia-950 text-white font-bold mt-2 py-1.5 px-4 rounded w-full">
                    COMPRAR
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
