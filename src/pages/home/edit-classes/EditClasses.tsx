import { Textfield } from "@/components";
import { News, NewsForm } from "@/models";
import { Box, Button, Divider, Grid, Modal, Typography } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { useFormContext } from "react-hook-form";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80vw",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    color: "black",
    outline: 0,
    borderRadius: 2,
};

interface EditClassesProps {
    onClose: () => void;
}

export const EditClasses = ({ onClose }: EditClassesProps) => {
    const methods = useFormContext<NewsForm>();
    const {
        watch,
        handleSubmit,
        setValue,
        formState: { dirtyFields },
        reset,
    } = methods;

    const values = watch("news");
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
    //TODO:finish this function
    const saveChanges = async () => {};

    return (
        <Modal
            open={true}
            onClose={() => {
                reset();
                onClose();
            }}>
            <Grid sx={{ ...style }}>
                <Typography
                    variant="h6"
                    id="parent-modal-title">
                    Edit Classes
                </Typography>
                <Divider />
                {values.map((n: News, index: number) => (
                    <Grid
                        item
                        xs={12}
                        mt={2}>
                        <Textfield
                            name={`news.${index}.title`}
                            label={"title"}
                            id={`Title-${index}`}
                            dataTestId={"test"}></Textfield>
                        <div data-color-mode="light">
                            <MDEditor
                                value={n.content}
                                onChange={(e) => {
                                    setValue(`news.${index}.content`, e || "", {
                                        shouldDirty: true,
                                    });
                                }}></MDEditor>
                        </div>
                    </Grid>
                ))}

                <Box mt={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit(() => {})}>
                        Save
                    </Button>
                </Box>
            </Grid>
        </Modal>
    );
};
