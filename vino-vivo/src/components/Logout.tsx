"use client";
import federatedLogout from "@/app/api/auth/federated-logout/utils";

export default function Logout() {
  return (
    <button
      onClick={() => federatedLogout()}
      className="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white"
    >
      Signout of keycloak
    </button>
  );
}
