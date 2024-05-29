"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaUser, FaShoppingCart, FaBars } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  const user = {
    isLogged: false,
    isAdmin: false,
    inicials: "EZ",
  };

  return (
    <header className="bg-violeta fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center h-full py-4 px-4 md:px-28">
        <div className="flex items-center">
          <Link href="/">
            <img
              src="/logo-vinovivo.png"
              alt="logo"
              className="h-12 md:h-24"
              onClick={() => handleLinkClick("/home")}
            ></img>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span
                className={`relative
                            text-primary-foreground hover:text-gray-300
                            before:content-[''] before:absolute before:w-full before:scale-x-0 
                            before:h-[2px] before:bottom-0 before:left-0 before:bg-beige 
                            before:origin-bottom-right before:transition-transform before:duration-300 
                            hover:before:scale-x-100 hover:before:origin-bottom-left
                            ${
                              activeLink === "/type/?"
                                ? "before:scale-x-100 before:origin-bottom-left"
                                : ""
                            }`}
              >
                PRODUCTOS
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Categorias</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-secondary hover:text-beige">
                <Link
                  href="/type/3"
                  className="text-secondary hover:text-beige"
                >
                  <span onClick={() => handleLinkClick("/type/?")}>
                    Vino Tinto
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-secondary hover:text-black">
                <Link
                  href="/type/2"
                  className="text-secondary hover:text-beige"
                >
                  <span onClick={() => handleLinkClick("/type/?")}>
                    Vino Blanco
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-secondary hover:text-black">
                <Link
                  href="/type/1"
                  className="text-secondary hover:text-beige"
                >
                  <span onClick={() => handleLinkClick("/type/?")}>
                    Vino Rosado
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/" className="text-secondary hover:text-beige">
                  <span onClick={() => handleLinkClick("/type/?")}>
                    Vino Espumoso
                  </span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/concept">
            <span
              className={`relative
                            text-primary-foreground hover:text-gray-300
                            before:content-[''] before:absolute before:w-full before:scale-x-0 
                            before:h-[2px] before:bottom-0 before:left-0 before:bg-beige 
                            before:origin-bottom-right before:transition-transform before:duration-300 
                            hover:before:scale-x-100 hover:before:origin-bottom-left
                            ${
                              activeLink === "/concept"
                                ? "before:scale-x-100 before:origin-bottom-left"
                                : ""
                            }`}
              onClick={() => handleLinkClick("/concept")}
            >
              CONCEPTO
            </span>
          </Link>
          <Link href="/contact">
            <span
              className={`relative 
                            text-primary-foreground hover:text-gray-300
                            before:content-[''] before:absolute before:w-full before:scale-x-0 
                            before:h-[2px] before:bottom-0 before:left-0 before:bg-beige 
                            before:origin-bottom-right before:transition-transform before:duration-300 
                            hover:before:scale-x-100 hover:before:origin-bottom-left
                            ${
                              activeLink === "/contact"
                                ? "before:scale-x-100 before:origin-bottom-left"
                                : ""
                            }`}
              onClick={() => handleLinkClick("/contact")}
            >
              CONTACTO
            </span>
          </Link>
        </div>
        <div className="hidden md:flex space-x-4 items-center">
          {user.isLogged && (
            <DropdownMenu>
              <DropdownMenuTrigger className="text-beige hover:text-gray-300">
                {user.isLogged ? (
                  user.inicials
                ) : (
                  <FaUser className="text-white text-2xl cursor-pointer hover:text-gray-300" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="text-secondary hover:text-beige">
                  {user.isAdmin ? (
                    <Link href="/" className="text-secondary hover:text-beige">
                      Mis productos
                    </Link>
                  ) : (
                    <Link href="/" className="text-secondary hover:text-beige">
                      Mis compras
                    </Link>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem className="text-secondary hover:text-black">
                  <Link href="/" className="text-secondary hover:text-beige">
                    Otra{" "}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {!user.isLogged && (
            <DropdownMenu>
              <DropdownMenuTrigger className="text-beige hover:text-gray-300">
                <FaUser className="text-white text-2xl cursor-pointer hover:text-gray-300" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="text-secondary hover:text-beige">
                  <Link href="/" className="text-secondary hover:text-beige">
                    Ingresar
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-secondary hover:text-black">
                  <Link href="/" className="text-secondary hover:text-beige">
                    Crear cuenta
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <FaShoppingCart className="text-white text-2xl cursor-pointer hover:text-gray-300" />
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white text-2xl cursor-pointer hover:text-gray-300"
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Menú hamburguesa */}
      {isMenuOpen && (
        <div className="md:hidden bg-violeta py-4">
          <div className="flex flex-col items-center space-y-4">
            <Link href="/products">
              <span className="text-beige hover:text-gray-300">PRODUCTOS</span>
            </Link>
            <Link href="/concept">
              <span className="text-beige hover:text-gray-300">CONCEPTO</span>
            </Link>
            <Link href="/contact">
              <span className="text-beige hover:text-gray-300">CONTACTO</span>
            </Link>

            <div className="flex space-x-4 items-center">
              {user.isLogged && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-beige hover:text-gray-300">
                    {user.isLogged ? (
                      user.inicials
                    ) : (
                      <FaUser className="text-white text-2xl cursor-pointer hover:text-gray-300" />
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem className="text-secondary hover:text-beige">
                      {user.isAdmin ? (
                        <Link
                          href="/"
                          className="text-secondary hover:text-beige"
                        >
                          Mis productos
                        </Link>
                      ) : (
                        <Link
                          href="/"
                          className="text-secondary hover:text-beige"
                        >
                          Mis compras
                        </Link>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-secondary hover:text-black">
                      <Link
                        href="/"
                        className="text-secondary hover:text-beige"
                      >
                        Otra{" "}
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              {!user.isLogged && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-beige hover:text-gray-300">
                    <FaUser className="text-white text-2xl cursor-pointer hover:text-gray-300" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem className="text-secondary hover:text-beige">
                      <Link
                        href="/"
                        className="text-secondary hover:text-beige"
                      >
                        Ingresar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-secondary hover:text-black">
                      <Link
                        href="/"
                        className="text-secondary hover:text-beige"
                      >
                        Crear cuenta
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <FaShoppingCart className="text-white text-2xl cursor-pointer hover:text-gray-300" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
