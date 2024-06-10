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
    VisibilityState,
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
import { getProductList } from "@/lib/utils";
import { Product } from "@/types/products/products.types";



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
    products: (OrderDetailType & { product: Product })[];
};


export default function TypePage() {
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [orderDetail, setOrderDetail] = useState<OrderDetailType[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [orderWithProducts, setOrderWithProducts] = useState<OrderWithProductsType[]>([]);

    const [loading, setLoading] = useState(true);

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) { // Aqui se puede cambiar el tamaño que se considera como mobile
                setColumnVisibility({
                    id: true,
                    totalPrice: false,
                    shippingAddress: false,
                });
            } else {
                setColumnVisibility({
                    id: true,
                    totalPrice: true,
                    shippingAddress: true,
                });
            }
        };

        window.addEventListener('resize', handleResize);                            // Escucha el evento resize

        handleResize();                                                             // Configuración inicial

        return () => window.removeEventListener('resize', handleResize);            // Limpieza del efecto
    }, []);

    const table = useReactTable<OrderWithProductsType>({
        data: orderWithProducts,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnVisibility,
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
        //----- arriba antes, intento despues

        const fetchOrders = async () => {
            try {
                const Orders = await fetch(`/api/orders/order`, {
                    method: 'GET',
                });
                console.log("responseOrders esta arrojando:")
                console.log(Orders);
                //setOrders(Orders)

            } catch (error) {
                console.error('Error getting orders:', error);
            }
        }
        fetchOrders();

        //setOrders(ordersArray)



        setOrderDetail(orderDetailsArray)

        const fetchProducts = async () => {
            try {
                const productList = await getProductList();
                setProducts(productList);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
            setLoading(false);
        };
        fetchProducts();

    }, []);

    // --------------------------------------------------------------------------------------------------------------------

    const combineOrderData = (
        orders: OrderType[],
        orderDetails: OrderDetailType[],
        productList: Product[],
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


    return (
        <>
            <div className="grid mb-10 mt-40 mx-5 sm:mx-10 lg:mx-20">
                <div className="mb-10 mt-5">
                    <Title title="Mis Pedidos" color="beige" />
                </div>
                {loading && <Loader />}

                <div className="flex justify-center">
                    <div className="rounded-md border m-5 w-full max-w-6xl overflow-x-auto">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id} className="text-left sm:text-center">
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id} className="text-left sm:text-center">
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
                                            className="text-left sm:text-center"
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id} className="text-left sm:text-center px-2 sm:px-4 py-2 sm:py-3">
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