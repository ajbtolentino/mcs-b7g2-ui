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
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const handleError = (err: any) => {
        if(err.response?.data?.detail) setError(err.response.data.detail);
        else if(err.response?.data?.errors) setError(err.response.data.title);
        else setError(err.response.data);
    };

    const getAllItems = async () => {
        try {
            setError('');
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
            setError('');
            setLoading(true);

            const menu = await axios.get<IMenuItem[]>(FILTER_BY_CATEGORY_URL(categoryId));

            setItems([...menu.data]);
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const filterByChefRecommended = async (categoryId: number) => {
        try {
            setError('');
            setLoading(true);

            const menu = await axios.get<IMenuItem[]>(FILTER_BY_CHEF_RECOMMENDATION_URL(categoryId));

            setItems([...menu.data]);
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    return(
        <MenuContext.Provider value={{
            loading: loading,
            success: success,
            error: error,
            items: [...items],
            getAllItems: getAllItems,
            filterByCategory: filterByCategory,
            filterByChefRecommended: filterByChefRecommended
        }}>
            {props.children}
        </MenuContext.Provider>
    );
}