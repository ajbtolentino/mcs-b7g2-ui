import { useEffect } from "react";
import { useTodo } from "../../hooks/useTodo";
import { Details } from "./Details";

export const List = () => {
    const { getTodos, todos, loading } = useTodo();

    /** Load todos when component loads */
    useEffect(() => {
        getTodos!();
    }, []);

    return(
    <>
        {
            /** Load all tasks if there are any */
            todos.length > 0 && 
            todos.map(todo => 
                <div key={todo.id} className="todo">
                    <Details {...todo} />
                </div>)
        }
        {
            /** Show an empty message */
            !loading && !todos.length && <h2 style={{textAlign: "center"}}>You don't have any tasks!</h2>
        }
    </>
    );
};