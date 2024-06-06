import React from "react";
import { useCart } from "@/context/CartContext";
import Line from "./Line";

const CartDisplay = () => {
    const { cartItems } = useCart();

    return (
        <div>
            <h2>Carrito de Compras</h2>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>
                        <p>{item.name}</p>
                        <p>{item.variety}</p>
                        <p>{item.price}</p>
                        <p>Cantidad: {item.quantity}</p>
                        <Line/>
                    </li>                    
                ))}                
            </ul>            
        </div>
    );
};

export default CartDisplay;
