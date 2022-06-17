import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Tooltip, Typography } from "@mui/material"
import { IMenuItem } from "../../models/IMenuItem"
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import IcecreamIcon from '@mui/icons-material/Icecream';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import { useOrder } from "../../hooks/useOrder";

export const MenuItem: React.FC<IMenuItem> = (props: IMenuItem) => {
    const { order, addOrderItem } = useOrder();

    const renderCategory = () => {
        switch(props.category) {
            case 1:
                return <Tooltip title="Appetizer"><SoupKitchenIcon fontSize="small"/></Tooltip>;
            case 2:
                return <Tooltip title="Main Course"><RestaurantMenuIcon fontSize="small"/></Tooltip>;
            case 3:
                return <Tooltip title="Dessert"><IcecreamIcon fontSize="small"/></Tooltip>;
            case 4:
                return <Tooltip title="Drink"><FreeBreakfastIcon fontSize="small"/></Tooltip>;
            default:
                return "";
        };
    };

    return (
        <Card variant="outlined">
            <CardHeader
                title={<Typography variant="body1">{props.name}</Typography>}
                avatar={props.chefRecommendation && 
                    <Tooltip title="Chef's recommended">
                        <WhatshotOutlinedIcon />
                    </Tooltip>
                }
            />
            <CardMedia
                component="img"
                height="100"
                image={`/menu/${props.category}.jpg`}
                alt={props.name}
            />
            <CardContent>
                <div className="description">
                    <Typography variant="body2">{props.description}</Typography>  
                </div>
                <div className="price">
                    <Typography variant="body2">{props.itemPrice}</Typography>  
                </div>
                <div className="details">
                    <Typography variant="caption" color="text.secondary">
                        {renderCategory()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        <Tooltip title="Preparation Time"><span><AccessTimeIcon fontSize="small" /> {props.prepTimeInSec}</span></Tooltip>
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        <Tooltip title="Preparation Time"><span><OutdoorGrillIcon fontSize="small" /> {props.cookTimeInSec}</span></Tooltip>
                    </Typography>
                </div>
            </CardContent>
            <CardActions>
                <Button variant="contained" fullWidth onClick={() => addOrderItem!(props.id, 1)}>Add</Button>
            </CardActions>
        </Card>
    )
}