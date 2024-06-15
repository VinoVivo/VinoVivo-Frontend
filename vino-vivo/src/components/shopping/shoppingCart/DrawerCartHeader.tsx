'use client';

import { DrawerClose, DrawerTitle } from "@/components/ui/drawer";
import { IoMdClose } from "react-icons/io";
import { useCart } from "@/context/CartContext";
import Line from "./Line";

const DrawerCartHeader = () => {
  const { closeCart } = useCart();

  return (
    <div className="px-4 mb-2">
      <div className="flex flex-row justify-start mb-4">
        <DrawerClose asChild>
          <button
            className="stroke-white-700 mr-4 h-5 w-5 border border-textTypograph rounded-sm"
            onClick={closeCart}
          >
            <IoMdClose />
          </button>
        </DrawerClose>
      </div>
      <Line />
    </div>
  );
};

export default DrawerCartHeader;
