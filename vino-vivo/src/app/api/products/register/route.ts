import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req: NextRequest) {
    try {
        // Obtener la sesión del usuario
        const session = await getServerSession({ req, ...authOptions });

        if (!session) {
            return NextResponse.json({ message: 'Debes iniciar sesión como administrador' }, { status: 401 });
        }

        // Verificar que el método sea POST
        if (req.method !== 'POST') {
            return NextResponse.json({ message: 'Método no permitido' }, { status: 405 });
        }

        // Parsear el cuerpo de la solicitud
        const data = await req.json();

        // Crear el payload
        const payload = { id: 0, ...data };
        console.log('payload', payload);

        // Hacer la solicitud al microservicio
        const response = await fetch(`${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/product/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.accessToken}`,
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const responseData = await response.json();
        console.log('Producto creado:', responseData);

        return NextResponse.json({ message: 'Producto creado exitosamente', data: responseData }, { status: 201 });

    } catch (error) {
        console.error('Error al crear el producto:', error);
        return NextResponse.json({ message: 'Error al crear el producto' }, { status: 500 });
    }
};


