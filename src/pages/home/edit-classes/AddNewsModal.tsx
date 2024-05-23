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
    onClose: () => void;
}

export const AddNewsModal = ({ onClose }: AddNewModalProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { showSnackBar } = useSnackBar();

    const conditionalOnClose = () => {
        if (isLoading) return;
        onClose();
    };

    interface NewNewsForm {
        title: string;
        content: string;
    }

    const validationSchema = yup.object().shape({
        title: yup.string().required("Title is required."),
        content: yup.string().required("Content is required."),
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
    } = methods;

    const saveChanges = async () => {
        setIsLoading(true);
        const formValues = getValues();
        await axios
            .post("news/add", formValues)
            .then(() => {
                showSnackBar("News added successfully");
            })
            .catch(() => {
                showSnackBar("Error adding news", "error");
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
                    Add News
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
                            label={"Title"}
                            id={`Title-newTitle`}
                            dataTestId={"test-newTitle"}></Textfield>
                    </FormProvider>
                    <div
                        data-color-mode="light"
                        style={{
                            marginBottom: "5px",
                        }}>
                        <MDEditor
                            value={watch("content")}
                            onChange={(e) => {
                                setValue("content", e || "", {
                                    shouldDirty: true,
                                });
                            }}
                            onBlur={() => trigger("content")}
                            height="50dvh"></MDEditor>
                    </div>
                    {!!errors.content && (
                        <Alert severity="error">
                            {errors?.content && "Content is required"}
                        </Alert>
                    )}
                    <Divider color="#353839" />
                </Grid>

                <Box
                    mt={2}
                    display="flex"
                    flexDirection="row">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            saveChanges();
                        }}
                        disabled={isLoading}>
                        Save
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                            conditionalOnClose();
                        }}
                        disabled={isLoading}>
                        Cancel
                    </Button>
                </Box>
            </Grid>
        </Modal>
    );
};
