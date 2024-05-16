'use client';
import CardDetail, { IwineDetail } from "@/components/product/detail/CardDetail";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


export default function DetailPage() {
    
    const [wine, setWine] = useState<IwineDetail | null>(null);
    const path = usePathname()
    const id = RegExp(/\d+$/).exec(path)?.[0]; 
    

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8082/product/id/${id}`)
                .then(response => {
                    const productData = response.data; 
                    const wineDetail: IwineDetail = {
                        id: productData.id,
                        image: productData.image,
                        name: productData.name,
                        type: productData.idType, 
                        year: productData.year,
                        winery: productData.idWinery, 
                        variety: productData.idVariety, 
                        price: productData.price,
                        stock: productData.stock,
                        description: productData.description,
                    };
                    setWine(wineDetail); 
                })
                .catch(error => {
                    console.error('Error al obtener los detalles del producto:', error);
                });
        }
    }, [id]);

    return(
        <>        
            {wine && <CardDetail wine={wine} />}
        </>
    )
}
