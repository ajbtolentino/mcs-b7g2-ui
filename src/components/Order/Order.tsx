import { Button, Card, CardActions, CardContent, CardHeader, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOrder } from "../../hooks/useOrder";
import { Timer } from "../Timer/Timer";
import { OrderItem } from "./OrderItem";
import { OrderItemStatus } from "./OrderItemStatus";

export const Order = () => {
    const navigate = useNavigate();

    const { order, place, getById, complete } = useOrder();
    const { orderId } = useParams();

    const [isBillout, setIsBillout] = useState(false);
    const [showStatus, setShowStatus] = useState(false);

    const [remainingTime, setRemainingTime] = useState(0);


    useEffect(() => {
        if(orderId) getById!(+orderId);
    }, [orderId]);

    useEffect(() => {
        if(!order) navigate("/");
        else navigate(`/${order.id}`);
        if(order) setRemainingTime(() => order.remainingPreparationTime + order.remainingCookingTime);
    }, [order]);

    const renderStatus = () => {
        if(!order) return "Place an order to start...";
        if(order?.orderItems?.length == 0) return "Select an item from the menu..."

        switch(order.status) {
            case 1: return `Preparing...`; 
            case 2: return `Cooking...`;
            case 3:
            case 4: return "Completed...";
            default: return "Error";
        }
    };

    const onCompleteOrder = () => {
        setIsBillout(false);
        complete!();
    }

    return (
        <Card sx={{minWidth: 275}}>
            <CardHeader title={renderStatus()}/>
            <CardContent>
                {
                    !order && 
                    <Button fullWidth onClick={() => place!()}>
                        Place Order
                    </Button>
                }
                {
                    order && !isBillout &&
                    <div>
                        <Typography variant="subtitle1"><Timer duration={remainingTime} /></Typography>
                    </div>
                }
                { 
                    order?.orderItems.map(item => 
                        {
                            return <div key={item.id}>
                                {!isBillout && <OrderItemStatus {...item} />}
                                {isBillout && <OrderItem {...item} />}
                            </div>;
                        }
                    )
                }
                {
                    order && isBillout &&
                    <div  className="orderItem totalBill">
                        <div className="billPrice">
                            <Typography variant="caption">Inclusive Tax</Typography>
                            <Typography variant="caption">{order?.inclusiveTax}</Typography>
                        </div>
                        <div className="billPrice">
                            <Typography variant="caption">Service Charge</Typography>
                            <Typography variant="caption">{order?.serviceCharge}</Typography>
                        </div>
                        <div className="billPrice totalBillPrice">
                            <Typography variant="caption">Total Bill</Typography>
                            <Typography variant="caption">{order?.totalBill}</Typography>
                        </div>
                    </div>
                }
            </CardContent>
            {
                order?.orderItems && order?.orderItems?.length > 0 && 
                <CardActions className="orderCommands">
                    {
                        isBillout &&
                        <Button sx={{width:1}} variant="contained" onClick={onCompleteOrder}>
                            Complete Order
                        </Button>
                    }
                    {
                        !isBillout &&
                        <Button sx={{width:1}} variant="contained" onClick={() => setIsBillout(true)}>
                            Bill-out
                        </Button>
                    }
                </CardActions>
            }
        </Card>
    );
};