import { useState } from "react";
import { IMenuItem } from "../../models/IMenuItem";
import { Menu } from "../Menu/Menu";
import { Order } from "../Order/Order";

export const Dashboard = () => {
    return (
        <div className="dashboard container">
            <div className="menu container">
                <Menu />
            </div>
            <div className="order container">
                <Order  />
            </div>
        </div>
    )
};