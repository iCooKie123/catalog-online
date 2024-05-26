import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { StudentClass } from "../../../models/StudyClass";

interface TabPanelProps {
    index: number;
    value: number;
    classes?: StudentClass[];
}

export const CustomTabPanel = ({ value, index, classes }: TabPanelProps) => {
    const sortedClasses = [...(classes ?? [])].sort((a, b) => {
        if (a.class.semester === b.class.semester) {
            return a.class.name.localeCompare(b.class.name);
        }
        return a.class.semester - b.class.semester;
    });

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`year-of-study-tabpanel-${index}`}
            aria-labelledby={`year-of-study-tabpanel-${index}`}
            style={{ width: "100%", color: "black" }}>
            {value === index && (
                <Box p={3}>
                    <TableContainer
                        data-testid="main-table"
                        key={"table-container"}>
                        <Table sx={{ width: "100%" }}>
                            <colgroup>
                                <col style={{ width: "5%" }}></col>
                                <col style={{ width: "30%" }}></col>
                                <col style={{ width: "5%" }}></col>
                                <col style={{ width: "10%" }}></col>
                                <col style={{ width: "10%" }}></col>
                                <col style={{ width: "10%" }}></col>
                            </colgroup>
                            <TableHead>
                                <TableRow key={"no key"}>
                                    <TableCell sx={{ width: "1%" }}>
                                        Nr.Crt
                                    </TableCell>
                                    <TableCell align="center">
                                        Numele disciplinei
                                    </TableCell>
                                    <TableCell align="center">
                                        Nr. credite
                                    </TableCell>
                                    <TableCell align="center">Tip</TableCell>
                                    <TableCell align="center">
                                        Semestru
                                    </TableCell>
                                    <TableCell align="center">Nota</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedClasses?.map((studentClass, index) => {
                                    const cls = studentClass.class;
                                    const typeOfClass = cls.type
                                        .toString()
                                        .toLocaleUpperCase()[0];
                                    return (
                                        <TableRow
                                            key={`row-${cls.name}-${cls.id}`}
                                            sx={{
                                                backgroundColor:
                                                    !!studentClass.grade &&
                                                    studentClass.grade < 5
                                                        ? "red"
                                                        : "unset",
                                            }}
                                            data-testid="table-row">
                                            <TableCell
                                                key={index + 1}
                                                sx={{ width: "1%" }}>
                                                {index + 1}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                key={`${cls.name}-${cls.id}`}>
                                                {cls.name}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                key={`${cls.credits}-${cls.id}`}>
                                                {cls.credits}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                key={`${typeOfClass}-${cls.id}`}>
                                                {typeOfClass}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                key={`semester-${cls.id}`}>
                                                {cls.semester}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                key={`grade-${cls.id}`}>
                                                {studentClass.grade ?? "-"}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </Typography>
    );
};
