import axios from "axios";
import { useEffect, useState } from "react";
import { ITodo } from "../../models/ITodo";
import { TodoContext } from "./todoContext";

const GET_URL: string = "https://localhost:5001/api/Todo/";
const POST_URL: string = "https://localhost:5001/api/Todo/";
const PUT_URL = (id: number): string => `https://localhost:5001/api/Todo/${id}`;
const DELETE_URL = (id: number): string => `https://localhost:5001/api/Todo/${id}`;

interface ITodoModel {
    id: number;
    text: string;
    completed: boolean;
    createdBy: string;
    dateCreated: Date;
}

export const TodoContextProvider: React.FC<{}> = (props) => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);

    const handleError = (err: any) => {
        setErrors(["Something went wrong. Please try again."]);
    };

    const getTodos = async () => {
        try {
            setErrors([]);
            setLoading(true);

            const response = await axios.get<ITodoModel[]>(GET_URL);

            const items: ITodo[] = response.data.map(d => {
                return {
                    id: d.id,
                    text: d.text,
                    completed: d.completed
                };});

            setTodos([...items]);
        } catch (err: any) {
            handleError(err);
        } finally {
            setTimeout(() => setLoading(false), 5000);
        }
    };

    const addTodo = async (text: string) => {
        try {
            setErrors([]);
            setLoading(true);

            await axios.post(POST_URL, { "text": text },
            {
                headers: { "Content-Type": "application/json" }
            });
        } catch (err: any) {
            handleError(err);
        } finally {
            setTimeout(() => setLoading(false), 5000);

            await getTodos!();
        }
    };

    const deleteTodo = async (id: number) => {
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

            await getTodos!();
        }
    };

    const updateTodo = async (id: number, 
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

            await getTodos!();
        }
    };

    const toggleCompleted = (id: number) => {
        const updatedTasks = todos.map(task => {
            if(task.id !== id) return task;

            return {
                ...task,
                completed: !task.completed
            };
        });

        setTodos([...updatedTasks]);
    };
      
    return(
        <TodoContext.Provider
            value={{
                todos: todos,
                loading: loading,
                errors: errors,
                getTodos: getTodos,
                addTodo: addTodo,
                deleteTodo: deleteTodo,
                updateTodo: updateTodo,
                toggleCompleted: toggleCompleted
            }}>
                {props.children}
        </TodoContext.Provider>
    )
}