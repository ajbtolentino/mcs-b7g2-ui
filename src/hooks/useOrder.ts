import { useContext } from "react";
import { TodoContext } from "../context/order/orderContext";

export const useOrder = () => {
    const orderContext = useContext(TodoContext);

    const addOrder = (text: string) => {
        if(orderContext.addOrder) orderContext.addOrder(text);
    }

    const updateOrder = (id: number, text: string, completed: boolean, category: string) => {
        if(orderContext.updateOrder) orderContext.updateOrder(id, text, completed, category);
    }

    const deleteOrder = (id: number) => {
        if(orderContext.deleteOrder) orderContext.deleteOrder(id);
    }

    return {
        orders: orderContext.orders,
        loading: orderContext.loading,
        getOrders: orderContext.getOrders,
        addOrder,
        updateOrder,
        deleteOrder
    };
};