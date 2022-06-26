import { Button, Card, CardContent, CardHeader, Stack } from "@mui/material";
import { useOrder } from "../../hooks/useOrder";

export const ChefRecommended = () => {
    const { addRecommended, addAllRecommended } = useOrder();

    return (<>
        <Button style={{margin: 5}} fullWidth onClick={() => addAllRecommended!()}>Add All Recommended</Button>
        <Button style={{margin: 5}} fullWidth onClick={() => addRecommended!(1)}>Add Appetizer</Button>
        <Button style={{margin: 5}} fullWidth onClick={() => addRecommended!(2)}>Add Main</Button>
        <Button style={{margin: 5}} fullWidth onClick={() => addRecommended!(3)}>Add Dessert</Button>
        <Button style={{margin: 5}} fullWidth onClick={() => addRecommended!(4)}>Add Drink</Button>
        </>);
}