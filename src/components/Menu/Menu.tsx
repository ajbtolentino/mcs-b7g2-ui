import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useMenu } from "../../hooks/useMenu";
import { Filters } from "./Filters";
import { MenuItem } from "./MenuItem";

export const Menu = () => {
    const { loading, items, getAllItems } = useMenu();

    useEffect(() => {
        getAllItems!()
    }, []);

    return (
        <>
            {/* <div className="filters container">
                <Filters />
            </div> */}
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