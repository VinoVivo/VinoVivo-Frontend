"use client";
import { useEffect, useState } from "react";
import Loader from '@/components/loader/page';
import { Title } from "@/components/Title/Title";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { IwineDetail, WineType } from "@/types/detail/detail.types";
import { OrderDetailType, OrderType } from "@/types/orders/orders.types";
import * as React from "react"
import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { columns } from "@/components/orders/Columns";



// ++++++++++++++++++++++ Data de Prueba +++++++++++++++++++++++++++

const orderDetailsArray = [
    {
        "id": 61,
        "idOrder": 42,
        "idProduct": 6,
        "price": 6000.0,
        "quantity": 1
    },
    {
        "id": 62,
        "idOrder": 42,
        "idProduct": 6,
        "price": 6000.0,
        "quantity": 2
    },
    {
        "id": 63,
        "idOrder": 43,
        "idProduct": 7,
        "price": 30000.0,
        "quantity": 1
    },
    {
        "id": 64,
        "idOrder": 43,
        "idProduct": 8,
        "price": 60000.0,
        "quantity": 2
    },
    {
        "id": 71,
        "idOrder": 55,
        "idProduct": 1,
        "price": 9000.0,
        "quantity": 1
    },
    {
        "id": 72,
        "idOrder": 55,
        "idProduct": 2,
        "price": 10500.0,
        "quantity": 2
    }
]

