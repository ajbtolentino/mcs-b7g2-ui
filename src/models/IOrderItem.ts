import { IMenuItem } from "./IMenuItem";

export interface IOrderItem {
    id: number;
    name: string;
    quantity: number;
    status: number;
    remainingCookingTime: number;
    remainingPreparationTime: number;
    totalPrice: number;
    isPlaced: boolean;
    menu: IMenuItem;
}