import { IMenuItem } from "./IMenuItem";

export interface IOrderItem {
    id: number;
    name: string;
    quantity: number;
    status: number;
    totalPrice: number;
    menu: IMenuItem;
}