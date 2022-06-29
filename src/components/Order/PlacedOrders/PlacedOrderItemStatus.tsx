import { Card, CardContent,Tooltip, Typography } from "@mui/material";
import { useOrder } from "../../../hooks/useOrder";
import { IOrderItem } from "../../../models/IOrderItem";
import { Timer } from "../../Timer/Timer";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from "react";

export const PlacedOrderItemStatus: React.FC<IOrderItem> = (props: IOrderItem) => {
    const { getByTableNumber } = useOrder();
    const [countdown, setCountdown] = useState<number>(0);

    useEffect(() => {
        if(props.remainingPreparationTime) setCountdown(props.remainingPreparationTime);
        else if(props.remainingCookingTime) setCountdown(props.remainingCookingTime);
    }, [props]);

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
        <Card className="orderItem" style={{marginBottom: 5}}>
            <CardContent>               
                <div className="orderItemStatus">
                    <Typography variant="caption" className="menuName">{props.menu.name} x {props.quantity}</Typography>
                    <Typography variant="caption">{Intl.NumberFormat('en-US', {style:"currency", currency: "Php"}).format(props.totalPrice)}</Typography>
                </div>
                <div className="orderItemTimer">
                    <Typography variant="caption" className="status" style={{textAlign: "center"}}>{renderStatus(props.status)}</Typography>
                    {
                        countdown > 0 &&
                        <Typography variant="caption">
                            <Timer duration={countdown} callback={() => getByTableNumber!()} />
                        </Typography>
                    }
                </div>

            </CardContent>
        </Card>
    )
}