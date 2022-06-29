import { Box, CircularProgress } from "@mui/material";
import { useMenu } from "../../hooks/useMenu";
import { MenuItem } from "./MenuItem";

export const Menu = () => {
    const { loading, items } = useMenu();

    return (
        <>
            {
                !loading && items.length > 0 &&
                items.map(item => <Box width={"15em"} margin={1} key={item.id} className="menuItem"><MenuItem {...item} /></Box>)
            }
            {
                loading && 
                <div className="loading container">
                    <CircularProgress />
                </div>
            }
        </>
    );
};