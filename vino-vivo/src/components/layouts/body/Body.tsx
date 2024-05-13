'use client'

import Carousel from "@/components/Carrousel/Carrousel";


const Body = () => {

    const images: string[] = [
        '/maridaje.jpg',
        '/bodega.jpg',
    ];
    const images2: string[] = [
        '/enoteca.jpg',
        '/catavinos.jpg',
    ]

    const generateCards = (wines: string[]) => {
        return wines.map((wine, index) => (
            <div key={index} className="m-4 bg-white rounded-lg border border-gray-200 p-6 w-64">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#5c284e" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
                <img src={wine} alt={"Producto " + (index + 1)} className="transform transition-transform duration-300 hover:cursor-pointer" />
                <div className="flex flex-col items-center mt-2">
                    <p className="text-md font-bold text-black">Nombre del Vino</p>
                    <p className="text-sm text-black">Tipo de Vino</p>
                    <p className="text-lg font-semibold text-black mt-2">$10.000</p>
                </div>
                <button className="bg-violeta hover:bg-fuchsia-950 text-white font-bold mt-6 py-1.5 px-4 rounded w-full">COMPRAR</button>
            </div>
        ));
    };

    return (
        <main className="mt-40">
            <div className="border-b border-gray-999 mb-5">
                <div className=" flex items-center justify-center space-x-10">
                    <Carousel images={images} />
                    <Carousel images={images2} />
                </div>
                <div className="flex justify-center items-center mb-6">
                    <p className="font-light italic mt-5 text-neutral-500 text-center text-lg"><a className="font-bold italic text-xl">"</a> Vino Vivo wine-bar boutique está emplazado en el corazón de uno de los barrios más exclusivos de Buenos Aires. <br /> Nuestro espacio ofrece un ambiente íntimo y confortable. <a className="font-bold italic text-xl">"</a></p>
                </div>
            </div>

            <p className="text-fuchsia-900 text-center text-2xl font-semibold">NUESTRA PROPUESTA</p>

            <div className="flex flex-wrap justify-center mt-4 space-x-16">
                {/* Card 1 */}
                <div className="m-4 bg-white rounded-lg border border-gray-200 p-6 w-64">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5c284e" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                    </button>
                    <img src="/vino1.jpg" alt="Producto 1" className="transform transition-transform duration-300 hover:cursor-pointer" />
                    <div className="flex flex-col items-center mt-2">
                        <p className="text-md font-bold text-black">Saint Felicien</p>
                        <p className="text-sm text-black">Malbec</p>
                        <p className="text-lg font-semibold text-black mt-2">$11.300</p>
                    </div>
                    <button className="bg-violeta hover:bg-fuchsia-950 text-white font-bold mt-6 py-1.5 px-4 rounded w-full">COMPRAR</button>
                </div>
                {/* Card 2 */}
                <div className="m-4 bg-white rounded-lg border border-gray-200 p-6 w-64">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5c284e" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                    </button>
                    <div className="flex flex-col items-center mt-2">
                        <img src="/vino2.jpg" alt="Producto 1" className="transform transition-transform duration-300 hover:cursor-pointer" />
                        <p className="text-md font-bold text-black">Catalpa</p>
                        <p className="text-sm text-black">Blend</p>
                        <p className="text-lg font-semibold text-black mt-2">$13.650</p>
                    </div>
                    <button className="bg-violeta hover:bg-fuchsia-950 text-white font-bold mt-6 py-1.5 px-4 rounded w-full">COMPRAR</button>
                </div>
                {/* Card 3 */}
                <div className="m-4 bg-white rounded-lg border border-gray-200 p-6 w-64">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5c284e" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                    </button>
                    <img src="/vino3.jpg" alt="Producto 1" className="transform transition-transform duration-300 hover:cursor-pointer" />
                    <div className="flex flex-col items-center mt-2">
                        <p className="text-md font-bold text-black">Marraso</p>
                        <p className="text-sm text-black">Blend</p>
                        <p className="text-lg font-semibold text-black mt-2">$15.600</p>
                    </div>
                    <button className="bg-violeta hover:bg-fuchsia-950 text-white font-bold mt-6 py-1.5 px-4 rounded w-full">COMPRAR</button>
                </div>
                {/* Card 4 */}
                <div className="m-4 bg-white rounded-lg border border-gray-200 p-6 w-64">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5c284e" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                    </button>
                    <img src="/vino4.jpg" alt="Producto 1" className="transform transition-transform duration-300 hover:cursor-pointer" />
                    <div className="flex flex-col items-center mt-2">
                        <p className="text-md font-bold text-black">Gran Enemigo</p>
                        <p className="text-sm text-black">Cabernet Franc</p>
                        <p className="text-lg font-semibold text-black mt-2">$37.740</p>
                    </div>
                    <button className="bg-violeta hover:bg-fuchsia-950 text-white font-bold mt-6 py-1.5 px-4 rounded w-full">COMPRAR</button>
                </div>
            </div>

            <div className="flex justify-center mb-5">
                <button className="bg-violeta hover:bg-fuchsia-950 text-white font-bold mt-6 py-1.5 px-4 rounded">MÁS PRODUCTOS</button>
            </div>
        </main>
    );
};

export default Body;