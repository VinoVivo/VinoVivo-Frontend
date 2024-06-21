
export interface ReportColumns {
    [key: string]: { title: string; key: string }[];
}
export interface QuantitySoldData {
    "Product ID": number;
    "Product Name": string;
    "Description": string;
    "Year": number;
    "Price": number;
    "Stock": number;
    "Winery": string;
    "Variety": string;
    "Type": string;
    "Units sold": number;
}

export interface TypeSalesData {
    "Type ID": number;
    "Product Type": string;
    "Units sold": number;
}

export interface StockData {
    "Product ID": number;
    "Product Name": string;
    "Description": string;
    "Year": number;
    "Price": number;
    "Stock": number;
    "Winery": string;
    "Variety": string;
    "Type": string;
}

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
