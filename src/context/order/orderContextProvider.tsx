import axios from "axios";
import { useState } from "react";
import { IOrder } from "../../models/IOrder";
import { OrderContext } from "./orderContext";

const GET_BY_TABLE_NUMBER = (tableNumber: number): string => `/Order/GetByTableNumber?tableNumber=${tableNumber}`;
const PLACE_ORDER_URL = (tableNumber: number) => `/Order/Place?tableNumber=${tableNumber}`;
const COMPLETE_URL = (tableNumber: number) => `/Order/Complete?tableNumber=${tableNumber}`;
const ADD_RECOMMENDED_URL = (tableNumber: number, category: number): string => `/Order/AddChefRecommended?tableNumber=${tableNumber}&category=${category}`;
const ADD_ORDER_ITEM_URL = (tableNumber: number, menuId: number, quantity: number): string => `/Order/AddOrderItem?tableNumber=${tableNumber}&menuId=${menuId}&quantity=${quantity}`;
const CANCEL_ITEM_URL = (orderItemId: number): string => `/OrderItem/Cancel?orderItemId=${orderItemId}`;

export const OrderContextProvider: React.FC<{}> = (props) => {
    const TABLE_NUMBER = 1;

    const [order, setOrder] = useState<IOrder>();
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);

    const handleError = (err: any) => {
        setErrors(["Something went wrong. Please try again."]);
    };

    const getByTableNumber = async (tableNumber: number) => {
        try {
            setErrors([]);
            setLoading(true);

            const response = await axios.get<IOrder>(GET_BY_TABLE_NUMBER(tableNumber));

            setOrder(response.data);
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const place = async () => {
        try {
            setErrors([]);
            setLoading(true);

            const response = await axios.post<IOrder>(PLACE_ORDER_URL(order?.tableNumber ?? TABLE_NUMBER),
            {
                headers: { "Content-Type": "application/json" }
            });

            setOrder(response.data);
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const complete = async () => {
        try {
            setErrors([]);
            setLoading(true);

            await axios.post(COMPLETE_URL(order?.tableNumber ?? TABLE_NUMBER),
            {
                headers: { "Content-Type": "application/json" }
            });

            setOrder(undefined);
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const addOrderItem = async (menuId: number, quantity: number) => {
        try {
            setErrors([]);
            setLoading(true);

            var response = await axios.put(ADD_ORDER_ITEM_URL(order?.tableNumber ?? TABLE_NUMBER, menuId, quantity),
            {
                headers: { "Content-Type": "application/json" }
            });

            setOrder(response.data);
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);

            if(order) getByTableNumber(order.tableNumber ?? TABLE_NUMBER);
        }
    };

    const addRecommended = async (category: number) => {
        try {
            setErrors([]);
            setLoading(true);

            const response = await axios.put(ADD_RECOMMENDED_URL(order?.tableNumber ?? TABLE_NUMBER, category));

            setOrder(response.data);
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);

            if(order) getByTableNumber(order.tableNumber ?? TABLE_NUMBER);
        }
    }

    const cancelItem = async (orderItemId: number) => {
        try {
            setErrors([]);
            setLoading(true);

            await axios.delete(CANCEL_ITEM_URL(orderItemId),
            {
                headers: { "Content-Type": "application/json" }
            });
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);

            if(order) getByTableNumber(order.tableNumber ?? TABLE_NUMBER);
        }
    };
      
    return(
        <OrderContext.Provider
            value={{
                order: order,
                loading: loading,
                errors: errors,
                getByTableNumber: getByTableNumber,
                place: place,
                complete: complete,
                cancelItem: cancelItem,
                addOrderItem: addOrderItem,
                addRecommended: addRecommended
            }}>
                {props.children}
        </OrderContext.Provider>
    )
}