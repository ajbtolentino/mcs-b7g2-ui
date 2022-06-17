import { Button, Card, CardActions, CardContent, CardHeader, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOrder } from "../../hooks/useOrder";
import { IOrderItem } from "../../models/IOrderItem";
import { Timer } from "../Timer/Timer";
import { OrderItem } from "./OrderItem";
import { OrderItemPlaced } from "./OrderItemPlaced";
import { OrderItemStatus } from "./OrderItemStatus";

export const Order = () => {
    const { order, loading, complete } = useOrder();
    const [isBillout, setIsBillout] = useState(false);
    const [placedOrders, setPlacedOrders] = useState<IOrderItem[]>([]);
    const [remainingTime, setRemainingTime] = useState(0);

    useEffect(() => {
        if(order) {
            setRemainingTime(() => order.remainingPreparationTime + order.remainingCookingTime);
            
            const orderItems = order.orderItems ?? [];
        
            setPlacedOrders(orderItems.filter(_ => _.isPlaced));
        }
        else {
            setRemainingTime(0);
            setPlacedOrders([]);
        }
    }, [order, loading]);

    const renderStatus = () => {
        if(loading) return "Please wait...";
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
                                {isBillout && <OrderItem {...item} />}
                            </div>;
                        }
                    )
                }
                {
                    !loading && order && !isBillout &&
                    <div>
                        <Typography variant="subtitle1"><Timer duration={remainingTime} /></Typography>
                    </div>
                }
                {
                    !loading && order && isBillout &&
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