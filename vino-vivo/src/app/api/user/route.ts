import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { userData } from "@/types/user/userprofile.types";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession({ req, ...authOptions });
    if (!session) {
      return NextResponse.json(
        { message: "Debes iniciar sesión" },
        { status: 401 }
      );
    }

    if (req.method !== "GET") {
      return NextResponse.json(
        { message: "Método no permitido" },
        { status: 405 }
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-users/user/profile`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener el perfil de usuario");
    }

    const data: userData = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
