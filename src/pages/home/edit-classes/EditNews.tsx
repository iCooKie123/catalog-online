import axios from "@/axios";
import { Textfield } from "@/components";
import { useSnackBar } from "@/contexts";
import { News, NewsForm } from "@/models";
import {
    Alert,
    Box,
    Button,
    Divider,
    Grid,
    Modal,
    Typography,
} from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80dvw",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    color: "black",
    outline: 0,
    borderRadius: 2,
    overflow: "scroll",
    maxHeight: "90dvh",
};

interface EditClassesProps {
    onClose: () => void;
}

export const EditClasses = ({ onClose }: EditClassesProps) => {
    const methods = useFormContext<NewsForm>();
    const {
        watch,
        setValue,
        formState: { errors },
        reset,
    } = methods;

    const { showSnackBar } = useSnackBar();
    const [isLoading, setIsLoading] = useState(false);

    const values = watch("news");

    const conditionalOnClose = () => {
        if (isLoading) return;
        onClose();
    };

    const getDirtyFields = () => {
        const dirtyFields = methods.formState.dirtyFields.news;
        const formValues = methods.getValues() as NewsForm;
        const dirtyObjects = [];

        for (const key in dirtyFields) {
            const keyNumber = parseInt(key);
            if (dirtyFields[keyNumber]) {
                dirtyObjects.push({
                    id: formValues.news[keyNumber].id,
                    content: formValues.news[keyNumber].content,
                    title: formValues.news[keyNumber].title,
                });
            }
        }
        return dirtyObjects;
    };

    const addNewNews = () => {
        if (values.find((n) => n.id === -1) !== undefined) {
            showSnackBar(
                "Un singur anunț nou poate fi adăugat dintr-o dată. Salvează anunțul curent și încearcă din nou.",
                "warning"
            );
            return;
        }

        const newNews: News = {
            title: "",
            content: "",
            id: -1,
            createdAt: new Date(),
            modifiedAt: new Date(),
        };
        setValue("news", [newNews, ...values]);
    };

    const saveChanges = () => {
        const dirtyFields = getDirtyFields();
        if (dirtyFields.length === 0) {
            showSnackBar("No changes to save", "info");
            conditionalOnClose();
            return;
        }

        setIsLoading(true);

        axios
            .patch("news/edit", { news: dirtyFields })
            .then(() => {
                showSnackBar("Modificări salvate cu success!", "success");
                conditionalOnClose();
            })
            .catch(() => {
                showSnackBar("Eroare la salvarea modificărilor", "error");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Modal
            open={true}
            onClose={() => {
                reset();
                conditionalOnClose();
            }}>
            <Grid sx={{ ...style }}>
                <Typography
                    variant="h6"
                    id="parent-modal-title">
                    Edit Classes
                </Typography>
                <Divider />
                <Button onClick={addNewNews}>Add new news</Button>
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
                                    setValue(`news.${index}.content`, e || "", {
                                        shouldDirty: true,
                                        shouldValidate: true,
                                    });
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
            </Grid>
        </Modal>
    );
};
