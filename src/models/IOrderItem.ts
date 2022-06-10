import { IMenuItem } from "./IMenuItem";

export interface IOrderItem {
    id: number;
    name: string;
    quantity: number;
    preparationTime: number;
    cookingTime: number;
    price: number;
}