import { Grid, Typography } from "@mui/material"

export const NotFound = () => {
    return (
    <Grid container direction={'column'} alignItems={"center"} spacing={4}>
        <Grid item>
            <Typography variant="h2" component="div" style={{display: "flex", alignItems:"center", height: "100vh"}}>
                <img src="https://c.tenor.com/_4YgA77ExHEAAAAd/rick-roll.gif" />
            </Typography>
        </Grid>
    </Grid>
    )
}