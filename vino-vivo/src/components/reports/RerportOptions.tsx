import React from 'react';
import Line from "../shopping/shoppingCart/Line";
import SelectWithIcon from "./SelectWithIcon";

interface ReportOptionsProps {
    selectedOption?: string; 
    handleOptionChange: (option: string) => void; 
}

const ReportOptions: React.FC<ReportOptionsProps> = ({
    selectedOption = "",
    handleOptionChange,
}) => {

    const options = [
        { id: "ventas_totales", name: "Ventas Totales" },
        { id: "productos_mas_vendidos", name: "Productos Más Vendidos" },
        { id: "ingresos_por_categoria", name: "Ingresos Totales" },
        { id: "stock_productos", name: "Stock de Productos" }
    ];

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        handleOptionChange(event.target.value);
    };

    return (
        <div className="w-full sm:w-72 mt-4 sm:mt-0">
            <p className="block mb-2 font-bold text-labelAdminColor">2- Selecciona una opción:</p>
            <Line width="w-64" color="border-labelAdminColor" />
            <div className="flex flex-col items-start mt-6">
                <SelectWithIcon
                    label="Tipo de reporte"
                    value={selectedOption}
                    options={options}
                    onChange={handleChange}
                    iconColor="labelAdminColor"
                    iconSize="h-7 w-7"
                    customStyles={{ select: 'pr-10' }}
                
                />
            </div>
        </div>
    );
};

export default ReportOptions;
