import axios from "axios";
import Link from "next/link";

export default async function ProductDetail({ params: { id } }: { params: { id: string } }) {
    const promise = await axios.get(`http://localhost:8082/product/id/${id}`)
    const product = await promise.data;

    return (
        <div className="flex flex-col justify-center items-center mt-32">
            <div key={product.id} className="flex justify-center items-center w-[700px] h-[400px] p-6 bg-white rounded-lg border border-gray-200">
                <img src={product.image} alt={product.name} className="transform transition-transform duration-300 hover:cursor-pointer" />
                <div className="flex flex-col items-start mt-2">
                    <p className="text-xl font-bold text-black">{product.name}</p>
                    <p className="text-lg text-black mt-2 w-80 text-start">{product.description}</p>
                    <p className="text-xl font-semibold text-black mt-6">${product.price}</p>
                    <button className="w-32 bg-violeta hover:bg-fuchsia-950 text-white font-bold mt-2 py-1.5 px-4 rounded w-full">
                        COMPRAR
                    </button>
                </div>
            </div>
            
            <div className="flex justify-end w-1/2">
                <Link href={"/"}>
                    <button className="flex bg-violeta hover:bg-fuchsia-950 text-white font-bold mt-6 py-1.5 px-4 rounded ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>
                    </button>
                </Link>
            </div>
        </div>
    )
}