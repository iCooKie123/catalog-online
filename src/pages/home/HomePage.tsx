import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext, useSnackBar } from "@/contexts";
import { News, UserRoles } from "@/models";
import { Card, Grid, Button, Typography, Divider, Box } from "@mui/material";
import { useHomePage } from "./hooks";
import { AxiosError, AxiosResponse } from "axios";
import axios from "@/axios";
import MDEditor from "@uiw/react-md-editor";
import { EditClasses } from "./edit-classes";
import { FormProvider } from "react-hook-form";

export const HomePage = () => {
    const [news, setNews] = useState<News[]>([]);
    const { showSnackBar } = useSnackBar();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { methods } = useHomePage(news);
    const { currentUser } = useContext(AuthContext);
    const userIsAdmin = currentUser?.role === UserRoles.Admin;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    useEffect(() => {
        getClass();
    }, []);

    const getClass = useCallback(async () => {
        setIsLoading(true);
        await axios
            .get("news")
            .then((res: AxiosResponse) => {
                const responseArray: any[] = res.data;

                const newsArray: News[] = responseArray.map((n: any) => {
                    return {
                        id: n.id,
                        title: n.title,
                        content: n.content,
                        createdAt: new Date(n.createdAt),
                        modifiedAt: new Date(n.modifiedAt),
                    } satisfies News;
                });

                setNews(
                    newsArray.sort(
                        (a: News, b: News) =>
                            b.createdAt.getTime() - a.createdAt.getTime()
                    )
                );
            })
            .catch((error: AxiosError) => {
                showSnackBar("Error fetching data.", "error");
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [showSnackBar]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <Box mt={12}>
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
                        <Box
                            key={n.id}
                            mb={2}>
                            <Grid
                                item
                                xs={12}
                                mt={2}>
                                <Box
                                    display="flex"
                                    flexDirection="row"
                                    justifyContent="space-between"
                                    alignItems="center">
                                    <Typography variant="h5">
                                        {n.title}
                                    </Typography>
                                    <Typography variant="caption">
                                        {n.createdAt?.toLocaleDateString()}
                                    </Typography>
                                </Box>
                                <Divider color="#353839" />
                                <div data-color-mode="light">
                                    <MDEditor.Markdown source={n.content} />
                                </div>
                            </Grid>
                            <Divider color="#353839" />
                        </Box>
                    ))}
                </Grid>
            </Card>
            {modalIsOpen && (
                <FormProvider {...methods}>
                    <EditClasses
                        onClose={() => setModalIsOpen(false)}></EditClasses>
                </FormProvider>
            )}
        </Box>
    );
};
