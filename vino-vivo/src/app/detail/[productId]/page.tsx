import CardDetail from "@/components/product/detail/CardDetail";
import { IwineDetail } from "@/types/detail/detail.types";
import { notFound } from 'next/navigation';

interface DetailPageProps {
    params: {
       productId: string;
    };
}

async function fetchProductData(productId: string): Promise<IwineDetail | null> {
    try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_GET_BASE_URL}/product/id/${productId}`, {
      cache: 'no-store', // Esto asegura que se obtengan datos frescos en cada solicitud.
    });

    if (!response.ok) {
        return null;
    };

    const productData = await response.json();

    const wineDetail: IwineDetail = {
        id: productData.id,
        name: productData.name,
        description: productData.description,
        image: productData.image,
        year: productData.year,
        price: productData.price,
        stock: productData.stock,
        winery: productData.nameWinery,
        variety: productData.nameVariety,
        type: productData.nameType,
        };
        return wineDetail;
    } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
        return null;
    }
}

export default async function DetailPageId({ params }: Readonly<DetailPageProps>) {
    const wine = await fetchProductData(params.productId);

    if (!wine) {
        notFound();
    }

    return <>{wine && <CardDetail wine={wine} />}</>;
}

