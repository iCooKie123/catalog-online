import axios from "@/axios";
import { Textfield } from "@/components";
import { useSnackBar } from "@/contexts";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

const modalTitle = "Adaugă anunț nou";
const titleIsRequired = "Titlul este obligatoriu";
const contentIsRequired = "Conținutul este obligatoriu";
const errorAddingNews = "Eroare la adăugarea anunțului";
const successAddingNews = "Anunț adăugat cu succes!";

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
    height: "auto",
    maxHeight: "90dvh",
};

interface AddNewModalProps {
    onClose: (e: boolean) => void;
}

export const AddNewsModal = ({ onClose }: AddNewModalProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { showSnackBar } = useSnackBar();

    const conditionalOnClose = (e: boolean) => {
        if (isLoading) return;
        onClose(e);
    };

    interface NewNewsForm {
        title: string;
        content: string;
    }

    const validationSchema = yup.object().shape({
        title: yup.string().required(titleIsRequired),
        content: yup.string().required(contentIsRequired),
    });

    const methods = useForm<NewNewsForm>({
        mode: "onBlur",
        resolver: yupResolver(validationSchema),
        defaultValues: { title: "", content: "" },
    });

    const {
        reset,
        watch,
        setValue,
        trigger,
        getValues,
        formState: { errors },
        handleSubmit,
    } = methods;

    const saveChanges = async () => {
        setIsLoading(true);
        const formValues = getValues();
        await axios
            .post("news/add", formValues)
            .then(() => {
                showSnackBar(successAddingNews, "success");
                conditionalOnClose(true);
            })
            .catch(() => {
                showSnackBar(errorAddingNews, "error");
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
                conditionalOnClose(false);
            }}>
            <Grid sx={{ ...style }}>
                <Typography
                    variant="h6"
                    id="parent-modal-title">
                    {modalTitle}
                </Typography>
                <Divider />
                <Grid
                    item
                    xs={12}
                    mt={2}
                    key={"new-title"}
                    height="auto">
                    <FormProvider {...methods}>
                        <Textfield
                            name={`title`}
                            label={"Titlu"}
                            id={`Title-newTitle`}
                            dataTestId={"test-newTitle"}></Textfield>
                    </FormProvider>
                    <div
                        data-color-mode="light"
                        style={{
                            marginBottom: "5px",
                            marginTop: "20px",
                        }}>
                        <MDEditor
                            value={watch("content")}
                            onChange={(e) => {
                                setValue("content", e || "", {
                                    shouldDirty: true,
                                });
                            }}
                            onBlur={() => trigger("content")}
                            height="50dvh"
                            textareaProps={{
                                placeholder: "Conținutul anunțului",
                            }}></MDEditor>
                    </div>
                    {!!errors.content && (
                        <Alert severity="error">
                            {errors?.content && errors.content.message}
                        </Alert>
                    )}
                    <Divider color="#353839" />
                </Grid>

                <Box
                    mt={2}
                    display="flex"
                    flexDirection="row"
                    gap={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit(saveChanges)}
                        disabled={isLoading}>
                        Salvează
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                            conditionalOnClose(false);
                        }}
                        disabled={isLoading}>
                        Anulează
                    </Button>
                </Box>
            </Grid>
        </Modal>
    );
};
