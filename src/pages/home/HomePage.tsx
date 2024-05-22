import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext, useSnackBar } from "@/contexts";
import { News, UserRoles } from "@/models";
import { Card, Grid, Button, Typography } from "@mui/material";
import { useHomePage } from "./hooks";
import { AxiosResponse } from "axios";
import axios from "@/axios";
import MDEditor from "@uiw/react-md-editor";
import { useNavigate } from "react-router-dom";
import { EditClasses } from "./edit-classes";
import { FormProvider } from "react-hook-form";
export const HomePage = () => {
    const [news, setNews] = useState<News[]>([]);
    const { showSnackBar } = useSnackBar();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { methods } = useHomePage(news);
    const { currentUser } = useContext(AuthContext);
    const userIsAdmin = currentUser?.role === UserRoles.Admin;
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    useEffect(() => {
        getClass();
    }, []);

    const getClass = useCallback(async () => {
        setIsLoading(true);
        try {
            const res: AxiosResponse = await axios.get("news");
            setNews(res.data.sort());
        } catch (error) {
            showSnackBar("Error fetching data.", "error");
        } finally {
            setIsLoading(false);
        }
    }, [showSnackBar]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <Card>
                <Grid
                    container
                    display="flex"
                    flexDirection="column"
                    padding={2}
                    minWidth={"90vw"}>
                    {userIsAdmin && (
                        <Grid
                            item
                            xs={12}
                            display="flex"
                            justifyContent="end">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setModalIsOpen(true)}>
                                Edit News
                            </Button>
                        </Grid>
                    )}
                    {methods.watch("news").map((n) => (
                        <Grid
                            item
                            xs={12}>
                            <Typography variant="h5">{n.title}</Typography>
                            <div data-color-mode="light">
                                <MDEditor.Markdown source={n.content} />
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </Card>
            {modalIsOpen && (
                <FormProvider {...methods}>
                    <EditClasses
                        onClose={() => setModalIsOpen(false)}></EditClasses>
                </FormProvider>
            )}
        </>
    );
};
