import { Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useMenu } from "../../hooks/useMenu";
import { IMenu } from "../../models/IMenu";
import { IMenuItem } from "../../models/IMenuItem";
import { Filters } from "./Filters";
import { MenuItem } from "./MenuItem";

export const Menu = () => {
    const { loading, items, getAllItems } = useMenu();

    useEffect(() => {
        if(getAllItems) getAllItems!();
    }, []);

    return (
        <>
            <div className="filters container">
                <Filters />
            </div>
            {
                !loading && items.length > 0 &&
                <div className="items container">
                    {items.map(item => <div key={item.id} className="menuItem"><MenuItem {...item} /></div>)}
                </div>
            }
            {
                loading && 
                <div className="loading container">
                    <CircularProgress />
                </div>
            }
        </>
    );
};