import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { useOrder } from "../../../hooks/useOrder";
import { IOrderItem } from "../../../models/IOrderItem";

export const PendingOrderItem: React.FC<IOrderItem> = (props: IOrderItem) => {
    const { loading, cancelItem } = useOrder();

    return (
        <Card className="orderItem">
            <CardContent>               
                <div className="orderItemStatus">
                    <Typography variant="caption" className="menuName">{props.menu.name} x {props.quantity}</Typography>
                    <Typography variant="caption">{Intl.NumberFormat('en-US', {style:"currency", currency: "Php"}).format(props.totalPrice)}</Typography>
                </div>
            </CardContent>
            <CardActions className="orderCommands">
                    <Button disabled={loading} size="small" onClick={() => cancelItem!(props.id)}>
                        Cancel
                    </Button>
                </CardActions>
        </Card>
    )
}