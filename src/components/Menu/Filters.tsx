import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import { useMenu } from "../../hooks/useMenu"

import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import IcecreamIcon from '@mui/icons-material/Icecream';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import { green } from "@mui/material/colors";
import { useEffect, useState } from "react";

export const Filters = () => {
    const { getAllItems, filterByCategory, filterByChefRecommended } = useMenu();
    const [category, setCategory] = useState<number>();
    const [chefRecommendedOnly, setChefRecommendedOnly] = useState<boolean>(false);

    const onCheck = () => {
        setChefRecommendedOnly(!chefRecommendedOnly);
    };

    useEffect(() => {
        if(category){
            if(chefRecommendedOnly) filterByChefRecommended!(category);
            else if(category) filterByCategory!(category);
        }
        else getAllItems!();
    }, [chefRecommendedOnly, category]);

    const getAll = () => {
        setChefRecommendedOnly(false);
        setCategory(undefined);
    };

    return (
        <>
            <Button variant="outlined" onClick={() => getAll()}>Show All</Button>
            <Button variant="outlined" onClick={() => setCategory(1)}><SoupKitchenIcon />Appetizers</Button>
            <Button variant="outlined" onClick={() => setCategory(2)}><RestaurantMenuIcon />Main Courses</Button>
            <Button variant="outlined" onClick={() => setCategory(3)}><IcecreamIcon />Desserts</Button>
            <Button variant="outlined" onClick={() => setCategory(4)}><FreeBreakfastIcon />Drinks</Button>
            <FormGroup>
                <FormControlLabel className="chefRecommended" sx={{color: "#ffb80e", '&.Mui-checked': {color: green}}} 
                    control={<Checkbox checked={chefRecommendedOnly} onChange={onCheck} disabled={!category} />} label="Chef Recommended Only" />
            </FormGroup>
        </>
    )
};