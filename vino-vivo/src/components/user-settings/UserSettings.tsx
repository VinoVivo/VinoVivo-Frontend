'use client';
import federatedLogout from '@/app/api/auth/federated-logout/utils';
import { useMediaQuery } from '@react-hook/media-query';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const UserSettings = () => {
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [dni, setDni] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [photo, setPhoto] = useState('');
    const [orders, setOrders] = useState('');
    const [orderCount, setOrderCount] = useState(0);

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
                    setLastName(userData.lastName);
                    setDni(userData.dni);
                    setCellphone(userData.cellphone);
                    setCity(userData.city);
                    setState(userData.state);
                    setPhoto(userData.photo);
                } else {
                    throw new Error('Failed to fetch user profile');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };
        fetchUserProfile();
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`/api/orders/order`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Error al obtener las órdenes');
                }
                const orders = await response.json();
                setOrders(orders);
                setOrderCount(orders.length);
            } catch (error) {
                console.error('Error getting orders:', error);
            }
        };
        fetchOrders();
    }, []);

    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <div className={isMobile ? "mt-20" : "flex flex-col mt-32 min-h-screen"}>
            <div className="flex flex-1 flex-col md:flex-row">
                <aside className="w-full md:w-64">
                    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-200">
                        <ul className="space-y-2 font-medium">
                            <li>
                                <Link href="/orders" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Mis compras</span>
                                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-white bg-violeta rounded-full dark:bg-blue-900 dark:text-blue-300">{orderCount}</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="https://vinovivo-production.up.railway.app/realms/vino-vivo/account/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Editar Perfil</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/" onClick={() => federatedLogout()} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15l-6-6m0 0l6-6M3 9h12a6 6 0 110 12h-3" />
                                    </svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Cerrar Sesión</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside>

                <div className="flex-1 p-4 md:p-10">
                    <div className="container flex flex-col border border-gray-200 rounded-lg shadow p-4 md:p-10 w-full md:w-3/4 bg-gray-100">
                        <h1 className="text-start text-xl md:text-2xl font-bold mb-4">Mi Perfil</h1>
                        <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6">
                            <div className="flex flex-col items-center md:items-start border border-gray-100 p-4 md:p-6 rounded-lg shadow bg-white">
                                <img src={photo} alt="" className="w-24 h-24 md:w-44 md:h-36 mb-4 bg-violeta object-cover rounded" />
                                <div>
                                    <p className="text-lg font-semibold mb-1 text-center text-violeta">{userName}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full">
                                <div>
                                    <label className="block text-black font-semibold">Nombre</label>
                                    <p>{firstName}</p>
                                </div>
                                <div>
                                    <label className="block text-black font-semibold">Apellido</label>
                                    <p>{lastName}</p>
                                </div>
                                <div>
                                    <label className="block text-black font-semibold">Email</label>
                                    <p>{email}</p>
                                </div>
                                <div>
                                    <label className="block text-black font-semibold">Teléfono</label>
                                    <p>{cellphone}</p>
                                </div>
                                <div>
                                    <label className="block text-black font-semibold">Ciudad</label>
                                    <p>{city}</p>
                                </div>
                                <div>
                                    <label className="block text-black font-semibold">Provincia</label>
                                    <p>{state}</p>
                                </div>
                                <div>
                                    <label className="block text-black font-semibold">Dirección</label>
                                    <p>{address}</p>
                                </div>
                                <div>
                                    <label className="block text-black font-semibold">DNI</label>
                                    <p>{dni}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserSettings;
