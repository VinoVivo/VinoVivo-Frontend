
import {  CardContent} from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { FaCartPlus } from "react-icons/fa";
import { IwineDetail } from "@/types/detail/detail.types";
import BackButton from "@/components/ui/BackButton";


interface CardRigthSideProps {
    wine: IwineDetail;
}
export default function CardRigthSide({wine}: Readonly<CardRigthSideProps>) {
    
    return(        
        <CardContent className="flex flex-col">
            <div className="flex justify-between mb-4">
                <h1 className="text-xl font-bold mb-1">{wine.name}</h1>
                {/* <span className="ml-2">Icon</span> */}
            </div>            
            <div className="grid grid-cols-[30%_70%] mb-4">
                <div className="text-left font-bold">
                <p className="mb-1">Tipo de vino: </p>                
                <p className="mb-1">Año: </p>
                <p className="mb-1">Bodega: </p>
                <p className="mb-1">Variedad de uva: </p>
                <p className="mb-1">Stock disponible: </p>
                <p className="mb-1">Precio: </p>
                <p className="mb-1">Descripción: </p>
                </div>
                <div className="text-left">
                    <p className="mb-1">{wine.type}</p>                    
                    <p className="mb-1">{wine.year}</p>
                    <p className="mb-1">{wine.winery}</p>
                    <p className="mb-1">{wine.variety}</p>
                    <p className="mb-1">{wine.stock}</p>
                    <p className="mb-1 font-bold">{wine.price}</p>
                    <p className="mb-1 text-justify">{wine.description}</p>
                </div>                
            </div>
            <div className="flex flex-row justify-between mt-4">
                <Button className="bg-violeta hover:bg-fuchsia-950">
                    <Link href={"/"}>
                        <div className="flex items-center">
                            <span>Agregar</span>
                            <span className="ml-2"><FaCartPlus /></span>
                        </div>
                    </Link>
                </Button>
                <BackButton/>
            </div>
        </CardContent>
    )
}