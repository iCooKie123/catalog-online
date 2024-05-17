import {
    Box,
    Grid,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Table,
    Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useSingleClassPage } from "./hooks";
import { StudentClass } from "@/models";
import { Textfield } from "@/components";
import { FormProvider } from "react-hook-form";

export const SingleClassPage = () => {
    const { id } = useParams();
    const {
        methods,
        isLoading,
        studentClasses,
        studyClass,
        onSubmit,
        editFieldDisabled,
        setEditFieldDisabled,
    } = useSingleClassPage(id!);

    const studentRow = (studentClass: StudentClass, index: number) => {
        return (
            <>
                <TableRow key={`row-${index}-${studentClass.class.name}`}>
                    <TableCell>
                        <Typography
                            variant="body1"
                            key={`student-${studentClass.student.id}-name`}
                            sx={{
                                textAlign: "left",
                            }}>
                            {studentClass.student.firstName}{" "}
                            {studentClass.student.lastName}
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography
                            variant="body1"
                            key={`student-${studentClass.student.id}-group`}
                            sx={{
                                textAlign: "center",
                            }}>
                            {studentClass.student.group}
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Grid
                            key={`student-${studentClass.student.id}-grade`}
                            item
                            sx={{
                                textAlign: "center",
                                wordBreak: "break-word",
                            }}>
                            <FormProvider {...methods}>
                                <Textfield
                                    name={`studentGrade.${index}.grade`}
                                    label={"Nota"}
                                    id={studentClass.student.id.toString()}
                                    dataTestId={
                                        "student-" +
                                        studentClass.student.id +
                                        "grade"
                                    }
                                    disabled={editFieldDisabled}></Textfield>
                            </FormProvider>
                        </Grid>
                    </TableCell>
                </TableRow>
            </>
        );
    };
    if (!isLoading)
        return (
            <Box
                width={{ xs: "90dvw", md: "70vw" }}
                minHeight={{ xs: "300px", md: "500px" }}
                mt={12}
                sx={{
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "5px",
                }}
                p={2}>
                <Grid
                    container
                    display="flex"
                    justifyContent="space-between">
                    <Typography
                        variant="h4"
                        mb={2}
                        sx={{ wordWrap: "break-word" }}>
                        {studyClass!.name}
                    </Typography>
                    <Button
                        onClick={() =>
                            setEditFieldDisabled(!editFieldDisabled)
                        }>
                        Edit
                    </Button>
                </Grid>

                <Grid
                    container
                    flexDirection="column"
                    sx={{ width: "100%" }}>
                    <Grid
                        item
                        xs={12}
                        width="100%"
                        padding={"0.5px"}
                        sx={{ backgroundColor: "grey" }}></Grid>
                    <Grid
                        item
                        xs={12}
                        mt={2}>
                        <TableContainer
                            key={`students-table-${studyClass?.id}`}>
                            <Table stickyHeader>
                                <colgroup>
                                    <col style={{ width: "50%" }}></col>
                                    <col style={{ width: "30%" }}></col>
                                    <col style={{ width: "20%" }}></col>
                                </colgroup>
                                <TableHead
                                    sx={{ borderBottom: "1px solid black" }}>
                                    <TableRow>
                                        <TableCell
                                            key="Nume-cell"
                                            align="left">
                                            Nume
                                        </TableCell>
                                        <TableCell
                                            key="grupa-cell"
                                            align="center">
                                            Grupa
                                        </TableCell>
                                        <TableCell
                                            key="nota-cell"
                                            align="right">
                                            Nota
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {studentClasses?.map(
                                        (studentClass, index) =>
                                            studentRow(studentClass, index)
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Button
                        onClick={() => {
                            onSubmit();
                        }}>
                        Submit
                    </Button>
                    <Button
                        onClick={() => {
                            console.log(methods.formState.errors);
                        }}>
                        errors
                    </Button>
                </Grid>
            </Box>
        );
    else return <div>Loading</div>;
};
