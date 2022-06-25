import React from "react";
import { IMenuItem } from "../../models/IMenuItem";

interface IMenuContext {
    loading: boolean;
    errors: string[];
    items: IMenuItem[];
    getAllItems?: () => Promise<void>;
    getAllChefRecommendedItems?: () => Promise<void>;
    filterByCategory?: (categoryId: number) => Promise<void>;
    filterByChefRecommended?: (categoryId: number) => Promise<void>;
};

export const MenuContext = React.createContext<IMenuContext>({
    loading: false,
    errors: [],
    items: [],
});