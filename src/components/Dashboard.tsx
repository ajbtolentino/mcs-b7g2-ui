import { Alert, Snackbar } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useMenu } from "../hooks/useMenu";
import { useOrder } from "../hooks/useOrder";
import { ChefRecommended } from "./Menu/ChefRecommended";
import { Menu } from "./Menu/Menu";
import { PlacedOrders, PendingOrders, Billout } from "./Order";

export const Dashboard = () => {
    const { errors: menuErrors } = useMenu();
    const { isBillout, errors: orderErrors, getByTableNumber } = useOrder();

    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");

    useEffect(() => {
        if(getByTableNumber) getByTableNumber();
    }, []);
    
    useEffect(() => {
      setShowSnackbar(menuErrors.length > 0 || orderErrors.length > 0);
      
      if(menuErrors.length) {
        setSnackbarMessage(menuErrors[0]);
      }

      if(orderErrors.length) {
        setSnackbarMessage(orderErrors[0]);
      }
  
    }, [menuErrors, orderErrors]);
    
    return (
    <>
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={5000000}
            open={showSnackbar}
            onClose={() => setShowSnackbar(false)}
            style={{border: "5px #813531 solid", backgroundColor: "white"}}
        >
            <Alert onClose={() => setShowSnackbar(false)} severity={"error"} sx={{ width: '100%' }}>
                {snackbarMessage}
            </Alert>
        </Snackbar>

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