import { useContext } from "react";
import { OrderContext } from "../context/order/orderContext";

export const useOrder = () => {
    return useContext(OrderContext);
};