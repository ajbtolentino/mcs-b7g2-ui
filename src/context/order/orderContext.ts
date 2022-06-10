import React from "react";
import { IOrder } from "../../models/IOrder";

interface IOrderContext {
    orders: IOrder[];
    loading: boolean;
    errors: string[];
    getOrders?: () => Promise<void>;
    addOrder?: (text: string) => Promise<void>;
    deleteOrder?: (id: number) => Promise<void>;
    updateOrder?: (id: number, text: string, completed: boolean, category: string) => Promise<void>;
};

export const TodoContext = React.createContext<IOrderContext>({
    orders: [],
    loading: false,
    errors: []
});