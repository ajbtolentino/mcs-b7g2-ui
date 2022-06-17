import React from "react";
import { IOrder } from "../../models/IOrder";

interface IOrderContext {
    order?: IOrder;
    loading: boolean;
    errors: string[];
    getByTableNumber?: (tableNumber: number) => Promise<void>;
    complete?: () => Promise<void>;
    place?: () => Promise<void>;
    cancelItem?: (orderItemId: number) => Promise<void>;
    addOrderItem?: (menuId: number, quantity: number) => Promise<void>;
    addRecommended?: (category: number) => Promise<void>;
};

export const OrderContext = React.createContext<IOrderContext>({
    loading: false,
    errors: []
});