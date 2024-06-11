import React, { useEffect, useState } from 'react';
import { CartItem, useCart } from '../../context/CartContext';
import PaymentForm from './PaymentForm';
import { AlertDialogAction, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { AlertDialog, AlertDialogContent } from '@radix-ui/react-alert-dialog';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { MdReportGmailerrorred } from 'react-icons/md';

export interface ValidationErrors {
    name: string;
    expiry: string;
    cvc: string;
}

const PaymentPage = () => {
    const { cartItems } = useCart();
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const [dialogType, setDialogType] = useState<"Éxito" | "Error">("Éxito");
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({ name: '', expiry: '', cvc: '' });
    const [updatedCartItems, setUpdatedCartItems] = useState<CartItem[]>(cartItems);
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
                setDialogMessage('Su compra no se ha podido realizar corretamente');
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

            const orderData = {
                shippingAddress: address,
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

        } catch (error) {
            console.error('Error:', error);
            setDialogType("Error");
            setDialogMessage('Su compra no se ha podido realizar corretamente');
            setDialogOpen(true);
        }
    };

    return (
        <div className='flex flex-col items-center'>
            
            <div className='mb-10 flex just flex-col'>
                <div className='flex space-x-1'>
                    <p className='font-bold text-lg'>Hola </p> <p className='font-bold text-primary text-lg'>{firstName}</p> <p className='font-bold text-lg'>!</p> <p className='text-lg'> Tu compra será enviada a tu dirección</p><p className='text-primary font-bold text-lg'>{address}</p>
                </div>
                <div className='flex space-x-1'>
                    <p className='text-lg'>Completa debajo con tus</p> <p className='font-bold text-lg'>datos de pago</p> <p className='text-lg'>y procede a</p> <p className='font-bold text-lg'>finalizar la compra</p>
                </div>
                {/* <p className='font-medium'>Le enviaremos un email a {email}, con sus datos de compra.</p> */}
            </div>
            
            <div className='flex justify-evenly'>
                <div className='border border-gray-200 rounded-md p-4'>
                    <h2 className="text-lg font-bold mb-4">Datos de pago</h2>
                    <PaymentForm onValidationError={handleValidationError} />
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
                <div className="w-1/4 ml-8 border border-gray-200 rounded-md p-4 flex flex-col">
                    <div className='border-b border-gray-200'>
                        <h2 className="text-lg font-bold mb-4">Resumen de Compra</h2>
                    </div>
                    <p className='font-medium mt-2'>Productos ({totalItems})</p>
                    {updatedCartItems.map((item) => (
                        <div className='flex justify-between' key={item.id}>
                            <p className='text-sm p-2'>{item.name}</p><p className='text-sm p-2 text-violeta font-medium'>x{item.quantity}</p>
                        </div>
                    ))}
                    <div className='flex flex-row justify-between mt-5 border-t border-gray-200'>
                        <p className='font-medium mt-2'>Total</p><p className='font-medium mt-2'>${totalPrice.toFixed(2)}</p>
                    </div>
                    <div className='flex justify-center'>
                        <button className='bg-violeta hover:bg-fuchsia-950 text-white font-bold mt-2 py-1.5 px-4 rounded' onClick={handlePayment}>Finalizar Compra</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PaymentPage;
