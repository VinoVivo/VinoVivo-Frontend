// // import { GetDataUser } from "@/app/api/users/getDataUser";
// // import { UpdateUrl } from "@/app/api/users/updateUser";

// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { TableAddress } from "./TableAddres";

// export const AddressExist = async () => {
//   const data = await getServerSession(authOptions);

//   if (data?.accessToken) {
//     // const response = await GetDataUser(data.accessToken);
//     // const user = await response.json();
//     // if (!response.ok) {
//     //   throw new Error("Error al obtener el perfil de usuario");
//     // }
//     if (user.address) {
//       return (
//         <main className="mt-40 mx-auto">
//           <TableAddress {...user} />
//           <Link className="flex justify-center" href="/checkout/buy/payment">
//             <button className=" mt-4 px-3 py-2 bg-violeta font-medium text-white text-sm rounded-md">
//               Siguiente
//             </button>
//           </Link>
//         </main>
//       );
//     } else {
//       const url = UpdateUrl(`${process.env.NEXTAUTH_URL}/`);
//       return (
//         <main className="mt-40 mx-auto">
//           <Link href={url || "/products"}>Agregar direccion</Link>
//         </main>
//       );
//     }
//   }
//   return <div>Error al obtener el perfil de usuario</div>;
// };
