import Line from "../shopping/shoppingCart/Line";

interface ReportOptionsProps {
    selectedOptions: string[];
    handleCheckboxChange: (option: string) => void;
}

const ReportOptions: React.FC<ReportOptionsProps> = ({ selectedOptions, handleCheckboxChange }) => {
    return (
        <div className="mb-4">
            <p className="block mb-2 font-bold text-labelAdminColor">2- Selecciona una o más opciones:</p>
            <Line width="w-64"  color="border-labelAdminColor"/>
            <div className="flex flex-col items-start mt-6">
                <label htmlFor="ventas_totales" className="inline-flex items-center mb-2">
                <input
                    id="ventas_totales"
                    type="checkbox"
                    value="ventas_totales"
                    checked={selectedOptions.includes("ventas_totales")}
                    onChange={() => handleCheckboxChange("ventas_totales")}
                    className="form-checkbox h-5 w-5 accent-labelAdminColor"
                />
                <span className="ml-2 font-bold">Ventas Totales</span>
                </label>
                <label htmlFor="productos_mas_vendidos" className="inline-flex items-center mb-2">
                <input
                    id="productos_mas_vendidos"
                    type="checkbox"
                    value="productos_mas_vendidos"
                    checked={selectedOptions.includes("productos_mas_vendidos")}
                    onChange={() => handleCheckboxChange("productos_mas_vendidos")}
                    className="form-checkbox h-5 w-5 accent-labelAdminColor"
                />
                <span className="ml-2 font-bold">Productos Más Vendidos</span>
                </label>
                <label htmlFor="ingresos_por_categoria" className="inline-flex items-center mb-2">
                <input
                    id="ingresos_por_categoria"
                    type="checkbox"
                    value="ingresos_por_categoria"
                    checked={selectedOptions.includes("ingresos_por_categoria")}
                    onChange={() => handleCheckboxChange("ingresos_por_categoria")}
                    className="form-checkbox h-5 w-5 accent-labelAdminColor"
                />
                <span className="ml-2 font-bold">Ingresos Totales</span>
                </label>
                <label htmlFor="stock_productos" className="inline-flex items-center mb-2">
                <input
                    id="stock_productos"
                    type="checkbox"
                    value="stock_productos"
                    checked={selectedOptions.includes("stock_productos")}
                    onChange={() => handleCheckboxChange("stock_productos")}
                    className="form-checkbox h-5 w-5 accent-labelAdminColor"
                />
                <span className="ml-2 font-bold">Stock de Productos</span>
                </label>
            </div>
        </div>
    );
};

export default ReportOptions;
