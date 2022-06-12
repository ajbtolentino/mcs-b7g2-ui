import { useContext } from "react";
import { MenuContext } from "../context/menu/menuContext";

export const useMenu = () => {
    return useContext(MenuContext);
}