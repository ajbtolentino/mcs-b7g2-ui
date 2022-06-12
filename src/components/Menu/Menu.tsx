import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useMenu } from "../../hooks/useMenu";
import { IMenu } from "../../models/IMenu";
import { IMenuItem } from "../../models/IMenuItem";
import { MenuItem } from "./MenuItem";

export const Menu = () => {
    const { loading, items, getAllItems } = useMenu();

    useEffect(() => {
        if(getAllItems) getAllItems!();
    }, []);

    return (
        <>
            {
               !loading && 
               items.map(item => <div key={item.id} className="menuItem"><MenuItem {...item} /></div>)
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