"use client";
import Link from "next/link";
import { TableAddress } from "./TableAddres";
import { userData } from "@/types/user/userprofile.types";
import { useEffect, useState } from "react";

export const AddressExist = () => {
  const url = `https://vinovivo-production.up.railway.app/realms/vino-vivo/account/`; //UpdateUrl(`${process.env.NEXTAUTH_URL}/`);
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

  const body = user?.address ? (
    <main className="mt-40 mx-auto">
      <TableAddress {...user} />
      <Link
        href={url || "/products"}
        className="border-solid border-violeta bg-violeta border-2 block w-full mt-4 rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:text-violeta hover:bg-violeta-foreground"
      >
        Modificar direccion
      </Link>
      <Link className="flex justify-center" href="/checkout/buy/payment">
        <button className="border-solid border-violeta bg-violeta border-2 block w-full mt-4 rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:text-violeta hover:bg-violeta-foreground">
          Seguir con la compra
        </button>
      </Link>
    </main>
  ) : (
    <main className="mt-40 mx-auto">
      <Link
        href={url || "/products"}
        className="border-solid border-violeta bg-violeta border-2 block w-full mt-4 rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:text-violeta hover:bg-violeta-foreground"
      >
        Agregar direccion
      </Link>
    </main>
  );

  return body;
};
