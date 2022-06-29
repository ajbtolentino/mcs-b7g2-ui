import { Typography, CardActions, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useOrder } from "../../../hooks/useOrder";
import { IOrderItem } from "../../../models/IOrderItem";
import { PlacedOrderItemBillout } from "./BilloutItem";

export const Billout = () => {
    const { order, loading, toggleBillout, complete, getByOrder } = useOrder();
    const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    useEffect(() => {
        if(order) {
            const orderItems = order.orderItems.filter(_ => _.status === 4 || _.status === 5) ?? [];

            setOrderItems([...orderItems]);
            setIsCompleted(order.status === 5);
        }
        else {
            setOrderItems([]);
        }
    }, [order, loading]);

    return (<>
        {
            !loading && orderItems.length === 0 && <Typography variant="subtitle1" style={{textAlign: "center"}}>No orders placed</Typography>
        }
        {
            loading && orderItems.length === 0 && <Typography variant="subtitle1" style={{textAlign: "center"}}>Loading...</Typography>
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
            order && orderItems.length > 0&& 
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
            isCompleted && <Typography className="completedLabel" style={{textAlign: "center"}} variant="subtitle1">Order has been completed</Typography>
        }
    {
        order && orderItems.length > 0 && !isCompleted &&
        <CardActions className="orderCommands" style={{alignItems: "center"}}>
            <Button disabled={loading} style={{marginTop: 5, marginBottom: 5}} fullWidth variant="contained" onClick={() => toggleBillout!()}>
                Go back
            </Button>
            <Button disabled={loading} style={{marginTop: 5, marginBottom: 5, marginLeft: 0}} fullWidth variant="contained" onClick={() => complete!()}>
                Complete Order
            </Button>
        </CardActions>
    }
    </>);
}