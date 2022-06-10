import { Button, Card, CardActions, CardContent, CardHeader } from "@mui/material";
import { IOrder } from "../../models/IOrder";
import { IOrderItem } from "../../models/IOrderItem";
import { OrderItem } from "./OrderItem";

export const Order = () => {
    const orderItems: IOrderItem[] = [
        {id: 1, name: "Item 1", preparationTime: 100, cookingTime: 100, price: 100, quantity: 10 },
        {id: 2, name: "Item 2", preparationTime: 100, cookingTime: 100, price: 100, quantity: 10 },
        {id: 3, name: "Item 3", preparationTime: 100, cookingTime: 100, price: 100, quantity: 10 },
        {id: 4, name: "Item 4", preparationTime: 100, cookingTime: 100, price: 100, quantity: 10 }
    ];

    return (
        <Card>
            <CardHeader
                    title="Customer Name"
                    // subheader={`Price: ${props.price}`}
            />
            <CardContent>
                {
                    orderItems.map(item => <div key={item.id}><OrderItem {...item} /></div>)
                }
                <div>Total Bill</div>
            </CardContent>
            <CardActions>
                <Button>Bill Out</Button>
            </CardActions>
        </Card>
    );
};