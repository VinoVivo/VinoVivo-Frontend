"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaUser, FaShoppingCart, FaBars } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useSession, signIn } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
import federatedLogout from "@/app/api/auth/federated-logout/utils";
import { DecodedToken } from "@/types/user/user.type";
import { useMediaQuery } from "@react-hook/media-query";

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(pathname);
  const { openCart, cartItems, clearCart } = useCart();

  // Contador para el número de productos en el carrito
  const [cartItemCount, setCartItemCount] = useState<number>(0);

  // Actualizar el contador cuando cambie el carrito
  useEffect(() => {
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartItemCount(itemCount);
  }, [cartItems]);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    isMenuOpen && setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function getInitials(name: string) {
    if (name != null && name != '' && name != undefined) {
      let nameArray = name.split(' ');
      let initials = '';
      nameArray.forEach((data, index) => {
        initials += data.slice(0, 1);
      })
      return initials.toUpperCase();
    }
    return '';
  }

  const { data: session } = useSession();
  let decodedToken: DecodedToken | null = null;
  if (session?.accessToken) {
    decodedToken = jwtDecode<DecodedToken>(session.accessToken);
  }
  const userSess = session?.user;
  const user = {
    user: userSess,
    initials: userSess?.name ? getInitials(userSess.name) : '',
    isLogged: !!userSess,
    isAdmin: decodedToken?.realm_access?.roles.includes('admin')
  }
  const handleLogout = async () => {
    clearCart();
    await federatedLogout();
  };

  // Obtener la cantidad de productos del carrito desde localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    const cartItems = storedCart ? JSON.parse(storedCart) : [];
    const itemCount = cartItems.reduce((total: any, item: { quantity: any; }) => total + item.quantity, 0);
    setCartItemCount(itemCount);
  }, []);

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <header className="bg-violeta fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center h-full py-4 px-4 md:px-28">
        <div className="flex items-center">
          <Link href="/" passHref>
            {isMobile ? (
              <img
                src="/logo-mobile.png"
                alt="logo"
                className="h-12 md:h-24"
              />
            ) : (
              <img
                src="/logo-vinovivo.png"
                alt="logo"
                className="h-12 md:h-24"
              />
            )}
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/">
            <span
              className={`relative
                            text-primary-foreground hover:text-gray-300
                            before:content-[''] before:absolute before:w-full before:scale-x-0 
                            before:h-[2px] before:bottom-0 before:left-0 before:bg-beige 
                            before:origin-bottom-right before:transition-transform before:duration-300 
                            hover:before:scale-x-100 hover:before:origin-bottom-left
                            ${activeLink === "/"
                  ? "before:scale-x-100 before:origin-bottom-left"
                  : ""
                }`}
              onClick={() => handleLinkClick("/")}
            >
              INICIO
            </span>
          </Link>
          <div className="m-1 hs-dropdown [--trigger:hover] relative inline-flex">
            <button
              id="hs-dropdown-hover-event"
              type="button"
              className={`hover:text-gray-300
                            before:content-[''] before:absolute before:w-full before:scale-x-0 
                            before:h-[2px] before:bottom-0 before:left-0 before:bg-beige 
                            before:origin-bottom-right before:transition-transform before:duration-300 
                            hover:before:scale-x-100 hover:before:origin-bottom-left hs-dropdown-toggle inline-flex items-center text-md text-primary-foreground font-lg disabled:opacity-50 disabled:pointer-events-none
                            ${activeLink?.includes('/type/') || activeLink === '/products' ? 'before:scale-x-100 before:origin-bottom-left' : ''}`}

            >
              PRODUCTOS
            </button>
            <div
              className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-sm p-2 mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
              aria-labelledby="hs-dropdown-hover-event"
            >
              <Link
                href="/type/3"
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm hover:bg-gray-100 text-slate-700 hover:text-violeta focus:outline-none focus:bg-gray-100"
              >
                <span onClick={() => handleLinkClick('/type/3')}>Tinto</span>
              </Link>
              <Link
                href="/type/2"
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm hover:bg-gray-100 text-slate-700 hover:text-violeta focus:outline-none focus:bg-gray-100"
              >
                <span onClick={() => handleLinkClick('/type/2')}>Blanco</span>
              </Link>
              <Link
                href="/type/1"
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm hover:bg-gray-100 text-slate-700 hover:text-violeta focus:outline-none focus:bg-gray-100"
              >
                <span onClick={() => handleLinkClick('/type/1')}>Rosado</span>
              </Link>
              <Link
                href="/type/4"
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm hover:bg-gray-100 text-slate-700 hover:text-violeta focus:outline-none focus:bg-gray-100"
              >
                <span onClick={() => handleLinkClick('/type/4')}>Espumantes</span>
              </Link>
              <Link
                href="/products"
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-sm text-sm hover:bg-gray-100 text-violeta hover:text-violeta focus:outline-none focus:bg-gray-100"
              >
                <span onClick={() => handleLinkClick('/products')}>Ver todos</span>
              </Link>
            </div>
          </div>
          <Link href="/concept">
            <span
              className={`relative
                            text-primary-foreground hover:text-gray-300
                            before:content-[''] before:absolute before:w-full before:scale-x-0 
                            before:h-[2px] before:bottom-0 before:left-0 before:bg-beige 
                            before:origin-bottom-right before:transition-transform before:duration-300 
                            hover:before:scale-x-100 hover:before:origin-bottom-left
                            ${activeLink === "/concept"
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
                            ${activeLink === "/contact"
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
            <>
              <Button className="bg-transparent" onClick={openCart}>
                <FaShoppingCart className="text-white text-2xl cursor-pointer hover:text-gray-300" />
                {cartItemCount > 0 && (
                  <span className="inline-flex items-center justify-center w-1 h-1 p-2.5 ml-1 text-sm font-semibold text-violeta bg-white rounded-full dark:bg-blue-900 dark:text-blue-300">{cartItemCount}</span>
                )}
              </Button>
              {/* <Button className="bg-transparent" onClick={openCart}>
                <FaShoppingCart className="text-white text-2xl cursor-pointer hover:text-gray-300" />
                {cartItemCount > 0 && (
                  <p className="text-md text-white ml-1.5 font-semibold">{cartItemCount}</p>
                )}
              </Button> */}

              {/* AVATAR VIEJO */}
              {/* <DropdownMenu>
                <DropdownMenuTrigger className="text-beige hover:text-gray-300">
                  <div className="text-2xl inline-flex items-center justify-center w-6 h-6 p-6 font-normal text-violeta rounded-full bg-white">{user.initials}</div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="text-secondary hover:text-black">
                    <Link href="/user-settings" className="text-secondary hover:text-beige">
                      Mi Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-secondary hover:text-black">
                    <Link href="/orders" className="text-secondary hover:text-beige">
                      Mis Compras
                    </Link>
                  </DropdownMenuItem>
                  {user.isAdmin && (
                    <>
                      <DropdownMenuItem className="text-secondary hover:text-beige">
                        <Link href="/admin/productos" className="text-secondary hover:text-beige">
                          Productos
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-secondary hover:text-beige">
                        <Link href="/" className="text-secondary hover:text-beige">
                          Reportes
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  <DropdownMenuItem className="text-secondary hover:text-beige">
                    <Link href="/" className="text-secondary hover:text-beige" onClick={() => handleLogout()}>
                      Cerrar Sesión
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}

              {/* AVATAR NUEVO */}
              <div className="m-1 hs-dropdown relative inline-flex group">
  <button
    id="hs-dropdown-hover-event"
    type="button"
    className="
      before:content-[''] before:absolute before:w-full before:scale-x-0 
      before:h-[2px] before:bottom-0 before:left-0 
      before:origin-bottom-right before:transition-transform before:duration-300 
      hover:before:scale-x-100 hover:before:origin-bottom-left hs-dropdown-toggle 
      inline-flex items-center 
      text-md
      font-lg disabled:opacity-50 disabled:pointer-events-none
      text-2xl justify-center w-6 h-6 p-6 font-normal text-violeta rounded-full bg-white
    "
  >
    {user.initials}
  </button>
  <div
    className="
      transition-[opacity,visibility] duration-300 opacity-0 invisible 
          group-hover:opacity-100 group-hover:visible 
          absolute top-full mt-2 min-w-36 
          bg-white shadow-md rounded-sm p-4 z-10
    "
    aria-labelledby="hs-dropdown-hover-event"
  >
    <div className="text-secondary hover:text-black p-1">
      <Link href="/user-settings" className="text-secondary hover:text-beige text-sm">
        Mi Perfil
      </Link>
    </div>
    <div className="text-secondary hover:text-black p-1">
      <Link href="/orders" className="text-secondary hover:text-beige text-sm">
        Mis Compras
      </Link>
    </div>
    {user.isAdmin && (
      <>
        <div className="text-secondary hover:text-beige p-1">
          <Link href="/admin/productos" className="text-secondary hover:text-beige text-sm">
            Productos
          </Link>
        </div>
        <div className="text-secondary hover:text-beige p-1">
          <Link href="/admin/reports" className="text-secondary hover:text-beige text-sm">
            Reportes
          </Link>
        </div>
      </>
    )}
    <div className="text-secondary hover:text-beige border-t p-1">
      <Link href="/" className="text-violeta font-medium hover:text-beige text-sm" onClick={() => handleLogout()}>
        Cerrar Sesión
      </Link>
    </div>
  </div>
</div>

            </>
          )}
          {!user.isLogged && (
            <FaUser onClick={() => signIn("keycloak")} className="text-white text-2xl cursor-pointer hover:text-gray-300" />
          )}

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
            <Link href="/">
              <span
                className={`relative
                              text-primary-foreground hover:text-gray-300
                              before:content-[''] before:absolute before:w-full before:scale-x-0 
                              before:h-[2px] before:bottom-0 before:left-0 before:bg-beige 
                              before:origin-bottom-right before:transition-transform before:duration-300 
                              hover:before:scale-x-100 hover:before:origin-bottom-left
                              ${activeLink === "/"
                    ? "before:scale-x-100 before:origin-bottom-left"
                    : ""
                  }`}
                onClick={() => handleLinkClick("/")}
              >
                INICIO
              </span>
            </Link>
            <Link href="/products">
              <div className="text-beige hover:text-gray-300" onClick={() => handleLinkClick("/products")}>PRODUCTOS</div>
            </Link>
            <Link href="/concept">
              <div className="text-beige hover:text-gray-300" onClick={() => handleLinkClick("/concept")}>CONCEPTO</div>
            </Link>
            <Link href="/contact">
              <div className="text-beige hover:text-gray-300" onClick={() => handleLinkClick("/contact")}>CONTACTO</div>
            </Link>

            <div className="flex space-x-4 items-center">
              {user.isLogged && (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-beige hover:text-gray-300">
                      <div className="text-primary-foreground text-xl">{user.initials}</div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem className="text-secondary hover:text-black">
                        <Link href="/user-settings" className="text-secondary hover:text-beige">
                          <div onClick={() => handleLinkClick("/user-settings")}>Mi Perfil</div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-secondary hover:text-black">
                        <Link href="/orders" className="text-secondary hover:text-beige">
                          <div onClick={() => handleLinkClick("/orders")}>Mis Compras</div>
                        </Link>
                      </DropdownMenuItem>

                      {user.isAdmin && (
                        <>
                          <DropdownMenuItem className="text-secondary hover:text-beige">
                            <Link href="/admin/productos" className="text-secondary hover:text-beige">
                              <div onClick={() => handleLinkClick("/admin/productos")}>Productos</div>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-secondary hover:text-beige">
                            <Link href="/admin/reports" className="text-secondary hover:text-beige">
                              <div onClick={() => handleLinkClick("/admin/reports")}>Reportes</div>
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}

                      <DropdownMenuItem className="text-secondary hover:text-beige">
                        <Link href="/" className="text-secondary hover:text-beige" onClick={() => handleLogout()}>
                          Cerrar Sesión
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button className="bg-transparent" onClick={openCart}>
                    <FaShoppingCart className="text-white text-2xl cursor-pointer hover:text-gray-300" />
                    {cartItemCount > 0 && (
                      <span className="inline-flex items-center justify-center w-1 h-1 p-2.5 ml-1 text-sm font-semibold text-violeta bg-white rounded-full dark:bg-blue-900 dark:text-blue-300">{cartItemCount}</span>
                    )}
                  </Button>

                  {/* <Button className="bg-transparent" onClick={openCart}>
                <FaShoppingCart className="text-white text-2xl cursor-pointer hover:text-gray-300" />
                {cartItemCount > 0 && (
                  <p className="text-md text-white ml-1.5 font-semibold">{cartItemCount}</p>
                )}
              </Button> */}
                </>
              )}
              {!user.isLogged && (
                <FaUser onClick={() => signIn("keycloak")} className="text-white text-2xl cursor-pointer hover:text-gray-300" />
              )}

            </div>
          </div>
        </div>      
      )}
    </header>
  );
};

export default Header;
