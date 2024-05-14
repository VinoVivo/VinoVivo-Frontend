
import {Card, CardContent,} from "@/components/ui/card";
import Image from 'next/image';
import CardRigthSide from "./CardRigthSide";

export interface IwineDetail {
    id: number,
    image: string,
    name: string,
    type: number,
    year: number, 
    winery: number,
    variety: number,
    price: number,
    stock: number,
    description: string
}
export interface WineProps {
    wine: IwineDetail;
};

export default function CardDetail({wine }: Readonly<WineProps>) {
    
    
    return (            
            <div className=" grid flex justify-center mb-10 mt-40">
            <Card className=" grid flex flex-row items-center w-full max-w-4xl px-6 py-4">
                <CardContent className="w-1/2 flex justify-center items-center">
                    <Image src={wine.image} alt={wine.title} width='300' height='100' />
                </CardContent>
                <CardRigthSide wine={wine}/>
            </Card>
        </div>
    );
}