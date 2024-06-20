// components/checkout/Checkout.tsx
"use client";
import React, { useState } from "react";
import { CartItem, useCart } from "../../context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { Title } from "../Title/Title";
import { useMediaQuery } from "@react-hook/media-query";

interface CheckoutProps {
  cartItems: CartItem[];
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems }) => {
  const { removeFromCart, incrementQuantity, decrementQuantity } = useCart();
  const [updatedCartItems, setUpdatedCartItems] = useState<CartItem[]>(cartItems);

  const totalPrice = updatedCartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalItems = updatedCartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
    setUpdatedCartItems(updatedCartItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      incrementQuantity(id);
    } else {
      removeFromCart(id);
    }
    const updatedItems = updatedCartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity };
      }
      return item;
    });
    setUpdatedCartItems(updatedItems);
  };

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className={isMobile ? "mt-24" : "container mx-auto p-4 mt-32 flex flex-col lg:flex-col"}>

      <Title title="PRODUCTOS" color="beige" />
      
      <div className="flex mt-10 flex-col lg:flex-row">
        <div className="flex-grow gap-4 mt-4">
          {updatedCartItems.map((item) => (
            <div
              key={item.id}
              className="border-[#5B483A] p-4 border-b-1 border-t-1 mb-4 flex flex-col sm:flex-row items-center justify-between"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start">
                <div className="w-20 h-20 relative mr-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-md">{item.variety}</p>
                  <p className="text-md">${item.price * item.quantity}</p>
                </div>
              </div>

              <div className="mt-4 sm:mt-0 flex flex-col items-center space-y-2">
                <div className="flex items-center">
                  <button
                    className="h-5 w-5 border border-gray-500 rounded flex items-center justify-center"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <p className="text-lg mx-2 text-violeta font-medium">
                    {item.quantity}
                  </p>
                  <button
                    className="h-5 w-5 border border-gray-500 rounded flex items-center justify-center"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-primary font-bold"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:w-1/4 mt-8 lg:mt-0 lg:ml-8 p-4 flex flex-col">
          <div /* className="border-b border-gray-200" */>
            <h2 className="text-lg font-bold mb-4 border-[#5B483A] border-t-1 border-b-1 p-2">Resumen de Compra</h2>
          </div>
          <p className="font-medium mt-2">Productos ({totalItems})</p>
          {updatedCartItems.map((item) => (
            <div className="flex justify-between" key={item.id}>
              <p className="text-sm p-2">{item.name}</p>
              <p className="text-sm p-2 text-violeta font-medium">
                x{item.quantity}
              </p>
            </div>
          ))}
          <div className="flex flex-row justify-between mt-5 border-t-1 border-[#5B483A] pt-2">
            <p className="font-medium">Total</p>
            <p className="font-medium">${totalPrice.toFixed(2)}</p>
          </div>
          <Link className="flex justify-center" href="/checkout/buy/payment">
            <button className="mt-4 px-3 py-2 bg-violeta font-medium text-white text-sm rounded-md">
              CONFIRMAR COMPRA
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
