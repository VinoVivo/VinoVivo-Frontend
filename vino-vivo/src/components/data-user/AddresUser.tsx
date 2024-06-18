"use client";
import Link from "next/link";
import { TableAddress } from "./TableAddres";
import { userData } from "@/types/user/userprofile.types";
import { useEffect, useState } from "react";
import { Title } from "../Title/Title";

export const AddressExist = () => {
  const url = `https://vinovivo-production.up.railway.app/realms/vino-vivo/account`;
  console.log(url);

  const [user, setUser] = useState<userData>();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const user = await response.json();
          setUser(user);
        } else {
          throw new Error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <>
      <Title color="beige" title="Datos de envio" />
      {user?.address ? (
        <main>
          <TableAddress {...user} />
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <Link
              href={url || "/products"}
              className="border-solid border-violeta bg-violeta border-2 rounded-md text-center text-white text-sm content-center p-1.5 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:text-violeta hover:bg-violeta-foreground"
            >
              MODIFICAR DIRECCION
            </Link>
            <Link
              href="/checkout/buy/payment"
              className="border-solid border-violeta bg-violeta border-2 rounded-md text-center text-white text-sm content-center p-1.5 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:text-violeta hover:bg-violeta-foreground"
            >
              SEGUIR CON LA COMPRA
            </Link>
          </div>
        </main>
      ) : (
        <div className="my-5 mx-auto w-4/5 text-center">
          <h2 className="font-lg .text-neutral-500">
            Aun no se ha registrado dirección alguna.
          </h2>
          <Link
            href={url || "/products"}
            className="border-solid border-violeta bg-violeta border-2 block w-3/4 rounded-md text-center text-white text-sm content-center p-1.5 my-8 mx-auto shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:text-violeta hover:bg-violeta-foreground"
          >
            AGREGAR DIRECCION
          </Link>
        </div>
      )}
    </>
  );
};
