import React, { useEffect, useState } from 'react';
import { CartItem, useCart } from '../../context/CartContext';
import PaymentForm from './PaymentForm';
import { AlertDialogAction, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { AlertDialog, AlertDialogContent } from '@radix-ui/react-alert-dialog';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { MdReportGmailerrorred } from 'react-icons/md';
import { useMediaQuery } from '@react-hook/media-query';

export interface ValidationErrors {
    name: string;
    expiry: string;
    cvc: string;
}

const PaymentPage = () => {
    const { cartItems, clearCart } = useCart();
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const [dialogType, setDialogType] = useState<"Éxito" | "Error">("Éxito");
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({ name: '', expiry: '', cvc: '' });
    const [updatedCartItems, setUpdatedCartItems] = useState<CartItem[]>(cartItems);

    // Nuevos estados para la dirección de envío
    const [useDefaultAddress, setUseDefaultAddress] = useState(true);
    const [newAddress, setNewAddress] = useState('');

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
                    setUserName(userData.userName);
                    setFirstName(userData.firstName);
                    setDialogType("Éxito");
                    setDialogMessage('Su compra ha sido realizada correctamente');
                } else {
                    throw new Error('Failed to fetch user profile');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setDialogType("Error");
                setDialogMessage('Su compra no se ha podido realizar correctamente');
            }
        };
        fetchUserProfile();
    }, []);

    const handleValidationError = (errors: ValidationErrors) => {
        setValidationErrors(errors);
    };

    const handlePayment = async () => {
        if (Object.values(validationErrors).some(error => error !== '')) {
            setDialogType("Error");
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
                throw new Error('Failed');
            }

            const responseData = await response.json();
            setDialogType("Éxito");
            setDialogMessage("Su compra ha sido realizada correctamente.");
            setDialogOpen(true);
            setTimeout(() => {
                window.location.href = '/';
            }, 3000);

            clearCart();

        } catch (error) {
            console.error('Error:', error);
            setDialogType("Error");
            setDialogMessage('Su compra no se ha podido realizar correctamente');
            setDialogOpen(true);
        }
    };

    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <div className={isMobile ? "mt-[-60px]" : 'container mx-auto p-4'}>
            {/* <div className='mb-10'>
                <p className='font-bold text-lg'>
                    Hola <span className='text-primary'>{firstName}</span>! Tu compra será enviada a tu dirección <span className='text-primary'>{address}</span>.
                </p>
                <p className='text-lg'>Completa debajo con tus datos de pago y procede a finalizar la compra.</p>
            </div> */}

            <div className='mb-4 border border-gray-200 rounded-md p-4'>
                <h2 className='text-lg font-bold mb-2 border-b'>Dirección de Envío</h2>
                <div className='flex flex-col'>
                    <label className='mb-2 border-b'>
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
            <div className='flex flex-col lg:flex-row justify-center gap-4'>
                <div className='flex-1'>
                    <div className={isMobile ? "flex flex-col" : 'border border-gray-200 rounded-md p-4'}>
                        <h2 className="text-lg font-bold mb-4">Datos de pago</h2>
                        <PaymentForm onValidationError={handleValidationError} />
                    </div>
                </div>
                <div className='lg:w-1/4 border border-gray-200 rounded-md p-4'>
                    <h2 className="text-lg font-bold mb-4">Resumen de Compra</h2>
                    <p className='font-medium mt-2'>Productos ({totalItems})</p>
                    {updatedCartItems.map((item) => (
                        <div className='flex justify-between' key={item.id}>
                            <p className='text-sm'>{item.name}</p>
                            <p className='text-sm text-violeta font-medium'>x{item.quantity}</p>
                        </div>
                    ))}
                    <div className='flex flex-row justify-between mt-5 border-t border-gray-200 pt-2'>
                        <p className='font-medium'>Total</p>
                        <p className='font-medium'>${totalPrice.toFixed(2)}</p>
                    </div>
                    <div className='flex justify-center mt-4'>
                        <button className='bg-violeta hover:bg-fuchsia-950 text-white font-bold py-1.5 px-4 rounded' onClick={handlePayment}>Finalizar Compra</button>
                    </div>
                </div>
            </div>

            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogContent className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-10 shadow-lg justify-between border-primary border-2">
                        <AlertDialogHeader className="flex flex-col items-center">
                            <AlertDialogTitle className='mt-2 mb-2 text-3xl'>
                                {dialogType === "Éxito" ? "Éxito" : "Error"}
                            </AlertDialogTitle>
                            {dialogType === "Éxito" ? (
                                <FaRegCircleCheck className="h-12 w-12 text-success mb-2" />
                            ) : (
                                <MdReportGmailerrorred className="h-12 w-12 text-destructive mb-2" />
                            )}
                            <AlertDialogDescription className='text-base'>
                                {dialogMessage}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className='mt-4'>
                            <AlertDialogAction onClick={() => setDialogOpen(false)}>
                                Cerrar
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default PaymentPage;
