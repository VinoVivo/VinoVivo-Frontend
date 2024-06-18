'use client';
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Line from "./Line";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
    item: {
        id: number;
        name: string;
        variety: string;
        price: number;
        image: string;
        quantity: number;
    };
};

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
    
    const { incrementQuantity, decrementQuantity } = useCart();

    return (
        <div className="flex flex-col justify-between">
            <div className="flex flex-row p-2 mx-2 justify-between bg-backgroundCart">
                <div className="flex items-center justify-between space-x-4">
                    <div className="w-[60px] h-[100px] relative">
                        <Image src={item.image} alt={item.name} layout="fill" objectFit="cover"/>
                    </div>
                <div className="flex flex-col justify-center">
                    <p className="font-bold text-sm max-w-[120px] truncate">{item.name}</p>
                    <p className="font-bold text-xs max-w-[120px] truncate">{item.variety}</p>
                    <div className="flex flex-row my-4 items-center">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 rounded-l-full border border-textTypograph"
                            onClick={() => decrementQuantity(item.id)}
                            disabled={item.quantity <= 0}
                        >
                            <MinusIcon className="h-4 w-4 m-0" />
                            <span className="sr-only ">Decrease</span>
                        </Button>
                        <div className="border border-textTypograph flex items-center justify-center h-6 w-6 mx-0 bg-white">
                            <p className="font-bold">{item.quantity}</p>
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 rounded-r-full border border-textTypograph"
                            onClick={() => incrementQuantity(item.id)}
                        >
                            <PlusIcon className="h-4 w-4" />
                            <span className="sr-only">Increase</span>
                        </Button>
                    </div>
                </div>
                </div>
                <div className="mr-5">
                    <p className="text-primary font-bold">${item.price}</p>
                </div>
            </div>
            <Line/>
        </div>
    );
};

export default ProductCard;
