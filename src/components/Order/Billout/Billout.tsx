import { Card, CardHeader, CardContent, Typography, CardActions, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useOrder } from "../../../hooks/useOrder";
import { IOrderItem } from "../../../models/IOrderItem";
import { PlacedOrderItemBillout } from "./BilloutItem";

export const Billout = () => {
    const { order, loading, toggleBillout, complete } = useOrder();
    const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    useEffect(() => {
        if(order) {
            const orderItems = order.orderItems ?? [];

            setOrderItems([...orderItems]);
            setIsCompleted(order.status === 5);
        }
        else {
            setOrderItems([]);
        }
    }, [order, loading]);

    return (
        <Card sx={{minWidth: 275}}>
            <CardHeader title={"Your Bill"}/>
            <CardContent>
                {
                    !loading && orderItems.length === 0 && <Typography variant="subtitle1">No orders placed</Typography>
                }
                {
                    loading && orderItems.length === 0 && <Typography variant="subtitle1">Loading...</Typography>
                }
                { 
                    orderItems.map(item => 
                        {
                            return <div key={item.id}>
                                <PlacedOrderItemBillout {...item} />
                            </div>;
                        }
                    )
                }
                {
                    order &&
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
                {
                    isCompleted && <Typography className="completedLabel" variant="subtitle1">Order has been completed</Typography>
                }
            </CardContent>
            {
                orderItems.length > 0 && !order?.isCompleted &&
                <CardActions className="orderCommands">
                    {
                        !isCompleted &&
                        <>
                            <Button disabled={loading} fullWidth variant="contained" onClick={() => toggleBillout!()}>
                                Go back
                            </Button>
                            <Button disabled={loading} fullWidth variant="contained" onClick={() => complete!()}>
                                Complete Order
                            </Button>
                        </>
                    }
                </CardActions>
            }
        </Card>
    );
}