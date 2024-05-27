import {  CardContent} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa";
import { IwineDetail } from "./CardDetail";


interface CardRigthSideProps {
    wine: IwineDetail;
}
export default function CardRigthSide({wine}: Readonly<CardRigthSideProps>) {
    
    return(
        <CardContent className="flex flex-col  ml-6 justify-between">
            <h1 className="text-xl font-bold mb-1">{wine.name}</h1>
            <p className="text-lg mb-1"><span className="font-bold">Tipo: </span>{wine.type}</p>
            <p className="text-sm mb-1 text-justify"><span className="font-bold ">Descripción: </span> {wine.description}</p>
            <p className="text-sm mb-1"> <span className="font-bold">Año: </span>{wine.year}</p>
            <p className="text-sm mb-1"> <span className="font-bold">Bodega: </span>{wine.winery}</p>
            <p className="text-sm"><span className="font-bold">Variedad: </span>{wine.variety}</p>
            <h3 className="text-lg font-bold mb-1">{wine.price}</h3>
            <p className="text-sm"><span className="font-bold">Stock: </span>{wine.stock}</p>
            <div className="flex flex-row justify-between mt-4">
                        <Button className="bg-violeta hover:bg-fuchsia-950">
                            <Link href={"/"}>
                                <div className="flex items-center"> 
                                    <span>Agregar</span> 
                                    <span className="ml-2"><FaCartPlus /></span> 
                                </div>
                            </Link>
                        </Button>
                        <Link className={  buttonVariants({ variant: "outline", size:"icon" }) } href={'./'}><IoIosArrowBack className="h-4 w-4" /></Link>
            </div>
        </CardContent>
    )
}