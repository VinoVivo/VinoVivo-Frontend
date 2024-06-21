import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    reportType: string;
    year: string;
    typeId: string;
};

const BASE_URL = process.env.NEXT_ADMIN_GET_BASE_URL ?? "";

const fetchData = async (endpoint: string, year: string, typeId: string, orderBy?: string) => {

    let url = `${BASE_URL}/product/${endpoint}/${year}/${typeId}`;
    console.log(BASE_URL);
    
    if (orderBy) {
        url += `/${orderBy}`;
    }

    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Error fetching ${endpoint} data`);
    }

    return response.json();
};

export async function GET(request: NextRequest, context: { params: Params }) {

    const { reportType, year, typeId } = context.params;

    try {
        const session = await getServerSession({ req: request, ...authOptions });
        if (!session) {
            return NextResponse.json(
                { message: "Debes iniciar sesión como cliente" },
                { status: 401 }
            );
        }

        let data;
        switch (reportType) {
            case "ventas_totales":
                data = await fetchData("type-sales", year, typeId);
                break;
            case "productos_mas_vendidos":
                data = await fetchData("quantity-sold", year, typeId);
                break;
            case "ingresos_por_categoria":
                data = await fetchData("total-revenue", year, typeId);
                break;
            case "stock_productos":
                data = await fetchData("stock", year, typeId, "DESC");
                break;
            default:
                throw new Error("Tipo de reporte no válido");
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Error fetching report data:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}