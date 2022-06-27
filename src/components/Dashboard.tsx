import { Box } from "@mui/system";
import { useEffect } from "react";
import { useMenu } from "../hooks/useMenu";
import { useOrder } from "../hooks/useOrder";
import { Menu } from "./Menu/Menu";
import { useSnackbar } from 'notistack'
import { AppBar } from "./AppBar";
import { LeftInfo } from "./LeftInfo";

export const Dashboard = () => {
    const { enqueueSnackbar } = useSnackbar();

    const { error: menuError } = useMenu();
    const { success: orderSuccess, 
            error: orderError,
            getByTableNumber } = useOrder();

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
    <AppBar />
    <Box display={"flex"} padding={5}>
        <Box display={"flex"} flexDirection={"column"} maxWidth={250}>
            <LeftInfo />
        </Box>
        <Box display={"flex"} 
             flexDirection={"row"} 
             flexWrap={"wrap"} 
             flexGrow={1}
             paddingLeft={5} 
             paddingRight={5} 
             justifyContent={"center"}>
            <Menu />
        </Box>
    </Box>
    </>
    )
};