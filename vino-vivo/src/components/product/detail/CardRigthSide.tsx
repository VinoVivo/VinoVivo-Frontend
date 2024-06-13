'use client';
import {  CardContent} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaCartPlus } from "react-icons/fa";
import { IwineDetail } from "@/types/detail/detail.types";
import BackButton from "@/components/ui/BackButton";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { useState } from "react";
import DialogeMessage from "../register/DialogeMessage";

interface CardRigthSideProps {
    wine: IwineDetail;
}
export default function CardRigthSide({wine}: Readonly<CardRigthSideProps>) {
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

    return(       
        <>
            <CardContent className="flex flex-col">
                <div className="flex justify-between mb-4">
                    <h1 className="text-xl font-bold mb-1">{wine.name}</h1>
                    {/* <span className="ml-2">Icon</span> */}
                </div>            
                <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 mb-4">
                    <div className="text-left font-bold max-w-xs">
                        <p className="mb-1">Tipo de vino: </p>                
                        <p className="mb-1">Año: </p>
                        <p className="mb-1">Bodega: </p>
                        <p className="mb-1">Variedad de uva: </p>
                        <p className="mb-1">Stock disponible: </p>
                        <p className="mb-1">Precio: </p>
                        <p className="mb-1">Descripción: </p>
                    </div>
                    <div className="text-left">
                        <p className="mb-1">{wine.nameType}</p>                    
                        <p className="mb-1">{wine.year}</p>
                        <p className="mb-1">{wine.nameWinery}</p>
                        <p className="mb-1">{wine.nameVariety}</p>
                        <p className={`mb-1 ${isOutOfStock ? 'text-red-500' : 'text-green-500'}`}>
                            {isOutOfStock ? 'Agotado' : `Disponible (${wine.stock} disponibles)`}
                        </p>
                        <p className="mb-1 font-bold">{wine.price}</p>
                        <p className="mb-1 text-justify">{wine.description}</p>
                    </div>                
                </div>
                <div className="flex flex-row justify-between mt-4">
                    <Button 
                        className={`bg-violeta hover:bg-fuchsia-950 ${isOutOfStock ? 'bg-gray-400 cursor-not-allowed' : ''}`}
                        onClick={handleAddToCart}
                        disabled={isOutOfStock}
                    >
                            <div className="flex items-center">
                                <span>Agregar</span>
                                <span className="ml-2"><FaCartPlus /></span>
                            </div>
                    </Button>
                    <BackButton/>
                </div>
            </CardContent>
            <DialogeMessage
                open={showAlert} 
                onOpenChange={handleCloseAlert} 
                type="Alert" 
                message="Debe estar logeado para agregar productos al carrito" 
                textButtonOne="Cerrar"
            />
        </> 
    );
};