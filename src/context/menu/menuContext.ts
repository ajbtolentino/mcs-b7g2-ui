import React from "react";
import { IMenuItem } from "../../models/IMenuItem";

interface IMenuContext {
    loading: boolean;
    errors: string[];
    items: IMenuItem[];
    getAllItems?: () => Promise<void>;
};

export const MenuContext = React.createContext<IMenuContext>({
    loading: false,
    errors: [],
    items: [],
});