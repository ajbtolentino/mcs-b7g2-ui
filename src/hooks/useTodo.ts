import { useContext } from "react";
import { TodoContext } from "../context/todo/todoContext";

export const useTodo = () => {
    const todoContext = useContext(TodoContext);

    const addTodo = (text: string) => {
        if(todoContext.addTodo) todoContext.addTodo(text);
    }

    const updateTodo = (id: number, text: string, completed: boolean, category: string) => {
        if(todoContext.updateTodo) todoContext.updateTodo(id, text, completed, category);
    }

    const deleteTodo = (id: number) => {
        if(todoContext.deleteTodo) todoContext.deleteTodo(id);
    }

    const toggleCompleted = (id: number) => {
        if(todoContext.toggleCompleted) todoContext.toggleCompleted(id);
    }

    return {
        todos: todoContext.todos,
        loading: todoContext.loading,
        getTodos: todoContext.getTodos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleCompleted
    };
};