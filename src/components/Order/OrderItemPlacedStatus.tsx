import { Button, Card, CardActions, CardContent, CardHeader, Tooltip, Typography } from "@mui/material"
import { useOrder } from "../../hooks/useOrder"
import { IOrderItem } from "../../models/IOrderItem"
import { Timer } from "../Timer/Timer"

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import CheckIcon from '@mui/icons-material/Check';

export const OrderItemStatus: React.FC<IOrderItem> = (props: IOrderItem) => {
    const { getByTableNumber } = useOrder();

    const renderStatus = (status: number) => {
        switch(status) {
            case 2: return <Tooltip title="Preparing"><AccessTimeIcon fontSize="small" /></Tooltip>; 
            case 3: return <Tooltip title="Cooking"><OutdoorGrillIcon fontSize="small"/></Tooltip>;
            case 4: return <Tooltip title="Served"><CheckIcon fontSize="small"/></Tooltip>
            case 5: return "Completed";
            default: return "Error";
        }
    };

    return (
        <Card className="orderItem">
            <CardContent>               
                <div className="orderItemStatus">
                    <Typography variant="caption" className="menuName">{props.menu.name} x {props.quantity}</Typography>
                    <Typography variant="caption">{Intl.NumberFormat('en-US', {style:"currency", currency: "Php"}).format(props.totalPrice)}</Typography>
                </div>
                <div className="orderItemTimer">
                    <Typography variant="caption" className="status">{renderStatus(props.status)}</Typography>
                    {
                        (props.status === 2 || props.status === 3) &&
                            <Typography variant="caption">
                                {
                                props.remainingPreparationTime > 0 ? <Timer duration={props.remainingPreparationTime} callback={() => getByTableNumber!(1)} /> : 
                                <Timer duration={props.remainingCookingTime} callback={() => getByTableNumber!(1)} />
                                }
                            </Typography>
                    }
                </div>

            </CardContent>
        </Card>
    )
}