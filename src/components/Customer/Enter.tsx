import { Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Enter = () => {
    const [name, setName] = useState<string>("");

    const navigate = useNavigate();

    const onChangeTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // login!(email, password);
    };

    return (
    <form onSubmit={onFormSubmit}>
        <div className="enter container">
            <Card className="wrapper">
                <CardContent>
                    <Grid container flexDirection={"column"} spacing={2}>
                        <Grid item>
                            <Typography textAlign={"center"} variant="h4" component="div">Welcome to our system!</Typography>
                        </Grid>
                        <Grid item>
                            <TextField required fullWidth onChange={e => setName(e.target.value)} label="Enter your name..." variant="standard"/>
                        </Grid>
                        <Grid item>
                            <Button type={"submit"} sx={{width:1}} variant="contained" onClick={() => navigate("/dashboard")}>
                                Place Order
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    </form>
    )
};