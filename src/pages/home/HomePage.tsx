import { Card, Grid, Button, Typography, Divider, Box } from "@mui/material";

import MDEditor from "@uiw/react-md-editor";
import { useHomePage } from "./hooks";

export const HomePage = () => {
    const { isLoading, news, userIsAdmin, navigate } = useHomePage();
    if (isLoading) return <div>Loading...</div>;

    return (
        <Box mt={12}>
            <Card>
                <Grid
                    container
                    display="flex"
                    flexDirection="column"
                    padding={2}
                    width={"90vw"}>
                    {userIsAdmin && (
                        <Grid
                            item
                            xs={12}
                            display="flex"
                            justifyContent="end">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate("edit-news")}>
                                Editează anunțuri
                            </Button>
                        </Grid>
                    )}
                    <Typography variant="h4">Anunțuri</Typography>
                    <Divider color="#353839" />
                    {news.map((n) => (
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
                                    <Typography
                                        variant="h5"
                                        noWrap={false}>
                                        {n.title}
                                    </Typography>
                                    <Typography variant="caption">
                                        {n.createdAt?.toLocaleDateString()}
                                    </Typography>
                                </Box>
                                <Divider color="#353839" />
                                <div data-color-mode="light">
                                    <MDEditor.Markdown
                                        source={n.content}
                                        style={{
                                            whiteSpace: "pre-wrap",
                                            wordWrap: "break-word",
                                            width: "98%",
                                            overflowWrap: "break-word",
                                        }}
                                    />
                                </div>
                            </Grid>
                            <Divider color="#353839" />
                        </Box>
                    ))}
                </Grid>
            </Card>
        </Box>
    );
};
