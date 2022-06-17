import { Button, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material"
import { IOrderItem } from "../../models/IOrderItem"
import { Timer } from "../Timer/Timer"

export const OrderItemStatus: React.FC<IOrderItem> = (props: IOrderItem) => {
    const renderStatus = (status: number) => {
        switch(status) {
            case 2: return `Preparing...`; 
            case 3: return `Cooking...`;
            case 4: return "Served..."
            case 5: return "Completed...";
            default: return "Error";
        }
    };

    return (
        <Card className="orderItem">
            <CardContent>               
                <div className="orderItemStatus">
                    <Typography variant="caption">{props.menu.name} </Typography>
                    <Typography variant="caption">x {props.quantity}</Typography>
                    <Typography variant="caption">= {props.totalPrice}</Typography>
                </div>
                <div>
                    <Typography variant="caption">{renderStatus(props.status)}</Typography>
                </div>
                <div>
                    <Typography variant="caption"><Timer duration={props.remainingCookingTime + props.remainingPreparationTime} /></Typography>
                </div>
            </CardContent>
        </Card>
    )
}