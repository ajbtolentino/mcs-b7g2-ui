import { Button, Card, CardActions, CardContent, CardHeader } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOrder } from "../../hooks/useOrder";
import { OrderItem } from "./OrderItem";

export const Order = () => {
    const { order, place, getById, complete } = useOrder();
    const { orderId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(orderId) getById!(+orderId);
    }, [orderId]);

    useEffect(() => {
        if(!order) navigate("/");
        else navigate(`/${order.id}`);
    }, [order]);

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
                    order?.orderItems.map(item => <div key={item.id}><OrderItem {...item} /></div>)
                }
            </CardContent>
            {
                order?.orderItems && order?.orderItems?.length > 0 && 
                <CardActions>
                    <Button sx={{width:1}} variant="contained" onClick={() => complete!()}>
                        Complete Order
                    </Button>
                </CardActions>
            }
        </Card>
    );
};