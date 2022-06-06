import { CircularProgress } from "@mui/material";
import { useTodo } from "../hooks/useTodo";
import { Dashboard } from "./Dashboard";
import { Add } from "./Todo/Add";
import { List } from "./Todo/List";

export const Todo = () => {
    const {loading} = useTodo();

    return (
    <>
        <div className="dashboard container">
            <div className="wrapper">
                <Dashboard />
            </div>
        </div>
        <div className="add container">
            <div className="wrapper">
                <Add/>
            </div>
        </div>
        <div className="list container">
            <List />
        </div>
        {
            /** Loading indicator */
            loading &&
            <div className="loading container">
                <div className="wrapper">
                    <CircularProgress />
                </div>
            </div>
        }
    </>);
};