import { Accordion, AccordionSummary, Typography, AccordionDetails } from "@mui/material"
import { useState, useEffect } from "react"
import { useOrder } from "../hooks/useOrder"
import { ChefRecommended } from "./Menu/ChefRecommended"
import { Filters } from "./Menu/Filters"
import { PendingOrders, Billout, PlacedOrders } from "./Order"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';

export const LeftInfo = () => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const {  isBillout, order } = useOrder();

    useEffect(() => {
        const count = order?.orderItems.filter(_ => _.status === 1).length ?? 0;
        
        if(count > 0) setExpanded('pending');
    }, [order]);

    const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

    return (<>
        <Accordion expanded={expanded === 'chef-reco'} onChange={handleChange('chef-reco')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Chef Recommendations</Typography>
                <WhatshotOutlinedIcon style={{margin: "auto"}} />
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
                <Typography>Pending Orders</Typography>
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
    </>)
}