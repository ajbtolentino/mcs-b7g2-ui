import { Grid, Typography } from "@mui/material"

export const NotFound = () => {
    return (
    <Grid container direction={'column'} alignItems={"center"} spacing={4}>
        <Grid item>
            <Typography variant="h2" component="div">
                Page not found!
            </Typography>
        </Grid>
    </Grid>
    )
}