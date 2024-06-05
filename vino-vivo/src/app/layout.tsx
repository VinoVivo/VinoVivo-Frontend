import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";
import ContextProvider from "@/context/page";
import PrelineScript from "@/components/PrelineScript";
import { CartProvider } from "@/context/CartContext";

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
        <body className={inter.className}>
          <Header />
          {children}
          <Footer />
        </body>
        <PrelineScript />
      </html>
      </CartProvider>
      
    </ContextProvider>
  );
}

