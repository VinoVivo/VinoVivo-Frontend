import React from "react";
import { Product } from "@/types/products/products.types";
import { WineType } from "@/types/detail/detail.types";
import Line from "../shopping/shoppingCart/Line";

interface FiltersReportProps {
    products: Product[];
    types: WineType[];
    selectedType: string;
    selectedYear: string;
    setSelectedType: React.Dispatch<React.SetStateAction<string>>;
    setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
}

const FiltersReport: React.FC<FiltersReportProps> = ({
    products = [],
    types = [],
    selectedType,
    selectedYear,
    setSelectedType,
    setSelectedYear,
}) => {

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(event.target.value);
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(event.target.value);
    };

    const allTypes = [{ id: 0, name: "Todos" }, ...types]; 
    const years = Array.from(new Set(products.map((product) => product.year)));

    return (
        <div className="w-full sm:w-72 mt-4 sm:mt-0">
        <p className="block mb-2 font-bold text-labelAdminColor">1- Seleccione un filtro</p>
        <Line width="w-48" color="border-labelAdminColor" />
        <div className="mt-4">
            {/* Select for Tipo */}
            <p className="block my-2 font-medium text-labelAdminColor">Tipo:</p>
            <select
                value={selectedType?.toString() ?? "0"}
                onChange={handleTypeChange}
                className="shadow appearance-none border border-line rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            >
            {allTypes.map((type) => (
                <option key={type.id} value={type.id.toString()}>
                {type.name}
                </option>
            ))}
            </select>

            {/* Select for Año */}
            <p className="block my-2 font-medium text-labelAdminColor">Año:</p>
            <select
                value={selectedYear?.toString() ?? "0"} 
                onChange={handleYearChange}
                className="shadow appearance-none border border-line rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
            >
            <option value="0">Todos</option>
            {years.map((year) => (
                <option key={year} value={year}>
                {year}
                </option>
            ))}
            </select>
        </div>
        </div>
    );
};

export default FiltersReport;
