//prodcutos más vendidos
export interface QuantitySoldData {
    "Description": string;
    "Price": number;
    "Product ID": number;
    "Product Name": string;
    "Stock": number;
    "Type": string;
    "Units sold": number;
    "Variety": string;    
    "Winery": string;
    "Year": number;
}
//ventas totales
export interface TypeSalesData {
    "Product Type": string;
    "Type ID": number;    
    "Units sold": number;
}

// Stock de productos
export interface StockData {
    "Description": string;
    "Price": number;
    "Product ID": number;
    "Product Name": string;
    "Stock": number;
    "Type": string;
    "Variety": string;    
    "Winery": string;
    "Year": number;
}
//Ingresos totales
export interface TotalRevenueData {
    "Product ID": number;
    "Product Name": string;
    "Description": string;
    "Year": number;
    "Price": number;  
    "Stock": number;
    "Winery": string;
    "Variety": string;
    "Type": string;
    "Total Revenue": number;
}
