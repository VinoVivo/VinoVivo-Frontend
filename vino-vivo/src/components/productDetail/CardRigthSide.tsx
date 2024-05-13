import {
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function CardRigthSide() {
    return(
        <CardContent className="flex flex-col w-1/2 ml-6">
                    <h1 className="text-xl font-bold mb-1">Rivero Gonzalez 750 ml</h1>
                    <h2 className="text-lg mb-1"><span className="font-bold">Tipo: </span>Tinto</h2>
                    <p className="text-sm mb-1">
                    <span className="font-bold">Descripción: </span> Extraordinaria mezcla bordalesa. Color rubí intenso, 
                        aromas potente intensidad aromática con notas a frutos 
                        negros y maduros, cuero y especias. Eucalipto, anís y mentol. 
                        Gusto Con buena acidez y una presencia tánica que le da 
                        estructura y redondez. Prolongado retrogusto final.</p>
                    <p className="text-sm mb-1"> <span className="font-bold">Año: </span>2015</p>
                    <p className="text-sm mb-1">
                    <span className="font-bold">Temperatura: </span>La temperatura ideal para almacenar vino a largo plazo suele estar entre 10°C y 15°C (50°F y 59°F).
                        Es importante mantener una temperatura constante para evitar cambios bruscos que puedan afectar la calidad del vino. 
                        Se sirven mejor entre 15°C y 18°C (59°F y 64°F).
                    </p>
                    <h2 className="text-lg mb-1"> <span className="font-bold">Bodega: </span>PARRAS DE LA FUENTE</h2>
                    <h3 className="text-lg font-bold mb-1"><span className="font-bold">Precio: </span>$ 35</h3>
                    {/* <p className="text-sm">{wine.stock ? 'Disponible' : 'Agotado'}</p> */}
                    <p className="text-sm"><span className="font-bold">Stock: </span>Disponible</p>
                    <div className="flex flex-row justify-evenly mt-4">
                        <Button  className="bg-violeta hover:bg-fuchsia-950"> <Link href={"/"}>Comprar</Link></Button>
                        <Button className="bg-violeta hover:bg-fuchsia-950"><Link href={"/"}>Agregar al carrito</Link> </Button>
                    </div>
                </CardContent>
    )
}