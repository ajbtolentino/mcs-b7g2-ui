import { AppBar as MuiAppBar, IconButton, Toolbar, Typography } from "@mui/material";
import FastfoodIcon from '@mui/icons-material/Fastfood';

export const AppBar = () => {
    return (<>
    <MuiAppBar position="sticky">
        <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <FastfoodIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Simang Bistro's</Typography>
        </Toolbar>
    </MuiAppBar>
    </>);
}