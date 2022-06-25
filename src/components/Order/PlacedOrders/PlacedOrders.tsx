import { Button, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useOrder } from "../../../hooks/useOrder";
import { IOrderItem } from "../../../models/IOrderItem";
import { Timer } from "../../Timer/Timer";
import { PlacedOrderItemStatus } from "./PlacedOrderItemStatus";

export const PlacedOrders = () => {
    const { order, loading, toggleBillout } = useOrder();
    const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);
    const [remainingTime, setRemainingTime] = useState(0);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    useEffect(() => {
        if(order) {
            const countdown = order.remainingPreparationTime + order.remainingCookingTime;
            const orderItems = order.orderItems?.filter(_ => _.status !== 1) ?? [];

            setRemainingTime(countdown);
            setOrderItems([...orderItems]);
            setIsProcessing(countdown > 0);
        }
        else {
            setRemainingTime(0);
            setOrderItems([]);
        }
    }, [order, loading]);

    return (
        <Card sx={{minWidth: 275}}>
            <CardHeader title={"Your Orders"}/>
            <CardContent>
                {
                    loading && orderItems.length === 0 && <Typography variant="subtitle1">Loading...</Typography>
                }
                {
                    !loading && orderItems.length === 0 && <Typography variant="subtitle1">No orders placed</Typography>
                }
                { 
                    orderItems.map(item => 
                        {
                            return <div key={item.id}><PlacedOrderItemStatus {...item} /></div>
                        })
                }
                {
                    order && isProcessing && remainingTime > 0 &&
                    <div>
                        <Typography variant="subtitle1">Orders served in <Timer duration={remainingTime} /></Typography>
                    </div>
                }
                {
                    order && !isProcessing && orderItems.length > 0 &&
                    <div>
                        <Typography variant="subtitle1">Orders have been served</Typography>
                    </div>
                }
            </CardContent>
            {
                orderItems.length > 0 && !order?.isCompleted &&
                <CardActions className="orderCommands">
                    <Button disabled={loading || isProcessing} fullWidth variant="contained" onClick={() => toggleBillout!()}>
                        Bill-out
                    </Button>
                </CardActions>
            }
        </Card>
    );
};