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
    const [goal, setGoal] = useState(0);

    function onClick(adjustment: number) {
        setGoal(Math.max(50, Math.min(1, goal + adjustment)));
    }

    return (
        <Drawer open={isOpen} onOpenChange={(isOpen) => !isOpen && closeCart()} direction="right">
            <DrawerContent className='h-screen top-0 right-0 left-auto mt-0 w-[355px] rounded-none'>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <div className="flex flex-row justify-start">
                            <DrawerClose asChild>
                                <IoMdClose className="stroke-white-700 mr-10" onClick={closeCart} />
                            </DrawerClose>
                            <DrawerTitle>Carrito</DrawerTitle>
                        </div>
                    </DrawerHeader>
                    <div className="flex flex-row p-4 pb-0 justify-between">
                        <div className="flex items-center justify-around space-x-1">
                            <div>
                                <Image
                                    src="https://imagenes-proyecto-vino.s3.amazonaws.com/Vino_Tinto/Legaris_Roble_Ribera_del_Duero+Tempranillo+Codorniu_Raventos.jpeg"
                                    alt="producto"
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <div className="flex flex-col">
                                <p className="font-bold">nombre vino</p>
                                <p className="font-bold">tipo vino</p>
                                <div className="flex flex-row my-4 items-center">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-4 w-4 shrink-0 rounded-full"
                                        onClick={() => onClick(-1)}
                                        disabled={goal <= 0}
                                    >
                                        <MinusIcon className="h-4 w-4" />
                                        <span className="sr-only">Decrease</span>
                                    </Button>
                                    <p className="font-bold mx-2">{goal}</p>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 shrink-0 rounded-full"
                                        onClick={() => onClick(1)}
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
                    <DrawerFooter>
                        <div className="font-bold flex justify-end mr-2">
                            <p className="font-bold mr-4">Total </p>
                            <p className="text-primary font-bold">$ 105555</p>
                        </div>
                        <Button className="bg-violeta">
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
                </div>
            </DrawerContent>
        </Drawer>
    );
}
