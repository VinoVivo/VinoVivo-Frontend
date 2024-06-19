'use client';
import React, { useState, useEffect } from "react";
import { Title } from "../Title/Title";
import { Button } from "../ui/button";
import FiltersReport from "./FiltersReport";
import { Product } from "@/types/products/products.types";
import ReportOptions from "./RerportOptions";
import { WineType } from "@/types/detail/detail.types";

interface ReportModuleProps {
  products: Product[];
  types:WineType[];
}

const ReportModule: React.FC<ReportModuleProps> = ({ products, types }) => {
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);

  useEffect(() => {
      setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    let filtered = products.filter((product) => {      
      if (
        selectedTypes.length > 0 &&
        !selectedTypes.includes(product.nameType)
      ) {
        return false;
      }
      if (selectedYears.length > 0 && !selectedYears.includes(product.year)) {
        return false;
      }
      return true;
    });
    setFilteredProducts(filtered);
  }, [
    products,
    selectedTypes,
    selectedYears,
  ]);

  const handleCheckboxChange = (option: string) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(option)
        ? prevOptions.filter((item) => item !== option)
        : [...prevOptions, option]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Title title="MÓDULO DE REPORTES" color="labelAdminColor" letterSpacing="widest"/>
      <h3 className="my-6 font-bold text-graySubtittle text-xl">GENERACIÓN DE INFORMES</h3>
      <div className="flex flex-row">
        <div className="flex flex-col mt-8 justify-between border border-labelAdminColor mr-10 px-14 py-10">
          <FiltersReport 
            products={products}
            selectedTypes={selectedTypes}
            selectedYears={selectedYears}
            setSelectedTypes={setSelectedTypes}
            setSelectedYears={setSelectedYears} 
            types={types}          
          />
          <ReportOptions
            selectedOptions={selectedOptions}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
        <div className="flex flex-row mt-8 justify-between ">
          <div className="flex flex-col">
            <h5 className="border border-labelAdminColor px-14 py-10 h-80 w-96">visualizar pdf</h5>
            <div>
              <Button>Descargar PDF</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModule;
