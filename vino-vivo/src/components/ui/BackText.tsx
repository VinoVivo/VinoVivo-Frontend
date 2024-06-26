
import { useRouter } from "next/navigation";

interface BackTextProps {
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    underlineWidth?: string;
}

const BackText: React.FC<BackTextProps> = ({
    color = 'text-gray-600',
    fontSize = 'text-base',
    fontWeight = 'font-medium',
    underlineWidth = 'border-b-2',
}) => {
    const { back } = useRouter();

    return (
        <button
            type="button"
            className={`focus:outline-none ${color} ${fontSize} ${fontWeight} ${underlineWidth} border-gray-600`}
            onClick={() => back()}
        >
            Volver Atrás
        </button>
    );
};

export default BackText;
