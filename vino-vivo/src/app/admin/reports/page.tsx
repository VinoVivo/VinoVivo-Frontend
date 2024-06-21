import ReportModule from "@/components/reports/ReportModule";
import { authOptions } from "@/lib/auth";
import { getProductList, getTypeRe } from "@/lib/utils";
import { WineType } from "@/types/detail/detail.types";
import { Product } from "@/types/products/products.types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import {jwtDecode} from "jwt-decode";
interface DecodedToken {
    realm_access: {
        roles: string[];
    };
}
export default async function AdminReports() {
    const session = await getServerSession(authOptions);
    let decodedToken: DecodedToken | null = null;
    if (session?.accessToken) {
        decodedToken = jwtDecode<DecodedToken>(session.accessToken);
    }
    const isAdmin = decodedToken?.realm_access?.roles.includes("admin");

    if (!isAdmin) {
        return redirect("/");
    }

    let products: Product[] = [];
    let types: WineType[] = [];

    try {
        products = await getProductList();
        types = await getTypeRe();
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    return (
        <div className="flex flex-col justify-center items-center mt-40">
            <ReportModule products={products} types={types} />
        </div>
    );
}
