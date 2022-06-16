import { IOrderItem } from "./IOrderItem";

export interface IOrder {
    id: number;
    status: number;
    totalBill: number;
    inclusiveTax: number;
    serviceCharge: number;
    orderItems: IOrderItem[];
}