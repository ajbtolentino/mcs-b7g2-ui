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
    const [errors, setErrors] = useState<string[]>([]);

    const cancelTokenSource = useRef<CancelTokenSource>();

    const handleError = (err: any) => {
        if(err.response?.data?.detail) setErrors([err.response.data.detail]);
        else if(err.response?.data?.errors) setErrors([err.response.data.title]);
        else setErrors([err.response.data]);
    };

    const getByOrder = async () => {
        try {
            if(order) {
                setErrors([]);
                setLoading(true);

                if(cancelTokenSource?.current?.cancel) cancelTokenSource.current.cancel();

                cancelTokenSource.current = axios.CancelToken.source();
                const response = await axios.get<IOrder>(GET_BY_ORDER(order.id), {
                    cancelToken: cancelTokenSource.current.token
                });

                setOrder(response.data);
            }
            else {
                getByTableNumber();
            }
        } catch (err: any) {
            if(err.response?.status !== 404) handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const getByTableNumber = async () => {
        try {
            setErrors([]);
            setLoading(true);

            if(cancelTokenSource?.current?.cancel) cancelTokenSource.current.cancel();

            cancelTokenSource.current = axios.CancelToken.source();
            const response = await axios.get<IOrder>(GET_BY_TABLE_NUMBER(TABLE_NUMBER), {
                cancelToken: cancelTokenSource.current.token
            });

            setOrder(response.data);
        } catch (err: any) {
            if(err.response?.status !== 404) handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const place = async () => {
        try {
            setErrors([]);
            setLoading(true);

            const response = await axios.post<IOrder>(PLACE_ORDER_URL(TABLE_NUMBER),
            {
                headers: { "Content-Type": "application/json" }
            });

            setOrder(response.data);
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);
            setIsBillout(false);
        }
    };

    const complete = async () => {
        try {
            setErrors([]);
            setLoading(true);

            const response = await axios.post<IOrder>(COMPLETE_URL(TABLE_NUMBER),
            {
                headers: { "Content-Type": "application/json" }
            });

            setOrder(response.data);
        } catch (err: any) {
            handleError(err);
            getByOrder();
        } finally {
            setLoading(false);
        }
    };

    const addOrderItem = async (menuId: number, quantity: number) => {
        try {
            setErrors([]);
            setLoading(true);

            var response = await axios.put(ADD_ORDER_ITEM_URL(TABLE_NUMBER, menuId, quantity),
            {
                headers: { "Content-Type": "application/json" }
            });

            setOrder(response.data);
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);

            setIsBillout(false);
        }
    };

    const addRecommended = async (category: number) => {
        try {
            setErrors([]);
            setLoading(true);

            const response = await axios.put(ADD_RECOMMENDED_URL(TABLE_NUMBER, category));

            setOrder(response.data);
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);

            setIsBillout(false);
        }
    };

    const addAllRecommended = async () => {
        try {
            setErrors([]);
            setLoading(true);

            const response = await axios.put(ADD_ALL_RECOMMENDED_URL(TABLE_NUMBER));

            setOrder(response.data);
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const cancelItem = async (orderItemId: number) => {
        try {
            setErrors([]);
            setLoading(true);

            await axios.delete(CANCEL_ITEM_URL(orderItemId),
            {
                headers: { "Content-Type": "application/json" }
            });

            getByTableNumber();
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);

            setIsBillout(false);
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
                errors: errors,
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