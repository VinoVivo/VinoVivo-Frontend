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
export default function CardEspecs({wine}: Readonly<CardRigthSideProps>) {
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
            <CardContent className="flex flex-col rounded-lg border-1 mt-6 bg-card text-card-foreground shadow-sm">
                <div className="flex justify-between mb-4">
                    <h1 className="text-2xl font-semibold leading-none racking-tight mt-5 border-b pb-2">Especificaciones</h1>
                </div>            
                <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 mb-4">
                    <div className="text-leftmax-w-xs">
                        <p className="font-semibold">TIPO </p>
                        <p className="mb-4 text-gray-500 mt-[-4px]">{wine.nameType}</p>    
                        <p className="font-semibold">VARIEDAD </p>
                        <p className="mb-4 text-gray-500 mt-[-4px]">{wine.nameVariety}</p>     
                        <p className="font-semibold">BODEGA </p>
                        <p className="mb-4 text-gray-500 mt-[-4px]">{wine.nameWinery}</p>    
                        <p className="font-semibold">AÑO </p>
                        <p className="mb-4 text-gray-500 mt-[-4px]">{wine.year}</p>
                    </div>             
                </div>
            </CardContent>
        </> 
    );
};