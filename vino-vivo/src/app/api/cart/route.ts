import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession({ req, ...authOptions });

    if (!session) {
      return NextResponse.json(
        { message: "Debes iniciar sessión" },
        { status: 401 }
      );
    }

    if (req.method !== "POST") {
      return NextResponse.json(
        { message: "Método no permitido" },
        { status: 405 }
      );
    }

    const data = await req.json();

    const payload = { ...data };
    console.log(payload);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/cart/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(payload),
      }
    );

    console.log(session.accessToken);

    if (!response.ok) {
      throw new Error("Failed");
    }

    return NextResponse.json(
      { message: "Orden creada exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
