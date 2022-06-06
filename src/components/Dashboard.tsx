import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useTodo } from "../hooks/useTodo";

export const Dashboard = () => {
    const {todos: tasks} = useTodo();

    return (
        <Card style={{backgroundColor: "lightgoldenrodyellow"}}>
            <CardContent>
                <Grid container direction={"row"} justifyContent={"space-around"}>
                    <Grid item xs={4}>
                        <Typography>Total</Typography>
                        {tasks.filter(_ => !_.completed).length}
                    </Grid>
                    <Grid item xs={4}>
                        <Typography>Pending</Typography>
                        {tasks.filter(_ => !_.completed).length}
                    </Grid>
                    <Grid item xs={4}>
                        <Typography>Completed</Typography>
                        {tasks.filter(_ => _.completed).length}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}