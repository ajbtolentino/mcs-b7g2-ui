import { IOrderItem } from "./IOrderItem";

export interface IOrder {
    id: number;
    orderItems: IOrderItem[]
}