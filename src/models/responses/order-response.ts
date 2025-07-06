import { OrderItem } from "../entities/orderItem";
import { ShippingAddress } from "../entities/shippingAddress";

export interface OrderResponse {
    id: number;
    createdAt: string;
    shippingAddress: ShippingAddress
    total: number;
    items: OrderItem[];
}