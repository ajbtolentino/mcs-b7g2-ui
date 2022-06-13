import { Alert, Button, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useMenu } from "../hooks/useMenu";
import { Menu } from "./Menu/Menu";
import { Order } from "./Order/Order";

export const Dashboard = () => {
    const { errors: menuErrors } = useMenu();

    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");
    
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
            <div className="menu container">
                <Menu />
            </div>
            <div className="order container">
                <Order  />
            </div>
        </div>
    </>
    )
};