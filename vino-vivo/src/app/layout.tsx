import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";
import ContextProvider from "@/context/page";
import PrelineScript from "@/components/PrelineScript";
import { CartProvider } from "@/context/CartContext";
import DrawerCart from "@/components/shopping/shoppingCart/DrawerCart";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vino Vivo",
  description: "Vino vivo es un establecimiento donde puedes disfrutar de un buen vino acompañado de una cata personalizada y una experiencia inolvidable, donde ademàs podràs comprar el vino que màs te guste para disfrutarlo en casa.",
  keywords: "vino, catas, ecomerce, tinto, blanco, rosado, espumoso"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContextProvider>
      <CartProvider>
        <html lang="es">
        <meta
            name="description"
            content="En vino vivo podrás encontrar además de una gran variedad de exquisitos vinos, la posibilidad de contactarnos para visitar el establecimiento físico y disfrutar de las experiencias que ofrecemos, como cata personalizada, entre otras."
          >
          </meta>
        <body className={inter.className}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <DrawerCart/>
            <Footer />
          </div>
        </body>
        <PrelineScript />
      </html>
      </CartProvider>      
    </ContextProvider>
  );
}

