
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

interface BackButtonProps {
    color?: string;
    size?: string;  
}

export default function BackButton({ color = "text-labelAdminColor", size = "h-8 w-8" }: Readonly<BackButtonProps>) {
    const { back } = useRouter();

    return (
        <Button variant="outline" size="icon" onClick={back}>
            <IoIosArrowBack className={`text-${color} ${size}`} />
        </Button>
    );
}
