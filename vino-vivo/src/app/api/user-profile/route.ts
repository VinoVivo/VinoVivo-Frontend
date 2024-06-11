// pages/api/userProfile.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface UserProfileData {
    address: string;
    email: string;
}

export async function GET(req: NextRequest) {
    try {
        // Obtener la sesión actual
        const session = await getServerSession({ req, ...authOptions });

        // Verificar la sesión
        if (!session) {
            return NextResponse.json({ message: 'Debes iniciar sesión' }, { status: 401 });
        }

        // Verificar el método de la solicitud
        if (req.method !== 'GET') {
            return NextResponse.json({ message: 'Método no permitido' }, { status: 405 });
        }

        // Hacer la llamada a la API externa
        const response = await fetch(`${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-users/user/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session.accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener el perfil de usuario');
        }

        const data: UserProfileData = await response.json();

        console.log(data);

        // Devolver la dirección y el correo electrónico en la respuesta
        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error('Error:', error);
        // Devolver un error interno del servidor
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
