import { Button } from "@mui/material"
import { useMenu } from "../../hooks/useMenu"

import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import IcecreamIcon from '@mui/icons-material/Icecream';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';

export const Filters = () => {
    const {getAllItems, filterByCategory} = useMenu();

    return (
        <>
            <Button variant="outlined" onClick={() => getAllItems!()}>All</Button>
            <Button variant="outlined" onClick={() => filterByCategory!(1)}><FreeBreakfastIcon />Drinks</Button>
            <Button variant="outlined" onClick={() => filterByCategory!(2)}><IcecreamIcon />Dessert</Button>
            <Button variant="outlined" onClick={() => filterByCategory!(3)}><RestaurantMenuIcon />Main</Button>
            <Button variant="outlined" onClick={() => filterByCategory!(4)}><DinnerDiningIcon />Pasta</Button>
        </>
    )
}