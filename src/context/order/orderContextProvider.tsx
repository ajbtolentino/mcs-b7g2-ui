import axios from "axios";
import { useState } from "react";
import { IOrder } from "../../models/IOrder";
import { OrderContext } from "./orderContext";

const GET_BY_ID_URL = (orderId: number): string => `/Order/Get?orderId=${orderId}`;
const PLACE_ORDER_URL = (tableNumber: number, customerName: string) => `/Order/Place?tableNumber=${tableNumber}&customerName=${customerName}`;
const COMPLETE_URL = (orderId: number) => `/Order/Complete?orderId=${orderId}`;
const ADD_RECOMMENDED_URL = (orderId: number, category: number): string => `/Order/AddChefRecommended?orderId=${orderId}&category=${category}`;
const ADD_ORDER_ITEM_URL = (orderId: number, menuId: number, quantity: number): string => `/Order/AddOrderItem?orderId=${orderId}&menuId=${menuId}&quantity=${quantity}`;
const DELETE_URL = (orderId: number): string => `/Order/Cancel?orderId${orderId}`;

export const OrderContextProvider: React.FC<{}> = (props) => {
    const [order, setOrder] = useState<IOrder>();
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);

    const handleError = (err: any) => {
        setErrors(["Something went wrong. Please try again."]);
    };

    const getById = async (orderId: number) => {
        try {
            setErrors([]);
            setLoading(true);

            const response = await axios.get<IOrder>(GET_BY_ID_URL(orderId));

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

            const response = await axios.post<IOrder>(PLACE_ORDER_URL(1, "test"),
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

            await axios.post(COMPLETE_URL(order?.id ?? 0),
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

            await axios.put(ADD_ORDER_ITEM_URL(order?.id ?? 0, menuId, quantity),
            {
                headers: { "Content-Type": "application/json" }
            });
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);

            getById(order?.id ?? 0);
        }
    };

    const addRecommended = async (category: number) => {
        try {
            setErrors([]);
            setLoading(true);

            await axios.put(ADD_RECOMMENDED_URL(order?.id ?? 0, category));
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);

            getById(order?.id ?? 0);
        }
    }

    const cancel = async () => {
        try {
            setErrors([]);
            setLoading(true);

            await axios.delete(DELETE_URL(order?.id ?? 0),
            {
                headers: { "Content-Type": "application/json" }
            });
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };
      
    return(
        <OrderContext.Provider
            value={{
                order: order,
                loading: loading,
                errors: errors,
                getById: getById,
                place: place,
                complete: complete,
                cancel: cancel,
                addOrderItem: addOrderItem,
                addRecommended: addRecommended
            }}>
                {props.children}
        </OrderContext.Provider>
    )
}