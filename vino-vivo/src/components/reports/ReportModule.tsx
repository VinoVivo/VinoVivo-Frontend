'use client'
import React, { useState } from "react";
import { Title } from "../Title/Title";
import { Button } from "../ui/button";
import ReportOptions from "./RerportOptions";
import ProductFilters from "../product/ProductsFilter";

const ReportModule = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);

  const handleCheckboxChange = (option: string) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(option)
        ? prevOptions.filter((item) => item !== option)
        : [...prevOptions, option]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Title title="Módulo de Reportes" color="violeta" />
      <h3 className="mb-4">Generación de informes del sistema</h3>
      {/* Renderizamos los filtros de productos */}
      <div className="flex flex-row mt-8 justify-between">
        <div className="mr-10">
          <ProductFilters
          products={[]} 
          selectedTypes={selectedTypes}
          selectedYears={selectedYears}
          setSelectedTypes={setSelectedTypes}
          setSelectedYears={setSelectedYears}
        />
      </div>
      <div className="flex flex-col">
        <ReportOptions 
          selectedOptions={selectedOptions}
          handleCheckboxChange={handleCheckboxChange}
        />
        <Button>Descargar PDF</Button>
      </div>
        <h5>visualizar pdf</h5>
      </div>
    </div>
  );
};

export default ReportModule;
