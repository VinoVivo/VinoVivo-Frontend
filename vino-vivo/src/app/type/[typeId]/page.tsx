'use client';
import Footer from "@/components/layouts/footer/Footer";
import Header from "@/components/layouts/header/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Title } from "@/components/Title/Title";
import Link from "next/link";
import { IwineDetail } from "@/components/product/detail/CardDetail";


interface WineType {
    id: number;
    name: string;
}

export default function TypePage() {
    const [products, setProducts] = useState<IwineDetail[]>([]);
    const [wineTypes, setWineType] = useState<WineType[]>([]);
    const path = usePathname()
    const id = path.match(/\d+$/)?.[0];

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8082/product/type/${id}`)
                .then(async (response) => {
                    const productData = await Promise.all(response.data.map(async (product: IwineDetail) => {
                        try {
                            const varietyResponse = await axios.get(`http://localhost:8082/variety/id/${product.variety}`);
                            product.variety = varietyResponse.data.name;
                        } catch (error) {
                            console.error('Error fetching variety:', error);
                        }
                        return product;
                    }));
                    setProducts(productData)
                })
                .catch(error => {
                    console.error('Error al obtener los productos de este tipo:', error);
                });
        }
    }, [id]);

    useEffect(() => {
        axios.get(`http://localhost:8082/type/all`)
            .then(response => {
                const productData = response.data;
                setWineType(productData)
            })
            .catch(error => {
                console.error('Error al obtener el listado de los tipos de vino:', error);
            });
    }, []);

    function getTypeNameById(id: number): string | undefined {
        if (id === undefined) return "vacio";
        const item = wineTypes.find(item => item.id === id);
        return item ? item.name : undefined;
    }
    const nameType = "Vino " + getTypeNameById(id ? parseInt(id) : 0);
    console.log("el titulo es:");
    console.log(nameType);


    return (
        <>
            <Header />
            <div className=" grid justify-center mb-10 mt-40">
                <div className="grid justify-center mb-10 mt-5">
                    <Title title={nameType}></Title>
                </div>
                <div className="flex justify-center">
                    <div className="grid grid-cols-4 gap-6">
                        {products.map(product => (
                            <div key={product.id} className="bg-white rounded-lg border border-gray-200 p-6 w-64">
                                <Link href={`/detail/${product.id}`}>
                                    <img src={product.image} alt={product.name} className="transform transition-transform duration-300 hover:cursor-pointer" />
                                </Link>
                                <div className="flex flex-col items-center mt-2">
                                    <p className="text-md font-bold text-black h-12">{product.name}</p>
                                    <p className="text-sm text-black">{product.variety}</p>
                                    <p className="text-lg font-semibold text-black mt-2">${product.price}</p>
                                </div>
                                <button className="bg-violeta hover:bg-fuchsia-950 text-white font-bold mt-6 py-1.5 px-4 rounded w-full">
                                    COMPRAR
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <Footer />
        </>
    );
};
