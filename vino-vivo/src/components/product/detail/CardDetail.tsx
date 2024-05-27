import {Card, CardContent,} from "@/components/ui/card";
import Image from 'next/image';
import CardRigthSide from "./CardRigthSide";
import { IwineDetail } from "@/types/detail/detail.types";

export interface WineProps {
    wine: IwineDetail;
};

export default function CardDetail({wine }: Readonly<WineProps>) {    
    
    return (            
        <div className="grid justify-center mb-10 mt-40">
            <Card className=" grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl px-6 py-4">
                <CardContent className=" flex justify-center items-center">
                    <Image src={wine.image} alt={wine.name} width='300' height='500' />
                </CardContent>
                <CardRigthSide wine={wine}/>
            </Card>
        </div>
    );
}