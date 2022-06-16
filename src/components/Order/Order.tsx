import { Button, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOrder } from "../../hooks/useOrder";
import { OrderItem } from "./OrderItem";

export const Order = () => {
    const { order, place, getById, complete } = useOrder();
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [isBillout, setIsBillout] = useState(false);

    useEffect(() => {
        if(orderId) getById!(+orderId);
    }, [orderId]);

    useEffect(() => {
        if(!order) navigate("/");
        else navigate(`/${order.id}`);
    }, [order]);

    const renderStatus = (status: number) => {
        if(!order?.orderItems?.length) return "Select from the menu to start..."

        switch(status) {
            case 0: return "Preparing...";
            case 1: return "Cooking...";
            case 2: return "Served...";
            default: return "Error";
        }
    };

    const onCompleteOrder = () => {
        setIsBillout(false);
        complete!();
    }

    return (
        <Card sx={{minWidth: 275}}>
            <CardHeader title="Table #1" />
            <CardContent>
                {
                    !order && 
                    <Button type={"submit"} sx={{width:1}} variant="contained" onClick={() => place!()}>
                        Place Order
                    </Button>
                }
                { 
                    isBillout &&
                    order?.orderItems.map(item => <div key={item.id}><OrderItem {...item} /></div>)
                }
                {
                    order && !isBillout &&
                    <Typography variant="body1">{renderStatus(order?.status)}</Typography>
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
                <CardActions>
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