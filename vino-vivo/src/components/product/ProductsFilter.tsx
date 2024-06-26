import React from "react";
import { Product } from "@/types/products/products.types";
import Accordion from "@/components/accordion/page";
import { Title } from "@/components/Title/Title";

interface ProductFiltersProps {
    products: Product[];
    selectedTypes: string[];
    selectedVarieties: string[];
    selectedWineries: string[];
    selectedYears: string[];
    minPrice: number | null;
    maxPrice: number | null;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
    setSelectedVarieties: React.Dispatch<React.SetStateAction<string[]>>;
    setSelectedWineries: React.Dispatch<React.SetStateAction<string[]>>;
    setSelectedYears: React.Dispatch<React.SetStateAction<string[]>>;
    setMinPrice: React.Dispatch<React.SetStateAction<number | null>>;
    setMaxPrice: React.Dispatch<React.SetStateAction<number | null>>;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
    products,
    selectedTypes,
    selectedVarieties,
    selectedWineries,
    selectedYears,
    minPrice,
    maxPrice,
    setSearchTerm,
    setSelectedTypes,
    setSelectedVarieties,
    setSelectedWineries,
    setSelectedYears,
    setMinPrice,
    setMaxPrice,
}) => {
    const handleTypeChange = (type: string) => {
        if (selectedTypes.includes(type)) {
            setSelectedTypes(selectedTypes.filter((t) => t !== type));
        } else {
            setSelectedTypes([...selectedTypes, type]);
        }
    };

    const handleVarietyChange = (variety: string) => {
        if (selectedVarieties.includes(variety)) {
            setSelectedVarieties(selectedVarieties.filter((v) => v !== variety));
        } else {
            setSelectedVarieties([...selectedVarieties, variety]);
        }
    };

    const handleWineryChange = (winery: string) => {
        if (selectedWineries.includes(winery)) {
            setSelectedWineries(selectedWineries.filter((w) => w !== winery));
        } else {
            setSelectedWineries([...selectedWineries, winery]);
        }
    };

    const handleYearChange = (year: string) => {
        if (selectedYears.includes(year)) {
            setSelectedYears(selectedYears.filter((y) => y !== year));
        } else {
            setSelectedYears([...selectedYears, year]);
        }
    };

    return (
        <div className="w-full bg-backgroundForms pt-10  md:pt-0">
            <div className="mt-10  md:w-72 ">
                <Title title="FILTROS" color="beige" />
            </div>
            <div className="mt-10 mx-4">
                {/* Accordion para Tipo */}
                <Accordion title="Tipo">
                    <ul>
                        {Array.from(new Set(products.map((product) => product.nameType))).map(
                            (type) => (
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
                            )
                        )}
                    </ul>
                </Accordion>

                {/* Accordion para Variedad */}
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

                {/* Accordion para Bodega */}
                <Accordion title="Bodega">
                    <ul>
                        {Array.from(new Set(products.map((product) => product.nameWinery))).map(
                            (winery) => (
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
                            )
                        )}
                    </ul>
                </Accordion>

                {/* Accordion para Año */}
                <Accordion title="Año">
                    <ul>
                        {Array.from(new Set(products.map((product) => product.year)))
                            .sort((a, b) => parseInt(b) - parseInt(a)) // Ordena de mayor a menor
                            .map((year) => (
                                <li key={year} className="mb-2">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedYears.includes(year)}
                                            onChange={() => handleYearChange(year)}
                                            className="mr-2 accent-violeta"
                                        />
                                        <span>{year === "Todas" ? "Todas" : year}</span>
                                    </label>
                                </li>
                            ))}
                    </ul>
                </Accordion>

                {/* Input para Precio Mínimo y Máximo */}
                <Accordion title="Precio">
                    <div>
                        <input
                            type="number"
                            placeholder="Mínimo"
                            value={minPrice ?? ""}
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
                            value={maxPrice ?? ""}
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
    );
};

export default ProductFilters;