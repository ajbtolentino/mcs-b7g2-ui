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

    return (<>
                {
                    loading && orderItems.length === 0 && <Typography variant="subtitle1" style={{textAlign: "center"}}>Loading...</Typography>
                }
                {
                    !loading && orderItems.length === 0 && <Typography variant="subtitle1" style={{textAlign: "center"}}>No orders placed</Typography>
                }
                { 
                    orderItems.map(item => 
                        {
                            return <div key={item.id}><PlacedOrderItemStatus {...item} /></div>
                        })
                }
                {
                    order && isProcessing && remainingTime > 0 &&
                        <Typography variant="subtitle1" style={{textAlign: "center"}}>Orders served in <Timer duration={remainingTime} /></Typography>
                }
                {
                    order && !isProcessing && orderItems.length > 0 &&
                    <Typography style={{textAlign: "center"}} variant="subtitle1">Orders have been served</Typography>
                }
            {
                orderItems.length > 0 && order?.status !== 5 &&
                <CardActions className="orderCommands">
                    <Button disabled={loading || isProcessing} fullWidth variant="contained" onClick={() => toggleBillout!()}>
                        Bill-out
                    </Button>
                </CardActions>
            }
    </>);
};