'use client';
import { CardContent } from "@/components/ui/card";
import { IwineDetail } from "@/types/detail/detail.types";

interface CardRigthSideProps {
    wine: IwineDetail;
}
export default function CardEspecs({ wine }: Readonly<CardRigthSideProps>) {

    return (
        <>
            <CardContent className="flex flex-col mt-6 items-center sm:items-start">
                <div className="flex justify-between mb-4">
                    <h1 className="text-2xl font-normal mt-4 border-b-2 border-t-2 border-[#5B483A] pt-2 pb-2 text-center">Especificaciones</h1>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-y-2 gap-x-8 mb-4 mt-4">
                    <div className="">
                        <p className="font-semibold">Año </p>
                        <p className="mb-4 text-gray-500 mt-[-4px]">{wine.year}</p>
                        <p className="font-semibold">Tipo </p>
                        <p className="mb-4 text-gray-500 mt-[-4px]">{wine.nameType}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Variedad </p>
                        <p className="mb-4 text-gray-500 mt-[-4px]">{wine.nameVariety}</p>
                        <p className="font-semibold">Bodega </p>
                        <p className="mb-4 text-gray-500 mt-[-4px]">{wine.nameWinery}</p>
                    </div>
                </div>
            </CardContent>
        </>
    );
};