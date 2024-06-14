
interface ReportOptionsProps {
    selectedOptions: string[];
    handleCheckboxChange: (option: string) => void;
}

const ReportOptions: React.FC<ReportOptionsProps> = ({ selectedOptions, handleCheckboxChange }) => {
    return (
        <div className="mb-4">
        <label className="block mb-2 font-bold">Selecciona lo que quieres incluir en el informe:</label>
        <div className="flex flex-col items-start">
            <label htmlFor="ventas_totales" className="inline-flex items-center mb-2">
            <input
                id="ventas_totales"
                type="checkbox"
                value="ventas_totales"
                checked={selectedOptions.includes("ventas_totales")}
                onChange={() => handleCheckboxChange("ventas_totales")}
                className="form-checkbox h-5 w-5 text-violeta"
            />
            <span className="ml-2">Ventas Totales</span>
            </label>
            <label htmlFor="productos_mas_vendidos" className="inline-flex items-center mb-2">
            <input
                id="productos_mas_vendidos"
                type="checkbox"
                value="productos_mas_vendidos"
                checked={selectedOptions.includes("productos_mas_vendidos")}
                onChange={() => handleCheckboxChange("productos_mas_vendidos")}
                className="form-checkbox h-5 w-5 text-violeta"
            />
            <span className="ml-2">Productos Más Vendidos</span>
            </label>
            <label htmlFor="ingresos_por_categoria" className="inline-flex items-center mb-2">
            <input
                id="ingresos_por_categoria"
                type="checkbox"
                value="ingresos_por_categoria"
                checked={selectedOptions.includes("ingresos_por_categoria")}
                onChange={() => handleCheckboxChange("ingresos_por_categoria")}
                className="form-checkbox h-5 w-5 text-violeta"
            />
            <span className="ml-2">Ingresos por Categorías</span>
            </label>
            <label htmlFor="stock_productos" className="inline-flex items-center mb-2">
            <input
                id="stock_productos"
                type="checkbox"
                value="stock_productos"
                checked={selectedOptions.includes("stock_productos")}
                onChange={() => handleCheckboxChange("stock_productos")}
                className="form-checkbox h-5 w-5 text-violeta"
            />
            <span className="ml-2">Stock de Productos</span>
            </label>
        </div>
        </div>
    );
};

export default ReportOptions;
