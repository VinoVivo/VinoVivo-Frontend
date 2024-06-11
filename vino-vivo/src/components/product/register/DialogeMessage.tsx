import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdReportGmailerrorred, MdWarning } from "react-icons/md";

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    type: "Success" | "Error" | "Alert";
    message: string;
    styleButton1?: string;
    styleButton2?: string;
    textButtonOne?: string;
    textButtonTwo?: string;
    buttonTwoHref?: string;
    onClick?: (arg: any) => Promise<void>;
}
// const initialValues: ProductFormValues = {
//     name: '',
//     image: '',
//     idType: 0,
//     idWinery: 0,
//     idVariety: 0,
//     stock: 0,
//     price: 0,
//     year: 0,
//     description: ''
// };

const DialogeMessage: React.FC<DialogProps> = ({
    open,
    onOpenChange,
    type,
    message,
    textButtonOne,
    textButtonTwo,
    styleButton1,
    styleButton2,
    buttonTwoHref,
    onClick,
}) => {
    // const { reset } = useForm<ProductFormValues>();
    const getIcon = () => {
        switch (type) {
            case "Success":
                return <FaRegCircleCheck className="h-12 w-12 text-green-500 mb-4" />;
            case "Error":
                return <MdReportGmailerrorred className="h-12 w-12 text-red-500 mb-4" />;
            case "Alert":
                return <MdWarning className="h-12 w-12 text-destructive mb-4" />;
            default:
                return null;
        }
    };
    
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent className="fixed flex items-center justify-center z-50">
            <div className="rounded-lg p-10 shadow-lg justify-between border-primary border-2">
            <AlertDialogHeader className="flex flex-col items-center">
                <AlertDialogTitle className="mb-2 text-3xl">
                {type}
                </AlertDialogTitle>
                {getIcon()}
                <AlertDialogDescription className="text-base mt-6">
                {message}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6">
            {textButtonOne && (
                <AlertDialogAction
                    onClick={() => onOpenChange(false)}
                    className={
                        styleButton1 ?? "hover:bg-white hover:text-primary hover:border-primary border-2"
                    }
                >
                    {textButtonOne}
                </AlertDialogAction>
            )}
            {textButtonTwo && buttonTwoHref &&(
                <Link href={buttonTwoHref} passHref>
                    <AlertDialogAction
                        className={
                            styleButton2 ?? "hover:bg-white hover:text-primary hover:border-primary border-2"
                        }
                    >
                        {textButtonTwo}
                        </AlertDialogAction>
                </Link>
            )}
            </AlertDialogFooter>
            </div>
        </AlertDialogContent>
        </AlertDialog>
    );
};

export default DialogeMessage;
