
import { QuantitySoldData, TypeSalesData, StockData, TotalRevenueData } from "@/types/reports/reports.types";

const fetchData = async <T>(endpoint: string, year: string, typeId: string, orderBy?: string): Promise<T[]> => {
    let url = `${process.env.NEXT_ADMIN_GET_BASE_URL}/product/${endpoint}/${year}/${typeId}`;
    // let url = `http://localhost:3000/admin/reports/product/${endpoint}/${year}/${typeId}`;
    if (orderBy) {
        url += `/${orderBy}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching ${endpoint} data`);
    }
    
    return await response.json();
};

export const fetchReportData = async (reportType: string, year: string, typeId: string): Promise<any[]> => {
    switch (reportType) {
        case "ventas_totales":
            return fetchData<TypeSalesData>("type-sales", year, typeId);
        case "productos_mas_vendidos":
            return fetchData<QuantitySoldData>("quantity-sold", year, typeId);
        case "ingresos_por_categoria":
            return fetchData<TotalRevenueData>("total-revenue", year, typeId);
        case "stock_productos":
            return fetchData<StockData>("stock", year, typeId, "DESC");
        default:
            throw new Error("Tipo de reporte no válido");
    }
};
