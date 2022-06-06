import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useTodo } from "../../hooks/useTodo";

export const Add = () => {
    const { addTodo: addTask } = useTodo();
    
    const [text, setText] = useState<string>('');

    const onChangeTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        addTask(text);

        setText("");
    };

    return(
    <form onSubmit={onFormSubmit}>
        <TextField  autoComplete="off" 
                    fullWidth
                    size={"small"}
                    value={text} 
                    variant={"outlined"} 
                    placeholder="Create new task..."
                    onChange={onChangeTextHandler} />
    </form>
    );
};