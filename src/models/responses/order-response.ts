import { OrderItem } from "../entities/orderItem";
import { ShippingAddress } from "../entities/shippingAddress";

export interface OrderResponse {
    id: number;
    createdAt: string;
    address: ShippingAddress
    total: number;
    items: OrderItem[];
}