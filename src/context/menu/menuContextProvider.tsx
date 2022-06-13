import axios from "axios";
import { useEffect, useState } from "react";
import { IMenuItem } from "../../models/IMenuItem";
import { MenuContext } from "./menuContext";

const GET_MENU_URL: string = "/Menu/GetAll";
const FILTER_BY_CATEGORY_URL = (categoryId: number): string => `/Menu/GetByCategory?category=${categoryId}`;
const FILTER_BY_CHEF_RECOMMENDATION_URL = (categoryId: number): string => `/Menu/GetChefRecommendation?category=${categoryId}`;

export const MenuContextProvider: React.FC<{}> = (props) => {
    const [items, setItems] = useState<IMenuItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);

    const handleError = (err: any) => {
        setErrors([err.response.data.detail]);
    };

    const getAllItems = async () => {
        try {
            setErrors([]);
            setLoading(true);

            const response = await axios.get<IMenuItem[]>(GET_MENU_URL);

            setItems([...response.data]);
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const filterByCategory = async (categoryId: number) => {
        try {
            setErrors([]);
            setLoading(true);

            const nonChefRecommendation = await axios.get<IMenuItem[]>(FILTER_BY_CATEGORY_URL(categoryId));
            const chefRecommendation = await axios.get<IMenuItem[]>(FILTER_BY_CHEF_RECOMMENDATION_URL(categoryId));

            setItems([...chefRecommendation.data, ...nonChefRecommendation.data]);
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    }

    return(
        <MenuContext.Provider value={{
            loading: loading,
            errors: errors,
            items: [...items],
            getAllItems: getAllItems,
            filterByCategory: filterByCategory
        }}>
            {props.children}
        </MenuContext.Provider>
    );
}