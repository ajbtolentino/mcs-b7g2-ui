import { IOrderItem } from "./IOrderItem";

export interface IOrder {
    id: number;
    status: number;
    totalBill: number;
    inclusiveTax: number;
    serviceCharge: number;
    remainingPreparationTime: number;
    remainingCookingTime: number;
    orderItems: IOrderItem[];
}