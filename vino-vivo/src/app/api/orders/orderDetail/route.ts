import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession({ req, ...authOptions });

    if (!session) {
      return NextResponse.json(
        { message: "Debes iniciar sesión como cliente" },
        { status: 401 }
      );
    }

    const url = `${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/order-details/all`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get orders Details");
    }

    const orders = await response.json(); // Aquí se obtienen las órdenes en formato JSON

    return NextResponse.json(orders, { status: 200 }); // Devuelve las órdenes directamente
  } catch (error) {
    console.error("Error getting orders details:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
