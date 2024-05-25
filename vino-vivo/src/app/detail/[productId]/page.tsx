import CardDetail, { IwineDetail } from "@/components/product/detail/CardDetail";
// import axios from "axios";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
import { notFound } from 'next/navigation';

interface DetailPageProps {
    params: {
        productId: string;
    };
}

async function fetchProductData(productId: string): Promise<IwineDetail | null> {
    try {
    const response = await fetch(`http://localhost:8082/product/id/${productId}`, {
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

// export default function DetailPageId() {
    
//     const [wine, setWine] = useState<IwineDetail | null>(null);
//     const path = usePathname()
//     const id = RegExp(/\d+$/).exec(path)?.[0]; 
    

//     useEffect(() => {
//         if (id) {
//             axios.get(`http://localhost:8082/product/id/${id}`)
//                 .then(response => {
//                     const productData = response.data; 
//                     const wineDetail: IwineDetail = {
//                         id: productData.id,
//                         name: productData.name,
//                         description: productData.description,
//                         image: productData.image,         
//                         year: productData.year,
//                         price: productData.price,
//                         stock: productData.stock,                               
//                         winery: productData.nameWinery, 
//                         variety: productData.nameVariety, 
//                         type: productData.nameType,                         
//                     };
//                     setWine(wineDetail); 
//                 })
//                 .catch(error => {
//                     console.error('Error al obtener los detalles del producto:', error);
//                 });
//         }
//     }, [id]);

//     return(
//         <>        
//             {wine && <CardDetail wine={wine} />}
//         </>
//     )
// }
