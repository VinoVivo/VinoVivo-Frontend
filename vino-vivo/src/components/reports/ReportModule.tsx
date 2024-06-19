'use client';
import React, { useState, useEffect } from "react";
import { Title } from "../Title/Title";
import { Button } from "../ui/button";
import { Product } from "@/types/products/products.types";
import { WineType } from "@/types/detail/detail.types";
import FiltersReport from "./FiltersReport";
import ReportOptions from "./RerportOptions";

interface ReportModuleProps {
    products: Product[];
    types: WineType[];
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
      <div className="flex flex-col items-center justify-center mb-10 mt-40">
        <Title title="MÓDULO DE REPORTES" color="labelAdminColor" letterSpacing="widest"/>
        <h3 className="my-6 font-bold text-graySubtittle text-xl">GENERACIÓN DE INFORMES</h3>
        <div className=" border  border-labelAdminColor p-10 w-full max-w-screen-lg bg-backgroundForms">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
                {/* Left Column */}
                <div className="flex flex-col space-y-4 items-center ">
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
                    <Button className="bg-gray-400 mt-4 w-72 self-center">VISUALIZAR</Button>
                </div>
                {/* Right Column */}
                <div className="flex flex-col items-center">
                    <h5 className="border border-labelAdminColor rounded-md px-14 py-10 h-80 w-full">Pre-Visualización del pdf</h5>
                    <Button className="bg-labelAdminColor mt-10 w-72">DESCARGAR PDF</Button>
                </div>
            </div>
        </div>
      </div>
    );
};

export default ReportModule;
