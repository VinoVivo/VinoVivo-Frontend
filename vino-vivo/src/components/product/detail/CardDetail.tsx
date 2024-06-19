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
            <Title title="Detalles" color="beige" />
            <div className="flex flex-col md:flex-row md:space-x-2 ">
                <Card className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-4 max-w-4xl px-6 py-4 mt-6 rounded-lg border-1 border-gray bg-card shadow-sm">
                    <CardContent className="flex justify-center items-center">
                    <Image
                            src={wine.image}
                            alt={wine.name}
                            width={300}
                            height={500}
                            className={`w-full h-auto transform transition-transform duration-300 hover:scale-105`}
                        />
                    </CardContent>
                    <CardRigthSide wine={wine} />
                </Card>
                    <CardEspecs wine={wine} />
            </div>
        </div>
    );
}
