'use client'
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import CardRigthSide from "./CardRigthSide";
import { Title } from "@/components/Title/Title";
import { IwineDetail } from "@/types/detail/detail.types";
import CardEspecs from "./CardEspecs";
import BackButton from "@/components/ui/BackButton";
import { useState } from "react";

export interface WineProps {
    wine: IwineDetail;
};

function getFirstWord(phrase: string): string {
    return phrase.split(' ')[0];
}

export default function CardDetail({ wine }: Readonly<WineProps>) {

    const firstWord = getFirstWord(wine.name);
    return (
        <div className="grid justify-center mb-10 mt-40">
            <Title title="DETALLES" color="beige" />
            <div className="flex flex-col md:flex-row md:space-x-2">
                <Card className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl px-6 py-4 mt-6">
                    <CardContent className="flex justify-center items-center">
                            <Image
                                src={wine.image}
                                alt={wine.name}
                                width={300}
                                height={400}
                                className={`transform transition-transform duration-300 hover:scale-105 rounded-sm `}
                            />
                    </CardContent>
                    <CardRigthSide wine={wine} />
                </Card>
                <CardEspecs wine={wine} />
            </div>
        </div>
    );
}
