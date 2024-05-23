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
import { memo, useCallback } from "react";
import { AddNewsModal } from "./AddNewsModal";

interface MemoizedMDEditorProps {
    value: string;
    onChange: (value?: string) => void;
    style?: React.CSSProperties;
    onBlur: () => void;
}

const MemoizedMDEditor: React.FC<MemoizedMDEditorProps> = memo(
    ({ value, onChange, style, onBlur }) => {
        return (
            <div
                data-color-mode="light"
                style={style}>
                <MDEditor
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </div>
        );
    }
);

interface MemoizedTextFieldProps {
    name: string;
    label: string;
    id: string;
    dataTestId: string;
}

const MemoizedTextField: React.FC<MemoizedTextFieldProps> = memo(
    ({ name, label, id, dataTestId }) => {
        return (
            <Textfield
                name={name}
                label={label}
                id={id}
                dataTestId={dataTestId}
            />
        );
    }
);

export const EditNews = () => {
    const {
        saveChanges,
        values,
        setValue,
        errors,
        watch,
        methods,
        trigger,
        modalIsOpen,
        setModalIsOpen,
        getClasses,
    } = useEditNews();

    const handleChange = useCallback(
        (index: number) => (value?: string) => {
            setValue(`news.${index}.content`, value || "", {
                shouldDirty: true,
            });
        },
        [setValue]
    );

    return (
        <Box mt={12}>
            <Card>
                <Box width="90vw">
                    <CardContent>
                        <Typography
                            variant="h6"
                            id="parent-modal-title">
                            Edit Classes
                        </Typography>
                        <Divider />
                        <Button onClick={() => setModalIsOpen(true)}>
                            Add new news
                        </Button>
                        <FormProvider {...methods}>
                            {values.map((n, index) => (
                                <Grid
                                    item
                                    xs={12}
                                    mt={2}
                                    mb={2}
                                    key={watch(`news.${index}.id`)}
                                    height="auto">
                                    <MemoizedTextField
                                        name={`news.${index}.title`}
                                        label={"Title"}
                                        id={`Title-${index}`}
                                        dataTestId={"test"}
                                    />
                                    <MemoizedMDEditor
                                        value={n.content}
                                        onChange={handleChange(index)}
                                        style={{
                                            marginBottom: "5px",
                                        }}
                                        onBlur={() =>
                                            trigger(`news.${index}.content`)
                                        }
                                    />
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
                </Box>
            </Card>
            {modalIsOpen && (
                <AddNewsModal
                    onClose={(fetch: boolean) => {
                        setModalIsOpen(false);
                        if (fetch) getClasses();
                    }}></AddNewsModal>
            )}
        </Box>
    );
};
