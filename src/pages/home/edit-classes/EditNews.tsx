import { Textfield } from "@/components";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    Typography,
} from "@mui/material";
import MDEditor from "@uiw/react-md-editor";

import { useEditNews } from "./hooks";
import { FormProvider } from "react-hook-form";

export const EditNews = () => {
    const {
        addNewNews,
        saveChanges,
        values,
        setValue,
        errors,
        watch,
        methods,
    } = useEditNews();
    return (
        <Box mt={12}>
            <Card>
                <CardContent>
                    <Typography
                        variant="h6"
                        id="parent-modal-title">
                        Edit Classes
                    </Typography>
                    <Divider />
                    <Button onClick={addNewNews}>Add new news</Button>
                    <FormProvider {...methods}>
                        {values.map((n, index) => (
                            <Grid
                                item
                                xs={12}
                                mt={2}
                                key={watch(`news.${index}.id`)}
                                height="auto">
                                <Textfield
                                    name={`news.${index}.title`}
                                    label={"Title"}
                                    id={`Title-${index}`}
                                    dataTestId={"test"}></Textfield>
                                <div
                                    data-color-mode="light"
                                    style={{
                                        marginBottom: "5px",
                                        outline: "1px solid red",
                                    }}>
                                    <MDEditor
                                        value={n.content}
                                        onChange={(e) => {
                                            setValue(
                                                `news.${index}.content`,
                                                e || "",
                                                {
                                                    shouldDirty: true,
                                                    shouldValidate: true,
                                                }
                                            );
                                        }}></MDEditor>
                                </div>
                                {errors.news && !!errors.news[index] && (
                                    <Alert severity="error">
                                        {errors.news[index]?.title &&
                                            "Title is required"}
                                        {errors.news[index]?.content &&
                                            "Content is required"}
                                    </Alert>
                                )}
                                <Divider color="#353839" />
                            </Grid>
                        ))}
                    </FormProvider>

                    <Box mt={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                console.log(errors);
                                saveChanges();
                            }}>
                            Save
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};
