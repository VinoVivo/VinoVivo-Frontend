import {Card, CardContent,} from "@/components/ui/card";
import Image from 'next/image';
import CardRigthSide from "./CardRigthSide";
import { IwineDetail } from "@/types/detail/detail.types";
import { Title } from "@/components/Title/Title";

export interface WineProps {
    wine: IwineDetail;
};
function getFirstWord(phrase: string): string {
    return phrase.split(' ')[0];
}

export default function CardDetail({wine }: Readonly<WineProps>) {    
    const firstWord = getFirstWord(wine.name); 

    return (            
        <div className="grid justify-center mb-10 mt-40">
            <Title title={firstWord} color="beige" />
            <Card className=" grid grid-cols-1 md:grid-cols-[40%_60%] gap-4 max-w-4xl px-6 py-4 mt-6">
                <CardContent className=" flex justify-center items-center">
                    <Image src={wine.image} alt={wine.name} width='300' height='500' />
                </CardContent>
                <CardRigthSide wine={wine}/>
            </Card>
        </div>
    );
}