'use client'
import React, { useState, useEffect } from "react";
import Carousel from "@/components/carrousel/Carrousel";
import Loader from "@/components/loader/page";
import Link from "next/link";
import { useMediaQuery } from "@react-hook/media-query";
import { getProductList } from "@/lib/utils";
import { Product } from "@/types/products/products.types";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import DialogeMessage from "@/components/product/register/DialogeMessage";
import ProductCard from "@/components/product/ProductCard";
import { Title } from "@/components/Title/Title";

const Body = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
    const [showMore, setShowMore] = useState(false);
    const { addToCart, openCart} = useCart();
    const { data: session } = useSession();
    const [showAlert, setShowAlert] = useState(false);

    const images: string[] = [
        '/maridaje.jpg',
        '/bodega.jpg',
    ];
    const images2: string[] = [
        '/enoteca.jpg',
        '/catavinos.jpg',
    ];
    const images3: string[] = [
        '/maridaje.jpg',
        '/bodega.jpg',
        '/enoteca.jpg',
        '/catavinos.jpg',
    ];
    const isMobile = useMediaQuery("(max-width: 768px)");

    useEffect(() => {
        setLoading(true);
        const fetchProducts = async () => {
            try {
                const productList = await getProductList();
                setProducts(productList);
                showMore ? setVisibleProducts(productList.slice(0, 8)) : setVisibleProducts(productList.slice(0, 4));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
            setLoading(false);
        };
        fetchProducts();
    }, [showMore]);

    const handleBuyButtonClick = (product: Product) => {
        if (!session) {
            setShowAlert(true);
            return;
        }
        const item = {
            id: product.id,
            name: product.name,
            variety: product.nameVariety, 
            price: product.price,
            image: product.image,
            quantity: 1,
        };
        addToCart(item);
        openCart();
    };
    
    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    return (
        <div className={isMobile ? "mt-24" : "mt-40"}>
            <div className={isMobile ? "flex flex-col-reverse mb-6 p-2" : "border-b border-gray-300 mb-5"}>
                <div className="flex flex-col md:flex-row items-center justify-center space-y-5 md:space-y-0 md:space-x-10">
                    {isMobile ? (
                        <Carousel images={images3} />
                    ) : (
                        <>
                            <Carousel images={images} />
                            <Carousel images={images2} />
                        </>
                    )}
                </div>
                <div className="flex justify-center items-center mb-6">
                    <p className="font-light italic mt-5 text-neutral-500 text-center text-lg">
                        <a className="font-bold italic text-xl">"</a>
                        Vino Vivo wine-bar boutique está emplazado en el corazón de uno de los barrios más exclusivos de Buenos Aires.
                        <br />
                        Nuestro espacio ofrece un ambiente íntimo y confortable.
                        <a className="font-bold italic text-xl">"</a>
                    </p>
                </div>
            </div>
            {/* <p className="text-fuchsia-900 text-center text-2xl font-semibold mb-2">NUESTRA PROPUESTA</p> */}
            <div className="mb-6">
            <Title title="NUESTRA PROPUESTA" color="beige" />
            </div>

            {loading && <Loader />}

            <div className="flex justify-center">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {visibleProducts.map(product => (
                        <ProductCard
                        key={product.id}
                        product={product}
                        onBuyClick={() => handleBuyButtonClick(product)}
                        />
                    ))}
                </div>
            </div>

            <div className="flex justify-center mb-5 gap-4">
                {/* <button
                    className="bg-violeta hover:bg-fuchsia-950 text-white font-bold mt-6 py-1.5 px-4 rounded"
                    onClick={() => setShowMore(!showMore)}
                >
                    {showMore ? 'MOSTRAR MENOS' : 'MOSTRAR MÁS'}
                </button> */}
                <Link href="/products">
                    <button
                        className="bg-violeta hover:bg-fuchsia-950 text-white font-bold mt-6 py-1.5 px-4 rounded"
                    >
                        VER TODOS
                    </button>
                </Link>
            </div>
            <DialogeMessage
                open={showAlert}
                onOpenChange={handleCloseAlert}
                type="Alert"
                message="Debe estar logeado para comprar productos"
                textButtonOne="Cerrar"
            />
        </div>
    );
};

export default Body;
