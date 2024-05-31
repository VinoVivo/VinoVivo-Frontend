import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';import { ProductFormValues } from '@/types/products/products.types';
// import { useForm } from 'react-hook-form';
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdReportGmailerrorred } from "react-icons/md";

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    type: "success" | "error";
    message: string;
};
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

const DialogeRegister: React.FC<DialogProps> = ({ open, onOpenChange, type, message }) => {

    // const { reset } = useForm<ProductFormValues>();

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="fixed flex items-center justify-center z-50">
                <div className="rounded-lg p-10 shadow-lg justify-between border-primary border-2">
                    <AlertDialogHeader className="flex flex-col items-center">
                        <AlertDialogTitle className='mb-2 text-3xl'>
                            {type === "success" ? "Éxito" : "Error"}
                        </AlertDialogTitle>
                        {type === "success" ? (
                            <FaRegCircleCheck className="h-12 w-12 text-green-500 mb-4" />
                        ) : (
                            <MdReportGmailerrorred className="h-12 w-12 text-red-500 mb-4" />
                        )}
                        <AlertDialogDescription className='text-base mt-6'>
                            {message}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className='mt-6'>
                        <AlertDialogAction 
                            onClick={()=>onOpenChange}
                            className='hover: hover:bg-white hover:text-primary  hover:border-primary  border-2 '
                        >
                            Cerrar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DialogeRegister;