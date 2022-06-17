import { Button, Card, CardActions, CardContent, CardHeader, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOrder } from "../../hooks/useOrder";
import { IOrderItem } from "../../models/IOrderItem";
import { OrderItemPlaced } from "./OrderItemPlaced";

export const PlaceOrder = () => {
    const { order, loading, place } = useOrder();

    const [showPlaceOrder, setShowPlaceOrder] = useState<boolean>(false);
    const [pendingOrders, setPendingOrders] = useState<IOrderItem[]>([]);

    useEffect(() => {
        if(order) {
            const orderItems = order.orderItems ?? [];
        
            setPendingOrders(orderItems.filter(_ => !_.isPlaced));
        }
    }, [order]);

    useEffect(() => {
        setShowPlaceOrder(pendingOrders.length > 0)
    }, [pendingOrders]);

    return (
        <Card sx={{minWidth: 275}}>
            <CardHeader title="Place Order"/>
            <CardContent>
                {
                    loading && <Typography variant="subtitle1">Loading...</Typography>
                }
                { 
                    !loading && pendingOrders.map(item => 
                        {
                            return <div key={item.id}><OrderItemPlaced {...item} /></div>;
                        }
                    )
                }
                {
                    !loading && pendingOrders.length == 0 &&
                    <Typography variant="subtitle1">No pending orders</Typography>
                }
            </CardContent>
            {
                showPlaceOrder && 
                <CardActions className="orderCommands">
                    <Button fullWidth onClick={() => place!()}>
                        Place
                    </Button>
                </CardActions>
            }
        </Card>
    );
};