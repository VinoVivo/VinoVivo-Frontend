"use client";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <button
      onClick={() => signIn("keycloak")}
      className="hover:bg-pink-800 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white bg-pink-400"
    >
      Iniciar sesion
    </button>
  );
}