const productListArray = [
    {
        "id": 1,
        "name": "Salentein Reserva Malbec",
        "description": "De color rojo violaceo profundo de gran intensidad. En la nariz se percibe toda la tipicidad que presenta este varietal en el Valle de Uco, donde se destacan las bayas negras maduras, arándonos y grosellas.",
        "image": "https://imagenes-proyecto-vino.s3.amazonaws.com/Vino_Tinto/Reserva_Cabernet_Franc+Estancia_Mendoza.jpeg",
        "year": 2022,
        "price": 9000.0,
        "stock": 7,
        "nameWinery": "Salentein",
        "nameVariety": "Malbec",
        "nameType": "Tinto"
    },
    {
        "id": 2,
        "name": "Trumpeter Reserve Pinot Noir",
        "description": "Intenso color rubí brillante. La nariz está matizada con un vaho floral (violeta) y de fruta fresca (frambuesas). En la boca, estos aromas se vuelven finamente complejos, con acentos ahumados y marcada jugosidad.",
        "image": "https://imagenes-proyecto-vino.s3.amazonaws.com/Vino_Tinto/Reserva_Cabernet_Sauvignon+Estancia_Mendoza.jpeg",
        "year": 2023,
        "price": 10500.0,
        "stock": 15,
        "nameWinery": "Rutini",
        "nameVariety": "Pinot Noir",
        "nameType": "Tinto"
    },
    {
        "id": 3,
        "name": "Angelica Zapata Chardonnay Alta 2021",
        "description": "Su color es amarillo intenso con reflejos verdosos claros. En nariz se presenta concentrado e intenso, con aromas de frutas cítricas y un toque mineral.",
        "image": "https://imagenes-proyecto-vino.s3.amazonaws.com/Vino_Blanco/Postales_Roble+Chardonnay+Del_Fin_del_Mundo.jpeg",
        "year": 2021,
        "price": 25000.0,
        "stock": 5,
        "nameWinery": "Catena Zapata",
        "nameVariety": "Chardonnay",
        "nameType": "Blanco"
    },
    {
        "id": 4,
        "name": "Trivento Golden Reserve Cabernet Sauvignon 2018",
        "description": "Rojo intenso con tonos granates. Aroma: Fruta roja madura con notas de pimienta negra en perfecto equilibrio con el roble. Paladar: Taninos estructurados y firmes, final jovial y largo",
        "image": "https://imagenes-proyecto-vino.s3.amazonaws.com/Vino_Tinto/Chardonnay_Varietales_J%C3%B3venes+Estancia_Mendoza.jpeg",
        "year": 2018,
        "price": 15000.0,
        "stock": 8,
        "nameWinery": "Trivento",
        "nameVariety": "Cabernet Sauvignon",
        "nameType": "Tinto"
    },
    {
        "id": 5,
        "name": "Finca Perdriel Rosado de Malbec",
        "description": "De color salmón rosado claro con aromas florales y herbales. Es equilibrado, con acidez refrescante, y textura delicada. En boca posee un sabor fresco y placentero de gran equilibrio con la fruta",
        "image": "https://imagenes-proyecto-vino.s3.amazonaws.com/Vino_Rosado/Finca_Perdriel_Rosado_de_Malbec+Norton.jpeg",
        "year": 2023,
        "price": 10000.0,
        "stock": 5,
        "nameWinery": "Norton",
        "nameVariety": "Malbec",
        "nameType": "Rosado"
    },
    {
        "id": 6,
        "name": "Believe in Rosé Malbec Pinot Noir",
        "description": "Se caracteriza por su tenue color piel de cebolla pálido con aromas a flores blancas frutas rojas ácidas, manzanas rojas y notas de azahar. En boca es liviano, con una acidez acentuada que refresca y con un final largo y jugoso.",
        "image": "https://imagenes-proyecto-vino.s3.amazonaws.com/Vino_Rosado/Believe_in_Ros%C3%A9+Malbec_Pinot_Noir+Nieto_Senetiner.jpeg",
        "year": 2022,
        "price": 6000.0,
        "stock": 0,
        "nameWinery": "Nieto Senetiner",
        "nameVariety": "Pinot Noir",
        "nameType": "Rosado"
    },
    {
        "id": 7,
        "name": "Gran Lurton Rosé Blend",
        "description": "De color claro, cáscara de huevo, estilo Provence y con reflejos salmón brillante. En nariz es complejo e intenso: ofrece un aroma fresco y levemente floral, con notas a pera y damasco.",
        "image": "https://imagenes-proyecto-vino.s3.amazonaws.com/Vino_Rosado/Gran_Lurton_Ros%C3%A9+Blend+Piedra_Negra.jpeg",
        "year": 2023,
        "price": 30000.0,
        "stock": 1,
        "nameWinery": "Piedra Negra",
        "nameVariety": "Pinot Noir",
        "nameType": "Rosado"
    },
    {
        "id": 8,
        "name": "Reserva Chardonnay",
        "description": "Color amarillo intenso con destellos verdosos característicos de la variedad. El aroma es frutado con notas cítricas y tropicales. Intensamente delicado con notas que recuerdan a vainilla y coco.",
        "image": "https://imagenes-proyecto-vino.s3.amazonaws.com/Vino_Blanco/Reserva+Chardonnay+Del_Fin_del_Mundo.jpeg",
        "year": 2023,
        "price": 60000.0,
        "stock": 0,
        "nameWinery": "Del Fin del Mundo",
        "nameVariety": "Chardonnay",
        "nameType": "Blanco"
    },
    {
        "id": 9,
        "name": "Fin Single Vineyard Semillón",
        "description": "Color amarillo verdoso con destellos plateados. Expresivo, complejo, frutas tropicales, mineral y ligeras notas cítricas. En boca se presenta untuoso, equilibrado y prolongado final.",
        "image": "https://imagenes-proyecto-vino.s3.amazonaws.com/Vino_Blanco/Fin_Single_Vineyard+Semill%C3%B3n_Pinot+Del_Fin_del_Mundo.jpeg",
        "year": 2022,
        "price": 30000.0,
        "stock": 3,
        "nameWinery": "Del Fin del Mundo",
        "nameVariety": "Chardonnay",
        "nameType": "Blanco"
    },
    {
        "id": 10,
        "name": "Brut Nature Sparkling Domaine",
        "description": "De color amarillo claro con destellos dorados, fino y persistente perlage, en nariz revela intensidad y frescura con notas de durazno blanco y hierbas frescas de campo.",
        "image": "https://imagenes-proyecto-vino.s3.amazonaws.com/Vino_Espumoso/Brut_Nature+Sparkling_Domaine+Alta_Vista.jpeg",
        "year": 2023,
        "price": 30000.0,
        "stock": 4,
        "nameWinery": "Alta Vista",
        "nameVariety": "Chardonnay",
        "nameType": "Espumoso"
    },
    {
        "id": 26,
        "name": "Brut Nature Sparkling Domaine",
        "description": "De color amarillo claro con destellos dorados, fino y persistente perlage, en nariz revela intensidad y frescura con notas de durazno blanco y hierbas frescas de campo.",
        "image": "https://imagenes-proyecto-vino.s3.amazonaws.com/Vino_Espumoso/Brut_Nature+Sparkling_Domaine+Alta_Vista.jpeg",
        "year": 2024,
        "price": 29000.0,
        "stock": 4,
        "nameWinery": "Alta Vista",
        "nameVariety": "Chardonnay",
        "nameType": "Espumoso"
    },
    {
        "id": 27,
        "name": "Fin Single Vineyard Semillon",
        "description": "Color amarillo verdoso con destellos plateados. Expresivo, complejo, frutas tropicales, mineral y ligeras notas cítricas. En boca se presenta untuoso, equilibrado y prolongado final",
        "image": "https://imagenes-proyecto-vino.s3.amazonaws.com/Vino_Blanco/Fin_Single_Vineyard+Semill%C3%B3n_Pinot+Del_Fin_del_Mundo.jpeg",
        "year": 2022,
        "price": 35000.0,
        "stock": 4,
        "nameWinery": "Del Fin del Mundo",
        "nameVariety": "Chardonnay",
        "nameType": "Blanco"
    }
]

