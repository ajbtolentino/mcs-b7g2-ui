import { Box } from "@mui/system";
import { useEffect } from "react";
import { useMenu } from "../hooks/useMenu";
import { useOrder } from "../hooks/useOrder";
import { Menu } from "./Menu/Menu";
import { useSnackbar } from 'notistack'
import { AppBar } from "./AppBar";
import { LeftInfo } from "./LeftInfo";
import { useNavigate, useParams } from "react-router-dom";

export const Dashboard = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { orderId, tableNumber } = useParams();
    const { error: menuError } = useMenu();
    const { success: orderSuccess, error: orderError, order, getByTableNumber, getByOrder } = useOrder();
    const navigate = useNavigate();

    useEffect(() => {
        if(orderId) getByOrder!(+orderId);
    }, [orderId]);

    useEffect(() => {
        if(order){
            if((order.tableNumber.toString() === tableNumber)) navigate(`/table/${tableNumber}/${order.id}`);
            else navigate("/notfound");
        }
    }, [order]);

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
        <Box className="menu"
             display={"flex"} 
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