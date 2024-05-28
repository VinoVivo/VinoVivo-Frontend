'use client';
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function BackButton () {

    const {back} = useRouter();

    return(
    <Button variant="outline" size="icon" onClick={back}>
        <IoIosArrowBack className="h-4 w-4" />
    </Button>
)
}

