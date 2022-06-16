import { Button } from "@mui/material"
import { useMenu } from "../../hooks/useMenu"

import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import IcecreamIcon from '@mui/icons-material/Icecream';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';

export const Filters = () => {
    const {getAllItems, filterByCategory} = useMenu();

    return (
        <>
            <Button variant="outlined" onClick={() => getAllItems!()}>Show All</Button>
            <Button variant="outlined" onClick={() => filterByCategory!(1)}><SoupKitchenIcon />Appetizers</Button>
            <Button variant="outlined" onClick={() => filterByCategory!(2)}><RestaurantMenuIcon />Main Courses</Button>
            <Button variant="outlined" onClick={() => filterByCategory!(3)}><FreeBreakfastIcon />Drinks</Button>
            <Button variant="outlined" onClick={() => filterByCategory!(4)}><IcecreamIcon />Desserts</Button>
        </>
    )
}