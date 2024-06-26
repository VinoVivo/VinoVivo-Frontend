import React, { useEffect, useState } from 'react';
import { CartItem, useCart } from '../../context/CartContext';
import PaymentForm from './PaymentForm';
import { useMediaQuery } from '@react-hook/media-query';
import { redirect } from 'next/navigation';
import DialogeMessage from '../product/register/DialogeMessage';
import BackText from '../ui/BackText';

export interface ValidationErrors {
    name: string;
    expiry: string;
    cvc: string;
}

const PaymentPage = () => {
    const { cartItems, clearCart } = useCart();
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({ name: '', expiry: '', cvc: '' });
    const [updatedCartItems, setUpdatedCartItems] = useState<CartItem[]>(cartItems);

    // Nuevos estados para la dirección de envío
    const [useDefaultAddress, setUseDefaultAddress] = useState(true);
    const [newAddress, setNewAddress] = useState('');

    // Estado para el diálogo
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState<'ÉXITO' | 'ERROR' | 'ALERTA'>('ÉXITO');
    const [dialogMessage, setDialogMessage] = useState('');

    const totalPrice = updatedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalItems = updatedCartItems.reduce((acc, item) => acc + item.quantity, 0);


    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('/api/user-profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const userData = await response.json();
                    setAddress(userData.address);
                    setEmail(userData.email);
                } else {
                    throw new Error('Failed to fetch user profile');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setDialogType("ERROR");
                setDialogMessage('No se pudo obtener el perfil del usuario.');
                setDialogOpen(true);
            }
        };
        fetchUserProfile();
    }, []);

    const handleValidationError = (errors: ValidationErrors) => {
        setValidationErrors(errors);
    };

    const handlePayment = async () => {
        if (Object.values(validationErrors).some(error => error !== '')) {
            setDialogType("ERROR");
            setDialogMessage("Hay errores en los datos de la tarjeta. Por favor, intente de nuevo.");
            setDialogOpen(true);
            return;
        }

        try {
            const orderDetailsDTORequests: { idProduct: number; quantity: number }[] = cartItems.map((item: CartItem) => ({
                idProduct: item.id,
                quantity: item.quantity
            }));

            // Utiliza la dirección seleccionada (predeterminada o nueva)
            const shippingAddress = useDefaultAddress ? address : newAddress;

            const orderData = {
                shippingAddress: shippingAddress,
                orderEmail: email,
                orderDetailsDTORequests: orderDetailsDTORequests
            };

            const response = await fetch(`/api/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error('Failed to process the order');
            }

            await response.json();
            setDialogType("ÉXITO");
            setDialogMessage("Su compra ha sido realizada correctamente.");
            setDialogOpen(true);
            clearCart();        

        } catch (error) {
            console.error('Error:', error);
            setDialogType("ERROR");
            setDialogMessage('Su compra no se ha podido realizar correctamente.');
            setDialogOpen(true);
        }
    };

    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <div className={isMobile ? "mt-[-60px]" : 'container mx-auto p-4'}>
            <div className='mb-4 border rounded-md p-4 bg-backgroundCart'>
                <h2 className='text-lg font-bold mb-2'>Dirección de Envío</h2>
                <div className='flex flex-col'>
                    <label className='mb-2'>
                        <input
                            type='radio'
                            checked={useDefaultAddress}
                            onChange={() => setUseDefaultAddress(true)}
                            className='accent-violeta'
                        />
                        <span className='ml-2'>Dirección predeterminada</span>
                        <p className='font-semibold ml-5 mb-2'>{address}</p>
                    </label>
                    <div>
                    </div>
                    <label className='mb-2'>
                    </label>
                    <label className='mb-2'>
                        <input
                            type='radio'
                            checked={!useDefaultAddress}
                            onChange={() => setUseDefaultAddress(false)}
                            className='accent-violeta'
                        />
                        <span className='ml-2'>Usar una nueva dirección</span>
                    </label>
                    <div
                        className={`transition-opacity duration-500 ${useDefaultAddress ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'
                            }`}
                    >
                        {!useDefaultAddress && (
                            <input
                                type='text'
                                value={newAddress}
                                onChange={(e) => setNewAddress(e.target.value)}
                                placeholder='Ingrese la nueva dirección'
                                className="border border-gray-200 rounded-md px-3 py-1 focus:outline-none focus:border-primary mt-2"
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className='flex flex-col lg:flex-row justify-center gap-4 '>
                <div className='flex-1'>
                    <div className={isMobile ? "flex flex-col bg-backgroundCart border border-gray-200 rounded-md p-4" : 'border border-gray-200 rounded-md p-4 bg-backgroundCart'}>
                        <h2 className="text-lg font-bold mb-4">Datos de pago</h2>
                        <PaymentForm onValidationError={handleValidationError} />
                    </div>
                </div>
                <div className='lg:w-1/4 p-4'>
                    <h2 className="text-lg font-bold mb-4 border-t border-b border-[#5B483A] p-2">Resumen de Compra</h2>
                    <p className='font-medium mt-2'>Productos ({totalItems})</p>
                    {updatedCartItems.map((item) => (
                        <div className='flex justify-between' key={item.id}>
                            <p className='text-sm'>{item.name}</p>
                            <p className='text-sm text-violeta font-medium'>x{item.quantity}</p>
                        </div>
                    ))}
                    <div className='flex flex-row justify-between mt-5 border-t border-[#5B483A] pt-2'>
                        <p className='font-medium'>Total</p>
                        <p className='font-medium'>${totalPrice.toFixed(2)}</p>
                    </div>
                    <div className='flex justify-center mt-4 flex-col'>
                        <button className='bg-violeta hover:bg-fuchsia-950 text-white font-medium text-sm py-1.5 px-4 rounded-sm mb-3' onClick={handlePayment}>FINALIZAR COMPRA</button>
                        <BackText/>
                    </div>
                </div>
            </div>
            <DialogeMessage
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                type={dialogType}
                message={dialogMessage}
                textButtonTwo="CERRAR"
                buttonTwoHref="/"
            />
        </div>
    );
};

export default PaymentPage;
