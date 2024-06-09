"use client";
import { useEffect, useState } from "react";
import { getProductsType, getTypes } from '@/lib/utils';
import Loader from '@/components/loader/page';
import { usePathname } from "next/navigation";
import { Title } from "@/components/Title/Title";
import Link from "next/link";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { IwineDetail, WineType } from "@/types/detail/detail.types";

export default function TypePage() {
    const [products, setProducts] = useState<IwineDetail[]>([]);
    const [nameType, setNameType] = useState("");
    const [loading, setLoading] = useState(true);
    const [wineTypes, setWineType] = useState<WineType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(8); // Cambia el tamaño de la página según sea necesario
    const path = usePathname();
    const id = path.match(/\d+$/)?.[0];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productList = await getProductsType(id);
                setProducts(productList);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
            setLoading(false);
        };
        fetchProducts();

        const fetchTypes = async () => {
            try {
                const typeList = await getTypes();
                setWineType(typeList);
            } catch (error) {
                console.error("Error fetching types:", error);
            }
            setLoading(false);
        };
        fetchTypes();
    }, [id]);

    useEffect(() => {
        if (wineTypes.length > 0 && id !== undefined) {
            const item = wineTypes.find((item) => item.id === parseInt(id));
            if (item) {
                setNameType("Vino " + item.name);
            }
        }
    }, [wineTypes, id]);

    // Calcular los productos a mostrar en la página actual
    const startIndex = (currentPage - 1) * pageSize;
    const currentProducts = products.slice(startIndex, startIndex + pageSize);

    const totalPages = Math.ceil(products.length / pageSize);

    return (
        <>
            <div className="grid mb-10 mt-40">
                <div className="mb-10 mt-5">
                    {loading ? <Loader /> : <Title title={nameType} color="beige" />}
                </div>
                {loading && <Loader />}
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {currentProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-lg border border-gray-200 p-6 w-64"
                            >
                                <Link href={`/detail/${product.id}`}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="transform transition-transform duration-300 hover:cursor-pointer"
                                    />
                                </Link>
                                <div className="flex flex-col items-center mt-2">
                                    <p className="text-md font-bold text-black h-12">
                                        {product.name}
                                    </p>
                                    <p className="text-sm text-black">{product.nameVariety}</p>
                                    <p className="text-lg font-semibold text-black mt-2">
                                        ${product.price}
                                    </p>
                                </div>
                                <button className="bg-violeta hover:bg-fuchsia-950 text-white font-bold mt-6 py-1.5 px-4 rounded w-full">
                                    COMPRAR
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <Pagination className="mt-2">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href="#"
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() =>
                                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </>
    );
}