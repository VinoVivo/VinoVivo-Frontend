'use client';

import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { useCart } from "@/context/CartContext";
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const DrawerCartFooter = () => {

  const { closeCart, cartItems } = useCart();
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <DrawerFooter className="flex flex-col space-y-4">
      <div className="font-bold flex justify-end ">
        <p className="font-bold mr-2 text-xl">Total: </p>
        <p className="text-primary font-bold text-base">$ {total.toFixed(2)}</p>
      </div>
      <Button className="bg-violeta text-white hover:bg-white hover:border hover:border-violeta hover:text-violeta">
        <Link href={"/"}>Comprar ahora</Link>
      </Button>
      <div className="flex justify-center mt-2">
        <DrawerClose asChild>
          <button
            className="underline text-under"
            onClick={closeCart}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                closeCart();
              }
            }}
          >
            Seguir comprando
          </button>
        </DrawerClose>
      </div>
    </DrawerFooter>
  );
};

export default DrawerCartFooter;
