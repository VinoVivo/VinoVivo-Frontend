import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface OrderDetailDialogProps {
    id: number;
}

const OrderDetailDialog: React.FC<OrderDetailDialogProps> = ({ id }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='bg-violeta hover:bg-primary w-32 m-1'>Ver Pedido</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Pedido #{id}</DialogTitle>
                    <DialogDescription>
                        Haz cambios en tu perfil aquí. Haz clic en guardar cuando hayas terminado.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Nombre
                        </Label>
                        <Input
                            id="name"
                            defaultValue="Pedro Duarte"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Usuario
                        </Label>
                        <Input
                            id="username"
                            defaultValue="@peduarte"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Guardar cambios</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default OrderDetailDialog;

