import { Box, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSingleClassPage } from "./hooks";
import { StudentClass, StudyClass } from "@/models";
import axios from "@/axios";
import { AxiosResponse } from "axios";

export const SingleClassPage = () => {
  const [studyClass, setStudyClass] = useState<StudyClass>();
  const [studentClasses, setStudentClasses] = useState<StudentClass[]>();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const { methods } = useSingleClassPage(id!, studentClasses!);

  useEffect(() => {
    const getClass = async () => {
      setIsLoading(true);
      axios.get(`classes/class/${id}`).then((res: AxiosResponse) => {
        setStudentClasses(
          res.data.sort(
            (a: StudentClass, b: StudentClass) =>
              a.student.yearOfStudy - b.student.yearOfStudy
          )
        );
        setStudyClass(res.data[0].class);
        setIsLoading(false);
      });
    };

    getClass();
    console.log(methods.getValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const studentRow = (studentClass: StudentClass) => {
    return <Box sx={{}}></Box>;
  };

  if (!isLoading)
    return (
      <Box
        width={{ xs: "90dvw", md: "60vw" }}
        minHeight={{ xs: "300px", md: "500px" }}
        mt={12}
        sx={{
          backgroundColor: "white",
          color: "black",
          borderRadius: "5px",
        }}
        p={2}>
        <Typography variant="h4">{studyClass!.name}</Typography>
        <Divider />
        <Grid
          container
          flexDirection="column"></Grid>
      </Box>
    );
};
