// app/checkout/page.tsx
'use client'
import React from 'react';
import { CartProvider, useCart } from '../../context/CartContext';
import Checkout from '@/components/checkout/Checkout';

const CheckoutPage: React.FC = () => {
    const { cartItems } = useCart();

    return (
        <div className="container mx-auto p-4">
                <Checkout cartItems={cartItems} />
        </div>
    );
};

export default CheckoutPage;
