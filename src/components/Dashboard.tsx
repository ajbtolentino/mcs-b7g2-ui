import { Alert, Button, Snackbar } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useMenu } from "../hooks/useMenu";
import { useOrder } from "../hooks/useOrder";
import { ChefRecommended } from "./Menu/ChefRecommended";
import { Menu } from "./Menu/Menu";
import { Order } from "./Order/Order";
import { PlaceOrder } from "./Order/PlaceOrder";

export const Dashboard = () => {
    const { errors: menuErrors } = useMenu();
    const { order, getByTableNumber } = useOrder();

    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");

    useEffect(() => {
        getByTableNumber!(1);
    }, []);
    
    useEffect(() => {
      setShowSnackbar(menuErrors.length > 0);
      
      if(menuErrors.length) {
        setSnackbarMessage(menuErrors[0]);
      }
  
    }, [menuErrors]);
    
    return (
    <>
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={5000}
            open={showSnackbar}
            onClose={() => setShowSnackbar(false)}
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
                    <PlaceOrder  />
                </Box>
                <Box className="order">
                    <Order  />
                </Box>
            </div>
            <div className="menu container">
                <Menu />
            </div>
        </div>
    </>
    )
};