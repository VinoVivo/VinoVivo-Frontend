'use client';
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IwineDetail } from "@/types/detail/detail.types";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { useState } from "react";
import DialogeMessage from "../register/DialogeMessage";

interface CardRigthSideProps {
    wine: IwineDetail;
}

export default function CardRigthSide({ wine }: Readonly<CardRigthSideProps>) {
    const { addToCart, openCart } = useCart();
    const { data: session } = useSession();
    const [showAlert, setShowAlert] = useState(false);
    const isOutOfStock = wine.stock === 0;

    const handleAddToCart = () => {
        if (!session) {
            setShowAlert(true);
            return;
        }
        const item = {
            id: wine.id,
            name: wine.name.split(' ').slice(0, 2).join(' '),
            variety: wine.nameVariety,
            price: wine.price,
            image: wine.image,
            quantity: 1,
        };
        addToCart(item);
        openCart();
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    return (
        <>
            <CardContent className="flex flex-col items-center">
                <div className="flex justify-between mb-4 w-full">
                    <h1 className="text-2xl font-normal border-b-2 border-t-2 border-[#5B483A] pt-2 pb-2 w-full text-center">{wine.name}</h1>
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-y-2 mb-4 w-full">
                    <div className="text-left w-full mt-4">
                        <p className="mb-1 text-justify h-[200px] font-light">{wine.description}</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center mt-4 space-y-4 w-full px-6">
                    <div className="flex justify-between items-center w-3/4">
                        <p className="flex mb-1 text-lg font-light text-violeta">
                            {isOutOfStock ? 'Agotado' : 'En stock'}
                        </p>
                        <p className="flex mb-1 font-semibold text-lg text-[#70054C]">
                            ${wine.price}
                        </p>
                    </div>
                    <Button
                        className={`bg-[#70054C] rounded-sm w-4/5 hover:bg-fuchsia-950 ${isOutOfStock ? 'bg-gray-400 cursor-not-allowed' : ''} mx-auto`}
                        onClick={handleAddToCart}
                        disabled={isOutOfStock}
                    >
                        <div className="flex items-center justify-center">
                            <span>COMPRAR</span>
                        </div>
                    </Button>
                </div>
            </CardContent>
            <DialogeMessage
                open={showAlert}
                onOpenChange={handleCloseAlert}
                type="ALERTA"
                message="Debe estar logueado para agregar productos al carrito"
                textButtonOne="Cerrar"
            />
        </>
    );
};
