import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";
import ContextProvider from "@/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vino vivo",
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
    <html lang="es">
      <body className={inter.className}>
        <header>
          <meta
            name="descripción"
            content= "En Vino Vivo, podrás encontrar además de una gran variedad de exquisitos vinos, la posibilidad de contactarnos para visitar el establecimiento físico y disfrutar de las catas que tenemos para ti" 
          >            
          </meta>
          <Header />
        </header>
        {children}
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
    </ContextProvider>
  );
}

