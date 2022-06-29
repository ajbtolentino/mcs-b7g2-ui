import React from "react";
import { IOrder } from "../../models/IOrder";

interface IOrderContext {
    order?: IOrder;
    loading: boolean;
    error: string;
    success: string;
    isBillout: boolean;
    getByOrder?: (id: number) => Promise<void>;
    getByTableNumber?: () => Promise<void>;
    complete?: () => Promise<void>;
    place?: () => Promise<void>;
    cancelItem?: (orderItemId: number) => Promise<void>;
    addOrderItem?: (menuId: number, quantity: number) => Promise<void>;
    addRecommended?: (category: number) => Promise<void>;
    addAllRecommended?: () => Promise<void>;
    toggleBillout?: () => void;
};

export const OrderContext = React.createContext<IOrderContext>({
    loading: false,
    error: '',
    success: '',
    isBillout: false,
});