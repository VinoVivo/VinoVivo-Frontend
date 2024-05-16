'use client';
import Footer from "@/components/layouts/footer/Footer";
import Header from "@/components/layouts/header/Header";
import CardDetail, { IwineDetail } from "@/components/product/detail/CardDetail";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


export default function detailPage() {
    
    const [wine, setWine] = useState<IwineDetail | null>(null);
    const path = usePathname()
    const id = path.match(/\d+$/)?.[0]; 
    

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
        <Header/>
        {wine && <CardDetail wine={wine} />}
        <Footer/>
        </>
    )
}
