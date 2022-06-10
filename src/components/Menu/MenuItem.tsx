import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material"
import { IMenuItem } from "../../models/IMenuItem"

export const MenuItem: React.FC<IMenuItem> = (props: IMenuItem) => {
    const img = require(`../assets/${props.image}`);

    return (
        <>
            <Card>
                <CardHeader
                    title={props.name}
                    subheader={`Price: ${props.price}`}
                />
                <CardMedia
                    component="img"
                    height="100"
                    image={img}
                    alt={props.name}
                />
                <CardContent>
                    <Typography>Preparation Time: </Typography>
                    <Typography>Cooking Time: </Typography>
                </CardContent>
                <CardActions>
                    <Button>Add to order</Button>
                </CardActions>
            </Card>
        </>
    )
}