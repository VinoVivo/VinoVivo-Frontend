import React from "react";
import { Product } from "@/types/products/products.types";
import Accordion from "@/components/accordion/page";
import { WineType } from "@/types/detail/detail.types";
import Line from "../shopping/shoppingCart/Line";

interface FiltersReportProps {
    products: Product[];
    types: WineType[];
    selectedTypes: string[];
    selectedYears: string[];
    setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
    setSelectedYears: React.Dispatch<React.SetStateAction<string[]>>;
}

const FiltersReport: React.FC<FiltersReportProps> = ({
    products = [],
    types = [],
    selectedTypes,
    selectedYears,
    setSelectedTypes,
    setSelectedYears,
}) => {
    const handleTypeChange = (type: string) => {
        if (selectedTypes.includes(type)) {
            setSelectedTypes(selectedTypes.filter((t) => t !== type));
        } else {
            setSelectedTypes([...selectedTypes, type]);
        }
    };

    const handleYearChange = (year: string) => {
        if (selectedYears.includes(year)) {
            setSelectedYears(selectedYears.filter((y) => y !== year));
        } else {
            setSelectedYears([...selectedYears, year]);
        }
    };
    const years = Array.from(new Set(products.map((product) => product.year)));

    return (
        <div className="w-full sm:w-72 mt-4 sm:mt-0">
            <p className="block mb-2 font-bold text-labelAdminColor">Seleccione un filtro</p>
            <Line width="w-48" color="border-labelAdminColor"/>
            <div className="mt-4">
                {/* Accordion para Tipo */}
                <Accordion title="Tipo"  iconColor="labelAdminColor" iconThickness="10" iconSize="5">
                    <ul>
                        {types.map((type) => (
                            <li key={type.id} className="mb-2">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedTypes.includes(type.name)}
                                        onChange={() => handleTypeChange(type.name)}
                                        className="mr-2 accent-labelAdminColor"
                                    />
                                    <span>{type.name}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </Accordion>

                {/* Accordion para Año */}
                <Accordion title="Año" iconColor="labelAdminColor" iconThickness="">
                    <ul>
                        {years.map((year) => (
                            <li key={year} className="mb-2">
                                <label className="flex items-center text-labelAdminColor">
                                    <input
                                        type="checkbox"
                                        checked={selectedYears.includes(year)}
                                        onChange={() => handleYearChange(year)}
                                        className="mr-2 border border-labelAdminColor "
                                    />
                                    <span>{year}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </Accordion>
            </div>
        </div>
    );
};

export default FiltersReport;
