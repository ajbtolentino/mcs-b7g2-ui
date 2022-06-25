import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useMenu } from "../hooks/useMenu";
import { useOrder } from "../hooks/useOrder";
import { ChefRecommended } from "./Menu/ChefRecommended";
import { Menu } from "./Menu/Menu";
import { PlacedOrders, PendingOrders, Billout } from "./Order";
import { useSnackbar } from 'notistack'

export const Dashboard = () => {
    const { error: menuError } = useMenu();
    const { success: orderSuccess, 
            error: orderError, 
            isBillout, 
            getByTableNumber } = useOrder();

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if(getByTableNumber) getByTableNumber();
    }, []);

    useEffect(() => {
        if(menuError?.length) enqueueSnackbar(menuError, { variant: 'error',  });
    }, [menuError]);
    
    useEffect(() => {
      if(orderError?.length) enqueueSnackbar(orderError, { variant: 'error' });
      if(orderSuccess?.length) enqueueSnackbar(orderSuccess, { variant: 'success' });
    }, [menuError, orderError, orderSuccess]);
    
    return (
    <>
        <div className="dashboard container">
            <div className="left container">
                <Box className="recommended">
                    <ChefRecommended />
                </Box>
                <Box className="order">
                    <PendingOrders  />
                </Box>
                <Box className="order">
                    {
                        isBillout && <Billout  />
                    }
                    {
                        !isBillout && <PlacedOrders  />
                    }
                </Box>
                <Box className="order">
                </Box>
            </div>
            <div className="menu container">
                <Menu />
            </div>
        </div>
    </>
    )
};