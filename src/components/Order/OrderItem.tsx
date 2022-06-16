import { Button, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material"
import { IOrderItem } from "../../models/IOrderItem"

export const OrderItem: React.FC<IOrderItem> = (props: IOrderItem) => {
    return (
        <Card className="orderItem" >
            <CardContent>               
                <div className="price">
                    <Typography variant="caption">{props.menu.name} </Typography>
                    <Typography variant="caption">x {props.quantity}</Typography>
                    <Typography variant="caption">={props.totalPrice}</Typography>
                </div>
                <div>
                    <Typography variant="caption">Status: {props.status}</Typography>
                </div>
            </CardContent>
            <CardActions>
                <Button variant="text" size="small">Cancel</Button>
            </CardActions>
        </Card>
    )
}