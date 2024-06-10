export interface OrderDetailType {
    id: number,
    idOrder: number,
    idProduct: number,
    price: number,
    quantity: number
}

export interface OrderType {
    id: number;
    idCustomer: string;
    totalPrice: number;
    shippingAddress: string;
    orderEmail: string;
};