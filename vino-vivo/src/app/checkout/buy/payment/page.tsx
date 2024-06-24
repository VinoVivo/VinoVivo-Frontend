'use client'
import React from 'react';
import Payment from '@/components/checkout/Payment';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const CheckoutPaymentPage: React.FC = () => {
    const { data: session } = useSession();
    return (
        <div className="container mx-auto p-4 mt-40">
            {session !== null && session !== undefined ? <Payment /> : redirect('/')}
        </div>
    );
};

export default CheckoutPaymentPage;
