// OrderDetailDialog.tsx
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { OrderDetailType } from "@/types/orders/orders.types";
import { Product } from "@/types/products/products.types";
import { string } from "zod";

interface OrderDetailDialogProps {
    id: number;
    productos: (OrderDetailType & { product: Product })[];
    valorFinal: number
}

const OrderDetailDialog: React.FC<OrderDetailDialogProps> = ({ id, productos, valorFinal }) => {
    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0, 
    }).format(valorFinal);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='bg-violeta hover:bg-primary w-32 m-1'>Ver Pedido</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Pedido #{id}: {formattedPrice}</DialogTitle>
                    <DialogDescription>
                        Tu pedido contiene los siguientes productos:
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {productos.map((item) => (
                        <div key={item.id} className="border p-2 rounded-md">
                            <div className="flex items-center gap-2">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    width={50}
                                    height={75}
                                    className="border rounded-md"
                                    style={{ objectFit: "cover" }}
                                />
                                <div>
                                    <div className="font-bold">{item.product.name}</div>
                                    <div>Variedad: {item.product.nameVariety}</div>
                                    <div>Precio: ${item.price}</div>
                                    <div>Cantidad: {item.quantity}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button className='bg-violeta hover:bg-primary w-32 m-1'>Volver a Comprar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default OrderDetailDialog;
