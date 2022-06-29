import axios, { CancelTokenSource } from "axios";
import { useRef, useState } from "react";
import { IOrder } from "../../models/IOrder";
import { OrderContext } from "./orderContext";

const GET_BY_ORDER = (orderId: number): string => `/Order/Get?orderId=${orderId}`;
const GET_BY_TABLE_NUMBER = (tableNumber: number): string => `/Order/GetByTableNumber?tableNumber=${tableNumber}`;
const PLACE_ORDER_URL = (tableNumber: number) => `/Order/Place?tableNumber=${tableNumber}`;
const COMPLETE_URL = (tableNumber: number) => `/Order/Complete?tableNumber=${tableNumber}`;
const ADD_RECOMMENDED_URL = (tableNumber: number, category: number): string => `/Order/AddChefRecommended?tableNumber=${tableNumber}&category=${category}`;
const ADD_ALL_RECOMMENDED_URL = (tableNumber: number): string => `/Order/AddAllChefRecommendation?tableNumber=${tableNumber}`;
const ADD_ORDER_ITEM_URL = (tableNumber: number, menuId: number, quantity: number): string => `/Order/AddOrderItem?tableNumber=${tableNumber}&menuId=${menuId}&quantity=${quantity}`;
const CANCEL_ITEM_URL = (orderItemId: number): string => `/Order/CancelOrderItem?orderItemId=${orderItemId}`;

export const OrderContextProvider: React.FC<{tableNumber: number}> = (props) => {
    const TABLE_NUMBER = props.tableNumber;

    const [isBillout, setIsBillout] = useState<boolean>(false);
    const [order, setOrder] = useState<IOrder>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const handleError = (err: any) => {
        if(err.response?.data?.detail) setError(err.response.data.detail);
        else if(err.response?.data?.errors) setError(err.response.data.title);
        else setError(err.response.data);
    };

    const getByOrder = async (id: number) => {
        try {
            setSuccess('');
            setError('');
            setLoading(true);

            const response = await axios.get<IOrder>(GET_BY_ORDER(id));

            setOrder(response.data);
            setIsBillout(response.data.status === 5);
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const getByTableNumber = async () => {
        try {
            setSuccess('');
            setError('');
            setLoading(true);
            setIsBillout(false);

            const response = await axios.get<IOrder>(GET_BY_TABLE_NUMBER(TABLE_NUMBER));

            setOrder(response.data);
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const place = async () => {
        try {
            setSuccess('');
            setError('');
            setLoading(() => true);

            const response = await axios.post<IOrder>(PLACE_ORDER_URL(TABLE_NUMBER));

            setSuccess('Your order has been placed. Please wait while we prepare them.');

            setOrder(response.data);
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const complete = async () => {
        try {
            setSuccess('');
            setError('');
            setLoading(true);

            const response = await axios.post<IOrder>(COMPLETE_URL(TABLE_NUMBER));

            setSuccess('Your order has been completed.');

            setOrder(response.data);
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const addOrderItem = async (menuId: number, quantity: number) => {
        try {
            setSuccess('');
            setError('');
            setLoading(true);

            const response = await axios.put<IOrder>(ADD_ORDER_ITEM_URL(TABLE_NUMBER, menuId, quantity));

            setSuccess('Your order has been added to pending orders.');

            setOrder(response.data);
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const addRecommended = async (category: number) => {
        try {
            setSuccess('');
            setError('');
            setLoading(true);

            const response = await axios.put<IOrder>(ADD_RECOMMENDED_URL(TABLE_NUMBER, category));
            
            setSuccess('Order has been added to pending orders.');

            setOrder(response.data);
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const addAllRecommended = async () => {
        try {
            setSuccess('');
            setError('');
            setLoading(true);

            const response = await axios.put<IOrder>(ADD_ALL_RECOMMENDED_URL(TABLE_NUMBER));

            setSuccess('All chef recommendations added!');

            setOrder(response.data);
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const cancelItem = async (orderItemId: number) => {
        try {
            setError('');
            setSuccess('');
            setLoading(true);

            await axios.delete(CANCEL_ITEM_URL(orderItemId));

            setSuccess('Your pending order item has been cancelled.');

            if(order) getByOrder(order?.id);
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const toggleBillout = () => {
        setIsBillout(!isBillout);
    };
      
    return(
        <OrderContext.Provider
            value={{
                order: order,
                loading: loading,
                success: success,
                error: error,
                isBillout: isBillout,
                getByOrder: getByOrder,
                getByTableNumber: getByTableNumber,
                place: place,
                complete: complete,
                cancelItem: cancelItem,
                addOrderItem: addOrderItem,
                addRecommended: addRecommended,
                addAllRecommended: addAllRecommended,
                toggleBillout: toggleBillout
            }}>
                {props.children}
        </OrderContext.Provider>
    )
}