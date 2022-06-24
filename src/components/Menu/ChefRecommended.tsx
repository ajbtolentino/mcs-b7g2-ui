import { Button, Card, CardActions, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import { useOrder } from "../../hooks/useOrder";

export const ChefRecommended = () => {
    const { addRecommended, addAllRecommended } = useOrder();

    return (
    <Card sx={{maxWidth: 275}}>
        <CardHeader title="Chef Recommendations" />
            <CardContent className="actions">
                <Stack>
                    <Button fullWidth onClick={() => addRecommended!(1)}>Add Appetizer</Button>
                    <Button fullWidth onClick={() => addRecommended!(2)}>Add Main</Button>
                    <Button fullWidth onClick={() => addRecommended!(3)}>Add Dessert</Button>
                    <Button fullWidth onClick={() => addRecommended!(4)}>Add Drink</Button>
                    <Button fullWidth onClick={() => addAllRecommended!()}>Add All Recommended</Button>
                </Stack>
            </CardContent>
    </Card>
    );
}