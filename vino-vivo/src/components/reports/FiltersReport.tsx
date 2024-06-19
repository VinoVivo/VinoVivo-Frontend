import React from "react";
import { Product } from "@/types/products/products.types";
import { WineType } from "@/types/detail/detail.types";
import Line from "../shopping/shoppingCart/Line";
import SelectWithIcon from "./SelectWithIcon";

interface FiltersReportProps {
    products: Product[];
    types: WineType[];
    selectedType?: string;
    selectedYear?: string;
    setSelectedType: (type: string) => void;
    setSelectedYear: (year: string) => void; 
}

const FiltersReport: React.FC<FiltersReportProps> = ({
    products = [],
    types = [],
    selectedType = "",
    selectedYear = "",
    setSelectedType,
    setSelectedYear,
}) => {

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(event.target.value);
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(event.target.value);
    };

    const allTypes = [{ id: "0", name: "Todos" }, ...types.map(type => ({ id: type.name, name: type.name }))]; 
    const years = Array.from(new Set(products.map((product) => product.year.toString())));

    return (
        <div className="w-full sm:w-72 mt-4 sm:mt-0">
            <p className="block mb-2 font-bold text-labelAdminColor">1- Seleccione un filtro</p>
            <Line width="w-48" color="border-labelAdminColor" />
            <div className="mt-4">
                <SelectWithIcon
                    label="Tipo"
                    value={selectedType}
                    options={allTypes}
                    onChange={handleTypeChange}
                    iconColor="labelAdminColor"
                    iconSize="h-7 w-7"
                    customStyles={{ select: 'pr-10' }}
                />
                <SelectWithIcon
                    label="Año"
                    value={selectedYear}
                    options={[{ id: "0", name: "Todos" }, ...years.map(year => ({ id: year, name: year }))]}
                    onChange={handleYearChange}
                    iconColor="labelAdminColor"
                    iconSize="h-7 w-7"
                    customStyles={{ select: 'pr-10' }}
                />
            </div>
        </div>
    );
};

export default FiltersReport;
