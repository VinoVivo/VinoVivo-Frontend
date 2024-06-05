// src/components/DrawerCart.tsx

'use client';

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerClose, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useCart } from "@/context/CartContext";

export default function DrawerCart() {
    const { isOpen, closeCart } = useCart();
    const [quantity, setQuantity] = useState(0);

    const increment = () => {
        setQuantity((prev) => prev + 1);
    };

    const decrement = () => {
        setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
    };

    return (
        <Drawer open={isOpen} onOpenChange={(isOpen) => !isOpen && closeCart()} direction="right">
            <DrawerContent className='h-screen top-0 right-0 left-auto mt-0 w-[355px] rounded-none flex flex-col'>
                <DrawerHeader>
                    <div className="flex flex-row justify-start">
                        <DrawerClose asChild>
                            <button
                                className="stroke-white-700 mr-4 h-5 w-5 border border-textTypograph rounded-sm"
                                onClick={closeCart}
                            >
                                <IoMdClose />
                            </button>
                        </DrawerClose>
                        <DrawerTitle>Carrito</DrawerTitle>
                    </div>
                </DrawerHeader>
                <div className="flex-grow mx-auto w-full max-w-sm">
                    <div className="flex flex-row p-4 pb-0 justify-between">
                        <div className=" flex flex-row justify-between border-b border-textTyphogra w-full pb-4 mb-4">
                            <h2 className="text-lg font-semibold">PRODUCTOS</h2>
                            <h2 className="text-lg font-semibold">SUBTOTAL</h2>
                        </div>
                    </div>
                    <div className="flex flex-row p-4 mx-2 justify-between border border-textTypograph rounded-sm">
                        <div className="flex items-center justify-around space-x-1">
                            <div>
                                <Image
                                    src="https://imagenes-proyecto-vino.s3.amazonaws.com/Vino_Tinto/Legaris_Roble_Ribera_del_Duero+Tempranillo+Codorniu_Raventos.jpeg"
                                    alt="producto"
                                    width={60}
                                    height={100}
                                />
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className="font-bold text-sm">nombre vino</p>
                                <p className="font-bold text-xs">tipo vino</p>
                                <div className="flex flex-row my-4 items-center">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-5 w-5 shrink-0 rounded-full border border-textTypograph rounded-sm"
                                        onClick={decrement}
                                        disabled={quantity <= 0}
                                    >
                                        <MinusIcon className="h-4 w-4" />
                                        <span className="sr-only ">Decrease</span>
                                    </Button>
                                    <div className="border border-textTypograph rounded-sm flex items-center justify-center h-5 w-5 mx-2">
                                        <p className="font-bold">{quantity}</p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-5 w-5 shrink-0 rounded-full border border-textTypograph rounded-sm"
                                        onClick={increment}
                                    >
                                        <PlusIcon className="h-4 w-4" />
                                        <span className="sr-only">Increase</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-primary font-bold">$ 105555</p>
                        </div>
                    </div>
                </div>
                <DrawerFooter className="flex flex-col space-y-4">
                    <div className="font-bold flex justify-end ">
                        <p className="font-bold mr-2 text-xl">Total: </p>
                        <p className="text-primary font-bold text-base">$ 105555</p>
                    </div>
                    <Button className="bg-violeta text-white hover:bg-white hover:border hover:border-violeta hover:text-violeta">
                        <Link href={"/"}>
                            Comprar ahora
                        </Link>
                    </Button>
                    <div className="flex justify-center mt-2">
                        <DrawerClose asChild>
                            <button
                                className="underline text-under"
                                onClick={closeCart}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        closeCart();
                                    }
                                }}
                            >
                                Seguir comprando
                            </button>
                        </DrawerClose>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
