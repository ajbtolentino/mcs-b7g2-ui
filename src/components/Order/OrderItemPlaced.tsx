import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { useOrder } from "../../hooks/useOrder";
import { IOrderItem } from "../../models/IOrderItem"

export const OrderItemPlaced: React.FC<IOrderItem> = (props: IOrderItem) => {
    const { cancelItem } = useOrder();

    return (
        <Card className="orderItem">
            <CardContent>               
                <div className="orderItemStatus">
                    <Typography variant="caption">{props.menu.name} </Typography>
                    <Typography variant="caption">x {props.quantity}</Typography>
                    <Typography variant="caption">= {props.totalPrice}</Typography>
                </div>
            </CardContent>
            <CardActions className="orderCommands">
                    <Button size="small" onClick={() => cancelItem!(props.id)}>
                        Cancel
                    </Button>
                </CardActions>
        </Card>
    )
}