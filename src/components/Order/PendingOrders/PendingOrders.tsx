import { Button, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useOrder } from "../../../hooks/useOrder";
import { IOrderItem } from "../../../models/IOrderItem";
import { PendingOrderItem } from "./PendingOrderItem";

export const PendingOrders = () => {
    const { order, loading, place } = useOrder();
    const [showPlaceOrder, setShowPlaceOrder] = useState<boolean>(false);
    const [pendingOrders, setPendingOrders] = useState<IOrderItem[]>([]);

    useEffect(() => {
        if(order) {
            const orderItems = order.orderItems ?? [];
        
            setPendingOrders(orderItems.filter(_ => _.status === 1));
        }
    }, [order]);

    useEffect(() => {
        setShowPlaceOrder(pendingOrders.length > 0)
    }, [pendingOrders]);

    return (
        <Card sx={{minWidth: 275}}>
            <CardHeader title="Pending Orders"/>
            <CardContent>
                {
                    !loading && pendingOrders.length === 0 &&
                    <Typography variant="subtitle1">No pending orders</Typography>
                }
                {
                    loading && pendingOrders.length === 0 && 
                    <Typography variant="subtitle1">Loading...</Typography>
                }
                { 
                    pendingOrders.map(item => 
                        {
                            return <div key={item.id}><PendingOrderItem {...item} /></div>;
                        }
                    )
                }
            </CardContent>
            {
                showPlaceOrder && 
                <CardActions className="orderCommands">
                    <Button disabled={loading} fullWidth onClick={() => place!()}>
                        Place
                    </Button>
                </CardActions>
            }
        </Card>
    );
};