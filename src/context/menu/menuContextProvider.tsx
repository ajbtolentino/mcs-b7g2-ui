import axios from "axios";
import { useEffect, useState } from "react";
import { IMenuItem } from "../../models/IMenuItem";
import { MenuContext } from "./menuContext";

const GET_MENU_URL: string = "https://localhost:5001/Menu/GetAll";
const FILTER_BY_CATEGORY_URL: string = "https://localhost:5001/";
const FILTER_BY_CHEF_RECOMMENDATION_URL = (id: number): string => `https://localhost:5001/`;

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

    const filterBy = () => {
        
    }

    return(
        <MenuContext.Provider value={{
            loading: loading,
            errors: errors,
            items: [...items],
            getAllItems: getAllItems
        }}>
            {props.children}
        </MenuContext.Provider>
    );
}