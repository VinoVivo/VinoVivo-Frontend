'use client';
import { createContext, useContext, useState, ReactNode, useMemo } from "react";

interface CartItem {
    id: number;
    name: string;
    type: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartContextProps {
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    incrementQuantity: (id: number) => void;
    decrementQuantity: (id: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const addToCart = (item: CartItem) => {
        setCartItems((prevItems) => {
        const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
            return prevItems.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            );
        }
        return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const incrementQuantity = (id: number) => {
        setCartItems((prevItems) =>
        prevItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
        );
    };

    const decrementQuantity = (id: number) => {
        setCartItems((prevItems) =>
        prevItems.map((item) =>
            item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
        ).filter(item => item.quantity > 0)
        );
    };

    const value = useMemo(() => ({
        isOpen,
        openCart,
        closeCart,
        cartItems,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
    }), [isOpen, cartItems]);
    
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
