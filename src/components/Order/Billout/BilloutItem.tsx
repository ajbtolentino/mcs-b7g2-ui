import { Typography } from "@mui/material"
import { IOrderItem } from "../../../models/IOrderItem"

export const PlacedOrderItemBillout: React.FC<IOrderItem> = (props: IOrderItem) => {
    return (
        <div className="orderItem price">
            <Typography variant="caption">{props.menu.name} x {props.quantity} </Typography>
            <Typography variant="caption">{Intl.NumberFormat('en-US', {style:"currency", currency: "Php"}).format(props.totalPrice)}</Typography>
        </div>
    )
}