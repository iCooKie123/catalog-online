import { Box, Divider, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSingleClassPage } from "./hooks";
import { StudentClass } from "@/models";

export const SingleClassPage = () => {
  const { id } = useParams();
  const { studyClass, students, isLoading } = useSingleClassPage(id!);
  useEffect(() => {
    console.log(students);
  }, [students]);

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
