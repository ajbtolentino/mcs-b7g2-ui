import { Button, Card, CardActions, CardContent, CardHeader, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useOrder } from "../../hooks/useOrder";
import { IOrderItem } from "../../models/IOrderItem";
import { Timer } from "../Timer/Timer";
import { PlacedOrderItem } from "./PlacedOrderItem";
import { OrderItemStatus } from "./OrderItemPlacedStatus";

export const PlacedOrders = () => {
    const { order, loading, complete } = useOrder();
    const [isBillout, setIsBillout] = useState(false);
    const [placedOrders, setPlacedOrders] = useState<IOrderItem[]>([]);
    const [remainingTime, setRemainingTime] = useState(0);

    useEffect(() => {
        if(order) {
            setRemainingTime(order.remainingPreparationTime + order.remainingCookingTime);
            
            const orderItems = order.orderItems ?? [];
        
            setPlacedOrders(orderItems.filter(_ => _.status !== 1));
        }
        else {
            setRemainingTime(0);
            setPlacedOrders([]);
        }
    }, [order, loading]);

    const onCompleteOrder = () => {
        setIsBillout(false);
        complete!();
    }

    return (
        <Card sx={{minWidth: 275}}>
            <CardHeader title="Your Bill"/>
            <CardContent>
                {
                    loading && <Typography variant="subtitle1">Loading...</Typography>
                }
                {
                    !loading && placedOrders.length == 0 && <Typography variant="subtitle1">No orders placed</Typography>
                }
                { 
                    !loading && placedOrders.map(item => 
                        {
                            return <div key={item.id}>
                                {!isBillout && <OrderItemStatus {...item} />}
                                {isBillout && <PlacedOrderItem {...item} />}
                            </div>;
                        }
                    )
                }
                {
                    !loading && order && !isBillout && remainingTime > 0 && 
                    <div>
                        <Typography variant="subtitle1">Orders served in <Timer duration={remainingTime} /></Typography>
                    </div>
                }
                {
                    !loading && order && isBillout &&
                    <div  className="orderItem totalBill">
                        <div className="billPrice">
                            <Typography variant="caption">Inclusive Tax</Typography>
                            <Typography variant="caption">{Intl.NumberFormat('en-US', {style:"currency", currency: "Php"}).format(order?.inclusiveTax)}</Typography>
                        </div>
                        <div className="billPrice">
                            <Typography variant="caption">Service Charge</Typography>
                            <Typography variant="caption">{Intl.NumberFormat('en-US', {style:"currency", currency: "Php"}).format(order?.serviceCharge)}</Typography>
                        </div>
                        <div className="billPrice totalBillPrice">
                            <Typography variant="caption">Total Bill</Typography>
                            <Typography variant="caption">{Intl.NumberFormat('en-US', {style:"currency", currency: "Php"}).format(order?.totalBill)}</Typography>
                        </div>
                    </div>
                }
            </CardContent>
            {
                placedOrders.length > 0 && 
                <CardActions className="orderCommands">
                    {
                        !loading && isBillout &&
                        <Button sx={{width:1}} variant="contained" onClick={() => setIsBillout(false)}>
                            Go back
                        </Button>
                    }                    {
                        !loading && isBillout &&
                        <Button sx={{width:1}} variant="contained" onClick={onCompleteOrder}>
                            Complete Order
                        </Button>
                    }
                    {
                        !loading && !isBillout &&
                        <Button sx={{width:1}} variant="contained" onClick={() => setIsBillout(true)}>
                            Bill-out
                        </Button>
                    }
                </CardActions>
            }
        </Card>
    );
};