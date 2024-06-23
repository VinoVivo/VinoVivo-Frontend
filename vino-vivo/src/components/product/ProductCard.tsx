
import React from "react";
import { Product } from "@/types/products/products.types";
import Link from "next/link";
import { useMediaQuery } from "@react-hook/media-query";

interface ProductCardProps {
    product: Product;
    onBuyClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onBuyClick }) => {
    const handleBuyButtonClick = () => {
        onBuyClick(product);
    };

    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <div className="bg-white bg-opacity-75 rounded-lg border border-gray-200 p-6 w-full sm:w-64 flex flex-col">
            <Link href={`/detail/${product.id}`}>
                <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto transform transition-transform duration-300 hover:scale-105"
                />
            </Link>
            <div className="flex flex-col items-center mt-2">
                <p className={isMobile ? "text-sm font-bold text-black h-12 text-center" : "text-md font-bold text-black h-12 text-center"}>
                {product.name}
                </p>
                <p className="text-md font-semibold text-black">${product.price}</p>                
            </div>
            <button
                onClick={handleBuyButtonClick}
                className={`${
                product.stock && product.stock > 0
                    ? "bg-violeta hover:bg-fuchsia-950"
                    : "bg-gray-500 cursor-not-allowed"
                } text-white text-xs font-medium mt-2 py-1.5 px-4 rounded-sm flex justify-center`}
                disabled={!product.stock || product.stock <= 0}
            >
                COMPRAR
            </button>
        </div>
    );
};

export default ProductCard;
