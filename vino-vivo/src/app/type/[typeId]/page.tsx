"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { getProductsType, getTypes } from '@/lib/utils';
import Loader from '@/components/loader/page';
import { usePathname } from "next/navigation";
import { Title } from "@/components/Title/Title";
import Link from "next/link";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { IwineDetail } from "@/types/detail/detail.types";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import DialogeRegister from "@/components/product/register/DialogeRegister";

interface WineType {
  id: number;
  name: string;
}

export default function TypePage() {
  const [products, setProducts] = useState<IwineDetail[]>([]);
  const [wineTypes, setWineType] = useState<WineType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8); // Cambia el tamaño de la página según sea necesario
  const path = usePathname();
  const isAllPath = path.endsWith("/all");
  const id = path.match(/\d+$/)?.[0];
  const {addToCart, openCart} = useCart();
  const { data: session } = useSession();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        if (isAllPath) {
          response = await axios.get(`${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/product/type/all`);
        } else if (id) {
          response = await axios.get(
            `${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/product/type/${id}`
          );
        }

        if (response) {
          const productData = await Promise.all(
            response.data.map(async (product: IwineDetail) => {
              try {
                const varietyResponse = await axios.get(
                  `${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/variety/id/${product.nameVariety}`
                );
                product.nameVariety = varietyResponse.data.name;
              } catch (error) {
                console.error("Error fetching variety:", error);
              }
              return product;
            })
          );
          setProducts(productData);
        }
      } catch (error) {
        console.error("Error al obtener los productos de este tipo:", error);
      }
    };

    fetchProducts();
  }, [id, isAllPath]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_GET_BASE_URL}/ms-commerce/type/all`)
      .then((response) => {
        const productData = response.data;
        setWineType(productData);
      })
      .catch((error) => {
        console.error(
          "Error al obtener el listado de los tipos de vino:",
          error
        );
      });
  }, []);

  function getTypeNameById(id: number): string | undefined {
    if (id === undefined) return "vacio";
    const item = wineTypes.find((item) => item.id === id);
    return item ? item.name : undefined;
  }

  const nameType = isAllPath
    ? "Todos los vinos"
    : "Vino " + getTypeNameById(id ? parseInt(id) : 0);

    // Calcular los productos a mostrar en la página actual
    const startIndex = (currentPage - 1) * pageSize;
    const currentProducts = products.slice(startIndex, startIndex + pageSize);

    const totalPages = Math.ceil(products.length / pageSize);

const handleBuyButtonClick = (product: IwineDetail) => {
    if (!session) {
      setShowAlert(true);
      return;
    }
    const item = {
      id: product.id,
      name: product.name,
      variety: product.nameVariety,
      price: product.price,
      image: product.image,
      quantity: 1,
    };
    addToCart(item);
    openCart();
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <div className="grid  mb-10 mt-40">
        <div className="mb-10 mt-5">
          <Title title={nameType} color="beige" />
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg border border-gray-200 p-6 w-64"
              >
                <Link href={`/detail/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="transform transition-transform duration-300 hover:cursor-pointer"
                  />
                </Link>
                <div className="flex flex-col items-center mt-2">
                  <p className="text-md font-bold text-black h-12">
                    {product.name}
                  </p>
                  <p className="text-sm text-black">{product.nameVariety}</p>
                  <p className="text-lg font-semibold text-black mt-2">
                    ${product.price}
                  </p>
                </div>
                <button onClick={()=>handleBuyButtonClick(product)} className="bg-violeta hover:bg-fuchsia-950 text-white font-bold mt-6 py-1.5 px-4 rounded w-full">
                  COMPRAR
                </button>
              </div>
            ))}
          </div>
        </div>
        <Pagination className="mt-2">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <DialogeRegister
        open={showAlert}
        onOpenChange={handleCloseAlert}
        type="Error"
        message="Debe estar logeado para comprar productos"
      />
    </>
  );
}