import { IwineDetail } from "@/types/detail/detail.types";
import { OrderDetailType, OrderType } from "@/types/orders/orders.types";
import Image from 'next/image';

import {
    ColumnDef,
} from "@tanstack/react-table"
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

type OrderWithProductsType = OrderType & {
    products: (OrderDetailType & { product: IwineDetail })[];
};


// -------------------- Estructura final requerida  de OrderWithProductsType --------------------

// {
//     id: number,
//     idCustomer: string,
//     totalPrice: number,
//     shippingAddress: string,
//     orderEmail: string,
//     products: [{
//       id: number,
//       idOrder: number,
//       idProduct: number,
//       price: number,
//       quantity: number,
//       product: {
//         id: number,
//         name: string,
//         description: string,
//         image: string,
//         year: number,
//         price: number,
//         stock: number,
//         nameWinery: string,
//         nameVariety: string,
//         nameType: string
//       }
//     }, {},...{}]
//   }
// ------------------------------------------------------------------------------------------------ 


export const columns: ColumnDef<OrderWithProductsType>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    IdPedido
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const firstProduct = row.original.products[0]?.product;
            return (
                <div className="flex justify-center">
                    <div className="lowercase flex items-center align-middle m-4">{row.getValue("id")}</div>
                    <>
                    {firstProduct && (
                        <Image
                            src={firstProduct.image}
                            alt={firstProduct.name}
                            width={60}
                            height={100}
                            className="border rounded-md"
                            style={{ objectFit: "cover" }}
                        />
                    )}
                    </>
                </div>
            );
        },
    },
    {
        accessorKey: "totalPrice",
        header: () => <div className="text-right">Valor</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("totalPrice"))

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "shippingAddress",
        header: "shippingAddress",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("shippingAddress")}</div>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <div className="flex flex-col items-center" >
                <Button className='bg-violeta hover:bg-primary w-32 m-1'>Ver Pedido</Button>
                <Button className='bg-violeta hover:bg-primary w-32 m-1'>Volver a Comprar</Button>
            </div>
        ),
    }
]