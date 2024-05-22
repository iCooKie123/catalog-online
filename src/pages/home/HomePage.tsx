import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts";
import { UserRoles } from "@/models";
import MDEditor from "@uiw/react-md-editor";
import { Card, Grid } from "@mui/material";
import { useHomePage } from "./hooks";

export const HomePage = () => {
    const { currentUser } = useContext(AuthContext);
    const userIsAdmin = currentUser?.role === UserRoles.Admin;
    const { methods } = useHomePage();
    const news = methods.getValues("news");
    useEffect(() => {
        console.log(news);
    }, [news]);
    return (
        <Card>
            <Grid
                container
                display="flex"
                flexDirection="column"></Grid>
        </Card>
    );
};
