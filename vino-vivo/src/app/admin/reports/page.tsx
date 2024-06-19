import ReportModule from "@/components/reports/ReportModule";
import { getProductList, getTypeRe } from "@/lib/utils";
import { WineType } from "@/types/detail/detail.types";
import { Product } from "@/types/products/products.types";

export default async function AdminReports() {

    let products: Product[] = [];
    let types: WineType[] = [];

    try {
        products = await getProductList();
        types = await getTypeRe();
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    return (
        <ReportModule products={products} types={types} />
    );
}
