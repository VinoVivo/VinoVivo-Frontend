'use client'
import Carousel from "@/components/carrousel/Carrousel";
import axios from 'axios';
import { useEffect, useState } from "react";

interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    idVariety: string;
}

const Body = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showMore, setShowMore] = useState(false);
    const visibleProducts = showMore ? products : products.slice(0, 4);
    const images: string[] = [
        '/maridaje.jpg',
        '/bodega.jpg',
    ];
    const images2: string[] = [
        '/enoteca.jpg',
        '/catavinos.jpg',
    ];


    useEffect(() => {
        axios.get('http://localhost:8082/product/all')
            .then(async (response) => {
                console.log('Data from API:', response.data);
                const productData = await Promise.all(response.data.map(async (product: Product) => {
                    try {
                        const varietyResponse = await axios.get(`http://localhost:8082/variety/id/${product.idVariety}`);
                        product.idVariety = varietyResponse.data.name;
                    } catch (error) {
                        console.error('Error fetching variety:', error);
                    }
                    return product;
                }));
                setProducts(productData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);
    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <main className="mt-40">

            <div className="border-b border-gray-999 mb-5">
                <div className="flex items-center justify-center space-x-10">
                    <Carousel images={images} />
                    <Carousel images={images2} />
                </div>
                <div className="flex justify-center items-center mb-6">
                    <p className="font-light italic mt-5 text-neutral-500 text-center text-lg"><a className="font-bold italic text-xl">"</a> Vino Vivo wine-bar boutique está emplazado en el corazón de uno de los barrios más exclusivos de Buenos Aires. <br /> Nuestro espacio ofrece un ambiente íntimo y confortable. <a className="font-bold italic text-xl">"</a></p>
                </div>
            </div>

            <p className="text-fuchsia-900 text-center text-2xl font-semibold">NUESTRA PROPUESTA</p>

            <div className="flex justify-center">
                <div className="grid grid-cols-4 gap-6">
                    {visibleProducts.map(product => (
                        <div key={product.id} className="bg-white rounded-lg border border-gray-200 p-6 w-64">
                            <img src={product.image} alt={product.name} className="transform transition-transform duration-300 hover:cursor-pointer" />
                            <div className="flex flex-col items-center mt-2">
                                <p className="text-md font-bold text-black h-12">{product.name}</p>
                                <p className="text-sm text-black">{product.idVariety}</p>
                                <p className="text-lg font-semibold text-black mt-2">${product.price}</p>
                            </div>
                            <button className="bg-violeta hover:bg-fuchsia-950 text-white font-bold mt-6 py-1.5 px-4 rounded w-full">
                                COMPRAR
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {!showMore ? (
                <div className="flex justify-center mb-5">
                    <button className="bg-violeta hover:bg-fuchsia-950 text-white font-bold mt-6 py-1.5 px-4 rounded" onClick={() => setShowMore(true)}>MOSTRAR MÁS</button>
                </div>
            ) : (
                <div className="flex justify-center mb-5">
                    <button className="bg-violeta hover:bg-fuchsia-950 text-white font-bold mt-6 py-1.5 px-4 rounded" onClick={() => setShowMore(false)}>MOSTRAR MENOS</button>
                </div>
            )}

        </main>
    );
};

export default Body;
