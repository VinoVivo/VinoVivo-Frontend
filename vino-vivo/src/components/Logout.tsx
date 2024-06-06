"use client";
import federatedLogout from "@/app/api/auth/federated-logout/utils";

export default function Logout() {
  return (
    <button
      onClick={() => federatedLogout()}
      className="hover:bg-primary px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white bg-violeta"
    >
      Cerrar sesion
    </button>
  );
}
