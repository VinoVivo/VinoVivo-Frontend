'use client'
import React, { useState } from "react";
import Link from "next/link";
import { FaSearch, FaUser, FaShoppingCart, FaBars } from "react-icons/fa";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-violeta fixed top-0 w-full z-50">
            <div className="container mx-auto flex justify-between items-center h-full py-4 px-4 md:px-28">
                <div className="flex items-center">
                    <Link href="/">
                        <img src="/logo-vinovivo.png" alt="logo" className="h-24" />
                    </Link>  
                </div>
                <div className="hidden md:flex items-center space-x-12">
                    <Link href="/">
                        <span className="text-beige">PRODUCTOS</span>
                    </Link>
                    <Link href="/concept">
                        <span className="text-beige">CONCEPTO</span>
                    </Link>
                    <Link href="/contact">
                        <span className="text-beige">CONTACTO</span>
                    </Link>
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="text-violeta px-2 border border-gray-300 rounded-lg"
                    />
                    <FaSearch className="text-white text-xl cursor-pointer hover:text-gray-500" />
                    <FaUser className="text-white text-xl cursor-pointer hover:text-gray-500" />
                    <FaShoppingCart className="text-white text-xl cursor-pointer hover:text-gray-500" />
                </div>
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-white text-xl cursor-pointer hover:text-gray-500">
                        <FaBars />
                    </button>
                </div>
            </div>

            {/* Menú hamburguesa */}
            {isMenuOpen && (
                <div className="md:hidden bg-violeta py-4">
                    <div className="flex flex-col items-center space-y-4">
                        <Link href="/products">
                            <span className="text-beige">PRODUCTOS</span>
                        </Link>
                        <Link href="/concept">
                            <span className="text-beige">CONCEPTO</span>
                        </Link>
                        <Link href="/contact">
                            <span className="text-beige">CONTACTO</span>
                        </Link>
                        <input
                            type="text"
                            placeholder="Buscar"
                            className="text-violeta px-2 border border-gray-300 rounded-lg"
                        />
                        <FaSearch className="text-white text-xl" />
                        <FaUser className="text-white text-xl" />
                        <FaShoppingCart className="text-white text-xl" />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
