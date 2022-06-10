import { IOrder } from "./IOrder";

export interface ICustomer {
    id: number;
    name: string;
    order: IOrder;
}