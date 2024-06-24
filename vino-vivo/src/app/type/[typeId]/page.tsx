"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Title } from "@/components/Title/Title";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { IwineDetail } from "@/types/detail/detail.types";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import DialogeMessage from "@/components/product/register/DialogeMessage";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types/products/products.types";
import PaginationComponent from "@/components/pagination/PaginationComponent";

interface WineType {
  id: number;
  name: string;
}

export default function TypePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [wineTypes, setWineTypes] = useState<WineType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8); 
  const path = usePathname();
  const isAllPath = path.endsWith("/all");
  const id = RegExp(/\d+$/).exec(path)?.[0];
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
            response.data.map(async (product: Product) => {
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
        setWineTypes(productData);
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

const handleBuyButtonClick = (product: Product) => {
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
              <ProductCard
                key={product.id}
                product={product}
                onBuyClick={() => handleBuyButtonClick(product)}
              />
            ))}
          </div>
        </div>
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <DialogeMessage
        open={showAlert}
        onOpenChange={handleCloseAlert}
        type="ALERTA"
        message="Debe estar logueado para comprar productos"
        textButtonOne="Cerrar"
      />
    </>
  );
}