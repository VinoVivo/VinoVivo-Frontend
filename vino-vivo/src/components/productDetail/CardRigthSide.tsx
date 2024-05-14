import {
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { IwineDetail } from "./CardDetail";
import { useRouter } from "next/router";

interface CardRigthSideProps {
    wine: Omit<IwineDetail, 'image'>;
}

export default function CardRigthSide({wine}: Readonly<CardRigthSideProps>) {
    
    const router = useRouter();
    const productId = router.query.id;
    console.log({productId});

    return(
        <CardContent className="flex flex-col w-1/2 ml-6">
                    <h1 className="text-xl font-bold mb-1">{wine.title}</h1>
                    <h2 className="text-lg mb-1"><span className="font-bold">Tipo: </span>{wine.type}</h2>
                    <p className="text-sm mb-1">
                    <span className="font-bold">Descripción: </span> {wine.description}</p>
                    <p className="text-sm mb-1"> <span className="font-bold">Año: </span>{wine.year}</p>
                    <h2 className="text-lg mb-1"> <span className="font-bold">Bodega: </span>{wine.winery}</h2>
                    <p className="text-sm"><span className="font-bold">Variedad: </span>{wine.variety}</p>
                    <h3 className="text-lg font-bold mb-1"><span className="font-bold">Precio: </span>{wine.price}</h3>
                    <p className="text-sm"><span className="font-bold">Stock: </span>{wine.stock}</p>

                    <div className="flex flex-row justify-evenly mt-4">
                        <Button  className="bg-violeta hover:bg-fuchsia-950"> <Link href={"/"}>Comprar</Link></Button>
                        <Button className="bg-violeta hover:bg-fuchsia-950"><Link href={"/"}>Agregar al carrito</Link> </Button>
                    </div>
                </CardContent>
    )
}