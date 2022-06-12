import axios from "axios";
import { useEffect, useState } from "react";
import { IOrder } from "../../models/IOrder";
import { TodoContext } from "./orderContext";

const GET_URL: string = "https://localhost:5001/";
const PLACE_ORDER_URL: string = "https://localhost:5001/";
const PUT_URL = (id: number): string => `https://localhost:5001/`;
const DELETE_URL = (id: number): string => `https://localhost:5001/`;

interface IOrderModel {
    id: number;
    text: string;
    createdBy: string;
    dateCreated: Date;
}

export const OrderContextProvider: React.FC<{}> = (props) => {
    const [todos, setTodos] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);

    const handleError = (err: any) => {
        setErrors(["Something went wrong. Please try again."]);
    };

    const getOrders = async () => {
        try {
            setErrors([]);
            setLoading(true);

            const response = await axios.get<IOrderModel[]>(GET_URL);

            const orders: IOrder[] = response.data.map(d => {
                return {
                    id: 0,
                    orderItems: []
                };});

            setTodos([...orders]);
        } catch (err: any) {
            handleError(err);
        } finally {
            setTimeout(() => setLoading(false), 5000);
        }
    };

    const addOrder = async (text: string) => {
        try {
            setErrors([]);
            setLoading(true);

            await axios.post(PLACE_ORDER_URL, { "text": text },
            {
                headers: { "Content-Type": "application/json" }
            });
        } catch (err: any) {
            handleError(err);
        } finally {
            setTimeout(() => setLoading(false), 5000);

            await getOrders!();
        }
    };

    const deleteOrder = async (id: number) => {
        try {
            setErrors([]);
            setLoading(true);

            await axios.delete(DELETE_URL(id),
            {
                headers: { "Content-Type": "application/json" }
            });
        } catch (err: any) {
            handleError(err);
        } finally {
            setTimeout(() => setLoading(false), 5000);

            await getOrders!();
        }
    };

    const updateOrder = async (id: number, 
                              text: string, 
                              completed: boolean,
                              category: string) => {
        try {
            setErrors([]);
            setLoading(true);

            await axios.put(PUT_URL(id), 
            {
                "text": text, 
                "completed":  completed,
                "category": category
            },
            {
                headers: { "Content-Type": "application/json" }
            });
        } catch (err: any) {
            handleError(err);
        } finally {
            setTimeout(() => setLoading(false), 5000);

            await getOrders!();
        }
    };

    const toggleCompleted = (id: number) => {
        const updatedTasks = todos.map(task => {
            if(task.id !== id) return task;

            return {
                ...task
            };
        });

        setTodos([...updatedTasks]);
    };
      
    return(
        <TodoContext.Provider
            value={{
                orders: todos,
                loading: loading,
                errors: errors,
                getOrders: getOrders,
                addOrder: addOrder,
                deleteOrder: deleteOrder,
                updateOrder: updateOrder
            }}>
                {props.children}
        </TodoContext.Provider>
    )
}