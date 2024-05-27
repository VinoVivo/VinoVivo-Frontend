'use client'
import React, { useState, useEffect } from "react";
import Carousel from "@/components/carrousel/Carrousel";
import Loader from "@/components/loader/page";
// import axios from 'axios';
import Link from "next/link";
import { useMediaQuery } from "@react-hook/media-query";
import { getProductList } from "@/lib/utils";




const Body = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
    const [showMore, setShowMore] = useState(false);
  
    useEffect(() => {
        setLoading(true)
        const fetchProducts = async () => {
          const productList = await getProductList();
          setProducts(productList);
          showMore ? setVisibleProducts(productList.slice(0, 4)) : setVisibleProducts(productList.slice(0, 3))
        };
    
        fetchProducts();
       
        setLoading(false)
      }, [showMore]);
    
  
   


    // const visibleProducts = showMore ? products : products.slice(0, 4);
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
    ]

    const isMobile = useMediaQuery("(max-width: 768px)");
      

    // useEffect(() => {
    //     axios.get('http://localhost:8082/product/type/all')
    //         .then(async (response) => {
    //             console.log('Data from API:', response.data);
    //             const productData = await Promise.all(response.data.map(async (product: Product) => {
    //                 try {
    //                     const varietyResponse = await axios.get(`http://localhost:8082/variety/id/${product.idVariety}`);
    //                     product.idVariety = varietyResponse.data.name;
    //                 } catch (error) {
    //                     console.error('Error fetching variety:', error);
    //                 }
    //                 return product;
    //             }));
    //             setProducts(productData);
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching products:', error);
    //         });
    // }, []);

    return (
        <div className="mt-40">
            <div className="border-b border-gray-999 mb-5">
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

            <p className="text-fuchsia-900 text-center text-2xl font-semibold mb-2">NUESTRA PROPUESTA</p>

            {loading && <Loader />}

            <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    { visibleProducts.map(product => (
                        <div key={product.id} className="bg-white rounded-lg border border-gray-200 p-6 w-full sm:w-64">
                            <Link href={`/detail/${product.id}`}>
                                <img src={product.image} alt={product.name} className="w-full h-auto transform transition-transform duration-300 hover:scale-105" />
                            </Link>
                            <div className="flex flex-col items-center mt-2">
                                <p className="text-md font-bold text-black h-12 text-center">{product.name}</p>
                                <p className="text-sm text-black mt-2">{product.idVariety}</p>
                                <p className="text-md font-semibold text-black">${product.price}</p>
                            </div>
                            <button className="bg-violeta hover:bg-fuchsia-950 text-white font-bold mt-2 py-1.5 px-4 rounded w-full">
                                COMPRAR
                            </button>
                        </div>
                    ))
                    
                    
                }
              
                </div>
            </div>

            <div className="flex justify-center mb-5 gap-4">
      
        <button
          className="bg-violeta hover:bg-fuchsia-950 text-white font-bold mt-6 py-1.5 px-4 rounded"
          onClick={() => setShowMore(!showMore)}
        >
        {showMore ? 'MOSTRAR MENOS': 'MOSTRAR MÁS'} 
        </button>
      </div>
   

    </div>
           
         
    );
};

export default Body;
