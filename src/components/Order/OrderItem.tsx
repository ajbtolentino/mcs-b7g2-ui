import { Button, Card, CardActions, CardContent } from "@mui/material"
import { IOrderItem } from "../../models/IOrderItem"

export const OrderItem: React.FC<IOrderItem> = (props: IOrderItem) => {
    return (
        <Card className="orderItem">
            <CardContent>
                <div>Name: {props.name}</div>
                <div>Preparation Time: {props.preparationTime}</div>
                <div>Cooking Time: {props.preparationTime}</div>
                <div>Quantity: {props.quantity}</div>
                <div>Price: {props.price}</div>
            </CardContent>
            <CardActions>
                <Button>Cancel</Button>
            </CardActions>
        </Card>
    )
}