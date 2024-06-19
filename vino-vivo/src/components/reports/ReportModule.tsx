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
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedFilters, setSelectedFilters] = useState<{ type?: string; year?: string }>({ type: "", year: "" });

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    let filtered = products.filter((product) => {
        const { type, year } = selectedFilters;
        if (type && type !== "0" && product.nameType !== type) {
            return false;
        }
        if (year && year !== "0" && product.year.toString() !== year) {
            return false;
        }
        return true;
    });
    setFilteredProducts(filtered);
}, [products, selectedFilters]);

  const handleFilterChange = (filterType: "type" | "year", value: string) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };
  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
};

  return (
    <div className="flex flex-col items-center justify-center h-screen mb-10">
      <Title title="MÓDULO DE REPORTES" color="labelAdminColor" letterSpacing="widest"/>
      <h3 className="my-6 font-bold text-graySubtittle text-xl">GENERACIÓN DE INFORMES</h3>
      <div className="flex flex-row">
        <div className="flex flex-col mt-8 justify-between rounded-md border border-labelAdminColor mr-10 px-14 py-10 bg-backgroundForms w-520">
        <FiltersReport
            products={products}
            types={types}
            selectedType={selectedFilters.type} 
            selectedYear={selectedFilters.year} 
            setSelectedType={(type) => handleFilterChange("type", type)} 
            setSelectedYear={(year) => handleFilterChange("year", year)} 
          />
          <ReportOptions
            selectedOption={selectedOption}
            handleOptionChange={handleOptionChange}
          />
        </div>
        <div className="flex flex-row mt-8 justify-between ">
          <div className="flex flex-col">
            <h5 className="border border-labelAdminColor rounded-md px-14 py-10 h-80 w-96">Pre-Visualización del pdf</h5>
            <div className="flex justify-center mt-10">
              <Button className="rounded-sm w-72">DESCARGAR PDF</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModule;
