import { Typography } from "@mui/material"
import { IOrderItem } from "../../models/IOrderItem"

export const PlacedOrderItem: React.FC<IOrderItem> = (props: IOrderItem) => {
    return (
        <div className="orderItem price">
            <Typography variant="caption">{props.menu.name} </Typography>
            <Typography variant="caption">x {props.quantity}</Typography>
            <Typography variant="caption">={props.totalPrice}</Typography>
        </div>
    )
}