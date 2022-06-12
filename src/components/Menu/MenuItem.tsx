import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Icon, Tooltip, Typography } from "@mui/material"
import { red } from "@mui/material/colors";
import { useState } from "react";
import { IMenuItem } from "../../models/IMenuItem"
import StarIcon from '@mui/icons-material/Star';

export const MenuItem: React.FC<IMenuItem> = (props: IMenuItem) => {
    return (
        <Card variant="outlined">
            <CardHeader
                title={<Typography variant="body1">{props.name}</Typography>}
                subheader={<Typography variant="body2">{props.description}</Typography>}
                avatar={props.chefRecommendation && 
                    <Tooltip title="Chef's recommended">
                        <StarIcon color="error" fontSize="large" />
                    </Tooltip>
                }
            />
            <CardMedia
                component="img"
                height="100"
                image={`/menu/${props.id}.jpg`}
                alt={props.name}
            />
            <CardContent>
                <Typography variant="body2">{props.itemPrice}</Typography>  
                <Typography variant="caption" color="text.secondary">Category: {props.category}</Typography><br />
                <Typography variant="caption" color="text.secondary">Preparation Time: {props.prepTimeInSec}</Typography><br />
                <Typography variant="caption" color="text.secondary">Cooking Time: {props.cookTimeInSec}</Typography>
            </CardContent>
            <CardActions>
                <Button>Add</Button>
            </CardActions>
        </Card>
    )
}