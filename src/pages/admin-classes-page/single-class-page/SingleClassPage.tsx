import { Box, Divider, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSingleClassPage } from "./hooks";

// interface SingleClassPageProps { }

export const SingleClassPage = () => {
  const { id } = useParams();
  const { studyClass, students } = useSingleClassPage(id!);
  useEffect(() => {
    console.log(students);
  }, [students]);
  return (
    <Box
      width={{ xs: "90dvw", md: "60vw" }}
      minHeight={{ xs: "300px", md: "500px" }}
      mt={12}
      sx={{
        backgroundColor: "white",
        color: "black",
        borderRadius: "5px",
      }}>
      <Typography variant="h4">{studyClass!.name}</Typography>
      <Divider />
      <Grid
        container
        flexDirection="column"></Grid>
    </Box>
  );
};
