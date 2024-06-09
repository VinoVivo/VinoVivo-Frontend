'use client';
import {  CardContent} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaCartPlus } from "react-icons/fa";
import { IwineDetail } from "@/types/detail/detail.types";
import BackButton from "@/components/ui/BackButton";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { useState } from "react";
import DialogeRegister from "@/components/product/register/DialogeRegister";

interface CardRigthSideProps {
    wine: IwineDetail;
}
export default function CardRigthSide({wine}: Readonly<CardRigthSideProps>) {
    const { addToCart, openCart } = useCart();
    const { data: session } = useSession();
    const [showAlert, setShowAlert] = useState(false);

    const handleAddToCart = () => {
        if (!session) {
            setShowAlert(true);
            return;
        }
        const item = {
            id: wine.id,
            name: wine.name.split(' ').slice(0, 2).join(' '), 
            variety: wine.variety,
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
                        <p className="mb-1">{wine.type}</p>                    
                        <p className="mb-1">{wine.year}</p>
                        <p className="mb-1">{wine.winery}</p>
                        <p className="mb-1">{wine.variety}</p>
                        <p className="mb-1">{wine.stock}</p>
                        <p className="mb-1 font-bold">{wine.price}</p>
                        <p className="mb-1 text-justify">{wine.description}</p>
                    </div>                
                </div>
                <div className="flex flex-row justify-between mt-4">
                    <Button className="bg-violeta hover:bg-fuchsia-950" onClick={handleAddToCart}>
                            <div className="flex items-center">
                                <span>Agregar</span>
                                <span className="ml-2"><FaCartPlus /></span>
                            </div>
                    </Button>
                    <BackButton/>
                </div>
            </CardContent>
            <DialogeRegister 
                open={showAlert} 
                onOpenChange={handleCloseAlert} 
                type="error" 
                message="Debe estar logeado para agregar productos al carrito" 
            />
        </> 
    );
};