const ordersArray: OrderType[] = [
    {
        "id": 42,
        "idCustomer": "11dec824-1959-40b5-ab64-5d436c601614",
        "totalPrice": 18000.0,
        "shippingAddress": "12345678 Main Street, Cityville",
        "orderEmail": "secondexample@example.com"
    },
    {
        "id": 43,
        "idCustomer": "11dec824-1959-40b5-ab64-5d436c601614",
        "totalPrice": 150000.0,
        "shippingAddress": "12345678 Main Street, Cityville",
        "orderEmail": "secondexample@example.com"
    },
    {
        "id": 47,
        "idCustomer": "11dec824-1959-40b5-ab64-5d436c601614",
        "totalPrice": 18000.0,
        "shippingAddress": "12345678 Main Street, Cityville",
        "orderEmail": "secondexample@example.com"
    },
    {
        "id": 48,
        "idCustomer": "11dec824-1959-40b5-ab64-5d436c601614",
        "totalPrice": 150000.0,
        "shippingAddress": "12345678 Main Street, Cityville",
        "orderEmail": "secondexample@example.com"
    },
    {
        "id": 49,
        "idCustomer": "11dec824-1959-40b5-ab64-5d436c601614",
        "totalPrice": 150000.0,
        "shippingAddress": "12345678 Main Street, Cityville",
        "orderEmail": "secondexample@example.com"
    },
    {
        "id": 50,
        "idCustomer": "11dec824-1959-40b5-ab64-5d436c601614",
        "totalPrice": 150000.0,
        "shippingAddress": "12345678 Main Street, Cityville",
        "orderEmail": "secondexample@example.com"
    },
    {
        "id": 51,
        "idCustomer": "11dec824-1959-40b5-ab64-5d436c601614",
        "totalPrice": 150000.0,
        "shippingAddress": "12345678 Main Street, Cityville",
        "orderEmail": "secondexample@example.com"
    },
    {
        "id": 55,
        "idCustomer": "11dec824-1959-40b5-ab64-5d436c601614",
        "totalPrice": 30000.0,
        "shippingAddress": "12345678 Main Street, Cityville",
        "orderEmail": "secondexample@example.com"
    }
]

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++





type OrderWithProductsType = OrderType & {
    products: (OrderDetailType & { product: IwineDetail })[];
};


export default function TypePage() {
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [orderDetail, setOrderDetail] = useState<OrderDetailType[]>([]);
    const [products, setProducts] = useState<IwineDetail[]>([]);
    const [orderWithProducts, setOrderWithProducts] = useState<OrderWithProductsType[]>([]);

    const [loading, setLoading] = useState(true);

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);

    const table = useReactTable<OrderWithProductsType>({
        data: orderWithProducts,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        state: {
            sorting,
            pagination: {
                pageIndex: currentPage - 1,
                pageSize: pageSize,
            },
        },
    });


    // ----------------------------- Esta parte seria el fetch para traer mis ordenes ------------------------------------

    useEffect(() => {

        // const fetchOrders = async () => {
        //     try {
        //         const productList = await getProductsType(id);
        //         setProducts(productList);
        //     } catch (error) {
        //         console.error("Error fetching products:", error);
        //     }
        //     setLoading(false);
        // };
        // fetchOrders();


        setOrders(ordersArray)
        setOrderDetail(orderDetailsArray)
        setProducts(productListArray)

    }, []);

    // --------------------------------------------------------------------------------------------------------------------

    const combineOrderData = (
        orders: OrderType[],
        orderDetails: OrderDetailType[],
        productList: IwineDetail[],
        setOrderWithProducts: React.Dispatch<React.SetStateAction<OrderWithProductsType[]>>
    ) => {
        const combinedData = orders.map(order => {
            const details = orderDetails
                .filter(detail => detail.idOrder === order.id)
                .map(detail => {
                    const product = productList.find(product => product.id === detail.idProduct);
                    return { ...detail, product: product! }; // El ! asume que el producto siempre existe
                });

            return { ...order, products: details };
        });

        // Establece el estado con la nueva data combinada
        setOrderWithProducts(combinedData);
    };

    useEffect(() => {
        if (orders.length && orderDetail.length && products.length) {
            combineOrderData(orders, orderDetail, products, setOrderWithProducts);
        }

        setLoading(false);

    }, [orders, orderDetail, products]);

    useEffect(() => {
        console.log("Estado actualizado:", orderWithProducts);
    }, [orderWithProducts]);

    // ---------------------------------------------------------------------------------------------

    return (
        <>
            <div className="grid mb-10 mt-40 ml-10 mr-10">
                <div className="mb-10 mt-5">
                    <Title title="Mis Pedidos" color="beige" />
                </div>
                {loading && <Loader />}

                
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className="text-center">
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id} className="text-center">
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"} 
                                        className="text-center"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="text-center">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    
                </div>
                <Pagination>
                    <PaginationPrevious
                        onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)}
                    />
                    {Array.from({ length: table.getPageCount() }, (_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                onClick={() => setCurrentPage(i + 1)}
                                isActive={i + 1 === currentPage}
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationNext
                        onClick={() => setCurrentPage(currentPage < table.getPageCount() ? currentPage + 1 : currentPage)}
                    />
                </Pagination>

            </div>
        </>
    );
}