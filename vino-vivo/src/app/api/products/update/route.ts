import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req: NextRequest, id: { id: number }) {
  try {
    const session = await getServerSession({ req, ...authOptions });

    if (!session) {
      return NextResponse.json(
        { message: "Debes iniciar sesión como administrador" },
        { status: 401 }
      );
    }

    if (req.method !== "PUT") {
      return NextResponse.json(
        { message: "Método no permitido" },
        { status: 405 }
      );
    }

    const payload = await req.json();
    const url = `${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/product/update`;

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({ id, ...payload }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to update product");
    }

    return NextResponse.json(
      { message: "Producto actualizado exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
