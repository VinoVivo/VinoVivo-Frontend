import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdReportGmailerrorred, MdWarning } from "react-icons/md";

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    type: "Éxito" | "Error" | "Alerta";
    message: string;
    styleButton1?: string;
    styleButton2?: string;
    textButtonOne?: string, 
    textButtonTwo?: string
    onClick?: (arg:any)=> Promise<void>;
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

const DialogeRegister: React.FC<DialogProps> = ({ open, onOpenChange, type, message, textButtonOne, textButtonTwo, styleButton1, styleButton2, onClick}) => {

    // const { reset } = useForm<ProductFormValues>();

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="fixed flex items-center justify-center z-50">
                <div className="rounded-lg p-10 shadow-lg justify-between border-primary border-2">
                    <AlertDialogHeader className="flex flex-col items-center">
                        <AlertDialogTitle className='mb-2 text-3xl'>
                            {type}
                       </AlertDialogTitle>
                            {type === 'Éxito' ? (
                                <FaRegCircleCheck className="h-12 w-12 text-green-500 mb-4" />
                            ) : type === 'Error' ? (
                                <MdReportGmailerrorred className="h-12 w-12 text-red-500 mb-4" />
                            ) :  type === 'Alerta' ? (
                                <MdWarning className="h-12 w-12 text-destructive mb-4" />)
                                : (''
                            )}
                                                
                        <AlertDialogDescription className='text-base mt-6'>
                            {message}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className='mt-6'>
                        {textButtonOne ?
                             <AlertDialogAction 
                             onClick={()=>onOpenChange}
                             className= {styleButton1 ? styleButton1 : 'hover:bg-white hover:text-primary  hover:border-primary  border-2 '}
                         >
                          {textButtonOne}
                         </AlertDialogAction>
                          : ''
                        }
                       
                        {textButtonTwo ? 
                        <AlertDialogAction 
                        onClick={onClick}
                        className= {styleButton2 ? styleButton2 : ' bg-white hover: hover:bg-primary hover:text-white   border-2 '}
                    >
                       {textButtonTwo}
                    </AlertDialogAction>
                            : ''
                        }
                    </AlertDialogFooter>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DialogeRegister;