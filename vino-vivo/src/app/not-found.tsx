import { Title } from "@/components/Title/Title";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <main className="mt-40 mx-auto flex flex-col justify-center">
      <div className="w-3/5 mx-auto my-10">
        <Title title="SECCIÓN EN MANTENIMIENTO" color="beige" />
      </div>

      <div className="w-full flex flex-col gap-2 items-center mx-auto mt-5">
        <Image
          src="/isologoError-Dark.png"
          alt="isologo"
          className="w-48 h-48 object-cover"
          width={500}
          height={500}
        />

        <div className="mt-10">
          <Link
            href="/"
            className="bg-violetaDos block px-3.5 py-2.5 text-center text-sm font-semibold text-accent border border-solid hover:drop-shadow-lg hover:bg-violetaDos-foreground"
          >
            VOLVER AL INICIO
          </Link>
          <Link
            href="/products"
            className="bg-gris block px-3.5 py-2.5 text-center text-sm font-semibold text-accent border border-solid hover:drop-shadow-lg hover:bg-gris-foreground"
          >
            VER PRODUCTOS
          </Link>
        </div>
      </div>
    </main>
  );
};
export default NotFound;
