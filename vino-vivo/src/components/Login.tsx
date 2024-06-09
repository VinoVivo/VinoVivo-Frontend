"use client";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <button
      onClick={() => signIn("keycloak")}
      className="hover:bg-primary px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white bg-violeta"
    >
      Iniciar sesion
    </button>
  );
}
