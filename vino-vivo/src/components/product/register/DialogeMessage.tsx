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
  type: "ÉXITO" | "ERROR" | "ALERTA";
  message: string;
  styleButton1?: string;
  styleButton2?: string;
  styleButton3?: string;
  textButtonOne?: string;
  textButtonTwo?: string;
  textButtonThree?: string;
  buttonTwoHref?: string;
  onClick?: (arg: any) => Promise<void>;
}

const DialogeMessage: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  type,
  message,
  textButtonOne,
  textButtonTwo,
  textButtonThree,
  styleButton1,
  styleButton2,
  styleButton3,
  buttonTwoHref,
  onClick,
}) => {
  // const { reset } = useForm<ProductFormValues>();
  const getIcon = () => {
    switch (type) {
      case "ÉXITO":
        return <FaRegCircleCheck className="h-12 w-12 text-success mb-4" />;
      case "ERROR":
        return (
          <MdReportGmailerrorred className="h-12 w-12 text-red-500 mb-4" />
        );
      case "ALERTA":
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
                  styleButton1 ??
                  "hover:bg-white hover:text-primary hover:border-primary border-2"
                }
              >
                {textButtonOne}
              </AlertDialogAction>
            )}
            {textButtonTwo && buttonTwoHref && (
              <Link href={buttonTwoHref} passHref>
                <AlertDialogAction
                  className={
                    styleButton2 ??
                    "hover:bg-white hover:text-primary hover:border-primary border-2"
                  }
                >
                  {textButtonTwo}
                </AlertDialogAction>
              </Link>
            )}
            {textButtonThree && (
              <AlertDialogAction
                onClick={onClick}
                className={
                  styleButton3 ??
                  "hover:bg-white hover:text-primary hover:border-primary border-2"
                }
              >
                {textButtonThree}
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogeMessage;
