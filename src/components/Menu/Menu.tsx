import { useState } from "react";
import { IMenu } from "../../models/IMenu";
import { IMenuItem } from "../../models/IMenuItem";
import { MenuItem } from "./MenuItem";

export const Menu = () => {
    const [menuItems, setMenuItems] = useState<IMenuItem[]>([
        { id: 1, name: "Item 1", price: 123, image: "paella.jpg" },
        { id: 2, name: "Item 2", price: 123, image: "paella.jpg" },
        { id: 3, name: "Item 3", price: 123, image: "paella.jpg" },
        { id: 4, name: "Item 4", price: 123, image: "paella.jpg" },
        { id: 5, name: "Item 5", price: 123, image: "paella.jpg" },
        { id: 6, name: "Item 6", price: 123, image: "paella.jpg" },
        { id: 7, name: "Item 7", price: 123, image: "paella.jpg" },
        { id: 8, name: "Item 8", price: 123, image: "paella.jpg" },
        { id: 9, name: "Item 9", price: 123, image: "paella.jpg" },
        { id: 10, name: "Item 10", price: 123, image: "paella.jpg" },
        { id: 11, name: "Item 11", price: 123, image: "paella.jpg" },
    ])

    return (
        <>
            {
                menuItems.map(item => <div key={item.id} className="menuItem"><MenuItem {...item} /></div>)
            }
        </>
    );
};