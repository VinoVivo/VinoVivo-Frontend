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
        <div className="flex flex-col px-4 justify-between bg-backgroundCart">
            <div className="flex flex-row p-4 mx-2 justify-between bg-backgroundCart">
                <div className="flex items-center justify-around space-x-1">
                    <div>
                        <Image src={item.image} alt={item.name} width={60}  height={100}/>
                    </div>
                <div className="flex flex-col justify-center">
                    <p className="font-bold text-sm">{item.name}</p>
                    <p className="font-bold text-xs">{item.variety}</p>
                    <div className="flex flex-row my-4 items-center">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-5 w-5 shrink-0 rounded-full border border-textTypograph rounded-sm"
                        onClick={() => decrementQuantity(item.id)}
                        disabled={item.quantity <= 0}
                    >
                        <MinusIcon className="h-4 w-4" />
                        <span className="sr-only ">Decrease</span>
                    </Button>
                    <div className="border border-textTypograph rounded-sm flex items-center justify-center h-5 w-5 mx-2">
                        <p className="font-bold">{item.quantity}</p>
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-5 w-5 shrink-0 rounded-full border border-textTypograph rounded-sm"
                        onClick={() => incrementQuantity(item.id)}
                    >
                        <PlusIcon className="h-4 w-4" />
                        <span className="sr-only">Increase</span>
                    </Button>
                    </div>
                </div>
                </div>
                <div>
                    <p className="text-primary font-bold">${item.price}</p>
                </div>
            </div>
            <Line/>
        </div>
    );
};

export default ProductCard;
