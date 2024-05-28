'use client';
import React, { useState } from 'react';

const UserSettings = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        avatar: 'avatar.jpg',
        fullName: 'Julio Born',
        documentNumber: '43.123.123',
        userType: 'Cliente',
        firstName: 'Juan',
        lastName: 'Born',
        email: 'julioborn@gmail.com',
        phone: '+54 3483-123123',
        country: 'Argentina',
        city: 'Santa Fe',
        address: 'Calle 123',
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <div className="flex flex-col mt-32 h-screen">
            <div className="flex flex-1">
                <aside className="w-64 h-full">
                    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-200">
                        <ul className="space-y-2 font-medium">
                            <li>
                                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Mis compras</span>
                                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-white bg-violeta rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={handleEditClick} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Editar Perfil</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15l-6-6m0 0l6-6M3 9h12a6 6 0 110 12h-3" />
                                    </svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Cerrar Sesión</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </aside>
                <div className="flex-1 p-10">
                    <div className="container flex flex-col border border-gray-200 rounded-lg shadow p-10 w-3/4 bg-gray-100">
                        <h1 className="text-start text-2xl font-bold mb-4">Mi Perfil</h1>
                        {isEditing ? (
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-black">Nombre:</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={user.firstName}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-black">Apellido:</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={user.lastName}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-black">Email:</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={user.email}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-black">Teléfono:</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={user.phone}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-black">País:</label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={user.country}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-black">Ciudad:</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={user.city}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-black">Dirección:</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={user.address}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-black">DNI:</label>
                                        <input
                                            type="text"
                                            name="documentNumber"
                                            value={user.documentNumber}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={handleSave}
                                    className="text-primary-foreground text-sm font-bold mt-6 py-2 px-4 rounded bg-violeta hover:bg-fuchsia-950 focus:ring-gray-300 focus:ring-opacity-80"
                                >
                                    GUARDAR   
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col justify-evenly md:flex-row items-center md:items-center md:space-x-6">
                                <div className="flex flex-col justify-center border border-gray-100 p-6 rounded-lg shadow pt-4 pb-4 pl-10 pr-10 bg-white">
                                    <img src={user.avatar} alt="" className="w-36 h-36 mb-4 bg-violeta" />
                                    <div>
                                        <p className="text-lg font-bold mb-1">{user.fullName}</p>
                                    </div>
                                    <div>
                                        <p className="text-md font-medium">{user.userType}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-black">Nombre y Apellido:</label>
                                            <p className="text-md font-semibold">{user.firstName} {user.lastName}</p>
                                        </div>
                                        <div>
                                            <label className="block text-black">Email:</label>
                                            <p className="text-md font-semibold">{user.email}</p>
                                        </div>
                                        <div>
                                            <label className="block text-black">Teléfono:</label>
                                            <p className="text-md font-semibold">{user.phone}</p>
                                        </div>
                                        <div>
                                            <label className="block text-black">País:</label>
                                            <p className="text-md font-semibold">{user.country}</p>
                                        </div>
                                        <div>
                                            <label className="block text-black">Ciudad:</label>
                                            <p className="text-md font-semibold">{user.city}</p>
                                        </div>
                                        <div>
                                            <label className="block text-black">Dirección:</label>
                                            <p className="text-md font-semibold">{user.address}</p>
                                        </div>
                                        <div>
                                            <label className="block text-black">DNI:</label>
                                            <p className="text-md font-semibold">{user.documentNumber}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserSettings;
