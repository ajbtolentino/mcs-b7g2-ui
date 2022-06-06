import React from "react";
import { ITodo } from "../../models/ITodo";

interface ITodoContext {
    todos: ITodo[];
    loading: boolean;
    errors: string[];
    getTodos?: () => Promise<void>;
    addTodo?: (text: string) => Promise<void>;
    deleteTodo?: (id: number) => Promise<void>;
    updateTodo?: (id: number, text: string, completed: boolean, category: string) => Promise<void>;
    toggleCompleted?: (id: number) => void;
};

export const TodoContext = React.createContext<ITodoContext>({
    todos: [],
    loading: false,
    errors: []
});