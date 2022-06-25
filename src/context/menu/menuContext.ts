import React from "react";
import { IMenuItem } from "../../models/IMenuItem";

interface IMenuContext {
    loading: boolean;
    success: string;
    error: string;
    items: IMenuItem[];
    getAllItems?: () => Promise<void>;
    getAllChefRecommendedItems?: () => Promise<void>;
    filterByCategory?: (categoryId: number) => Promise<void>;
    filterByChefRecommended?: (categoryId: number) => Promise<void>;
};

export const MenuContext = React.createContext<IMenuContext>({
    loading: false,
    success: '',
    error: '',
    items: [],
});