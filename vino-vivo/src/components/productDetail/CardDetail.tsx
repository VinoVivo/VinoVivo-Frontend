'use client'
import {Card, CardContent,} from "@/components/ui/card";
import Image from 'next/image';
import CardRigthSide from "./CardRigthSide";


export interface IwineDetail {
    image: string,
    title: string,
    type: string,
    year: number, 
    winery: string,
    variety: string,
    price: number,
    stock: number,
    temperature: string,
    description: string
}
interface WineProps {
    wine: IwineDetail;
};
// {wine }: WineProps
export default function CardDetail() {

    return (            
            <div className="flex justify-center mb-10 mt-40">
            <Card className="flex flex-row items-center w-full max-w-4xl px-6 py-4">
                <CardContent className="w-1/2 flex justify-center items-center">
                    <Image src="/vino1.jpg" alt={"vino rivero gonzalez"} width='300' height='100' />
                    {/* <Image src={wine.image} alt={wine.title} width='300' height='100' /> */}
                </CardContent>
                <CardRigthSide/>
            </Card>
        </div>
    );
}