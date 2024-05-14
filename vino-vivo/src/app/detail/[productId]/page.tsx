'use client'
import Footer from "@/components/layouts/footer/Footer";
import Header from "@/components/layouts/header/Header";
import CardDetail, { IwineDetail, WineProps } from "@/components/productDetail/CardDetail";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function detailPage() {
    
    const [wine, setWine] = useState<IwineDetail | null>(null);
    const router = useRouter();
    const { id } = router.query;
    

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8082/product/id/${id}`)
                .then(response => {
                    const productData = response.data; 
                    const wineDetail: IwineDetail = {
                        id: productData.id,
                        image: productData.image,
                        name: productData.name,
                        type: productData.type, 
                        year: productData.year,
                        winery: productData.winery, 
                        variety: productData.variety, 
                        price: productData.price,
                        stock: productData.stock,
                        description: productData.description,
                    };
                    setWine(response.data); 
                    console.log({response});
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
