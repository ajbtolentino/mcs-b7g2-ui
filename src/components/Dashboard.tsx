import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useMenu } from "../hooks/useMenu";
import { useOrder } from "../hooks/useOrder";
import { ChefRecommended } from "./Menu/ChefRecommended";
import { Menu } from "./Menu/Menu";
import { PlacedOrders, PendingOrders, Billout } from "./Order";
import { useSnackbar } from 'notistack'
import { AppBar, Toolbar, IconButton, Typography, AccordionSummary, Accordion, AccordionDetails } from "@mui/material";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Filters } from "./Menu/Filters";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const Dashboard = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [expanded, setExpanded] = useState<string | false>(false);
    const [pendingOrderCount, setPendingOrderCount] = useState<number>(0);
    const { error: menuError } = useMenu();
    const { success: orderSuccess, 
            error: orderError, 
            order,
            isBillout, 
            getByTableNumber } = useOrder();

    useEffect(() => {
        if(getByTableNumber) getByTableNumber();
    }, []);

    useEffect(() => {
        const count = order?.orderItems.filter(_ => _.status === 1).length ?? 0;
        
        setPendingOrderCount(count);
        if(count > 0) setExpanded('pending');
    }, [order]);

    useEffect(() => {
        if(menuError?.length) enqueueSnackbar(menuError, { variant: 'error',  });
    }, [menuError]);
    
    useEffect(() => {
      if(orderError?.length) enqueueSnackbar(orderError, { variant: 'error' });
      if(orderSuccess?.length) enqueueSnackbar(orderSuccess, { variant: 'success' });
    }, [menuError, orderError, orderSuccess]);
    
    const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

    return (
    <>
    <AppBar position="sticky">
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
    </AppBar>
    <Box display={"flex"} padding={5}>
        <Box display={"flex"} flexDirection={"column"}>
            <Box sx={{width: 280}}>
                <Accordion expanded={expanded === 'chef-reco'} onChange={handleChange('chef-reco')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Chef Recommendations</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ChefRecommended />
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'filter-menu'} onChange={handleChange('filter-menu')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Filter Menu</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Filters />
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'pending'} onChange={handleChange('pending')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Pending Orders ({pendingOrderCount})</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <PendingOrders  />
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={true}>
                    <AccordionSummary>
                        <Typography>Orders</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    {
                        isBillout && <Billout  />
                    }
                    {
                        !isBillout && <PlacedOrders  />
                    }
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>

        <Box display={"flex"} 
             flexDirection={"row"} 
             flexWrap={"wrap"} 
             flexGrow={1}
             paddingLeft={5} 
             paddingRight={5} 
             justifyContent={"center"}
             alignContent={"flex-start"}>
            <Menu />
        </Box>
    </Box>
    </>
    )
};