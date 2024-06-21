"use client";
import { useEffect, useState } from "react";
import Loader from "@/components/loader/page";
import { Title } from "@/components/Title/Title";
import { OrderDetailType, OrderType } from "@/types/orders/orders.types";
import * as React from "react";
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
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { columns } from "@/components/orders/Columns";
import { getProductList } from "@/lib/utils";
import { Product } from "@/types/products/products.types";
import PaginationComponent from "@/components/pagination/PaginationComponent";

//Type para la combinacion de "ordenes" con "orderDetail" con la info de "products"
type OrderWithProductsType = OrderType & {
    products: (OrderDetailType & { product: Product })[];
};

export default function TypePage() {
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [orderDetail, setOrderDetail] = useState<OrderDetailType[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [orderWithProducts, setOrderWithProducts] = useState<
        OrderWithProductsType[]
    >([]);
    const [loading, setLoading] = useState(true);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});

    //Lo siguiente es un renderizado para ocultar columnas en formato mobile
    useEffect(() => {
        const handleResize = () => {
        if (window.innerWidth < 768) {
            // Aqui se puede cambiar el tamaño que se considera como mobile
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
        window.addEventListener("resize", handleResize); // Escucha el evento resize
        handleResize(); // Configuración inicial
        return () => window.removeEventListener("resize", handleResize); // Limpieza del efecto
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
        try {
            const response = await fetch(`/api/orders/order`, {
            method: "GET",
            });
            if (!response.ok) {
            throw new Error("Error al obtener las órdenes");
            }
            const orders = await response.json(); // Aquí transformas la respuesta a JSON
            //console.log("ordenes está arrojando:");
            //console.log(orders);
            setOrders(orders);
        } catch (error) {
            console.error("Error getting orders:", error);
        }
        };
        fetchOrders();

        const fetchOrderDetails = async () => {
        try {
            const response = await fetch(`/api/orders/orderDetail`, {
            method: "GET",
            });
            if (!response.ok) {
            throw new Error("Error al obtener detalles de las órdenes");
            }
            const orderDetails = await response.json(); // Aquí transformas la respuesta a JSON
            //console.log("Detalle está arrojando:");
            //console.log(orderDetails);
            setOrderDetail(orderDetails);
        } catch (error) {
            console.error("Error getting orders:", error);
        }
        };
        fetchOrderDetails();

        const fetchProducts = async () => {
        try {
            const productList = await getProductList();
            setProducts(productList);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
        };
        fetchProducts();
    }, []);

    // --------------------------------------------------------------------------------------------------------------------
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

    const combineOrderData = (
        orders: OrderType[],
        orderDetails: OrderDetailType[],
        productList: Product[],
        setOrderWithProducts: React.Dispatch<
        React.SetStateAction<OrderWithProductsType[]>
        >
    ) => {
        const combinedData = orders.map((order) => {
        const details = orderDetails
            .filter((detail) => detail.idOrder === order.id)
            .map((detail) => {
            const product = productList.find(
                (product) => product.id === detail.idProduct
            );
            return { ...detail, product: product! }; // El ! asume que el producto siempre existe
            });
        return { ...order, products: details };
        });

        setOrderWithProducts(combinedData);
        //console.log("la data combinada es:");
        //console.log(combinedData);
    };

    useEffect(() => {
        if (orders.length && orderDetail.length && products.length) {
        combineOrderData(orders, orderDetail, products, setOrderWithProducts);
        }
        setLoading(false);
    }, [orders, orderDetail, products]);

    return (
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
                    <TableRow
                    key={headerGroup.id}
                    className="text-left sm:text-center"
                    >
                    {headerGroup.headers.map((header) => {
                        return (
                        <TableHead
                            key={header.id}
                            className="text-left sm:text-center"
                        >
                            {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                                )}
                        </TableHead>
                        );
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
                        <TableCell
                            key={cell.id}
                            className="text-left sm:text-center px-2 sm:px-4 py-2 sm:py-3"
                        >
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

        <PaginationComponent
                currentPage={currentPage}
                totalPages={Math.ceil(orderWithProducts.length / pageSize)}
                setCurrentPage={setCurrentPage}
            />

        </div>
    );
}
