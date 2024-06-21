'use client'
import React, { useState, useEffect } from "react";
import { Title } from "../Title/Title";
import FiltersReport from "./FiltersReport";
import MyDocument from "./DocumentPdf";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import DinamicButton from "../ui/DinamicButton";
import ReportOptions from "./RerportOptions";
import { Product } from "@/types/products/products.types";
import { WineType } from "@/types/detail/detail.types";
import { fetchReportData } from "@/lib/reportsFechs";

interface ReportModuleProps {
    products: Product[];
    types: WineType[];
}
const reportColumns: Record<string, { title: string; key: string }[]> = {
    ventas_totales: [
        { title: "Nombre del Producto", key: "ProductType" },
        { title: "Unidades Vendidas", key: "UnitsSold" },
    ],
    productos_mas_vendidos: [
        { title: "Nombre del Producto", key: "ProductName" },
        { title: "Unidades Vendidas", key: "UnitsSold" },
    ],
    ingresos_por_categoria: [
        { title: "Nombre del Producto", key: "ProductName" },
        { title: "Ingresos Totales", key: "TotalRevenue" },
        { title: "Año de Venta", key: "Year" },
    ],
    stock_productos: [
        { title: "Nombre del Producto", key: "ProductName" },
        { title: "Stock Disponible", key: "Stock" },
    ],
};

const ReportModule: React.FC<ReportModuleProps> = ({ products, types }) => {
    
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>("ventas_totales");
    const [selectedFilters, setSelectedFilters] = useState<{
        type?: string;
        year?: string;
    }>({ type: "0", year: "0" });
    const [reportData, setReportData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

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

    const handleVisualizeClick = async () => {
        
        setLoading(true);    
        console.log({reportData});
        try {
            const year = selectedFilters.year ?? "0";
            const typeId = types.find(t => t.name === selectedFilters.type)?.id ?? "0";
            const data = await fetchReportData(selectedOption, year, typeId.toString());
            console.log({year, typeId, data});
            
            setReportData(data);
        } catch (error) {
            console.error("Error fetching report data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mb-10 mt-40">
            <Title
                title="GENERACIÓN DE INFORMES"
                color="labelAdminColor"
                letterSpacing="widest"
            />
            <div className="grid border rounded-md border-labelAdminColor p-10 w-full max-w-screen-lg bg-backgroundForms mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left Column */}
                <div className="flex flex-col space-y-4 items-center">
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
                    <DinamicButton
                        bgColor="bg-grisCarbon"
                        textColor="text-whiteTypograph"
                        width="w-[300px]"
                        hoverBgColor="hover:bg-backgroundForms"
                        hoverBorderColor="hover:border-grisCarbon"
                        hoverTextColor="hover:text-grisCarbon"
                        hoverShadow={false}
                        activeBgColor="active:bg-grisCarbon"
                        activeTextColor="active:text-whiteTypograph"
                        changeBgOnClick={false}
                        onClick={handleVisualizeClick}
                        className="font-bold"
                    >
                        {loading ? "Cargando..." : "VISUALIZAR"}
                    </DinamicButton>
                </div>
                {/* Right Column */}
                <div className="flex flex-col items-center h-90">
                    <div className="border border-labelAdminColor rounded-md px-4 py-2 w-full h-90 max-h-96 overflow-y-auto">
                        <PDFViewer
                            style={{ width: "100%", height: "calc(100vh - 200px)" }}
                        >
                            <MyDocument data={reportData} title={selectedOption} columns={reportColumns[selectedOption]} />
                        </PDFViewer>
                    </div>
                    <PDFDownloadLink
                        document={<MyDocument data={reportData} title={selectedOption} columns={reportColumns[selectedOption]} />}
                        fileName="report.pdf"
                        className="w-[300px] bg-labelAdminColor text-white font-bold py-2 px-4 rounded-[1px] mt-4 transition-colors duration-300 hover:bg-backgroundForms hover:text-labelAdminColor  hover:border hover:border-labelAdminColor text-center"
                    >
                        {({  loading }) =>
                            loading ? "Cargando documento..." : "DESCARGAR PDF"
                        }
                    </PDFDownloadLink>
                </div>
                </div>
            </div>
        </div>
    );
};

export default ReportModule;
